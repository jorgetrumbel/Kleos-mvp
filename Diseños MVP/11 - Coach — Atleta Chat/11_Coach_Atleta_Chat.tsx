/**
 * 11 — Coach — Atleta: Chat
 * Sub-vista: Coach
 * Descripción: Chat directo entre coach y atleta dentro del detalle del atleta.
 * Incluye las 5 sub-tabs: Chat | Pagos | Plan | Métricas | Perfil
 */

import React, { useState, useRef } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, SafeAreaView, TextInput,
  KeyboardAvoidingView, Platform, FlatList,
} from 'react-native';
import { C, F, R } from './KleosTheme';

interface Props { navigation: any; route?: any }

type Tab = 'Chat' | 'Pagos' | 'Plan' | 'Métricas' | 'Perfil';

const MENSAJES = [
  { id: '1', from: 'coach', texto: 'Hola Martina! Revisé tu sesión del martes. El ritmo fue muy bien 👌', hora: '9:10' },
  { id: '2', from: 'atleta', texto: 'Gracias! Me costó mantener el Z3 al final pero lo pude sostener', hora: '9:22' },
  { id: '3', from: 'coach', texto: 'Perfecto. Para el miércoles quiero que hagas 45 min muy tranquila, zona 2.', hora: '9:25' },
  { id: '4', from: 'atleta', texto: 'Dale 👍 ¿A qué hora mejor?', hora: '9:38' },
  { id: '5', from: 'coach', texto: 'Cuando puedas, preferentemente mañana por la mañana 🙂', hora: '9:41' },
];

const SUB_TABS: Tab[] = ['Chat', 'Pagos', 'Plan', 'Métricas', 'Perfil'];

