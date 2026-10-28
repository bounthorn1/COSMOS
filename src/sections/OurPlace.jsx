import LazyImage from '../components/LazyImage'
import Reveal from '../components/Reveal'
import { useLanguage } from '../i18n/LanguageContext'
import earthImg from '../assets/images/earth-large.webp'

/**
 * "Our Place in Space" — Earth-focused editorial section.
 * The media block carries data-parallax so GSAP ScrollTrigger
 * (Phase 3) can pick it up without markup changes.
 */
export default function OurPlace() {
  const { t } = useLanguage()

  return (
    <section id="our-place" className="section our-place" aria-labelledby="our-place-title">
      <div className="container our-place-grid">
        <Reveal className="our-place-media" data-parallax="0.14">
          <div className="our-place-frame">
            <div className="media-glow media-glow--blue" aria-hidden="true" />
            <LazyImage
              src={earthImg}
              alt={t.ourPlace.imageAlt}
              width={1024}
              height={1024}
              className="our-place-photo"
            />
          </div>
          <p className="media-caption">{t.ourPlace.caption}</p>
        </Reveal>

        <div className="our-place-copy">
          <Reveal>
            <p className="eyebrow">{t.ourPlace.eyebrow}</p>
            <h2 id="our-place-title" className="section-title">
              {t.ourPlace.title}
            </h2>
            <p className="lede">{t.ourPlace.lede}</p>
          </Reveal>
          <Reveal delay={120}>
            <p className="body-text">{t.ourPlace.body1}</p>
            <p className="body-text">{t.ourPlace.body2}</p>
          </Reveal>
          <Reveal delay={200}>
            <dl className="stat-row">
              {t.ourPlace.stats.map((stat) => (
                <div className="stat" key={stat.label}>
                  <dt className="stat-value">{stat.value}</dt>
                  <dd className="stat-label">{stat.label}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
