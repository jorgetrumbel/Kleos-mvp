// components/ui/Badge.tsx

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';

import {
  colors,
  typography,
  spacing,
  borderRadius,
} from '@/theme';

export type BadgeVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'neutral';

export type BadgeSize =
  | 'sm'
  | 'md'
  | 'lg';

interface BadgeProps {
  label: string;

  variant?: BadgeVariant;
  size?: BadgeSize;

  icon?: React.ReactNode;

  style?: ViewStyle;
  textStyle?: TextStyle;
}

const sizeStyles = {
  sm: {
    paddingHorizontal: spacing[2],
    paddingVertical: 2,
    fontSize: 11,
  },

  md: {
    paddingHorizontal: spacing[2],
    paddingVertical: 4,
    fontSize: 12,
  },

  lg: {
    paddingHorizontal: spacing[3],
    paddingVertical: 6,
    fontSize: 14,
  },
};

export function Badge({
  label,
  variant = 'primary',
  size = 'md',
  icon,
  style,
  textStyle,
}: BadgeProps) {
  const badgeColors = colors.badge[variant];
  const sizing = sizeStyles[size];

  return (
    <View
        style={[
            styles.container,
            {
            backgroundColor: badgeColors.bg,
            paddingHorizontal: sizing.paddingHorizontal,
            paddingVertical: sizing.paddingVertical,
            },
            style,
        ]}
    >
      {icon}

    <Text
        style={[
            styles.label,
            {
            color: badgeColors.text,
            fontSize: sizing.fontSize,
            },
            textStyle,
        ]}
    >
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',

    flexDirection: 'row',
    alignItems: 'center',

    borderRadius: borderRadius.full,

    gap: spacing[1],
  },

  label: {
    fontFamily: typography.fontFamily.medium,
  },
});