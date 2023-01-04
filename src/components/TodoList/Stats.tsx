import { useLiveQuery } from "dexie-react-hooks";
import { useContext } from "react";

import { ActiveProjectContext } from "@/src/ActiveProjectContextProvider";
import { db } from "@/src/db";
import { serializeTimeStr } from "@/utils/timeStrings";

export function Stats() {
  const activeProject = useContext(ActiveProjectContext);
  const totalTimeStr = useLiveQuery(
    async () => {
      const todos = await db.todos
        .where({ projectId: activeProject.id, completed: 0 })
        .sortBy("pos");
      const totalMs = todos.reduce((sum, todo) => sum + todo.remainingMs, 0);
      return serializeTimeStr(totalMs);
    },
    [activeProject.id],
    ""
  );

  return (
    <div className="text-right text-lg italic text-gray-700 dark:text-gray-300">
      Total: {totalTimeStr}
    </div>
  );
}
