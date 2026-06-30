// components/ui/Input.tsx

import React, { useState } from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';
import { colors, borderRadius, typography } from '@/theme';

interface InputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;

  error?: string;
  secureTextEntry?: boolean;
  multiline?: boolean;
  leftIcon?: React.ReactNode;

  keyboardType?: any;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
}

export const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  error,
  secureTextEntry,
  multiline,
  leftIcon,
  keyboardType,
  autoCapitalize,
}) => {
  const [focused, setFocused] = useState(false);

  return (
    <View style={styles.wrapper}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View
        style={[
          styles.container,
          focused && styles.focused,
          !!error && styles.errored,
        ]}
      >
        {leftIcon && <View style={styles.iconWrap}>{leftIcon}</View>}

        <TextInput
            style={[styles.input, multiline && styles.multiline]}
            placeholder={placeholder}
            placeholderTextColor={colors.mutedForeground}
            value={value}
            onChangeText={onChangeText}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            secureTextEntry={secureTextEntry}
            multiline={multiline}
            keyboardType={keyboardType}
            autoCapitalize={autoCapitalize}
            numberOfLines={multiline ? 4 : 1}
        />
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    gap: 6,
  },

  label: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.foreground,
    fontFamily: typography.fontFamily.medium,
  },

  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.muted,
    borderRadius: borderRadius.lg,
    borderWidth: 1.5,
    borderColor: colors.border,
    paddingHorizontal: 16,
  },

  focused: {
    borderColor: colors.primary,
    backgroundColor: '#ffffff',
  },

  errored: {
    borderColor: colors.destructive,
  },

  input: {
    flex: 1,
    height: 48,
    fontSize: 16,
    color: colors.foreground,
    fontFamily: typography.fontFamily.primary,
  },

  multiline: {
    height: 96,
    paddingTop: 12,
    textAlignVertical: 'top',
  },

  iconWrap: {
    marginRight: 8,
  },

  errorText: {
    fontSize: 12,
    color: colors.destructive,
    fontFamily: typography.fontFamily.primary,
  },
});