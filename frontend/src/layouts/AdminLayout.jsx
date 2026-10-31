import { AdminSidebar } from '../components/navigation/AdminSidebar'
import '../styles/admin.css'

export function AdminLayout({ children, user, currentPath }) {
  return <div className="admin-shell"><AdminSidebar user={user} currentPath={currentPath} /><div className="admin-main">{children}</div></div>
}