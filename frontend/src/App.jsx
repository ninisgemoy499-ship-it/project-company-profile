import { useState } from 'react'
import { PublicRoutes } from './routes/PublicRoutes'
import { AdminRoutes } from './routes/AdminRoutes'

function App() {
  const [path] = useState(window.location.pathname)
  return path.startsWith('/admin') ? <AdminRoutes currentPath={path} /> : <PublicRoutes />
}

export default App
