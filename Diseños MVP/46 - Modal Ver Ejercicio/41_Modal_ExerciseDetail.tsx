/**
 * 41 — Modal: Ver Ejercicio (Bottom Sheet inline)
 * Tipo: Modal / Bottom Sheet — Coach
 * Descripción: Bottom sheet con el detalle completo de un ejercicio.
 * Muestra descripción, músculos, series recomendadas y variantes.
 */

import React from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  ScrollView, Modal,
} from 'react-native';
import { C, F, R, S } from './KleosTheme';

interface Props {
  visible: boolean;
  onClose: () => void;
  onAgregar?: () => void;
}

export default function ModalExerciseDetail({ visible, onClose, onAgregar }: Props) {
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.backdrop} onPress={onClose} activeOpacity={1} />
        <View style={styles.sheet}>
          <View style={styles.handle} />

          {/* Header */}
          <View style={styles.header}>
            <View style={styles.ejercicioIcon}>
              <Text style={styles.ejercicioIconText}>💪</Text>
            </View>
            <View style={styles.headerInfo}>
              <Text style={styles.titulo}>Sentadilla con barra</Text>
              <View style={styles.tagsRow}>
                <View style={styles.tag}>
                  <Text style={styles.tagText}>Piernas</Text>
                </View>
                <View style={[styles.tag, styles.tagNivel]}>
                  <Text style={[styles.tagText, styles.tagNivelText]}>Intermedio</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeIcon}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
            {/* Video placeholder */}
            <View style={styles.videoPlaceholder}>
              <Text style={styles.videoIcon}>▶</Text>
              <Text style={styles.videoText}>Ver demostración</Text>
            </View>

            {/* Músculos */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Músculos trabajados</Text>
              <View style={styles.musculosList}>
                {['Cuádriceps', 'Glúteos', 'Isquiotibiales', 'Core'].map(m => (
                  <View key={m} style={styles.musculoTag}>
                    <Text style={styles.musculoText}>{m}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Descripción */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Técnica</Text>
              <Text style={styles.descText}>
                1. Coloca la barra sobre los trapecios, pies al ancho de hombros.{'\n'}
                2. Baja manteniendo la espalda recta y las rodillas alineadas con los pies.{'\n'}
                3. Baja hasta que los muslos estén paralelos al suelo.{'\n'}
                4. Sube empujando a través de los talones.
              </Text>
            </View>

            {/* Series recomendadas */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Series recomendadas</Text>
              <View style={styles.seriesGrid}>
                {[
                  { label: 'Series', value: '3–4' },
                  { label: 'Repeticiones', value: '8–12' },
                  { label: 'Descanso', value: '90 seg' },
                  { label: 'Tempo', value: '2-1-2' },
                ].map(s => (
                  <View key={s.label} style={styles.serieItem}>
                    <Text style={styles.serieValue}>{s.value}</Text>
                    <Text style={styles.serieLabel}>{s.label}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Variantes */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Variantes</Text>
              {['Sentadilla goblet', 'Sentadilla sumo', 'Sentadilla búlgara'].map(v => (
                <View key={v} style={styles.varianteRow}>
                  <Text style={styles.varianteIcon}>→</Text>
                  <Text style={styles.varianteText}>{v}</Text>
                </View>
              ))}
            </View>
          </ScrollView>

          {/* Agregar */}
          <TouchableOpacity style={styles.agregarBtn} onPress={onAgregar} activeOpacity={0.85}>
            <Text style={styles.agregarBtnText}>+ Agregar al plan</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: 'flex-end' },
  backdrop: { ...StyleSheet.absoluteFillObject, backgroundColor: C.overlay },
  sheet: {
    backgroundColor: C.white, borderTopLeftRadius: 24, borderTopRightRadius: 24,
    padding: 20, paddingBottom: 34, maxHeight: '90%',
  },
  handle: {
    width: 40, height: 4, borderRadius: 2, backgroundColor: C.border,
    alignSelf: 'center', marginBottom: 16,
  },
  header: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, marginBottom: 16 },
  ejercicioIcon: {
    width: 48, height: 48, borderRadius: R.lg,
    backgroundColor: C.primaryBg, alignItems: 'center', justifyContent: 'center',
  },
  ejercicioIconText: { fontSize: 26 },
  headerInfo: { flex: 1 },
  titulo: { fontSize: F.xl, fontWeight: '800', color: C.textPrimary, marginBottom: 5 },
  tagsRow: { flexDirection: 'row', gap: 6 },
  tag: { backgroundColor: C.bgGray, borderRadius: R.xs, paddingHorizontal: 8, paddingVertical: 3 },
  tagText: { fontSize: F.xs, color: C.textSecondary },
  tagNivel: { backgroundColor: C.primaryBg },
  tagNivelText: { color: C.primary, fontWeight: '600' },
  closeIcon: { fontSize: 18, color: C.textTertiary, padding: 4 },
  scroll: { flex: 1 },
  videoPlaceholder: {
    backgroundColor: C.bgGray, borderRadius: R.xl,
    height: 130, alignItems: 'center', justifyContent: 'center',
    marginBottom: 16, gap: 8,
  },
  videoIcon: { fontSize: 32, color: C.primary },
  videoText: { fontSize: F.sm, fontWeight: '600', color: C.primary },
  section: { marginBottom: 16 },
  sectionTitle: { fontSize: F.md, fontWeight: '700', color: C.textPrimary, marginBottom: 10 },
  musculosList: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  musculoTag: {
    backgroundColor: C.primaryBg, borderRadius: R.full,
    paddingHorizontal: 12, paddingVertical: 5,
  },
  musculoText: { fontSize: F.sm, fontWeight: '600', color: C.primary },
  descText: { fontSize: F.sm, color: C.textSecondary, lineHeight: 20 },
  seriesGrid: { flexDirection: 'row', gap: 8 },
  serieItem: {
    flex: 1, backgroundColor: C.bgGray, borderRadius: R.lg,
    padding: 12, alignItems: 'center',
  },
  serieValue: { fontSize: F.md, fontWeight: '700', color: C.textPrimary },
  serieLabel: { fontSize: F.xs, color: C.textTertiary, marginTop: 2, textAlign: 'center' },
  varianteRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 },
  varianteIcon: { fontSize: F.md, color: C.primary, fontWeight: '700' },
  varianteText: { fontSize: F.sm, color: C.textSecondary },
  agregarBtn: {
    backgroundColor: C.primary, borderRadius: R.lg,
    paddingVertical: 14, alignItems: 'center', marginTop: 8,
  },
  agregarBtnText: { fontSize: F.md, fontWeight: '700', color: C.white },
});
