import { useLiveQuery } from "dexie-react-hooks";
import { Reorder } from "framer-motion";
import { useCallback } from "react";

import { db, DBTodo } from "@/src/db";
import { useWeekType } from "@/utils/useWeekType";
import { CreateTodo } from "./CreateTodo";
import { Todo } from "./Todo";

export function TodoList() {
  const weekType = useWeekType();
  const todoList: DBTodo[] = useLiveQuery(
    async () =>
      await db.todos.where({ category: weekType, completed: 0 }).sortBy("pos"),
    [],
    []
  );

  const handleReorder = useCallback(
    (reorderedItems: DBTodo[]) => {
      let swap1: DBTodo | undefined;
      let swap2: DBTodo | undefined;

      // Diff reordered todos with previous order to find swapped elements
      reorderedItems.forEach(({ id }, i) => {
        const item = todoList[i];
        if (item.id !== id) {
          if (!swap1) swap1 = item;
          else if (!swap2) swap2 = item;
          else return;
        }
      });

      // Swap item indices
      if (swap1 && swap2) {
        db.todos.bulkPut([
          { ...swap1, pos: swap2.pos },
          { ...swap2, pos: swap1.pos },
        ]);
      }
    },
    [todoList]
  );

  return (
    <div>
      <Reorder.Group
        axis="y"
        values={todoList}
        onReorder={handleReorder}
        className="flex flex-col gap-3"
      >
        {todoList.map((todo, i) => (
          <Reorder.Item key={todo.id} value={todo}>
            <Todo isActive={i === 0} {...todo} />
          </Reorder.Item>
        ))}
      </Reorder.Group>
      <div className="mt-3">
        <CreateTodo pos={todoList.length} />
      </div>
    </div>
  );
}
