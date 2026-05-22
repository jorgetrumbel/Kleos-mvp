/**
 * 15 — Coach — Atleta: Perfil
 * Sub-vista: Coach
 * Descripción: Perfil completo del atleta visto por el coach. Datos personales,
 * historial deportivo, objetivo, notas del coach y acciones de gestión.
 */

import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, SafeAreaView, TextInput,
} from 'react-native';
import { C, F, R, S } from './KleosTheme';

interface Props { navigation: any; route?: any }

type Tab = 'Chat' | 'Pagos' | 'Plan' | 'Métricas' | 'Perfil';
const SUB_TABS: Tab[] = ['Chat', 'Pagos', 'Plan', 'Métricas', 'Perfil'];

export default function CoachAtletaPerfilScreen({ navigation, route }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>('Perfil');
  const [nota, setNota] = useState('Atleta disciplinada. Buena recuperación. Cuidar el volumen en semanas de alta intensidad.');

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <View style={styles.atletaAvatar}>
          <Text style={styles.atletaAvatarText}>M</Text>
        </View>
        <View style={styles.atletaInfo}>
          <Text style={styles.atletaNombre}>Martina López</Text>
          <Text style={styles.atletaSub}>Atleta desde Febrero 2026</Text>
        </View>
        <TouchableOpacity style={styles.editBtn} activeOpacity={0.8}>
          <Text style={styles.editBtnText}>Editar</Text>
        </TouchableOpacity>
      </View>

      {/* Sub-tabs */}
      <View style={styles.tabsRow}>
        {SUB_TABS.map(tab => (
          <TouchableOpacity
            key={tab}
            style={styles.tab}
            onPress={() => {
              setActiveTab(tab);
              if (tab !== 'Perfil') navigation.navigate(`CoachAtleta${tab}`, route?.params);
            }}
            activeOpacity={0.7}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>{tab}</Text>
            {activeTab === tab && <View style={styles.tabUnderline} />}
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Avatar grande */}
        <View style={styles.profileHero}>
          <View style={styles.heroAvatar}>
            <Text style={styles.heroAvatarText}>M</Text>
          </View>
          <Text style={styles.heroName}>Martina López</Text>
          <Text style={styles.heroSub}>martina.lopez@email.com</Text>
          <View style={styles.heroBadge}>
            <View style={styles.heroDot} />
            <Text style={styles.heroBadgeText}>Activa</Text>
          </View>
        </View>

        {/* Info personal */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Datos personales</Text>
          <View style={styles.infoGrid}>
            {[
              { label: 'Edad', value: '28 años' },
              { label: 'Peso', value: '58 kg' },
              { label: 'Altura', value: '165 cm' },
              { label: 'Nivel', value: 'Intermedio' },
            ].map(item => (
              <View key={item.label} style={styles.infoItem}>
                <Text style={styles.infoLabel}>{item.label}</Text>
                <Text style={styles.infoValue}>{item.value}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Objetivo */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Objetivo</Text>
          <View style={styles.objetivoTag}>
            <Text style={styles.objetivoText}>🎯 Terminar una carrera 10K en menos de 55 min</Text>
          </View>
          <Text style={styles.targetDate}>Fecha objetivo: 15 de Junio 2026</Text>
        </View>

        {/* Historial deportivo */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Historial deportivo</Text>
          <Text style={styles.historialText}>
            Empezó a correr hace 8 meses. Completó dos carreras de 5K.
            Practica yoga 2 veces por semana. Sin lesiones previas.
          </Text>
        </View>

        {/* Notas del coach */}
        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.cardTitle}>Notas privadas</Text>
            <Text style={styles.privateTag}>Solo tú</Text>
          </View>
          <TextInput
            style={styles.notaInput}
            value={nota}
            onChangeText={setNota}
            multiline
            placeholderTextColor={C.textDisabled}
            placeholder="Agregá notas sobre este atleta..."
          />
        </View>

        {/* Plan actual */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Plan actual</Text>
          <View style={styles.planRow}>
            <View style={styles.planIcon}>
              <Text style={styles.planIconText}>📋</Text>
            </View>
            <View style={styles.planInfo}>
              <Text style={styles.planName}>Plan 10K Base</Text>
              <Text style={styles.planSub}>Semana 5 de 8 · $12.000/mes</Text>
            </View>
            <TouchableOpacity
              style={styles.planBtn}
              onPress={() => navigation.navigate('CoachAtletaPlan', route?.params)}
              activeOpacity={0.8}
            >
              <Text style={styles.planBtnText}>Ver →</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Acciones */}
        <View style={styles.actionsCard}>
          {[
            { label: 'Enviar mensaje', icon: '💬', onPress: () => navigation.navigate('CoachAtletaChat', route?.params) },
            { label: 'Ver pagos', icon: '💰', onPress: () => navigation.navigate('CoachAtletaPagos', route?.params) },
            { label: 'Asignar nuevo plan', icon: '📋', onPress: () => navigation.navigate('CoachNewPlan') },
          ].map((action, i, arr) => (
            <TouchableOpacity
              key={action.label}
              style={[styles.actionRow, i < arr.length - 1 && styles.actionRowBorder]}
              onPress={action.onPress}
              activeOpacity={0.7}
            >
              <Text style={styles.actionIcon}>{action.icon}</Text>
              <Text style={styles.actionLabel}>{action.label}</Text>
              <Text style={styles.actionChevron}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Dar de baja */}
        <TouchableOpacity style={styles.removeBtn} activeOpacity={0.8}>
          <Text style={styles.removeBtnText}>Dar de baja al atleta</Text>
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
    paddingVertical: 12, gap: 10,
    borderBottomWidth: 1, borderBottomColor: C.borderSubtle,
  },
  backBtn: { width: 32, height: 32, justifyContent: 'center' },
  backIcon: { fontSize: 22, color: C.textPrimary },
  atletaAvatar: {
    width: 38, height: 38, borderRadius: 19,
    backgroundColor: '#E8F5E9', alignItems: 'center', justifyContent: 'center',
  },
  atletaAvatarText: { fontSize: F.md, fontWeight: '700', color: '#2E7D32' },
  atletaInfo: { flex: 1 },
  atletaNombre: { fontSize: F.md, fontWeight: '700', color: C.textPrimary },
  atletaSub: { fontSize: F.xs, color: C.textTertiary, marginTop: 2 },
  editBtn: {
    backgroundColor: C.primaryBg, borderRadius: R.md,
    paddingHorizontal: 12, paddingVertical: 6,
  },
  editBtnText: { fontSize: F.sm, fontWeight: '600', color: C.primary },
  tabsRow: {
    flexDirection: 'row', backgroundColor: C.white,
    borderBottomWidth: 1, borderBottomColor: C.borderSubtle,
  },
  tab: { flex: 1, paddingVertical: 11, alignItems: 'center', position: 'relative' },
  tabText: { fontSize: F.xs, color: C.textTertiary, fontWeight: '500' },
  tabTextActive: { color: C.primary, fontWeight: '700' },
  tabUnderline: {
    position: 'absolute', bottom: 0, left: 8, right: 8,
    height: 2, backgroundColor: C.primary, borderRadius: 1,
  },
  scroll: { flex: 1, padding: 16 },
  profileHero: {
    alignItems: 'center', backgroundColor: C.white,
    borderRadius: R.xl, borderWidth: 1, borderColor: C.borderSubtle,
    padding: 20, marginBottom: 14, ...S.card,
  },
  heroAvatar: {
    width: 72, height: 72, borderRadius: 36,
    backgroundColor: '#E8F5E9', alignItems: 'center', justifyContent: 'center',
    marginBottom: 10,
  },
  heroAvatarText: { fontSize: F['5xl'], fontWeight: '700', color: '#2E7D32' },
  heroName: { fontSize: F.xl, fontWeight: '800', color: C.textPrimary, marginBottom: 3 },
  heroSub: { fontSize: F.sm, color: C.textTertiary, marginBottom: 8 },
  heroBadge: {
    flexDirection: 'row', alignItems: 'center',
    gap: 5, backgroundColor: C.successBg,
    paddingHorizontal: 10, paddingVertical: 4, borderRadius: R.full,
  },
  heroDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: C.success },
  heroBadgeText: { fontSize: F.xs, fontWeight: '600', color: C.success },
  card: {
    backgroundColor: C.white, borderRadius: R.xl,
    borderWidth: 1, borderColor: C.borderSubtle,
    padding: 14, marginBottom: 14, ...S.card,
  },
  cardTitle: { fontSize: F.md, fontWeight: '700', color: C.textPrimary, marginBottom: 12 },
  cardHeaderRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 10,
  },
  privateTag: {
    fontSize: F.xs, fontWeight: '600', color: C.textTertiary,
    backgroundColor: C.bgGray, borderRadius: R.xs,
    paddingHorizontal: 8, paddingVertical: 3,
  },
  infoGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  infoItem: {
    width: '47%', backgroundColor: C.bgGray,
    borderRadius: R.lg, padding: 12,
  },
  infoLabel: { fontSize: F.xs, color: C.textTertiary, marginBottom: 3 },
  infoValue: { fontSize: F.md, fontWeight: '700', color: C.textPrimary },
  objetivoTag: {
    backgroundColor: C.primaryBg, borderRadius: R.lg,
    padding: 12, marginBottom: 8,
  },
  objetivoText: { fontSize: F.sm, color: C.primary, fontWeight: '600' },
  targetDate: { fontSize: F.xs, color: C.textTertiary },
  historialText: { fontSize: F.sm, color: C.textSecondary, lineHeight: 18 },
  notaInput: {
    fontSize: F.sm, color: C.textPrimary, lineHeight: 18,
    backgroundColor: C.bgGray, borderRadius: R.lg,
    padding: 12, minHeight: 80, textAlignVertical: 'top',
  },
  planRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  planIcon: {
    width: 40, height: 40, borderRadius: R.lg,
    backgroundColor: C.primaryBg, alignItems: 'center', justifyContent: 'center',
  },
  planIconText: { fontSize: 20 },
  planInfo: { flex: 1 },
  planName: { fontSize: F.sm, fontWeight: '700', color: C.textPrimary },
  planSub: { fontSize: F.xs, color: C.textTertiary, marginTop: 2 },
  planBtn: {
    backgroundColor: C.primaryBg, borderRadius: R.md,
    paddingHorizontal: 12, paddingVertical: 6,
  },
  planBtnText: { fontSize: F.sm, fontWeight: '600', color: C.primary },
  actionsCard: {
    backgroundColor: C.white, borderRadius: R.xl,
    borderWidth: 1, borderColor: C.borderSubtle,
    marginBottom: 14, ...S.card,
  },
  actionRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 14, paddingVertical: 14, gap: 12,
  },
  actionRowBorder: {
    borderBottomWidth: 1, borderBottomColor: C.borderSubtle,
  },
  actionIcon: { fontSize: 20 },
  actionLabel: { flex: 1, fontSize: F.sm, fontWeight: '600', color: C.textPrimary },
  actionChevron: { fontSize: 20, color: C.textDisabled },
  removeBtn: {
    borderWidth: 1, borderColor: C.error, borderRadius: R.lg,
    paddingVertical: 13, alignItems: 'center', marginBottom: 8,
  },
  removeBtnText: { fontSize: F.sm, fontWeight: '600', color: C.error },
});
