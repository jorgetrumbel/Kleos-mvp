/**
 * 40 — Modal: Confirmar Acción
 * Tipo: Modal de confirmación genérico — Ambos
 * Descripción: Modal de confirmación reutilizable para acciones destructivas
 * o irreversibles (dar de baja, eliminar plan, cancelar suscripción, etc).
 */

import React from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, Modal,
} from 'react-native';
import { C, F, R } from './KleosTheme';

interface Props {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  titulo?: string;
  mensaje?: string;
  labelConfirmar?: string;
  tipo?: 'danger' | 'warning' | 'info';
}

export default function ModalConfirmAction({
  visible,
  onClose,
  onConfirm,
  titulo = '¿Estás seguro?',
  mensaje = 'Esta acción no se puede deshacer.',
  labelConfirmar = 'Confirmar',
  tipo = 'danger',
}: Props) {
  const confirmColor = tipo === 'danger' ? C.error : tipo === 'warning' ? C.warning : C.primary;
  const iconMap = { danger: '⚠️', warning: '🔔', info: 'ℹ️' };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.backdrop} onPress={onClose} activeOpacity={1} />
        <View style={styles.dialog}>
          <View style={[styles.iconContainer, { backgroundColor: tipo === 'danger' ? C.errorBg : tipo === 'warning' ? C.warningBg : C.primaryBg }]}>
            <Text style={styles.iconText}>{iconMap[tipo]}</Text>
          </View>
          <Text style={styles.titulo}>{titulo}</Text>
          <Text style={styles.mensaje}>{mensaje}</Text>
          <View style={styles.actions}>
            <TouchableOpacity style={styles.cancelBtn} onPress={onClose} activeOpacity={0.8}>
              <Text style={styles.cancelBtnText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.confirmBtn, { backgroundColor: confirmColor }]}
              onPress={onConfirm}
              activeOpacity={0.85}
            >
              <Text style={styles.confirmBtnText}>{labelConfirmar}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1, justifyContent: 'center', alignItems: 'center',
    backgroundColor: C.overlay,
  },
  backdrop: { ...StyleSheet.absoluteFillObject },
  dialog: {
    backgroundColor: C.white, borderRadius: R['2xl'],
    padding: 24, width: '80%', alignItems: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15, shadowRadius: 20, elevation: 10,
  },
  iconContainer: {
    width: 60, height: 60, borderRadius: 30,
    alignItems: 'center', justifyContent: 'center', marginBottom: 14,
  },
  iconText: { fontSize: 28 },
  titulo: {
    fontSize: F.xl, fontWeight: '800', color: C.textPrimary,
    textAlign: 'center', marginBottom: 8,
  },
  mensaje: {
    fontSize: F.sm, color: C.textSecondary,
    textAlign: 'center', lineHeight: 18, marginBottom: 22,
  },
  actions: { flexDirection: 'row', gap: 10, width: '100%' },
  cancelBtn: {
    flex: 1, paddingVertical: 12, borderRadius: R.lg,
    backgroundColor: C.bgGray, alignItems: 'center',
    borderWidth: 1, borderColor: C.border,
  },
  cancelBtnText: { fontSize: F.sm, fontWeight: '600', color: C.textPrimary },
  confirmBtn: {
    flex: 1, paddingVertical: 12, borderRadius: R.lg, alignItems: 'center',
  },
  confirmBtnText: { fontSize: F.sm, fontWeight: '700', color: C.white },
});
