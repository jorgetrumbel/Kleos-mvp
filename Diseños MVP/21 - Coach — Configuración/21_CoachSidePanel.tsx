/**
 * 21 — Coach — Panel lateral / Configuración
 * Pantalla: Coach
 * Descripción: Panel de configuración y perfil del coach. Datos de perfil,
 * plan actual, acciones rápidas y opciones de cuenta.
 */

import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, SafeAreaView,
} from 'react-native';
import { C, F, R, S } from './KleosTheme';

interface Props { navigation: any }

const MENU_SECTIONS = [
  {
    title: 'Mi perfil',
    items: [
      { label: 'Editar perfil', icon: '👤', route: 'CoachEditProfile' },
      { label: 'Mi página pública', icon: '🌐', route: 'CoachPublicPage' },
      { label: 'Mis planes de cobro', icon: '💳', route: 'CoachPricingPlans' },
    ],
  },
  {
    title: 'Gestión',
    items: [
      { label: 'Pagos y comisiones', icon: '💰', route: 'CoachPayments' },
      { label: 'Código de invitación', icon: '🔗', route: 'CoachInvite' },
      { label: 'Biblioteca de entrenos', icon: '📚', route: 'CoachLibrary' },
    ],
  },
  {
    title: 'App',
    items: [
      { label: 'Notificaciones', icon: '🔔', route: 'CoachNotifications' },
      { label: 'Privacidad', icon: '🔒', route: 'CoachPrivacy' },
      { label: 'Soporte', icon: '💬', route: 'CoachSupport' },
    ],
  },
];

export default function CoachSidePanelScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Mi cuenta</Text>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Perfil */}
        <View style={styles.profileCard}>
          <View style={styles.profileAvatar}>
            <Text style={styles.profileAvatarText}>R</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Roberto Acosta</Text>
            <Text style={styles.profileSpec}>Coach de Running · 6 años de exp.</Text>
            <Text style={styles.profileEmail}>roberto@kleos.app</Text>
          </View>
          <TouchableOpacity
            style={styles.editBtn}
            onPress={() => navigation.navigate('CoachEditProfile')}
            activeOpacity={0.8}
          >
            <Text style={styles.editBtnText}>Editar</Text>
          </TouchableOpacity>
        </View>

        {/* Plan actual */}
        <View style={styles.planCard}>
          <View style={styles.planLeft}>
            <Text style={styles.planLabel}>Plan actual</Text>
            <Text style={styles.planName}>Pro</Text>
          </View>
          <View style={styles.planStats}>
            <View style={styles.planStat}>
              <Text style={styles.planStatValue}>18</Text>
              <Text style={styles.planStatLabel}>Atletas</Text>
            </View>
            <View style={styles.planStatDivider} />
            <View style={styles.planStat}>
              <Text style={styles.planStatValue}>50</Text>
              <Text style={styles.planStatLabel}>Límite</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.upgradeBtn} activeOpacity={0.8}>
            <Text style={styles.upgradeBtnText}>Upgrade →</Text>
          </TouchableOpacity>
        </View>

        {/* Menú */}
        {MENU_SECTIONS.map(section => (
          <View key={section.title} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.menuCard}>
              {section.items.map((item, i, arr) => (
                <TouchableOpacity
                  key={item.label}
                  style={[styles.menuItem, i < arr.length - 1 && styles.menuItemBorder]}
                  onPress={() => navigation.navigate(item.route)}
                  activeOpacity={0.7}
                >
                  <View style={styles.menuIcon}>
                    <Text style={styles.menuIconText}>{item.icon}</Text>
                  </View>
                  <Text style={styles.menuLabel}>{item.label}</Text>
                  <Text style={styles.menuChevron}>›</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* Cerrar sesión */}
        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={() => navigation.navigate('Login')}
          activeOpacity={0.8}
        >
          <Text style={styles.logoutBtnText}>Cerrar sesión</Text>
        </TouchableOpacity>

        <Text style={styles.version}>KLEOS v1.0.0 · MVP</Text>

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
  title: { flex: 1, fontSize: F.lg, fontWeight: '700', color: C.textPrimary },
  scroll: { flex: 1, padding: 16 },
  profileCard: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: C.white, borderRadius: R.xl,
    borderWidth: 1, borderColor: C.borderSubtle,
    padding: 14, marginBottom: 14, gap: 12, ...S.card,
  },
  profileAvatar: {
    width: 56, height: 56, borderRadius: 28,
    backgroundColor: C.primary, alignItems: 'center', justifyContent: 'center',
  },
  profileAvatarText: { fontSize: F['2xl'], fontWeight: '700', color: C.white },
  profileInfo: { flex: 1 },
  profileName: { fontSize: F.lg, fontWeight: '700', color: C.textPrimary },
  profileSpec: { fontSize: F.sm, color: C.textSecondary, marginTop: 2 },
  profileEmail: { fontSize: F.xs, color: C.textTertiary, marginTop: 2 },
  editBtn: {
    backgroundColor: C.primaryBg, borderRadius: R.md,
    paddingHorizontal: 12, paddingVertical: 7,
  },
  editBtnText: { fontSize: F.sm, fontWeight: '600', color: C.primary },
  planCard: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: C.primary, borderRadius: R.xl,
    padding: 14, marginBottom: 20, gap: 12,
  },
  planLeft: { flex: 1 },
  planLabel: { fontSize: F.xs, color: 'rgba(255,255,255,0.7)' },
  planName: { fontSize: F['2xl'], fontWeight: '800', color: C.white, marginTop: 2 },
  planStats: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  planStat: { alignItems: 'center' },
  planStatValue: { fontSize: F.xl, fontWeight: '800', color: C.white },
  planStatLabel: { fontSize: F.xs, color: 'rgba(255,255,255,0.7)', marginTop: 1 },
  planStatDivider: { width: 1, height: 30, backgroundColor: 'rgba(255,255,255,0.3)' },
  upgradeBtn: {
    backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: R.md,
    paddingHorizontal: 10, paddingVertical: 7,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)',
  },
  upgradeBtnText: { fontSize: F.sm, fontWeight: '700', color: C.white },
  section: { marginBottom: 14 },
  sectionTitle: {
    fontSize: F.sm, fontWeight: '700', color: C.textTertiary,
    marginBottom: 8, paddingHorizontal: 4,
  },
  menuCard: {
    backgroundColor: C.white, borderRadius: R.xl,
    borderWidth: 1, borderColor: C.borderSubtle, ...S.card,
  },
  menuItem: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 14, paddingVertical: 14, gap: 12,
  },
  menuItemBorder: { borderBottomWidth: 1, borderBottomColor: C.borderSubtle },
  menuIcon: {
    width: 34, height: 34, borderRadius: R.md,
    backgroundColor: C.bgGray, alignItems: 'center', justifyContent: 'center',
  },
  menuIconText: { fontSize: 18 },
  menuLabel: { flex: 1, fontSize: F.sm, fontWeight: '600', color: C.textPrimary },
  menuChevron: { fontSize: 20, color: C.textDisabled },
  logoutBtn: {
    borderWidth: 1, borderColor: C.error, borderRadius: R.lg,
    paddingVertical: 13, alignItems: 'center', marginBottom: 12,
  },
  logoutBtnText: { fontSize: F.sm, fontWeight: '600', color: C.error },
  version: { fontSize: F.xs, color: C.textDisabled, textAlign: 'center' },
});
