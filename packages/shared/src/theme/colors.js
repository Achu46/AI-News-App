/**
 * QUE Solutions — Official Brand Color Palette
 * Visual Origin: QUE Solutions Official Logo & Visiting Card
 * Contrast Compliance: Meets WCAG 2.1 AA standards for corporate web & mobile
 */

export const QUE_COLORS = {
  // 1. Primary Brand Dark Green (Forest)
  // Used for: Main headers, primary branding, navigation bars, Super Admin portal sidebar
  forest: {
    base: '#122919',       // Core Forest Green
    dark: '#0B1A10',       // Deepest tone (overlays, high-contrast headings)
    light: '#1B3B24',      // Hover state on dark elements
    surface: '#152C1D',    // Dark card backgrounds in admin portal
    contrastText: '#FFFFFF'
  },

  // 2. Primary Brand Olive Green
  // Used for: Primary call-to-actions, active navigation tabs, brand accent highlights
  olive: {
    base: '#5B7052',       // Core Brand Olive Green (4.8:1 contrast on white/off-white)
    hover: '#4C6044',      // Darker olive for hover state
    active: '#3E4E37',     // Pressed state
    light: '#728867',      // Secondary accent badges
    tint: '#E8EDE5',       // Soft olive background wash for badges, tags, and subtle panels
    contrastText: '#FFFFFF'
  },

  // 3. Canvas & Surface Backgrounds (Off-White & Crisp White)
  // Used for: Clean app canvas without blinding white glare or muddy dark mode
  canvas: {
    base: '#F8F9F5',       // Soft Off-White background
    surface: '#FFFFFF',    // Crisp White card, modal, and drawer surface
    subtle: '#F1F4EE',     // Alternating table rows, disabled inputs, secondary boxes
    raised: '#FFFFFF'      // Elevated cards and floating popovers
  },

  // 4. Neutral Greys & Structural Borders
  // Used for: Dividers, borders, secondary typography, input outlines
  neutral: {
    border: '#E3E7DE',       // Standard subtle border (Cards, inputs, table lines)
    borderFocus: '#5B7052',  // Focused input border (Brand Olive)
    borderStrong: '#CCD3C5', // Emphasized borders
    divider: '#EBEFE7',      // Soft section dividers
    
    // Typography Hierarchy
    textPrimary: '#141E16',   // High-contrast deep charcoal green (WCAG AAA on off-white)
    textSecondary: '#5A655C', // Muted readable grey-green (Subtitles, table headers)
    textMuted: '#8E9A90',     // Placeholders, disabled text, caption hints
    textInverse: '#FFFFFF'    // Pure white for dark buttons and forest headers
  },

  // 5. Semantic Feedback (Clean, Corporate, Non-Distracting)
  status: {
    success: {
      base: '#2E7D32',
      bg: '#E8F5E9',
      border: '#C8E6C9',
      text: '#1B5E20'
    },
    warning: {
      base: '#D97706',
      bg: '#FFFBEB',
      border: '#FDE68A',
      text: '#92400E'
    },
    error: {
      base: '#C62828',
      bg: '#FFEBEE',
      border: '#FFCDD2',
      text: '#B71C1C'
    },
    info: {
      base: '#0284C7',
      bg: '#F0F9FF',
      border: '#BAE6FD',
      text: '#0369A1'
    }
  },

  // 6. Role & Badge Mapping
  roles: {
    superadmin: { bg: '#122919', text: '#FFFFFF', border: '#122919' },
    admin: { bg: '#E8EDE5', text: '#3E4E37', border: '#CCD3C5' },
    staff: { bg: '#EFF4EB', text: '#5B7052', border: '#D8E2D3' },
    user: { bg: '#F3F4F6', text: '#4B5563', border: '#E5E7EB' }
  }
};
