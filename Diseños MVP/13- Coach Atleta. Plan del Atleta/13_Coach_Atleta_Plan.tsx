/**
 * 13 — Coach — Atleta: Plan del Atleta
 * Sub-vista: Coach
 * Descripción: Vista del plan asignado al atleta, sesiones de la semana,
 * progreso general. El coach puede editar o asignar entrenamientos.
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

const SESIONES = [
  { id: '1', dia: 'Lun', nombre: 'Rodaje suave 45 min', tipo: 'Running', estado: 'completado', zona: 'Z2' },
  { id: '2', dia: 'Mar', nombre: 'Fuerza tren inferior', tipo: 'Fuerza', estado: 'completado', zona: '' },
  { id: '3', dia: 'Mié', nombre: 'Intervalo 5×1km', tipo: 'Running', estado: 'hoy', zona: 'Z4' },
  { id: '4', dia: 'Jue', nombre: 'Descanso activo', tipo: 'Recuperación', estado: 'pendiente', zona: '' },
  { id: '5', dia: 'Vie', nombre: 'Rodaje 60 min', tipo: 'Running', estado: 'pendiente', zona: 'Z2-3' },
];

export default function CoachAtletaPlanScreen({ navigation, route }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>('Plan');

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
        <TouchableOpacity
          style={styles.editBtn}
          onPress={() => navigation.navigate('CoachPlanEditor')}
        >
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
              if (tab !== 'Plan') navigation.navigate(`CoachAtleta${tab}`, route?.params);
            }}
            activeOpacity={0.7}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>{tab}</Text>
            {activeTab === tab && <View style={styles.tabUnderline} />}
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Progreso */}
        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressTitle}>Progreso general</Text>
            <Text style={styles.progressPercent}>62%</Text>
          </View>
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: '62%' }]} />
          </View>
          <View style={styles.progressDates}>
            <Text style={styles.progressDate}>Inicio: 5 Abr</Text>
            <Text style={styles.progressDate}>Fin: 31 May</Text>
          </View>
        </View>

        {/* Selector semana */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.semScrollView}>
          <View style={styles.semRow}>
            {[1, 2, 3, 4, 5, 6, 7, 8].map(s => (
              <TouchableOpacity
                key={s}
                style={[styles.semBtn, s === 5 && styles.semBtnActive]}
                activeOpacity={0.7}
              >
                <Text style={[styles.semText, s === 5 && styles.semTextActive]}>Sem {s}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Sesiones */}
        <Text style={styles.sectionTitle}>Semana 5</Text>
        <View style={styles.sesiones}>
          {SESIONES.map(s => (
            <TouchableOpacity
              key={s.id}
              style={styles.sesionCard}
              activeOpacity={0.8}
              onPress={() => navigation.navigate('CoachWorkoutDetails', { sesionId: s.id })}
            >
              <View style={[
                styles.sesionIcon,
                s.estado === 'completado' && styles.sesionIconDone,
                s.estado === 'hoy' && styles.sesionIconHoy,
              ]}>
                <Text style={styles.sesionIconText}>
                  {s.estado === 'completado' ? '✓' : s.estado === 'hoy' ? '▶' : s.dia}
                </Text>
              </View>
              <View style={styles.sesionInfo}>
                <Text style={[styles.sesionNombre, s.estado === 'pendiente' && styles.sesionNombrePending]}>
                  {s.nombre}
                </Text>
                <Text style={styles.sesionSub}>
                  {s.dia}{s.zona ? ` · ${s.zona}` : ''} · {s.tipo}
                </Text>
              </View>
              <Text style={styles.sesionStatus}>
                {s.estado === 'completado' ? '✓ Listo' : s.estado === 'hoy' ? 'Hoy' : ''}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Agregar entreno */}
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => navigation.navigate('CoachAssignWorkout')}
          activeOpacity={0.8}
        >
          <Text style={styles.addBtnText}>+ Agregar entrenamiento</Text>
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
  progressCard: {
    backgroundColor: C.white, borderRadius: R.xl,
    borderWidth: 1, borderColor: C.borderSubtle,
    padding: 14, marginBottom: 12, ...S.card,
  },
  progressHeader: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 8,
  },
  progressTitle: { fontSize: F.sm, fontWeight: '600', color: C.textSecondary },
  progressPercent: { fontSize: F.md, fontWeight: '700', color: C.primary },
  progressBarBg: {
    height: 6, backgroundColor: C.bgGray, borderRadius: 3, overflow: 'hidden', marginBottom: 6,
  },
  progressBarFill: { height: '100%', backgroundColor: C.primary, borderRadius: 3 },
  progressDates: { flexDirection: 'row', justifyContent: 'space-between' },
  progressDate: { fontSize: F.xs, color: C.textTertiary },
  semScrollView: { marginBottom: 16 },
  semRow: { flexDirection: 'row', gap: 8, paddingRight: 4 },
  semBtn: {
    paddingHorizontal: 14, paddingVertical: 7,
    borderRadius: R.full, backgroundColor: C.white,
    borderWidth: 1, borderColor: C.border,
  },
  semBtnActive: { backgroundColor: C.primary, borderColor: C.primary },
  semText: { fontSize: F.sm, color: C.textSecondary },
  semTextActive: { color: C.white, fontWeight: '700' },
  sectionTitle: { fontSize: F.md, fontWeight: '700', color: C.textPrimary, marginBottom: 10 },
  sesiones: { gap: 8, marginBottom: 12 },
  sesionCard: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: C.white, borderRadius: R.lg,
    borderWidth: 1, borderColor: C.borderSubtle,
    padding: 12, gap: 12, ...S.card,
  },
  sesionIcon: {
    width: 36, height: 36, borderRadius: 10,
    backgroundColor: C.bgGray, alignItems: 'center', justifyContent: 'center',
  },
  sesionIconDone: { backgroundColor: C.success },
  sesionIconHoy: { backgroundColor: C.primary },
  sesionIconText: { fontSize: F.sm, fontWeight: '700', color: C.white },
  sesionInfo: { flex: 1 },
  sesionNombre: { fontSize: F.sm, fontWeight: '600', color: C.textPrimary },
  sesionNombrePending: { color: C.textDisabled },
  sesionSub: { fontSize: F.xs, color: C.textTertiary, marginTop: 2 },
  sesionStatus: { fontSize: F.xs, fontWeight: '600', color: C.primary },
  addBtn: {
    borderWidth: 1, borderColor: C.primary, borderStyle: 'dashed',
    borderRadius: R.lg, paddingVertical: 14,
    alignItems: 'center', marginTop: 4,
  },
  addBtnText: { fontSize: F.sm, color: C.primary, fontWeight: '600' },
});
