// src/theme/index.ts
// KLEOS Design System — React Native Theme

export const colors = {
  // Core palette
  background:    '#ffffff',
  card:          '#ffffff',
  muted:         '#f3f4f6',
  primary:       '#0d7377',   // Deep teal — brand primary
  accentSurface: '#f0fafa',
  destructive:   '#ef4444',
  success:       '#16a34a',
  foreground:    '#111827',
  mutedForeground: '#6b7280',
  border:        '#e5e7eb',

  // Chart palette
  chart: {
    teal:   '#0d7377',
    blue:   '#60a5fa',
    amber:  '#f59e0b',
    purple: '#8b5cf6',
    pink:   '#ec4899',
  },

  // Accent / semantic
  accent: {
    purple: '#a855f7',   // Group sessions
    amber:  '#f59e0b',   // Warnings
    green:  '#16a34a',   // Completed / success
    blue:   '#3b82f6',   // Scheduled
  },

  // Badge backgrounds & text pairs
  // Badge variants
  badge: {
    primary: {
      bg: '#0d7377',
      text: '#ffffff',
    },

    secondary: {
      bg: '#f3f4f6',
      text: '#374151',
    },

    success: {
      bg: '#dcfce7',
      text: '#15803d',
    },

    warning: {
      bg: '#fef3c7',
      text: '#b45309',
    },

    error: {
      bg: '#fee2e2',
      text: '#b91c1c',
    },

    info: {
      bg: '#dbeafe',
      text: '#1d4ed8',
    },

    neutral: {
      bg: '#e5e7eb',
      text: '#6b7280',
    },
  },
} as const;

export const typography = {
  fontFamily: {
    primary: 'PlusJakartaSans-Regular',
    medium:  'PlusJakartaSans-Medium',
    semibold:'PlusJakartaSans-SemiBold',
    display: 'Montserrat-Bold',
    data:    'Inter-Regular',
  },
  fontSize: {
    xs:   12,   // Caption, badge label
    sm:   14,   // Body secondary, list items
    base: 16,   // Default body, button label
    lg:   18,   // Section heading (h3)
    xl:   20,   // Screen heading (h2)
    '2xl': 24,  // Page title (h1)
  },
  fontWeight: {
    normal:   '400' as const,
    medium:   '500' as const,
    semibold: '600' as const,
  },
  lineHeight: {
    tight:  1.2,
    normal: 1.5,
    relaxed: 1.7,
  },
} as const;

export const spacing = {
  1:  4,
  2:  8,
  3:  12,
  4:  16,
  5:  20,
  6:  24,
  8:  32,
  12: 48,
} as const;

export const borderRadius = {
  sm:   8,
  md:   10,   // rounded-lg  — buttons, inputs
  lg:   12,   // rounded-xl  — cards
  xl:   16,   // rounded-2xl — bottom sheets
  full: 9999, // pills, avatars
} as const;

export const shadows = {
  none: {},
  sm: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  md: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 12,
    elevation: 6,
  },
} as const;

// Bottom navigation bar height (safe area excluded)
export const NAV_BAR_HEIGHT = 56;
// Top header height (safe area excluded)
export const HEADER_HEIGHT  = 56;