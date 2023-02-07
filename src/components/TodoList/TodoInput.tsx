import { KeyboardEventHandler, MouseEventHandler, useState } from 'react'
import useSound from 'use-sound'

import { DBTodo } from '@/src/db'
import wellDoneAudio from '@/src/static/audio/welldone.ogg'

import { Textarea } from '@/components/common/Textarea'
import classed from 'tw-classed'
import { TimeInput } from './TimeInput'
import { TodoCheckbox } from './TodoCheckbox'

interface Props extends DBTodo {
  autoFocus?: boolean
  isActive?: boolean
  placeholder?: string
  submitOnBlur?: boolean
  onDelete?: (todo: DBTodo) => void
  onSubmit?: (todo: DBTodo) => void
}

export function TodoInput({
  autoFocus,
  isActive,
  placeholder,
  submitOnBlur,
  onSubmit,
  onDelete,
  ...todo
}: Props) {
  const [playWellDone] = useSound(wellDoneAudio)
  const [isCompleted, setIsCompleted] = useState(todo.completed === 1)
  const [description, setDescription] = useState(todo.description)
  const [cachedRemainingMs, setCachedRemainingMs] = useState(todo.remainingMs)

  const handleComplete: MouseEventHandler<HTMLButtonElement> = (_e) => {
    playWellDone()
    setIsCompleted(true)

    if (onSubmit) onSubmit({ ...todo, completed: 1 })
  }

  const handleKeys: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (onDelete && description.length === 0 && e.code === 'Backspace') onDelete(todo)
    if (e.code === 'Enter' && (e.metaKey || e.ctrlKey)) handleSubmit()
  }

  const handleSubmit = (currentRemainingMs?: number) => {
    const remainingMs = currentRemainingMs ?? cachedRemainingMs
    onSubmit && onSubmit({ ...todo, description, remainingMs })
  }

  return (
    <TodoInputContainer isActive={isActive}>
      <TodoCheckbox checked={isCompleted} onClick={handleComplete} />
      <div className="flex w-full gap-3">
        <Textarea
          variant="simple"
          autoFocus={autoFocus}
          className="flex-grow"
          placeholder={placeholder || 'Description'}
          defaultValue={todo.description}
          onChange={(e) => setDescription(e.currentTarget.value)}
          onKeyDown={handleKeys}
          onBlur={() => submitOnBlur && handleSubmit()}
        />
        <TimeInput
          submitOnBlur={submitOnBlur}
          value={todo.remainingMs}
          onChange={(ms) => setCachedRemainingMs(ms)}
          onSubmit={handleSubmit}
        />
        <input type="submit" className="hidden" />
      </div>
    </TodoInputContainer>
  )
}

const TodoInputContainer = classed(
  'div',
  'flex items-center gap-3 px-4 py-3 rounded border border-transparent bg-gray-50',
  'transition-colors duration-1000',
  'dark:border-gray-700 dark:bg-gray-800',
  {
    variants: {
      isActive: { true: '!border-amber-400' },
    },
  }
)
