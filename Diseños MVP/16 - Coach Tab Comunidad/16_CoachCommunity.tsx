/**
 * 16 — Coach — Tab Comunidad
 * Pantalla: Coach
 * Descripción: Feed de comunidad del coach. Posts de atletas, logros,
 * actividad reciente y opción de crear publicaciones.
 */

import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, SafeAreaView, TextInput,
} from 'react-native';
import { C, F, R, S } from './KleosTheme';

interface Props { navigation: any }

const POSTS = [
  {
    id: '1',
    autor: 'Martina López',
    inicial: 'M',
    color: '#E8F5E9', tc: '#2E7D32',
    tiempo: '2h',
    texto: 'Completé mi primer intervalo 5×1km! Agotada pero feliz 🔥',
    likes: 5,
    tipo: 'logro',
  },
  {
    id: '2',
    autor: 'Javier Romero',
    inicial: 'J',
    color: '#EBF4F5', tc: '#1A7C83',
    tiempo: '5h',
    texto: 'Sesión de fuerza completada. Semana 3 en progreso 💪',
    likes: 3,
    tipo: 'entreno',
  },
  {
    id: '3',
    autor: 'Roberto (Coach)',
    inicial: 'R',
    color: C.primary, tc: C.white,
    tiempo: 'Ayer',
    texto: 'Recuerden hidratarse bien esta semana, el calor va a estar fuerte. Especial atención en los intervalos 💧',
    likes: 8,
    tipo: 'anuncio',
  },
];

