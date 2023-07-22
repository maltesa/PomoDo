import { useEffect, useState } from 'react'

export interface Settings {
  sessionDurationMs: number
  breakDurationMs: number
}

export const defaultSettings: Settings = {
  sessionDurationMs: 1000 * 60 * 25,
  breakDurationMs: 1000 * 60 * 5,
}

export function getSettings() {
  try {
    const settingsStr = localStorage.getItem('settings')
    return settingsStr ? JSON.parse(settingsStr) : defaultSettings
  } catch {
    return defaultSettings
  }
}

export function setSettings(settings: Settings) {
  localStorage.setItem('settings', JSON.stringify(settings))
  // storage event is not triggered when changed in the same tab
  window.dispatchEvent(new Event('storage'))
}

export function useSettings() {
  const [state, setState] = useState(getSettings())

  useEffect(() => {
    const handleStorage = (_e: StorageEvent) => setState(getSettings())
    window.addEventListener('storage', handleStorage)

    return () => removeEventListener('storage', handleStorage)
  }, [])

  return state
}
