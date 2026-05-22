/**
 * 6 — Registro — Paso 5 Coach (Código de invitación)
 * Pantalla: Coach
 * Descripción: El coach obtiene su código único para invitar atletas.
 */

import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  SafeAreaView, ScrollView, Share, Alert,
} from 'react-native';
import { C, F, R } from './KleosTheme';

interface Props { navigation: any }

export default function RegistroCoachPaso5Screen({ navigation }: Props) {
  const [copied, setCopied] = useState(false);
  const codigoInvitacion = 'ROBERTO-2026';

  const handleCopy = async () => {
    // En producción: usar Clipboard.setString(codigoInvitacion)
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    await Share.share({
      message: `¡Sumate a mi equipo de entrenamiento en KLEOS! Usá mi código: ${codigoInvitacion}\nDescargá la app en: kleos.app`,
    });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Success icon */}
        <View style={styles.successIcon}>
          <Text style={styles.successEmoji}>🎉</Text>
        </View>

        <Text style={styles.title}>¡Tu perfil está listo!</Text>
        <Text style={styles.subtitle}>
          Compartí tu código con tus atletas para que se sumen a tu equipo.
        </Text>

        {/* Código */}
        <View style={styles.codeCard}>
          <Text style={styles.codeLabel}>TU CÓDIGO DE INVITACIÓN</Text>
          <Text style={styles.codeValue}>{codigoInvitacion}</Text>
          <Text style={styles.codeHint}>
            Cada atleta lo ingresa al registrarse para vincularse con vos.
          </Text>
        </View>

        {/* Actions */}
        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={[styles.actionBtn, copied && styles.actionBtnSuccess]}
            onPress={handleCopy}
            activeOpacity={0.8}
          >
            <Text style={styles.actionBtnText}>
              {copied ? '✓ Copiado' : '📋 Copiar código'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionBtn, styles.actionBtnPrimary]}
            onPress={handleShare}
            activeOpacity={0.8}
          >
            <Text style={styles.actionBtnTextPrimary}>🔗 Compartir</Text>
          </TouchableOpacity>
        </View>

        {/* Info cards */}
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>¿Qué sigue?</Text>
          {[
            { icon: '👥', text: 'Tus atletas se registran y usan tu código para vincularse.' },
            { icon: '📋', text: 'Asignales planes de entrenamiento desde tu panel.' },
            { icon: '💬', text: 'Comunicáte con ellos directamente desde la app.' },
            { icon: '💰', text: 'Gestioná sus pagos desde un solo lugar.' },
          ].map((item, i) => (
            <View key={i} style={styles.infoRow}>
              <Text style={styles.infoEmoji}>{item.icon}</Text>
              <Text style={styles.infoText}>{item.text}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={() => navigation.navigate('CoachHome')}
          activeOpacity={0.85}
        >
          <Text style={styles.primaryBtnText}>Ir al panel de coach →</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.bg },
  container: { padding: 24, paddingTop: 40, flexGrow: 1, alignItems: 'center' },
  successIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: C.primaryBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  successEmoji: { fontSize: 40 },
  title: {
    fontSize: F['4xl'],
    fontWeight: '700',
    color: C.textPrimary,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: F.md,
    color: C.textSecondary,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 20,
  },
  codeCard: {
    width: '100%',
    backgroundColor: C.primary,
    borderRadius: R['2xl'],
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
  },
  codeLabel: {
    fontSize: F.xs,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.7)',
    letterSpacing: 1,
    marginBottom: 8,
  },
  codeValue: {
    fontSize: F['4xl'],
    fontWeight: '800',
    color: C.white,
    letterSpacing: 2,
    marginBottom: 8,
  },
  codeHint: {
    fontSize: F.xs,
    color: 'rgba(255,255,255,0.65)',
    textAlign: 'center',
    lineHeight: 16,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 10,
    width: '100%',
    marginBottom: 32,
  },
  actionBtn: {
    flex: 1,
    backgroundColor: C.white,
    borderRadius: R.lg,
    borderWidth: 1,
    borderColor: C.border,
    paddingVertical: 13,
    alignItems: 'center',
  },
  actionBtnSuccess: {
    borderColor: C.success,
    backgroundColor: C.successBg,
  },
  actionBtnPrimary: {
    backgroundColor: C.primaryBg,
    borderColor: C.primary,
  },
  actionBtnText: { fontSize: F.sm, fontWeight: '600', color: C.textPrimary },
  actionBtnTextPrimary: { fontSize: F.sm, fontWeight: '600', color: C.primary },
  infoSection: { width: '100%', marginBottom: 32 },
  infoTitle: {
    fontSize: F.lg,
    fontWeight: '700',
    color: C.textPrimary,
    marginBottom: 14,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 12,
  },
  infoEmoji: { fontSize: 18, lineHeight: 22 },
  infoText: {
    fontSize: F.sm,
    color: C.textSecondary,
    flex: 1,
    lineHeight: 18,
  },
  primaryBtn: {
    width: '100%',
    backgroundColor: C.primary,
    borderRadius: R.xl,
    paddingVertical: 15,
    alignItems: 'center',
  },
  primaryBtnText: { fontSize: F.lg, fontWeight: '700', color: C.white },
});
