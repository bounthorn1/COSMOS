import Hero from '../sections/Hero'
import OurPlace from '../sections/OurPlace'
import SolarSystem from '../sections/SolarSystem'
import FeaturedPlanet from '../sections/FeaturedPlanet'
import Beyond from '../sections/Beyond'
import usePageMeta from '../hooks/usePageMeta'
import { useLanguage } from '../i18n/LanguageContext'

export default function HomePage() {
  const { t } = useLanguage()
  usePageMeta(t.meta.home)

  return (
    <>
      <Hero />
      <OurPlace />
      <SolarSystem />
      <FeaturedPlanet />
      <Beyond />
    </>
  )
}
