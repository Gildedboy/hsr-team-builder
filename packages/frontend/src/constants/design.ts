export const COLORS = {
  primary: '#00d4ff',
  secondary: '#9b59b6',
  accent: '#2ecc71',
  warning: '#e74c3c',
  
  // Rarity colors
  rarity5: '#ffd700',
  rarity4: '#8a5fcc',
  
  // Tier colors
  bis: '#ffd700',
  generalist: '#00d4ff',
  f2p: '#2ecc71',
  
  // Background colors
  bgPrimary: 'rgba(255, 255, 255, 0.05)',
  bgSecondary: 'rgba(255, 255, 255, 0.08)',
  bgOverlay: 'rgba(0, 0, 0, 0.9)',
  
  // Text colors
  textPrimary: 'white',
  textSecondary: '#aaa',
  textMuted: '#666',
  
  // Border colors
  border: '#333',
  borderActive: '#00d4ff',
  borderRecommended: '#2ecc71'
} as const

export const SPACING = {
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '20px',
  xxl: '25px',
  xxxl: '30px',
  xxxxl: '40px'
} as const

export const TYPOGRAPHY = {
  title: {
    fontSize: '48px',
    fontWeight: '700'
  },
  subtitle: {
    fontSize: '24px',
    fontWeight: '600'
  },
  body: {
    fontSize: '16px',
    fontWeight: '400'
  },
  small: {
    fontSize: '14px',
    fontWeight: '400'
  },
  tiny: {
    fontSize: '12px',
    fontWeight: '500'
  }
} as const

export const SHADOWS = {
  card: '0 2px 6px rgba(0, 0, 0, 0.3)',
  cardHover: '0 4px 12px rgba(0, 0, 0, 0.3)',
  selected: '0 4px 12px rgba(0, 212, 255, 0.8)',
  recommended: '0 0 8px rgba(46, 204, 113, 0.6)'
} as const

export const TRANSITIONS = {
  fast: '0.2s',
  normal: '0.3s'
} as const