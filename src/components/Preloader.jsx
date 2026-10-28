import { useEffect, useState } from 'react'
import Logo from './Logo'
import useReducedMotion from '../hooks/useReducedMotion'

/**
 * One-per-session cinematic intro. Skipped entirely for visitors who
 * prefer reduced motion (or who have already seen it this session).
 */
export default function Preloader() {
  const reducedMotion = useReducedMotion()
  const [phase, setPhase] = useState(() => {
    if (reducedMotion) return 'done'
    try {
      if (window.sessionStorage.getItem('cosmos-intro')) return 'done'
    } catch {
      /* storage unavailable — still show once */
    }
    return 'intro'
  })

  useEffect(() => {
    if (phase !== 'intro') return undefined
    try {
      window.sessionStorage.setItem('cosmos-intro', '1')
    } catch {
      /* ignore */
    }
    const hide = setTimeout(() => setPhase('leaving'), 1000)
    return () => clearTimeout(hide)
  }, [phase])

  useEffect(() => {
    /* Separate effect: the leaving→done timer must survive the intro's cleanup. */
    if (phase !== 'leaving') return undefined
    const remove = setTimeout(() => setPhase('done'), 600)
    return () => clearTimeout(remove)
  }, [phase])

  if (phase === 'done') return null

  return (
    <div
      className={`preloader ${phase === 'leaving' ? 'is-leaving' : ''}`}
      aria-hidden="true"
    >
      <div className="preloader-inner">
        <Logo />
        <span className="preloader-line">
          <span className="preloader-progress" />
        </span>
      </div>
    </div>
  )
}
