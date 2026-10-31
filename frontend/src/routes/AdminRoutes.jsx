import { AdminLayout } from '../layouts/AdminLayout'
import { LoginPage } from '../pages/admin/Login/LoginPage'
import { DashboardPage } from '../pages/admin/Dashboard/DashboardPage'
import { AdminModulePage } from '../pages/admin/Shared/AdminModulePage'
import { authService } from '../services/auth.service'

const modules = {
  '/admin/pages': ['Pages', 'Manage the content and structure of your public pages.'],
  '/admin/services': ['Services', 'Manage the capabilities shown on the public website.'],
  '/admin/portfolio': ['Portfolio', 'Add and curate the work your studio wants to feature.'],
  '/admin/blog': ['Blog', 'Draft and publish stories, notes, and points of view.'],
  '/admin/messages': ['Messages', 'Review project enquiries and conversations.'],
  '/admin/settings': ['Settings', 'Manage workspace preferences and account details.'],
}

export function AdminRoutes({ currentPath }) {
  const user = authService.getCurrentUser()
  if (currentPath === '/admin/login') return user ? <AdminLayout user={user} currentPath="/admin"><DashboardPage user={user} /></AdminLayout> : <LoginPage />
  if (!user) return <LoginPage />
  const module = modules[currentPath]
  const content = currentPath === '/admin' || !module ? <DashboardPage user={user} /> : <AdminModulePage title={module[0]} description={module[1]} />
  return <AdminLayout user={user} currentPath={currentPath}><main className="admin-content">{content}</main></AdminLayout>
}