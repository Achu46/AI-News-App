/**
 * QUE Solutions — Responsive Breakpoints & Device Adaptability
 */

export const QUE_BREAKPOINTS = {
  // Pixel thresholds
  values: {
    xs: 360,   // Small phones
    sm: 640,   // Large phones / Phablets
    md: 768,   // Tablets (portrait)
    lg: 1024,  // Laptops / Tablets (landscape)
    xl: 1280,  // Desktop monitors
    xxl: 1536  // Wide screens / Ultra-wide
  },

  // CSS Media Query Strings
  media: {
    mobileOnly: '@media (max-width: 639px)',
    tabletUp: '@media (min-width: 640px)',
    tabletOnly: '@media (min-width: 640px) and (max-width: 1023px)',
    laptopUp: '@media (min-width: 1024px)',
    desktopUp: '@media (min-width: 1280px)',
    supportsHover: '@media (hover: hover)',
    reducedMotion: '@media (prefers-reduced-motion: reduce)'
  }
};
