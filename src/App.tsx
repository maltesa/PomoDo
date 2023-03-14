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
    <div className="absolute inset-0 flex justify-center bg-gray-200 dark:bg-gray-800 dark:text-white">
      {/* Settings */}
      <div className="fixed top-0 right-5 z-50 grid justify-items-end">
        <SettingsButton className="mb-2 mr-4 mt-4 h-10 w-10 !rounded-full !p-0" />
      </div>

      {/* App Layout */}
      <div className="scroll-container m-4 flex h-screen w-full max-w-[110rem] flex-col-reverse gap-4 overflow-auto xl:flex-row">
        <div className="xl:scroll-container bottom-0 w-full flex-none xl:w-64">
          <Projects />
        </div>
        <div className="xl:scroll-container w-full">
          <TodoList />
        </div>
        <div className="xl:scroll-container flex w-full flex-none flex-col gap-4 pt-4 xl:w-[26rem] xl:gap-16 xl:pt-24 xl:pb-16">
          <Timer activeProjectId={activeProject.id!} />
          <Priciniples />
        </div>
      </div>
    </div>
  )
}

export default App
