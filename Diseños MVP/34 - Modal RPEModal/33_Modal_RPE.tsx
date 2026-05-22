/**
 * 33 — Modal: Registro de RPE
 * Tipo: Modal / Bottom Sheet
 * Descripción: Modal que aparece al completar un entreno para registrar el
 * esfuerzo percibido (RPE) y una nota opcional.
 */

import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  TextInput, KeyboardAvoidingView, Platform, Modal,
} from 'react-native';
import { C, F, R } from './KleosTheme';

interface Props {
  visible: boolean;
  onClose: () => void;
  onConfirm: (rpe: number, nota: string) => void;
  entrenoNombre?: string;
}

export default function ModalRPE({ visible, onClose, onConfirm, entrenoNombre = 'Intervalo 5×1km' }: Props) {
  const [rpe, setRpe] = useState<number | null>(null);
  const [nota, setNota] = useState('');

  const rpeLabels: Record<number, string> = {
    1: 'Muy fácil 😌', 2: 'Fácil 😊', 3: 'Moderado fácil 💚',
    4: 'Moderado 💛', 5: 'Algo duro 🔥',
    6: 'Duro 💪', 7: 'Muy duro 😤', 8: 'Extremadamente duro 😰',
    9: 'Casi máximo 🫠', 10: 'Máximo esfuerzo 💥',
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <KeyboardAvoidingView
        style={styles.overlay}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <TouchableOpacity style={styles.backdrop} onPress={onClose} activeOpacity={1} />
        <View style={styles.sheet}>
          <View style={styles.handle} />
          <Text style={styles.title}>¿Cómo te sentiste?</Text>
          <Text style={styles.sub}>{entrenoNombre}</Text>

          {/* Grid RPE */}
          <View style={styles.rpeGrid}>
            {Array.from({ length: 10 }, (_, i) => i + 1).map(n => (
              <TouchableOpacity
                key={n}
                style={[styles.rpeBtn, rpe === n && styles.rpeBtnActive]}
                onPress={() => setRpe(n)}
                activeOpacity={0.8}
              >
                <Text style={[styles.rpeBtnNum, rpe === n && styles.rpeBtnNumActive]}>{n}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {rpe !== null && (
            <View style={styles.rpeLabel}>
              <Text style={styles.rpeLabelText}>{rpeLabels[rpe]}</Text>
            </View>
          )}

          {/* Nota opcional */}
          <TextInput
            style={styles.notaInput}
            placeholder="Nota opcional (ej: me dolió la rodilla izquierda)"
            placeholderTextColor={C.textDisabled}
            value={nota}
            onChangeText={setNota}
            multiline
          />

          <TouchableOpacity
            style={[styles.confirmBtn, rpe === null && styles.confirmBtnDisabled]}
            onPress={() => rpe !== null && onConfirm(rpe, nota)}
            disabled={rpe === null}
            activeOpacity={0.85}
          >
            <Text style={styles.confirmBtnText}>Confirmar entrenamiento</Text>
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
  title: { fontSize: F['2xl'], fontWeight: '800', color: C.textPrimary, marginBottom: 4 },
  sub: { fontSize: F.sm, color: C.textTertiary, marginBottom: 20 },
  rpeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 12 },
  rpeBtn: {
    width: '17%', aspectRatio: 1, borderRadius: R.lg,
    backgroundColor: C.bgGray, alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: C.border,
  },
  rpeBtnActive: { backgroundColor: C.primary, borderColor: C.primary },
  rpeBtnNum: { fontSize: F.lg, fontWeight: '700', color: C.textSecondary },
  rpeBtnNumActive: { color: C.white },
  rpeLabel: {
    backgroundColor: C.primaryBg, borderRadius: R.lg,
    paddingVertical: 10, paddingHorizontal: 14, marginBottom: 14, alignItems: 'center',
  },
  rpeLabelText: { fontSize: F.md, fontWeight: '700', color: C.primary },
  notaInput: {
    backgroundColor: C.bgGray, borderRadius: R.lg,
    paddingHorizontal: 14, paddingVertical: 12,
    fontSize: F.sm, color: C.textPrimary, minHeight: 72,
    textAlignVertical: 'top', marginBottom: 16,
  },
  confirmBtn: {
    backgroundColor: C.primary, borderRadius: R.lg,
    paddingVertical: 14, alignItems: 'center', marginBottom: 10,
  },
  confirmBtnDisabled: { backgroundColor: C.border },
  confirmBtnText: { fontSize: F.md, fontWeight: '700', color: C.white },
  cancelBtn: { alignItems: 'center', paddingVertical: 8 },
  cancelBtnText: { fontSize: F.sm, color: C.textTertiary },
});
