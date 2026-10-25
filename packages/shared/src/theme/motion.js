/**
 * QUE Solutions — Motion & Transition Principles
 * Purposeful, performant, executive-level subtle micro-interactions.
 * No distracting spins, excessive 3D flips, or tacky bouncy springs.
 */

export const QUE_MOTION = {
  // Durations (Milliseconds)
  duration: {
    instant: 0,
    fast: 150,     // Button hover, tab highlight, toggle switch
    normal: 220,   // Dropdown open, modal enter, drawer slide
    slow: 320,     // Page/screen transitions
    skeleton: 1200 // Subtle pulse wave for loading state
  },

  // Easing Functions
  easing: {
    // Standard corporate deceleration curve: enters quickly, lands gracefully
    easeOut: 'cubic-bezier(0.16, 1, 0.3, 1)',
    // Standard acceleration-deceleration curve for symmetrical moves
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    // Sharp exit curve for dismissals
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)'
  },

  // Animation Preset Specifications
  presets: {
    fadeIn: {
      from: { opacity: 0 },
      to: { opacity: 1 },
      duration: 200,
      easing: 'cubic-bezier(0.16, 1, 0.3, 1)'
    },
    scaleUp: {
      from: { opacity: 0, transform: 'scale(0.97)' },
      to: { opacity: 1, transform: 'scale(1)' },
      duration: 220,
      easing: 'cubic-bezier(0.16, 1, 0.3, 1)'
    },
    slideInUp: {
      from: { opacity: 0, transform: 'translateY(12px)' },
      to: { opacity: 1, transform: 'translateY(0)' },
      duration: 240,
      easing: 'cubic-bezier(0.16, 1, 0.3, 1)'
    }
  }
};
