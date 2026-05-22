/**
 * 27 — Atleta — Tab Perfil
 * Pantalla: Atleta
 * Descripción: Perfil propio del atleta. Datos personales, objetivo,
 * historial, plan actual y acceso a configuración.
 */

import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, SafeAreaView,
} from 'react-native';
import { C, F, R, S } from './KleosTheme';

interface Props { navigation: any }

export default function AthleteProfileScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Mi perfil</Text>
          <TouchableOpacity
            style={styles.settingsBtn}
            onPress={() => navigation.navigate('AthleteSettings')}
          >
            <Text style={styles.settingsIcon}>⚙️</Text>
          </TouchableOpacity>
        </View>

        {/* Hero */}
        <View style={styles.heroCard}>
          <View style={styles.heroAvatar}>
            <Text style={styles.heroAvatarText}>M</Text>
          </View>
          <Text style={styles.heroName}>Martina López</Text>
          <Text style={styles.heroEmail}>martina.lopez@email.com</Text>
          <View style={styles.heroStats}>
            <View style={styles.heroStat}>
              <Text style={styles.heroStatValue}>6</Text>
              <Text style={styles.heroStatLabel}>Sesiones</Text>
            </View>
            <View style={styles.heroStatDivider} />
            <View style={styles.heroStat}>
              <Text style={styles.heroStatValue}>42 km</Text>
              <Text style={styles.heroStatLabel}>Totales</Text>
            </View>
            <View style={styles.heroStatDivider} />
            <View style={styles.heroStat}>
              <Text style={styles.heroStatValue}>4 días</Text>
              <Text style={styles.heroStatLabel}>Racha</Text>
            </View>
          </View>
        </View>

        {/* Datos */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Mis datos</Text>
          <View style={styles.dataGrid}>
            {[
              { label: 'Edad', value: '28 años' },
              { label: 'Peso', value: '58 kg' },
              { label: 'Altura', value: '165 cm' },
              { label: 'Nivel', value: 'Intermedio' },
            ].map(d => (
              <View key={d.label} style={styles.dataItem}>
                <Text style={styles.dataLabel}>{d.label}</Text>
                <Text style={styles.dataValue}>{d.value}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Objetivo */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Mi objetivo</Text>
          <View style={styles.objetivoBox}>
            <Text style={styles.objetivoText}>🎯 Terminar una carrera 10K en menos de 55 min</Text>
            <Text style={styles.objetivoFecha}>Fecha: 15 de Junio 2026</Text>
          </View>
        </View>

        {/* Coach */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Mi coach</Text>
          <TouchableOpacity
            style={styles.coachRow}
            onPress={() => navigation.navigate('AthleteCoachProfile')}
            activeOpacity={0.8}
          >
            <View style={styles.coachAvatar}>
              <Text style={styles.coachAvatarText}>R</Text>
            </View>
            <View style={styles.coachInfo}>
              <Text style={styles.coachName}>Roberto Acosta</Text>
              <Text style={styles.coachSpec}>Coach de Running · 6 años exp.</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Plan */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Plan actual</Text>
          <View style={styles.planRow}>
            <View style={styles.planIcon}>
              <Text style={styles.planIconText}>📋</Text>
            </View>
            <View style={styles.planInfo}>
              <Text style={styles.planNombre}>Plan 10K Base</Text>
              <Text style={styles.planSub}>Sem 5 de 8 · 62% completado</Text>
            </View>
            <TouchableOpacity
              style={styles.planBtn}
              onPress={() => navigation.navigate('AthletePlan')}
            >
              <Text style={styles.planBtnText}>Ver →</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Opciones */}
        <View style={styles.menuCard}>
          {[
            { label: 'Editar perfil', icon: '✏️', route: 'AthleteEditProfile' },
            { label: 'Notificaciones', icon: '🔔', route: 'AthleteNotifications' },
            { label: 'Privacidad', icon: '🔒', route: 'AthletePrivacy' },
            { label: 'Soporte', icon: '💬', route: 'AthleteSupport' },
          ].map((item, i, arr) => (
            <TouchableOpacity
              key={item.label}
              style={[styles.menuItem, i < arr.length - 1 && styles.menuItemBorder]}
              onPress={() => navigation.navigate(item.route)}
              activeOpacity={0.7}
            >
              <Text style={styles.menuItemIcon}>{item.icon}</Text>
              <Text style={styles.menuItemLabel}>{item.label}</Text>
              <Text style={styles.menuItemChevron}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={() => navigation.navigate('Login')}
          activeOpacity={0.8}
        >
          <Text style={styles.logoutBtnText}>Cerrar sesión</Text>
        </TouchableOpacity>

        <View style={{ height: 24 }} />
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
            <Text style={[styles.navLabel, t.label === 'Perfil' && styles.navLabelActive]}>{t.label}</Text>
            {t.label === 'Perfil' && <View style={styles.navDot} />}
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.bgGray },
  scroll: { flex: 1, padding: 16 },
  header: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 16,
  },
  title: { fontSize: F['2xl'], fontWeight: '700', color: C.textPrimary },
  settingsBtn: { padding: 4 },
  settingsIcon: { fontSize: 22 },
  heroCard: {
    backgroundColor: C.white, borderRadius: R.xl,
    borderWidth: 1, borderColor: C.borderSubtle,
    padding: 20, alignItems: 'center', marginBottom: 14, ...S.card,
  },
  heroAvatar: {
    width: 72, height: 72, borderRadius: 36,
    backgroundColor: '#E8F5E9', alignItems: 'center', justifyContent: 'center', marginBottom: 10,
  },
  heroAvatarText: { fontSize: F['5xl'], fontWeight: '700', color: '#2E7D32' },
  heroName: { fontSize: F.xl, fontWeight: '800', color: C.textPrimary, marginBottom: 4 },
  heroEmail: { fontSize: F.sm, color: C.textTertiary, marginBottom: 14 },
  heroStats: { flexDirection: 'row', alignItems: 'center' },
  heroStat: { flex: 1, alignItems: 'center' },
  heroStatValue: { fontSize: F.lg, fontWeight: '700', color: C.textPrimary },
  heroStatLabel: { fontSize: F.xs, color: C.textTertiary, marginTop: 2 },
  heroStatDivider: { width: 1, height: 30, backgroundColor: C.borderSubtle },
  card: {
    backgroundColor: C.white, borderRadius: R.xl,
    borderWidth: 1, borderColor: C.borderSubtle,
    padding: 14, marginBottom: 14, ...S.card,
  },
  cardTitle: { fontSize: F.md, fontWeight: '700', color: C.textPrimary, marginBottom: 12 },
  dataGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  dataItem: {
    width: '47%', backgroundColor: C.bgGray, borderRadius: R.lg, padding: 12,
  },
  dataLabel: { fontSize: F.xs, color: C.textTertiary, marginBottom: 3 },
  dataValue: { fontSize: F.md, fontWeight: '700', color: C.textPrimary },
  objetivoBox: { backgroundColor: C.primaryBg, borderRadius: R.lg, padding: 12 },
  objetivoText: { fontSize: F.sm, color: C.primary, fontWeight: '600', marginBottom: 4 },
  objetivoFecha: { fontSize: F.xs, color: C.textTertiary },
  coachRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  coachAvatar: {
    width: 42, height: 42, borderRadius: 21,
    backgroundColor: C.primary, alignItems: 'center', justifyContent: 'center',
  },
  coachAvatarText: { fontSize: F.md, fontWeight: '700', color: C.white },
  coachInfo: { flex: 1 },
  coachName: { fontSize: F.md, fontWeight: '700', color: C.textPrimary },
  coachSpec: { fontSize: F.xs, color: C.textTertiary, marginTop: 2 },
  chevron: { fontSize: 20, color: C.textDisabled },
  planRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  planIcon: {
    width: 40, height: 40, borderRadius: R.lg,
    backgroundColor: C.primaryBg, alignItems: 'center', justifyContent: 'center',
  },
  planIconText: { fontSize: 20 },
  planInfo: { flex: 1 },
  planNombre: { fontSize: F.sm, fontWeight: '700', color: C.textPrimary },
  planSub: { fontSize: F.xs, color: C.textTertiary, marginTop: 2 },
  planBtn: {
    backgroundColor: C.primaryBg, borderRadius: R.md,
    paddingHorizontal: 12, paddingVertical: 6,
  },
  planBtnText: { fontSize: F.sm, fontWeight: '600', color: C.primary },
  menuCard: {
    backgroundColor: C.white, borderRadius: R.xl,
    borderWidth: 1, borderColor: C.borderSubtle,
    marginBottom: 14, ...S.card,
  },
  menuItem: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 14, paddingVertical: 14, gap: 12,
  },
  menuItemBorder: { borderBottomWidth: 1, borderBottomColor: C.borderSubtle },
  menuItemIcon: { fontSize: 20 },
  menuItemLabel: { flex: 1, fontSize: F.sm, fontWeight: '600', color: C.textPrimary },
  menuItemChevron: { fontSize: 20, color: C.textDisabled },
  logoutBtn: {
    borderWidth: 1, borderColor: C.error, borderRadius: R.lg,
    paddingVertical: 13, alignItems: 'center', marginBottom: 8,
  },
  logoutBtnText: { fontSize: F.sm, fontWeight: '600', color: C.error },
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
