import { useEffect, useRef, useState } from 'react'
import useReducedMotion from '../hooks/useReducedMotion'

/**
 * Scroll-entrance wrapper. Adds `.is-in` when the element enters the
 * viewport. With prefers-reduced-motion the content is shown immediately
 * and CSS disables the transition entirely.
 *
 * This is the future seam for GSAP ScrollTrigger: replace the Intersection-
 * Observer with a timeline keyed on the same wrapper element.
 */
export default function Reveal({
  as: Tag = 'div',
  delay = 0,
  className = '',
  children,
  ...rest
}) {
  const ref = useRef(null)
  const reducedMotion = useReducedMotion()
  const [inView, setInView] = useState(false)

  useEffect(() => {
    if (reducedMotion) {
      setInView(true)
      return undefined
    }
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return undefined
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [reducedMotion])

  return (
    <Tag
      ref={ref}
      className={`reveal ${inView ? 'is-in' : ''} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  )
}
