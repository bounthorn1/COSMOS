import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import LazyImage from '../components/LazyImage'
import Reveal from '../components/Reveal'
import { beyondItems } from '../data/beyond'
import { useLanguage } from '../i18n/LanguageContext'

/**
 * "Beyond Our Solar System" — deep-sky editorial rows leading
 * toward future phases of educational content.
 */
export default function Beyond() {
  const { t } = useLanguage()

  return (
    <section id="beyond" className="section beyond" aria-labelledby="beyond-title">
      <div className="container">
        <Reveal className="section-head">
          <p className="eyebrow">{t.beyond.eyebrow}</p>
          <h2 id="beyond-title" className="section-title">
            {t.beyond.title}
          </h2>
          <p className="lede">{t.beyond.lede}</p>
        </Reveal>

        <div className="beyond-list">
          {beyondItems.map((item, index) => {
            const info = t.beyondItems[item.id]
            return (
              <Reveal
                as="article"
                className={`beyond-row ${index % 2 === 1 ? 'is-flipped' : ''}`}
                key={item.id}
                delay={index * 60}
              >
                <div className="beyond-media">
                  <div className="media-glow media-glow--deep" aria-hidden="true" />
                  <LazyImage
                    src={item.image}
                    alt={info.title}
                    width={1024}
                    height={768}
                    className="beyond-photo"
                  />
                  <span className="beyond-index" aria-hidden="true">
                    0{index + 1}
                  </span>
                </div>
                <div className="beyond-copy">
                  <h3 className="beyond-title">{info.title}</h3>
                  <p className="body-text">{info.desc}</p>
                </div>
              </Reveal>
            )
          })}
        </div>

        <Reveal className="beyond-closing" delay={120}>
          <p className="beyond-closing-text">{t.beyond.closing}</p>
          <Link to="/missions" className="btn btn-ghost">
            {t.beyond.cta}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
