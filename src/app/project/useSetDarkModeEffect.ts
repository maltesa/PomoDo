import { db } from '@/lib/db'
import { useEffect } from 'react'

async function setDarkMode(projectId: number) {
  const project = await db.projects.get(projectId)
  if (!project) return

  const htmlElement = document.querySelector('html')
  if (project.isDark) htmlElement?.classList?.add('dark')
  else htmlElement?.classList?.remove('dark')
}

export function useSetDarkModeEffect(projectId: number) {
  useEffect(() => void setDarkMode(projectId), [projectId])
}
