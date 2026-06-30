import { StyleSheet, Text, View } from 'react-native';

import { colors, spacing } from '@/theme';

type StepperProps = {
  currentStep: number;
  totalSteps: number;
  label: string;
};

export function Stepper({
  currentStep,
  totalSteps,
  label,
}: StepperProps) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.track}>
        {Array.from({ length: totalSteps }).map((_, index) => (
          <View
            key={index}
            style={[
              styles.segment,
              index < currentStep && styles.segmentActive,
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    gap: spacing[2],
  },

  label: {
    fontSize: 13,
    color: colors.mutedForeground,
    textAlign: 'right',
  },

  track: {
    flexDirection: 'row',
    gap: 4,
  },

  segment: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.border,
  },

  segmentActive: {
    backgroundColor: colors.primary,
  },
});
