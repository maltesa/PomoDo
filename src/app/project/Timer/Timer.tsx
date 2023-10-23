import { PauseIcon, PlayIcon, TrackNextIcon } from '@radix-ui/react-icons'
import { useCallback, useEffect, useState } from 'react'

import { db } from '@/lib/db'
import { useTimerSound } from '@/lib/hooks/useTimerSound'
import { ms2DurationStr } from '@/lib/utils'
import { useSettings } from '@/src/app/_components/Settings'
import { Button } from '@/ui'

import { useTimer } from './useTimer'

interface Props {
  projectId: number
}

export function Timer({ projectId }: Props) {
  const { breakDurationMs, sessionDurationMs } = useSettings()
  const { playBreakStart, playSessionStart } = useTimerSound()

  const [isBreak, setIsBreak] = useState(false)

  const nextTimer = useCallback(() => {
    setIsBreak((isBreak) => !isBreak)
  }, [])

  const { start, stop, status, remainingMs } = useTimer(
    isBreak ? breakDurationMs : sessionDurationMs,
    {
      onTick: async (msSinceUpdate) => !isBreak && updateActiveTodo(msSinceUpdate, projectId),
      onCompletion: () => {
        nextTimer()
        return true
      },
    }
  )

  // Play session sounds
  useEffect(() => {
    if (status !== 'running') return

    isBreak ? playBreakStart() : playSessionStart()
  }, [isBreak, status])

  return (
    <div className="space-y-8">
      <div className="text-center font-mono text-7xl font-light">{ms2DurationStr(remainingMs)}</div>
      <div className="mx-auto flex justify-center gap-4">
        <Button
          onClick={status === 'running' ? stop : start}
          icon={status === 'running' ? PauseIcon : PlayIcon}
        />
        <Button onClick={nextTimer} icon={TrackNextIcon}>
          {isBreak ? 'Session' : 'Break'}
        </Button>
      </div>
    </div>
  )
}

async function updateActiveTodo(timePassed: number, projectId: number) {
  // FIXME: Find better way to find active ToDo
  const todos = await db.todos.where({ projectId, completed: 0 }).sortBy('pos')
  if (!todos[0]) return

  // Update active Todo
  const { id, remainingMs } = todos[0]
  const updatedRemainingMs = Math.max(0, remainingMs - timePassed)
  await db.todos.update(id, { remainingMs: updatedRemainingMs })

  return todos[0]
}
