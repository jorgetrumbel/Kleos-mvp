// src/components/ui/Stepper.tsx

import React from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
} from 'react-native';

import {
  colors,
  spacing,
  borderRadius,
} from '@/theme';

interface StepperProps {
  current: number;
  total: number;
  style?: ViewStyle;
}

export function Stepper({
  current,
  total,
  style,
}: StepperProps) {
  return (
    <View style={[styles.container, style]}>
      {Array.from({ length: total }).map((_, index) => {
        const active = index < current;

        return (
          <View
            key={index}
            style={[
              styles.segment,
              active && styles.activeSegment,
            ]}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[1],
  },

  segment: {
    flex: 1,
    height: 4,

    borderRadius: borderRadius.full,

    backgroundColor: colors.border,
  },

  activeSegment: {
    backgroundColor: colors.primary,
  },
});