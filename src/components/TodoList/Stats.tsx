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
    <div className="text-right text-lg italic text-slate-700 dark:text-slate-300">
      Total: {totalTimeStr}
    </div>
  );
}
