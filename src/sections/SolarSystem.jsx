import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Info } from 'lucide-react'
import LazyImage from '../components/LazyImage'
import Reveal from '../components/Reveal'
import OrbitMap from '../components/OrbitMap'
import { solarBodies } from '../data/planets'
import { useLanguage } from '../i18n/LanguageContext'

function formatNumber(value) {
  return value.toLocaleString('en-US')
}

/**
 * "The Solar System" — interactive body selector.
 * Thumbnails + top-down orbit map + detail panel for the Sun and all
 * eight planets. Sizes are visual only and clearly disclaimed as
 * not-to-scale. The detail image stays photographic; full 3D models
 * live on each planet's page (see PlanetViewer).
 */
export default function SolarSystem() {
  const { t } = useLanguage()
  const [activeId, setActiveId] = useState('sun')
  const stripRef = useRef(null)
  const reducedMotion = typeof window !== 'undefined'
    && window.matchMedia
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const active = solarBodies.find((b) => b.id === activeId)
  const info = t.bodies[active.id]

  // Keep the active thumbnail centred inside its own strip (never the page).
  useEffect(() => {
    const strip = stripRef.current
    const button = strip?.querySelector(`[data-body="${activeId}"]`)
    if (!strip || !button) return
    const target = button.offsetLeft - (strip.clientWidth - button.clientWidth) / 2
    strip.scrollTo({ left: Math.max(0, target), behavior: reducedMotion ? 'auto' : 'smooth' })
  }, [activeId, reducedMotion])

  const stats = [
    { label: t.stats.diameter, value: `${formatNumber(active.stats.diameterKm)} ${t.units.km}` },
    {
      label: t.stats.dayLength,
      value: `${active.stats.dayValue} ${t.units[active.stats.dayUnit]}`,
    },
    { label: t.stats.avgTemp, value: `${active.stats.tempC} °C` },
    {
      label: t.stats.distance,
      value: active.stats.distanceMkm == null
        ? '—'
        : `${active.stats.distanceMkm} ${t.units.millionKm}`,
    },
  ]

  return (
    <section id="solar-system" className="section solar" aria-labelledby="solar-title">
      <div className="container">
        <Reveal className="section-head">
          <p className="eyebrow">{t.solarSystem.eyebrow}</p>
          <h2 id="solar-title" className="section-title">
            {t.solarSystem.title}
          </h2>
          <p className="lede">{t.solarSystem.lede}</p>
          <p className="body-text">{t.solarSystem.body}</p>
        </Reveal>

        <Reveal className="orbit-wrap" delay={80}>
          <OrbitMap activeId={activeId} onSelect={setActiveId} />
        </Reveal>

        <Reveal className="solar-stage" delay={100}>
          <div className="solar-detail" key={active.id}>
            <div
              className="solar-visual"
              style={{ '--glow': active.accent }}
            >
              <div className="media-glow" aria-hidden="true" />
              <LazyImage
                src={active.image}
                alt={`${info.name} — ${info.tagline}`}
                width={880}
                height={880}
                className="solar-photo"
                imgClassName="solar-img"
              />
            </div>

            <div className="solar-panel">
              <p className="solar-type">{t.solarSystem[info.type]}</p>
              <h3 className="solar-name">{info.name}</h3>
              <p className="solar-tagline">{info.tagline}</p>
              <p className="body-text solar-intro">{info.intro}</p>

              <dl className="solar-stats">
                {stats.map((stat) => (
                  <div className="solar-stat" key={stat.label}>
                    <dt className="solar-stat-label">{stat.label}</dt>
                    <dd className="solar-stat-value">{stat.value}</dd>
                  </div>
                ))}
              </dl>

              <Link to={`/planets/${active.id}`} className="btn btn-solid solar-cta">
                {info.cta}
                <ArrowRight size={16} aria-hidden="true" />
                <span className="sr-only"> — {t.solarSystem.exploreHint}</span>
              </Link>
            </div>
          </div>

          <div
            className="solar-strip-wrap"
            role="group"
            aria-label={t.solarSystem.selectorLabel}
          >
            <div className="solar-strip" ref={stripRef}>
              {solarBodies.map((body) => {
                const bodyInfo = t.bodies[body.id]
                const selected = body.id === activeId
                return (
                  <button
                    key={body.id}
                    type="button"
                    data-body={body.id}
                    className={`solar-thumb ${selected ? 'is-active' : ''}`}
                    style={{ '--glow': body.accent }}
                    aria-pressed={selected}
                    onClick={() => setActiveId(body.id)}
                  >
                    <span className="solar-thumb-frame">
                      <img src={body.image} alt="" width="88" height="88" loading="lazy" decoding="async" />
                    </span>
                    <span className="solar-thumb-name">{bodyInfo.shortName}</span>
                  </button>
                )
              })}
            </div>
          </div>

          <p className="scale-note">
            <Info size={14} aria-hidden="true" />
            {t.solarSystem.scaleNote}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
