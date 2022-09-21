import { useLiveQuery } from "dexie-react-hooks";
import { Reorder } from "framer-motion";
import { useCallback } from "react";

import { db, DBTodo } from "@/src/db";
import { useWeekType } from "@/utils/useWeekType";
import { CreateTodo } from "./CreateTodo";
import { Stats } from "./Stats";
import { Todo } from "./Todo";

export function TodoList() {
  const weekType = useWeekType();
  const todos: DBTodo[] = useLiveQuery(
    async () =>
      await db.todos.where({ category: weekType, completed: 0 }).sortBy("pos"),
    [weekType],
    []
  );

  const handleReorder = useCallback(
    (reorderedItems: DBTodo[]) => {
      let swap1: DBTodo | undefined;
      let swap2: DBTodo | undefined;

      // Diff reordered todos with previous order to find swapped elements
      reorderedItems.forEach(({ id }, i) => {
        const item = todos[i];
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
    [todos]
  );

  return (
    <div className="space-y-8">
      {/* TODO List */}
      <div>
        <Reorder.Group
          axis="y"
          values={todos}
          onReorder={handleReorder}
          className="flex flex-col gap-3"
        >
          {todos.map((todo, i) => (
            <Reorder.Item key={todo.id} value={todo}>
              <Todo isActive={i === 0} {...todo} />
            </Reorder.Item>
          ))}
        </Reorder.Group>
        <div className="mt-3">
          <CreateTodo />
        </div>
      </div>

      {/* Stats */}
      <Stats todos={todos} />
    </div>
  );
}
