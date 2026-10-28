import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { LanguageProvider, useLanguage } from './i18n/LanguageContext'
import ScrollManager from './components/ScrollManager'
import Preloader from './components/Preloader'
import ScrollCinema from './components/ScrollCinema'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import PlanetsPage from './pages/PlanetsPage'
import PlanetDetailPage from './pages/PlanetDetailPage'
import MissionsPage from './pages/MissionsPage'
import AboutPage from './pages/AboutPage'
import NotFoundPage from './pages/NotFoundPage'

function SkipLink() {
  const { t } = useLanguage()
  return (
    <a className="skip-link" href="#main">
      {t.nav.skipToContent}
    </a>
  )
}

/**
 * Remounts per route so each page gets a soft cinematic entrance
 * (pure CSS — safe under prefers-reduced-motion).
 */
function RouteShell() {
  const location = useLocation()
  return (
    <main id="main">
      <div className="route-anim" key={location.pathname}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/planets" element={<PlanetsPage />} />
          <Route path="/planets/:id" element={<PlanetDetailPage />} />
          <Route path="/missions" element={<MissionsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </main>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <ScrollManager />
        <Preloader />
        <SkipLink />
        <Navbar />
        <RouteShell />
        <ScrollCinema />
        <Footer />
      </BrowserRouter>
    </LanguageProvider>
  )
}
