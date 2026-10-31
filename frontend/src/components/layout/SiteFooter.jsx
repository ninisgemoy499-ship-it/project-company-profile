import { Arrow } from '../common/Arrow'

export function SiteFooter({ company }) {
  return (
    <footer className="site-footer" id="contact">
      <div className="footer-cta"><p className="eyebrow">Have a good one?</p><h2>Let&apos;s make it<br /><em>unforgettable.</em></h2><a className="text-link" href={`mailto:${company.email}`}>{company.email} <Arrow /></a></div>
      <div className="footer-bottom"><span>© 2025 Northstar Studio</span><span>{company.location}</span><a href="#top">Back to top ↑</a></div>
    </footer>
  )
}