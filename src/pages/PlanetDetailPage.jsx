import { lazy, Suspense } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import LazyImage from '../components/LazyImage'
import Reveal from '../components/Reveal'
import useNearView from '../hooks/useNearView'
import { getBody, getNeighbours } from '../data/planets'
import { bodyTextures } from '../three/textures'
import usePageMeta from '../hooks/usePageMeta'
import { useLanguage } from '../i18n/LanguageContext'

/* The WebGL viewer (Three.js) is loaded on demand — never part of the
   initial bundle. Until the chunk + texture arrive, the flat photo shows. */
const PlanetViewer = lazy(() => import('../three/PlanetViewer'))

function formatNumber(value) {
  return value.toLocaleString('en-US')
}

/**
 * Shared stat formatting for the detail page.
 * Returns null entries for values a body does not have (e.g. the Sun).
 */
function buildStats(t, body) {
  const s = body.stats
  return [
    {
      label: t.stats.diameter,
      value: `${formatNumber(s.diameterKm)} ${t.units.km}`,
    },
    {
      label: t.stats.dayLength,
      value: s.dayValue == null ? '—' : `${s.dayValue} ${t.units[s.dayUnit]}`,
    },
    {
      label: t.stats.yearLength,
      value: s.yearValue == null ? '—' : `${s.yearValue} ${t.units[s.yearUnit]}`,
    },
    { label: t.stats.moons, value: s.moons == null ? '—' : String(s.moons) },
    { label: t.stats.avgTemp, value: `${s.tempC} °C` },
    {
      label: t.stats.distance,
      value: s.distanceMkm == null ? '—' : `${s.distanceMkm} ${t.units.millionKm}`,
    },
  ]
}

export default function PlanetDetailPage() {
  const { t } = useLanguage()
  const { id } = useParams()
  const body = getBody(id)

  usePageMeta(body ? `${t.bodies[body.id].name} — COSMOS` : t.meta.notFound)

  if (!body) {
    return (
      <div className="page">
        <div className="container detail-missing">
          <p className="detail-missing-code">404</p>
          <h1 className="section-title">{t.planetDetail.notFound}</h1>
          <Link to="/planets" className="btn btn-ghost">
            <ArrowLeft size={16} aria-hidden="true" />
            {t.planetDetail.back}
          </Link>
        </div>
      </div>
    )
  }

  const info = t.bodies[body.id]
  const { prev, next } = getNeighbours(body.id)
  const stats = buildStats(t, body)
  const [mediaRef, mediaNear] = useNearView('400px 0px')

  return (
    <div className="page">
      <div className="container">
        <Link to="/planets" className="crumb">
          <ArrowLeft size={15} aria-hidden="true" />
          {t.planetDetail.back}
        </Link>

        <div className="detail-grid" style={{ '--glow': body.accent }}>
          <Reveal className="detail-media">
            <div className="media-glow" aria-hidden="true" />
            <LazyImage
              src={body.image}
              alt={`${info.name} — ${info.tagline}`}
              width={880}
              height={880}
              className="detail-photo"
              imgClassName="detail-img"
            />
            {/* Phase 2 — real-time WebGL model fades in over the photo;
                the photo remains as the no-WebGL fallback. */}
            <div ref={mediaRef}>
              {mediaNear && (
                <Suspense fallback={null}>
                  <PlanetViewer
                    bodyId={body.id}
                    textureUrl={bodyTextures[body.id] ?? body.image}
                    accent={body.accent}
                    fallbackSrc={body.image}
                    fallbackAlt={info.name}
                    variant="overlay"
                  />
                </Suspense>
              )}
            </div>
          </Reveal>

          <div className="detail-copy">
            <Reveal>
              <p className="solar-type">{t.solarSystem[info.type]}</p>
              <h1 className="detail-title">{info.name}</h1>
              <p className="detail-tagline">{info.tagline}</p>
              <p className="lede">{info.intro}</p>
            </Reveal>
            <Reveal delay={110}>
              {info.detail.map((paragraph) => (
                <p className="body-text" key={paragraph.slice(0, 24)}>
                  {paragraph}
                </p>
              ))}
            </Reveal>
            <Reveal delay={180}>
              <h2 className="detail-stats-title">{t.planetDetail.statsTitle}</h2>
              <dl className="detail-stats">
                {stats.map((stat) => (
                  <div className="detail-stat" key={stat.label}>
                    <dt className="detail-stat-label">{stat.label}</dt>
                    <dd className="detail-stat-value">{stat.value}</dd>
                  </div>
                ))}
              </dl>
              <p className="detail-note">{t.planetDetail.approxNote}</p>
            </Reveal>
          </div>
        </div>

        <nav className="detail-neighbours" aria-label={`${t.planetDetail.prev} / ${t.planetDetail.next}`}>
          {prev ? (
            <Link to={`/planets/${prev.id}`} className="neighbour neighbour--prev">
              <span className="neighbour-direction">
                <ArrowLeft size={14} aria-hidden="true" />
                {t.planetDetail.prev}
              </span>
              <span className="neighbour-name">{t.bodies[prev.id].name}</span>
            </Link>
          ) : (
            <span className="neighbour neighbour--empty" aria-hidden="true" />
          )}
          {next ? (
            <Link to={`/planets/${next.id}`} className="neighbour neighbour--next">
              <span className="neighbour-direction">
                {t.planetDetail.next}
                <ArrowRight size={14} aria-hidden="true" />
              </span>
              <span className="neighbour-name">{t.bodies[next.id].name}</span>
            </Link>
          ) : (
            <span className="neighbour neighbour--empty" aria-hidden="true" />
          )}
        </nav>
      </div>
    </div>
  )
}
