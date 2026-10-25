/**
 * QUE Solutions Mobile Theme
 * Integrated with @que/shared Design System
 */

export const THEME = {
  colors: {
    forest: '#122919',       // Primary Dark Forest Green (Headers, high authority)
    forestDark: '#0B1A10',
    forestLight: '#1B3B24',

    olive: '#5B7052',        // Primary CTA Button, active tab, brand highlight
    oliveHover: '#4C6044',
    oliveTint: '#E8EDE5',    // Soft olive pill/tag background

    canvas: '#F8F9F5',       // Screen background (Soft off-white, no eye strain)
    surface: '#FFFFFF',      // Card, modal, input surface
    subtle: '#F1F4EE',       // Disabled / secondary surface

    border: '#E3E7DE',       // Card and input border
    borderStrong: '#CCD3C5',

    textPrimary: '#141E16',   // High-contrast charcoal green text
    textSecondary: '#5A655C', // Subtitles, timestamps
    textMuted: '#8E9A90',     // Placeholders
    textInverse: '#FFFFFF',

    success: '#2E7D32',
    successBg: '#E8F5E9',
    error: '#C62828',
    errorBg: '#FFEBEE',
    warning: '#D97706',
    warningBg: '#FFFBEB'
  },

  typography: {
    fontFamily: 'System',
    display: { fontSize: 28, fontWeight: '700', lineHeight: 34 },
    h1: { fontSize: 24, fontWeight: '700', lineHeight: 30 },
    h2: { fontSize: 18, fontWeight: '600', lineHeight: 24 },
    h3: { fontSize: 16, fontWeight: '600', lineHeight: 22 },
    body: { fontSize: 14, fontWeight: '400', lineHeight: 20 },
    caption: { fontSize: 12, fontWeight: '500', lineHeight: 16 }
  },

  radius: {
    sm: 6,
    md: 8,
    lg: 12,
    xl: 16,
    pill: 9999
  },

  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    base: 16,
    lg: 20,
    xl: 24,
    xxl: 32
  }
};
