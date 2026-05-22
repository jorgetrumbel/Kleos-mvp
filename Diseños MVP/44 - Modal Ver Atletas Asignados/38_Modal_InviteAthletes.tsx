/**
 * 38 — Modal: Invitar Atletas
 * Tipo: Modal / Bottom Sheet — Coach
 * Descripción: Modal con el código de invitación del coach para compartir
 * con nuevos atletas. Permite copiar y compartir el link.
 */

import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  Modal, Share,
} from 'react-native';
import { C, F, R } from './KleosTheme';

interface Props {
  visible: boolean;
  onClose: () => void;
}

export default function ModalInviteAthletes({ visible, onClose }: Props) {
  const [copiado, setCopiado] = useState(false);
  const codigo = 'KLEOS-ROB47';
  const link = `https://kleos.app/join/${codigo}`;

  const handleCopy = () => {
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  const handleShare = () => {
    Share.share({
      message: `Unite a mi comunidad de entrenamiento en KLEOS 🏃\nUsá mi código: ${codigo}\n${link}`,
      title: 'Invitación KLEOS',
    });
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.backdrop} onPress={onClose} activeOpacity={1} />
        <View style={styles.sheet}>
          <View style={styles.handle} />

          <Text style={styles.title}>Invitar atletas</Text>
          <Text style={styles.sub}>Compartí tu código personal para que nuevos atletas se unan a tu comunidad.</Text>

          {/* Código */}
          <View style={styles.codigoCard}>
            <Text style={styles.codigoLabel}>Tu código</Text>
            <Text style={styles.codigoValue}>{codigo}</Text>
            <TouchableOpacity
              style={[styles.copyBtn, copiado && styles.copyBtnDone]}
              onPress={handleCopy}
              activeOpacity={0.8}
            >
              <Text style={[styles.copyBtnText, copiado && styles.copyBtnTextDone]}>
                {copiado ? '✓ Copiado!' : 'Copiar código'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Link */}
          <View style={styles.linkRow}>
            <View style={styles.linkBox}>
              <Text style={styles.linkText} numberOfLines={1}>{link}</Text>
            </View>
            <TouchableOpacity style={styles.linkCopy} onPress={handleCopy} activeOpacity={0.8}>
              <Text style={styles.linkCopyText}>📋</Text>
            </TouchableOpacity>
          </View>

          {/* Info */}
          <View style={styles.infoList}>
            {[
              'El atleta descarga KLEOS y crea su cuenta',
              'Ingresa tu código en el onboarding',
              'Queda vinculado automáticamente a tu perfil',
            ].map((paso, i) => (
              <View key={i} style={styles.infoPaso}>
                <View style={styles.infoPasoNum}>
                  <Text style={styles.infoPasoNumText}>{i + 1}</Text>
                </View>
                <Text style={styles.infoPasoText}>{paso}</Text>
              </View>
            ))}
          </View>

          {/* Acciones */}
          <TouchableOpacity style={styles.shareBtn} onPress={handleShare} activeOpacity={0.85}>
            <Text style={styles.shareBtnText}>↗ Compartir invitación</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Text style={styles.closeBtnText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: 'flex-end' },
  backdrop: { ...StyleSheet.absoluteFillObject, backgroundColor: C.overlay },
  sheet: {
    backgroundColor: C.white, borderTopLeftRadius: 24, borderTopRightRadius: 24,
    padding: 20, paddingBottom: 34,
  },
  handle: {
    width: 40, height: 4, borderRadius: 2, backgroundColor: C.border,
    alignSelf: 'center', marginBottom: 16,
  },
  title: { fontSize: F['2xl'], fontWeight: '800', color: C.textPrimary, marginBottom: 6 },
  sub: { fontSize: F.sm, color: C.textTertiary, lineHeight: 17, marginBottom: 20 },
  codigoCard: {
    backgroundColor: C.primary, borderRadius: R.xl,
    padding: 20, alignItems: 'center', marginBottom: 12,
  },
  codigoLabel: { fontSize: F.xs, color: 'rgba(255,255,255,0.7)', marginBottom: 6 },
  codigoValue: { fontSize: F['5xl'], fontWeight: '800', color: C.white, letterSpacing: 3, marginBottom: 14 },
  copyBtn: {
    backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: R.lg,
    paddingHorizontal: 20, paddingVertical: 9,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)',
  },
  copyBtnDone: { backgroundColor: 'rgba(255,255,255,0.35)' },
  copyBtnText: { fontSize: F.sm, fontWeight: '700', color: C.white },
  copyBtnTextDone: { color: '#A8F0A8' },
  linkRow: { flexDirection: 'row', gap: 8, marginBottom: 16, alignItems: 'center' },
  linkBox: {
    flex: 1, backgroundColor: C.bgGray, borderRadius: R.lg,
    paddingHorizontal: 12, paddingVertical: 11,
  },
  linkText: { fontSize: F.sm, color: C.textTertiary },
  linkCopy: {
    width: 42, height: 42, borderRadius: R.lg,
    backgroundColor: C.bgGray, alignItems: 'center', justifyContent: 'center',
  },
  linkCopyText: { fontSize: 20 },
  infoList: { gap: 10, marginBottom: 20 },
  infoPaso: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  infoPasoNum: {
    width: 24, height: 24, borderRadius: 12,
    backgroundColor: C.primaryBg, alignItems: 'center', justifyContent: 'center',
  },
  infoPasoNumText: { fontSize: F.sm, fontWeight: '700', color: C.primary },
  infoPasoText: { flex: 1, fontSize: F.sm, color: C.textSecondary },
  shareBtn: {
    backgroundColor: C.primary, borderRadius: R.lg,
    paddingVertical: 14, alignItems: 'center', marginBottom: 10,
  },
  shareBtnText: { fontSize: F.md, fontWeight: '700', color: C.white },
  closeBtn: { alignItems: 'center', paddingVertical: 8 },
  closeBtnText: { fontSize: F.sm, color: C.textTertiary },
});
