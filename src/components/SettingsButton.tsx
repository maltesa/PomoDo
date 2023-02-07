import { GearIcon } from '@radix-ui/react-icons'
import { ComponentProps, useContext, useState } from 'react'

import { Button } from '@/components/common/Button'
import { Input } from '@/components/common/Input'
import { Label } from '@/components/common/Label'
import { Reveal } from '@/components/common/Reveal'
import { SettingsContext } from '@/src/SettingsContextProvider'
import { durationStr2Ms, ms2DurationStr } from '@/utils/timeStrings'
import { useForm } from '@/utils/useForm'

export function SettingsButton(props: ComponentProps<typeof Button>) {
  const [isOpen, setIsOpen] = useState(false)
  const [{ breakDurationMs, sessionDurationMs }, updateSettings] = useContext(SettingsContext)
  const form = useForm('breakDurationStr', 'sessionDurationStr')

  const handleSubmit = form(({ breakDurationStr, sessionDurationStr }) => {
    const breakDurationMs = durationStr2Ms(breakDurationStr)
    const sessionDurationMs = durationStr2Ms(sessionDurationStr)

    updateSettings((prev) => ({ ...prev, breakDurationMs, sessionDurationMs }))
    setIsOpen(false)
  })

  return (
    <>
      <Button icon={GearIcon} onClick={() => setIsOpen((p) => !p)} {...props} />
      {/* FIXME: use radix Menu or Dialog instead of custom reveal */}
      <Reveal isOpen={isOpen}>
        <div className="mt-2 mb-16 mr-4 ml-16 rounded-lg border bg-white p-4 shadow-2xl dark:border-gray-500 dark:bg-gray-700">
          <form onSubmit={handleSubmit} className="grid gap-2">
            <Label>Session</Label>
            <Input
              autoFocus
              name="sessionDurationStr"
              defaultValue={ms2DurationStr(sessionDurationMs)}
              placeholder="Session Duration"
            />
            <Label>Break</Label>
            <Input
              name="breakDurationStr"
              defaultValue={ms2DurationStr(breakDurationMs)}
              placeholder="Break Duration"
            />
            <Button type="submit">Save</Button>
          </form>
        </div>
      </Reveal>
    </>
  )
}
