/**
 * 46 — Modal: Ver Ejercicio Bottom Sheet inline — Coach
 * Tipo: Modal / Bottom Sheet inline — Coach
 * Descripción: Bottom sheet inline que aparece al tocar un ejercicio dentro del
 * editor de plan o asignación de entreno. Permite verlo rápido y agregarlo.
 * (Versión inline: sin Modal wrapper, para incrustar dentro de un ScrollView)
 */

import React from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  Animated,
} from 'react-native';
import { C, F, R, S } from './KleosTheme';

interface Props {
  visible: boolean;
  onClose: () => void;
  onAgregar: () => void;
  ejercicio?: {
    nombre: string;
    categoria: string;
    nivel: string;
    musculos: string;
    series?: string;
    reps?: string;
    descripcion?: string;
  };
}

const DEFAULT_EJERCICIO = {
  nombre: 'Sentadilla con barra',
  categoria: 'Piernas',
  nivel: 'Intermedio',
  musculos: 'Cuádriceps, glúteos, isquios',
  series: '3–4',
  reps: '8–12',
  descripcion: 'Mantené la espalda recta y las rodillas alineadas con los pies durante toda la ejecución.',
};

export default function ModalExerciseBottomSheet({
  visible,
  onClose,
  onAgregar,
  ejercicio = DEFAULT_EJERCICIO,
}: Props) {
  if (!visible) return null;

  return (
    <View style={styles.container}>
      {/* Overlay backdrop */}
      <TouchableOpacity style={styles.backdrop} onPress={onClose} activeOpacity={1} />

      {/* Bottom sheet */}
      <View style={styles.sheet}>
        <View style={styles.handle} />

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.iconWrap}>
            <Text style={styles.iconText}>💪</Text>
          </View>
          <View style={styles.headerInfo}>
            <Text style={styles.nombre}>{ejercicio.nombre}</Text>
            <View style={styles.tagsRow}>
              <View style={styles.tag}>
                <Text style={styles.tagText}>{ejercicio.categoria}</Text>
              </View>
              <View style={[styles.tag, styles.tagNivel]}>
                <Text style={[styles.tagText, styles.tagNivelText]}>{ejercicio.nivel}</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Text style={styles.closeIcon}>✕</Text>
          </TouchableOpacity>
        </View>

        {/* Músculos */}
        <View style={styles.musculosRow}>
          <Text style={styles.musculosLabel}>Músculos: </Text>
          <Text style={styles.musculosValue}>{ejercicio.musculos}</Text>
        </View>

        {/* Series y reps */}
        <View style={styles.seriesRow}>
          <View style={styles.serieItem}>
            <Text style={styles.serieValue}>{ejercicio.series || '3'}</Text>
            <Text style={styles.serieLabel}>Series</Text>
          </View>
          <View style={styles.serieDivider} />
          <View style={styles.serieItem}>
            <Text style={styles.serieValue}>{ejercicio.reps || '10-12'}</Text>
            <Text style={styles.serieLabel}>Reps</Text>
          </View>
          <View style={styles.serieDivider} />
          <View style={styles.serieItem}>
            <Text style={styles.serieValue}>90 seg</Text>
            <Text style={styles.serieLabel}>Descanso</Text>
          </View>
        </View>

        {/* Descripción */}
        {ejercicio.descripcion && (
          <View style={styles.descCard}>
            <Text style={styles.descText}>{ejercicio.descripcion}</Text>
          </View>
        )}

        {/* Acciones */}
        <View style={styles.actions}>
          <TouchableOpacity style={styles.verBtn} activeOpacity={0.8}>
            <Text style={styles.verBtnText}>Ver completo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.agregarBtn} onPress={onAgregar} activeOpacity={0.85}>
            <Text style={styles.agregarBtnText}>+ Agregar al plan</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    justifyContent: 'flex-end', zIndex: 100,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: C.overlay,
  },
  sheet: {
    backgroundColor: C.white,
    borderTopLeftRadius: 24, borderTopRightRadius: 24,
    padding: 20, paddingBottom: 34,
  },
  handle: {
    width: 40, height: 4, borderRadius: 2, backgroundColor: C.border,
    alignSelf: 'center', marginBottom: 16,
  },
  header: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, marginBottom: 12 },
  iconWrap: {
    width: 44, height: 44, borderRadius: R.lg,
    backgroundColor: C.primaryBg, alignItems: 'center', justifyContent: 'center',
  },
  iconText: { fontSize: 24 },
  headerInfo: { flex: 1 },
  nombre: { fontSize: F.lg, fontWeight: '800', color: C.textPrimary, marginBottom: 5 },
  tagsRow: { flexDirection: 'row', gap: 6 },
  tag: {
    backgroundColor: C.bgGray, borderRadius: R.xs,
    paddingHorizontal: 8, paddingVertical: 3,
  },
  tagText: { fontSize: F.xs, color: C.textSecondary },
  tagNivel: { backgroundColor: C.primaryBg },
  tagNivelText: { color: C.primary, fontWeight: '600' },
  closeBtn: { padding: 4 },
  closeIcon: { fontSize: 16, color: C.textTertiary },
  musculosRow: {
    flexDirection: 'row', flexWrap: 'wrap',
    backgroundColor: C.bgGray, borderRadius: R.lg,
    paddingHorizontal: 12, paddingVertical: 8, marginBottom: 12,
  },
  musculosLabel: { fontSize: F.sm, color: C.textTertiary },
  musculosValue: { fontSize: F.sm, color: C.textPrimary, fontWeight: '600', flex: 1 },
  seriesRow: {
    flexDirection: 'row', backgroundColor: C.bgGray,
    borderRadius: R.lg, padding: 12, marginBottom: 12,
  },
  serieItem: { flex: 1, alignItems: 'center' },
  serieValue: { fontSize: F.md, fontWeight: '700', color: C.textPrimary },
  serieLabel: { fontSize: F.xs, color: C.textTertiary, marginTop: 2 },
  serieDivider: { width: 1, backgroundColor: C.border, marginHorizontal: 4 },
  descCard: {
    backgroundColor: C.primaryBg, borderRadius: R.lg,
    padding: 12, marginBottom: 14,
  },
  descText: { fontSize: F.sm, color: C.primary, lineHeight: 17 },
  actions: { flexDirection: 'row', gap: 10 },
  verBtn: {
    flex: 0.4, paddingVertical: 13, borderRadius: R.lg,
    backgroundColor: C.bgGray, alignItems: 'center',
    borderWidth: 1, borderColor: C.border,
  },
  verBtnText: { fontSize: F.sm, fontWeight: '600', color: C.textPrimary },
  agregarBtn: {
    flex: 0.6, paddingVertical: 13, borderRadius: R.lg,
    backgroundColor: C.primary, alignItems: 'center',
  },
  agregarBtnText: { fontSize: F.sm, fontWeight: '700', color: C.white },
});
