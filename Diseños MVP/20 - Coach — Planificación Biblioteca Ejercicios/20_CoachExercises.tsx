/**
 * 20 — Coach — Ejercicios / Biblioteca de movimientos
 * Pantalla: Coach
 * Descripción: Biblioteca de ejercicios individuales con descripción,
 * categoría y opción de agregar a un entrenamiento.
 */

import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, SafeAreaView, TextInput,
} from 'react-native';
import { C, F, R, S } from './KleosTheme';

interface Props { navigation: any }

const CATS = ['Todos', 'Piernas', 'Core', 'Espalda', 'Pecho', 'Hombros', 'Cardio'];

const EJERCICIOS = [
  { id: '1', nombre: 'Sentadilla con barra', cat: 'Piernas', nivel: 'Intermedio', musculos: 'Cuádriceps, glúteos, isquios' },
  { id: '2', nombre: 'Peso muerto', cat: 'Piernas', nivel: 'Avanzado', musculos: 'Isquios, glúteos, lumbar' },
  { id: '3', nombre: 'Plancha', cat: 'Core', nivel: 'Básico', musculos: 'Core, hombros, glúteos' },
  { id: '4', nombre: 'Dominadas', cat: 'Espalda', nivel: 'Avanzado', musculos: 'Dorsal, bíceps, core' },
  { id: '5', nombre: 'Press banca', cat: 'Pecho', nivel: 'Intermedio', musculos: 'Pectoral, tríceps, hombros' },
  { id: '6', nombre: 'Zancada', cat: 'Piernas', nivel: 'Básico', musculos: 'Cuádriceps, glúteos' },
  { id: '7', nombre: 'Remo con mancuerna', cat: 'Espalda', nivel: 'Básico', musculos: 'Dorsal, bíceps' },
  { id: '8', nombre: 'Burpee', cat: 'Cardio', nivel: 'Intermedio', musculos: 'Full body' },
];

const NIVEL_COLORS: Record<string, string> = {
  Básico: '#ECFDF5',
  Intermedio: '#EBF4F5',
  Avanzado: '#FFF3E0',
};
const NIVEL_TEXT: Record<string, string> = {
  Básico: C.success,
  Intermedio: C.primary,
  Avanzado: C.warning,
};

