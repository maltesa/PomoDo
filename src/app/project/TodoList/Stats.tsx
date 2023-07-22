import { useMemo } from 'react'

import { DBTodo } from '@/lib/db'
import { ms2DurationStr } from '@/lib/utils'

interface Props {
  todos: DBTodo[]
}

export function Stats({ todos }: Props) {
  const totalMs = useMemo(() => todos.reduce((sum, todo) => sum + todo.remainingMs, 0), [todos])

  return (
    <div className="text-right text-lg italic text-gray-700 dark:text-gray-300">
      Total: {ms2DurationStr(totalMs)}
    </div>
  )
}
