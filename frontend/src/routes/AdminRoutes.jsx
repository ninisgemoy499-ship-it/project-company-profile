import { AdminLayout } from '../layouts/AdminLayout'
import { LoginPage } from '../pages/admin/Login/LoginPage'
import { DashboardPage } from '../pages/admin/Dashboard/DashboardPage'
import { AdminModulePage } from '../pages/admin/Shared/AdminModulePage'
import { authService } from '../services/auth.service'

const modules = {
  '/admin/pages': ['Pages', 'Manage the content and structure of your public pages.', 'pages'],
  '/admin/services': ['Services', 'Manage the capabilities shown on the public website.', 'services'],
  '/admin/portfolio': ['Portfolio', 'Add and curate the work your studio wants to feature.', 'projects'],
  '/admin/blog': ['Blog', 'Draft and publish stories, notes, and points of view.', 'posts'],
  '/admin/messages': ['Messages', 'Review project enquiries and conversations.', 'messages'],
  '/admin/settings': ['Settings', 'Manage workspace preferences and account details.', 'settings'],
}

export function AdminRoutes({ currentPath }) {
  const user = authService.getCurrentUser()
  if (currentPath === '/admin/login') return user ? <AdminLayout user={user} currentPath="/admin"><DashboardPage user={user} /></AdminLayout> : <LoginPage />
  if (!user) return <LoginPage />
  const module = modules[currentPath]
  const content = currentPath === '/admin' || !module ? <DashboardPage user={user} /> : <AdminModulePage title={module[0]} description={module[1]} resource={module[2]} user={user} />
  return <AdminLayout user={user} currentPath={currentPath}><main className="admin-content">{content}</main></AdminLayout>
}