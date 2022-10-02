import { useLiveQuery } from "dexie-react-hooks";
import { Reorder } from "framer-motion";
import { useCallback } from "react";

import { db } from "@/src/db";
import { useWeekType } from "@/utils/useWeekType";
import { CreateTodo } from "./CreateTodo";
import { Stats } from "./Stats";
import { Todo } from "./Todo";

async function getTodos(weekType: "marketing" | "coding") {
  return db.todos.where({ category: weekType, completed: 0 }).sortBy("pos");
}

export function TodoList() {
  const weekType = useWeekType();
  const ids: string[] = useLiveQuery(
    async () => (await getTodos(weekType)).map((td) => td.id),
    [weekType],
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
    <div className="space-y-8">
      {/* TODO List */}
      <Reorder.Group
        axis="y"
        values={ids}
        onReorder={handleReorder}
        className="flex flex-col gap-3"
        initial={false}
      >
        {ids.map((id, i) => (
          <Reorder.Item
            key={id}
            value={id}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            layout
          >
            <Todo isActive={i === 0} id={id} />
          </Reorder.Item>
        ))}
      </Reorder.Group>

      {/* Create new Task */}
      <CreateTodo />

      {/* Stats */}
      <Stats />
    </div>
  );
}
