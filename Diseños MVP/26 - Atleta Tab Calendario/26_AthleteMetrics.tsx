/**
 * 26 — Atleta — Tab Métricas
 * Pantalla: Atleta
 * Descripción: Panel de métricas personales del atleta. Resumen de actividad,
 * zonas de FC, progreso semanal y logros.
 */

import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, SafeAreaView,
} from 'react-native';
import { C, F, R, S } from './KleosTheme';

interface Props { navigation: any }

type Periodo = '7d' | '30d' | '3m';

const STATS = [
  { label: 'Km totales', value: '42.3', unit: 'km', change: '+8%' },
  { label: 'Tiempo total', value: '5:20', unit: 'hs', change: '+12%' },
  { label: 'Sesiones', value: '6', unit: '', change: '+2' },
  { label: 'Racha', value: '4', unit: 'días', change: '🔥' },
];

const FC_ZONES = [
  { label: 'Z1 · Recuperación', pct: 12, color: '#60D8A4', bpm: '< 115' },
  { label: 'Z2 · Aeróbico', pct: 38, color: '#22C55E', bpm: '115-135' },
  { label: 'Z3 · Tempo', pct: 28, color: '#F59E0B', bpm: '135-155' },
  { label: 'Z4 · Umbral', pct: 16, color: '#F97316', bpm: '155-170' },
  { label: 'Z5 · Máximo', pct: 6, color: '#E53935', bpm: '> 170' },
];

const LOGROS = [
  { id: '1', titulo: 'Primera carrera', desc: 'Completaste tu primer entreno', icon: '🏅', desbloqueado: true },
  { id: '2', titulo: 'Racha de fuego', desc: '7 días consecutivos', icon: '🔥', desbloqueado: false },
  { id: '3', titulo: '50 km', desc: 'Acumulaste 50 km en total', icon: '🎯', desbloqueado: false },
  { id: '4', titulo: 'Zona 4 warrior', desc: '5 sesiones en Z4', icon: '⚡', desbloqueado: true },
];

