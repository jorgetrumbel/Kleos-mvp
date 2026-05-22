/**
 * 14 — Coach — Atleta: Métricas
 * Sub-vista: Coach
 * Descripción: Vista de métricas de rendimiento del atleta. Muestra estadísticas
 * semanales, gráfico de carga, RPE reciente y datos de frecuencia cardíaca.
 */

import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, SafeAreaView,
} from 'react-native';
import { C, F, R, S } from './KleosTheme';

interface Props { navigation: any; route?: any }

type Tab = 'Chat' | 'Pagos' | 'Plan' | 'Métricas' | 'Perfil';
const SUB_TABS: Tab[] = ['Chat', 'Pagos', 'Plan', 'Métricas', 'Perfil'];

type Periodo = '7d' | '30d' | '3m';

const STATS = [
  { label: 'Km totales', value: '42.3', unit: 'km' },
  { label: 'Tiempo total', value: '5h 20m', unit: '' },
  { label: 'FC promedio', value: '148', unit: 'bpm' },
  { label: 'Sesiones', value: '6', unit: '' },
];

const RPE_DATA = [
  { dia: 'L', rpe: 5, tipo: 'Running' },
  { dia: 'M', rpe: 7, tipo: 'Fuerza' },
  { dia: 'X', rpe: 8, tipo: 'Intervalo' },
  { dia: 'J', rpe: 3, tipo: 'Recuperación' },
  { dia: 'V', rpe: 6, tipo: 'Running' },
  { dia: 'S', rpe: 0, tipo: '' },
  { dia: 'D', rpe: 0, tipo: '' },
];

const CARGA_DATA = [20, 35, 50, 45, 60, 55, 70];
const MAX_CARGA = 80;

const FC_ZONES = [
  { label: 'Z1', pct: 12, color: '#60D8A4' },
  { label: 'Z2', pct: 38, color: '#22C55E' },
  { label: 'Z3', pct: 28, color: '#F59E0B' },
  { label: 'Z4', pct: 16, color: '#F97316' },
  { label: 'Z5', pct: 6, color: '#E53935' },
];

