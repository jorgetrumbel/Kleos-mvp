import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useRouter } from 'expo-router';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { t } from '@/locales';
import { setAuthToken } from '@/services/api';
import { login } from '@/services/auth.service';
import {
  getRegistrationStep,
  saveToken,
} from '@/services/storage.service';
import { useAuthStore } from '@/store/auth.store';
import { colors, spacing, typography } from '@/theme';

type LoginForm = {
  email: string;
  password: string;
};

export default function LoginScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const authLogin = useAuthStore((state) => state.login);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      setLoading(true);

      const response = await login({
        email: data.email,
        password: data.password,
      });

      await saveToken(response.accessToken);
      setAuthToken(response.accessToken);
      authLogin(response.user, response.accessToken);

      const registrationStep = await getRegistrationStep();

      if (registrationStep && registrationStep > 1) {
        router.replace('/(auth)/register/step-2');
      }
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
      <View style={styles.hero}>
        <View style={styles.logo}>
          <Text style={styles.logoText}>K</Text>
        </View>

        <Text style={styles.title}>
          {t.auth.login.title}
        </Text>

        <Text style={styles.subtitle}>
          {t.auth.login.subtitle}
        </Text>
      </View>

      <View style={styles.form}>
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
              label={t.auth.login.email}
              value={value}
              onChangeText={onChange}
              error={errors.email?.message}
              placeholder="coach@example.com"
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
              label={t.auth.login.password}
              value={value}
              onChangeText={onChange}
              error={errors.password?.message}
              placeholder="********"
              secureTextEntry
            />
          )}
        />

        <Button
          label={t.auth.login.signIn}
          fullWidth
          loading={loading}
          onPress={handleSubmit(onSubmit)}
        />

        <TouchableOpacity
          onPress={() => router.push('/(auth)/register/step-1')}
        >
          <Text style={styles.link}>
            {t.auth.login.noAccount}
            <Text style={styles.linkBold}>
              {' '}{t.auth.login.register}
            </Text>
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing[6],
  },

  hero: {
    alignItems: 'center',
    marginVertical: spacing[8],
  },

  logo: {
    width: 72,
    height: 72,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing[3],
  },

  logoText: {
    fontSize: 32,
    fontWeight: '900',
    color: '#fff',
  },

  title: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.primary,
    fontFamily: typography.fontFamily.display,
  },

  subtitle: {
    fontSize: 13,
    color: colors.mutedForeground,
    marginTop: 4,
  },

  form: {
    gap: spacing[3],
  },

  link: {
    textAlign: 'center',
    fontSize: 13,
    color: colors.mutedForeground,
  },

  linkBold: {
    color: colors.primary,
    fontWeight: '600',
  },
});
