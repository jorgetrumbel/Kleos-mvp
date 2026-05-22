/**
 * 7 — Registro — Paso 2 Atleta (Perfil físico)
 * Pantalla: Atleta
 * Descripción: El atleta completa su perfil físico: altura, peso, objetivo, historial.
 */

import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, SafeAreaView, ScrollView,
  KeyboardAvoidingView, Platform,
} from 'react-native';
import { C, F, R } from './KleosTheme';

interface Props { navigation: any }

const OBJETIVOS = ['Mejorar rendimiento', 'Bajar tiempo en 10K', 'Preparar maratón', 'Ganar fuerza', 'Pérdida de peso', 'Triatlón', 'Otro'];
const NIVELES = ['Principiante', 'Intermedio', 'Avanzado'];

export default function RegistroAtletaPaso2Screen({ navigation }: Props) {
  const [altura, setAltura] = useState('');
  const [peso, setPeso] = useState('');
  const [objetivo, setObjetivo] = useState('');
  const [nivel, setNivel] = useState('');
  const [historial, setHistorial] = useState('');

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>

          <View style={styles.progressRow}>
            {[0, 1, 2].map(i => (
              <View key={i} style={[styles.bar, i <= 1 && styles.barFilled]} />
            ))}
          </View>
          <Text style={styles.progressLabel}>Paso 2 de 3</Text>

          <Text style={styles.title}>Tu perfil de atleta</Text>
          <Text style={styles.subtitle}>
            Esta info ayuda a tu coach a diseñar el mejor plan para vos.
          </Text>

          {/* Física */}
          <Text style={styles.sectionTitle}>Datos físicos</Text>
          <View style={styles.row}>
            <View style={styles.halfGroup}>
              <Text style={styles.label}>ALTURA (cm)</Text>
              <TextInput
                style={styles.input}
                placeholder="Ej: 170"
                placeholderTextColor={C.textDisabled}
                keyboardType="numeric"
                value={altura}
                onChangeText={setAltura}
              />
            </View>
            <View style={styles.halfGroup}>
              <Text style={styles.label}>PESO (kg)</Text>
              <TextInput
                style={styles.input}
                placeholder="Ej: 70"
                placeholderTextColor={C.textDisabled}
                keyboardType="numeric"
                value={peso}
                onChangeText={setPeso}
              />
            </View>
          </View>

          {/* Nivel */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>NIVEL ACTUAL</Text>
            <View style={styles.optRow}>
              {NIVELES.map(n => {
                const active = nivel === n;
                return (
                  <TouchableOpacity
                    key={n}
                    style={[styles.optBtn, active && styles.optBtnActive]}
                    onPress={() => setNivel(n)}
                    activeOpacity={0.8}
                  >
                    <Text style={[styles.optText, active && styles.optTextActive]}>{n}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Objetivo */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>OBJETIVO PRINCIPAL</Text>
            <View style={styles.tagsWrap}>
              {OBJETIVOS.map(obj => {
                const active = objetivo === obj;
                return (
                  <TouchableOpacity
                    key={obj}
                    style={[styles.tag, active && styles.tagActive]}
                    onPress={() => setObjetivo(obj)}
                    activeOpacity={0.8}
                  >
                    <Text style={[styles.tagText, active && styles.tagTextActive]}>{obj}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Historial */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>HISTORIAL DEPORTIVO (OPCIONAL)</Text>
            <TextInput
              style={styles.textArea}
              placeholder="Contá brevemente tu experiencia deportiva..."
              placeholderTextColor={C.textDisabled}
              multiline
              numberOfLines={4}
              value={historial}
              onChangeText={setHistorial}
              textAlignVertical="top"
            />
          </View>

          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={() => navigation.navigate('RegistroAtletaPaso3')}
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
  sectionTitle: { fontSize: F.md, fontWeight: '700', color: C.textPrimary, marginBottom: 12 },
  row: { flexDirection: 'row', gap: 12, marginBottom: 20 },
  halfGroup: { flex: 1, gap: 6 },
  inputGroup: { marginBottom: 20 },
  label: { fontSize: F.xs, fontWeight: '600', color: C.textTertiary, letterSpacing: 0.5, marginBottom: 8 },
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
  optRow: { flexDirection: 'row', gap: 8 },
  optBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: R.lg,
    borderWidth: 1,
    borderColor: C.border,
    backgroundColor: C.white,
    alignItems: 'center',
  },
  optBtnActive: { backgroundColor: C.primaryBg, borderColor: C.primary, borderWidth: 2 },
  optText: { fontSize: F.xs, color: C.textSecondary, fontWeight: '500' },
  optTextActive: { color: C.primary, fontWeight: '700' },
  tagsWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tag: {
    paddingHorizontal: 14, paddingVertical: 8,
    borderRadius: R.full, backgroundColor: C.white,
    borderWidth: 1, borderColor: C.border,
  },
  tagActive: { backgroundColor: C.primaryBg, borderColor: C.primary, borderWidth: 2 },
  tagText: { fontSize: F.sm, color: C.textSecondary },
  tagTextActive: { color: C.primary, fontWeight: '700' },
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
