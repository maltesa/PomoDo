import { GearIcon } from '@radix-ui/react-icons'

import { durationStr2Ms, ms2DurationStr } from '@/lib/utils'
import { Dropdown } from '@/src/ui'
import { Button, Input, Label } from '@/ui'

import { getSettings, setSettings } from './settings'

export function SettingsButton() {
  const settings = getSettings()

  const handleSettingsChange = (key: keyof typeof settings, value: string) => {
    setSettings({ ...settings, [key]: durationStr2Ms(value) })
  }

  return (
    <Dropdown trigger={<Button icon={GearIcon} className="h-10 w-10 !rounded-full !p-0" />}>
      <form className="grid gap-2 p-2">
        <Label>Session</Label>
        <Input
          autoFocus
          defaultValue={ms2DurationStr(settings.sessionDurationMs)}
          placeholder="Session Duration"
          onChange={(e) => handleSettingsChange('sessionDurationMs', e.currentTarget.value)}
        />
        <Label>Break</Label>
        <Input
          defaultValue={ms2DurationStr(settings.breakDurationMs)}
          placeholder="Break Duration"
          onChange={(e) => handleSettingsChange('breakDurationMs', e.currentTarget.value)}
        />
      </form>
    </Dropdown>
  )
}
