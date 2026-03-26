

/**
 * Global Semantic Brand Tokens for absolute reference.
 * The UI actively consumes these identically via Tailwind classes
 * (e.g. `bg-brand-bg-primary dark:bg-brand-bg-primary-dark`).
 */
export const TOKENS = {
  light: {
    bg: {
      primary: '#FAF7F2', // Warm off-white
      secondary: '#F0EBE3', // Warm cream surface
      elevated: '#E8E0D5', // Deeper cream
    },
    accent: {
      gold: '#A07840', // Deeper gold for light bg
      goldMuted: 'rgba(160, 120, 64, 0.5)',
    },
    text: {
      primary: '#1A1A1A', // Deep charcoal
      secondary: '#6B5B4E', // Warm brown-gray
      accent: '#A07840', // Deep gold
    },
    border: 'rgba(160, 120, 64, 0.2)',
  },
  dark: {
    bg: {
      primary: '#0C0C0C', // Near-black luxury base
      secondary: '#141414', // Inner glassmorphic
      elevated: '#1C1C1C', // Strong structural contrast
    },
    accent: {
      gold: '#C8963E', // Original Phase A Gold
      goldMuted: 'rgba(200, 150, 62, 0.5)',
    },
    text: {
      primary: '#FFFFFF', // High contrast stark
      secondary: 'rgba(255, 255, 255, 0.45)', // Muted 45% offset
      accent: '#C8963E', // Gold
    },
    border: 'rgba(255, 255, 255, 0.1)', // Light crisp edge
  }
};
