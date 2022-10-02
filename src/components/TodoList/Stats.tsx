import { db } from "@/src/db";
import { serializeTimeStr } from "@/utils/timeStrings";
import { useWeekType } from "@/utils/useWeekType";
import { useLiveQuery } from "dexie-react-hooks";

export function Stats() {
  const weekType = useWeekType();
  const totalTimeStr = useLiveQuery(
    async () => {
      const todos = await db.todos
        .where({ category: weekType, completed: 0 })
        .sortBy("pos");
      const totalMs = todos.reduce((sum, todo) => sum + todo.remainingMs, 0);
      return serializeTimeStr(totalMs);
    },
    [weekType],
    ""
  );

  return (
    <div className="text-right text-lg italic text-slate-700 dark:text-slate-300">
      Total: {totalTimeStr}
    </div>
  );
}
