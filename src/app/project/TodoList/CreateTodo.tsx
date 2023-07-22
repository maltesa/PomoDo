import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

import { db } from '@/lib/db'

import { TodoInput } from './TodoInput'

const twentyFiveMinutes = 1000 * 60 * 25

export function CreateTodo() {
  const { projectId } = useParams() as { projectId: string }
  const [refresh, setReferesh] = useState(Math.random())

  return (
    <TodoInput
      autoFocus
      key={refresh}
      id="none"
      pos={0}
      placeholder="Add a new Task"
      projectId={parseInt(projectId, 10)}
      completed={0}
      description=""
      remainingMs={twentyFiveMinutes}
      createdAt={0}
      onSubmit={async (newTodo) => {
        const pos = await db.todos.count()
        await db.todos.add({
          ...newTodo,
          id: uuid(),
          createdAt: Date.now(),
          pos,
        })
        setReferesh(Math.random())
      }}
    />
  )
}
