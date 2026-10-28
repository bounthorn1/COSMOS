import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import useReducedMotion from '../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

/**
 * COSMOS Phase 3 — GSAP ScrollTrigger cinematic layer.
 *
 * Mounts once inside the Router and (re)builds its triggers per route:
 *   1. Block parallax on every `[data-parallax]` layer (scrubbed).
 *   2. Hero drift — backdrop sinks/scales, content rises and fades, the
 *      horizon arc counter-drifts.
 *   3. Deep-field rows ease their imagery inside the frame.
 *   4. "Our Place" stat counters count up once, in view.
 *
 * Everything is skipped under prefers-reduced-motion and torn down
 * cleanly on route change via gsap.context().revert().
 */
export default function ScrollCinema() {
  const { pathname, hash } = useLocation()
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion) return undefined

    const ctx = gsap.context(() => {
      /* 1 — scrubbed block parallax on labelled layers */
      gsap.utils.toArray('[data-parallax]').forEach((el) => {
        const depth = parseFloat(el.dataset.parallax) || 0.1
        gsap.fromTo(
          el,
          { yPercent: -depth * 15 },
          {
            yPercent: depth * 15,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.6,
            },
          },
        )
      })

      /* 2 — hero drift (homepage only) */
      if (document.querySelector('.hero')) {
        gsap
          .timeline({
            scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 0.5 },
          })
          .to('.hero-photo img', { yPercent: 10, scale: 1.1, ease: 'none' }, 0)
          .to('.hero-arc', { yPercent: -7, ease: 'none' }, 0)
          .to('.hero-inner', { yPercent: -12, autoAlpha: 0.2, ease: 'none' }, 0)
          .to('.hero-scroll', { autoAlpha: 0, ease: 'none' }, 0)
      }

      /* 3 — deep-field imagery eased within its frame */
      gsap.utils.toArray('.beyond-photo img').forEach((img) => {
        gsap.fromTo(
          img,
          { yPercent: -5 },
          {
            yPercent: 5,
            ease: 'none',
            scrollTrigger: {
              trigger: img.closest('.beyond-media') || img,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.6,
            },
          },
        )
      })

      /* 4 — stat counters (English digits only; other scripts pass through) */
      gsap.utils.toArray('.stat-value').forEach((el) => {
        const match = (el.textContent || '').match(/^([^\d]*)([\d.]+)(.*)$/)
        if (!match) return
        const decimals = match[2].includes('.') ? 1 : 0
        const target = { value: 0 }
        gsap.to(target, {
          value: parseFloat(match[2]),
          duration: 1.7,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 86%', once: true },
          onUpdate: () => {
            el.textContent = `${match[1]}${target.value.toFixed(decimals)}${match[3]}`
          },
        })
      })
    })

    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    const timer = setTimeout(refresh, 900)

    return () => {
      window.removeEventListener('load', refresh)
      clearTimeout(timer)
      ctx.revert()
    }
  }, [pathname, hash, reducedMotion])

  return null
}
