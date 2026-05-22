/**
 * 31 — Atleta — Perfil público del Coach
 * Pantalla: Atleta
 * Descripción: Vista del perfil público del coach desde la perspectiva del atleta.
 * Incluye bio, especialidades, estadísticas y enlace directo al chat.
 */

import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, SafeAreaView,
} from 'react-native';
import { C, F, R, S } from './KleosTheme';

interface Props { navigation: any }

const ESPECIALIDADES = ['Running', 'Triatlón', 'Fuerza Funcional'];

export default function AthleteCoachProfileScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Perfil del coach</Text>
        <TouchableOpacity
          style={styles.chatBtn}
          onPress={() => navigation.navigate('AthleteChat')}
          activeOpacity={0.8}
        >
          <Text style={styles.chatBtnText}>💬 Chat</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <View style={styles.heroCard}>
          <View style={styles.heroAvatar}>
            <Text style={styles.heroAvatarText}>R</Text>
          </View>
          <Text style={styles.heroName}>Roberto Acosta</Text>
          <Text style={styles.heroSpec}>Coach de Running · Triatlón</Text>
          <View style={styles.onlineRow}>
            <View style={styles.onlineDot} />
            <Text style={styles.onlineText}>En línea ahora</Text>
          </View>
          <View style={styles.heroStats}>
            <View style={styles.heroStat}>
              <Text style={styles.heroStatValue}>6</Text>
              <Text style={styles.heroStatLabel}>Años exp.</Text>
            </View>
            <View style={styles.heroStatDivider} />
            <View style={styles.heroStat}>
              <Text style={styles.heroStatValue}>18</Text>
              <Text style={styles.heroStatLabel}>Atletas</Text>
            </View>
            <View style={styles.heroStatDivider} />
            <View style={styles.heroStat}>
              <Text style={styles.heroStatValue}>4.9 ⭐</Text>
              <Text style={styles.heroStatLabel}>Valoración</Text>
            </View>
          </View>
        </View>

        {/* Bio */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Sobre Roberto</Text>
          <Text style={styles.bioText}>
            Coach de running y triatlón con 6 años de experiencia. Especializado en atletas amateur que quieren bajar sus tiempos y llegar a su primera competencia. Metodología progresiva, basada en datos y con foco en la prevención de lesiones.
          </Text>
        </View>

        {/* Especialidades */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Especialidades</Text>
          <View style={styles.tagRow}>
            {ESPECIALIDADES.map(e => (
              <View key={e} style={styles.tag}>
                <Text style={styles.tagText}>{e}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Tu plan */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Tu plan con Roberto</Text>
          <View style={styles.planRow}>
            <View style={styles.planIcon}>
              <Text style={styles.planIconText}>📋</Text>
            </View>
            <View style={styles.planInfo}>
              <Text style={styles.planNombre}>Plan 10K Base</Text>
              <Text style={styles.planSub}>Semana 5 de 8 · Activo</Text>
            </View>
            <TouchableOpacity
              style={styles.verBtn}
              onPress={() => navigation.navigate('AthletePlan')}
              activeOpacity={0.8}
            >
              <Text style={styles.verBtnText}>Ver →</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* CTA */}
        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={() => navigation.navigate('AthleteChat')}
          activeOpacity={0.85}
        >
          <Text style={styles.primaryBtnText}>💬 Enviar mensaje</Text>
        </TouchableOpacity>

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
  chatBtn: {
    backgroundColor: C.primaryBg, borderRadius: R.lg,
    paddingHorizontal: 12, paddingVertical: 7,
  },
  chatBtnText: { fontSize: F.sm, fontWeight: '600', color: C.primary },
  scroll: { flex: 1, padding: 16 },
  heroCard: {
    backgroundColor: C.white, borderRadius: R.xl,
    borderWidth: 1, borderColor: C.borderSubtle,
    padding: 20, alignItems: 'center', marginBottom: 14, ...S.card,
  },
  heroAvatar: {
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: C.primary, alignItems: 'center', justifyContent: 'center',
    marginBottom: 12,
  },
  heroAvatarText: { fontSize: F['5xl'], fontWeight: '700', color: C.white },
  heroName: { fontSize: F.xl, fontWeight: '800', color: C.textPrimary, marginBottom: 3 },
  heroSpec: { fontSize: F.sm, color: C.textTertiary, marginBottom: 8 },
  onlineRow: { flexDirection: 'row', alignItems: 'center', gap: 5, marginBottom: 14 },
  onlineDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: C.success },
  onlineText: { fontSize: F.xs, color: C.textTertiary },
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
  cardTitle: { fontSize: F.md, fontWeight: '700', color: C.textPrimary, marginBottom: 10 },
  bioText: { fontSize: F.sm, color: C.textSecondary, lineHeight: 18 },
  tagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tag: {
    backgroundColor: C.primaryBg, borderRadius: R.full,
    paddingHorizontal: 12, paddingVertical: 6,
  },
  tagText: { fontSize: F.sm, fontWeight: '600', color: C.primary },
  planRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  planIcon: {
    width: 40, height: 40, borderRadius: R.lg,
    backgroundColor: C.primaryBg, alignItems: 'center', justifyContent: 'center',
  },
  planIconText: { fontSize: 20 },
  planInfo: { flex: 1 },
  planNombre: { fontSize: F.sm, fontWeight: '700', color: C.textPrimary },
  planSub: { fontSize: F.xs, color: C.textTertiary, marginTop: 2 },
  verBtn: {
    backgroundColor: C.primaryBg, borderRadius: R.md,
    paddingHorizontal: 12, paddingVertical: 6,
  },
  verBtnText: { fontSize: F.sm, fontWeight: '600', color: C.primary },
  primaryBtn: {
    backgroundColor: C.primary, borderRadius: R.lg,
    paddingVertical: 15, alignItems: 'center',
  },
  primaryBtnText: { fontSize: F.md, fontWeight: '700', color: C.white },
});
