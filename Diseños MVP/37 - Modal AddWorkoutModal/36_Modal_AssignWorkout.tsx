/**
 * 36 — Modal: Asignar Entrenamiento
 * Tipo: Modal / Bottom Sheet — Coach
 * Descripción: Bottom sheet para que el coach asigne un entrenamiento
 * de su biblioteca a uno o varios atletas.
 */

import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  ScrollView, Modal, TextInput,
} from 'react-native';
import { C, F, R, S } from './KleosTheme';

interface Props {
  visible: boolean;
  onClose: () => void;
  onAssign: (atletaIds: string[], fecha: string) => void;
}

const ATLETAS = [
  { id: '1', inicial: 'M', nombre: 'Martina López', plan: 'Plan 10K Base', color: '#E8F5E9', tc: '#2E7D32' },
  { id: '2', inicial: 'J', nombre: 'Javier Romero', plan: 'Fuerza Funcional', color: '#EBF4F5', tc: C.primary },
  { id: '3', inicial: 'C', nombre: 'Carlos Méndez', plan: 'Triatlón Sprint', color: '#FFF3E0', tc: C.warning },
  { id: '4', inicial: 'S', nombre: 'Sofía Paredes', plan: 'Plan 10K Base', color: '#F3E8FF', tc: '#7C3AED' },
];

export default function ModalAssignWorkout({ visible, onClose, onAssign }: Props) {
  const [selectedAtletas, setSelectedAtletas] = useState<string[]>(['1']);
  const [fecha, setFecha] = useState('21/05/2026');

  const toggleAtleta = (id: string) => {
    setSelectedAtletas(prev =>
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.backdrop} onPress={onClose} activeOpacity={1} />
        <View style={styles.sheet}>
          <View style={styles.handle} />
          <Text style={styles.title}>Asignar entrenamiento</Text>

          {/* Entreno seleccionado */}
          <View style={styles.entrenoCard}>
            <View style={styles.entrenoIcon}>
              <Text style={styles.entrenoIconText}>🏃</Text>
            </View>
            <View style={styles.entrenoInfo}>
              <Text style={styles.entrenoNombre}>Intervalo 5×1km</Text>
              <Text style={styles.entrenoMeta}>Running · Zona 4 · 55 min</Text>
            </View>
            <TouchableOpacity style={styles.cambiarBtn}>
              <Text style={styles.cambiarBtnText}>Cambiar</Text>
            </TouchableOpacity>
          </View>

          {/* Fecha */}
          <Text style={styles.fieldLabel}>Fecha</Text>
          <TextInput
            style={styles.fechaInput}
            value={fecha}
            onChangeText={setFecha}
            placeholder="DD/MM/AAAA"
            placeholderTextColor={C.textDisabled}
          />

          {/* Atletas */}
          <Text style={styles.fieldLabel}>Atleta(s)</Text>
          <ScrollView style={styles.atletasList} showsVerticalScrollIndicator={false}>
            {ATLETAS.map(atleta => {
              const selected = selectedAtletas.includes(atleta.id);
              return (
                <TouchableOpacity
                  key={atleta.id}
                  style={[styles.atletaRow, selected && styles.atletaRowSelected]}
                  onPress={() => toggleAtleta(atleta.id)}
                  activeOpacity={0.8}
                >
                  <View style={[styles.atletaAvatar, { backgroundColor: atleta.color }]}>
                    <Text style={[styles.atletaAvatarText, { color: atleta.tc }]}>{atleta.inicial}</Text>
                  </View>
                  <View style={styles.atletaInfo}>
                    <Text style={styles.atletaNombre}>{atleta.nombre}</Text>
                    <Text style={styles.atletaPlan}>{atleta.plan}</Text>
                  </View>
                  <View style={[styles.checkbox, selected && styles.checkboxSelected]}>
                    {selected && <Text style={styles.checkboxCheck}>✓</Text>}
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          <TouchableOpacity
            style={[styles.assignBtn, selectedAtletas.length === 0 && styles.assignBtnDisabled]}
            onPress={() => selectedAtletas.length > 0 && onAssign(selectedAtletas, fecha)}
            disabled={selectedAtletas.length === 0}
            activeOpacity={0.85}
          >
            <Text style={styles.assignBtnText}>
              Asignar a {selectedAtletas.length} atleta{selectedAtletas.length !== 1 ? 's' : ''}
            </Text>
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
  title: { fontSize: F['2xl'], fontWeight: '800', color: C.textPrimary, marginBottom: 16 },
  entrenoCard: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: C.primaryBg, borderRadius: R.lg,
    padding: 12, gap: 10, marginBottom: 16,
  },
  entrenoIcon: {
    width: 40, height: 40, borderRadius: R.md,
    backgroundColor: C.white, alignItems: 'center', justifyContent: 'center',
  },
  entrenoIconText: { fontSize: 22 },
  entrenoInfo: { flex: 1 },
  entrenoNombre: { fontSize: F.sm, fontWeight: '700', color: C.primary },
  entrenoMeta: { fontSize: F.xs, color: C.textTertiary, marginTop: 2 },
  cambiarBtn: {
    backgroundColor: C.white, borderRadius: R.sm,
    paddingHorizontal: 10, paddingVertical: 5,
  },
  cambiarBtnText: { fontSize: F.xs, fontWeight: '600', color: C.primary },
  fieldLabel: { fontSize: F.sm, fontWeight: '600', color: C.textSecondary, marginBottom: 8 },
  fechaInput: {
    backgroundColor: C.bgGray, borderRadius: R.lg,
    paddingHorizontal: 14, paddingVertical: 11,
    fontSize: F.md, color: C.textPrimary, marginBottom: 14,
  },
  atletasList: { maxHeight: 220, marginBottom: 14 },
  atletaRow: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: C.white, borderRadius: R.lg,
    borderWidth: 1, borderColor: C.borderSubtle,
    padding: 10, marginBottom: 8, gap: 10,
  },
  atletaRowSelected: { borderColor: C.primary, backgroundColor: C.primaryBg },
  atletaAvatar: {
    width: 36, height: 36, borderRadius: 18,
    alignItems: 'center', justifyContent: 'center',
  },
  atletaAvatarText: { fontSize: F.md, fontWeight: '700' },
  atletaInfo: { flex: 1 },
  atletaNombre: { fontSize: F.sm, fontWeight: '600', color: C.textPrimary },
  atletaPlan: { fontSize: F.xs, color: C.textTertiary, marginTop: 1 },
  checkbox: {
    width: 22, height: 22, borderRadius: 11,
    borderWidth: 2, borderColor: C.border,
    alignItems: 'center', justifyContent: 'center',
  },
  checkboxSelected: { backgroundColor: C.primary, borderColor: C.primary },
  checkboxCheck: { fontSize: F.xs, fontWeight: '700', color: C.white },
  assignBtn: {
    backgroundColor: C.primary, borderRadius: R.lg,
    paddingVertical: 14, alignItems: 'center',
  },
  assignBtnDisabled: { backgroundColor: C.border },
  assignBtnText: { fontSize: F.md, fontWeight: '700', color: C.white },
});
