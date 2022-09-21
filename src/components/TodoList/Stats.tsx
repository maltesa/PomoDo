import type { DBTodo } from "@/src/db";
import { serializeTimeStr } from "@/utils/timeStrings";
import { useMemo } from "react";

interface Props {
  todos: DBTodo[];
}

export function Stats({ todos }: Props) {
  const totalTimeStr = useMemo(() => {
    const totalMs = todos.reduce((sum, todo) => sum + todo.remainingMs, 0);
    return serializeTimeStr(totalMs);
  }, [todos]);

  return (
    <div className="text-slate-700 dark:text-slate-300 text-lg text-right">
      Total: {totalTimeStr}
    </div>
  );
}
