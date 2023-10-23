import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'

import { Layout } from './Layout'
import { RedirectToFirstProject } from './_components/RedirectToFirstProject'
import { Project } from './project'

export const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<RedirectToFirstProject />} />
      <Route path="project/:projectId" element={<Project />} />
    </Route>
  )
)
