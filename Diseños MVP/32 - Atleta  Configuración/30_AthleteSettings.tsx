/**
 * 30 — Atleta — Configuración
 * Pantalla: Atleta
 * Descripción: Pantalla de configuración del atleta. Notificaciones,
 * privacidad, cuenta y opciones del perfil.
 */

import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, SafeAreaView, Switch,
} from 'react-native';
import { C, F, R, S } from './KleosTheme';

interface Props { navigation: any }

export default function AthleteSettingsScreen({ navigation }: Props) {
  const [notifEntrenos, setNotifEntrenos] = useState(true);
  const [notifChat, setNotifChat] = useState(true);
  const [notifPagos, setNotifPagos] = useState(false);
  const [perfilPublico, setPerfilPublico] = useState(true);

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Configuración</Text>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Notificaciones */}
        <Text style={styles.sectionTitle}>Notificaciones</Text>
        <View style={styles.menuCard}>
          {[
            { label: 'Recordatorios de entreno', sub: 'Aviso 30 min antes', value: notifEntrenos, onChange: setNotifEntrenos },
            { label: 'Mensajes del coach', sub: 'Chat en tiempo real', value: notifChat, onChange: setNotifChat },
            { label: 'Recordatorios de pago', sub: 'Previo al vencimiento', value: notifPagos, onChange: setNotifPagos },
          ].map((item, i, arr) => (
            <View
              key={item.label}
              style={[styles.menuItem, i < arr.length - 1 && styles.menuItemBorder]}
            >
              <View style={styles.menuLeft}>
                <Text style={styles.menuLabel}>{item.label}</Text>
                <Text style={styles.menuSub}>{item.sub}</Text>
              </View>
              <Switch
                value={item.value}
                onValueChange={item.onChange}
                trackColor={{ false: C.border, true: C.primary }}
                thumbColor={C.white}
              />
            </View>
          ))}
        </View>

        {/* Privacidad */}
        <Text style={styles.sectionTitle}>Privacidad</Text>
        <View style={styles.menuCard}>
          <View style={[styles.menuItem, styles.menuItemBorder]}>
            <View style={styles.menuLeft}>
              <Text style={styles.menuLabel}>Perfil público en comunidad</Text>
              <Text style={styles.menuSub}>Otros atletas pueden ver tu actividad</Text>
            </View>
            <Switch
              value={perfilPublico}
              onValueChange={setPerfilPublico}
              trackColor={{ false: C.border, true: C.primary }}
              thumbColor={C.white}
            />
          </View>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate('AthletePrivacyDetail')}
            activeOpacity={0.7}
          >
            <Text style={styles.menuLabel}>Política de privacidad</Text>
            <Text style={styles.menuChevron}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Cuenta */}
        <Text style={styles.sectionTitle}>Cuenta</Text>
        <View style={styles.menuCard}>
          {[
            { label: 'Cambiar contraseña', route: 'AthleteChangePassword' },
            { label: 'Cambiar email', route: 'AthleteChangeEmail' },
            { label: 'Vincular otro coach', route: 'AthleteChangeCoach' },
          ].map((item, i, arr) => (
            <TouchableOpacity
              key={item.label}
              style={[styles.menuItem, i < arr.length - 1 && styles.menuItemBorder]}
              onPress={() => navigation.navigate(item.route)}
              activeOpacity={0.7}
            >
              <Text style={styles.menuLabel}>{item.label}</Text>
              <Text style={styles.menuChevron}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Soporte */}
        <Text style={styles.sectionTitle}>Ayuda</Text>
        <View style={styles.menuCard}>
          {[
            { label: 'Centro de ayuda', route: 'AthleteHelp' },
            { label: 'Reportar un problema', route: 'AthleteReport' },
            { label: 'Términos y condiciones', route: 'AthleteTerms' },
          ].map((item, i, arr) => (
            <TouchableOpacity
              key={item.label}
              style={[styles.menuItem, i < arr.length - 1 && styles.menuItemBorder]}
              onPress={() => navigation.navigate(item.route)}
              activeOpacity={0.7}
            >
              <Text style={styles.menuLabel}>{item.label}</Text>
              <Text style={styles.menuChevron}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Danger zone */}
        <View style={styles.menuCard}>
          <TouchableOpacity
            style={[styles.menuItem, styles.menuItemBorder]}
            onPress={() => navigation.navigate('Login')}
            activeOpacity={0.7}
          >
            <Text style={[styles.menuLabel, styles.menuLabelDanger]}>Cerrar sesión</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
            <Text style={[styles.menuLabel, styles.menuLabelDanger]}>Eliminar cuenta</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.version}>KLEOS v1.0.0 · MVP</Text>
        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.bgGray },
  header: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: C.white, paddingHorizontal: 16,
    paddingVertical: 14, gap: 10,
    borderBottomWidth: 1, borderBottomColor: C.borderSubtle,
  },
  backBtn: { width: 32, height: 32, justifyContent: 'center' },
  backIcon: { fontSize: 22, color: C.textPrimary },
  title: { flex: 1, fontSize: F.lg, fontWeight: '700', color: C.textPrimary },
  scroll: { flex: 1, padding: 16 },
  sectionTitle: {
    fontSize: F.sm, fontWeight: '700', color: C.textTertiary,
    marginBottom: 8, paddingHorizontal: 4,
  },
  menuCard: {
    backgroundColor: C.white, borderRadius: R.xl,
    borderWidth: 1, borderColor: C.borderSubtle,
    marginBottom: 20, ...S.card,
  },
  menuItem: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 14, paddingVertical: 14,
  },
  menuItemBorder: { borderBottomWidth: 1, borderBottomColor: C.borderSubtle },
  menuLeft: { flex: 1, marginRight: 10 },
  menuLabel: { fontSize: F.sm, fontWeight: '600', color: C.textPrimary },
  menuLabelDanger: { color: C.error },
  menuSub: { fontSize: F.xs, color: C.textTertiary, marginTop: 2 },
  menuChevron: { fontSize: 20, color: C.textDisabled },
  version: { fontSize: F.xs, color: C.textDisabled, textAlign: 'center', marginBottom: 8 },
});
