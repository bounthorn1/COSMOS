import { useEffect, useRef } from 'react'
import { solarBodies } from '../data/planets'
import { useLanguage } from '../i18n/LanguageContext'
import useReducedMotion from '../hooks/useReducedMotion'

/**
 * COSMOS Phase 2.5 — illustrative top-down orbit map on a <canvas>.
 *
 * - Eight planets drift along stylised orbits; the Sun sits at the centre.
 * - Click / tap a world (or the Sun) to select it — selection is shared with
 *   the thumbnail strip in the Solar System section.
 * - The map pauses when scrolled off-screen, renders a static frame under
 *   prefers-reduced-motion, and stays decorative for screen readers
 *   (the thumbnail strip remains the accessible selector).
 * - Positions, speeds and sizes are illustrative and clearly disclaimed.
 */

const GOLDEN_ANGLE = 2.399963
const PLANETS = solarBodies.filter((b) => b.kind !== 'star')

function buildLayout() {
  return PLANETS.map((body, i) => ({
    body,
    orbit: i / (PLANETS.length - 1),
    base: i * GOLDEN_ANGLE + 0.7,
    speed: 0.05 / Math.pow(i + 1.35, 1.3),
  }))
}

export default function OrbitMap({ activeId, onSelect }) {
  const canvasRef = useRef(null)
  const { t } = useLanguage()
  const reducedMotion = useReducedMotion()

  const worldRef = useRef({
    time: 0,
    hovered: null,
    selected: activeId,
    positions: [],
    raf: 0,
    running: true,
    visible: true,
  })

  useEffect(() => {
    worldRef.current.selected = activeId
  }, [activeId])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined
    const ctx = canvas.getContext('2d')
    if (!ctx) return undefined

    const worlds = buildLayout()
    const state = worldRef.current
    let width = 0
    let height = 0
    let dpr = 1

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = Math.max(1, Math.round(rect.width))
      height = Math.max(1, Math.round(rect.height))
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const geometry = () => {
      const cx = width / 2
      const cy = height / 2
      const maxR = Math.min(width, height) / 2 - (width < 640 ? 30 : 44)
      const r0 = maxR * 0.2
      return { cx, cy, maxR, r0 }
    }

    const draw = (advance) => {
      const { cx, cy, maxR, r0 } = geometry()
      if (advance) state.time += 0.016

      ctx.clearRect(0, 0, width, height)
      state.positions = []

      // Orbit rings
      for (const w of worlds) {
        const r = r0 + Math.pow(w.orbit, 0.74) * (maxR - r0)
        ctx.beginPath()
        ctx.arc(cx, cy, r, 0, Math.PI * 2)
        ctx.strokeStyle =
          w.body.id === state.selected
            ? 'rgba(138, 180, 255, 0.32)'
            : 'rgba(146, 170, 212, 0.13)'
        ctx.lineWidth = 1
        ctx.stroke()
      }

      // The Sun
      const sunGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 26)
      sunGlow.addColorStop(0, 'rgba(255, 196, 107, 0.55)')
      sunGlow.addColorStop(1, 'rgba(255, 196, 107, 0)')
      ctx.fillStyle = sunGlow
      ctx.beginPath()
      ctx.arc(cx, cy, 26, 0, Math.PI * 2)
      ctx.fill()
      ctx.beginPath()
      ctx.arc(cx, cy, 9, 0, Math.PI * 2)
      ctx.fillStyle = '#ffc46b'
      ctx.shadowColor = 'rgba(255, 196, 107, 0.9)'
      ctx.shadowBlur = 14
      ctx.fill()
      ctx.shadowBlur = 0
      state.positions.push({ id: 'sun', x: cx, y: cy, hit: 20 })

      // Planets
      for (const w of worlds) {
        const r = r0 + Math.pow(w.orbit, 0.74) * (maxR - r0)
        const angle = w.base + state.time * w.speed * 10
        const x = cx + Math.cos(angle) * r
        const y = cy + Math.sin(angle) * r
        const big = w.body.kind !== 'terrestrial'
        const dot = (big ? 4.6 : 3.4) * (w.body.id === state.selected ? 1.25 : 1)

        ctx.beginPath()
        ctx.arc(x, y, dot, 0, Math.PI * 2)
        ctx.fillStyle = w.body.accent
        ctx.shadowColor = w.body.accent
        ctx.shadowBlur = w.body.id === state.hovered || w.body.id === state.selected ? 16 : 8
        ctx.fill()
        ctx.shadowBlur = 0

        if (w.body.id === state.selected || w.body.id === state.hovered) {
          ctx.beginPath()
          ctx.arc(x, y, dot + 5.5, 0, Math.PI * 2)
          ctx.strokeStyle = 'rgba(242, 245, 251, 0.65)'
          ctx.lineWidth = 1.2
          ctx.stroke()

          const info = t.bodies[w.body.id]
          ctx.font = '600 11px "Space Grotesk", "Inter", sans-serif'
          ctx.fillStyle = 'rgba(242, 245, 251, 0.92)'
          ctx.textAlign = 'center'
          ctx.textBaseline = 'top'
          ctx.fillText(info.shortName, x, y + dot + 9)
        }

        state.positions.push({ id: w.body.id, x, y, hit: 16 })
      }
    }

    const loop = () => {
      if (!state.running || !state.visible) return
      draw(true)
      state.raf = requestAnimationFrame(loop)
    }

    const start = () => {
      cancelAnimationFrame(state.raf)
      state.raf = 0
      draw(false)
      if (!reducedMotion && state.visible) {
        state.raf = requestAnimationFrame(loop)
      }
    }

    const onResize = () => {
      resize()
      draw(false)
    }

    const hitTest = (event) => {
      const rect = canvas.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      let best = null
      let bestDist = Infinity
      for (const p of state.positions) {
        const d = Math.hypot(x - p.x, y - p.y)
        if (d < p.hit + 6 && d < bestDist) {
          best = p.id
          bestDist = d
        }
      }
      return best
    }

    const onPointerMove = (event) => {
      const hit = hitTest(event)
      const changed = hit !== state.hovered
      state.hovered = hit
      canvas.style.cursor = hit ? 'pointer' : 'default'
      if (changed && reducedMotion) draw(false)
    }

    const onPointerLeave = () => {
      state.hovered = null
      canvas.style.cursor = 'default'
      if (reducedMotion) draw(false)
    }

    const onClick = (event) => {
      const hit = hitTest(event)
      if (hit && onSelect) onSelect(hit)
    }

    const observer =
      typeof IntersectionObserver !== 'undefined'
        ? new IntersectionObserver(([entry]) => {
            state.visible = entry.isIntersecting
            start()
          })
        : null
    observer?.observe(canvas)

    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(onResize) : null
    ro?.observe(canvas)

    resize()
    start()

    canvas.addEventListener('pointermove', onPointerMove)
    canvas.addEventListener('pointerleave', onPointerLeave)
    canvas.addEventListener('click', onClick)

    return () => {
      cancelAnimationFrame(state.raf)
      observer?.disconnect()
      ro?.disconnect()
      canvas.removeEventListener('pointermove', onPointerMove)
      canvas.removeEventListener('pointerleave', onPointerLeave)
      canvas.removeEventListener('click', onClick)
    }
  }, [reducedMotion, onSelect, t])

  return (
    <figure className="orbit-map">
      <canvas
        ref={canvasRef}
        className="orbit-canvas"
        role="img"
        aria-label={t.orbitMap.aria}
      />
      <figcaption className="orbit-caption">
        <span className="orbit-hint">{t.orbitMap.hint}</span>
        <span className="scale-note">
          {t.orbitMap.note}
        </span>
      </figcaption>
    </figure>
  )
}
