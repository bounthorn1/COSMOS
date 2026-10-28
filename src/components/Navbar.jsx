import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import Logo from './Logo'
import LanguageSwitcher from './LanguageSwitcher'
import { navLinks } from '../data/nav'
import { useLanguage } from '../i18n/LanguageContext'
import useScrolled from '../hooks/useScrolled'

function isActiveLink(location, link) {
  if (link.hash) {
    return location.pathname === '/' && location.hash === `#${link.hash}`
  }
  if (link.to === '/') return location.pathname === '/'
  return location.pathname.startsWith(link.to)
}

export default function Navbar() {
  const { t } = useLanguage()
  const location = useLocation()
  const scrolled = useScrolled(24)
  const [menuOpen, setMenuOpen] = useState(false)

  // Close the mobile drawer whenever the route changes.
  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname, location.hash])

  // Lock body scroll + close on Escape while the drawer is open.
  useEffect(() => {
    if (!menuOpen) return undefined
    document.body.classList.add('is-menu-open')
    const onKey = (event) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.classList.remove('is-menu-open')
      window.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  return (
    <>
      {/*
        The drawer MUST be a sibling of <header>: backdrop-filter on the
        header would otherwise become the containing block for the fixed
        drawer and collapse its height.
      */}
      <header className={`navbar ${scrolled ? 'is-scrolled' : ''} ${menuOpen ? 'is-open' : ''}`}>
        <div className="container navbar-inner">
          <Link to="/" className="navbar-brand" aria-label="COSMOS — home">
            <Logo />
          </Link>

          <nav className="navbar-links" aria-label={t.nav.explore}>
            {navLinks.map((link) => (
              <Link
                key={link.key}
                to={link.to}
                className={`navbar-link ${isActiveLink(location, link) ? 'is-active' : ''}`}
              >
                {t.nav[link.key]}
              </Link>
            ))}
          </nav>

          <div className="navbar-side">
            <LanguageSwitcher />
            <button
              type="button"
              className="navbar-toggle"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? t.nav.closeMenu : t.nav.openMenu}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      <div id="mobile-menu" className={`navbar-drawer ${menuOpen ? 'is-open' : ''}`}>
        <nav className="drawer-links" aria-label={t.nav.explore}>
          {navLinks.map((link, index) => (
            <Link
              key={link.key}
              to={link.to}
              className="drawer-link"
              style={{ transitionDelay: menuOpen ? `${80 + index * 45}ms` : '0ms' }}
            >
              <span className="drawer-index">0{index + 1}</span>
              {t.nav[link.key]}
            </Link>
          ))}
        </nav>
        <div className="drawer-foot">
          <span className="drawer-lang-label">{t.nav.language}</span>
          <LanguageSwitcher variant="stacked" />
        </div>
      </div>
    </>
  )
}
