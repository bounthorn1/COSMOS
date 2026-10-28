import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import useReducedMotion from '../hooks/useReducedMotion'

/**
 * Keeps scrolling sane across route changes:
 * - "/#section" targets scroll smoothly into view (navbar offset handled
 *   by CSS scroll-margin-top).
 * - Plain navigation resets scroll to the top.
 *
 * Later phases can hook GSAP here for camera-style transitions.
 */
export default function ScrollManager() {
  const { pathname, hash } = useLocation()
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (hash) {
      const id = hash.slice(1)
      const frame = requestAnimationFrame(() => {
        const el = document.getElementById(id)
        if (el) {
          el.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' })
        } else {
          window.scrollTo(0, 0)
        }
      })
      return () => cancelAnimationFrame(frame)
    }
    window.scrollTo(0, 0)
    return undefined
  }, [pathname, hash, reducedMotion])

  return null
}
