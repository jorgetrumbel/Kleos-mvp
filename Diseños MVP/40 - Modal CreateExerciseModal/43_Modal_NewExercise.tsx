/**
 * 43 — Modal: Crear Nuevo Ejercicio
 * Tipo: Modal / Bottom Sheet — Coach
 * Descripción: Formulario para que el coach cree un ejercicio personalizado
 * en su biblioteca. Nombre, categoría, músculos y descripción.
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
  onCreate: (ejercicio: { nombre: string; categoria: string; descripcion: string }) => void;
}

const CATEGORIAS = ['Piernas', 'Core', 'Espalda', 'Pecho', 'Hombros', 'Cardio', 'Funcional'];
const NIVELES = ['Básico', 'Intermedio', 'Avanzado'];

export default function ModalNewExercise({ visible, onClose, onCreate }: Props) {
  const [nombre, setNombre] = useState('');
  const [categoria, setCategoria] = useState('');
  const [nivel, setNivel] = useState('Intermedio');
  const [descripcion, setDescripcion] = useState('');
  const [musculos, setMusculos] = useState('');

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <KeyboardAvoidingView
        style={styles.overlay}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <TouchableOpacity style={styles.backdrop} onPress={onClose} activeOpacity={1} />
        <View style={styles.sheet}>
          <View style={styles.handle} />
          <View style={styles.titleRow}>
            <Text style={styles.title}>Nuevo ejercicio</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeIcon}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Nombre */}
            <Text style={styles.fieldLabel}>Nombre *</Text>
            <TextInput
              style={styles.input}
              placeholder="Ej: Sentadilla búlgara"
              placeholderTextColor={C.textDisabled}
              value={nombre}
              onChangeText={setNombre}
            />

            {/* Categoría */}
            <Text style={styles.fieldLabel}>Categoría *</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catScroll}>
              <View style={styles.catRow}>
                {CATEGORIAS.map(cat => (
                  <TouchableOpacity
                    key={cat}
                    style={[styles.catBtn, categoria === cat && styles.catBtnActive]}
                    onPress={() => setCategoria(cat)}
                    activeOpacity={0.8}
                  >
                    <Text style={[styles.catText, categoria === cat && styles.catTextActive]}>{cat}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>

            {/* Nivel */}
            <Text style={styles.fieldLabel}>Nivel</Text>
            <View style={styles.nivelRow}>
              {NIVELES.map(n => (
                <TouchableOpacity
                  key={n}
                  style={[styles.nivelBtn, nivel === n && styles.nivelBtnActive]}
                  onPress={() => setNivel(n)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.nivelText, nivel === n && styles.nivelTextActive]}>{n}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Músculos */}
            <Text style={styles.fieldLabel}>Músculos trabajados</Text>
            <TextInput
              style={styles.input}
              placeholder="Ej: Cuádriceps, glúteos, core"
              placeholderTextColor={C.textDisabled}
              value={musculos}
              onChangeText={setMusculos}
            />

            {/* Descripción */}
            <Text style={styles.fieldLabel}>Descripción / Técnica</Text>
            <TextInput
              style={styles.textArea}
              placeholder="Explicá cómo se ejecuta correctamente..."
              placeholderTextColor={C.textDisabled}
              value={descripcion}
              onChangeText={setDescripcion}
              multiline
            />
          </ScrollView>

          <TouchableOpacity
            style={[styles.createBtn, (!nombre.trim() || !categoria) && styles.createBtnDisabled]}
            onPress={() => nombre.trim() && categoria && onCreate({ nombre, categoria, descripcion })}
            disabled={!nombre.trim() || !categoria}
            activeOpacity={0.85}
          >
            <Text style={styles.createBtnText}>Crear ejercicio</Text>
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
    padding: 20, paddingBottom: 34, maxHeight: '90%',
  },
  handle: {
    width: 40, height: 4, borderRadius: 2, backgroundColor: C.border,
    alignSelf: 'center', marginBottom: 16,
  },
  titleRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 16,
  },
  title: { fontSize: F['2xl'], fontWeight: '800', color: C.textPrimary },
  closeIcon: { fontSize: 18, color: C.textTertiary, padding: 4 },
  fieldLabel: { fontSize: F.sm, fontWeight: '600', color: C.textSecondary, marginBottom: 8, marginTop: 4 },
  input: {
    backgroundColor: C.bgGray, borderRadius: R.lg,
    paddingHorizontal: 14, paddingVertical: 12,
    fontSize: F.md, color: C.textPrimary, marginBottom: 14,
  },
  catScroll: { marginBottom: 14 },
  catRow: { flexDirection: 'row', gap: 8 },
  catBtn: {
    paddingHorizontal: 14, paddingVertical: 7, borderRadius: R.full,
    backgroundColor: C.bgGray, borderWidth: 1, borderColor: C.border,
  },
  catBtnActive: { backgroundColor: C.primary, borderColor: C.primary },
  catText: { fontSize: F.sm, color: C.textSecondary },
  catTextActive: { color: C.white, fontWeight: '700' },
  nivelRow: { flexDirection: 'row', gap: 8, marginBottom: 14 },
  nivelBtn: {
    flex: 1, paddingVertical: 9, borderRadius: R.lg,
    backgroundColor: C.bgGray, borderWidth: 1, borderColor: C.border, alignItems: 'center',
  },
  nivelBtnActive: { backgroundColor: C.primaryBg, borderColor: C.primary },
  nivelText: { fontSize: F.sm, color: C.textSecondary },
  nivelTextActive: { color: C.primary, fontWeight: '700' },
  textArea: {
    backgroundColor: C.bgGray, borderRadius: R.lg,
    paddingHorizontal: 14, paddingVertical: 12,
    fontSize: F.sm, color: C.textPrimary, lineHeight: 18,
    minHeight: 90, textAlignVertical: 'top', marginBottom: 16,
  },
  createBtn: {
    backgroundColor: C.primary, borderRadius: R.lg,
    paddingVertical: 14, alignItems: 'center', marginTop: 4,
  },
  createBtnDisabled: { backgroundColor: C.border },
  createBtnText: { fontSize: F.md, fontWeight: '700', color: C.white },
});
