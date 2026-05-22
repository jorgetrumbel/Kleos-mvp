/**
 * 42 — Modal: Recordatorio de Pago al Atleta
 * Tipo: Modal / Bottom Sheet — Coach
 * Descripción: Bottom sheet para enviar un recordatorio de pago personalizado
 * al atleta. El coach puede editar el mensaje antes de enviarlo.
 */

import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  TextInput, Modal, KeyboardAvoidingView, Platform,
} from 'react-native';
import { C, F, R } from './KleosTheme';

interface Props {
  visible: boolean;
  onClose: () => void;
  onSend: (mensaje: string) => void;
  atletaNombre?: string;
  monto?: string;
}

export default function ModalCoachPaymentReminder({
  visible, onClose, onSend,
  atletaNombre = 'Martina López',
  monto = '$12.000',
}: Props) {
  const [mensaje, setMensaje] = useState(
    `Hola ${atletaNombre}! Te recuerdo que tenés un pago pendiente de ${monto} correspondiente a Junio 2026. Cualquier duda me avisás 🙌`
  );

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <KeyboardAvoidingView
        style={styles.overlay}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <TouchableOpacity style={styles.backdrop} onPress={onClose} activeOpacity={1} />
        <View style={styles.sheet}>
          <View style={styles.handle} />

          <View style={styles.header}>
            <View>
              <Text style={styles.title}>Recordatorio de pago</Text>
              <Text style={styles.sub}>Se enviará por chat a {atletaNombre}</Text>
            </View>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{atletaNombre[0]}</Text>
            </View>
          </View>

          {/* Deuda info */}
          <View style={styles.deudaCard}>
            <Text style={styles.deudaLabel}>Monto pendiente</Text>
            <Text style={styles.deudaValue}>{monto}</Text>
            <Text style={styles.deudaMes}>Junio 2026 · Vence 01/06</Text>
          </View>

          {/* Mensaje */}
          <Text style={styles.fieldLabel}>Mensaje</Text>
          <TextInput
            style={styles.mensajeInput}
            value={mensaje}
            onChangeText={setMensaje}
            multiline
            placeholder="Escribí tu mensaje..."
            placeholderTextColor={C.textDisabled}
          />

          <Text style={styles.hint}>El atleta lo recibirá como un mensaje en el chat.</Text>

          <TouchableOpacity
            style={styles.sendBtn}
            onPress={() => onSend(mensaje)}
            activeOpacity={0.85}
          >
            <Text style={styles.sendBtnText}>📩 Enviar recordatorio</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
            <Text style={styles.cancelBtnText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
  header: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'flex-start', marginBottom: 16,
  },
  title: { fontSize: F['2xl'], fontWeight: '800', color: C.textPrimary },
  sub: { fontSize: F.sm, color: C.textTertiary, marginTop: 2 },
  avatar: {
    width: 42, height: 42, borderRadius: 21,
    backgroundColor: '#E8F5E9', alignItems: 'center', justifyContent: 'center',
  },
  avatarText: { fontSize: F.lg, fontWeight: '700', color: '#2E7D32' },
  deudaCard: {
    backgroundColor: C.warningBg, borderRadius: R.lg,
    padding: 14, marginBottom: 16,
    borderWidth: 1, borderColor: 'rgba(230,81,0,0.15)',
  },
  deudaLabel: { fontSize: F.xs, color: C.textTertiary, marginBottom: 4 },
  deudaValue: { fontSize: F['3xl'], fontWeight: '800', color: C.warning },
  deudaMes: { fontSize: F.sm, color: C.textSecondary, marginTop: 3 },
  fieldLabel: { fontSize: F.sm, fontWeight: '600', color: C.textSecondary, marginBottom: 8 },
  mensajeInput: {
    backgroundColor: C.bgGray, borderRadius: R.lg,
    paddingHorizontal: 14, paddingVertical: 12,
    fontSize: F.sm, color: C.textPrimary, lineHeight: 18,
    minHeight: 100, textAlignVertical: 'top', marginBottom: 6,
  },
  hint: { fontSize: F.xs, color: C.textDisabled, marginBottom: 16 },
  sendBtn: {
    backgroundColor: C.primary, borderRadius: R.lg,
    paddingVertical: 14, alignItems: 'center', marginBottom: 10,
  },
  sendBtnText: { fontSize: F.md, fontWeight: '700', color: C.white },
  cancelBtn: { alignItems: 'center', paddingVertical: 8 },
  cancelBtnText: { fontSize: F.sm, color: C.textTertiary },
});
