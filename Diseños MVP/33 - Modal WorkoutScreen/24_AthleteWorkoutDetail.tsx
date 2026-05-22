/**
 * 24 — Atleta — Detalle del entrenamiento
 * Pantalla: Atleta
 * Descripción: Vista detallada del entrenamiento del día. Instrucciones,
 * series, zonas y botón para marcar como completado con RPE.
 */

import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, SafeAreaView,
} from 'react-native';
import { C, F, R, S } from './KleosTheme';

interface Props { navigation: any; route?: any }

const BLOQUES = [
  { id: '1', tipo: 'Calentamiento', duracion: '10 min', zona: 'Z1-2', descripcion: 'Trote suave progresivo. Activar articulaciones.' },
  {
    id: '2', tipo: 'Parte principal', duracion: '35 min', zona: 'Z4', descripcion: '5 repeticiones de 1km a ritmo objetivo (4:45-5:00 /km).\nRecuperación: 2 min trote suave Z1 entre cada rep.',
    series: [
      { num: 1, distancia: '1 km', ritmo: '4:50 /km', fc: '~165 bpm' },
      { num: 2, distancia: '1 km', ritmo: '4:50 /km', fc: '~168 bpm' },
      { num: 3, distancia: '1 km', ritmo: '4:50 /km', fc: '~170 bpm' },
      { num: 4, distancia: '1 km', ritmo: '4:50 /km', fc: '~172 bpm' },
      { num: 5, distancia: '1 km', ritmo: '4:50 /km', fc: '~175 bpm' },
    ],
  },
  { id: '3', tipo: 'Vuelta a la calma', duracion: '10 min', zona: 'Z1', descripcion: 'Trote muy suave y estiramiento. FC por debajo de 130.' },
];

