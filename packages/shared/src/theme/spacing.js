/**
 * QUE Solutions — Spacing, Elevation & Layout Grid
 * Baseline Grid: 4px / 8px system
 */

export const QUE_SPACING = {
  // Base 4px scale
  none: 0,
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  xxxl: 40,
  huge: 48,
  giant: 64,

  // Layout Containers & Margins
  container: {
    mobilePadding: 16,
    tabletPadding: 24,
    desktopPadding: 32,
    maxWidth: 1280
  },

  // Component Heights (Touch targets >= 44px for accessibility)
  touchTarget: {
    min: 44,
    buttonSm: 36,
    buttonMd: 44,
    buttonLg: 50,
    inputMd: 44,
    headerHeight: 64,
    sidebarWidth: 260,
    sidebarCollapsedWidth: 72
  }
};

export const QUE_RADIUS = {
  none: 0,
  xs: 4,
  sm: 6,
  md: 8,      // Standard input fields and buttons
  lg: 12,     // Standard card surface
  xl: 16,     // Modals and elevated sheets
  xxl: 24,    // Mobile bottom sheets
  pill: 9999  // Badges, avatar circles, rounded search bars
};

export const QUE_SHADOWS = {
  none: 'none',
  // Subtle corporate shadows tinted with brand Forest Green
  sm: '0 1px 3px rgba(18, 41, 25, 0.05), 0 1px 2px rgba(18, 41, 25, 0.03)',
  card: '0 2px 8px rgba(18, 41, 25, 0.06), 0 1px 2px rgba(18, 41, 25, 0.04)',
  cardHover: '0 6px 16px rgba(18, 41, 25, 0.08), 0 2px 4px rgba(18, 41, 25, 0.04)',
  modal: '0 16px 36px rgba(18, 41, 25, 0.14), 0 4px 12px rgba(18, 41, 25, 0.08)',
  dropdown: '0 8px 24px rgba(18, 41, 25, 0.10), 0 2px 6px rgba(18, 41, 25, 0.04)'
};
