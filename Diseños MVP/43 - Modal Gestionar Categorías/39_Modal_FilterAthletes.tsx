/**
 * 39 — Modal: Filtrar / Ver Atletas
 * Tipo: Modal / Bottom Sheet — Coach
 * Descripción: Bottom sheet para filtrar atletas por plan, estado de pago,
 * o especialidad. Usado desde la lista de atletas.
 */

import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, Modal,
} from 'react-native';
import { C, F, R } from './KleosTheme';

interface Props {
  visible: boolean;
  onClose: () => void;
  onApply: (filtros: { pago: string; plan: string; orden: string }) => void;
}

export default function ModalFilterAthletes({ visible, onClose, onApply }: Props) {
  const [pago, setPago] = useState('todos');
  const [plan, setPlan] = useState('todos');
  const [orden, setOrden] = useState('nombre');

  const handleReset = () => {
    setPago('todos');
    setPlan('todos');
    setOrden('nombre');
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.backdrop} onPress={onClose} activeOpacity={1} />
        <View style={styles.sheet}>
          <View style={styles.handle} />
          <View style={styles.header}>
            <Text style={styles.title}>Filtros</Text>
            <TouchableOpacity onPress={handleReset}>
              <Text style={styles.resetText}>Limpiar</Text>
            </TouchableOpacity>
          </View>

          {/* Pago */}
          <Text style={styles.sectionLabel}>Estado de pago</Text>
          <View style={styles.optionsRow}>
            {[
              { key: 'todos', label: 'Todos' },
              { key: 'al_dia', label: 'Al día' },
              { key: 'pendiente', label: 'Con deuda' },
            ].map(opt => (
              <TouchableOpacity
                key={opt.key}
                style={[styles.optionBtn, pago === opt.key && styles.optionBtnActive]}
                onPress={() => setPago(opt.key)}
                activeOpacity={0.8}
              >
                <Text style={[styles.optionText, pago === opt.key && styles.optionTextActive]}>
                  {opt.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Plan */}
          <Text style={styles.sectionLabel}>Plan</Text>
          <View style={styles.optionsRow}>
            {[
              { key: 'todos', label: 'Todos' },
              { key: '10k', label: '10K Base' },
              { key: 'fuerza', label: 'Fuerza' },
              { key: 'triatlon', label: 'Triatlón' },
            ].map(opt => (
              <TouchableOpacity
                key={opt.key}
                style={[styles.optionBtn, plan === opt.key && styles.optionBtnActive]}
                onPress={() => setPlan(opt.key)}
                activeOpacity={0.8}
              >
                <Text style={[styles.optionText, plan === opt.key && styles.optionTextActive]}>
                  {opt.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Orden */}
          <Text style={styles.sectionLabel}>Ordenar por</Text>
          <View style={styles.optionsCol}>
            {[
              { key: 'nombre', label: 'Nombre A–Z' },
              { key: 'pago', label: 'Estado de pago primero' },
              { key: 'actividad', label: 'Última actividad' },
            ].map(opt => (
              <TouchableOpacity
                key={opt.key}
                style={styles.radioRow}
                onPress={() => setOrden(opt.key)}
                activeOpacity={0.7}
              >
                <View style={[styles.radio, orden === opt.key && styles.radioActive]}>
                  {orden === opt.key && <View style={styles.radioDot} />}
                </View>
                <Text style={styles.radioLabel}>{opt.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={styles.applyBtn}
            onPress={() => onApply({ pago, plan, orden })}
            activeOpacity={0.85}
          >
            <Text style={styles.applyBtnText}>Aplicar filtros</Text>
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
    padding: 20, paddingBottom: 34,
  },
  handle: {
    width: 40, height: 4, borderRadius: 2, backgroundColor: C.border,
    alignSelf: 'center', marginBottom: 16,
  },
  header: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 20,
  },
  title: { fontSize: F['2xl'], fontWeight: '800', color: C.textPrimary },
  resetText: { fontSize: F.sm, color: C.primary, fontWeight: '600' },
  sectionLabel: {
    fontSize: F.sm, fontWeight: '700', color: C.textSecondary, marginBottom: 10,
  },
  optionsRow: { flexDirection: 'row', gap: 8, marginBottom: 16, flexWrap: 'wrap' },
  optionBtn: {
    paddingHorizontal: 14, paddingVertical: 8, borderRadius: R.full,
    backgroundColor: C.bgGray, borderWidth: 1, borderColor: C.border,
  },
  optionBtnActive: { backgroundColor: C.primary, borderColor: C.primary },
  optionText: { fontSize: F.sm, color: C.textSecondary },
  optionTextActive: { color: C.white, fontWeight: '700' },
  optionsCol: { gap: 12, marginBottom: 20 },
  radioRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  radio: {
    width: 20, height: 20, borderRadius: 10,
    borderWidth: 2, borderColor: C.border,
    alignItems: 'center', justifyContent: 'center',
  },
  radioActive: { borderColor: C.primary },
  radioDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: C.primary },
  radioLabel: { fontSize: F.sm, color: C.textPrimary },
  applyBtn: {
    backgroundColor: C.primary, borderRadius: R.lg,
    paddingVertical: 14, alignItems: 'center',
  },
  applyBtnText: { fontSize: F.md, fontWeight: '700', color: C.white },
});
