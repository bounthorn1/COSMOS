import { useEffect, useRef } from 'react'
import useReducedMotion from '../hooks/useReducedMotion'

/**
 * Ambient starfield on a lightweight <canvas>.
 * - Slow drift + twinkle; paused when the tab is hidden.
 * - With prefers-reduced-motion, renders a static sky once (no rAF loop).
 * - DPR-aware, capped at 2, and re-seeds on resize.
 */
export default function StarField({ className = '' }) {
  const canvasRef = useRef(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined
    const ctx = canvas.getContext('2d')
    if (!ctx) return undefined

    let stars = []
    let raf = 0
    let width = 0
    let height = 0
    let time = 0

    const seed = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = Math.max(1, Math.round(rect.width))
      height = Math.max(1, Math.round(rect.height))
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const count = Math.min(190, Math.max(70, Math.round((width * height) / 9000)))
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 0.35 + Math.random() * 1.15,
        base: 0.28 + Math.random() * 0.5,
        phase: Math.random() * Math.PI * 2,
        speed: 0.4 + Math.random() * 0.9,
        vx: -(0.012 + Math.random() * 0.05),
        vy: 0.008 + Math.random() * 0.03,
        tint: Math.random() < 0.82 ? '255,255,255' : '150,185,255',
      }))
    }

    const paint = (drift) => {
      ctx.clearRect(0, 0, width, height)
      for (const s of stars) {
        if (drift) {
          s.x += s.vx
          s.y += s.vy
          if (s.x < -2) s.x = width + 2
          if (s.y > height + 2) s.y = -2
        }
        const twinkle = drift ? 0.22 * Math.sin(time * 0.0011 * s.speed + s.phase) + 0.22 : 0
        const alpha = Math.max(0.05, Math.min(1, s.base + twinkle))
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${s.tint},${alpha.toFixed(3)})`
        ctx.fill()
      }
    }

    const loop = (t) => {
      time = t
      paint(true)
      raf = requestAnimationFrame(loop)
    }

    const start = () => {
      seed()
      if (reducedMotion) {
        paint(false) // static sky, no animation
      } else {
        cancelAnimationFrame(raf)
        raf = requestAnimationFrame(loop)
      }
    }

    const onVisibility = () => {
      if (reducedMotion) return
      if (document.hidden) {
        cancelAnimationFrame(raf)
        raf = 0
      } else if (!raf) {
        raf = requestAnimationFrame(loop)
      }
    }

    const onResize = () => {
      cancelAnimationFrame(raf)
      raf = 0
      start()
    }

    start()
    window.addEventListener('resize', onResize)
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [reducedMotion])

  return <canvas ref={canvasRef} className={`starfield ${className}`} aria-hidden="true" />
}
