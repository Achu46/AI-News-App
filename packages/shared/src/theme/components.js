/**
 * QUE Solutions — Standard Component Style Contracts
 * Applied consistently across Web and Mobile UI
 */

import { QUE_COLORS } from './colors.js';
import { QUE_RADIUS, QUE_SHADOWS, QUE_SPACING } from './spacing.js';
import { QUE_TYPOGRAPHY } from './typography.js';

export const QUE_COMPONENT_STYLES = {
  // 1. Buttons
  button: {
    base: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: QUE_TYPOGRAPHY.weight.semibold,
      borderRadius: QUE_RADIUS.md,
      cursor: 'pointer',
      transition: 'all 0.18s cubic-bezier(0.16, 1, 0.3, 1)',
      borderWidth: 1,
      borderStyle: 'solid',
      outline: 'none',
      userSelect: 'none'
    },
    sizes: {
      sm: { height: 36, padding: '0 12px', fontSize: 13 },
      md: { height: 44, padding: '0 18px', fontSize: 14 }, // Touch target compliant
      lg: { height: 50, padding: '0 24px', fontSize: 15 }
    },
    variants: {
      forest: {
        backgroundColor: QUE_COLORS.forest.base,
        borderColor: QUE_COLORS.forest.base,
        color: QUE_COLORS.forest.contrastText,
        hoverBg: QUE_COLORS.forest.light,
        activeBg: QUE_COLORS.forest.dark
      },
      olive: {
        backgroundColor: QUE_COLORS.olive.base,
        borderColor: QUE_COLORS.olive.base,
        color: QUE_COLORS.olive.contrastText,
        hoverBg: QUE_COLORS.olive.hover,
        activeBg: QUE_COLORS.olive.active
      },
      outline: {
        backgroundColor: QUE_COLORS.canvas.surface,
        borderColor: QUE_COLORS.neutral.border,
        color: QUE_COLORS.neutral.textPrimary,
        hoverBg: QUE_COLORS.canvas.subtle,
        activeBg: QUE_COLORS.olive.tint
      },
      ghost: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        color: QUE_COLORS.olive.base,
        hoverBg: QUE_COLORS.olive.tint,
        activeBg: QUE_COLORS.canvas.subtle
      },
      danger: {
        backgroundColor: QUE_COLORS.status.error.base,
        borderColor: QUE_COLORS.status.error.base,
        color: '#FFFFFF',
        hoverBg: '#B71C1C',
        activeBg: '#8E0000'
      }
    }
  },

  // 2. Form Inputs
  input: {
    base: {
      width: '100%',
      height: 44,
      backgroundColor: QUE_COLORS.canvas.surface,
      border: `1px solid ${QUE_COLORS.neutral.border}`,
      borderRadius: QUE_RADIUS.md,
      padding: '0 14px',
      fontSize: 14,
      color: QUE_COLORS.neutral.textPrimary,
      outline: 'none',
      transition: 'border-color 0.18s ease, box-shadow 0.18s ease'
    },
    states: {
      focus: {
        borderColor: QUE_COLORS.olive.base,
        boxShadow: `0 0 0 3px ${QUE_COLORS.olive.tint}`
      },
      error: {
        borderColor: QUE_COLORS.status.error.base,
        boxShadow: `0 0 0 3px ${QUE_COLORS.status.error.bg}`
      },
      disabled: {
        backgroundColor: QUE_COLORS.canvas.subtle,
        color: QUE_COLORS.neutral.textMuted,
        cursor: 'not-allowed'
      }
    }
  },

  // 3. Surface Cards
  card: {
    base: {
      backgroundColor: QUE_COLORS.canvas.surface,
      border: `1px solid ${QUE_COLORS.neutral.border}`,
      borderRadius: QUE_RADIUS.lg,
      boxShadow: QUE_SHADOWS.card,
      padding: 20
    },
    interactive: {
      transition: 'transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease',
      cursor: 'pointer'
    }
  },

  // 4. Badges & Status Pills
  badge: {
    base: {
      display: 'inline-flex',
      alignItems: 'center',
      padding: '3px 10px',
      borderRadius: QUE_RADIUS.pill,
      fontSize: 12,
      fontWeight: QUE_TYPOGRAPHY.weight.semibold,
      letterSpacing: '0.02em',
      borderWidth: 1,
      borderStyle: 'solid'
    }
  },

  // 5. Data Tables
  table: {
    header: {
      backgroundColor: QUE_COLORS.canvas.subtle,
      color: QUE_COLORS.neutral.textSecondary,
      fontSize: 12,
      fontWeight: QUE_TYPOGRAPHY.weight.semibold,
      textTransform: 'uppercase',
      letterSpacing: '0.04em',
      padding: '12px 16px',
      borderBottom: `1px solid ${QUE_COLORS.neutral.border}`
    },
    row: {
      backgroundColor: QUE_COLORS.canvas.surface,
      borderBottom: `1px solid ${QUE_COLORS.neutral.border}`,
      hoverBg: QUE_COLORS.canvas.subtle,
      padding: '14px 16px',
      fontSize: 14,
      color: QUE_COLORS.neutral.textPrimary
    }
  }
};
