/**
 * 2 — Registro — Paso 1 (Básico)
 * Pantalla: Ambos
 * Descripción: Primer paso del registro. El usuario ingresa nombre, email y
 * contraseña, y elige si es Coach o Atleta.
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { C, F, R } from './KleosTheme';

interface Props {
  navigation: any;
}

type Role = 'coach' | 'atleta';

export default function RegistroPaso1Screen({ navigation }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<Role>('coach');

  const handleNext = () => {
    if (role === 'coach') {
      navigation.navigate('RegistroCoachPaso2');
    } else {
      navigation.navigate('RegistroAtletaPaso2');
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>

          {/* Progress */}
          <View style={styles.progressRow}>
            <View style={[styles.progressBar, styles.progressFilled]} />
            <View style={styles.progressBar} />
            <View style={styles.progressBar} />
            <View style={styles.progressBar} />
          </View>
          <Text style={styles.progressLabel}>Paso 1 de 4</Text>

          <Text style={styles.title}>Creá tu cuenta</Text>
          <Text style={styles.subtitle}>
            Empezá con lo básico, completás el resto después.
          </Text>

          {/* Role selector */}
          <Text style={styles.sectionLabel}>SOY</Text>
          <View style={styles.roleRow}>
            <TouchableOpacity
              style={[
                styles.roleBtn,
                role === 'coach' && styles.roleBtnActive,
              ]}
              onPress={() => setRole('coach')}
              activeOpacity={0.8}
            >
              <Text style={styles.roleEmoji}>🏋️</Text>
              <Text
                style={[
                  styles.roleText,
                  role === 'coach' && styles.roleTextActive,
                ]}
              >
                Coach
              </Text>
              <Text
                style={[
                  styles.roleDesc,
                  role === 'coach' && styles.roleDescActive,
                ]}
              >
                Entreno atletas
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.roleBtn,
                role === 'atleta' && styles.roleBtnActive,
              ]}
              onPress={() => setRole('atleta')}
              activeOpacity={0.8}
            >
              <Text style={styles.roleEmoji}>🏃</Text>
              <Text
                style={[
                  styles.roleText,
                  role === 'atleta' && styles.roleTextActive,
                ]}
              >
                Atleta
              </Text>
              <Text
                style={[
                  styles.roleDesc,
                  role === 'atleta' && styles.roleDescActive,
                ]}
              >
                Me entreno
              </Text>
            </TouchableOpacity>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>NOMBRE COMPLETO</Text>
              <TextInput
                style={styles.input}
                placeholder="Tu nombre"
                placeholderTextColor={C.textDisabled}
                value={name}
                onChangeText={setName}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>EMAIL</Text>
              <TextInput
                style={styles.input}
                placeholder="tu@email.com"
                placeholderTextColor={C.textDisabled}
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>CONTRASEÑA</Text>
              <TextInput
                style={styles.input}
                placeholder="Mínimo 8 caracteres"
                placeholderTextColor={C.textDisabled}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>
          </View>

          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={handleNext}
            activeOpacity={0.85}
          >
            <Text style={styles.primaryBtnText}>Continuar →</Text>
          </TouchableOpacity>

          <View style={styles.loginRow}>
            <Text style={styles.loginText}>¿Ya tenés cuenta? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginLink}>Iniciá sesión</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.bg },
  flex: { flex: 1 },
  container: { padding: 24, paddingTop: 16, flexGrow: 1 },
  backBtn: { marginBottom: 20, width: 36, height: 36, justifyContent: 'center' },
  backIcon: { fontSize: 22, color: C.textPrimary },
  progressRow: {
    flexDirection: 'row',
    gap: 5,
    marginBottom: 6,
  },
  progressBar: {
    flex: 1,
    height: 3,
    borderRadius: 2,
    backgroundColor: C.border,
  },
  progressFilled: {
    backgroundColor: C.primary,
  },
  progressLabel: { fontSize: F.xs, color: C.textTertiary, marginBottom: 24 },
  title: {
    fontSize: F['4xl'],
    fontWeight: '700',
    color: C.textPrimary,
    marginBottom: 6,
  },
  subtitle: { fontSize: F.md, color: C.textSecondary, marginBottom: 28 },
  sectionLabel: {
    fontSize: F.xs,
    fontWeight: '600',
    color: C.textTertiary,
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  roleRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 24,
  },
  roleBtn: {
    flex: 1,
    backgroundColor: C.white,
    borderRadius: R.xl,
    borderWidth: 1,
    borderColor: C.border,
    paddingVertical: 16,
    alignItems: 'center',
    gap: 4,
  },
  roleBtnActive: {
    backgroundColor: C.primaryBg,
    borderColor: C.primary,
    borderWidth: 2,
  },
  roleEmoji: { fontSize: 22 },
  roleText: {
    fontSize: F.md,
    fontWeight: '700',
    color: C.textPrimary,
  },
  roleTextActive: { color: C.primary },
  roleDesc: { fontSize: F.xs, color: C.textTertiary },
  roleDescActive: { color: C.primaryMid },
  form: { gap: 16, marginBottom: 24 },
  inputGroup: { gap: 6 },
  label: {
    fontSize: F.xs,
    fontWeight: '600',
    color: C.textTertiary,
    letterSpacing: 0.5,
  },
  input: {
    backgroundColor: C.white,
    borderRadius: R.lg,
    borderWidth: 1,
    borderColor: C.borderSubtle,
    paddingHorizontal: 14,
    paddingVertical: 13,
    fontSize: F.md,
    color: C.textPrimary,
  },
  primaryBtn: {
    backgroundColor: C.primary,
    borderRadius: R.xl,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  primaryBtnText: { fontSize: F.lg, fontWeight: '700', color: C.white },
  loginRow: { flexDirection: 'row', justifyContent: 'center' },
  loginText: { fontSize: F.sm, color: C.textSecondary },
  loginLink: { fontSize: F.sm, color: C.primary, fontWeight: '700' },
});
