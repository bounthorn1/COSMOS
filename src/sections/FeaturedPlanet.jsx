import { lazy, Suspense } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import LazyImage from '../components/LazyImage'
import Reveal from '../components/Reveal'
import useNearView from '../hooks/useNearView'
import { useLanguage } from '../i18n/LanguageContext'
import { bodyTextures } from '../three/textures'
import marsImg from '../assets/images/mars-featured.webp'

/* The WebGL viewer (Three.js) is loaded on demand, just before it is seen. */
const PlanetViewer = lazy(() => import('../three/PlanetViewer'))

/**
 * Featured planet (Mars) — cinematic split layout. Phase 2 turns the
 * reserved 3D slot into a real, interactive WebGL model of Mars.
 */
export default function FeaturedPlanet() {
  const { t } = useLanguage()
  const [viewerRef, viewerNear] = useNearView('600px 0px')

  return (
    <section id="featured" className="section featured" aria-labelledby="featured-title">
      <div className="container featured-grid">
        <div className="featured-media" data-parallax="0.1">
          <div className="media-glow media-glow--mars" aria-hidden="true" />
          <LazyImage
            src={marsImg}
            alt={t.featured.imageAlt}
            width={1200}
            height={1200}
            className="featured-photo"
          />
        </div>

        <div className="featured-copy">
          <Reveal>
            <p className="eyebrow">{t.featured.eyebrow}</p>
            <h2 id="featured-title" className="featured-title">
              {t.featured.title}
              <span className="featured-note">{t.featured.titleNote}</span>
            </h2>
            <p className="body-text">{t.featured.body}</p>
            <Link to="/planets/mars" className="btn btn-solid">
              {t.featured.cta}
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </Reveal>

          <Reveal delay={160}>
            <div className="featured-viewer" ref={viewerRef}>
              {viewerNear && (
                <Suspense fallback={null}>
                  <PlanetViewer
                    bodyId="mars"
                    textureUrl={bodyTextures.mars}
                    accent="#e07a55"
                    fallbackSrc={marsImg}
                    fallbackAlt={t.featured.imageAlt}
                    variant="standalone"
                  />
                </Suspense>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
