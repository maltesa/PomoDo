import { useContext, useEffect } from 'react'

import { Priciniples } from '@/components/Pricinples'
import { Projects } from '@/components/Projects'
import { Timer } from '@/components/Timer'
import { TodoList } from '@/components/TodoList'

import { SettingsButton } from '@/components/SettingsButton'
import { SettingsContext } from './SettingsContextProvider'

function App() {
  const [{ activeProject }] = useContext(SettingsContext)

  // Set darkmode depending on type of project
  useEffect(() => {
    const htmlElement = document.querySelector('html')

    if (activeProject.isDark) htmlElement?.classList?.add('dark')
    else htmlElement?.classList?.remove('dark')
  }, [activeProject])

  return (
    <div className="grid h-screen w-full grid-cols-12 overflow-auto bg-gray-200 dark:bg-gray-800 dark:text-white">
      <div className="lg:scroll-container col-span-12 lg:col-span-2">
        <Projects />
      </div>
      <div className="lg:scroll-container col-span-12 lg:col-span-6">
        <TodoList />
      </div>
      <div className="lg:scroll-container col-span-12 flex flex-col justify-between gap-12 px-4 pt-24 pb-16 lg:col-span-4">
        <div className="fixed top-0 right-0 grid justify-items-end">
          <SettingsButton className="mb-2 mr-4 mt-4 h-10 w-10 rounded-full !p-0" />
        </div>
        <Timer activeProjectId={activeProject.id!} />
        <Priciniples />
      </div>
    </div>
  )
}

export default App
