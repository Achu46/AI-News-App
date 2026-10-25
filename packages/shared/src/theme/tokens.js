/**
 * QUE Solutions — Official Design Tokens & Theme
 * Tagline: People • Process • Progress
 * Brand Colors: Olive green, Dark forest green, Soft off-white, Neutral grey
 */

export const COLORS = {
  // Brand Colors
  forestGreen: '#122919',     // Primary Dark Green (Headers, sidebars, executive elements)
  forestGreenDark: '#0B1C10', // Deepest tone for modal overlays and high-contrast text
  forestGreenLight: '#1C3A24',// Hover state for dark elements
  
  oliveGreen: '#5B7052',      // Official Olive Green (CTA buttons, active highlights)
  oliveGreenLight: '#728867', // Hover state for olive buttons
  oliveGreenDark: '#45563E',  // Pressed state
  oliveTint: '#E8EDE5',       // Soft olive wash for badges, card backgrounds
  
  // Surfaces & Backgrounds
  offWhite: '#F8F9F5',        // Primary App & Web background (No eye strain)
  offWhiteDark: '#EFF1EC',    // Secondary background for tables and side panels
  pureWhite: '#FFFFFF',       // Card surface, modal surface, input background
  
  // Neutral Greys
  border: '#E3E7DE',          // Border color for cards, inputs, dividers
  borderDark: '#CCD2C5',      // Stronger border for active inputs
  textPrimary: '#141E16',     // Primary text (Deep charcoal green)
  textSecondary: '#5A655C',   // Secondary text (Subtitles, table headers)
  textMuted: '#8E9A90',       // Muted text (Placeholders, timestamps)
  textLight: '#FFFFFF',       // Light text on dark backgrounds
  
  // Semantic Status
  success: '#2E7D32',
  successBg: '#E8F5E9',
  warning: '#ED6C02',
  warningBg: '#FFF3E0',
  error: '#D32F2F',
  errorBg: '#FFEBEE',
  info: '#0288D1',
  infoBg: '#E1F5FE'
};

export const TYPOGRAPHY = {
  fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    display: 32
  },
  fontWeight: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700'
  }
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48
};

export const RADIUS = {
  sm: 6,
  md: 10,
  lg: 16,
  xl: 24,
  full: 9999
};

export const SHADOWS = {
  card: '0 4px 16px rgba(18, 41, 25, 0.06)',
  cardHover: '0 8px 24px rgba(18, 41, 25, 0.12)',
  modal: '0 16px 40px rgba(18, 41, 25, 0.18)',
  button: '0 2px 8px rgba(91, 112, 82, 0.3)'
};
