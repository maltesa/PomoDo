import { Outlet } from 'react-router-dom'

import { ProjectNavigation } from './_components/ProjectNavigation'
import { SettingsButton } from './_components/Settings'

export function Layout() {
  return (
    <main className="scroll-container flex h-screen w-full flex-col-reverse gap-4 overflow-auto p-4 xl:flex-row">
      <div className="absolute top-4 right-4">
        <SettingsButton />
      </div>
      <div className="xl:scroll-container bottom-0 w-full flex-none xl:w-64">
        <ProjectNavigation />
      </div>
      <Outlet />
    </main>
  )
}
