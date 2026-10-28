/**
 * Space missions timeline — non-translatable facts.
 * `name` is a proper noun and stays identical in both languages;
 * agency labels and descriptions live in i18n under `missionItems[id]`.
 */
export const missions = [
  { id: 'sputnik', year: 1957, name: 'Sputnik 1', status: 'completed' },
  { id: 'apollo11', year: 1969, name: 'Apollo 11', status: 'completed' },
  { id: 'voyager', year: 1977, name: 'Voyager 1 & 2', status: 'active' },
  { id: 'hubble', year: 1990, name: 'Hubble Space Telescope', status: 'active' },
  { id: 'iss', year: 1998, name: 'International Space Station', status: 'active' },
  { id: 'curiosity', year: 2012, name: 'Curiosity Rover', status: 'active' },
  { id: 'jwst', year: 2021, name: 'James Webb Space Telescope', status: 'active' },
  { id: 'artemis', year: 2022, name: 'Artemis Program', status: 'active' },
]
