/**
 * 19 — Coach — Editor de Plan
 * Pantalla: Coach
 * Descripción: Editor de plan de entrenamiento para un atleta. El coach puede
 * estructurar semanas, agregar sesiones, y asignar el plan al atleta.
 */

import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, SafeAreaView, TextInput,
} from 'react-native';
import { C, F, R, S } from './KleosTheme';

interface Props { navigation: any; route?: any }

interface Sesion {
  id: string;
  dia: string;
  nombre: string;
  tipo: string;
  duracion: string;
}

const DIAS_SEM = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

const SESIONES_INIT: Sesion[] = [
  { id: '1', dia: 'Lun', nombre: 'Rodaje Z2 45min', tipo: 'Running', duracion: '45 min' },
  { id: '2', dia: 'Mar', nombre: 'Fuerza tren inferior', tipo: 'Fuerza', duracion: '50 min' },
  { id: '3', dia: 'Mié', nombre: 'Intervalo 5×1km', tipo: 'Running', duracion: '55 min' },
  { id: '4', dia: 'Vie', nombre: 'Rodaje largo 60min', tipo: 'Running', duracion: '60 min' },
];

export default function CoachPlanEditorScreen({ navigation, route }: Props) {
  const [planNombre, setPlanNombre] = useState('Plan 10K Base');
  const [semanas, setSemanas] = useState(8);
  const [semActual, setSemActual] = useState(1);
  const [sesiones, setSesiones] = useState<Sesion[]>(SESIONES_INIT);

  const deleteSession = (id: string) => {
    setSesiones(prev => prev.filter(s => s.id !== id));
  };

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Editor de plan</Text>
        <TouchableOpacity style={styles.saveBtn} activeOpacity={0.85}>
          <Text style={styles.saveBtnText}>Guardar</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Info del plan */}
        <View style={styles.card}>
          <Text style={styles.fieldLabel}>Nombre del plan</Text>
          <TextInput
            style={styles.input}
            value={planNombre}
            onChangeText={setPlanNombre}
            placeholder="Ej: Plan 10K Base"
            placeholderTextColor={C.textDisabled}
          />
          <View style={styles.row}>
            <View style={styles.col}>
              <Text style={styles.fieldLabel}>Duración</Text>
              <View style={styles.semControl}>
                <TouchableOpacity
                  style={styles.semBtn}
                  onPress={() => setSemanas(Math.max(1, semanas - 1))}
                >
                  <Text style={styles.semBtnText}>−</Text>
                </TouchableOpacity>
                <Text style={styles.semValue}>{semanas} sem</Text>
                <TouchableOpacity
                  style={styles.semBtn}
                  onPress={() => setSemanas(semanas + 1)}
                >
                  <Text style={styles.semBtnText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.col}>
              <Text style={styles.fieldLabel}>Atleta</Text>
              <View style={styles.atletaChip}>
                <View style={styles.atletaChipAvatar}>
                  <Text style={styles.atletaChipText}>M</Text>
                </View>
                <Text style={styles.atletaChipName}>Martina L.</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Selector semana */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.semScroll}>
          <View style={styles.semRow}>
            {Array.from({ length: semanas }, (_, i) => i + 1).map(s => (
              <TouchableOpacity
                key={s}
                style={[styles.semPill, s === semActual && styles.semPillActive]}
                onPress={() => setSemActual(s)}
                activeOpacity={0.7}
              >
                <Text style={[styles.semPillText, s === semActual && styles.semPillTextActive]}>
                  Sem {s}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Sesiones de la semana */}
        <Text style={styles.sectionTitle}>Semana {semActual}</Text>

        {DIAS_SEM.map(dia => {
          const diasSesiones = sesiones.filter(s => s.dia === dia);
          return (
            <View key={dia} style={styles.diaBlock}>
              <Text style={styles.diaLabel}>{dia}</Text>
              {diasSesiones.length === 0 ? (
                <TouchableOpacity
                  style={styles.addDiaBtn}
                  onPress={() => navigation.navigate('CoachLibrary')}
                  activeOpacity={0.8}
                >
                  <Text style={styles.addDiaBtnText}>+ Agregar</Text>
                </TouchableOpacity>
              ) : (
                <>
                  {diasSesiones.map(s => (
                    <View key={s.id} style={styles.sesionRow}>
                      <View style={styles.sesionColor} />
                      <View style={styles.sesionInfo}>
                        <Text style={styles.sesionNombre}>{s.nombre}</Text>
                        <Text style={styles.sesionMeta}>{s.tipo} · {s.duracion}</Text>
                      </View>
                      <TouchableOpacity onPress={() => deleteSession(s.id)} style={styles.deleteBtn}>
                        <Text style={styles.deleteBtnText}>✕</Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                  <TouchableOpacity
                    style={styles.addMoreBtn}
                    onPress={() => navigation.navigate('CoachLibrary')}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.addMoreBtnText}>+ sesión</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          );
        })}

        {/* Asignar plan */}
        <TouchableOpacity style={styles.assignBtn} activeOpacity={0.85}>
          <Text style={styles.assignBtnText}>Asignar plan a Martina</Text>
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
  saveBtn: {
    backgroundColor: C.primary, borderRadius: R.md,
    paddingHorizontal: 16, paddingVertical: 8,
  },
  saveBtnText: { fontSize: F.sm, fontWeight: '700', color: C.white },
  scroll: { flex: 1, padding: 16 },
  card: {
    backgroundColor: C.white, borderRadius: R.xl,
    borderWidth: 1, borderColor: C.borderSubtle,
    padding: 14, marginBottom: 14, ...S.card,
  },
  fieldLabel: { fontSize: F.sm, fontWeight: '600', color: C.textSecondary, marginBottom: 6 },
  input: {
    backgroundColor: C.bgGray, borderRadius: R.lg,
    paddingHorizontal: 12, paddingVertical: 10,
    fontSize: F.md, color: C.textPrimary, marginBottom: 12,
  },
  row: { flexDirection: 'row', gap: 12 },
  col: { flex: 1 },
  semControl: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: C.bgGray, borderRadius: R.lg, overflow: 'hidden',
  },
  semBtn: {
    width: 36, height: 38, alignItems: 'center', justifyContent: 'center',
    backgroundColor: C.white, borderWidth: 1, borderColor: C.border,
  },
  semBtnText: { fontSize: F.xl, color: C.textPrimary, fontWeight: '600' },
  semValue: {
    flex: 1, textAlign: 'center',
    fontSize: F.sm, fontWeight: '700', color: C.textPrimary,
  },
  atletaChip: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#E8F5E9', borderRadius: R.lg,
    paddingHorizontal: 10, paddingVertical: 8, gap: 6,
  },
  atletaChipAvatar: {
    width: 22, height: 22, borderRadius: 11,
    backgroundColor: '#2E7D32', alignItems: 'center', justifyContent: 'center',
  },
  atletaChipText: { fontSize: F.xs, fontWeight: '700', color: C.white },
  atletaChipName: { fontSize: F.sm, fontWeight: '600', color: '#2E7D32' },
  semScroll: { marginBottom: 14 },
  semRow: { flexDirection: 'row', gap: 8, paddingRight: 4 },
  semPill: {
    paddingHorizontal: 14, paddingVertical: 7,
    borderRadius: R.full, backgroundColor: C.white,
    borderWidth: 1, borderColor: C.border,
  },
  semPillActive: { backgroundColor: C.primary, borderColor: C.primary },
  semPillText: { fontSize: F.sm, color: C.textSecondary },
  semPillTextActive: { color: C.white, fontWeight: '700' },
  sectionTitle: { fontSize: F.md, fontWeight: '700', color: C.textPrimary, marginBottom: 10 },
  diaBlock: {
    backgroundColor: C.white, borderRadius: R.lg,
    borderWidth: 1, borderColor: C.borderSubtle,
    padding: 12, marginBottom: 8, ...S.card,
  },
  diaLabel: { fontSize: F.sm, fontWeight: '700', color: C.textSecondary, marginBottom: 8 },
  addDiaBtn: {
    borderWidth: 1, borderColor: C.border, borderStyle: 'dashed',
    borderRadius: R.md, paddingVertical: 8, alignItems: 'center',
  },
  addDiaBtnText: { fontSize: F.sm, color: C.textTertiary },
  sesionRow: {
    flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 6,
  },
  sesionColor: { width: 4, height: 32, backgroundColor: C.primary, borderRadius: 2 },
  sesionInfo: { flex: 1 },
  sesionNombre: { fontSize: F.sm, fontWeight: '600', color: C.textPrimary },
  sesionMeta: { fontSize: F.xs, color: C.textTertiary, marginTop: 1 },
  deleteBtn: { padding: 6 },
  deleteBtnText: { fontSize: F.sm, color: C.textDisabled },
  addMoreBtn: {
    paddingVertical: 6, alignItems: 'center',
    borderTopWidth: 1, borderTopColor: C.borderSubtle, marginTop: 4,
  },
  addMoreBtnText: { fontSize: F.sm, color: C.primary, fontWeight: '600' },
  assignBtn: {
    backgroundColor: C.primary, borderRadius: R.lg,
    paddingVertical: 15, alignItems: 'center', marginTop: 8,
  },
  assignBtnText: { fontSize: F.md, fontWeight: '700', color: C.white },
});
