/**
 * 9 — Coach — Tab Inicio
 * Pantalla: Coach
 * Descripción: Dashboard principal del coach. Resumen del día, atletas recientes,
 * pagos pendientes, acciones rápidas.
 */

import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, SafeAreaView,
} from 'react-native';
import { C, F, R, S } from './KleosTheme';

interface Props { navigation: any }

const ATLETAS_RECIENTES = [
  { id: '1', inicial: 'M', nombre: 'Martina L.', estado: 'Al día', color: '#E8F5E9', textColor: '#2E7D32' },
  { id: '2', inicial: 'J', nombre: 'Javier R.', estado: 'Al día', color: C.primaryBg, textColor: C.primary },
  { id: '3', inicial: 'C', nombre: 'Carlos M.', estado: 'Pago pend.', color: '#FFF3E0', textColor: C.warning },
];

const ENTRENOS_HOY = [
  { id: '1', atleta: 'Martina López', entreno: 'Intervalo 5×1km', hora: '7:00 AM', tipo: 'Running' },
  { id: '2', atleta: 'Javier Romero', entreno: 'Fuerza tren sup.', hora: '8:30 AM', tipo: 'Fuerza' },
];

// Componente reutilizable para el bottom nav del coach
function CoachBottomNav({ active, navigation }: { active: string; navigation: any }) {
  const tabs = [
    { name: 'Inicio', icon: '🏠', route: 'CoachHome' },
    { name: 'Atletas', icon: '👥', route: 'CoachAthletes' },
    { name: 'Comunidad', icon: '💬', route: 'CoachCommunity' },
    { name: 'Calendario', icon: '📅', route: 'CoachCalendar' },
    { name: 'Planific.', icon: '📋', route: 'CoachPlanning' },
  ];
  return (
    <View style={navStyles.nav}>
      {tabs.map(t => (
        <TouchableOpacity
          key={t.name}
          style={navStyles.tab}
          onPress={() => navigation.navigate(t.route)}
          activeOpacity={0.7}
        >
          <Text style={navStyles.icon}>{t.icon}</Text>
          <Text style={[navStyles.label, active === t.name && navStyles.labelActive]}>
            {t.name}
          </Text>
          {active === t.name && <View style={navStyles.dot} />}
        </TouchableOpacity>
      ))}
    </View>
  );
}

const navStyles = StyleSheet.create({
  nav: {
    flexDirection: 'row',
    backgroundColor: C.white,
    borderTopWidth: 1,
    borderTopColor: C.borderSubtle,
    paddingTop: 8,
    paddingBottom: 20,
    paddingHorizontal: 8,
  },
  tab: { flex: 1, alignItems: 'center', gap: 2 },
  icon: { fontSize: 20 },
  label: { fontSize: F.xs, color: C.textDisabled },
  labelActive: { color: C.primary, fontWeight: '700' },
  dot: { width: 4, height: 4, borderRadius: 2, backgroundColor: C.primary, marginTop: 2 },
});

