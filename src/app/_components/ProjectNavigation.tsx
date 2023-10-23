import { MoonIcon, PlusCircledIcon, SunIcon } from '@radix-ui/react-icons'
import { useLiveQuery } from 'dexie-react-hooks'
import { ComponentProps, useCallback } from 'react'
import { Link, useParams } from 'react-router-dom'

import { db } from '@/lib/db'
import { Button, Label } from '@/ui'

export function ProjectNavigation() {
  const { projectId } = useParams() as { projectId: string }
  const projects = useLiveQuery(() => db.projects.toArray())

  const deleteProject = (id: number, name: string) => {
    if (!confirm(`Delete Project '${name}'?`)) return

    db.projects.delete(id)
  }

  return (
    <div className="p-2">
      <Label block>My Projects</Label>
      <div className="mt-3 flex gap-x-4 gap-y-3 xl:flex-col">
        <ButtonAddProject className="text-left" />
        {(projects || []).map(({ id, name, isDark }) => {
          const isActive = projectId === `${id}`
          return (
            <Button
              block
              as={Link}
              to={`/project/${id}`}
              key={id}
              active={isActive}
              icon={isDark ? MoonIcon : SunIcon}
              className="text-left"
              onKeyDown={(e) => e.code === 'Backspace' && deleteProject(id!, name)}
            >
              {name}
            </Button>
          )
        })}
      </div>
    </div>
  )
}

function ButtonAddProject(props: ComponentProps<typeof Button>) {
  const handleClick = useCallback(() => {
    const name = prompt('Enter a Project Name')
    if (!name) return

    const isDark = confirm('Dark mode?')
    db.projects.add({ name, isDark })
  }, [])

  return (
    <Button {...props} block icon={PlusCircledIcon} onClick={handleClick}>
      New Project
    </Button>
  )
}
