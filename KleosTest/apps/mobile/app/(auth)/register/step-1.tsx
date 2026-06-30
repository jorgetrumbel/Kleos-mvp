import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';

import { DateInput } from '@/components/auth/DateInput';
import { RoleSelector } from '@/components/auth/RoleSelector';
import { Stepper } from '@/components/auth/Stepper';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { t } from '@/locales';
import { setAuthToken } from '@/services/api';
import { register } from '@/services/auth.service';
import {
  saveRegistrationStep,
  saveToken,
} from '@/services/storage.service';
import { useAuthStore } from '@/store/auth.store';
import {
  RegistrationRole,
  useRegisterStore,
} from '@/store/register.store';
import { colors, spacing, typography } from '@/theme';

const TOTAL_STEPS = 5;

type RegisterStep1Form = {
  role: RegistrationRole;
  firstName: string;
  lastName: string;
  birthDate: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function RegisterStep1Screen() {
  const router = useRouter();
  const registration = useRegisterStore();
  const updateRegistration = useRegisterStore((state) => state.update);
  const authLogin = useAuthStore((state) => state.login);
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterStep1Form>({
    defaultValues: {
      role: registration.role,
      firstName: registration.firstName,
      lastName: registration.lastName,
      birthDate: registration.birthDate,
      email: registration.email,
      password: registration.password,
      confirmPassword: registration.password,
    },
  });

  const password = watch('password');

  const onSubmit = async (data: RegisterStep1Form) => {
    try {
      setLoading(true);

      updateRegistration({
        role: data.role,
        firstName: data.firstName,
        lastName: data.lastName,
        birthDate: data.birthDate,
        email: data.email,
        password: data.password,
        currentStep: 2,
      });

      const response = await register({
        email: data.email,
        password: data.password,
        nombre: data.firstName,
        apellido: data.lastName,
        role: data.role === 'athlete' ? 'atleta' : 'coach',
      });

      await saveToken(response.accessToken);
      await saveRegistrationStep(2);
      setAuthToken(response.accessToken);
      authLogin(response.user, response.accessToken);

      router.replace('/(auth)/register/step-2');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.content}
      >
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
            accessibilityLabel={t.auth.register.step1.back}
          >
            <ArrowLeft size={20} color={colors.primary} />
          </TouchableOpacity>

          <Stepper
            currentStep={1}
            totalSteps={TOTAL_STEPS}
            label={t.auth.register.stepLabel(1, TOTAL_STEPS)}
          />
        </View>

        <View style={styles.titleBlock}>
          <Text style={styles.title}>
            {t.auth.register.step1.title}
          </Text>
          <Text style={styles.subtitle}>
            {t.auth.register.step1.subtitle}
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.fieldGroup}>
            <Text style={styles.sectionTitle}>
              {t.auth.register.step1.roleTitle}
            </Text>

            <Controller
              control={control}
              name="role"
              render={({ field: { onChange, value } }) => (
                <RoleSelector
                  value={value}
                  onChange={onChange}
                  options={[
                    {
                      value: 'coach',
                      label: t.auth.register.step1.roles.coach,
                    },
                    {
                      value: 'athlete',
                      label: t.auth.register.step1.roles.athlete,
                    },
                  ]}
                />
              )}
            />
          </View>

          <Controller
            control={control}
            name="firstName"
            rules={{
              required: t.auth.register.validation.firstNameRequired,
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                label={t.auth.register.step1.firstName}
                placeholder={t.auth.register.step1.firstNamePlaceholder}
                value={value}
                onChangeText={onChange}
                error={errors.firstName?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="lastName"
            rules={{
              required: t.auth.register.validation.lastNameRequired,
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                label={t.auth.register.step1.lastName}
                placeholder={t.auth.register.step1.lastNamePlaceholder}
                value={value}
                onChangeText={onChange}
                error={errors.lastName?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="birthDate"
            rules={{
              required: t.auth.register.validation.birthDateRequired,
            }}
            render={({ field: { onChange, value } }) => (
              <DateInput
                label={t.auth.register.step1.birthDate}
                placeholder={t.auth.register.step1.birthDatePlaceholder}
                value={value}
                onChangeText={onChange}
                error={errors.birthDate?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            rules={{
              required: t.auth.register.validation.emailRequired,
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: t.auth.register.validation.emailInvalid,
              },
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                label={t.auth.register.step1.email}
                placeholder={t.auth.register.step1.emailPlaceholder}
                value={value}
                onChangeText={onChange}
                error={errors.email?.message}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            rules={{
              required: t.auth.register.validation.passwordRequired,
              minLength: {
                value: 6,
                message: t.auth.register.validation.passwordMinLength,
              },
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                label={t.auth.register.step1.password}
                placeholder={t.auth.register.step1.passwordPlaceholder}
                value={value}
                onChangeText={onChange}
                error={errors.password?.message}
                secureTextEntry
              />
            )}
          />

          <Controller
            control={control}
            name="confirmPassword"
            rules={{
              required: t.auth.register.validation.confirmPasswordRequired,
              validate: (value) =>
                value === password ||
                t.auth.register.validation.passwordsDoNotMatch,
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                label={t.auth.register.step1.confirmPassword}
                placeholder={t.auth.register.step1.passwordPlaceholder}
                value={value}
                onChangeText={onChange}
                error={errors.confirmPassword?.message}
                secureTextEntry
              />
            )}
          />

          <Button
            label={t.auth.register.step1.next}
            onPress={handleSubmit(onSubmit)}
            loading={loading}
            fullWidth
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },

  content: {
    padding: spacing[5],
    gap: spacing[4],
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[3],
  },

  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },

  titleBlock: {
    gap: spacing[1],
  },

  title: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.primary,
    fontFamily: typography.fontFamily.display,
  },

  subtitle: {
    fontSize: 14,
    color: colors.mutedForeground,
  },

  form: {
    gap: spacing[3],
  },

  fieldGroup: {
    gap: spacing[2],
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.foreground,
  },
});
