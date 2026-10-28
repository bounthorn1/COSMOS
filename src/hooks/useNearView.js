import { useEffect, useRef, useState } from 'react'

/**
 * Marks a component as "near the viewport" so heavy, below-the-fold
 * features (the WebGL viewer) only mount when a user is about to see them.
 * Once near, it stays mounted — no flicker on scroll-back.
 */
export default function useNearView(rootMargin = '700px 0px') {
  const ref = useRef(null)
  const [near, setNear] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') {
      setNear(true)
      return undefined
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true)
          observer.disconnect()
        }
      },
      { rootMargin },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [rootMargin])

  return [ref, near]
}
