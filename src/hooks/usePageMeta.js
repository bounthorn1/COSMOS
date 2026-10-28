import { useEffect } from 'react'

/**
 * Keeps the browser tab title in sync with the current page + language.
 * (Document language is handled by the LanguageProvider.)
 */
export default function usePageMeta(title) {
  useEffect(() => {
    if (title) document.title = title
  }, [title])
}