export default function CoachAtletaMetricasScreen({ navigation, route }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>('Métricas');
  const [periodo, setPeriodo] = useState<Periodo>('7d');

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
          <Text style={styles.atletaSub}>Plan 10K Base · Sem 5 de 8</Text>
        </View>
      </View>

      {/* Sub-tabs */}
      <View style={styles.tabsRow}>
        {SUB_TABS.map(tab => (
          <TouchableOpacity
            key={tab}
            style={styles.tab}
            onPress={() => {
              setActiveTab(tab);
              if (tab !== 'Métricas') navigation.navigate(`CoachAtleta${tab}`, route?.params);
            }}
            activeOpacity={0.7}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>{tab}</Text>
            {activeTab === tab && <View style={styles.tabUnderline} />}
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Selector período */}
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
              <Text style={styles.statValue}>{s.value}</Text>
              {s.unit ? <Text style={styles.statUnit}>{s.unit}</Text> : null}
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* Carga semanal */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Carga semanal</Text>
          <View style={styles.barChart}>
            {CARGA_DATA.map((val, i) => {
              const dias = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
              const height = (val / MAX_CARGA) * 80;
              const isToday = i === 2;
              return (
                <View key={i} style={styles.barCol}>
                  <View style={styles.barBg}>
                    <View
                      style={[
                        styles.barFill,
                        { height: height || 4 },
                        isToday && styles.barFillToday,
                        val === 0 && styles.barFillEmpty,
                      ]}
                    />
                  </View>
                  <Text style={[styles.barLabel, isToday && styles.barLabelToday]}>
                    {dias[i]}
                  </Text>
                </View>
              );
            })}
          </View>
          <View style={styles.cardFooter}>
            <Text style={styles.cardFooterText}>Carga total: 335 UA</Text>
            <Text style={[styles.cardFooterText, styles.cardFooterPositive]}>↑ 12% vs sem. anterior</Text>
          </View>
        </View>

        {/* RPE por sesión */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>RPE por sesión</Text>
          <View style={styles.rpeList}>
            {RPE_DATA.filter(d => d.rpe > 0).map((d, i) => (
              <View key={i} style={styles.rpeRow}>
                <Text style={styles.rpeDia}>{d.dia}</Text>
                <View style={styles.rpeBarBg}>
                  <View style={[styles.rpeBarFill, { width: `${(d.rpe / 10) * 100}%` as any }]} />
                </View>
                <Text style={styles.rpeValue}>{d.rpe}/10</Text>
                <Text style={styles.rpeTipo}>{d.tipo}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Zonas de FC */}
        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.cardTitle}>Zonas de FC</Text>
            <Text style={styles.cardSub}>FC media: 148 bpm · Máx: 178 bpm</Text>
          </View>
          {FC_ZONES.map(z => (
            <View key={z.label} style={styles.zoneRow}>
              <Text style={styles.zoneLabel}>{z.label}</Text>
              <View style={styles.zoneBarBg}>
                <View style={[styles.zoneBarFill, { width: `${z.pct}%` as any, backgroundColor: z.color }]} />
              </View>
              <Text style={styles.zonePct}>{z.pct}%</Text>
            </View>
          ))}
        </View>

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
  periodoRow: {
    flexDirection: 'row', gap: 8, marginBottom: 16,
  },
  periodoBtn: {
    paddingHorizontal: 14, paddingVertical: 7,
    borderRadius: R.full, backgroundColor: C.white,
    borderWidth: 1, borderColor: C.border,
  },
  periodoBtnActive: { backgroundColor: C.primary, borderColor: C.primary },
  periodoText: { fontSize: F.sm, color: C.textSecondary, fontWeight: '500' },
  periodoTextActive: { color: C.white, fontWeight: '700' },
  statsGrid: {
    flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 14,
  },
  statCard: {
    width: '47%', backgroundColor: C.white, borderRadius: R.xl,
    borderWidth: 1, borderColor: C.borderSubtle,
    padding: 14, alignItems: 'center', ...S.card,
  },
  statValue: { fontSize: F['3xl'], fontWeight: '800', color: C.textPrimary },
  statUnit: { fontSize: F.xs, color: C.textTertiary, marginTop: 1 },
  statLabel: { fontSize: F.xs, color: C.textTertiary, marginTop: 4, textAlign: 'center' },
  card: {
    backgroundColor: C.white, borderRadius: R.xl,
    borderWidth: 1, borderColor: C.borderSubtle,
    padding: 14, marginBottom: 14, ...S.card,
  },
  cardTitle: { fontSize: F.md, fontWeight: '700', color: C.textPrimary, marginBottom: 12 },
  cardHeaderRow: { marginBottom: 12 },
  cardSub: { fontSize: F.xs, color: C.textTertiary, marginTop: 2 },
  cardFooter: {
    flexDirection: 'row', justifyContent: 'space-between', marginTop: 8,
  },
  cardFooterText: { fontSize: F.xs, color: C.textTertiary },
  cardFooterPositive: { color: C.success, fontWeight: '600' },
  barChart: {
    flexDirection: 'row', alignItems: 'flex-end',
    gap: 6, height: 100, paddingBottom: 20,
  },
  barCol: { flex: 1, alignItems: 'center' },
  barBg: {
    flex: 1, width: '100%', justifyContent: 'flex-end',
    backgroundColor: C.bgGray, borderRadius: 4, overflow: 'hidden',
  },
  barFill: { width: '100%', backgroundColor: C.primary, borderRadius: 4 },
  barFillToday: { backgroundColor: C.primaryMid },
  barFillEmpty: { backgroundColor: C.border },
  barLabel: {
    fontSize: F.xs, color: C.textTertiary, marginTop: 4,
    position: 'absolute', bottom: 0,
  },
  barLabelToday: { color: C.primary, fontWeight: '700' },
  rpeList: { gap: 8 },
  rpeRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  rpeDia: { width: 18, fontSize: F.sm, fontWeight: '700', color: C.textSecondary },
  rpeBarBg: {
    flex: 1, height: 8, backgroundColor: C.bgGray,
    borderRadius: 4, overflow: 'hidden',
  },
  rpeBarFill: { height: '100%', backgroundColor: C.primary, borderRadius: 4 },
  rpeValue: { width: 36, fontSize: F.xs, color: C.textSecondary, fontWeight: '600', textAlign: 'right' },
  rpeTipo: { width: 70, fontSize: F.xs, color: C.textTertiary },
  zoneRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 },
  zoneLabel: { width: 24, fontSize: F.sm, fontWeight: '700', color: C.textSecondary },
  zoneBarBg: {
    flex: 1, height: 10, backgroundColor: C.bgGray,
    borderRadius: 5, overflow: 'hidden',
  },
  zoneBarFill: { height: '100%', borderRadius: 5 },
  zonePct: { width: 32, fontSize: F.xs, color: C.textTertiary, textAlign: 'right' },
});
