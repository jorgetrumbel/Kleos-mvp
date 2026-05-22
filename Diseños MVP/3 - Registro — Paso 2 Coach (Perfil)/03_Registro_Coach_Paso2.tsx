/**
 * 3 — Registro — Paso 2 Coach (Perfil)
 * Pantalla: Coach
 * Descripción: El coach completa su perfil: nombre, especialidad, años de experiencia y bio.
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

const ESPECIALIDADES = ['Running', 'Triatlón', 'Ciclismo', 'Natación', 'Fuerza', 'CrossFit', 'Funcional', 'Otro'];

export default function RegistroCoachPaso2Screen({ navigation }: Props) {
  const [especialidades, setEspecialidades] = useState<string[]>([]);
  const [experiencia, setExperiencia] = useState('');
  const [bio, setBio] = useState('');

  const toggleEspecialidad = (item: string) => {
    setEspecialidades(prev =>
      prev.includes(item) ? prev.filter(e => e !== item) : [...prev, item]
    );
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
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>

          {/* Progress */}
          <View style={styles.progressRow}>
            {[0, 1, 2, 3].map(i => (
              <View key={i} style={[styles.bar, i <= 1 && styles.barFilled]} />
            ))}
          </View>
          <Text style={styles.progressLabel}>Paso 2 de 4</Text>

          <Text style={styles.title}>Tu perfil de coach</Text>
          <Text style={styles.subtitle}>
            Contale a tus atletas quién sos y en qué te especializás.
          </Text>

          {/* Especialidad */}
          <Text style={styles.label}>ESPECIALIDAD</Text>
          <View style={styles.tagsWrap}>
            {ESPECIALIDADES.map(item => {
              const active = especialidades.includes(item);
              return (
                <TouchableOpacity
                  key={item}
                  style={[styles.tag, active && styles.tagActive]}
                  onPress={() => toggleEspecialidad(item)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.tagText, active && styles.tagTextActive]}>
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Experiencia */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>AÑOS DE EXPERIENCIA</Text>
            <View style={styles.row}>
              {['1-2', '3-5', '5-10', '10+'].map(opt => {
                const active = experiencia === opt;
                return (
                  <TouchableOpacity
                    key={opt}
                    style={[styles.optBtn, active && styles.optBtnActive]}
                    onPress={() => setExperiencia(opt)}
                    activeOpacity={0.8}
                  >
                    <Text style={[styles.optText, active && styles.optTextActive]}>
                      {opt} años
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Bio */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>BIO (OPCIONAL)</Text>
            <TextInput
              style={styles.textArea}
              placeholder="Contá quién sos, tu metodología, tus logros..."
              placeholderTextColor={C.textDisabled}
              multiline
              numberOfLines={4}
              value={bio}
              onChangeText={setBio}
              textAlignVertical="top"
            />
          </View>

          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={() => navigation.navigate('RegistroCoachPaso3')}
            activeOpacity={0.85}
          >
            <Text style={styles.primaryBtnText}>Continuar →</Text>
          </TouchableOpacity>
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
  progressRow: { flexDirection: 'row', gap: 5, marginBottom: 6 },
  bar: { flex: 1, height: 3, borderRadius: 2, backgroundColor: C.border },
  barFilled: { backgroundColor: C.primary },
  progressLabel: { fontSize: F.xs, color: C.textTertiary, marginBottom: 24 },
  title: { fontSize: F['4xl'], fontWeight: '700', color: C.textPrimary, marginBottom: 6 },
  subtitle: { fontSize: F.md, color: C.textSecondary, marginBottom: 28 },
  label: {
    fontSize: F.xs,
    fontWeight: '600',
    color: C.textTertiary,
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  tagsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 24,
  },
  tag: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: R.full,
    backgroundColor: C.white,
    borderWidth: 1,
    borderColor: C.border,
  },
  tagActive: {
    backgroundColor: C.primaryBg,
    borderColor: C.primary,
    borderWidth: 2,
  },
  tagText: { fontSize: F.sm, color: C.textSecondary, fontWeight: '500' },
  tagTextActive: { color: C.primary, fontWeight: '700' },
  inputGroup: { marginBottom: 20 },
  row: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  optBtn: {
    flex: 1,
    minWidth: '22%',
    paddingVertical: 10,
    borderRadius: R.lg,
    borderWidth: 1,
    borderColor: C.border,
    backgroundColor: C.white,
    alignItems: 'center',
  },
  optBtnActive: {
    backgroundColor: C.primaryBg,
    borderColor: C.primary,
    borderWidth: 2,
  },
  optText: { fontSize: F.sm, color: C.textSecondary, fontWeight: '500' },
  optTextActive: { color: C.primary, fontWeight: '700' },
  textArea: {
    backgroundColor: C.white,
    borderRadius: R.lg,
    borderWidth: 1,
    borderColor: C.borderSubtle,
    paddingHorizontal: 14,
    paddingVertical: 13,
    fontSize: F.md,
    color: C.textPrimary,
    minHeight: 100,
  },
  primaryBtn: {
    backgroundColor: C.primary,
    borderRadius: R.xl,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 8,
  },
  primaryBtnText: { fontSize: F.lg, fontWeight: '700', color: C.white },
});