export default function CoachCommunityScreen({ navigation }: Props) {
  const [nuevoPost, setNuevoPost] = useState('');

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Comunidad</Text>
        <TouchableOpacity style={styles.filterBtn}>
          <Text style={styles.filterIcon}>⚙️</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Crear post */}
        <View style={styles.createCard}>
          <View style={styles.createAvatar}>
            <Text style={styles.createAvatarText}>R</Text>
          </View>
          <TouchableOpacity
            style={styles.createInput}
            onPress={() => navigation.navigate('CoachNewPost')}
            activeOpacity={0.7}
          >
            <Text style={styles.createPlaceholder}>Compartí algo con tu comunidad...</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.createBtn}
            onPress={() => navigation.navigate('CoachNewPost')}
            activeOpacity={0.8}
          >
            <Text style={styles.createBtnText}>+</Text>
          </TouchableOpacity>
        </View>

        {/* Tabs feed */}
        <View style={styles.feedTabs}>
          {['Todos', 'Logros', 'Entrenos', 'Anuncios'].map((t, i) => (
            <TouchableOpacity key={t} style={[styles.feedTab, i === 0 && styles.feedTabActive]}>
              <Text style={[styles.feedTabText, i === 0 && styles.feedTabTextActive]}>{t}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Posts */}
        {POSTS.map(post => (
          <View key={post.id} style={styles.postCard}>
            <View style={styles.postHeader}>
              <View style={[styles.postAvatar, { backgroundColor: post.color }]}>
                <Text style={[styles.postAvatarText, { color: post.tc }]}>{post.inicial}</Text>
              </View>
              <View style={styles.postMeta}>
                <Text style={styles.postAutor}>{post.autor}</Text>
                <Text style={styles.postTiempo}>{post.tiempo}</Text>
              </View>
              {post.tipo === 'anuncio' && (
                <View style={styles.anuncioBadge}>
                  <Text style={styles.anuncioText}>📢 Anuncio</Text>
                </View>
              )}
              {post.tipo === 'logro' && (
                <View style={styles.logroBadge}>
                  <Text style={styles.logroText}>🏆 Logro</Text>
                </View>
              )}
            </View>
            <Text style={styles.postTexto}>{post.texto}</Text>
            <View style={styles.postActions}>
              <TouchableOpacity style={styles.postAction}>
                <Text style={styles.postActionIcon}>❤️</Text>
                <Text style={styles.postActionText}>{post.likes}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.postAction}>
                <Text style={styles.postActionIcon}>💬</Text>
                <Text style={styles.postActionText}>Responder</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        <View style={{ height: 20 }} />
      </ScrollView>

      {/* Bottom nav */}
      <View style={styles.nav}>
        {[
          { label: 'Inicio', icon: '🏠', route: 'CoachHome' },
          { label: 'Atletas', icon: '👥', route: 'CoachAthletes' },
          { label: 'Comunidad', icon: '💬', route: 'CoachCommunity' },
          { label: 'Calendario', icon: '📅', route: 'CoachCalendar' },
          { label: 'Planific.', icon: '📋', route: 'CoachPlanning' },
        ].map(t => (
          <TouchableOpacity key={t.label} style={styles.navTab} onPress={() => navigation.navigate(t.route)}>
            <Text style={styles.navIcon}>{t.icon}</Text>
            <Text style={[styles.navLabel, t.label === 'Comunidad' && styles.navLabelActive]}>{t.label}</Text>
            {t.label === 'Comunidad' && <View style={styles.navDot} />}
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.bg },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12,
  },
  title: { fontSize: F['2xl'], fontWeight: '700', color: C.textPrimary },
  filterBtn: { padding: 4 },
  filterIcon: { fontSize: 20 },
  scroll: { flex: 1 },
  createCard: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: C.white, marginHorizontal: 16,
    borderRadius: R.xl, borderWidth: 1, borderColor: C.borderSubtle,
    padding: 12, gap: 10, marginBottom: 12, ...S.card,
  },
  createAvatar: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: C.primary, alignItems: 'center', justifyContent: 'center',
  },
  createAvatarText: { fontSize: F.md, fontWeight: '700', color: C.white },
  createInput: {
    flex: 1, backgroundColor: C.bgGray, borderRadius: R.full,
    paddingHorizontal: 14, paddingVertical: 9,
  },
  createPlaceholder: { fontSize: F.sm, color: C.textDisabled },
  createBtn: {
    width: 34, height: 34, borderRadius: 17,
    backgroundColor: C.primary, alignItems: 'center', justifyContent: 'center',
  },
  createBtnText: { fontSize: F.xl, fontWeight: '700', color: C.white, lineHeight: 22 },
  feedTabs: {
    flexDirection: 'row', paddingHorizontal: 16, gap: 8, marginBottom: 12,
  },
  feedTab: {
    paddingHorizontal: 12, paddingVertical: 6,
    borderRadius: R.full, backgroundColor: C.white,
    borderWidth: 1, borderColor: C.border,
  },
  feedTabActive: { backgroundColor: C.primary, borderColor: C.primary },
  feedTabText: { fontSize: F.sm, color: C.textSecondary },
  feedTabTextActive: { color: C.white, fontWeight: '700' },
  postCard: {
    backgroundColor: C.white, marginHorizontal: 16,
    borderRadius: R.xl, borderWidth: 1, borderColor: C.borderSubtle,
    padding: 14, marginBottom: 10, ...S.card,
  },
  postHeader: {
    flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10,
  },
  postAvatar: {
    width: 38, height: 38, borderRadius: 19,
    alignItems: 'center', justifyContent: 'center',
  },
  postAvatarText: { fontSize: F.md, fontWeight: '700' },
  postMeta: { flex: 1 },
  postAutor: { fontSize: F.sm, fontWeight: '700', color: C.textPrimary },
  postTiempo: { fontSize: F.xs, color: C.textTertiary, marginTop: 1 },
  anuncioBadge: {
    backgroundColor: C.primaryBg, borderRadius: R.xs,
    paddingHorizontal: 8, paddingVertical: 3,
  },
  anuncioText: { fontSize: F.xs, fontWeight: '600', color: C.primary },
  logroBadge: {
    backgroundColor: '#FFF8E1', borderRadius: R.xs,
    paddingHorizontal: 8, paddingVertical: 3,
  },
  logroText: { fontSize: F.xs, fontWeight: '600', color: '#F59E0B' },
  postTexto: { fontSize: F.sm, color: C.textPrimary, lineHeight: 18, marginBottom: 12 },
  postActions: { flexDirection: 'row', gap: 16 },
  postAction: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  postActionIcon: { fontSize: 16 },
  postActionText: { fontSize: F.sm, color: C.textTertiary },
  nav: {
    flexDirection: 'row', backgroundColor: C.white,
    borderTopWidth: 1, borderTopColor: C.borderSubtle,
    paddingTop: 8, paddingBottom: 20, paddingHorizontal: 8,
  },
  navTab: { flex: 1, alignItems: 'center', gap: 2 },
  navIcon: { fontSize: 20 },
  navLabel: { fontSize: F.xs, color: C.textDisabled },
  navLabelActive: { color: C.primary, fontWeight: '700' },
  navDot: { width: 4, height: 4, borderRadius: 2, backgroundColor: C.primary },
});
