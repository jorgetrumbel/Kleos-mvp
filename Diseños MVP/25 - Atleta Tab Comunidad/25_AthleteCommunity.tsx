/**
 * 25 — Atleta — Tab Comunidad
 * Pantalla: Atleta
 * Descripción: Feed de comunidad del atleta. Posts del coach, compañeros,
 * logros y posibilidad de publicar actividad propia.
 */

import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, SafeAreaView,
} from 'react-native';
import { C, F, R, S } from './KleosTheme';

interface Props { navigation: any }

const POSTS = [
  {
    id: '1',
    autor: 'Roberto (Coach)',
    inicial: 'R',
    color: C.primary, tc: C.white,
    tiempo: '2h',
    texto: 'Semana 5 arrancando 🔥 Esta semana el foco es calidad de intervalo. Menos volumen, más intensidad.',
    likes: 6,
    tipo: 'anuncio',
  },
  {
    id: '2',
    autor: 'Lucas Torres',
    inicial: 'L',
    color: '#FFF3E0', tc: C.warning,
    tiempo: '4h',
    texto: 'Primera vez que bajo de 5min/km en un intervalo. No lo puedo creer 😭🏃',
    likes: 12,
    tipo: 'logro',
  },
  {
    id: '3',
    autor: 'Sofía Paredes',
    inicial: 'S',
    color: '#F3E8FF', tc: '#7C3AED',
    tiempo: 'Ayer',
    texto: 'Rodaje de 30min completado ✓ Tuve que bajar el ritmo a mitad pero lo terminé.',
    likes: 4,
    tipo: 'entreno',
  },
];

export default function AthleteCommunityScreen({ navigation }: Props) {
  const [liked, setLiked] = useState<string[]>([]);

  const toggleLike = (id: string) => {
    setLiked(prev =>
      prev.includes(id) ? prev.filter(l => l !== id) : [...prev, id]
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Comunidad</Text>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Crear post */}
        <TouchableOpacity
          style={styles.createCard}
          onPress={() => navigation.navigate('AthleteNewPost')}
          activeOpacity={0.8}
        >
          <View style={styles.createAvatar}>
            <Text style={styles.createAvatarText}>M</Text>
          </View>
          <View style={styles.createInput}>
            <Text style={styles.createPlaceholder}>Compartí tu entrenamiento...</Text>
          </View>
          <View style={styles.createBtn}>
            <Text style={styles.createBtnText}>+</Text>
          </View>
        </TouchableOpacity>

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
                <View style={styles.coachBadge}>
                  <Text style={styles.coachBadgeText}>Coach</Text>
                </View>
              )}
              {post.tipo === 'logro' && (
                <View style={styles.logroBadge}>
                  <Text style={styles.logroText}>🏆</Text>
                </View>
              )}
            </View>
            <Text style={styles.postTexto}>{post.texto}</Text>
            <View style={styles.postActions}>
              <TouchableOpacity
                style={styles.postAction}
                onPress={() => toggleLike(post.id)}
              >
                <Text style={styles.postActionIcon}>
                  {liked.includes(post.id) ? '❤️' : '🤍'}
                </Text>
                <Text style={[
                  styles.postActionText,
                  liked.includes(post.id) && styles.postActionTextLiked,
                ]}>
                  {post.likes + (liked.includes(post.id) ? 1 : 0)}
                </Text>
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
          { label: 'Inicio', icon: '🏠', route: 'AthleteHome' },
          { label: 'Mi plan', icon: '📋', route: 'AthletePlan' },
          { label: 'Comunidad', icon: '💬', route: 'AthleteCommunity' },
          { label: 'Métricas', icon: '📊', route: 'AthleteMetrics' },
          { label: 'Perfil', icon: '👤', route: 'AthleteProfile' },
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
  header: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12 },
  title: { fontSize: F['2xl'], fontWeight: '700', color: C.textPrimary },
  scroll: { flex: 1 },
  createCard: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: C.white, marginHorizontal: 16,
    borderRadius: R.xl, borderWidth: 1, borderColor: C.borderSubtle,
    padding: 12, gap: 10, marginBottom: 12, ...S.card,
  },
  createAvatar: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: '#E8F5E9', alignItems: 'center', justifyContent: 'center',
  },
  createAvatarText: { fontSize: F.md, fontWeight: '700', color: '#2E7D32' },
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
  postCard: {
    backgroundColor: C.white, marginHorizontal: 16,
    borderRadius: R.xl, borderWidth: 1, borderColor: C.borderSubtle,
    padding: 14, marginBottom: 10, ...S.card,
  },
  postHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 },
  postAvatar: { width: 38, height: 38, borderRadius: 19, alignItems: 'center', justifyContent: 'center' },
  postAvatarText: { fontSize: F.md, fontWeight: '700' },
  postMeta: { flex: 1 },
  postAutor: { fontSize: F.sm, fontWeight: '700', color: C.textPrimary },
  postTiempo: { fontSize: F.xs, color: C.textTertiary, marginTop: 1 },
  coachBadge: {
    backgroundColor: C.primaryBg, borderRadius: R.xs,
    paddingHorizontal: 8, paddingVertical: 3,
  },
  coachBadgeText: { fontSize: F.xs, fontWeight: '700', color: C.primary },
  logroBadge: {
    backgroundColor: '#FFF8E1', borderRadius: R.full,
    width: 28, height: 28, alignItems: 'center', justifyContent: 'center',
  },
  logroText: { fontSize: 16 },
  postTexto: { fontSize: F.sm, color: C.textPrimary, lineHeight: 18, marginBottom: 12 },
  postActions: { flexDirection: 'row', gap: 16 },
  postAction: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  postActionIcon: { fontSize: 16 },
  postActionText: { fontSize: F.sm, color: C.textTertiary },
  postActionTextLiked: { color: '#E53935', fontWeight: '600' },
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
