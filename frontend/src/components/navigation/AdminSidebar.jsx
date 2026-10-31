import { authService } from '../../services/auth.service'

const navigation = [
  { label: 'Overview', href: '/admin', icon: '▦' },
  { label: 'Pages', href: '/admin/pages', icon: '▤' },
  { label: 'Services', href: '/admin/services', icon: '✦' },
  { label: 'Portfolio', href: '/admin/portfolio', icon: '◫' },
  { label: 'Blog', href: '/admin/blog', icon: '◒' },
  { label: 'Messages', href: '/admin/messages', icon: '◌', count: 7 },
]

export function AdminSidebar({ user, currentPath }) {
  return (
    <aside className="admin-sidebar">
      <a className="admin-brand" href="/admin"><span className="brand-mark">N</span><span>Northstar</span></a>
      <div className="workspace-label">Workspace <span>⌄</span></div>
      <nav className="admin-nav" aria-label="Admin navigation">
        <p className="admin-nav-label">Manage</p>
        {navigation.map((item) => <a className={currentPath === item.href ? 'is-active' : ''} href={item.href} key={item.label}><span className="admin-nav-icon">{item.icon}</span><span>{item.label}</span>{item.count && <b>{item.count}</b>}</a>)}
        <p className="admin-nav-label admin-nav-spacer">System</p>
        <a className={currentPath === '/admin/settings' ? 'is-active' : ''} href="/admin/settings"><span className="admin-nav-icon">⚙</span><span>Settings</span></a>
      </nav>
      <div className="admin-sidebar-footer"><a href="/" className="view-site">↗ <span>View website</span></a><button type="button" className="admin-user" onClick={() => { authService.logout(); window.location.href = '/admin/login' }}><span className="user-avatar">{user.avatar}</span><span><strong>{user.name}</strong><small>{user.role}</small></span><span className="user-more">•••</span></button></div>
    </aside>
  )
}