export default function AthleteWorkoutDetailScreen({ navigation }: Props) {
  const [completado, setCompletado] = useState(false);
  const [rpe, setRpe] = useState<number | null>(null);

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.headerTitle}>Intervalo 5×1km</Text>
          <Text style={styles.headerSub}>Mié 21 Mayo · Zona 4</Text>
        </View>
        <View style={styles.zonaBadge}>
          <Text style={styles.zonaBadgeText}>Z4</Text>
        </View>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Resumen */}
        <View style={styles.summaryRow}>
          {[
            { icon: '⏱', value: '55 min', label: 'Duración' },
            { icon: '📍', value: '8 km', label: 'Distancia est.' },
            { icon: '❤️', value: '155–175', label: 'FC objetivo' },
          ].map(item => (
            <View key={item.label} style={styles.summaryItem}>
              <Text style={styles.summaryIcon}>{item.icon}</Text>
              <Text style={styles.summaryValue}>{item.value}</Text>
              <Text style={styles.summaryLabel}>{item.label}</Text>
            </View>
          ))}
        </View>

        {/* Nota del coach */}
        <View style={styles.coachNote}>
          <View style={styles.coachNoteHeader}>
            <View style={styles.coachAvatar}>
              <Text style={styles.coachAvatarText}>R</Text>
            </View>
            <Text style={styles.coachNoteAutor}>Nota de Roberto</Text>
          </View>
          <Text style={styles.coachNoteText}>
            Martina, para esta sesión quiero que arranques más conservadora en las primeras 2 reps y vayas soltando progresivamente. El objetivo es que la 4ta y 5ta sean las más fuertes 💪
          </Text>
        </View>

        {/* Bloques */}
        {BLOQUES.map(bloque => (
          <View key={bloque.id} style={styles.bloqueCard}>
            <View style={styles.bloqueHeader}>
              <View style={styles.bloqueTipoTag}>
                <Text style={styles.bloqueTipoText}>{bloque.tipo}</Text>
              </View>
              <Text style={styles.bloqueDuracion}>⏱ {bloque.duracion}</Text>
              {bloque.zona && (
                <View style={styles.bloqueZonaTag}>
                  <Text style={styles.bloqueZonaText}>{bloque.zona}</Text>
                </View>
              )}
            </View>
            <Text style={styles.bloqueDesc}>{bloque.descripcion}</Text>

            {bloque.series && (
              <View style={styles.seriesTable}>
                <View style={styles.seriesHeader}>
                  <Text style={[styles.seriesHeaderCell, { flex: 0.5 }]}>#</Text>
                  <Text style={styles.seriesHeaderCell}>Dist.</Text>
                  <Text style={styles.seriesHeaderCell}>Ritmo</Text>
                  <Text style={styles.seriesHeaderCell}>FC</Text>
                </View>
                {bloque.series.map(s => (
                  <View key={s.num} style={styles.seriesRow}>
                    <Text style={[styles.seriesCell, styles.seriesNum, { flex: 0.5 }]}>{s.num}</Text>
                    <Text style={styles.seriesCell}>{s.distancia}</Text>
                    <Text style={[styles.seriesCell, styles.seriesBold]}>{s.ritmo}</Text>
                    <Text style={styles.seriesCell}>{s.fc}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        ))}

        {/* RPE */}
        {!completado && (
          <View style={styles.rpeCard}>
            <Text style={styles.rpeTitle}>¿Cómo te sentiste?</Text>
            <Text style={styles.rpeSub}>Seleccioná tu esfuerzo percibido (RPE)</Text>
            <View style={styles.rpeGrid}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                <TouchableOpacity
                  key={n}
                  style={[styles.rpeBtn, rpe === n && styles.rpeBtnActive]}
                  onPress={() => setRpe(n)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.rpeBtnText, rpe === n && styles.rpeBtnTextActive]}>{n}</Text>
                </TouchableOpacity>
              ))}
            </View>
            {rpe && (
              <Text style={styles.rpeLabel}>
                {rpe <= 3 ? '😌 Muy fácil' : rpe <= 5 ? '💪 Moderado' : rpe <= 7 ? '🔥 Duro' : '😤 Muy duro'}
              </Text>
            )}
          </View>
        )}

        {/* CTA */}
        {!completado ? (
          <TouchableOpacity
            style={[styles.completeBtn, !rpe && styles.completeBtnDisabled]}
            onPress={() => rpe && setCompletado(true)}
            activeOpacity={0.85}
          >
            <Text style={styles.completeBtnText}>✓ Marcar como completado</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.doneCard}>
            <Text style={styles.doneIcon}>🎉</Text>
            <Text style={styles.doneTitle}>¡Entrenamiento completado!</Text>
            <Text style={styles.doneSub}>RPE registrado: {rpe}/10</Text>
          </View>
        )}

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.bgGray },
  header: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: C.white, paddingHorizontal: 16,
    paddingVertical: 14, gap: 10,
    borderBottomWidth: 1, borderBottomColor: C.borderSubtle,
  },
  backBtn: { width: 32, height: 32, justifyContent: 'center' },
  backIcon: { fontSize: 22, color: C.textPrimary },
  headerInfo: { flex: 1 },
  headerTitle: { fontSize: F.lg, fontWeight: '700', color: C.textPrimary },
  headerSub: { fontSize: F.xs, color: C.textTertiary, marginTop: 2 },
  zonaBadge: {
    backgroundColor: C.primary, borderRadius: R.sm,
    paddingHorizontal: 9, paddingVertical: 5,
  },
  zonaBadgeText: { fontSize: F.sm, fontWeight: '700', color: C.white },
  scroll: { flex: 1, padding: 16 },
  summaryRow: {
    flexDirection: 'row', backgroundColor: C.white,
    borderRadius: R.xl, borderWidth: 1, borderColor: C.borderSubtle,
    padding: 14, marginBottom: 14, ...S.card,
  },
  summaryItem: { flex: 1, alignItems: 'center' },
  summaryIcon: { fontSize: 20, marginBottom: 4 },
  summaryValue: { fontSize: F.md, fontWeight: '700', color: C.textPrimary },
  summaryLabel: { fontSize: F.xs, color: C.textTertiary, marginTop: 2 },
  coachNote: {
    backgroundColor: C.primaryBg, borderRadius: R.xl,
    borderWidth: 1, borderColor: 'rgba(26,124,131,0.15)',
    padding: 14, marginBottom: 14,
  },
  coachNoteHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  coachAvatar: {
    width: 28, height: 28, borderRadius: 14,
    backgroundColor: C.primary, alignItems: 'center', justifyContent: 'center',
  },
  coachAvatarText: { fontSize: F.xs, fontWeight: '700', color: C.white },
  coachNoteAutor: { fontSize: F.sm, fontWeight: '700', color: C.primary },
  coachNoteText: { fontSize: F.sm, color: C.textPrimary, lineHeight: 18 },
  bloqueCard: {
    backgroundColor: C.white, borderRadius: R.xl,
    borderWidth: 1, borderColor: C.borderSubtle,
    padding: 14, marginBottom: 10, ...S.card,
  },
  bloqueHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  bloqueTipoTag: {
    backgroundColor: C.bgGray, borderRadius: R.xs,
    paddingHorizontal: 8, paddingVertical: 3,
  },
  bloqueTipoText: { fontSize: F.xs, fontWeight: '600', color: C.textSecondary },
  bloqueDuracion: { fontSize: F.xs, color: C.textTertiary },
  bloqueZonaTag: {
    backgroundColor: C.primaryBg, borderRadius: R.xs,
    paddingHorizontal: 8, paddingVertical: 3,
  },
  bloqueZonaText: { fontSize: F.xs, fontWeight: '700', color: C.primary },
  bloqueDesc: { fontSize: F.sm, color: C.textPrimary, lineHeight: 18 },
  seriesTable: { marginTop: 10, borderRadius: R.md, overflow: 'hidden', borderWidth: 1, borderColor: C.borderSubtle },
  seriesHeader: { flexDirection: 'row', backgroundColor: C.bgGray, padding: 8 },
  seriesHeaderCell: { flex: 1, fontSize: F.xs, fontWeight: '700', color: C.textTertiary, textAlign: 'center' },
  seriesRow: {
    flexDirection: 'row', padding: 8,
    borderTopWidth: 1, borderTopColor: C.borderSubtle,
  },
  seriesCell: { flex: 1, fontSize: F.sm, color: C.textSecondary, textAlign: 'center' },
  seriesNum: { color: C.textTertiary },
  seriesBold: { fontWeight: '700', color: C.primary },
  rpeCard: {
    backgroundColor: C.white, borderRadius: R.xl,
    borderWidth: 1, borderColor: C.borderSubtle,
    padding: 14, marginBottom: 14, ...S.card,
  },
  rpeTitle: { fontSize: F.md, fontWeight: '700', color: C.textPrimary, marginBottom: 4 },
  rpeSub: { fontSize: F.sm, color: C.textTertiary, marginBottom: 12 },
  rpeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  rpeBtn: {
    width: 42, height: 42, borderRadius: R.lg,
    backgroundColor: C.bgGray, alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: C.border,
  },
  rpeBtnActive: { backgroundColor: C.primary, borderColor: C.primary },
  rpeBtnText: { fontSize: F.md, fontWeight: '700', color: C.textSecondary },
  rpeBtnTextActive: { color: C.white },
  rpeLabel: { fontSize: F.sm, color: C.primary, fontWeight: '600', marginTop: 10 },
  completeBtn: {
    backgroundColor: C.primary, borderRadius: R.lg,
    paddingVertical: 15, alignItems: 'center', marginBottom: 8,
  },
  completeBtnDisabled: { backgroundColor: C.border },
  completeBtnText: { fontSize: F.md, fontWeight: '700', color: C.white },
  doneCard: {
    backgroundColor: C.successBg, borderRadius: R.xl,
    borderWidth: 1, borderColor: 'rgba(34,197,94,0.2)',
    padding: 24, alignItems: 'center', marginBottom: 8,
  },
  doneIcon: { fontSize: 36, marginBottom: 8 },
  doneTitle: { fontSize: F.lg, fontWeight: '700', color: C.success, marginBottom: 4 },
  doneSub: { fontSize: F.sm, color: C.textSecondary },
});
