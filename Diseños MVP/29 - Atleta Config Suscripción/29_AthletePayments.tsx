/**
 * 29 — Atleta — Pagos
 * Pantalla: Atleta
 * Descripción: Vista de pagos del atleta. Estado del plan, historial
 * de pagos y método de pago vinculado.
 */

import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, SafeAreaView,
} from 'react-native';
import { C, F, R, S } from './KleosTheme';

interface Props { navigation: any }

const PAGOS = [
  { id: '1', mes: 'Mayo 2026', fecha: '01/05/2026', monto: '$12.000', estado: 'pagado' },
  { id: '2', mes: 'Junio 2026', fecha: 'Vence 01/06/2026', monto: '$12.000', estado: 'pendiente' },
  { id: '3', mes: 'Abril 2026', fecha: '01/04/2026', monto: '$12.000', estado: 'pagado' },
  { id: '4', mes: 'Marzo 2026', fecha: '01/03/2026', monto: '$12.000', estado: 'pagado' },
];

export default function AthletePaymentsScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Mis pagos</Text>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Plan actual */}
        <View style={styles.planCard}>
          <View style={styles.planLeft}>
            <Text style={styles.planLabel}>Plan actual</Text>
            <Text style={styles.planNombre}>Plan Mensual · Roberto Acosta</Text>
          </View>
          <View style={styles.planAmount}>
            <Text style={styles.planAmountValue}>$12.000</Text>
            <Text style={styles.planAmountSub}>/mes</Text>
          </View>
        </View>

        {/* Próximo pago */}
        <View style={styles.nextCard}>
          <View style={styles.nextAlert}>
            <Text style={styles.nextAlertIcon}>⚠️</Text>
            <View>
              <Text style={styles.nextAlertTitle}>Pago próximo</Text>
              <Text style={styles.nextAlertSub}>Vence el 1 de Junio 2026</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.payBtn} activeOpacity={0.85}>
            <Text style={styles.payBtnText}>Pagar ahora</Text>
          </TouchableOpacity>
        </View>

        {/* Método de pago */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Método de pago</Text>
            <TouchableOpacity>
              <Text style={styles.cardAction}>Cambiar</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.methodRow}>
            <View style={styles.methodIcon}>
              <Text style={styles.methodIconText}>💳</Text>
            </View>
            <View style={styles.methodInfo}>
              <Text style={styles.methodName}>Transferencia bancaria</Text>
              <Text style={styles.methodSub}>CVU: ● ● ● ● ● 4821</Text>
            </View>
            <View style={styles.methodActive}>
              <Text style={styles.methodActiveText}>Activo</Text>
            </View>
          </View>
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
    paddingVertical: 14, gap: 10,
    borderBottomWidth: 1, borderBottomColor: C.borderSubtle,
  },
  backBtn: { width: 32, height: 32, justifyContent: 'center' },
  backIcon: { fontSize: 22, color: C.textPrimary },
  title: { fontSize: F.lg, fontWeight: '700', color: C.textPrimary },
  scroll: { flex: 1, padding: 16 },
  planCard: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: C.primary, borderRadius: R.xl,
    padding: 16, marginBottom: 12,
  },
  planLeft: {},
  planLabel: { fontSize: F.xs, color: 'rgba(255,255,255,0.7)', marginBottom: 3 },
  planNombre: { fontSize: F.md, fontWeight: '700', color: C.white },
  planAmount: { flexDirection: 'row', alignItems: 'baseline', gap: 2 },
  planAmountValue: { fontSize: F['3xl'], fontWeight: '800', color: C.white },
  planAmountSub: { fontSize: F.sm, color: 'rgba(255,255,255,0.7)' },
  nextCard: {
    backgroundColor: '#FFF8E1', borderRadius: R.xl,
    borderWidth: 1, borderColor: 'rgba(230,81,0,0.15)',
    padding: 14, marginBottom: 14,
  },
  nextAlert: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 12 },
  nextAlertIcon: { fontSize: 22 },
  nextAlertTitle: { fontSize: F.md, fontWeight: '700', color: C.warning },
  nextAlertSub: { fontSize: F.xs, color: C.textTertiary, marginTop: 1 },
  payBtn: {
    backgroundColor: C.warning, borderRadius: R.lg,
    paddingVertical: 12, alignItems: 'center',
  },
  payBtnText: { fontSize: F.md, fontWeight: '700', color: C.white },
  card: {
    backgroundColor: C.white, borderRadius: R.xl,
    borderWidth: 1, borderColor: C.borderSubtle,
    padding: 14, marginBottom: 20, ...S.card,
  },
  cardHeader: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 12,
  },
  cardTitle: { fontSize: F.md, fontWeight: '700', color: C.textPrimary },
  cardAction: { fontSize: F.sm, color: C.primary, fontWeight: '600' },
  methodRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  methodIcon: {
    width: 40, height: 40, borderRadius: R.lg,
    backgroundColor: C.bgGray, alignItems: 'center', justifyContent: 'center',
  },
  methodIconText: { fontSize: 22 },
  methodInfo: { flex: 1 },
  methodName: { fontSize: F.sm, fontWeight: '600', color: C.textPrimary },
  methodSub: { fontSize: F.xs, color: C.textTertiary, marginTop: 2 },
  methodActive: {
    backgroundColor: C.successBg, borderRadius: R.xs,
    paddingHorizontal: 8, paddingVertical: 3,
  },
  methodActiveText: { fontSize: F.xs, fontWeight: '600', color: C.success },
  sectionTitle: { fontSize: F.md, fontWeight: '700', color: C.textPrimary, marginBottom: 10 },
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
