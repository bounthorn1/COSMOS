import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import LazyImage from '../components/LazyImage'
import Reveal from '../components/Reveal'
import { solarBodies } from '../data/planets'
import usePageMeta from '../hooks/usePageMeta'
import { useLanguage } from '../i18n/LanguageContext'

export default function PlanetsPage() {
  const { t } = useLanguage()
  usePageMeta(t.meta.planets)

  return (
    <div className="page">
      <header className="page-head">
        <div className="container">
          <Reveal>
            <p className="eyebrow">{t.planetsPage.eyebrow}</p>
            <h1 className="section-title page-title">{t.planetsPage.title}</h1>
            <p className="lede">{t.planetsPage.lede}</p>
          </Reveal>
        </div>
      </header>

      <div className="container">
        <ul className="planet-grid">
          {solarBodies.map((body, index) => {
            const info = t.bodies[body.id]
            return (
              <Reveal
                as="li"
                key={body.id}
                delay={(index % 3) * 70}
                style={{ '--glow': body.accent }}
              >
                <Link to={`/planets/${body.id}`} className="planet-card">
                  <span className="planet-card-media">
                    <span className="media-glow" aria-hidden="true" />
                    <LazyImage
                      src={body.image}
                      alt={info.name}
                      width={640}
                      height={640}
                      className="planet-card-photo"
                      imgClassName="planet-card-img"
                    />
                    {body.kind === 'star' && (
                      <span className="planet-card-badge">{t.planetsPage.starBadge}</span>
                    )}
                  </span>
                  <span className="planet-card-body">
                    <span className="planet-card-name">{info.name}</span>
                    <span className="planet-card-tagline">{info.tagline}</span>
                    <span className="planet-card-cta">
                      {t.planetsPage.exploreCta}
                      <ArrowRight size={14} aria-hidden="true" />
                    </span>
                  </span>
                </Link>
              </Reveal>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
