/**
 * 17 — Coach — Tab Calendario
 * Pantalla: Coach
 * Descripción: Vista de calendario semanal del coach. Muestra entrenamientos
 * asignados a atletas por día, con posibilidad de crear y editar sesiones.
 */

import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, SafeAreaView,
} from 'react-native';
import { C, F, R, S } from './KleosTheme';

interface Props { navigation: any }

const DIAS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
const NUMS = ['19', '20', '21', '22', '23', '24', '25'];
const HOY_IDX = 2;

const ENTRENOS: Record<string, { atleta: string; nombre: string; tipo: string; hora: string; color: string }[]> = {
  'Lun': [
    { atleta: 'Martina L.', nombre: 'Rodaje Z2 45min', tipo: 'Running', hora: '7:00', color: '#EBF4F5' },
    { atleta: 'Javier R.', nombre: 'Fuerza tren sup.', tipo: 'Fuerza', hora: '8:30', color: '#F3E8FF' },
  ],
  'Mar': [
    { atleta: 'Carlos M.', nombre: 'Brick bici + run', tipo: 'Triatlón', hora: '6:30', color: '#FFF3E0' },
  ],
  'Mié': [
    { atleta: 'Martina L.', nombre: 'Intervalo 5×1km', tipo: 'Running', hora: '7:00', color: '#EBF4F5' },
    { atleta: 'Sofía P.', nombre: 'Rodaje base 30min', tipo: 'Running', hora: '18:00', color: '#FCE4EC' },
    { atleta: 'Lucas T.', nombre: 'Fuerza core', tipo: 'Fuerza', hora: '19:00', color: '#FFF3E0' },
  ],
  'Jue': [
    { atleta: 'Ana G.', nombre: 'Descanso activo', tipo: 'Recuperación', hora: '', color: '#F1F3F2' },
  ],
  'Vie': [
    { atleta: 'Martina L.', nombre: 'Rodaje 60min', tipo: 'Running', hora: '7:00', color: '#EBF4F5' },
    { atleta: 'Javier R.', nombre: 'Sentadillas + peso', tipo: 'Fuerza', hora: '9:00', color: '#F3E8FF' },
  ],
  'Sáb': [],
  'Dom': [],
};

