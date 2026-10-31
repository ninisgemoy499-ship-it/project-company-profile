import { SiteHeader } from '../components/navigation/SiteHeader'
import { SiteFooter } from '../components/layout/SiteFooter'
import '../App.css'

export function PublicLayout({ children, company }) {
  return <main className="site-shell"><SiteHeader company={company} />{children}<SiteFooter company={company} /></main>
}