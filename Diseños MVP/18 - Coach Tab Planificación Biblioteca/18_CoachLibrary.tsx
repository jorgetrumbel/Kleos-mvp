/**
 * 18 — Coach — Biblioteca de Entrenamientos
 * Pantalla: Coach
 * Descripción: Biblioteca de plantillas de entreno del coach.
 * Permite buscar, filtrar y reutilizar entrenamientos guardados.
 */

import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, SafeAreaView, TextInput,
} from 'react-native';
import { C, F, R, S } from './KleosTheme';

interface Props { navigation: any }

const CATEGORIAS = ['Todos', 'Running', 'Fuerza', 'Triatlón', 'Recuperación', 'CrossFit'];

const TEMPLATES = [
  {
    id: '1', nombre: 'Intervalo 5×1km', categoria: 'Running',
    duracion: '55 min', zona: 'Z4', usados: 12,
    descripcion: 'Calentamiento 10min + 5 repeticiones de 1km a ritmo objetivo + recuperación 2min',
  },
  {
    id: '2', nombre: 'Rodaje base Z2', categoria: 'Running',
    duracion: '45 min', zona: 'Z2', usados: 28,
    descripcion: 'Carrera continua en zona aeróbica baja. Ideal para base y recuperación activa.',
  },
  {
    id: '3', nombre: 'Fuerza tren inferior', categoria: 'Fuerza',
    duracion: '50 min', zona: '', usados: 8,
    descripcion: 'Sentadillas, peso muerto, zancadas y trabajo de glúteos. 3 series de 12 reps.',
  },
  {
    id: '4', nombre: 'Brick bici + run 30min', categoria: 'Triatlón',
    duracion: '90 min', zona: 'Z2-3', usados: 5,
    descripcion: '60min ciclismo + transición + 30min carrera a ritmo de competencia.',
  },
  {
    id: '5', nombre: 'Descanso activo', categoria: 'Recuperación',
    duracion: '30 min', zona: 'Z1', usados: 20,
    descripcion: 'Caminata o trote muy suave. Estiramiento y movilidad articular.',
  },
];

export default function CoachLibraryScreen({ navigation }: Props) {
  const [search, setSearch] = useState('');
  const [categoria, setCategoria] = useState('Todos');

  const filtered = TEMPLATES.filter(t => {
    const matchSearch = t.nombre.toLowerCase().includes(search.toLowerCase());
    const matchCat = categoria === 'Todos' || t.categoria === categoria;
    return matchSearch && matchCat;
  });

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Biblioteca</Text>
        <TouchableOpacity
          style={styles.newBtn}
          onPress={() => navigation.navigate('CoachNewTemplate')}
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
          placeholder="Buscar entrenamiento..."
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
      </ScrollView>

      {/* Lista */}
      <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
        <Text style={styles.resultCount}>{filtered.length} entrenamientos</Text>

        {filtered.map(t => (
          <TouchableOpacity
            key={t.id}
            style={styles.templateCard}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('CoachWorkoutDetails', { templateId: t.id })}
          >
            <View style={styles.templateHeader}>
              <View style={styles.templateIcon}>
                <Text style={styles.templateIconText}>
                  {t.categoria === 'Running' ? '🏃' :
                   t.categoria === 'Fuerza' ? '💪' :
                   t.categoria === 'Triatlón' ? '🏊' :
                   t.categoria === 'Recuperación' ? '🧘' : '⚡'}
                </Text>
              </View>
              <View style={styles.templateMeta}>
                <Text style={styles.templateNombre}>{t.nombre}</Text>
                <View style={styles.templateTags}>
                  <View style={styles.tag}>
                    <Text style={styles.tagText}>{t.categoria}</Text>
                  </View>
                  {t.zona ? (
                    <View style={[styles.tag, styles.tagZone]}>
                      <Text style={[styles.tagText, styles.tagZoneText]}>{t.zona}</Text>
                    </View>
                  ) : null}
                  <View style={styles.tag}>
                    <Text style={styles.tagText}>⏱ {t.duracion}</Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity
                style={styles.useBtn}
                onPress={() => navigation.navigate('CoachAssignWorkout', { templateId: t.id })}
                activeOpacity={0.8}
              >
                <Text style={styles.useBtnText}>Usar</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.templateDesc}>{t.descripcion}</Text>
            <Text style={styles.templateUsados}>Usado {t.usados} veces</Text>
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
  templateCard: {
    backgroundColor: C.white, borderRadius: R.xl,
    borderWidth: 1, borderColor: C.borderSubtle,
    padding: 14, marginBottom: 10, ...S.card,
  },
  templateHeader: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginBottom: 8 },
  templateIcon: {
    width: 42, height: 42, borderRadius: R.lg,
    backgroundColor: C.primaryBg, alignItems: 'center', justifyContent: 'center',
  },
  templateIconText: { fontSize: 22 },
  templateMeta: { flex: 1 },
  templateNombre: { fontSize: F.md, fontWeight: '700', color: C.textPrimary, marginBottom: 5 },
  templateTags: { flexDirection: 'row', flexWrap: 'wrap', gap: 5 },
  tag: {
    backgroundColor: C.bgGray, borderRadius: R.xs,
    paddingHorizontal: 7, paddingVertical: 2,
  },
  tagText: { fontSize: F.xs, color: C.textSecondary },
  tagZone: { backgroundColor: C.primaryBg },
  tagZoneText: { color: C.primary, fontWeight: '600' },
  useBtn: {
    backgroundColor: C.primary, borderRadius: R.md,
    paddingHorizontal: 12, paddingVertical: 7,
    alignSelf: 'flex-start',
  },
  useBtnText: { fontSize: F.sm, fontWeight: '700', color: C.white },
  templateDesc: {
    fontSize: F.sm, color: C.textSecondary, lineHeight: 18, marginBottom: 8,
  },
  templateUsados: { fontSize: F.xs, color: C.textTertiary },
});
