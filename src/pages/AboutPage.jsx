import Reveal from '../components/Reveal'
import usePageMeta from '../hooks/usePageMeta'
import { useLanguage } from '../i18n/LanguageContext'

export default function AboutPage() {
  const { t } = useLanguage()
  usePageMeta(t.meta.about)

  return (
    <div className="page">
      <header className="page-head">
        <div className="container">
          <Reveal>
            <p className="eyebrow">{t.aboutPage.eyebrow}</p>
            <h1 className="section-title page-title">{t.aboutPage.title}</h1>
            <p className="lede">{t.aboutPage.lede}</p>
          </Reveal>
        </div>
      </header>

      <div className="container about-body">
        <Reveal className="about-text">
          <p className="body-text">{t.aboutPage.body1}</p>
          <p className="body-text">{t.aboutPage.body2}</p>
        </Reveal>

        <Reveal as="section" className="about-block" delay={80} aria-labelledby="roadmap-title">
          <h2 id="roadmap-title" className="about-subtitle">
            {t.aboutPage.roadmapTitle}
          </h2>
          <ol className="phase-list">
            {t.aboutPage.phases.map((phase, index) => (
              <li className="phase" key={phase.name}>
                <span className="phase-index" aria-hidden="true">
                  0{index + 1}
                </span>
                <div className="phase-body">
                  <div className="phase-head">
                    <h3 className="phase-name">{phase.name}</h3>
                    <span className={`phase-status ${index === 0 ? 'is-current' : ''}`}>
                      {phase.status}
                    </span>
                  </div>
                  <p className="body-text">{phase.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal as="section" className="about-block" delay={120} aria-labelledby="tech-title">
          <h2 id="tech-title" className="about-subtitle">
            {t.aboutPage.techTitle}
          </h2>
          <ul className="tech-list">
            {t.aboutPage.techList.map((item) => (
              <li className="tech-item" key={item}>
                {item}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal as="section" className="about-block" delay={160} aria-labelledby="credits-title">
          <h2 id="credits-title" className="about-subtitle">
            {t.aboutPage.creditsTitle}
          </h2>
          <p className="body-text about-credits">{t.aboutPage.creditsBody}</p>
        </Reveal>
      </div>
    </div>
  )
}
