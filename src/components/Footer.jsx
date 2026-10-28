import { Link } from 'react-router-dom'
import { ArrowUp } from 'lucide-react'
import Logo from './Logo'
import LanguageSwitcher from './LanguageSwitcher'
import { navLinks, footerSectionLinks } from '../data/nav'
import { useLanguage } from '../i18n/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Logo />
            <p className="footer-tagline">{t.footer.tagline}</p>
            <button
              type="button"
              className="footer-top"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <ArrowUp size={15} aria-hidden="true" />
              {t.footer.backToTop}
            </button>
          </div>

          <nav className="footer-col" aria-label={t.footer.navTitle}>
            <h3 className="footer-heading">{t.footer.navTitle}</h3>
            <ul className="footer-list">
              {navLinks.map((link) => (
                <li key={link.key}>
                  <Link to={link.to} className="footer-link">
                    {t.nav[link.key]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="footer-col" aria-label={t.footer.sectionsTitle}>
            <h3 className="footer-heading">{t.footer.sectionsTitle}</h3>
            <ul className="footer-list">
              {footerSectionLinks.map((link) => (
                <li key={link.key}>
                  <Link to={link.to} className="footer-link">
                    {t.sections[link.key]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer-col">
            <h3 className="footer-heading">{t.footer.languageTitle}</h3>
            <LanguageSwitcher variant="stacked" />
            <h3 className="footer-heading footer-heading--gap">{t.footer.creditsTitle}</h3>
            <p className="footer-fine">{t.footer.credits}</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-disclaimer">{t.footer.disclaimer}</p>
          <p className="footer-rights">© {year} · {t.footer.rights}</p>
        </div>
      </div>
    </footer>
  )
}
