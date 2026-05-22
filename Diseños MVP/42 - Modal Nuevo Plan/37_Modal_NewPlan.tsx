/**
 * 37 — Modal: Nuevo Plan
 * Tipo: Modal / Bottom Sheet — Coach
 * Descripción: Modal para crear un nuevo plan de entrenamiento.
 * El coach define nombre, duración, tipo y atleta destino.
 */

import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  TextInput, Modal, KeyboardAvoidingView, Platform, ScrollView,
} from 'react-native';
import { C, F, R } from './KleosTheme';

interface Props {
  visible: boolean;
  onClose: () => void;
  onCreate: (plan: { nombre: string; semanas: number; tipo: string }) => void;
}

const TIPOS = ['Running', 'Fuerza', 'Triatlón', 'CrossFit', 'Personalizado'];

export default function ModalNewPlan({ visible, onClose, onCreate }: Props) {
  const [nombre, setNombre] = useState('');
  const [semanas, setSemanas] = useState(8);
  const [tipo, setTipo] = useState('Running');

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <KeyboardAvoidingView
        style={styles.overlay}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <TouchableOpacity style={styles.backdrop} onPress={onClose} activeOpacity={1} />
        <View style={styles.sheet}>
          <View style={styles.handle} />
          <Text style={styles.title}>Nuevo plan</Text>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Nombre */}
            <Text style={styles.fieldLabel}>Nombre del plan *</Text>
            <TextInput
              style={styles.input}
              placeholder="Ej: Plan 10K Base"
              placeholderTextColor={C.textDisabled}
              value={nombre}
              onChangeText={setNombre}
            />

            {/* Tipo */}
            <Text style={styles.fieldLabel}>Tipo</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tiposScroll}>
              <View style={styles.tiposRow}>
                {TIPOS.map(t => (
                  <TouchableOpacity
                    key={t}
                    style={[styles.tipoBtn, tipo === t && styles.tipoBtnActive]}
                    onPress={() => setTipo(t)}
                    activeOpacity={0.8}
                  >
                    <Text style={[styles.tipoText, tipo === t && styles.tipoTextActive]}>{t}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>

            {/* Duración */}
            <Text style={styles.fieldLabel}>Duración</Text>
            <View style={styles.semControl}>
              <TouchableOpacity
                style={styles.semBtn}
                onPress={() => setSemanas(Math.max(1, semanas - 1))}
                activeOpacity={0.8}
              >
                <Text style={styles.semBtnText}>−</Text>
              </TouchableOpacity>
              <Text style={styles.semValue}>{semanas} semanas</Text>
              <TouchableOpacity
                style={styles.semBtn}
                onPress={() => setSemanas(semanas + 1)}
                activeOpacity={0.8}
              >
                <Text style={styles.semBtnText}>+</Text>
              </TouchableOpacity>
            </View>

            {/* Atleta */}
            <Text style={styles.fieldLabel}>Atleta destino</Text>
            <TouchableOpacity style={styles.atletaSelect}>
              <Text style={styles.atletaSelectText}>Seleccionar atleta →</Text>
            </TouchableOpacity>

            {/* Info */}
            <View style={styles.infoBox}>
              <Text style={styles.infoText}>
                💡 Una vez creado, podrás agregar sesiones semana a semana desde el editor de plan.
              </Text>
            </View>
          </ScrollView>

          <TouchableOpacity
            style={[styles.createBtn, !nombre.trim() && styles.createBtnDisabled]}
            onPress={() => nombre.trim() && onCreate({ nombre, semanas, tipo })}
            disabled={!nombre.trim()}
            activeOpacity={0.85}
          >
            <Text style={styles.createBtnText}>Crear plan</Text>
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
    padding: 20, paddingBottom: 34, maxHeight: '85%',
  },
  handle: {
    width: 40, height: 4, borderRadius: 2, backgroundColor: C.border,
    alignSelf: 'center', marginBottom: 16,
  },
  title: { fontSize: F['2xl'], fontWeight: '800', color: C.textPrimary, marginBottom: 16 },
  fieldLabel: { fontSize: F.sm, fontWeight: '600', color: C.textSecondary, marginBottom: 8, marginTop: 4 },
  input: {
    backgroundColor: C.bgGray, borderRadius: R.lg,
    paddingHorizontal: 14, paddingVertical: 12,
    fontSize: F.md, color: C.textPrimary, marginBottom: 14,
  },
  tiposScroll: { marginBottom: 14 },
  tiposRow: { flexDirection: 'row', gap: 8 },
  tipoBtn: {
    paddingHorizontal: 14, paddingVertical: 7, borderRadius: R.full,
    backgroundColor: C.bgGray, borderWidth: 1, borderColor: C.border,
  },
  tipoBtnActive: { backgroundColor: C.primary, borderColor: C.primary },
  tipoText: { fontSize: F.sm, color: C.textSecondary },
  tipoTextActive: { color: C.white, fontWeight: '700' },
  semControl: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: C.bgGray, borderRadius: R.lg,
    overflow: 'hidden', marginBottom: 14,
  },
  semBtn: {
    width: 48, height: 46, alignItems: 'center', justifyContent: 'center',
    backgroundColor: C.white, borderWidth: 1, borderColor: C.border,
  },
  semBtnText: { fontSize: F['2xl'], color: C.textPrimary, fontWeight: '600' },
  semValue: {
    flex: 1, textAlign: 'center',
    fontSize: F.md, fontWeight: '700', color: C.textPrimary,
  },
  atletaSelect: {
    backgroundColor: C.bgGray, borderRadius: R.lg,
    paddingHorizontal: 14, paddingVertical: 13, marginBottom: 14,
  },
  atletaSelectText: { fontSize: F.sm, color: C.primary, fontWeight: '600' },
  infoBox: {
    backgroundColor: C.primaryBg, borderRadius: R.lg,
    padding: 12, marginBottom: 16,
  },
  infoText: { fontSize: F.sm, color: C.primary, lineHeight: 17 },
  createBtn: {
    backgroundColor: C.primary, borderRadius: R.lg,
    paddingVertical: 14, alignItems: 'center', marginBottom: 10,
  },
  createBtnDisabled: { backgroundColor: C.border },
  createBtnText: { fontSize: F.md, fontWeight: '700', color: C.white },
  cancelBtn: { alignItems: 'center', paddingVertical: 8 },
  cancelBtnText: { fontSize: F.sm, color: C.textTertiary },
});
