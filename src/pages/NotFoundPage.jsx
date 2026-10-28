import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Reveal from '../components/Reveal'
import StarField from '../components/StarField'
import usePageMeta from '../hooks/usePageMeta'
import { useLanguage } from '../i18n/LanguageContext'

export default function NotFoundPage() {
  const { t } = useLanguage()
  usePageMeta(t.meta.notFound)

  return (
    <div className="page notfound">
      <StarField className="notfound-stars" />
      <div className="container notfound-inner">
        <Reveal>
          <p className="notfound-code">{t.notFound.code}</p>
          <h1 className="section-title">{t.notFound.title}</h1>
          <p className="lede">{t.notFound.body}</p>
          <Link to="/" className="btn btn-solid">
            <ArrowLeft size={16} aria-hidden="true" />
            {t.notFound.cta}
          </Link>
        </Reveal>
      </div>
    </div>
  )
}
