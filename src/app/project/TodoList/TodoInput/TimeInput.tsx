import { ComponentProps, useCallback, useEffect, useRef, useState } from 'react'

import { durationStr2Ms, ms2DurationStr } from '@/lib/utils'
import { classed } from '@tw-classed/react'

const TimeInputBasic = classed(
  'input',
  'py-1 w-20 bg-white font-medium outline-none border rounded text-center text-sm',
  'dark:bg-gray-800 dark:border-gray-700'
)

interface Props extends Omit<ComponentProps<typeof TimeInputBasic>, 'onChange' | 'onSubmit'> {
  value: number
  submitOnBlur?: boolean
  onChange?: (ms: number) => void
  onSubmit?: (ms: number) => void
}

export function TimeInput({
  value,
  submitOnBlur,
  onBlur,
  onChange,
  onFocus,
  onSubmit,
  ...inputProps
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [durationStr, setDurationStr] = useState(ms2DurationStr(value))

  const handleSubmit = useCallback(() => {
    onSubmit && onSubmit(durationStr2Ms(durationStr))
  }, [onSubmit, durationStr])

  // Update duration string from external value if element is not focused
  useEffect(() => {
    if (inputRef.current === document.activeElement) return

    setDurationStr(ms2DurationStr(value))
  }, [value])

  return (
    <TimeInputBasic
      {...inputProps}
      type="text"
      ref={inputRef}
      value={durationStr}
      onBlur={() => submitOnBlur && handleSubmit()}
      onChange={(e) => {
        setDurationStr(e.currentTarget.value)
        onChange && onChange(durationStr2Ms(e.currentTarget.value))
      }}
      onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
    />
  )
}
