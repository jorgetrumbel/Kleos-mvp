/**
 * 4 — Registro — Paso 3 Coach (Suscripción)
 * Pantalla: Coach
 * Descripción: El coach elige su plan de suscripción en KLEOS.
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { C, F, R, S } from './KleosTheme';

interface Props {
  navigation: any;
}

type Plan = 'gratis' | 'pro' | 'elite';

const PLANS: {
  id: Plan;
  name: string;
  price: string;
  period: string;
  tag?: string;
  features: string[];
}[] = [
  {
    id: 'gratis',
    name: 'Gratis',
    price: '$0',
    period: 'para siempre',
    features: [
      'Hasta 5 atletas',
      'Planificación básica',
      'Chat con atletas',
      'Comunidad KLEOS',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$4.990',
    period: '/ mes',
    tag: 'Más popular',
    features: [
      'Hasta 30 atletas',
      'Gestión de pagos',
      'Analíticas de progreso',
      'Editor de planes avanzado',
      'Biblioteca de ejercicios ilimitada',
    ],
  },
  {
    id: 'elite',
    name: 'Elite',
    price: '$9.990',
    period: '/ mes',
    features: [
      'Atletas ilimitados',
      'Todo lo de Pro',
      'Acceso anticipado a IA',
      'App con tu marca',
      'Soporte prioritario',
    ],
  },
];

export default function RegistroCoachPaso3Screen({ navigation }: Props) {
  const [selected, setSelected] = useState<Plan>('pro');

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>

        <View style={styles.progressRow}>
          {[0, 1, 2, 3].map(i => (
            <View key={i} style={[styles.bar, i <= 2 && styles.barFilled]} />
          ))}
        </View>
        <Text style={styles.progressLabel}>Paso 3 de 4</Text>

        <Text style={styles.title}>Elegí tu plan</Text>
        <Text style={styles.subtitle}>
          Podés cambiar o cancelar cuando quieras.
        </Text>

        <View style={styles.plansContainer}>
          {PLANS.map(plan => {
            const isActive = selected === plan.id;
            return (
              <TouchableOpacity
                key={plan.id}
                style={[styles.planCard, isActive && styles.planCardActive]}
                onPress={() => setSelected(plan.id)}
                activeOpacity={0.85}
              >
                {plan.tag && (
                  <View style={styles.planTag}>
                    <Text style={styles.planTagText}>{plan.tag}</Text>
                  </View>
                )}
                <View style={styles.planHeader}>
                  <View style={styles.planRadio}>
                    {isActive && <View style={styles.planRadioInner} />}
                  </View>
                  <View style={styles.planTitleCol}>
                    <Text style={[styles.planName, isActive && styles.planNameActive]}>
                      {plan.name}
                    </Text>
                    <View style={styles.planPriceRow}>
                      <Text style={[styles.planPrice, isActive && styles.planPriceActive]}>
                        {plan.price}
                      </Text>
                      <Text style={styles.planPeriod}> {plan.period}</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.featuresCol}>
                  {plan.features.map(f => (
                    <View key={f} style={styles.featureRow}>
                      <Text style={[styles.checkIcon, isActive && styles.checkIconActive]}>
                        ✓
                      </Text>
                      <Text style={styles.featureText}>{f}</Text>
                    </View>
                  ))}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={() => navigation.navigate('RegistroCoachPaso4')}
          activeOpacity={0.85}
        >
          <Text style={styles.primaryBtnText}>Continuar con {PLANS.find(p => p.id === selected)?.name} →</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.bg },
  container: { padding: 24, paddingTop: 16, flexGrow: 1 },
  backBtn: { marginBottom: 20, width: 36, height: 36, justifyContent: 'center' },
  backIcon: { fontSize: 22, color: C.textPrimary },
  progressRow: { flexDirection: 'row', gap: 5, marginBottom: 6 },
  bar: { flex: 1, height: 3, borderRadius: 2, backgroundColor: C.border },
  barFilled: { backgroundColor: C.primary },
  progressLabel: { fontSize: F.xs, color: C.textTertiary, marginBottom: 24 },
  title: { fontSize: F['4xl'], fontWeight: '700', color: C.textPrimary, marginBottom: 6 },
  subtitle: { fontSize: F.md, color: C.textSecondary, marginBottom: 24 },
  plansContainer: { gap: 12, marginBottom: 24 },
  planCard: {
    backgroundColor: C.white,
    borderRadius: R.xl,
    borderWidth: 1,
    borderColor: C.border,
    padding: 16,
    ...S.card,
  },
  planCardActive: {
    borderColor: C.primary,
    borderWidth: 2,
    backgroundColor: C.primaryBg,
  },
  planTag: {
    alignSelf: 'flex-start',
    backgroundColor: C.primary,
    borderRadius: R.full,
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginBottom: 10,
  },
  planTagText: { fontSize: F.xs, fontWeight: '700', color: C.white },
  planHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  planRadio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: C.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  planRadioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: C.primary,
  },
  planTitleCol: { flex: 1 },
  planName: { fontSize: F.lg, fontWeight: '700', color: C.textPrimary },
  planNameActive: { color: C.primary },
  planPriceRow: { flexDirection: 'row', alignItems: 'baseline', marginTop: 2 },
  planPrice: { fontSize: F['3xl'], fontWeight: '800', color: C.textPrimary },
  planPriceActive: { color: C.primary },
  planPeriod: { fontSize: F.sm, color: C.textTertiary },
  featuresCol: { gap: 6, paddingTop: 4, borderTopWidth: 1, borderTopColor: C.borderSubtle },
  featureRow: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingTop: 6 },
  checkIcon: { fontSize: F.sm, color: C.textDisabled, fontWeight: '700', width: 16 },
  checkIconActive: { color: C.primary },
  featureText: { fontSize: F.sm, color: C.textSecondary, flex: 1 },
  primaryBtn: {
    backgroundColor: C.primary,
    borderRadius: R.xl,
    paddingVertical: 15,
    alignItems: 'center',
  },
  primaryBtnText: { fontSize: F.lg, fontWeight: '700', color: C.white },
});
