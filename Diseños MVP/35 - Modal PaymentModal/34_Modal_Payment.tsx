/**
 * 34 — Modal: Pago / Confirmar cobro
 * Tipo: Modal / Bottom Sheet — Coach
 * Descripción: Modal para registrar o confirmar un pago de atleta.
 * El coach puede marcar como pagado, elegir monto y dejar una nota.
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
  onConfirm: (monto: string, nota: string) => void;
  atletaNombre?: string;
  montoDefault?: string;
}

export default function ModalPayment({
  visible, onClose, onConfirm,
  atletaNombre = 'Martina López',
  montoDefault = '12000',
}: Props) {
  const [monto, setMonto] = useState(montoDefault);
  const [nota, setNota] = useState('');
  const [metodo, setMetodo] = useState<'transferencia' | 'efectivo' | 'otro'>('transferencia');

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <KeyboardAvoidingView
        style={styles.overlay}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <TouchableOpacity style={styles.backdrop} onPress={onClose} activeOpacity={1} />
        <View style={styles.sheet}>
          <View style={styles.handle} />

          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.title}>Registrar pago</Text>
              <Text style={styles.sub}>{atletaNombre}</Text>
            </View>
            <View style={styles.atletaAvatar}>
              <Text style={styles.atletaAvatarText}>{atletaNombre[0]}</Text>
            </View>
          </View>

          {/* Monto */}
          <Text style={styles.fieldLabel}>Monto recibido</Text>
          <View style={styles.montoRow}>
            <Text style={styles.montoSign}>$</Text>
            <TextInput
              style={styles.montoInput}
              value={monto}
              onChangeText={setMonto}
              keyboardType="numeric"
              placeholder="0"
              placeholderTextColor={C.textDisabled}
            />
          </View>

          {/* Método */}
          <Text style={styles.fieldLabel}>Método de pago</Text>
          <View style={styles.metodosRow}>
            {(['transferencia', 'efectivo', 'otro'] as const).map(m => (
              <TouchableOpacity
                key={m}
                style={[styles.metodoBtn, metodo === m && styles.metodoBtnActive]}
                onPress={() => setMetodo(m)}
                activeOpacity={0.8}
              >
                <Text style={[styles.metodoText, metodo === m && styles.metodoTextActive]}>
                  {m === 'transferencia' ? 'Transferencia' : m === 'efectivo' ? 'Efectivo' : 'Otro'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Nota */}
          <Text style={styles.fieldLabel}>Nota (opcional)</Text>
          <TextInput
            style={styles.notaInput}
            placeholder="Ej: pago adelantado"
            placeholderTextColor={C.textDisabled}
            value={nota}
            onChangeText={setNota}
          />

          {/* Mes */}
          <View style={styles.mesRow}>
            <Text style={styles.mesLabel}>Mes correspondiente</Text>
            <Text style={styles.mesValue}>Mayo 2026</Text>
          </View>

          <TouchableOpacity
            style={[styles.confirmBtn, !monto.trim() && styles.confirmBtnDisabled]}
            onPress={() => monto.trim() && onConfirm(monto, nota)}
            disabled={!monto.trim()}
            activeOpacity={0.85}
          >
            <Text style={styles.confirmBtnText}>✓ Confirmar pago</Text>
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
    alignItems: 'flex-start', marginBottom: 20,
  },
  title: { fontSize: F['2xl'], fontWeight: '800', color: C.textPrimary },
  sub: { fontSize: F.sm, color: C.textTertiary, marginTop: 2 },
  atletaAvatar: {
    width: 42, height: 42, borderRadius: 21,
    backgroundColor: '#E8F5E9', alignItems: 'center', justifyContent: 'center',
  },
  atletaAvatarText: { fontSize: F.lg, fontWeight: '700', color: '#2E7D32' },
  fieldLabel: {
    fontSize: F.sm, fontWeight: '600', color: C.textSecondary,
    marginBottom: 8, marginTop: 4,
  },
  montoRow: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: C.bgGray, borderRadius: R.lg,
    paddingHorizontal: 14, marginBottom: 14,
  },
  montoSign: { fontSize: F['2xl'], fontWeight: '700', color: C.textTertiary, marginRight: 4 },
  montoInput: {
    flex: 1, fontSize: F['3xl'], fontWeight: '800',
    color: C.textPrimary, paddingVertical: 12,
  },
  metodosRow: { flexDirection: 'row', gap: 8, marginBottom: 14 },
  metodoBtn: {
    flex: 1, paddingVertical: 9, borderRadius: R.lg,
    backgroundColor: C.white, borderWidth: 1, borderColor: C.border,
    alignItems: 'center',
  },
  metodoBtnActive: { backgroundColor: C.primaryBg, borderColor: C.primary },
  metodoText: { fontSize: F.sm, color: C.textSecondary },
  metodoTextActive: { color: C.primary, fontWeight: '700' },
  notaInput: {
    backgroundColor: C.bgGray, borderRadius: R.lg,
    paddingHorizontal: 14, paddingVertical: 10,
    fontSize: F.sm, color: C.textPrimary, marginBottom: 14,
  },
  mesRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: C.bgGray, borderRadius: R.lg,
    paddingHorizontal: 14, paddingVertical: 12, marginBottom: 16,
  },
  mesLabel: { fontSize: F.sm, color: C.textSecondary },
  mesValue: { fontSize: F.sm, fontWeight: '700', color: C.primary },
  confirmBtn: {
    backgroundColor: C.primary, borderRadius: R.lg,
    paddingVertical: 14, alignItems: 'center', marginBottom: 10,
  },
  confirmBtnDisabled: { backgroundColor: C.border },
  confirmBtnText: { fontSize: F.md, fontWeight: '700', color: C.white },
  cancelBtn: { alignItems: 'center', paddingVertical: 8 },
  cancelBtnText: { fontSize: F.sm, color: C.textTertiary },
});