export default function CoachExercisesScreen({ navigation }: Props) {
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState('Todos');

  const filtered = EJERCICIOS.filter(e => {
    const matchSearch = e.nombre.toLowerCase().includes(search.toLowerCase());
    const matchCat = cat === 'Todos' || e.cat === cat;
    return matchSearch && matchCat;
  });

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Ejercicios</Text>
        <TouchableOpacity
          style={styles.newBtn}
          onPress={() => navigation.navigate('CoachNewExercise')}
          activeOpacity={0.85}
        >
          <Text style={styles.newBtnText}>+ Nuevo</Text>
        </TouchableOpacity>
      </View>

      {/* Buscador */}
      <View style={styles.searchWrap}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar ejercicio..."
          placeholderTextColor={C.textDisabled}
          value={search}
          onChangeText={setSearch}
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch('')}>
            <Text style={styles.clearIcon}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Categorías */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.catScroll}
        contentContainerStyle={styles.catContent}
      >
        {CATS.map(c => (
          <TouchableOpacity
            key={c}
            style={[styles.catBtn, cat === c && styles.catBtnActive]}
            onPress={() => setCat(c)}
            activeOpacity={0.8}
          >
            <Text style={[styles.catText, cat === c && styles.catTextActive]}>{c}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Lista */}
      <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
        <Text style={styles.resultCount}>{filtered.length} ejercicios</Text>
        {filtered.map(e => (
          <TouchableOpacity
            key={e.id}
            style={styles.card}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('CoachExerciseDetail', { ejercicioId: e.id })}
          >
            <View style={styles.cardLeft}>
              <View style={styles.cardIcon}>
                <Text style={styles.cardIconText}>
                  {e.cat === 'Cardio' ? '🏃' : e.cat === 'Core' ? '⚡' : '💪'}
                </Text>
              </View>
              <View style={styles.cardInfo}>
                <Text style={styles.cardNombre}>{e.nombre}</Text>
                <Text style={styles.cardMusculos}>{e.musculos}</Text>
                <View style={styles.cardTags}>
                  <View style={styles.catTag}>
                    <Text style={styles.catTagText}>{e.cat}</Text>
                  </View>
                  <View style={[
                    styles.nivelTag,
                    { backgroundColor: NIVEL_COLORS[e.nivel] || C.bgGray },
                  ]}>
                    <Text style={[
                      styles.nivelTagText,
                      { color: NIVEL_TEXT[e.nivel] || C.textSecondary },
                    ]}>
                      {e.nivel}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <TouchableOpacity
              style={styles.addBtn}
              onPress={() => navigation.navigate('CoachPlanEditor', { ejercicioId: e.id })}
              activeOpacity={0.8}
            >
              <Text style={styles.addBtnText}>+</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.bg },
  header: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingTop: 16, paddingBottom: 12, gap: 10,
  },
  backBtn: { width: 32, height: 32, justifyContent: 'center' },
  backIcon: { fontSize: 22, color: C.textPrimary },
  title: { flex: 1, fontSize: F['2xl'], fontWeight: '700', color: C.textPrimary },
  newBtn: {
    backgroundColor: C.primary, borderRadius: R.lg,
    paddingHorizontal: 14, paddingVertical: 8,
  },
  newBtnText: { fontSize: F.sm, fontWeight: '700', color: C.white },
  searchWrap: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: C.white, borderRadius: R.lg,
    borderWidth: 1, borderColor: C.borderSubtle,
    marginHorizontal: 16, marginBottom: 10,
    paddingHorizontal: 14, paddingVertical: 10, gap: 8,
  },
  searchIcon: { fontSize: 16 },
  searchInput: { flex: 1, fontSize: F.md, color: C.textPrimary },
  clearIcon: { fontSize: 14, color: C.textTertiary, padding: 4 },
  catScroll: { marginBottom: 10 },
  catContent: { paddingHorizontal: 16, gap: 8 },
  catBtn: {
    paddingHorizontal: 14, paddingVertical: 7,
    borderRadius: R.full, backgroundColor: C.white,
    borderWidth: 1, borderColor: C.border,
  },
  catBtnActive: { backgroundColor: C.primary, borderColor: C.primary },
  catText: { fontSize: F.sm, color: C.textSecondary },
  catTextActive: { color: C.white, fontWeight: '700' },
  list: { flex: 1, paddingHorizontal: 16 },
  resultCount: { fontSize: F.sm, color: C.textTertiary, marginBottom: 10 },
  card: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: C.white, borderRadius: R.xl,
    borderWidth: 1, borderColor: C.borderSubtle,
    padding: 12, marginBottom: 8, ...S.card,
  },
  cardLeft: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10 },
  cardIcon: {
    width: 42, height: 42, borderRadius: R.lg,
    backgroundColor: C.primaryBg, alignItems: 'center', justifyContent: 'center',
  },
  cardIconText: { fontSize: 22 },
  cardInfo: { flex: 1 },
  cardNombre: { fontSize: F.md, fontWeight: '700', color: C.textPrimary },
  cardMusculos: { fontSize: F.xs, color: C.textTertiary, marginTop: 2, marginBottom: 5 },
  cardTags: { flexDirection: 'row', gap: 5 },
  catTag: {
    backgroundColor: C.bgGray, borderRadius: R.xs,
    paddingHorizontal: 7, paddingVertical: 2,
  },
  catTagText: { fontSize: F.xs, color: C.textSecondary },
  nivelTag: {
    borderRadius: R.xs,
    paddingHorizontal: 7, paddingVertical: 2,
  },
  nivelTagText: { fontSize: F.xs, fontWeight: '600' },
  addBtn: {
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: C.primary, alignItems: 'center', justifyContent: 'center',
  },
  addBtnText: { fontSize: F.xl, fontWeight: '700', color: C.white, lineHeight: 22 },
});
