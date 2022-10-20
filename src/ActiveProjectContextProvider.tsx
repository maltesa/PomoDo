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
  const activeProject = useLiveQuery(() =>
    db.projects.where({ isActive: 1 }).first()
  );
  if (!activeProject) return null;

  return (
    <ActiveProjectContext.Provider value={activeProject}>
      {children}
    </ActiveProjectContext.Provider>
  );
}
