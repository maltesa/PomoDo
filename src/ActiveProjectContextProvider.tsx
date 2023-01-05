import { useLiveQuery } from "dexie-react-hooks";
import { createContext } from "react";

import { db, DBProject } from "./db";

export const ActiveProjectContext = createContext<DBProject>({
  id: 0,
  isActive: 1,
  name: "placeholder",
  isDark: true,
});

interface Props {
  children?: React.ReactNode;
}

export function ActiveProjectContextProvider({ children }: Props) {
  const activeProject = useLiveQuery(async () => {
    let project = await db.projects.where({ isActive: 1 }).first();

    if (!project) {
      if (await db.projects.count()) {
        project = await db.projects.toCollection().first();
        db.projects.update(project?.id!, { isActive: 1 });
      } else {
        db.projects.add({ name: "You need one", isActive: 1, isDark: false });
      }
    }

    return project;
  });

  if (!activeProject) return null;

  return (
    <ActiveProjectContext.Provider value={activeProject}>
      {children}
    </ActiveProjectContext.Provider>
  );
}
