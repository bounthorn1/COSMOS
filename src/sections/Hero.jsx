import { Link } from 'react-router-dom'
import { ArrowDown, ArrowRight } from 'lucide-react'
import StarField from '../components/StarField'
import LazyImage from '../components/LazyImage'
import { useLanguage } from '../i18n/LanguageContext'
import heroImg from '../assets/images/hero.webp'

/**
 * Cinematic full-screen hero.
 *
 * Phase 3: GSAP ScrollTrigger (see ScrollCinema) drifts the backdrop,
 * horizon arc and content on scroll; layered markup below
 * (backdrop / stars / veil / content) is stacked for depth compositing.
 */
export default function Hero() {
  const { t } = useLanguage()

  return (
    <section id="hero" className="hero" aria-labelledby="hero-title">
      <div className="hero-backdrop" data-scene="hero">
        <LazyImage
          src={heroImg}
          alt={t.hero.imageAlt}
          width={1920}
          height={1280}
          eager
          className="hero-photo"
        />
        <div className="hero-veil" aria-hidden="true" />
        <StarField className="hero-stars" />
        <div className="hero-arc" aria-hidden="true" />
      </div>

      <div className="container hero-inner">
        <p className="eyebrow hero-eyebrow">{t.hero.eyebrow}</p>
        <h1 id="hero-title" className="hero-title">
          <span className="hero-line">{t.hero.line1}</span>
          <span className="hero-line hero-line--glow">{t.hero.line2}</span>
        </h1>
        <p className="hero-subtitle">{t.hero.subtitle}</p>
        <div className="hero-actions">
          <Link to="/#our-place" className="btn btn-solid">
            {t.hero.ctaPrimary}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
          <Link to="/planets" className="btn btn-ghost">
            {t.hero.ctaSecondary}
          </Link>
        </div>
      </div>

      <div className="hero-scroll" aria-hidden="true">
        <span className="hero-scroll-label">{t.hero.scrollHint}</span>
        <span className="hero-scroll-track">
          <span className="hero-scroll-dot">
            <ArrowDown size={12} />
          </span>
        </span>
      </div>
    </section>
  )
}
