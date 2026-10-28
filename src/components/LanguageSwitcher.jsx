import { useLanguage } from '../i18n/LanguageContext'

/**
 * Segmented EN / ខ្មែរ switcher. `variant` allows the footer
 * to reuse the control with a stacked layout.
 */
export default function LanguageSwitcher({ variant = 'inline' }) {
  const { language, setLanguage, languages, t } = useLanguage()

  return (
    <div
      className={`lang-switch lang-switch--${variant}`}
      role="group"
      aria-label={t.nav.language}
    >
      {languages.map((lang) => {
        const isActive = language === lang.code
        return (
          <button
            key={lang.code}
            type="button"
            className={`lang-option ${isActive ? 'is-active' : ''}`}
            aria-pressed={isActive}
            lang={lang.code}
            onClick={() => setLanguage(lang.code)}
          >
            {lang.short}
          </button>
        )
      })}
    </div>
  )
}
