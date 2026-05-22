/**
 * 5 — Registro — Paso 4 Coach (Planes atleta)
 * Pantalla: Coach
 * Descripción: El coach configura sus planes/precios para atletas.
 */

import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, SafeAreaView, ScrollView,
  KeyboardAvoidingView, Platform,
} from 'react-native';
import { C, F, R } from './KleosTheme';

interface Props { navigation: any }

interface Plan {
  id: string;
  nombre: string;
  precio: string;
  descripcion: string;
}

export default function RegistroCoachPaso4Screen({ navigation }: Props) {
  const [planes, setPlanes] = useState<Plan[]>([
    { id: '1', nombre: 'Plan Mensual', precio: '12000', descripcion: 'Seguimiento y planificación personalizada.' },
  ]);

  const addPlan = () => {
    setPlanes(prev => [
      ...prev,
      { id: Date.now().toString(), nombre: '', precio: '', descripcion: '' },
    ]);
  };

  const updatePlan = (id: string, field: keyof Plan, val: string) => {
    setPlanes(prev => prev.map(p => p.id === id ? { ...p, [field]: val } : p));
  };

  const removePlan = (id: string) => {
    setPlanes(prev => prev.filter(p => p.id !== id));
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>

          <View style={styles.progressRow}>
            {[0, 1, 2, 3].map(i => (
              <View key={i} style={[styles.bar, styles.barFilled]} />
            ))}
          </View>
          <Text style={styles.progressLabel}>Paso 4 de 4</Text>

          <Text style={styles.title}>Tus planes de entrenamiento</Text>
          <Text style={styles.subtitle}>
            Definí qué le ofrecés a tus atletas y a qué precio.
          </Text>

          <View style={styles.plansContainer}>
            {planes.map((plan, idx) => (
              <View key={plan.id} style={styles.planCard}>
                <View style={styles.planCardHeader}>
                  <Text style={styles.planCardTitle}>Plan {idx + 1}</Text>
                  {planes.length > 1 && (
                    <TouchableOpacity onPress={() => removePlan(plan.id)}>
                      <Text style={styles.removeText}>Eliminar</Text>
                    </TouchableOpacity>
                  )}
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>NOMBRE DEL PLAN</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Ej: Plan Mensual"
                    placeholderTextColor={C.textDisabled}
                    value={plan.nombre}
                    onChangeText={val => updatePlan(plan.id, 'nombre', val)}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>PRECIO (ARS / MES)</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Ej: 12000"
                    placeholderTextColor={C.textDisabled}
                    keyboardType="numeric"
                    value={plan.precio}
                    onChangeText={val => updatePlan(plan.id, 'precio', val)}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>DESCRIPCIÓN</Text>
                  <TextInput
                    style={styles.textArea}
                    placeholder="Qué incluye este plan..."
                    placeholderTextColor={C.textDisabled}
                    multiline
                    numberOfLines={3}
                    value={plan.descripcion}
                    onChangeText={val => updatePlan(plan.id, 'descripcion', val)}
                    textAlignVertical="top"
                  />
                </View>
              </View>
            ))}
          </View>

          <TouchableOpacity style={styles.addBtn} onPress={addPlan} activeOpacity={0.8}>
            <Text style={styles.addBtnText}>+ Agregar otro plan</Text>
          </TouchableOpacity>

          <View style={styles.infoCard}>
            <Text style={styles.infoText}>
              💡 KLEOS cobra un 3% de comisión sobre cada pago procesado en la plataforma.
            </Text>
          </View>

          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={() => navigation.navigate('RegistroCoachPaso5')}
            activeOpacity={0.85}
          >
            <Text style={styles.primaryBtnText}>Finalizar registro →</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.bg },
  flex: { flex: 1 },
  container: { padding: 24, paddingTop: 16, flexGrow: 1 },
  backBtn: { marginBottom: 20, width: 36, height: 36, justifyContent: 'center' },
  backIcon: { fontSize: 22, color: C.textPrimary },
  progressRow: { flexDirection: 'row', gap: 5, marginBottom: 6 },
  bar: { flex: 1, height: 3, borderRadius: 2, backgroundColor: C.border },
  barFilled: { backgroundColor: C.primary },
  progressLabel: { fontSize: F.xs, color: C.textTertiary, marginBottom: 24 },
  title: { fontSize: F['4xl'], fontWeight: '700', color: C.textPrimary, marginBottom: 6 },
  subtitle: { fontSize: F.md, color: C.textSecondary, marginBottom: 24 },
  plansContainer: { gap: 16, marginBottom: 16 },
  planCard: {
    backgroundColor: C.white,
    borderRadius: R.xl,
    borderWidth: 1,
    borderColor: C.borderSubtle,
    padding: 16,
    gap: 12,
  },
  planCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  planCardTitle: { fontSize: F.md, fontWeight: '700', color: C.textPrimary },
  removeText: { fontSize: F.sm, color: C.error },
  inputGroup: { gap: 6 },
  label: { fontSize: F.xs, fontWeight: '600', color: C.textTertiary, letterSpacing: 0.5 },
  input: {
    backgroundColor: C.bg,
    borderRadius: R.lg,
    borderWidth: 1,
    borderColor: C.borderSubtle,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: F.md,
    color: C.textPrimary,
  },
  textArea: {
    backgroundColor: C.bg,
    borderRadius: R.lg,
    borderWidth: 1,
    borderColor: C.borderSubtle,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: F.md,
    color: C.textPrimary,
    minHeight: 72,
  },
  addBtn: {
    borderWidth: 1,
    borderColor: C.primary,
    borderStyle: 'dashed',
    borderRadius: R.xl,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 16,
  },
  addBtnText: { fontSize: F.md, color: C.primary, fontWeight: '600' },
  infoCard: {
    backgroundColor: C.primaryBg,
    borderRadius: R.lg,
    padding: 14,
    marginBottom: 24,
  },
  infoText: { fontSize: F.sm, color: C.primary, lineHeight: 18 },
  primaryBtn: {
    backgroundColor: C.primary,
    borderRadius: R.xl,
    paddingVertical: 15,
    alignItems: 'center',
  },
  primaryBtnText: { fontSize: F.lg, fontWeight: '700', color: C.white },
});
