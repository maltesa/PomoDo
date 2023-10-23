import { useLiveQuery } from 'dexie-react-hooks'
import { AnimatePresence, Reorder } from 'framer-motion'
import { useCallback, useMemo } from 'react'

import { db } from '@/lib/db'
import { Label } from '@/ui'

import { CreateTodo } from './CreateTodo'
import { Stats } from './Stats'
import { Todo } from './Todo'

interface Props {
  projectId: number
}

export function TodoList({ projectId }: Props) {
  const todos = useLiveQuery(
    async () => await db.todos.where({ projectId, completed: 0 }).reverse().sortBy('pos'),
    [projectId],
    []
  )
  const ids = useMemo(() => todos.map(({ id }) => id), [todos])

  const handleReorder = useCallback(
    (reorderedIds: string[]) => {
      const nItems = reorderedIds.length
      const newPositions = reorderedIds.map((id, index) => [id, nItems - index])
      db.transaction('rw', db.todos, async () => {
        await Promise.all(newPositions.map(([id, pos]) => db.todos.update(id, { pos })))
      })
    },
    [ids]
  )

  return (
    <>
      <div className="sticky top-0 mb-4 bg-gray-200 p-2 dark:bg-gray-800">
        <Label className="mb-4 block">My ToDos</Label>
        <CreateTodo />
      </div>
      <div className="space-y-8 px-2">
        {/* Create new Task */}

        {/* List of Todo-Items */}
        <Reorder.Group axis="y" className="flex flex-col" values={ids} onReorder={handleReorder}>
          <AnimatePresence mode="popLayout">
            {ids.map((id, i) => (
              <Reorder.Item
                key={id}
                value={id}
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: 0.02 * i, ease: 'backOut', bounce: 0.5 }}
              >
                <div className="py-1.5">
                  <Todo isActive={i === 0} id={id} />
                </div>
              </Reorder.Item>
            ))}
          </AnimatePresence>
        </Reorder.Group>

        {/* Stats */}
        <Stats todos={todos} />
      </div>
    </>
  )
}
