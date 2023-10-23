import { Navigate } from 'react-router-dom'

import { db } from '@/lib/db'
import { useQuery } from '@/lib/hooks'

export function RedirectToFirstProject() {
  const project = useQuery(() => db.projects.orderBy('id').first(), [])
  if (!project) return <div className="italic">Choose or create a project</div>

  return <Navigate to={`/project/${project.id}`} replace />
}
