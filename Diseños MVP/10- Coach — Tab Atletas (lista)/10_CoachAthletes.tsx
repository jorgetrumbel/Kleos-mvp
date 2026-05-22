/**
 * 10 — Coach — Tab Atletas (lista)
 * Pantalla: Coach
 * Descripción: Lista completa de atletas del coach con estado de pago,
 * buscador y acceso al perfil de cada atleta.
 */

import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, SafeAreaView, TextInput,
} from 'react-native';
import { C, F, R, S } from './KleosTheme';

interface Props { navigation: any }

const ATLETAS = [
  { id: '1', inicial: 'M', nombre: 'Martina López', plan: 'Plan 10K Base', pago: 'Al día', color: '#E8F5E9', tc: '#2E7D32', semana: 5 },
  { id: '2', inicial: 'J', nombre: 'Javier Romero', plan: 'Fuerza Funcional', pago: 'Al día', color: C.primaryBg, tc: C.primary, semana: 3 },
  { id: '3', inicial: 'C', nombre: 'Carlos Méndez', plan: 'Triatlón Sprint', pago: 'Pendiente', color: '#FFF3E0', tc: C.warning, semana: 1 },
  { id: '4', inicial: 'S', nombre: 'Sofía Paredes', plan: 'Plan 10K Base', pago: 'Al día', color: '#F3E8FF', tc: '#7C3AED', semana: 2 },
  { id: '5', inicial: 'L', nombre: 'Lucas Torres', plan: 'Running Base', pago: 'Pendiente', color: '#FFF3E0', tc: C.warning, semana: 6 },
  { id: '6', inicial: 'A', nombre: 'Ana Gutiérrez', plan: 'Fuerza Funcional', pago: 'Al día', color: '#FCE4EC', tc: '#C2185B', semana: 4 },
];

export default function CoachAthletesScreen({ navigation }: Props) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'todos' | 'al_dia' | 'pendiente'>('todos');

  const filtered = ATLETAS.filter(a => {
    const matchSearch = a.nombre.toLowerCase().includes(search.toLowerCase());
    const matchFilter =
      filter === 'todos' ||
      (filter === 'al_dia' && a.pago === 'Al día') ||
      (filter === 'pendiente' && a.pago === 'Pendiente');
    return matchSearch && matchFilter;
  });

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Mis atletas</Text>
          <Text style={styles.subtitle}>{ATLETAS.length} activos</Text>
        </View>
        <TouchableOpacity
          style={styles.inviteBtn}
          onPress={() => navigation.navigate('CoachInvite')}
          activeOpacity={0.85}
        >
          <Text style={styles.inviteBtnText}>+ Invitar</Text>
        </TouchableOpacity>
      </View>

      {/* Buscador */}
      <View style={styles.searchWrap}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar atleta..."
          placeholderTextColor={C.textDisabled}
          value={search}
          onChangeText={setSearch}
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch('')}>
            <Text style={styles.clearIcon}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Filtros */}
      <View style={styles.filtersRow}>
        {([['todos', 'Todos'], ['al_dia', 'Al día'], ['pendiente', 'Con deuda']] as const).map(([key, label]) => (
          <TouchableOpacity
            key={key}
            style={[styles.filterBtn, filter === key && styles.filterBtnActive]}
            onPress={() => setFilter(key)}
            activeOpacity={0.8}
          >
            <Text style={[styles.filterText, filter === key && styles.filterTextActive]}>
              {label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Lista */}
      <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
        {filtered.map(atleta => (
          <TouchableOpacity
            key={atleta.id}
            style={styles.atletaCard}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('CoachAthleteDetail', { atletaId: atleta.id })}
          >
            <View style={[styles.avatar, { backgroundColor: atleta.color }]}>
              <Text style={[styles.avatarText, { color: atleta.tc }]}>{atleta.inicial}</Text>
            </View>
            <View style={styles.atletaInfo}>
              <Text style={styles.atletaNombre}>{atleta.nombre}</Text>
              <Text style={styles.atletaPlan}>{atleta.plan} · Sem {atleta.semana}</Text>
            </View>
            <View style={styles.atletaRight}>
              <View style={[
                styles.pagoBadge,
                atleta.pago === 'Pendiente' && styles.pagoBadgePending,
              ]}>
                <Text style={[
                  styles.pagoText,
                  atleta.pago === 'Pendiente' && styles.pagoTextPending,
                ]}>
                  {atleta.pago}
                </Text>
              </View>
              <Text style={styles.chevron}>›</Text>
            </View>
          </TouchableOpacity>
        ))}
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
            <Text style={[styles.navLabel, t.label === 'Atletas' && styles.navLabelActive]}>{t.label}</Text>
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
  inviteBtn: {
    backgroundColor: C.primary, borderRadius: R.lg,
    paddingHorizontal: 14, paddingVertical: 8,
  },
  inviteBtnText: { fontSize: F.sm, fontWeight: '700', color: C.white },
  searchWrap: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: C.white, borderRadius: R.lg,
    borderWidth: 1, borderColor: C.borderSubtle,
    marginHorizontal: 20, marginBottom: 12,
    paddingHorizontal: 14, paddingVertical: 10, gap: 8,
  },
  searchIcon: { fontSize: 16 },
  searchInput: { flex: 1, fontSize: F.md, color: C.textPrimary },
  clearIcon: { fontSize: 14, color: C.textTertiary, padding: 4 },
  filtersRow: {
    flexDirection: 'row', gap: 8,
    paddingHorizontal: 20, marginBottom: 16,
  },
  filterBtn: {
    paddingHorizontal: 14, paddingVertical: 7,
    borderRadius: R.full, backgroundColor: C.white,
    borderWidth: 1, borderColor: C.border,
  },
  filterBtnActive: { backgroundColor: C.primary, borderColor: C.primary },
  filterText: { fontSize: F.sm, color: C.textSecondary, fontWeight: '500' },
  filterTextActive: { color: C.white, fontWeight: '700' },
  list: { flex: 1, paddingHorizontal: 20 },
  atletaCard: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: C.white, borderRadius: R.lg,
    borderWidth: 1, borderColor: C.borderSubtle,
    padding: 12, marginBottom: 8, gap: 12, ...S.card,
  },
  avatar: { width: 42, height: 42, borderRadius: 21, alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: F.lg, fontWeight: '700' },
  atletaInfo: { flex: 1 },
  atletaNombre: { fontSize: F.md, fontWeight: '600', color: C.textPrimary },
  atletaPlan: { fontSize: F.xs, color: C.textTertiary, marginTop: 2 },
  atletaRight: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  pagoBadge: {
    backgroundColor: C.successBg, borderRadius: R.xs,
    paddingHorizontal: 8, paddingVertical: 3,
  },
  pagoBadgePending: { backgroundColor: C.warningBg },
  pagoText: { fontSize: F.xs, fontWeight: '600', color: C.success },
  pagoTextPending: { color: C.warning },
  chevron: { fontSize: 20, color: C.textDisabled },
  nav: {
    flexDirection: 'row', backgroundColor: C.white,
    borderTopWidth: 1, borderTopColor: C.borderSubtle,
    paddingTop: 8, paddingBottom: 20, paddingHorizontal: 8,
  },
  navTab: { flex: 1, alignItems: 'center', gap: 2 },
  navIcon: { fontSize: 20 },
  navLabel: { fontSize: F.xs, color: C.textDisabled },
  navLabelActive: { color: C.primary, fontWeight: '700' },
});
