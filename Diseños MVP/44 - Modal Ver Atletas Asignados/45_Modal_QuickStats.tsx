/**
 * 45 — Modal: Stats Rápidas del Atleta (Bottom Sheet inline)
 * Tipo: Modal / Bottom Sheet — Coach
 * Descripción: Vista rápida de estadísticas de un atleta desde la lista.
 * Aparece al hacer long press o al tocar un chip de resumen.
 */

import React from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  Modal,
} from 'react-native';
import { C, F, R, S } from './KleosTheme';

interface Props {
  visible: boolean;
  onClose: () => void;
  onVerPerfil?: () => void;
}

export default function ModalQuickStats({ visible, onClose, onVerPerfil }: Props) {
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.backdrop} onPress={onClose} activeOpacity={1} />
        <View style={styles.sheet}>
          <View style={styles.handle} />

          {/* Atleta */}
          <View style={styles.atletaHeader}>
            <View style={styles.atletaAvatar}>
              <Text style={styles.atletaAvatarText}>M</Text>
            </View>
            <View style={styles.atletaInfo}>
              <Text style={styles.atletaNombre}>Martina López</Text>
              <Text style={styles.atletaPlan}>Plan 10K Base · Sem 5/8</Text>
            </View>
            <View style={styles.estadoBadge}>
              <Text style={styles.estadoText}>Al día</Text>
            </View>
          </View>

          {/* Stats */}
          <View style={styles.statsGrid}>
            {[
              { label: 'Sesiones esta semana', value: '2 / 5', icon: '📋' },
              { label: 'Km esta semana', value: '18.4 km', icon: '📍' },
              { label: 'Último RPE', value: '7/10', icon: '💪' },
              { label: 'Racha actual', value: '4 días 🔥', icon: '⚡' },
            ].map(s => (
              <View key={s.label} style={styles.statCard}>
                <Text style={styles.statIcon}>{s.icon}</Text>
                <Text style={styles.statValue}>{s.value}</Text>
                <Text style={styles.statLabel}>{s.label}</Text>
              </View>
            ))}
          </View>

          {/* Próximo entreno */}
          <View style={styles.nextCard}>
            <Text style={styles.nextLabel}>Próximo entreno</Text>
            <View style={styles.nextRow}>
              <Text style={styles.nextNombre}>Intervalo 5×1km</Text>
              <View style={styles.nextBadge}>
                <Text style={styles.nextBadgeText}>Hoy</Text>
              </View>
            </View>
            <Text style={styles.nextMeta}>Running · Zona 4 · 55 min</Text>
          </View>

          {/* Acciones */}
          <View style={styles.actions}>
            <TouchableOpacity style={styles.actionBtn} activeOpacity={0.8}>
              <Text style={styles.actionBtnText}>💬 Chat</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionBtn, styles.actionBtnPrimary]}
              onPress={onVerPerfil}
              activeOpacity={0.8}
            >
              <Text style={styles.actionBtnPrimaryText}>Ver perfil completo →</Text>
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
    padding: 20, paddingBottom: 34,
  },
  handle: {
    width: 40, height: 4, borderRadius: 2, backgroundColor: C.border,
    alignSelf: 'center', marginBottom: 16,
  },
  atletaHeader: {
    flexDirection: 'row', alignItems: 'center',
    gap: 12, marginBottom: 16,
  },
  atletaAvatar: {
    width: 48, height: 48, borderRadius: 24,
    backgroundColor: '#E8F5E9', alignItems: 'center', justifyContent: 'center',
  },
  atletaAvatarText: { fontSize: F.xl, fontWeight: '700', color: '#2E7D32' },
  atletaInfo: { flex: 1 },
  atletaNombre: { fontSize: F.lg, fontWeight: '700', color: C.textPrimary },
  atletaPlan: { fontSize: F.xs, color: C.textTertiary, marginTop: 2 },
  estadoBadge: {
    backgroundColor: C.successBg, borderRadius: R.xs,
    paddingHorizontal: 10, paddingVertical: 4,
  },
  estadoText: { fontSize: F.xs, fontWeight: '600', color: C.success },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 14 },
  statCard: {
    width: '47%', backgroundColor: C.bgGray, borderRadius: R.lg,
    padding: 12, alignItems: 'flex-start',
  },
  statIcon: { fontSize: 18, marginBottom: 4 },
  statValue: { fontSize: F.lg, fontWeight: '700', color: C.textPrimary, marginBottom: 2 },
  statLabel: { fontSize: F.xs, color: C.textTertiary },
  nextCard: {
    backgroundColor: C.primaryBg, borderRadius: R.lg,
    padding: 12, marginBottom: 14,
  },
  nextLabel: { fontSize: F.xs, color: C.textTertiary, marginBottom: 5 },
  nextRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 3 },
  nextNombre: { fontSize: F.md, fontWeight: '700', color: C.primary },
  nextBadge: {
    backgroundColor: C.primary, borderRadius: R.xs,
    paddingHorizontal: 7, paddingVertical: 2,
  },
  nextBadgeText: { fontSize: F.xs, fontWeight: '700', color: C.white },
  nextMeta: { fontSize: F.xs, color: C.textTertiary },
  actions: { flexDirection: 'row', gap: 10 },
  actionBtn: {
    flex: 1, paddingVertical: 13, borderRadius: R.lg,
    backgroundColor: C.bgGray, alignItems: 'center',
    borderWidth: 1, borderColor: C.border,
  },
  actionBtnPrimary: { backgroundColor: C.primary, borderColor: C.primary },
  actionBtnText: { fontSize: F.sm, fontWeight: '600', color: C.textPrimary },
  actionBtnPrimaryText: { fontSize: F.sm, fontWeight: '700', color: C.white },
});
