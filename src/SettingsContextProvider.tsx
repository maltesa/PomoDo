import { useLiveQuery } from 'dexie-react-hooks'
import { createContext, ReactNode, useCallback, useState } from 'react'

import { db, DBProject } from './db'

function loadSettings(): Settings {
  const defaultSettings: Settings = {
    sessionDurationMs: 1000 * 60 * 25,
    breakDurationMs: 1000 * 60 * 5,
  }

  const savedSettings = JSON.parse(localStorage.getItem('settings') || '{}')

  return { ...defaultSettings, ...savedSettings }
}

function storeSettings(settings: Settings) {
  localStorage.setItem('settings', JSON.stringify(settings))
}

interface Settings {
  sessionDurationMs: number
  breakDurationMs: number
}

type SettingsUpdater = (callback: (currentSettings: Settings) => Settings) => void
type TContext = [Settings & { activeProject: DBProject }, SettingsUpdater]

const activeProjectDummy = {
  id: 0,
  isActive: 1,
  name: 'placeholder',
  isDark: true,
} as const

const dummyContext: TContext = [
  { ...loadSettings(), activeProject: activeProjectDummy },
  () => null,
]

export const SettingsContext = createContext<TContext>(dummyContext)

type Props = { children?: ReactNode }
export function SettingsContextProvider({ children }: Props) {
  const [settings, setSettings] = useState<Settings>(loadSettings())

  const activeProject = useLiveQuery(async () => {
    let project = await db.projects.where({ isActive: 1 }).first()

    if (!project) {
      if (await db.projects.count()) {
        project = await db.projects.toCollection().first()
        db.projects.update(project?.id!, { isActive: 1 })
      } else {
        db.projects.add({ name: 'You need one', isActive: 1, isDark: false })
      }
    }

    return project
  })

  const setAndStoreSettings: SettingsUpdater = useCallback(
    (callback: (currentSettings: Settings) => Settings) => {
      setSettings((currentSettings) => {
        const updatedSettings = callback(currentSettings)
        storeSettings(updatedSettings)

        return updatedSettings
      })
    },
    []
  )

  if (!activeProject) return null

  return (
    <SettingsContext.Provider value={[{ ...settings, activeProject }, setAndStoreSettings]}>
      {children}
    </SettingsContext.Provider>
  )
}
