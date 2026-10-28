import { useEffect, useState } from 'react'

/**
 * Returns true once the window has scrolled past `threshold` pixels.
 * Used by the Navbar to switch between transparent and solid states.
 */
export default function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    let raf = 0
    const check = () => {
      raf = 0
      setScrolled(window.scrollY > threshold)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(check)
    }
    check()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [threshold])

  return scrolled
}
