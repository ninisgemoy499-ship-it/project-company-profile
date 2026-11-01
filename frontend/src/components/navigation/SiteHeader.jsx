import { useState } from 'react'
import { Arrow } from '../common/Arrow'

export function SiteHeader({ company }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="site-header">
      <a className="brand" href="/#top" aria-label={`${company.name} home`}>
        <span className="brand-mark">N</span>
        <span>{company.name}</span>
      </a>
      <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen((open) => !open)}>
        <span>{menuOpen ? 'Close' : 'Menu'}</span>
        <span className="menu-lines" aria-hidden="true"><i /><i /></span>
      </button>
      <nav id="main-navigation" className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Public navigation">
        <a href="/#top" onClick={closeMenu}>Home</a>
        <a href="/#about" onClick={closeMenu}>Profil</a>
        <a href="/#work" onClick={closeMenu}>Product</a>
        <a href="/#services" onClick={closeMenu}>Service</a>
        <a href="/#rental" onClick={closeMenu}>Rental</a>
        <a href="/#artikel" onClick={closeMenu}>Artikel</a>
        <a className="nav-contact" href="/#contact" onClick={closeMenu}>Kontak <Arrow /></a>
      </nav>
    </header>
  )
}