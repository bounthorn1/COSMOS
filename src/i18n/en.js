/**
 * English dictionary — the source of truth for all COSMOS interface copy.
 * Structure mirrors km.js exactly; both are keyed by the same ids.
 */
const en = {
  code: 'en',

  meta: {
    home: 'COSMOS — Explore the Universe',
    planets: 'The Planets — COSMOS',
    missions: 'Missions — COSMOS',
    about: 'About — COSMOS',
    notFound: 'Lost in Space — COSMOS',
  },

  nav: {
    explore: 'Explore',
    solarSystem: 'Solar System',
    planets: 'Planets',
    missions: 'Missions',
    about: 'About',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    language: 'Language',
    skipToContent: 'Skip to content',
  },

  sections: {
    hero: 'Explore',
    ourPlace: 'Our Place in Space',
    solarSystem: 'The Solar System',
    featured: 'Featured Planet',
    beyond: 'Beyond Our Solar System',
  },

  hero: {
    eyebrow: 'A journey across space and time',
    line1: 'Explore',
    line2: 'the Universe',
    subtitle: 'Discover the worlds beyond our own.',
    ctaPrimary: 'Start exploring',
    ctaSecondary: 'Discover the planets',
    scrollHint: 'Scroll to begin',
    imageAlt: 'Deep space nebula and starfield stretching into darkness',
  },

  ourPlace: {
    eyebrow: 'Our home',
    title: 'Our Place in Space',
    lede: 'Every journey begins at home. Before reaching for other worlds, it helps to understand the one beneath our feet.',
    body1:
      'Earth is the only world we know of that supports life — a rocky planet wrapped in a thin layer of air, covered mostly by ocean, orbiting an ordinary star about 150 million kilometres away. From the Moon it rises as a blue marble; from the edge of the Solar System it is barely a pale blue dot.',
    body2:
      'That perspective is what COSMOS is about: understanding our place among the planets — and why protecting this small world matters.',
    stats: [
      { value: '8.1B', label: 'people share this planet' },
      { value: '71%', label: 'of the surface is ocean' },
      { value: '1', label: 'natural satellite — the Moon' },
      { value: '4.5B', label: 'years since the Earth formed' },
    ],
    imageAlt: 'The Earth seen from space, a blue world against black',
    caption: 'Earth — the view from low orbit',
  },

  solarSystem: {
    eyebrow: 'One star, eight worlds',
    title: 'The Solar System',
    lede: 'Bound together by gravity, one ordinary star and eight very different planets have travelled the galaxy together for 4.6 billion years.',
    body: 'Select a world below to meet it. Each is a place with its own weather, seasons and secrets — from the scorched plains of Mercury to the frozen methane winds of Neptune.',
    selectorLabel: 'Choose a world',
    scaleNote: 'For readability, the sizes and distances shown in this section are not to scale.',
    typeStar: 'Star',
    typeTerrestrial: 'Terrestrial planet',
    typeGasGiant: 'Gas giant',
    typeIceGiant: 'Ice giant',
    exploreHint: 'Opens the full profile',
  },

  featured: {
    eyebrow: 'Featured planet',
    title: 'Mars',
    titleNote: 'The Red Planet',
    body:
      'Mars is a cold desert world of rust-red dust, home to the tallest volcano and the deepest canyon in the Solar System. Billions of years ago, rivers and lakes shaped its surface — and a fleet of robotic explorers is reading that story today.',
    cta: 'Explore Mars',
    imageAlt: 'The planet Mars seen from orbit, rust-red surface with a bright polar cap',
    threeD: {
      label: 'Interactive 3D — Mars',
      note: 'A real-time model rendered in your browser. Drag to rotate.',
    },
  },

  viewer: {
    hint: 'Drag to rotate',
    fallbackBadge: 'Photo view',
    unsupported: '3D is not available in this browser — showing the photo instead.',
    aria: 'Interactive 3D model of {name} — drag to rotate.',
  },

  orbitMap: {
    aria:
      'Illustrative top-down map of planetary orbits. Use the buttons below the map to choose a world.',
    hint: 'Select a world on the map',
    note: 'Orbit positions, speeds and sizes are illustrative — not to scale.',
  },

  beyond: {
    eyebrow: 'Into the deep field',
    title: 'Beyond Our Solar System',
    lede: 'The Sun is one star among hundreds of billions in our galaxy — and our galaxy is one among trillions. This is where the story opens up.',
    cta: 'Follow the missions',
    closing:
      'The journey has only just begun. In future phases, COSMOS will travel deeper — to exoplanets, nebulae, and the edge of the observable universe.',
  },

  beyondItems: {
    andromeda: {
      title: 'The Andromeda Galaxy',
      desc: 'Our nearest large galactic neighbour, 2.5 million light-years away. On dark nights it is the most distant thing the naked eye can see — and in roughly 4.5 billion years, it will merge with our own galaxy.',
    },
    pillars: {
      title: 'The Pillars of Creation',
      desc: 'Towers of cold gas and dust in the Eagle Nebula, light-years tall, where new stars are being born. Space telescopes peer inside to watch star formation in action.',
    },
    interstellar: {
      title: 'Interstellar Space',
      desc: 'In 2012, Voyager 1 crossed the heliopause — the boundary of the Sun’s influence — becoming the first human-made object to travel between the stars. It still whispers home, at 160 bits per second.',
    },
  },

  planetsPage: {
    eyebrow: 'Eight worlds, one star',
    title: 'The Planets',
    lede: 'From scorched Mercury to windswept Neptune, every planet is a distinct world with its own story. Start anywhere — each one is worth the trip.',
    exploreCta: 'Explore',
    starBadge: 'Star',
  },

  planetDetail: {
    back: 'All planets',
    statsTitle: 'Key figures',
    approxNote: 'Figures are approximate averages, rounded for comparison at a glance.',
    prev: 'Previous',
    next: 'Next',
    notFound: 'This world lies beyond our current map.',
    threeD: {
      label: 'Interactive 3D model',
      note: 'Drag to rotate the real-time scene.',
    },
  },

  stats: {
    diameter: 'Diameter',
    dayLength: 'Day length',
    yearLength: 'Year length',
    moons: 'Moons',
    avgTemp: 'Mean temperature',
    distance: 'Distance from the Sun',
  },

  units: {
    km: 'km',
    millionKm: 'million km',
    earthDays: 'Earth days',
    earthHours: 'Earth hours',
    earthYears: 'Earth years',
  },

  missionsPage: {
    eyebrow: 'From Sputnik to Artemis',
    title: 'Missions That Moved Us',
    lede: 'Six decades of exploration, told through the spacecraft that carried us further than ever before.',
    galleryCaptions: ['Launch', 'In orbit', 'On the surface'],
    galleryAlts: [
      'A rocket lifting off through the night sky on a column of light',
      'The International Space Station orbiting high above Earth',
      'A robotic rover parked on the dusty red surface of Mars',
    ],
    active: 'Active',
    completed: 'Completed',
  },

  missionItems: {
    sputnik: {
      agency: 'USSR',
      desc: 'A polished metal sphere 58 cm across became the first artificial satellite. Its radio beeps announced the space age — and everything that followed.',
    },
    apollo11: {
      agency: 'NASA',
      desc: '“That’s one small step for man…” Apollo 11 carried the first humans to the surface of another world, while an estimated 600 million people watched it happen live.',
    },
    voyager: {
      agency: 'NASA',
      desc: 'Two identical probes launched toward the outer planets. Nearly five decades later, both still transmit from interstellar space — the farthest human-made objects in existence.',
    },
    hubble: {
      agency: 'NASA / ESA',
      desc: 'A telescope above the atmosphere turned blurry sky into a deep field. For over three decades, Hubble has rewritten the textbooks on the age, size and history of the universe.',
    },
    iss: {
      agency: 'International',
      desc: 'A laboratory the size of a football field, 400 km above Earth and continuously inhabited since November 2000 — proof that nations can build something together in orbit.',
    },
    curiosity: {
      agency: 'NASA',
      desc: 'A car-sized, nuclear-powered geologist that has climbed Mount Sharp inside Gale Crater, reading the chemical ingredients of an ancient lake that could once have supported life.',
    },
    jwst: {
      agency: 'NASA / ESA / CSA',
      desc: 'The most powerful telescope ever built unfolds a gold-coated mirror in deep space and studies the first galaxies that formed after the universe began.',
    },
    artemis: {
      agency: 'NASA',
      desc: 'The program returning humans to the Moon — this time to stay. Its missions will test the technologies needed for the next horizon: Mars.',
    },
  },

  aboutPage: {
    eyebrow: 'About the project',
    title: 'Why COSMOS Exists',
    lede: 'The universe is enormous, beautiful and surprisingly understandable. COSMOS exists to make that feeling accessible — in English and in Khmer.',
    body1:
      'COSMOS is an independent, non-commercial educational project. It introduces the Solar System, its planets and the history of space exploration through carefully curated public-domain imagery and plain, careful language. Every fact on this site is static, verifiable and free to read.',
    body2:
      'This release completes the whole roadmap: the cinematic bilingual foundation of Phase 1, real-time 3D planet models from Phase 2, and GSAP scroll storytelling from Phase 3. Nothing requires an account, a subscription or a server; everything runs from static data in your browser.',
    roadmapTitle: 'Roadmap',
    phases: [
      {
        name: 'Phase 1 — Visual foundation',
        status: 'Shipped',
        desc: 'Cinematic design system, full bilingual interface, Solar System explorer and a missions timeline.',
      },
      {
        name: 'Phase 2 — Interactive 3D',
        status: 'This release',
        desc: 'Real-time WebGL models of every world with React Three Fiber — drag to rotate, complete with rings, tilts and atmospheric glow — plus an illustrative orbit map of the whole system.',
      },
      {
        name: 'Phase 3 — Scroll storytelling',
        status: 'This release',
        desc: 'GSAP ScrollTrigger parallax, a drifting cinematic hero, animated counters and soft route transitions — all silenced under prefers-reduced-motion.',
      },
    ],
    techTitle: 'Built with',
    techList: [
      'React 18 + Vite',
      'React Router',
      'Three.js + React Three Fiber (lazy WebGL scenes)',
      'GSAP ScrollTrigger',
      'Lucide React icons',
      'Self-hosted variable fonts',
      'Static local data — no backend',
    ],
    creditsTitle: 'Credits & sources',
    creditsBody:
      'Imagery on this site comes from public-domain archives — primarily the NASA and ESA image libraries — retrieved via web image search. Interactive 3D planet textures are original artworks generated for COSMOS. Type is set in Space Grotesk, Inter and Kantumruy Pro (Google Fonts, SIL Open Font License). COSMOS is an independent educational project and is not affiliated with, or endorsed by, NASA, ESA or any space agency.',
  },

  notFound: {
    code: '404',
    title: 'Lost in space',
    body: 'The page you were looking for has drifted beyond the map.',
    cta: 'Return to base',
  },

  footer: {
    tagline: 'An educational journey through the cosmos.',
    navTitle: 'Navigate',
    sectionsTitle: 'Sections',
    languageTitle: 'Language',
    creditsTitle: 'Credits',
    credits:
      'Imagery courtesy of NASA, ESA and public-domain space archives. 3D planet textures created for COSMOS. Type set in Space Grotesk, Inter and Kantumruy Pro.',
    disclaimer:
      'COSMOS is an independent educational project. It is not affiliated with, or endorsed by, NASA or any space agency.',
    rights: 'COSMOS — built for learning.',
    backToTop: 'Back to top',
  },

  /**
   * Solar System bodies. `id` in src/data/planets.js matches these keys.
   * Stats (numbers) live in the data layer; names and prose live here.
   */
  bodies: {
    sun: {
      name: 'The Sun',
      shortName: 'Sun',
      tagline: 'Our home star',
      type: 'typeStar',
      intro:
        'An ordinary yellow dwarf that holds everything together — 99.86% of all the mass in the Solar System, and every photon that makes life possible.',
      cta: 'Explore the Sun',
      detail: [
        'The Sun is a G-type main-sequence star, 4.6 billion years old, fusing about 600 million tonnes of hydrogen into helium every second in its core. The energy released works its way outward for hundreds of thousands of years before escaping as the sunlight that warms our planet.',
        'Its gravity anchors every planet, dwarf planet, asteroid and comet in the Solar System. In around five billion years it will swell into a red giant — a reminder that even our own star’s story has chapters yet to come.',
      ],
    },
    mercury: {
      name: 'Mercury',
      shortName: 'Mercury',
      tagline: 'The swift planet',
      type: 'typeTerrestrial',
      intro:
        'The smallest planet and the closest to the Sun, racing around its orbit in just 88 days — with a surface that swings between scorching days and freezing nights.',
      cta: 'Explore Mercury',
      detail: [
        'With almost no atmosphere to trap heat, Mercury’s surface jumps from about 430 °C in daylight to −180 °C at night — the widest temperature range of any planet. Its cratered face looks very much like the Moon’s.',
        'Despite its size, Mercury is dense and metal-rich, with an iron core spanning roughly three quarters of its radius. Radar observations have even found water ice hiding in permanently shadowed craters at its poles.',
      ],
    },
    venus: {
      name: 'Venus',
      shortName: 'Venus',
      tagline: 'The morning star',
      type: 'typeTerrestrial',
      intro:
        'Wrapped in thick clouds of sulfuric acid and crushed under a runaway greenhouse effect, Venus is the hottest planet of all — hotter even than Mercury.',
      cta: 'Explore Venus',
      detail: [
        'Venus rotates backwards, and so slowly that a single day-night cycle lasts longer than its year. Beneath the clouds, surface pressure is 90 times that of Earth and temperatures hover near 465 °C — hot enough to melt lead.',
        'Yet in many ways Venus is Earth’s twin: nearly the same size, mass and composition. Understanding how its climate diverged so catastrophically is one reason planetary scientists keep returning.',
      ],
    },
    earth: {
      name: 'Earth',
      shortName: 'Earth',
      tagline: 'The blue marble',
      type: 'typeTerrestrial',
      intro:
        'The only known world with liquid-water oceans and life — and so far, home to everyone who has ever lived.',
      cta: 'Explore Earth',
      detail: [
        'Earth orbits in the Sun’s habitable zone, at just the right distance for water to stay liquid. Its magnetic field and thick atmosphere shield the surface from radiation, while plate tectonics slowly recycles the crust.',
        'Seen from six billion kilometres away — as Voyager 1’s camera caught it in 1990 — Earth is a pale blue dot less than a pixel across. Everything anyone has ever known happened on it.',
      ],
    },
    mars: {
      name: 'Mars',
      shortName: 'Mars',
      tagline: 'The red planet',
      type: 'typeTerrestrial',
      intro:
        'A cold desert world of rust-red dust, home to the tallest volcano and the deepest canyon in the Solar System — and the next world humans hope to walk on.',
      cta: 'Explore Mars',
      detail: [
        'Mars is only about half Earth’s diameter, yet it hosts Olympus Mons, a volcano nearly three times the height of Everest, and Valles Marineris, a canyon system that would stretch across the United States.',
        'Dry riverbeds, lake sediments and minerals that form in water show that Mars was once warmer and wetter. Fleets of orbiters and rovers — most recently Perseverance — are now searching for signs of ancient microbial life.',
      ],
    },
    jupiter: {
      name: 'Jupiter',
      shortName: 'Jupiter',
      tagline: 'The giant',
      type: 'typeGasGiant',
      intro:
        'More than twice as massive as all the other planets combined, wearing storms the size of Earth in its cloud bands.',
      cta: 'Explore Jupiter',
      detail: [
        'Jupiter is a gas giant without a solid surface — just deeper and deeper hydrogen and helium until pressure turns them strange. Its Great Red Spot is a storm that has raged for at least 190 years.',
        'With 95 known moons, Jupiter is a miniature system of its own: volcanic Io, ice-covered Europa with a global ocean beneath, and Ganymede — a moon larger than the planet Mercury.',
      ],
    },
    saturn: {
      name: 'Saturn',
      shortName: 'Saturn',
      tagline: 'The ringed jewel',
      type: 'typeGasGiant',
      intro:
        'The jewel of the Solar System, crowned by rings of ice and rock so vast they span 280,000 km — yet are often only about ten metres thick.',
      cta: 'Explore Saturn',
      detail: [
        'Saturn is the least dense planet — lighter than water on average — and its rapid, low-density spin visibly flattens it at the poles. Its signature rings are made of countless chunks of nearly pure water ice.',
        'Among its 146 known moons, Titan hides rivers and seas of liquid methane beneath an orange haze, while Enceladus sprays ocean water into space from cracks near its south pole.',
      ],
    },
    uranus: {
      name: 'Uranus',
      shortName: 'Uranus',
      tagline: 'The sideways world',
      type: 'typeIceGiant',
      intro:
        'An ice giant tipped almost completely on its side, rolling around the Sun at a 98-degree tilt — likely scarred by an ancient collision.',
      cta: 'Explore Uranus',
      detail: [
        'Uranus takes 84 Earth years to orbit the Sun, so each pole spends 42 years in sunlight and 42 in darkness. Its pale cyan colour comes from methane high in a hydrogen atmosphere.',
        'It was the first planet discovered with a telescope, by William Herschel in 1781. Only one spacecraft has ever visited: Voyager 2, which flew past in 1986 and photographed a surprisingly quiet, featureless world.',
      ],
    },
    neptune: {
      name: 'Neptune',
      shortName: 'Neptune',
      tagline: 'The windy world',
      type: 'typeIceGiant',
      intro:
        'The most distant planet — a deep-blue ice giant whipped by the fastest winds ever measured anywhere: over 2,000 km/h.',
      cta: 'Explore Neptune',
      detail: [
        'Neptune was found with mathematics before telescopes: astronomers noticed Uranus wobbling and calculated where an unseen planet must be. It was spotted within a degree of the prediction in 1846.',
        'Despite receiving 900 times less sunlight than Earth, Neptune drives enormous storms and even has seasons. Its large moon Triton orbits backwards and vents nitrogen geysers from a surface of frozen nitrogen at −235 °C.',
      ],
    },
  },
}

export default en
