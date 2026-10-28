import sunImg from '../assets/images/sun.webp'
import mercuryImg from '../assets/images/mercury.webp'
import venusImg from '../assets/images/venus.webp'
import earthImg from '../assets/images/earth.webp'
import marsImg from '../assets/images/mars.webp'
import jupiterImg from '../assets/images/jupiter.webp'
import saturnImg from '../assets/images/saturn.webp'
import uranusImg from '../assets/images/uranus.webp'
import neptuneImg from '../assets/images/neptune.webp'

/**
 * Solar System bodies — non-translatable facts live here.
 * Names, taglines and prose live in src/i18n/{en,km}.js under `bodies[id]`.
 *
 * NOTE: stats are approximate averages for educational comparison and are
 * never presented as a to-scale visualisation.
 */
export const solarBodies = [
  {
    id: 'sun',
    kind: 'star',
    image: sunImg,
    accent: '#ffc46b',
    stats: {
      diameterKm: 1392700,
      dayValue: 25,
      dayUnit: 'earthDays',
      yearValue: null,
      yearUnit: null,
      moons: null,
      tempC: 5505,
      distanceMkm: null,
    },
  },
  {
    id: 'mercury',
    kind: 'terrestrial',
    image: mercuryImg,
    accent: '#c9b8a5',
    stats: {
      diameterKm: 4879,
      dayValue: 59,
      dayUnit: 'earthDays',
      yearValue: 88,
      yearUnit: 'earthDays',
      moons: 0,
      tempC: 167,
      distanceMkm: 57.9,
    },
  },
  {
    id: 'venus',
    kind: 'terrestrial',
    image: venusImg,
    accent: '#e8bd7a',
    stats: {
      diameterKm: 12104,
      dayValue: 243,
      dayUnit: 'earthDays',
      yearValue: 225,
      yearUnit: 'earthDays',
      moons: 0,
      tempC: 464,
      distanceMkm: 108.2,
    },
  },
  {
    id: 'earth',
    kind: 'terrestrial',
    image: earthImg,
    accent: '#7aa8f8',
    stats: {
      diameterKm: 12756,
      dayValue: 24,
      dayUnit: 'earthHours',
      yearValue: 365,
      yearUnit: 'earthDays',
      moons: 1,
      tempC: 15,
      distanceMkm: 149.6,
    },
  },
  {
    id: 'mars',
    kind: 'terrestrial',
    image: marsImg,
    accent: '#e07a55',
    stats: {
      diameterKm: 6792,
      dayValue: 25,
      dayUnit: 'earthHours',
      yearValue: 687,
      yearUnit: 'earthDays',
      moons: 2,
      tempC: -65,
      distanceMkm: 227.9,
    },
  },
  {
    id: 'jupiter',
    kind: 'gasGiant',
    image: jupiterImg,
    accent: '#dca878',
    stats: {
      diameterKm: 142984,
      dayValue: 10,
      dayUnit: 'earthHours',
      yearValue: 11.9,
      yearUnit: 'earthYears',
      moons: 95,
      tempC: -110,
      distanceMkm: 778.5,
    },
  },
  {
    id: 'saturn',
    kind: 'gasGiant',
    image: saturnImg,
    accent: '#e6c790',
    stats: {
      diameterKm: 120536,
      dayValue: 10.7,
      dayUnit: 'earthHours',
      yearValue: 29.4,
      yearUnit: 'earthYears',
      moons: 146,
      tempC: -140,
      distanceMkm: 1433.5,
    },
  },
  {
    id: 'uranus',
    kind: 'iceGiant',
    image: uranusImg,
    accent: '#a5dfe3',
    stats: {
      diameterKm: 51118,
      dayValue: 17,
      dayUnit: 'earthHours',
      yearValue: 84,
      yearUnit: 'earthYears',
      moons: 28,
      tempC: -195,
      distanceMkm: 2871,
    },
  },
  {
    id: 'neptune',
    kind: 'iceGiant',
    image: neptuneImg,
    accent: '#7a8ef8',
    stats: {
      diameterKm: 49528,
      dayValue: 16,
      dayUnit: 'earthHours',
      yearValue: 165,
      yearUnit: 'earthYears',
      moons: 16,
      tempC: -200,
      distanceMkm: 4495,
    },
  },
]

export const planets = solarBodies.filter((b) => b.kind !== 'star')

export function getBody(id) {
  return solarBodies.find((b) => b.id === id)
}

export function getNeighbours(id) {
  const index = solarBodies.findIndex((b) => b.id === id)
  if (index === -1) return { prev: null, next: null }
  return {
    prev: index > 0 ? solarBodies[index - 1] : null,
    next: index < solarBodies.length - 1 ? solarBodies[index + 1] : null,
  }
}
