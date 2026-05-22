/**
 * 32 — Coach / Atleta — Notificaciones
 * Pantalla: Ambos
 * Descripción: Centro de notificaciones. Lista de avisos recientes
 * agrupados por hoy, ayer y anteriores.
 */

import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, SafeAreaView,
} from 'react-native';
import { C, F, R, S } from './KleosTheme';

interface Props { navigation: any }

const NOTIFICACIONES = [
  {
    id: '1', grupo: 'Hoy',
    icon: '💬', titulo: 'Martina López te escribió',
    sub: '"Dale, lo hago mañana temprano 🙌"',
    tiempo: '2h', leida: false, route: 'CoachAtletaChat',
  },
  {
    id: '2', grupo: 'Hoy',
    icon: '✅', titulo: 'Carlos Méndez completó un entreno',
    sub: 'Brick bici + run · RPE 7/10',
    tiempo: '4h', leida: false, route: 'CoachAtletaPlan',
  },
  {
    id: '3', grupo: 'Hoy',
    icon: '⚠️', titulo: 'Pago pendiente',
    sub: 'Lucas Torres · Mayo 2026 · $12.000',
    tiempo: '6h', leida: true, route: 'CoachAtletaPagos',
  },
  {
    id: '4', grupo: 'Ayer',
    icon: '📋', titulo: 'Nuevo plan asignado',
    sub: 'Sofía Paredes · Plan 10K Base',
    tiempo: 'Ayer', leida: true, route: 'CoachAtletaPlan',
  },
  {
    id: '5', grupo: 'Ayer',
    icon: '👤', titulo: 'Nuevo atleta registrado',
    sub: 'Ana Gutiérrez usó tu código de invitación',
    tiempo: 'Ayer', leida: true, route: 'CoachAthletes',
  },
  {
    id: '6', grupo: 'Antes',
    icon: '💰', titulo: 'Pago recibido',
    sub: 'Martina López · Mayo 2026 · $12.000',
    tiempo: '3 días', leida: true, route: 'CoachAtletaPagos',
  },
];

export default function NotificationsScreen({ navigation }: Props) {
  const [notifs, setNotifs] = useState(NOTIFICACIONES);

  const markAllRead = () => {
    setNotifs(prev => prev.map(n => ({ ...n, leida: true })));
  };

  const unread = notifs.filter(n => !n.leida).length;
  const grupos = ['Hoy', 'Ayer', 'Antes'];

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>
          Notificaciones {unread > 0 ? `(${unread})` : ''}
        </Text>
        {unread > 0 && (
          <TouchableOpacity onPress={markAllRead}>
            <Text style={styles.markAllText}>Leer todo</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {grupos.map(grupo => {
          const items = notifs.filter(n => n.grupo === grupo);
          if (!items.length) return null;
          return (
            <View key={grupo}>
              <Text style={styles.grupoTitle}>{grupo}</Text>
              <View style={styles.grupoCard}>
                {items.map((notif, i) => (
                  <TouchableOpacity
                    key={notif.id}
                    style={[
                      styles.notifRow,
                      i < items.length - 1 && styles.notifRowBorder,
                      !notif.leida && styles.notifRowUnread,
                    ]}
                    onPress={() => {
                      setNotifs(prev => prev.map(n => n.id === notif.id ? { ...n, leida: true } : n));
                      navigation.navigate(notif.route);
                    }}
                    activeOpacity={0.7}
                  >
                    <View style={[styles.notifIcon, !notif.leida && styles.notifIconUnread]}>
                      <Text style={styles.notifIconText}>{notif.icon}</Text>
                    </View>
                    <View style={styles.notifContent}>
                      <Text style={[styles.notifTitle, !notif.leida && styles.notifTitleUnread]}>
                        {notif.titulo}
                      </Text>
                      <Text style={styles.notifSub} numberOfLines={1}>{notif.sub}</Text>
                    </View>
                    <View style={styles.notifRight}>
                      <Text style={styles.notifTime}>{notif.tiempo}</Text>
                      {!notif.leida && <View style={styles.unreadDot} />}
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          );
        })}
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
  markAllText: { fontSize: F.sm, color: C.primary, fontWeight: '600' },
  scroll: { flex: 1, padding: 16 },
  grupoTitle: {
    fontSize: F.sm, fontWeight: '700', color: C.textTertiary,
    marginBottom: 8, paddingHorizontal: 4,
  },
  grupoCard: {
    backgroundColor: C.white, borderRadius: R.xl,
    borderWidth: 1, borderColor: C.borderSubtle,
    marginBottom: 16, ...S.card,
  },
  notifRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 14, paddingVertical: 12, gap: 12,
  },
  notifRowBorder: { borderBottomWidth: 1, borderBottomColor: C.borderSubtle },
  notifRowUnread: { backgroundColor: C.primaryBg },
  notifIcon: {
    width: 40, height: 40, borderRadius: R.lg,
    backgroundColor: C.bgGray, alignItems: 'center', justifyContent: 'center',
  },
  notifIconUnread: { backgroundColor: '#E0F0F1' },
  notifIconText: { fontSize: 20 },
  notifContent: { flex: 1 },
  notifTitle: { fontSize: F.sm, fontWeight: '500', color: C.textSecondary },
  notifTitleUnread: { fontWeight: '700', color: C.textPrimary },
  notifSub: { fontSize: F.xs, color: C.textTertiary, marginTop: 2 },
  notifRight: { alignItems: 'flex-end', gap: 4 },
  notifTime: { fontSize: F.xs, color: C.textDisabled },
  unreadDot: {
    width: 8, height: 8, borderRadius: 4,
    backgroundColor: C.primary,
  },
});