export default function AthleteMetricsScreen({ navigation }: Props) {
  const [periodo, setPeriodo] = useState<Periodo>('7d');

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Métricas</Text>
        </View>

        {/* Período */}
        <View style={styles.periodoRow}>
          {(['7d', '30d', '3m'] as Periodo[]).map(p => (
            <TouchableOpacity
              key={p}
              style={[styles.periodoBtn, periodo === p && styles.periodoBtnActive]}
              onPress={() => setPeriodo(p)}
              activeOpacity={0.8}
            >
              <Text style={[styles.periodoText, periodo === p && styles.periodoTextActive]}>
                {p === '7d' ? '7 días' : p === '30d' ? '30 días' : '3 meses'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Stats grid */}
        <View style={styles.statsGrid}>
          {STATS.map(s => (
            <View key={s.label} style={styles.statCard}>
              <View style={styles.statTop}>
                <Text style={styles.statValue}>{s.value}</Text>
                {s.unit ? <Text style={styles.statUnit}>{s.unit}</Text> : null}
              </View>
              <Text style={styles.statChange}>{s.change}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* Mini bar chart */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Actividad semanal</Text>
          <View style={styles.barChart}>
            {[20, 35, 50, 45, 60, 0, 0].map((val, i) => {
              const dias = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
              const isToday = i === 2;
              return (
                <View key={i} style={styles.barCol}>
                  <View style={styles.barBg}>
                    <View
                      style={[
                        styles.barFill,
                        { height: val ? `${(val / 60) * 100}%` as any : '5%' as any },
                        isToday && styles.barFillToday,
                        !val && styles.barFillEmpty,
                      ]}
                    />
                  </View>
                  <Text style={[styles.barLabel, isToday && styles.barLabelToday]}>{dias[i]}</Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* Zonas FC */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Distribución de zonas</Text>
          <Text style={styles.cardSub}>FC media: 148 bpm · FC máx: 178 bpm</Text>
          {FC_ZONES.map(z => (
            <View key={z.label} style={styles.zoneRow}>
              <View style={styles.zoneInfo}>
                <Text style={styles.zoneLabel}>{z.label}</Text>
                <Text style={styles.zoneBpm}>{z.bpm}</Text>
              </View>
              <View style={styles.zoneBarBg}>
                <View style={[styles.zoneBarFill, { width: `${z.pct}%` as any, backgroundColor: z.color }]} />
              </View>
              <Text style={styles.zonePct}>{z.pct}%</Text>
            </View>
          ))}
        </View>

        {/* Logros */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Logros</Text>
          <View style={styles.logrosGrid}>
            {LOGROS.map(l => (
              <View key={l.id} style={[styles.logroCard, !l.desbloqueado && styles.logroCardLocked]}>
                <Text style={[styles.logroIcon, !l.desbloqueado && styles.logroIconLocked]}>
                  {l.desbloqueado ? l.icon : '🔒'}
                </Text>
                <Text style={[styles.logroTitle, !l.desbloqueado && styles.logroTitleLocked]}>
                  {l.titulo}
                </Text>
                <Text style={styles.logroDesc}>{l.desc}</Text>
              </View>
            ))}
          </View>
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
            <Text style={[styles.navLabel, t.label === 'Métricas' && styles.navLabelActive]}>{t.label}</Text>
            {t.label === 'Métricas' && <View style={styles.navDot} />}
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
  periodoRow: { flexDirection: 'row', gap: 8, paddingHorizontal: 20, marginBottom: 16 },
  periodoBtn: {
    paddingHorizontal: 14, paddingVertical: 7, borderRadius: R.full,
    backgroundColor: C.white, borderWidth: 1, borderColor: C.border,
  },
  periodoBtnActive: { backgroundColor: C.primary, borderColor: C.primary },
  periodoText: { fontSize: F.sm, color: C.textSecondary, fontWeight: '500' },
  periodoTextActive: { color: C.white, fontWeight: '700' },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, paddingHorizontal: 20, marginBottom: 14 },
  statCard: {
    width: '47%', backgroundColor: C.white, borderRadius: R.xl,
    borderWidth: 1, borderColor: C.borderSubtle,
    padding: 14, ...S.card,
  },
  statTop: { flexDirection: 'row', alignItems: 'baseline', gap: 3, marginBottom: 2 },
  statValue: { fontSize: F['3xl'], fontWeight: '800', color: C.textPrimary },
  statUnit: { fontSize: F.sm, color: C.textTertiary },
  statChange: { fontSize: F.xs, color: C.success, fontWeight: '600', marginBottom: 4 },
  statLabel: { fontSize: F.xs, color: C.textTertiary },
  card: {
    backgroundColor: C.white, borderRadius: R.xl,
    borderWidth: 1, borderColor: C.borderSubtle,
    padding: 14, marginBottom: 14, marginHorizontal: 20, ...S.card,
  },
  cardTitle: { fontSize: F.md, fontWeight: '700', color: C.textPrimary, marginBottom: 4 },
  cardSub: { fontSize: F.xs, color: C.textTertiary, marginBottom: 12 },
  barChart: { flexDirection: 'row', alignItems: 'flex-end', gap: 6, height: 80, paddingBottom: 20 },
  barCol: { flex: 1, alignItems: 'center' },
  barBg: { flex: 1, width: '100%', justifyContent: 'flex-end', backgroundColor: C.bgGray, borderRadius: 4, overflow: 'hidden' },
  barFill: { width: '100%', backgroundColor: C.primary, borderRadius: 4 },
  barFillToday: { backgroundColor: C.primaryMid },
  barFillEmpty: { backgroundColor: C.border },
  barLabel: { fontSize: F.xs, color: C.textTertiary, position: 'absolute', bottom: 0 },
  barLabelToday: { color: C.primary, fontWeight: '700' },
  zoneRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  zoneInfo: { width: 110 },
  zoneLabel: { fontSize: F.xs, fontWeight: '600', color: C.textSecondary },
  zoneBpm: { fontSize: F.xs, color: C.textTertiary },
  zoneBarBg: { flex: 1, height: 10, backgroundColor: C.bgGray, borderRadius: 5, overflow: 'hidden' },
  zoneBarFill: { height: '100%', borderRadius: 5 },
  zonePct: { width: 32, fontSize: F.xs, color: C.textTertiary, textAlign: 'right' },
  logrosGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 4 },
  logroCard: {
    width: '47%', backgroundColor: C.primaryBg, borderRadius: R.lg,
    padding: 12, alignItems: 'center',
  },
  logroCardLocked: { backgroundColor: C.bgGray },
  logroIcon: { fontSize: 28, marginBottom: 6 },
  logroIconLocked: { opacity: 0.5 },
  logroTitle: { fontSize: F.sm, fontWeight: '700', color: C.primary, textAlign: 'center', marginBottom: 3 },
  logroTitleLocked: { color: C.textTertiary },
  logroDesc: { fontSize: F.xs, color: C.textTertiary, textAlign: 'center' },
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
