import React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

import { colors, borderRadius, typography } from '@/theme';

type Variant =
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'destructive';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: Variant;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  fullWidth = false,
  icon,
}) => (
  <TouchableOpacity
    onPress={onPress}
    disabled={disabled || loading}
    activeOpacity={0.8}
    style={[
      styles.base,
      styles[variant],
      fullWidth && styles.fullWidth,
      (disabled || loading) && styles.disabled,
    ]}
  >
    {loading ? (
      <ActivityIndicator
        color={variant === 'primary' ? '#fff' : colors.primary}
        size="small"
      />
    ) : (
      <View style={styles.row}>
        {icon}
        <Text
          style={[
            styles.label,
            styles[`${variant}Text` as keyof typeof styles],
          ]}
        >
          {label}
        </Text>
      </View>
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  base: {
    height: 44,
    paddingHorizontal: 16,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },

  primary: {
    backgroundColor: colors.primary,
  },

  secondary: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: colors.primary,
  },

  ghost: {
    backgroundColor: 'transparent',
  },

  destructive: {
    backgroundColor: colors.destructive,
  },

  fullWidth: {
    width: '100%',
  },

  disabled: {
    opacity: 0.4,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: typography.fontFamily.semibold,
  },

  primaryText: {
    color: '#ffffff',
  },

  secondaryText: {
    color: colors.primary,
  },

  ghostText: {
    color: colors.foreground,
  },

  destructiveText: {
    color: '#ffffff',
  },
});