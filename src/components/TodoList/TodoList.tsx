import { useLiveQuery } from "dexie-react-hooks";
import { Reorder } from "framer-motion";
import { useCallback } from "react";

import { db, DBTodo } from "@/src/db";
import { useWeekType } from "@/utils/useWeekType";
import { Todo } from "./Todo";

export function TodoList() {
  const weekType = useWeekType();
  const todos =
    useLiveQuery(
      async () =>
        db.todos.where({ category: weekType, completed: 0 }).sortBy("index"),
      []
    ) || [];

  const handleReorder = useCallback(
    (reorderedToDos: DBTodo[]) => {
      let swap1: DBTodo | undefined;
      let swap2: DBTodo | undefined;

      // Diff reordered todos with previous order to find swapped elements
      reorderedToDos.forEach((todo, index) => {
        if (todos[index].id !== todo.id) {
          if (!swap1) swap1 = todos[index];
          else if (!swap2) swap2 = todos[index];
          else return;
        }
      });

      if (swap1 && swap2) {
        db.todos.bulkPut([
          { ...swap1, index: swap2.index },
          { ...swap2, index: swap1.index },
        ]);
      }
    },
    [todos]
  );

  return (
    <div>
      <Reorder.Group
        axis="y"
        values={todos}
        onReorder={handleReorder}
        className="flex flex-col gap-3"
      >
        {todos.map((todo) => (
          <Reorder.Item key={todo.id} value={todo}>
            <Todo key={todo.id} {...todo} />
          </Reorder.Item>
        ))}
      </Reorder.Group>
      <div className="mt-3">
        <Todo
          autoFocus
          key={Math.random()}
          placeholder="Add a new Task"
          nextIndex={todos.length}
        />
      </div>
    </div>
  );
}
