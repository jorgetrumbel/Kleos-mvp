/**
 * 23 — Atleta — Tab Mi Plan
 * Pantalla: Atleta
 * Descripción: Vista del plan de entrenamiento del atleta. Semanas,
 * sesiones, progreso y detalle de cada entreno.
 */

import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, SafeAreaView,
} from 'react-native';
import { C, F, R, S } from './KleosTheme';

interface Props { navigation: any }

const SESIONES = [
  { id: '1', dia: 'Lun', nombre: 'Rodaje suave 45 min', tipo: 'Running', estado: 'completado', zona: 'Z2' },
  { id: '2', dia: 'Mar', nombre: 'Fuerza tren inferior', tipo: 'Fuerza', estado: 'completado', zona: '' },
  { id: '3', dia: 'Mié', nombre: 'Intervalo 5×1km', tipo: 'Running', estado: 'hoy', zona: 'Z4' },
  { id: '4', dia: 'Jue', nombre: 'Descanso activo', tipo: 'Recuperación', estado: 'pendiente', zona: '' },
  { id: '5', dia: 'Vie', nombre: 'Rodaje 60 min', tipo: 'Running', estado: 'pendiente', zona: 'Z2-3' },
  { id: '6', dia: 'Sáb', nombre: 'Descanso', tipo: '', estado: 'descanso', zona: '' },
  { id: '7', dia: 'Dom', nombre: 'Descanso', tipo: '', estado: 'descanso', zona: '' },
];

