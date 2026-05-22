/**
 * 22 — Atleta — Tab Inicio
 * Pantalla: Atleta
 * Descripción: Dashboard principal del atleta. Entrenamiento del día,
 * progreso del plan, resumen semanal y acceso rápido a secciones.
 */

import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, SafeAreaView,
} from 'react-native';
import { C, F, R, S } from './KleosTheme';

interface Props { navigation: any }

export default function AthleteHomeScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Buen día 👋</Text>
            <Text style={styles.name}>Martina</Text>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity>
              <Text style={styles.headerIcon}>🔔</Text>
            </TouchableOpacity>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>M</Text>
            </View>
          </View>
        </View>

        {/* Coach badge */}
        <TouchableOpacity
          style={styles.coachBadge}
          onPress={() => navigation.navigate('AthleteCoachProfile')}
          activeOpacity={0.8}
        >
          <View style={styles.coachAvatar}>
            <Text style={styles.coachAvatarText}>R</Text>
          </View>
          <View style={styles.coachInfo}>
            <Text style={styles.coachLabel}>Tu coach</Text>
            <Text style={styles.coachName}>Roberto Acosta</Text>
          </View>
          <View style={styles.onlineRow}>
            <View style={styles.onlineDot} />
            <Text style={styles.onlineText}>En línea</Text>
          </View>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>

        {/* Entreno del día */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tu entreno de hoy</Text>
          <TouchableOpacity
            style={styles.workoutCard}
            activeOpacity={0.85}
            onPress={() => navigation.navigate('AthleteWorkoutDetail')}
          >
            <View style={styles.workoutCardTop}>
              <View style={styles.workoutIcon}>
                <Text style={styles.workoutIconText}>🏃</Text>
              </View>
              <View style={styles.workoutInfo}>
                <Text style={styles.workoutNombre}>Intervalo 5×1km</Text>
                <Text style={styles.workoutMeta}>Running · Zona 4 · 55 min</Text>
              </View>
              <View style={styles.zonaBadge}>
                <Text style={styles.zonaBadgeText}>Z4</Text>
              </View>
            </View>
            <View style={styles.workoutCardBottom}>
              <View style={styles.workoutStat}>
                <Text style={styles.workoutStatVal}>5</Text>
                <Text style={styles.workoutStatLabel}>Repeticiones</Text>
              </View>
              <View style={styles.workoutStatDivider} />
              <View style={styles.workoutStat}>
                <Text style={styles.workoutStatVal}>1 km</Text>
                <Text style={styles.workoutStatLabel}>Por rep.</Text>
              </View>
              <View style={styles.workoutStatDivider} />
              <View style={styles.workoutStat}>
                <Text style={styles.workoutStatVal}>2 min</Text>
                <Text style={styles.workoutStatLabel}>Recuper.</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.startBtn}
              activeOpacity={0.85}
              onPress={() => navigation.navigate('AthleteWorkoutDetail')}
            >
              <Text style={styles.startBtnText}>▶ Comenzar entrenamiento</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </View>

        {/* Progreso del plan */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Plan actual</Text>
          <View style={styles.progressCard}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressName}>Plan 10K Base</Text>
              <Text style={styles.progressPct}>62%</Text>
            </View>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: '62%' }]} />
            </View>
            <Text style={styles.progressSub}>Semana 5 de 8 · Fin: 31 Mayo</Text>
          </View>
        </View>

        {/* Semana en resumen */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Esta semana</Text>
          <View style={styles.weekGrid}>
            {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map((d, i) => {
              const done = i < 2;
              const today = i === 2;
              const rest = i === 3;
              return (
                <View
                  key={d}
                  style={[
                    styles.weekDay,
                    done && styles.weekDayDone,
                    today && styles.weekDayToday,
                    rest && styles.weekDayRest,
                  ]}
                >
                  <Text style={[
                    styles.weekDayText,
                    (done || today) && styles.weekDayTextActive,
                  ]}>
                    {d}
                  </Text>
                  {done && <Text style={styles.weekCheck}>✓</Text>}
                  {today && <Text style={styles.weekCheck}>▶</Text>}
                </View>
              );
            })}
          </View>
        </View>

        {/* Stats rápidas */}
        <View style={styles.statsRow}>
          {[
            { label: 'Km esta semana', value: '18.4 km' },
            { label: 'Sesiones completadas', value: '2 / 5' },
            { label: 'Racha actual', value: '4 días' },
          ].map(s => (
            <View key={s.label} style={styles.statCard}>
              <Text style={styles.statValue}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
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
            <Text style={[styles.navLabel, t.label === 'Inicio' && styles.navLabelActive]}>{t.label}</Text>
            {t.label === 'Inicio' && <View style={styles.navDot} />}
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.bg },
  scroll: { flex: 1 },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12,
  },
  greeting: { fontSize: F.sm, color: C.textTertiary },
  name: { fontSize: F['2xl'], fontWeight: '700', color: C.textPrimary },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  headerIcon: { fontSize: 22 },
  avatar: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: '#E8F5E9', alignItems: 'center', justifyContent: 'center',
  },
  avatarText: { fontSize: F.md, fontWeight: '700', color: '#2E7D32' },
  coachBadge: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: C.white, marginHorizontal: 20,
    borderRadius: R.xl, borderWidth: 1, borderColor: C.borderSubtle,
    padding: 12, gap: 10, marginBottom: 20, ...S.card,
  },
  coachAvatar: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: C.primary, alignItems: 'center', justifyContent: 'center',
  },
  coachAvatarText: { fontSize: F.md, fontWeight: '700', color: C.white },
  coachInfo: { flex: 1 },
  coachLabel: { fontSize: F.xs, color: C.textTertiary },
  coachName: { fontSize: F.sm, fontWeight: '700', color: C.textPrimary, marginTop: 1 },
  onlineRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  onlineDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: C.success },
  onlineText: { fontSize: F.xs, color: C.textTertiary },
  chevron: { fontSize: 20, color: C.textDisabled },
  section: { paddingHorizontal: 20, marginBottom: 24 },
  sectionTitle: { fontSize: F.lg, fontWeight: '700', color: C.textPrimary, marginBottom: 12 },
  workoutCard: {
    backgroundColor: C.white, borderRadius: R.xl,
    borderWidth: 1, borderColor: C.borderSubtle,
    padding: 14, ...S.card,
  },
  workoutCardTop: {
    flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 14,
  },
  workoutIcon: {
    width: 44, height: 44, borderRadius: R.lg,
    backgroundColor: C.primaryBg, alignItems: 'center', justifyContent: 'center',
  },
  workoutIconText: { fontSize: 24 },
  workoutInfo: { flex: 1 },
  workoutNombre: { fontSize: F.md, fontWeight: '700', color: C.textPrimary },
  workoutMeta: { fontSize: F.xs, color: C.textTertiary, marginTop: 2 },
  zonaBadge: {
    backgroundColor: C.primary, borderRadius: R.sm,
    paddingHorizontal: 9, paddingVertical: 4,
  },
  zonaBadgeText: { fontSize: F.sm, fontWeight: '700', color: C.white },
  workoutCardBottom: {
    flexDirection: 'row', borderTopWidth: 1, borderTopColor: C.borderSubtle,
    paddingTop: 12, marginBottom: 14,
  },
  workoutStat: { flex: 1, alignItems: 'center' },
  workoutStatVal: { fontSize: F.md, fontWeight: '700', color: C.textPrimary },
  workoutStatLabel: { fontSize: F.xs, color: C.textTertiary, marginTop: 2 },
  workoutStatDivider: { width: 1, backgroundColor: C.borderSubtle },
  startBtn: {
    backgroundColor: C.primary, borderRadius: R.lg,
    paddingVertical: 13, alignItems: 'center',
  },
  startBtnText: { fontSize: F.md, fontWeight: '700', color: C.white },
  progressCard: {
    backgroundColor: C.white, borderRadius: R.xl,
    borderWidth: 1, borderColor: C.borderSubtle,
    padding: 14, ...S.card,
  },
  progressHeader: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 8,
  },
  progressName: { fontSize: F.md, fontWeight: '700', color: C.textPrimary },
  progressPct: { fontSize: F.md, fontWeight: '700', color: C.primary },
  progressBarBg: {
    height: 6, backgroundColor: C.bgGray, borderRadius: 3, overflow: 'hidden', marginBottom: 6,
  },
  progressBarFill: { height: '100%', backgroundColor: C.primary, borderRadius: 3 },
  progressSub: { fontSize: F.xs, color: C.textTertiary },
  weekGrid: { flexDirection: 'row', gap: 6 },
  weekDay: {
    flex: 1, aspectRatio: 1, borderRadius: R.md,
    alignItems: 'center', justifyContent: 'center',
    backgroundColor: C.white, borderWidth: 1, borderColor: C.borderSubtle,
  },
  weekDayDone: { backgroundColor: C.success, borderColor: C.success },
  weekDayToday: { backgroundColor: C.primary, borderColor: C.primary },
  weekDayRest: { backgroundColor: C.bgGray, borderColor: C.bgGray },
  weekDayText: { fontSize: F.xs, fontWeight: '600', color: C.textTertiary },
  weekDayTextActive: { color: C.white },
  weekCheck: { fontSize: F.xs, color: C.white, marginTop: 1 },
  statsRow: {
    flexDirection: 'row', gap: 10,
    paddingHorizontal: 20, marginBottom: 4,
  },
  statCard: {
    flex: 1, backgroundColor: C.white, borderRadius: R.lg,
    borderWidth: 1, borderColor: C.borderSubtle,
    padding: 12, alignItems: 'center', ...S.card,
  },
  statValue: { fontSize: F.md, fontWeight: '800', color: C.textPrimary },
  statLabel: { fontSize: F.xs, color: C.textTertiary, textAlign: 'center', marginTop: 3 },
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
