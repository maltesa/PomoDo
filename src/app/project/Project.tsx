import { useParams } from 'react-router-dom'

import { Priciniples } from './Pricinples'
import { Timer } from './Timer'
import { TodoList } from './TodoList'
import { useSetDarkModeEffect } from './useSetDarkModeEffect'

export function Project() {
  const params = useParams() as { projectId: string }
  const projectId = parseInt(params.projectId, 10)

  useSetDarkModeEffect(projectId)

  return (
    <>
      <div className="xl:scroll-container w-full">
        <TodoList projectId={projectId} />
      </div>
      <div className="xl:scroll-container flex w-full flex-none flex-col gap-4 pt-4 xl:w-[26rem] xl:gap-16 xl:pt-24 xl:pb-16">
        <Timer projectId={projectId} />
        <Priciniples />
      </div>
    </>
  )
}
