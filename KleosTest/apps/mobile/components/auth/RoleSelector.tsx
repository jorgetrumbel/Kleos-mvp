import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, borderRadius, spacing, typography } from '@/theme';
import { RegistrationRole } from '@/store/register.store';

type RoleOption = {
  value: RegistrationRole;
  label: string;
};

type RoleSelectorProps = {
  value: RegistrationRole;
  options: RoleOption[];
  onChange: (value: RegistrationRole) => void;
};

export function RoleSelector({
  value,
  options,
  onChange,
}: RoleSelectorProps) {
  return (
    <View style={styles.row}>
      {options.map((option) => {
        const selected = option.value === value;

        return (
          <Pressable
            key={option.value}
            onPress={() => onChange(option.value)}
            style={[
              styles.card,
              selected && styles.cardSelected,
            ]}
          >
            <Text
              style={[
                styles.label,
                selected && styles.labelSelected,
              ]}
            >
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: spacing[2],
  },

  card: {
    flex: 1,
    minHeight: 52,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: borderRadius.lg,
    padding: spacing[3],
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.card,
  },

  cardSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.accentSurface,
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.mutedForeground,
    fontFamily: typography.fontFamily.semibold,
  },

  labelSelected: {
    color: colors.primary,
  },
});
