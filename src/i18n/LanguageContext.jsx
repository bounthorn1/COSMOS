import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import en from './en'
import km from './km'

/**
 * COSMOS bilingual system.
 * - Dictionaries live in separate files (en.js / km.js) so components never
 *   duplicate markup per language.
 * - `language` is persisted to localStorage and mirrored onto
 *   <html lang> so CSS can retune typography (Kantumruy Pro / line-height).
 * - Default language is English unless a saved preference exists.
 */

const DICTIONARIES = { en, km }

export const LANGUAGES = [
  { code: 'en', short: 'EN', label: 'English' },
  { code: 'km', short: 'ខ្មែរ', label: 'ភាសាខ្មែរ' },
]

const STORAGE_KEY = 'cosmos-language'
const DEFAULT_LANGUAGE = 'en'

const LanguageContext = createContext(null)

function resolveInitialLanguage() {
  if (typeof window === 'undefined') return DEFAULT_LANGUAGE
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (saved && DICTIONARIES[saved]) return saved
  } catch {
    /* storage unavailable (private mode) — fall through */
  }
  return DEFAULT_LANGUAGE
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(resolveInitialLanguage)

  useEffect(() => {
    document.documentElement.lang = language === 'km' ? 'km' : 'en'
    try {
      window.localStorage.setItem(STORAGE_KEY, language)
    } catch {
      /* ignore persistence failures */
    }
  }, [language])

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t: DICTIONARIES[language],
      languages: LANGUAGES,
    }),
    [language],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) {
    throw new Error('useLanguage must be used inside <LanguageProvider>')
  }
  return ctx
}