export default function CoachAtletaChatScreen({ navigation, route }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>('Chat');
  const [mensaje, setMensaje] = useState('');
  const scrollRef = useRef<ScrollView>(null);

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    if (tab !== 'Chat') {
      navigation.navigate(`CoachAtleta${tab}`, route?.params);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={0}
      >
        {/* Header atleta */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <View style={styles.atletaAvatar}>
            <Text style={styles.atletaAvatarText}>M</Text>
          </View>
          <View style={styles.atletaInfo}>
            <Text style={styles.atletaNombre}>Martina López</Text>
            <View style={styles.onlineRow}>
              <View style={styles.onlineDot} />
              <Text style={styles.onlineText}>En línea</Text>
            </View>
          </View>
          <TouchableOpacity>
            <Text style={styles.moreIcon}>⋯</Text>
          </TouchableOpacity>
        </View>

        {/* Sub-tabs */}
        <View style={styles.tabsRow}>
          {SUB_TABS.map(tab => (
            <TouchableOpacity
              key={tab}
              style={styles.tab}
              onPress={() => handleTabChange(tab)}
              activeOpacity={0.7}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
                {tab}
              </Text>
              {activeTab === tab && <View style={styles.tabUnderline} />}
            </TouchableOpacity>
          ))}
        </View>

        {/* Mensajes */}
        <ScrollView
          ref={scrollRef}
          style={styles.messagesScroll}
          contentContainerStyle={styles.messagesContent}
          onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: false })}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.dateSep}>
            <View style={styles.dateLine} />
            <Text style={styles.dateText}>Hoy</Text>
            <View style={styles.dateLine} />
          </View>

          {MENSAJES.map(msg => {
            const isCoach = msg.from === 'coach';
            return (
              <View
                key={msg.id}
                style={[styles.msgRow, isCoach ? styles.msgRowLeft : styles.msgRowRight]}
              >
                {isCoach && (
                  <View style={styles.msgAvatar}>
                    <Text style={styles.msgAvatarText}>R</Text>
                  </View>
                )}
                <View style={[styles.bubble, isCoach ? styles.bubbleLeft : styles.bubbleRight]}>
                  <Text style={[styles.bubbleText, !isCoach && styles.bubbleTextRight]}>
                    {msg.texto}
                  </Text>
                  <Text style={[styles.bubbleTime, !isCoach && styles.bubbleTimeRight]}>
                    {msg.hora}
                  </Text>
                </View>
              </View>
            );
          })}
        </ScrollView>

        {/* Input */}
        <View style={styles.inputBar}>
          <View style={styles.inputWrap}>
            <TextInput
              style={styles.input}
              placeholder="Escribí un mensaje..."
              placeholderTextColor={C.textDisabled}
              value={mensaje}
              onChangeText={setMensaje}
              multiline
            />
          </View>
          <TouchableOpacity
            style={[styles.sendBtn, !mensaje.trim() && styles.sendBtnDisabled]}
            disabled={!mensaje.trim()}
            activeOpacity={0.8}
          >
            <Text style={styles.sendIcon}>➤</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.bgGray },
  flex: { flex: 1 },
  header: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: C.white, paddingHorizontal: 16,
    paddingVertical: 12, gap: 10,
    borderBottomWidth: 1, borderBottomColor: C.borderSubtle,
  },
  backBtn: { width: 32, height: 32, justifyContent: 'center' },
  backIcon: { fontSize: 22, color: C.textPrimary },
  atletaAvatar: {
    width: 38, height: 38, borderRadius: 19,
    backgroundColor: '#E8F5E9', alignItems: 'center', justifyContent: 'center',
  },
  atletaAvatarText: { fontSize: F.md, fontWeight: '700', color: '#2E7D32' },
  atletaInfo: { flex: 1 },
  atletaNombre: { fontSize: F.md, fontWeight: '700', color: C.textPrimary },
  onlineRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 2 },
  onlineDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: C.success },
  onlineText: { fontSize: F.xs, color: C.textTertiary },
  moreIcon: { fontSize: 22, color: C.textSecondary },
  tabsRow: {
    flexDirection: 'row', backgroundColor: C.white,
    borderBottomWidth: 1, borderBottomColor: C.borderSubtle,
  },
  tab: { flex: 1, paddingVertical: 11, alignItems: 'center', position: 'relative' },
  tabText: { fontSize: F.xs, color: C.textTertiary, fontWeight: '500' },
  tabTextActive: { color: C.primary, fontWeight: '700' },
  tabUnderline: {
    position: 'absolute', bottom: 0, left: 8, right: 8,
    height: 2, backgroundColor: C.primary, borderRadius: 1,
  },
  messagesScroll: { flex: 1 },
  messagesContent: { padding: 16, gap: 12 },
  dateSep: {
    flexDirection: 'row', alignItems: 'center',
    gap: 8, marginBottom: 4,
  },
  dateLine: { flex: 1, height: 1, backgroundColor: C.borderSubtle },
  dateText: { fontSize: F.xs, color: C.textDisabled },
  msgRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 8, maxWidth: '80%' },
  msgRowLeft: { alignSelf: 'flex-start' },
  msgRowRight: { alignSelf: 'flex-end', flexDirection: 'row-reverse' },
  msgAvatar: {
    width: 28, height: 28, borderRadius: 14,
    backgroundColor: C.primary, alignItems: 'center', justifyContent: 'center',
  },
  msgAvatarText: { fontSize: F.xs, fontWeight: '700', color: C.white },
  bubble: {
    borderRadius: 16, paddingHorizontal: 12, paddingVertical: 10,
    maxWidth: 220,
  },
  bubbleLeft: {
    backgroundColor: C.white, borderTopLeftRadius: 4,
    borderWidth: 1, borderColor: C.borderSubtle,
  },
  bubbleRight: { backgroundColor: C.primary, borderTopRightRadius: 4 },
  bubbleText: { fontSize: F.sm, color: C.textPrimary, lineHeight: 18 },
  bubbleTextRight: { color: C.white },
  bubbleTime: { fontSize: 10, color: C.textDisabled, marginTop: 4, textAlign: 'right' },
  bubbleTimeRight: { color: 'rgba(255,255,255,0.6)' },
  inputBar: {
    flexDirection: 'row', alignItems: 'flex-end',
    backgroundColor: C.white, borderTopWidth: 1,
    borderTopColor: C.borderSubtle, padding: 10, gap: 10,
  },
  inputWrap: {
    flex: 1, backgroundColor: C.bgGray, borderRadius: 22,
    paddingHorizontal: 14, paddingVertical: 10,
    maxHeight: 100,
  },
  input: { fontSize: F.sm, color: C.textPrimary },
  sendBtn: {
    width: 38, height: 38, borderRadius: 19,
    backgroundColor: C.primary, alignItems: 'center', justifyContent: 'center',
  },
  sendBtnDisabled: { backgroundColor: C.border },
  sendIcon: { fontSize: 16, color: C.white },
});
