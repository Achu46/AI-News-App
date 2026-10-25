/**
 * QUE Solutions — Official Typography System
 * Font Family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif
 * Corporate, clean, high readability for executive dashboards and mobile interfaces.
 */

export const QUE_TYPOGRAPHY = {
  fontFamily: {
    primary: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace'
  },

  // Font Weights
  weight: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700'
  },

  // Scale (Mobile / Web responsive scale)
  scale: {
    display: {
      fontSize: 32,
      lineHeight: 40,
      fontWeight: '700',
      letterSpacing: '-0.02em',
      description: 'Landing page hero, main marketing heading'
    },
    h1: {
      fontSize: 26,
      lineHeight: 34,
      fontWeight: '700',
      letterSpacing: '-0.015em',
      description: 'Super Admin page titles, mobile screen primary title'
    },
    h2: {
      fontSize: 20,
      lineHeight: 28,
      fontWeight: '600',
      letterSpacing: '-0.01em',
      description: 'Card titles, modal headings, section headers'
    },
    h3: {
      fontSize: 17,
      lineHeight: 24,
      fontWeight: '600',
      letterSpacing: '-0.005em',
      description: 'Sub-sections, widget titles, list group titles'
    },
    subtitle: {
      fontSize: 15,
      lineHeight: 22,
      fontWeight: '500',
      letterSpacing: '0',
      description: 'Descriptive subtitles, bold body text'
    },
    body: {
      fontSize: 14,
      lineHeight: 20,
      fontWeight: '400',
      letterSpacing: '0',
      description: 'Standard paragraph, table cell content, form inputs'
    },
    caption: {
      fontSize: 12,
      lineHeight: 16,
      fontWeight: '500',
      letterSpacing: '0.01em',
      description: 'Input error messages, helper text, timestamps'
    },
    overline: {
      fontSize: 11,
      lineHeight: 14,
      fontWeight: '600',
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      description: 'Table headers, category badges, section tags'
    }
  }
};
