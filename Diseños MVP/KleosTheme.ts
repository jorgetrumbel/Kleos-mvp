// KleosTheme.ts — Design tokens compartidos para todos los screens de KLEOS
// Importar en cada screen: import { C, F, R, S } from './KleosTheme';

export const C = {
  // Backgrounds
  bg: '#F8F9F8',
  bgGray: '#F1F3F2',
  bgDark: '#111817',
  white: '#FFFFFF',

  // Primary / Teal
  primary: '#1A7C83',
  primaryMid: '#2C9AA3',
  primaryLight: '#5BAFB5',
  primaryBg: '#EBF4F5',

  // Text
  textPrimary: '#111817',
  textSecondary: '#5F6B69',
  textTertiary: '#8A9694',
  textDisabled: '#B4BEBC',

  // Borders / Dividers
  border: '#D8DEDD',
  borderSubtle: 'rgba(17,24,23,0.06)',

  // Semantic
  success: '#22C55E',
  successBg: '#ECFDF5',
  error: '#E53935',
  errorBg: '#FEF2F2',
  warning: '#E65100',
  warningBg: '#FFF3E0',

  // Dark overlay (modals)
  overlay: 'rgba(17,24,23,0.4)',
} as const;

export const F = {
  xs: 10,
  sm: 11,
  base: 12,
  md: 13,
  lg: 14,
  xl: 16,
  '2xl': 18,
  '3xl': 20,
  '4xl': 22,
  '5xl': 26,
  '6xl': 30,
} as const;

export const R = {
  xs: 6,
  sm: 8,
  md: 10,
  lg: 12,
  xl: 14,
  '2xl': 16,
  '3xl': 20,
  full: 999,
} as const;

export const S = {
  // Common card shadow (iOS)
  card: {
    shadowColor: '#111817',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
} as const;

// BottomNav tabs helper
export const NAV_COACH = ['Inicio', 'Atletas', 'Comunidad', 'Calendario', 'Planific.'] as const;
export const NAV_ATHLETE = ['Inicio', 'Entrenador', 'Comunidad', 'Calendario', 'Plan'] as const;