export default function CoachCalendarScreen({ navigation }: Props) {
  const [selectedDay, setSelectedDay] = useState(HOY_IDX);

  const diaKey = DIAS[selectedDay];
  const sesiones = ENTRENOS[diaKey] || [];

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Calendario</Text>
          <Text style={styles.subtitle}>Mayo 2026</Text>
        </View>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => navigation.navigate('CoachAssignWorkout')}
          activeOpacity={0.85}
        >
          <Text style={styles.addBtnText}>+ Sesión</Text>
        </TouchableOpacity>
      </View>

      {/* Semana */}
      <View style={styles.weekRow}>
        {DIAS.map((dia, i) => {
          const isSelected = selectedDay === i;
          const isHoy = i === HOY_IDX;
          return (
            <TouchableOpacity
              key={dia}
              style={[styles.dayBtn, isSelected && styles.dayBtnSelected]}
              onPress={() => setSelectedDay(i)}
              activeOpacity={0.8}
            >
              <Text style={[styles.dayLabel, isSelected && styles.dayLabelSelected]}>{dia}</Text>
              <View style={[styles.dayNum, isSelected && styles.dayNumSelected]}>
                <Text style={[styles.dayNumText, isSelected && styles.dayNumTextSelected]}>
                  {NUMS[i]}
                </Text>
              </View>
              {isHoy && !isSelected && <View style={styles.todayDot} />}
              {sesiones && ENTRENOS[dia]?.length > 0 && !isSelected && (
                <View style={styles.hasDot} />
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Contenido del día */}
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.dayHeader}>
          <Text style={styles.dayTitle}>
            {DIAS[selectedDay]} {NUMS[selectedDay]} de Mayo
            {selectedDay === HOY_IDX ? ' · Hoy' : ''}
          </Text>
          <Text style={styles.dayCount}>
            {sesiones.length} {sesiones.length === 1 ? 'sesión' : 'sesiones'}
          </Text>
        </View>

        {sesiones.length === 0 ? (
          <View style={styles.emptyDay}>
            <Text style={styles.emptyIcon}>📅</Text>
            <Text style={styles.emptyText}>Sin sesiones programadas</Text>
            <TouchableOpacity
              style={styles.emptyBtn}
              onPress={() => navigation.navigate('CoachAssignWorkout')}
              activeOpacity={0.8}
            >
              <Text style={styles.emptyBtnText}>+ Agregar sesión</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.sesiones}>
            {sesiones.map((s, i) => (
              <TouchableOpacity
                key={i}
                style={[styles.sesionCard, { borderLeftColor: C.primary }]}
                activeOpacity={0.8}
                onPress={() => navigation.navigate('CoachWorkoutDetails')}
              >
                <View style={[styles.sesionLeft, { backgroundColor: s.color }]}>
                  {s.hora ? <Text style={styles.sesionHora}>{s.hora}</Text> : null}
                  <Text style={styles.sesionTipo}>{s.tipo}</Text>
                </View>
                <View style={styles.sesionInfo}>
                  <Text style={styles.sesionNombre}>{s.nombre}</Text>
                  <Text style={styles.sesionAtleta}>👤 {s.atleta}</Text>
                </View>
                <Text style={styles.chevron}>›</Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              style={styles.addSesionBtn}
              onPress={() => navigation.navigate('CoachAssignWorkout')}
              activeOpacity={0.8}
            >
              <Text style={styles.addSesionText}>+ Agregar sesión</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={{ height: 20 }} />
      </ScrollView>

      {/* Bottom nav */}
      <View style={styles.nav}>
        {[
          { label: 'Inicio', icon: '🏠', route: 'CoachHome' },
          { label: 'Atletas', icon: '👥', route: 'CoachAthletes' },
          { label: 'Comunidad', icon: '💬', route: 'CoachCommunity' },
          { label: 'Calendario', icon: '📅', route: 'CoachCalendar' },
          { label: 'Planific.', icon: '📋', route: 'CoachPlanning' },
        ].map(t => (
          <TouchableOpacity key={t.label} style={styles.navTab} onPress={() => navigation.navigate(t.route)}>
            <Text style={styles.navIcon}>{t.icon}</Text>
            <Text style={[styles.navLabel, t.label === 'Calendario' && styles.navLabelActive]}>{t.label}</Text>
            {t.label === 'Calendario' && <View style={styles.navDot} />}
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.bg },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12,
  },
  title: { fontSize: F['2xl'], fontWeight: '700', color: C.textPrimary },
  subtitle: { fontSize: F.sm, color: C.textTertiary, marginTop: 2 },
  addBtn: {
    backgroundColor: C.primary, borderRadius: R.lg,
    paddingHorizontal: 14, paddingVertical: 8,
  },
  addBtnText: { fontSize: F.sm, fontWeight: '700', color: C.white },
  weekRow: {
    flexDirection: 'row', backgroundColor: C.white,
    borderBottomWidth: 1, borderBottomColor: C.borderSubtle,
    paddingHorizontal: 8, paddingVertical: 10,
  },
  dayBtn: { flex: 1, alignItems: 'center', gap: 4, paddingVertical: 4, borderRadius: R.md },
  dayBtnSelected: { backgroundColor: C.primaryBg },
  dayLabel: { fontSize: F.xs, color: C.textTertiary, fontWeight: '500' },
  dayLabelSelected: { color: C.primary, fontWeight: '700' },
  dayNum: {
    width: 30, height: 30, borderRadius: 15,
    alignItems: 'center', justifyContent: 'center',
  },
  dayNumSelected: { backgroundColor: C.primary },
  dayNumText: { fontSize: F.md, fontWeight: '600', color: C.textPrimary },
  dayNumTextSelected: { color: C.white, fontWeight: '800' },
  todayDot: {
    width: 4, height: 4, borderRadius: 2,
    backgroundColor: C.primary,
  },
  hasDot: {
    width: 4, height: 4, borderRadius: 2,
    backgroundColor: C.border,
  },
  scroll: { flex: 1, padding: 16 },
  dayHeader: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 14,
  },
  dayTitle: { fontSize: F.md, fontWeight: '700', color: C.textPrimary },
  dayCount: { fontSize: F.sm, color: C.textTertiary },
  emptyDay: {
    backgroundColor: C.white, borderRadius: R.xl,
    borderWidth: 1, borderColor: C.borderSubtle,
    padding: 32, alignItems: 'center', ...S.card,
  },
  emptyIcon: { fontSize: 32, marginBottom: 10 },
  emptyText: { fontSize: F.md, color: C.textTertiary, marginBottom: 16 },
  emptyBtn: {
    backgroundColor: C.primaryBg, borderRadius: R.lg,
    paddingHorizontal: 16, paddingVertical: 10,
  },
  emptyBtnText: { fontSize: F.sm, fontWeight: '700', color: C.primary },
  sesiones: { gap: 8 },
  sesionCard: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: C.white, borderRadius: R.lg,
    borderWidth: 1, borderColor: C.borderSubtle,
    borderLeftWidth: 3, overflow: 'hidden',
    ...S.card,
  },
  sesionLeft: {
    paddingHorizontal: 10, paddingVertical: 14,
    alignItems: 'center', minWidth: 60,
  },
  sesionHora: { fontSize: F.sm, fontWeight: '700', color: C.textPrimary },
  sesionTipo: { fontSize: F.xs, color: C.textTertiary, marginTop: 2 },
  sesionInfo: { flex: 1, paddingHorizontal: 12, paddingVertical: 12 },
  sesionNombre: { fontSize: F.sm, fontWeight: '600', color: C.textPrimary },
  sesionAtleta: { fontSize: F.xs, color: C.textTertiary, marginTop: 3 },
  chevron: { fontSize: 20, color: C.textDisabled, paddingRight: 10 },
  addSesionBtn: {
    borderWidth: 1, borderColor: C.primary, borderStyle: 'dashed',
    borderRadius: R.lg, paddingVertical: 13, alignItems: 'center',
  },
  addSesionText: { fontSize: F.sm, color: C.primary, fontWeight: '600' },
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
