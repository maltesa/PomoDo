import { useLiveQuery } from 'dexie-react-hooks'
import { useContext } from 'react'

import { db } from '@/src/db'
import { SettingsContext } from '@/src/SettingsContextProvider'
import { ms2DurationStr } from '@/utils/timeStrings'

export function Stats() {
  const [{ activeProject }] = useContext(SettingsContext)
  const totalTimeStr = useLiveQuery(
    async () => {
      const todos = await db.todos
        .where({ projectId: activeProject.id, completed: 0 })
        .sortBy('pos')
      const totalMs = todos.reduce((sum, todo) => sum + todo.remainingMs, 0)
      return ms2DurationStr(totalMs)
    },
    [activeProject.id],
    ''
  )

  return (
    <div className="text-right text-lg italic text-gray-700 dark:text-gray-300">
      Total: {totalTimeStr}
    </div>
  )
}
