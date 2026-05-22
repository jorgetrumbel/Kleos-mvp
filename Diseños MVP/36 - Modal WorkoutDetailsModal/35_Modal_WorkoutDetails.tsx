/**
 * 35 — Modal: Detalles del Workout (Bottom sheet inline)
 * Tipo: Modal / Bottom Sheet — Coach
 * Descripción: Bottom sheet con detalles rápidos de un entrenamiento.
 * Aparece al tocar una sesión en el calendario o plan.
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
  onEdit?: () => void;
  onAssign?: () => void;
}

export default function ModalWorkoutDetails({ visible, onClose, onEdit, onAssign }: Props) {
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.backdrop} onPress={onClose} activeOpacity={1} />
        <View style={styles.sheet}>
          <View style={styles.handle} />

          {/* Título */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <View style={styles.headerIcon}>
                <Text style={styles.headerIconText}>🏃</Text>
              </View>
              <View>
                <Text style={styles.title}>Intervalo 5×1km</Text>
                <Text style={styles.sub}>Running · Zona 4</Text>
              </View>
            </View>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeIcon}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
            {/* Stats */}
            <View style={styles.statsRow}>
              {[
                { label: 'Duración', value: '55 min' },
                { label: 'Distancia', value: '~8 km' },
                { label: 'FC obj.', value: '155-175' },
              ].map(s => (
                <View key={s.label} style={styles.statItem}>
                  <Text style={styles.statValue}>{s.value}</Text>
                  <Text style={styles.statLabel}>{s.label}</Text>
                </View>
              ))}
            </View>

            {/* Descripción */}
            <View style={styles.descCard}>
              <Text style={styles.descTitle}>Descripción</Text>
              <Text style={styles.descText}>
                Calentamiento 10 min en Z1-2.{'\n'}
                5 repeticiones de 1km a ritmo objetivo (4:45–5:00 /km).{'\n'}
                Recuperación: 2 min de trote suave entre cada rep.{'\n'}
                Vuelta a la calma: 10 min.
              </Text>
            </View>

            {/* Atleta asignado */}
            <View style={styles.atletaRow}>
              <Text style={styles.atletaLabel}>Asignado a</Text>
              <View style={styles.atletaChip}>
                <View style={styles.atletaAvatar}>
                  <Text style={styles.atletaAvatarText}>M</Text>
                </View>
                <Text style={styles.atletaName}>Martina López</Text>
              </View>
            </View>

            {/* Estado */}
            <View style={styles.statusRow}>
              <Text style={styles.statusLabel}>Estado</Text>
              <View style={styles.statusBadge}>
                <View style={styles.statusDot} />
                <Text style={styles.statusText}>Pendiente · Hoy</Text>
              </View>
            </View>
          </ScrollView>

          {/* Acciones */}
          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.actionBtnSecondary}
              onPress={onEdit}
              activeOpacity={0.8}
            >
              <Text style={styles.actionBtnSecondaryText}>✏️ Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionBtnPrimary}
              onPress={onAssign}
              activeOpacity={0.8}
            >
              <Text style={styles.actionBtnPrimaryText}>Asignar a otro →</Text>
            </TouchableOpacity>
          </View>
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
    padding: 20, paddingBottom: 34, maxHeight: '85%',
  },
  handle: {
    width: 40, height: 4, borderRadius: 2, backgroundColor: C.border,
    alignSelf: 'center', marginBottom: 16,
  },
  header: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 16,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  headerIcon: {
    width: 44, height: 44, borderRadius: R.lg,
    backgroundColor: C.primaryBg, alignItems: 'center', justifyContent: 'center',
  },
  headerIconText: { fontSize: 24 },
  title: { fontSize: F.lg, fontWeight: '800', color: C.textPrimary },
  sub: { fontSize: F.xs, color: C.textTertiary, marginTop: 2 },
  closeIcon: { fontSize: 18, color: C.textTertiary, padding: 4 },
  scroll: { flex: 1 },
  statsRow: {
    flexDirection: 'row', backgroundColor: C.bgGray,
    borderRadius: R.lg, padding: 14, marginBottom: 14,
  },
  statItem: { flex: 1, alignItems: 'center' },
  statValue: { fontSize: F.md, fontWeight: '700', color: C.textPrimary },
  statLabel: { fontSize: F.xs, color: C.textTertiary, marginTop: 2 },
  descCard: {
    backgroundColor: C.bgGray, borderRadius: R.lg,
    padding: 14, marginBottom: 14,
  },
  descTitle: { fontSize: F.sm, fontWeight: '700', color: C.textSecondary, marginBottom: 8 },
  descText: { fontSize: F.sm, color: C.textPrimary, lineHeight: 20 },
  atletaRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    marginBottom: 10,
  },
  atletaLabel: { fontSize: F.sm, color: C.textTertiary },
  atletaChip: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: '#E8F5E9', borderRadius: R.full,
    paddingHorizontal: 10, paddingVertical: 5,
  },
  atletaAvatar: {
    width: 22, height: 22, borderRadius: 11,
    backgroundColor: '#2E7D32', alignItems: 'center', justifyContent: 'center',
  },
  atletaAvatarText: { fontSize: F.xs, fontWeight: '700', color: C.white },
  atletaName: { fontSize: F.sm, fontWeight: '600', color: '#2E7D32' },
  statusRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    marginBottom: 16,
  },
  statusLabel: { fontSize: F.sm, color: C.textTertiary },
  statusBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    backgroundColor: C.primaryBg, borderRadius: R.xs,
    paddingHorizontal: 10, paddingVertical: 4,
  },
  statusDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: C.primary },
  statusText: { fontSize: F.xs, fontWeight: '600', color: C.primary },
  actions: { flexDirection: 'row', gap: 10, marginTop: 4 },
  actionBtnSecondary: {
    flex: 1, paddingVertical: 13, borderRadius: R.lg,
    backgroundColor: C.bgGray, alignItems: 'center',
    borderWidth: 1, borderColor: C.border,
  },
  actionBtnSecondaryText: { fontSize: F.sm, fontWeight: '600', color: C.textPrimary },
  actionBtnPrimary: {
    flex: 1, paddingVertical: 13, borderRadius: R.lg,
    backgroundColor: C.primary, alignItems: 'center',
  },
  actionBtnPrimaryText: { fontSize: F.sm, fontWeight: '700', color: C.white },
});
