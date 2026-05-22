/**
 * 8 — Registro — Paso 3 Atleta (Código coach)
 * Pantalla: Atleta
 * Descripción: El atleta ingresa el código de su coach para vincularse.
 */

import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, SafeAreaView, ScrollView,
  KeyboardAvoidingView, Platform, ActivityIndicator,
} from 'react-native';
import { C, F, R } from './KleosTheme';

interface Props { navigation: any }

// Mock: datos del coach encontrado
const MOCK_COACH = {
  nombre: 'Roberto Silva',
  especialidad: 'Coach de Running · 8 años exp.',
  atletas: 18,
};

export default function RegistroAtletaPaso3Screen({ navigation }: Props) {
  const [codigo, setCodigo] = useState('');
  const [loading, setLoading] = useState(false);
  const [coachFound, setCoachFound] = useState<typeof MOCK_COACH | null>(null);
  const [error, setError] = useState('');

  const handleSearch = () => {
    if (!codigo.trim()) return;
    setLoading(true);
    setError('');
    setCoachFound(null);

    // Simular búsqueda
    setTimeout(() => {
      setLoading(false);
      if (codigo.toUpperCase() === 'ROBERTO-2026') {
        setCoachFound(MOCK_COACH);
      } else {
        setError('Código no encontrado. Revisá con tu coach.');
      }
    }, 1200);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>

          <View style={styles.progressRow}>
            {[0, 1, 2].map(i => (
              <View key={i} style={[styles.bar, styles.barFilled]} />
            ))}
          </View>
          <Text style={styles.progressLabel}>Paso 3 de 3</Text>

          <Text style={styles.title}>Conectá con tu coach</Text>
          <Text style={styles.subtitle}>
            Pedile a tu coach su código de invitación e ingresalo acá.
          </Text>

          {/* Input código */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>CÓDIGO DE INVITACIÓN</Text>
            <View style={styles.inputRow}>
              <TextInput
                style={styles.input}
                placeholder="Ej: ROBERTO-2026"
                placeholderTextColor={C.textDisabled}
                autoCapitalize="characters"
                value={codigo}
                onChangeText={t => { setCodigo(t); setCoachFound(null); setError(''); }}
              />
              <TouchableOpacity
                style={[styles.searchBtn, !codigo.trim() && styles.searchBtnDisabled]}
                onPress={handleSearch}
                disabled={!codigo.trim() || loading}
                activeOpacity={0.8}
              >
                {loading
                  ? <ActivityIndicator color={C.white} size="small" />
                  : <Text style={styles.searchBtnText}>Buscar</Text>
                }
              </TouchableOpacity>
            </View>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
          </View>

          {/* Coach encontrado */}
          {coachFound && (
            <View style={styles.coachCard}>
              <View style={styles.coachAvatar}>
                <Text style={styles.coachAvatarText}>R</Text>
              </View>
              <View style={styles.coachInfo}>
                <Text style={styles.coachName}>{coachFound.nombre}</Text>
                <Text style={styles.coachSpec}>{coachFound.especialidad}</Text>
                <View style={styles.coachBadge}>
                  <Text style={styles.coachBadgeText}>{coachFound.atletas} atletas activos</Text>
                </View>
              </View>
              <Text style={styles.checkMark}>✓</Text>
            </View>
          )}

          {/* Skip */}
          <TouchableOpacity
            style={styles.skipBtn}
            onPress={() => navigation.navigate('AthleteHome')}
          >
            <Text style={styles.skipText}>Hacerlo después</Text>
          </TouchableOpacity>

          <View style={styles.spacer} />

          <TouchableOpacity
            style={[styles.primaryBtn, !coachFound && styles.primaryBtnDisabled]}
            onPress={() => navigation.navigate('AthleteHome')}
            disabled={!coachFound}
            activeOpacity={0.85}
          >
            <Text style={styles.primaryBtnText}>
              {coachFound ? `Vincularme con ${coachFound.nombre} →` : 'Ingresá un código primero'}
            </Text>
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
  inputGroup: { marginBottom: 16 },
  label: { fontSize: F.xs, fontWeight: '600', color: C.textTertiary, letterSpacing: 0.5, marginBottom: 8 },
  inputRow: { flexDirection: 'row', gap: 10 },
  input: {
    flex: 1,
    backgroundColor: C.white,
    borderRadius: R.lg,
    borderWidth: 1,
    borderColor: C.borderSubtle,
    paddingHorizontal: 14,
    paddingVertical: 13,
    fontSize: F.md,
    color: C.textPrimary,
  },
  searchBtn: {
    backgroundColor: C.primary,
    borderRadius: R.lg,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 72,
  },
  searchBtnDisabled: { backgroundColor: C.border },
  searchBtnText: { fontSize: F.sm, fontWeight: '700', color: C.white },
  errorText: { fontSize: F.sm, color: C.error, marginTop: 6 },
  coachCard: {
    backgroundColor: C.white,
    borderRadius: R.xl,
    borderWidth: 2,
    borderColor: C.primary,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 24,
  },
  coachAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: C.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  coachAvatarText: { fontSize: F.xl, fontWeight: '700', color: C.white },
  coachInfo: { flex: 1, gap: 4 },
  coachName: { fontSize: F.md, fontWeight: '700', color: C.textPrimary },
  coachSpec: { fontSize: F.sm, color: C.textSecondary },
  coachBadge: {
    alignSelf: 'flex-start',
    backgroundColor: C.primaryBg,
    borderRadius: R.full,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginTop: 2,
  },
  coachBadgeText: { fontSize: F.xs, color: C.primary, fontWeight: '600' },
  checkMark: { fontSize: 22, color: C.primary, fontWeight: '700' },
  skipBtn: { alignSelf: 'center', paddingVertical: 8, marginBottom: 16 },
  skipText: { fontSize: F.sm, color: C.textTertiary, fontWeight: '600' },
  spacer: { flex: 1 },
  primaryBtn: {
    backgroundColor: C.primary,
    borderRadius: R.xl,
    paddingVertical: 15,
    alignItems: 'center',
  },
  primaryBtnDisabled: { backgroundColor: C.border },
  primaryBtnText: { fontSize: F.lg, fontWeight: '700', color: C.white },
});
