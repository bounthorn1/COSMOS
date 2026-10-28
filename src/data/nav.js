/**
 * Navigation model. Hash targets are section ids on the homepage;
 * other entries are React Router paths.
 * Labels resolve from i18n `nav[key]`.
 */
export const navLinks = [
  { key: 'explore', to: '/#hero', hash: 'hero' },
  { key: 'solarSystem', to: '/#solar-system', hash: 'solar-system' },
  { key: 'planets', to: '/planets' },
  { key: 'missions', to: '/missions' },
  { key: 'about', to: '/about' },
]

export const footerSectionLinks = [
  { key: 'hero', to: '/#hero' },
  { key: 'ourPlace', to: '/#our-place' },
  { key: 'solarSystem', to: '/#solar-system' },
  { key: 'featured', to: '/#featured' },
  { key: 'beyond', to: '/#beyond' },
]