export default function AthletePlanScreen({ navigation }: Props) {
  const [semActual, setSemActual] = useState(5);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Mi plan</Text>
        </View>

        {/* Plan info */}
        <View style={styles.planCard}>
          <View style={styles.planHeader}>
            <View>
              <Text style={styles.planNombre}>Plan 10K Base</Text>
              <Text style={styles.planCoach}>Coach: Roberto Acosta</Text>
            </View>
            <Text style={styles.planPct}>62%</Text>
          </View>
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: '62%' }]} />
          </View>
          <View style={styles.planFooter}>
            <Text style={styles.planFecha}>Inicio: 5 Abr</Text>
            <Text style={styles.planFecha}>Fin: 31 May</Text>
          </View>
        </View>

        {/* Selector semana */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.semScroll}>
          <View style={styles.semRow}>
            {[1, 2, 3, 4, 5, 6, 7, 8].map(s => (
              <TouchableOpacity
                key={s}
                style={[styles.semBtn, s === semActual && styles.semBtnActive]}
                onPress={() => setSemActual(s)}
                activeOpacity={0.7}
              >
                <Text style={[styles.semText, s === semActual && styles.semTextActive]}>
                  Sem {s}
                </Text>
                {s < 5 && <Text style={styles.semCheck}>✓</Text>}
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Sesiones */}
        <Text style={styles.sectionTitle}>Semana {semActual}</Text>
        <View style={styles.sesiones}>
          {SESIONES.map(s => {
            if (s.estado === 'descanso') {
              return (
                <View key={s.id} style={styles.descansoRow}>
                  <Text style={styles.descansoDia}>{s.dia}</Text>
                  <Text style={styles.descansoText}>Descanso 🌿</Text>
                </View>
              );
            }
            return (
              <TouchableOpacity
                key={s.id}
                style={[
                  styles.sesionCard,
                  s.estado === 'hoy' && styles.sesionCardHoy,
                ]}
                activeOpacity={0.85}
                onPress={() => navigation.navigate('AthleteWorkoutDetail', { sesionId: s.id })}
              >
                <View style={[
                  styles.sesionIcon,
                  s.estado === 'completado' && styles.sesionIconDone,
                  s.estado === 'hoy' && styles.sesionIconHoy,
                  s.estado === 'pendiente' && styles.sesionIconPending,
                ]}>
                  <Text style={[
                    styles.sesionIconText,
                    s.estado === 'pendiente' && styles.sesionIconTextPending,
                  ]}>
                    {s.estado === 'completado' ? '✓' : s.estado === 'hoy' ? '▶' : s.dia}
                  </Text>
                </View>
                <View style={styles.sesionInfo}>
                  <Text style={[
                    styles.sesionNombre,
                    s.estado === 'pendiente' && styles.sesionNombrePending,
                  ]}>
                    {s.nombre}
                  </Text>
                  <Text style={styles.sesionMeta}>
                    {s.dia}{s.zona ? ` · ${s.zona}` : ''}{s.tipo ? ` · ${s.tipo}` : ''}
                  </Text>
                </View>
                {s.estado === 'hoy' && (
                  <View style={styles.hoyBadge}>
                    <Text style={styles.hoyBadgeText}>Hoy</Text>
                  </View>
                )}
                {s.estado === 'completado' && (
                  <Text style={styles.doneText}>✓ Listo</Text>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>

      {/* Bottom nav */}
      <View style={styles.nav}>
        {[
          { label: 'Inicio', icon: '🏠', route: 'AthleteHome' },
          { label: 'Mi plan', icon: '📋', route: 'AthletePlan' },
          { label: 'Comunidad', icon: '💬', route: 'AthleteCommunity' },
          { label: 'Métricas', icon: '📊', route: 'AthleteMetrics' },
          { label: 'Perfil', icon: '👤', route: 'AthleteProfile' },
        ].map(t => (
          <TouchableOpacity key={t.label} style={styles.navTab} onPress={() => navigation.navigate(t.route)}>
            <Text style={styles.navIcon}>{t.icon}</Text>
            <Text style={[styles.navLabel, t.label === 'Mi plan' && styles.navLabelActive]}>{t.label}</Text>
            {t.label === 'Mi plan' && <View style={styles.navDot} />}
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.bg },
  scroll: { flex: 1 },
  header: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12 },
  title: { fontSize: F['2xl'], fontWeight: '700', color: C.textPrimary },
  planCard: {
    backgroundColor: C.white, marginHorizontal: 20,
    borderRadius: R.xl, borderWidth: 1, borderColor: C.borderSubtle,
    padding: 14, marginBottom: 16, ...S.card,
  },
  planHeader: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'flex-start', marginBottom: 10,
  },
  planNombre: { fontSize: F.lg, fontWeight: '700', color: C.textPrimary },
  planCoach: { fontSize: F.xs, color: C.textTertiary, marginTop: 2 },
  planPct: { fontSize: F['2xl'], fontWeight: '800', color: C.primary },
  progressBarBg: {
    height: 6, backgroundColor: C.bgGray, borderRadius: 3, overflow: 'hidden', marginBottom: 8,
  },
  progressBarFill: { height: '100%', backgroundColor: C.primary, borderRadius: 3 },
  planFooter: { flexDirection: 'row', justifyContent: 'space-between' },
  planFecha: { fontSize: F.xs, color: C.textTertiary },
  semScroll: { marginBottom: 16, paddingLeft: 20 },
  semRow: { flexDirection: 'row', gap: 8, paddingRight: 20 },
  semBtn: {
    paddingHorizontal: 14, paddingVertical: 7,
    borderRadius: R.full, backgroundColor: C.white,
    borderWidth: 1, borderColor: C.border,
    flexDirection: 'row', alignItems: 'center', gap: 5,
  },
  semBtnActive: { backgroundColor: C.primary, borderColor: C.primary },
  semText: { fontSize: F.sm, color: C.textSecondary },
  semTextActive: { color: C.white, fontWeight: '700' },
  semCheck: { fontSize: F.xs, color: C.success },
  sectionTitle: {
    fontSize: F.md, fontWeight: '700', color: C.textPrimary,
    marginBottom: 10, paddingHorizontal: 20,
  },
  sesiones: { gap: 8, paddingHorizontal: 20 },
  sesionCard: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: C.white, borderRadius: R.lg,
    borderWidth: 1, borderColor: C.borderSubtle,
    padding: 12, gap: 12, ...S.card,
  },
  sesionCardHoy: {
    borderColor: C.primary,
    backgroundColor: C.primaryBg,
  },
  sesionIcon: {
    width: 36, height: 36, borderRadius: 10,
    backgroundColor: C.bgGray, alignItems: 'center', justifyContent: 'center',
  },
  sesionIconDone: { backgroundColor: C.success },
  sesionIconHoy: { backgroundColor: C.primary },
  sesionIconPending: { backgroundColor: C.bgGray },
  sesionIconText: { fontSize: F.sm, fontWeight: '700', color: C.white },
  sesionIconTextPending: { color: C.textTertiary, fontSize: F.xs },
  sesionInfo: { flex: 1 },
  sesionNombre: { fontSize: F.sm, fontWeight: '600', color: C.textPrimary },
  sesionNombrePending: { color: C.textSecondary },
  sesionMeta: { fontSize: F.xs, color: C.textTertiary, marginTop: 2 },
  hoyBadge: {
    backgroundColor: C.primary, borderRadius: R.xs,
    paddingHorizontal: 8, paddingVertical: 3,
  },
  hoyBadgeText: { fontSize: F.xs, fontWeight: '700', color: C.white },
  doneText: { fontSize: F.xs, fontWeight: '600', color: C.success },
  descansoRow: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: C.bgGray, borderRadius: R.lg,
    paddingVertical: 10, paddingHorizontal: 14,
  },
  descansoDia: { fontSize: F.sm, fontWeight: '700', color: C.textTertiary },
  descansoText: { fontSize: F.sm, color: C.textTertiary },
  nav: {
    flexDirection: 'row', backgroundColor: C.white,
    borderTopWidth: 1, borderTopColor: C.borderSubtle,
    paddingTop: 8, paddingBottom: 20, paddingHorizontal: 8,
  },
  navTab: { flex: 1, alignItems: 'center', gap: 2 },
  navIcon: { fontSize: 20 },
  navLabel: { fontSize: F.xs, color: C.textDisabled },
  navLabelActive: { color: C.primary, fontWeight: '700' },
  navDot: { width: 4, height: 4, borderRadius: 2, backgroundColor: C.primary },
});
