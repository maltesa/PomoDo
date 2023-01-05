import { useLiveQuery } from "dexie-react-hooks";
import { AnimatePresence, Reorder } from "framer-motion";
import { useCallback, useContext } from "react";

import { Label } from "@/components/common/Label";
import { ActiveProjectContext } from "@/src/ActiveProjectContextProvider";
import { db } from "@/src/db";

import { CreateTodo } from "./CreateTodo";
import { Stats } from "./Stats";
import { Todo } from "./Todo";

async function getTodos(projectId: number) {
  return db.todos.where({ projectId, completed: 0 }).sortBy("pos");
}

export function TodoList() {
  const activeProject = useContext(ActiveProjectContext);
  const ids: string[] = useLiveQuery(
    async () => (await getTodos(activeProject.id!)).map((td) => td.id),
    [activeProject.id],
    []
  );

  const handleReorder = useCallback(
    (reorderedIds: string[]) => {
      const newPositions = reorderedIds.map((id, index) => [id, index]);
      db.transaction("rw", db.todos, async () => {
        await Promise.all(
          newPositions.map(([id, pos]) => db.todos.update(id, { pos }))
        );
      });
    },
    [ids]
  );

  return (
    <>
      <div className="sticky top-0 mb-4 bg-gray-200 p-2 dark:bg-gray-800">
        <Label className="mb-4 block">My ToDos</Label>
        <CreateTodo />
      </div>
      <div className="space-y-8 px-2">
        {/* Create new Task */}

        {/* List of Todo-Items */}
        <Reorder.Group
          axis="y"
          className="flex flex-col"
          values={ids}
          onReorder={handleReorder}
        >
          <AnimatePresence mode="popLayout">
            {ids.map((id, i) => (
              <Reorder.Item
                key={id}
                value={id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: 0.04 * i }}
              >
                <div className="py-1.5">
                  <Todo isActive={i === 0} id={id} />
                </div>
              </Reorder.Item>
            ))}
          </AnimatePresence>
        </Reorder.Group>

        {/* Stats */}
        <Stats />
      </div>
    </>
  );
}
