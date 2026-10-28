import LazyImage from '../components/LazyImage'
import Reveal from '../components/Reveal'
import { missions } from '../data/missions'
import usePageMeta from '../hooks/usePageMeta'
import { useLanguage } from '../i18n/LanguageContext'
import rocketImg from '../assets/images/rocket.webp'
import issImg from '../assets/images/iss.webp'
import roverImg from '../assets/images/rover.webp'

const gallery = [
  { image: rocketImg, width: 900, height: 600 },
  { image: issImg, width: 900, height: 600 },
  { image: roverImg, width: 900, height: 600 },
]

export default function MissionsPage() {
  const { t } = useLanguage()
  usePageMeta(t.meta.missions)

  return (
    <div className="page">
      <header className="page-head">
        <div className="container">
          <Reveal>
            <p className="eyebrow">{t.missionsPage.eyebrow}</p>
            <h1 className="section-title page-title">{t.missionsPage.title}</h1>
            <p className="lede">{t.missionsPage.lede}</p>
          </Reveal>
        </div>
      </header>

      <div className="container">
        <Reveal className="missions-gallery" delay={80}>
          {gallery.map((item, index) => (
            <figure className="missions-gallery-item" key={item.image}>
              <LazyImage
                src={item.image}
                alt={t.missionsPage.galleryAlts[index]}
                width={item.width}
                height={item.height}
                className="missions-gallery-photo"
              />
              <figcaption className="missions-gallery-caption">
                {t.missionsPage.galleryCaptions[index]}
              </figcaption>
            </figure>
          ))}
        </Reveal>

        <ol className="missions-list">
          {missions.map((mission, index) => {
            const info = t.missionItems[mission.id]
            return (
              <Reveal
                as="li"
                className="mission-row"
                key={mission.id}
                delay={Math.min(index, 3) * 60}
              >
                <div className="mission-year" aria-hidden="true">
                  <span>{mission.year}</span>
                  <span className="mission-node" />
                </div>
                <article className="mission-card">
                  <header className="mission-head">
                    <h2 className="mission-name">{mission.name}</h2>
                    <div className="mission-meta">
                      <span className="mission-agency">{info.agency}</span>
                      <span
                        className={`mission-status ${mission.status === 'active' ? 'is-active' : ''}`}
                      >
                        <span className="mission-status-dot" aria-hidden="true" />
                        {mission.status === 'active'
                          ? t.missionsPage.active
                          : t.missionsPage.completed}
                      </span>
                    </div>
                  </header>
                  <p className="body-text">{info.desc}</p>
                </article>
              </Reveal>
            )
          })}
        </ol>
      </div>
    </div>
  )
}
