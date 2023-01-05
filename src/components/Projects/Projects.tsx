import { Button } from "@/components/common/Button";
import { Label } from "@/components/common/Label";
import { db } from "@/src/db";
import { MoonIcon, PlusCircledIcon, SunIcon } from "@radix-ui/react-icons";
import { useLiveQuery } from "dexie-react-hooks";
import { ComponentProps, useCallback } from "react";

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

  const deleteProject = (id: number, name: string) => {
    if (!confirm(`Delete Project '${name}'?`)) return;

    db.projects.delete(id);
  };

  return (
    <div className="p-2">
      <Label block>My Projects</Label>
      <ButtonAddProject className="mt-4 mb-8 text-left" />
      {(projects || []).map(({ id, name, isActive, isDark }) => (
        <Button
          block
          key={id}
          active={isActive === 1}
          icon={isDark ? MoonIcon : SunIcon}
          onClick={() => activateProject(id!)}
          onKeyDown={(e) => e.code === "Backspace" && deleteProject(id!, name)}
          className="my-3 text-left"
        >
          {name}
        </Button>
      ))}
    </div>
  );
}

function ButtonAddProject(props: ComponentProps<typeof Button>) {
  const handleClick = useCallback(() => {
    const name = prompt("Enter a Project Name");
    if (!name) return;

    const isDark = confirm("Dark mode?");
    db.projects.add({ name, isActive: 0, isDark });
  }, []);

  return (
    <Button {...props} block icon={PlusCircledIcon} onClick={handleClick}>
      New Project
    </Button>
  );
}
