import { db } from "@/src/db";
import { useLiveQuery } from "dexie-react-hooks";
import { Button } from "../common/Button";

export function Projects() {
  const projects = useLiveQuery(() => db.projects.toArray());

  const activateProject = (projectId: number) => {
    db.transaction("rw", db.projects, async () => {
      const ps = await db.projects.where({ isActive: 1 }).toArray();
      const updates = ps.map((p) => ({ ...p, isActive: 0 as const }));
      Promise.all([
        db.projects.bulkPut(updates),
        db.projects.update(projectId, { isActive: 1 }),
      ]);
    });
  };

  if (!projects) return null;

  return (
    <>
      {projects.map(({ id, name, isActive }) => (
        <Button
          block
          active={isActive === 1}
          onClick={() => activateProject(id!)}
        >
          {name}
        </Button>
      ))}
    </>
  );
}
