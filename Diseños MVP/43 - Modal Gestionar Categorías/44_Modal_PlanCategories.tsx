/**
 * 44 — Modal: Categorías de Plan
 * Tipo: Modal / Bottom Sheet — Coach
 * Descripción: Selector de categoría/tipo de plan al crear o filtrar planes.
 * Permite al coach elegir la especialidad del plan que está creando.
 */

import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, Modal, ScrollView,
} from 'react-native';
import { C, F, R } from './KleosTheme';

interface Props {
  visible: boolean;
  onClose: () => void;
  onSelect: (categoria: string) => void;
  selected?: string;
}

const CATEGORIAS = [
  { id: '1', nombre: 'Running', icon: '🏃', desc: 'Planes de carrera a pie: base, 5K, 10K, media y maratón.' },
  { id: '2', nombre: 'Triatlón', icon: '🏊', desc: 'Sprint, olímpico y full. Bici, natación y carrera.' },
  { id: '3', nombre: 'Ciclismo', icon: '🚴', desc: 'Ruta, MTB y ciclismo indoor. Vatios y RPM.' },
  { id: '4', nombre: 'Natación', icon: '🏊', desc: 'Técnica y resistencia en pileta o aguas abiertas.' },
  { id: '5', nombre: 'Fuerza', icon: '💪', desc: 'Hipertrofia, fuerza máxima y funcional.' },
  { id: '6', nombre: 'CrossFit', icon: '⚡', desc: 'WOD, AMRAP, EMOM y programas de temporada.' },
  { id: '7', nombre: 'Preparación física', icon: '📋', desc: 'Planes generales, atletismo y deporte combinado.' },
  { id: '8', nombre: 'Personalizado', icon: '✨', desc: 'Plan a medida para tu atleta sin categoría fija.' },
];

export default function ModalPlanCategories({ visible, onClose, onSelect, selected }: Props) {
  const [seleccionado, setSeleccionado] = useState(selected || '');

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.backdrop} onPress={onClose} activeOpacity={1} />
        <View style={styles.sheet}>
          <View style={styles.handle} />
          <Text style={styles.title}>Tipo de plan</Text>
          <Text style={styles.sub}>Elegí la especialidad del plan que vas a crear.</Text>

          <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
            {CATEGORIAS.map(cat => {
              const isSelected = seleccionado === cat.nombre;
              return (
                <TouchableOpacity
                  key={cat.id}
                  style={[styles.catCard, isSelected && styles.catCardSelected]}
                  onPress={() => setSeleccionado(cat.nombre)}
                  activeOpacity={0.8}
                >
                  <View style={[styles.catIcon, isSelected && styles.catIconSelected]}>
                    <Text style={styles.catIconText}>{cat.icon}</Text>
                  </View>
                  <View style={styles.catInfo}>
                    <Text style={[styles.catNombre, isSelected && styles.catNombreSelected]}>
                      {cat.nombre}
                    </Text>
                    <Text style={styles.catDesc}>{cat.desc}</Text>
                  </View>
                  <View style={[styles.radio, isSelected && styles.radioSelected]}>
                    {isSelected && <View style={styles.radioDot} />}
                  </View>
                </TouchableOpacity>
              );
            })}
            <View style={{ height: 8 }} />
          </ScrollView>

          <TouchableOpacity
            style={[styles.selectBtn, !seleccionado && styles.selectBtnDisabled]}
            onPress={() => seleccionado && onSelect(seleccionado)}
            disabled={!seleccionado}
            activeOpacity={0.85}
          >
            <Text style={styles.selectBtnText}>
              {seleccionado ? `Usar "${seleccionado}"` : 'Seleccionar categoría'}
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
    padding: 20, paddingBottom: 34, maxHeight: '88%',
  },
  handle: {
    width: 40, height: 4, borderRadius: 2, backgroundColor: C.border,
    alignSelf: 'center', marginBottom: 16,
  },
  title: { fontSize: F['2xl'], fontWeight: '800', color: C.textPrimary, marginBottom: 4 },
  sub: { fontSize: F.sm, color: C.textTertiary, marginBottom: 16 },
  list: { flex: 1 },
  catCard: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: C.white, borderRadius: R.lg,
    borderWidth: 1, borderColor: C.borderSubtle,
    padding: 12, marginBottom: 8, gap: 12,
  },
  catCardSelected: { borderColor: C.primary, backgroundColor: C.primaryBg },
  catIcon: {
    width: 44, height: 44, borderRadius: R.lg,
    backgroundColor: C.bgGray, alignItems: 'center', justifyContent: 'center',
  },
  catIconSelected: { backgroundColor: 'rgba(26,124,131,0.15)' },
  catIconText: { fontSize: 24 },
  catInfo: { flex: 1 },
  catNombre: { fontSize: F.md, fontWeight: '700', color: C.textPrimary, marginBottom: 3 },
  catNombreSelected: { color: C.primary },
  catDesc: { fontSize: F.xs, color: C.textTertiary, lineHeight: 15 },
  radio: {
    width: 20, height: 20, borderRadius: 10,
    borderWidth: 2, borderColor: C.border,
    alignItems: 'center', justifyContent: 'center',
  },
  radioSelected: { borderColor: C.primary },
  radioDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: C.primary },
  selectBtn: {
    backgroundColor: C.primary, borderRadius: R.lg,
    paddingVertical: 14, alignItems: 'center', marginTop: 8,
  },
  selectBtnDisabled: { backgroundColor: C.border },
  selectBtnText: { fontSize: F.md, fontWeight: '700', color: C.white },
});
