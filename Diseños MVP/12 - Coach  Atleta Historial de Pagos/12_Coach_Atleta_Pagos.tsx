/**
 * 12 — Coach — Atleta: Historial de Pagos
 * Sub-vista: Coach
 * Descripción: Historial de pagos del atleta, con estado y acciones de gestión.
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

const PAGOS = [
  { id: '1', mes: 'Mayo 2026', fecha: '01/05/2026', monto: '$12.000', estado: 'pagado' },
  { id: '2', mes: 'Junio 2026', fecha: 'Vence 01/06/2026', monto: '$12.000', estado: 'pendiente' },
  { id: '3', mes: 'Abril 2026', fecha: '01/04/2026', monto: '$12.000', estado: 'pagado' },
  { id: '4', mes: 'Marzo 2026', fecha: '01/03/2026', monto: '$12.000', estado: 'pagado' },
];

export default function CoachAtletaPagosScreen({ navigation, route }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>('Pagos');

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
          <Text style={styles.atletaSub}>Plan Mensual · $12.000/mes</Text>
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
              navigation.navigate(`CoachAtleta${tab}`, route?.params);
            }}
            activeOpacity={0.7}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>{tab}</Text>
            {activeTab === tab && <View style={styles.tabUnderline} />}
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Resumen */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>$48.000</Text>
            <Text style={styles.summaryLabel}>Total cobrado</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <Text style={[styles.summaryValue, styles.summaryValuePending]}>$12.000</Text>
            <Text style={styles.summaryLabel}>Pendiente</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>4</Text>
            <Text style={styles.summaryLabel}>Meses</Text>
          </View>
        </View>

        {/* Acciones rápidas */}
        <View style={styles.actionsRow}>
          <TouchableOpacity style={styles.actionBtn} activeOpacity={0.8}>
            <Text style={styles.actionIcon}>📩</Text>
            <Text style={styles.actionText}>Recordar pago</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionBtn, styles.actionBtnPrimary]} activeOpacity={0.8}>
            <Text style={styles.actionIcon}>✓</Text>
            <Text style={[styles.actionText, styles.actionTextPrimary]}>Marcar pagado</Text>
          </TouchableOpacity>
        </View>

        {/* Historial */}
        <Text style={styles.sectionTitle}>Historial</Text>
        <View style={styles.pagosList}>
          {PAGOS.map(pago => (
            <View key={pago.id} style={styles.pagoCard}>
              <View style={styles.pagoLeft}>
                <Text style={styles.pagoMes}>{pago.mes}</Text>
                <Text style={styles.pagoFecha}>{pago.fecha}</Text>
              </View>
              <View style={styles.pagoRight}>
                <Text style={styles.pagoMonto}>{pago.monto}</Text>
                <View style={[
                  styles.estadoBadge,
                  pago.estado === 'pendiente' && styles.estadoBadgePending,
                ]}>
                  <Text style={[
                    styles.estadoText,
                    pago.estado === 'pendiente' && styles.estadoTextPending,
                  ]}>
                    {pago.estado === 'pagado' ? 'Pagado' : 'Pendiente'}
                  </Text>
                </View>
              </View>
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
  summaryCard: {
    flexDirection: 'row', backgroundColor: C.white,
    borderRadius: R.xl, borderWidth: 1, borderColor: C.borderSubtle,
    padding: 16, marginBottom: 12, ...S.card,
  },
  summaryItem: { flex: 1, alignItems: 'center' },
  summaryValue: { fontSize: F['2xl'], fontWeight: '800', color: C.textPrimary },
  summaryValuePending: { color: C.warning },
  summaryLabel: { fontSize: F.xs, color: C.textTertiary, marginTop: 2 },
  summaryDivider: { width: 1, backgroundColor: C.borderSubtle, marginHorizontal: 8 },
  actionsRow: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  actionBtn: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 6, backgroundColor: C.white, borderRadius: R.lg,
    borderWidth: 1, borderColor: C.border, paddingVertical: 11,
  },
  actionBtnPrimary: { backgroundColor: C.primaryBg, borderColor: C.primary },
  actionIcon: { fontSize: 16 },
  actionText: { fontSize: F.sm, fontWeight: '600', color: C.textPrimary },
  actionTextPrimary: { color: C.primary },
  sectionTitle: {
    fontSize: F.md, fontWeight: '700', color: C.textPrimary, marginBottom: 10,
  },
  pagosList: { gap: 8 },
  pagoCard: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: C.white, borderRadius: R.lg,
    borderWidth: 1, borderColor: C.borderSubtle,
    padding: 14, ...S.card,
  },
  pagoLeft: { gap: 3 },
  pagoMes: { fontSize: F.sm, fontWeight: '600', color: C.textPrimary },
  pagoFecha: { fontSize: F.xs, color: C.textTertiary },
  pagoRight: { alignItems: 'flex-end', gap: 4 },
  pagoMonto: { fontSize: F.md, fontWeight: '700', color: C.textPrimary },
  estadoBadge: {
    backgroundColor: C.successBg, borderRadius: R.xs,
    paddingHorizontal: 8, paddingVertical: 3,
  },
  estadoBadgePending: { backgroundColor: C.warningBg },
  estadoText: { fontSize: F.xs, fontWeight: '600', color: C.success },
  estadoTextPending: { color: C.warning },
});