export default function CoachHomeScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Buen día 👋</Text>
            <Text style={styles.name}>Roberto</Text>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity onPress={() => navigation.navigate('CoachSettings')}>
              <Text style={styles.headerIcon}>🔔</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.avatar}
              onPress={() => navigation.navigate('CoachSettings')}
            >
              <Text style={styles.avatarText}>R</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Resumen stats */}
        <View style={styles.statsRow}>
          {[
            { label: 'Atletas activos', value: '18' },
            { label: 'Pagos pendientes', value: '3', alert: true },
            { label: 'Entrenos hoy', value: '5' },
          ].map(s => (
            <View key={s.label} style={[styles.statCard, s.alert && styles.statCardAlert]}>
              <Text style={[styles.statValue, s.alert && styles.statValueAlert]}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* Entrenamientos hoy */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Hoy</Text>
            <TouchableOpacity onPress={() => navigation.navigate('CoachCalendar')}>
              <Text style={styles.seeAll}>Ver todo →</Text>
            </TouchableOpacity>
          </View>
          {ENTRENOS_HOY.map(e => (
            <TouchableOpacity
              key={e.id}
              style={styles.workoutCard}
              activeOpacity={0.8}
              onPress={() => navigation.navigate('CoachAthlete', { id: e.id })}
            >
              <View style={styles.workoutAccent} />
              <View style={styles.workoutInfo}>
                <Text style={styles.workoutName}>{e.entreno}</Text>
                <Text style={styles.workoutSub}>{e.atleta} · {e.hora}</Text>
              </View>
              <View style={styles.tipoBadge}>
                <Text style={styles.tipoBadgeText}>{e.tipo}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Atletas recientes */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Tus atletas</Text>
            <TouchableOpacity onPress={() => navigation.navigate('CoachAthletes')}>
              <Text style={styles.seeAll}>Ver todos →</Text>
            </TouchableOpacity>
          </View>
          {ATLETAS_RECIENTES.map(a => (
            <TouchableOpacity
              key={a.id}
              style={styles.atletaRow}
              activeOpacity={0.8}
              onPress={() => navigation.navigate('CoachAthlete', { id: a.id })}
            >
              <View style={[styles.atletaAvatar, { backgroundColor: a.color }]}>
                <Text style={[styles.atletaAvatarText, { color: a.textColor }]}>{a.inicial}</Text>
              </View>
              <Text style={styles.atletaNombre}>{a.nombre}</Text>
              <View style={styles.spacer} />
              <View style={[styles.estadoBadge, a.estado === 'Pago pend.' && styles.estadoBadgeAlert]}>
                <Text style={[styles.estadoText, a.estado === 'Pago pend.' && styles.estadoTextAlert]}>
                  {a.estado}
                </Text>
              </View>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Acciones rápidas */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Acciones rápidas</Text>
          <View style={styles.quickActions}>
            {[
              { label: 'Nuevo plan', icon: '📋', route: 'CoachNewPlan' },
              { label: 'Asignar entreno', icon: '⚡', route: 'CoachAssignWorkout' },
              { label: 'Invitar atleta', icon: '➕', route: 'CoachInvite' },
              { label: 'Ver pagos', icon: '💰', route: 'CoachPayments' },
            ].map(q => (
              <TouchableOpacity
                key={q.label}
                style={styles.quickBtn}
                activeOpacity={0.8}
                onPress={() => navigation.navigate(q.route)}
              >
                <Text style={styles.quickIcon}>{q.icon}</Text>
                <Text style={styles.quickLabel}>{q.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>

      <CoachBottomNav active="Inicio" navigation={navigation} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.bg },
  scroll: { flex: 1 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
  },
  greeting: { fontSize: F.sm, color: C.textTertiary },
  name: { fontSize: F['2xl'], fontWeight: '700', color: C.textPrimary },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  headerIcon: { fontSize: 22 },
  avatar: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: C.primary, alignItems: 'center', justifyContent: 'center',
  },
  avatarText: { fontSize: F.md, fontWeight: '700', color: C.white },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: C.white,
    borderRadius: R.lg,
    borderWidth: 1,
    borderColor: C.borderSubtle,
    padding: 12,
    alignItems: 'center',
    ...S.card,
  },
  statCardAlert: { backgroundColor: '#FFF3E0', borderColor: 'rgba(230,81,0,0.2)' },
  statValue: { fontSize: F['3xl'], fontWeight: '800', color: C.textPrimary },
  statValueAlert: { color: C.warning },
  statLabel: { fontSize: F.xs, color: C.textTertiary, textAlign: 'center', marginTop: 2 },
  section: { paddingHorizontal: 20, marginBottom: 24 },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: { fontSize: F.lg, fontWeight: '700', color: C.textPrimary },
  seeAll: { fontSize: F.sm, color: C.primary, fontWeight: '600' },
  workoutCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: C.white,
    borderRadius: R.lg,
    borderWidth: 1,
    borderColor: C.borderSubtle,
    padding: 13,
    gap: 10,
    marginBottom: 8,
    ...S.card,
  },
  workoutAccent: { width: 3, height: 40, backgroundColor: C.primary, borderRadius: 2 },
  workoutInfo: { flex: 1 },
  workoutName: { fontSize: F.sm, fontWeight: '600', color: C.textPrimary },
  workoutSub: { fontSize: F.xs, color: C.textTertiary, marginTop: 2 },
  tipoBadge: {
    backgroundColor: C.primaryBg,
    borderRadius: R.sm,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  tipoBadgeText: { fontSize: F.xs, fontWeight: '600', color: C.primary },
  atletaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: C.white,
    borderRadius: R.lg,
    borderWidth: 1,
    borderColor: C.borderSubtle,
    padding: 12,
    marginBottom: 8,
    gap: 10,
    ...S.card,
  },
  atletaAvatar: {
    width: 36, height: 36, borderRadius: 18,
    alignItems: 'center', justifyContent: 'center',
  },
  atletaAvatarText: { fontSize: F.md, fontWeight: '700' },
  atletaNombre: { fontSize: F.sm, fontWeight: '600', color: C.textPrimary },
  spacer: { flex: 1 },
  estadoBadge: {
    backgroundColor: C.successBg,
    borderRadius: R.sm,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  estadoBadgeAlert: { backgroundColor: C.warningBg },
  estadoText: { fontSize: F.xs, fontWeight: '600', color: C.success },
  estadoTextAlert: { color: C.warning },
  chevron: { fontSize: 20, color: C.textDisabled },
  quickActions: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  quickBtn: {
    width: '47%',
    backgroundColor: C.white,
    borderRadius: R.lg,
    borderWidth: 1,
    borderColor: C.borderSubtle,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    ...S.card,
  },
  quickIcon: { fontSize: 20 },
  quickLabel: { fontSize: F.sm, fontWeight: '600', color: C.textPrimary },
});
