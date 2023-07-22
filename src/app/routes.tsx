import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'

import { Layout } from './Layout'
import { Project } from './project'

export const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<div>Choose or create a project</div>} />
      <Route path="project/:projectId" element={<Project />} />
    </Route>
  )
)
