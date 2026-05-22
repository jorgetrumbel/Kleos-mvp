/**
 * Athletica — Login Screen
 * Diseño: fondo oscuro con foto de gym, card semitransparente,
 * inputs dark, botón teal con glow, Apple + Google auth.
 *
 * Dependencias:
 *   npm install @react-native-community/checkbox
 *   (o reemplazar el checkbox con un TouchableOpacity custom)
 *
 * Para el fondo: colocá tu imagen en assets/images/gym_bg.jpg
 * y ajustá el require() en ImageBackground.
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

// ── Design tokens ───────────────────────────────────────────────
const C = {
  bg:         '#0A0E11',
  card:       'rgba(12, 18, 22, 0.88)',
  cardBorder: 'rgba(255, 255, 255, 0.08)',
  input:      'rgba(255, 255, 255, 0.06)',
  inputBorder:'rgba(255, 255, 255, 0.12)',
  teal:       '#1AE8CC',
  tealDim:    '#0FBBA0',
  tealGlow:   'rgba(26, 232, 204, 0.35)',
  white:      '#FFFFFF',
  gray:       '#8A9694',
  darkBtn:    'rgba(255, 255, 255, 0.07)',
  darkBtnBorder: 'rgba(255, 255, 255, 0.15)',
  textPrimary: '#FFFFFF',
  textSub:    '#9AABA8',
};

interface Props {
  navigation?: any;
}

export default function AthleticaLogin({ navigation }: Props) {
  const [email, setEmail]           = useState('carlos@coach.com');
  const [password, setPassword]     = useState('password123');
  const [showPass, setShowPass]     = useState(false);
  const [remember, setRemember]     = useState(true);

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* Background image — reemplazá con tu asset */}
      <ImageBackground
        source={require('./assets/images/gym_bg.jpg')}  // ← ajustá este path
        style={styles.bg}
        resizeMode="cover"
      >
        {/* Dark overlay con gradiente teal sutil */}
        <View style={styles.overlay} />
        <View style={styles.tealGlow} />

        <KeyboardAvoidingView
          style={styles.kav}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView
            contentContainerStyle={styles.scroll}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {/* ── Logo ── */}
            <View style={styles.logoArea}>
              {/* Logo mark — triángulo "A" */}
              <View style={styles.logoMark}>
                <View style={styles.logoTriangle} />
                <View style={styles.logoTriangleGreen} />
              </View>
              <Text style={styles.logoText}>ATHLETICA</Text>
            </View>

            {/* ── Card ── */}
            <View style={styles.card}>

              {/* Heading */}
              <Text style={styles.heading}>Bienvenido/a</Text>
              <Text style={styles.subheading}>
                ¿Estás listo para seguir con tu propósito?
              </Text>

              {/* Email */}
              <Text style={styles.label}>Email</Text>
              <View style={styles.inputWrap}>
                <Text style={styles.inputIcon}>✉</Text>
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="tu@email.com"
                  placeholderTextColor={C.gray}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  selectionColor={C.teal}
                />
              </View>

              {/* Password */}
              <Text style={styles.label}>Contraseña</Text>
              <View style={styles.inputWrap}>
                <Text style={styles.inputIcon}>🔒</Text>
                <TextInput
                  style={styles.input}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="••••••••"
                  placeholderTextColor={C.gray}
                  secureTextEntry={!showPass}
                  autoCapitalize="none"
                  selectionColor={C.teal}
                />
                <TouchableOpacity
                  onPress={() => setShowPass(!showPass)}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                >
                  <Text style={styles.eyeIcon}>{showPass ? '🙈' : '👁'}</Text>
                </TouchableOpacity>
              </View>

              {/* Remember + Forgot */}
              <View style={styles.rememberRow}>
                <TouchableOpacity
                  style={styles.checkRow}
                  onPress={() => setRemember(!remember)}
                  activeOpacity={0.8}
                >
                  <View style={[styles.checkbox, remember && styles.checkboxActive]}>
                    {remember && <Text style={styles.checkmark}>✓</Text>}
                  </View>
                  <Text style={styles.rememberText}>Recordarme</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation?.navigate('ForgotPassword')}>
                  <Text style={styles.forgotText}>Olvidé mi contraseña?</Text>
                </TouchableOpacity>
              </View>

              {/* CTA */}
              <TouchableOpacity
                style={styles.loginBtn}
                activeOpacity={0.85}
                onPress={() => navigation?.navigate('CoachHome')}
              >
                <View style={styles.loginBtnGlow} />
                <Text style={styles.loginBtnText}>Iniciar sesión  →</Text>
              </TouchableOpacity>

              {/* Divider */}
              <View style={styles.dividerRow}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>O CONTINUAR CON</Text>
                <View style={styles.dividerLine} />
              </View>

              {/* Apple */}
              <TouchableOpacity style={styles.socialBtn} activeOpacity={0.8}>
                <Text style={styles.socialIcon}>  </Text>
                <Text style={styles.socialText}>Continuar con Apple</Text>
              </TouchableOpacity>

              {/* Google */}
              <TouchableOpacity style={styles.socialBtn} activeOpacity={0.8}>
                {/* Google G manual render */}
                <View style={styles.googleG}>
                  <Text style={styles.googleGText}>G</Text>
                </View>
                <Text style={styles.socialText}>Continuar con Google</Text>
              </TouchableOpacity>

              {/* Register link */}
              <View style={styles.registerRow}>
                <Text style={styles.registerText}>¿Todavía no tenés cuenta? </Text>
                <TouchableOpacity onPress={() => navigation?.navigate('Register')}>
                  <Text style={styles.registerLink}>Crear cuenta</Text>
                </TouchableOpacity>
              </View>

            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
}

// ── Styles ───────────────────────────────────────────────────────
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: C.bg,
  },
  bg: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(5, 10, 14, 0.72)',
  },
  tealGlow: {
    position: 'absolute',
    bottom: 0,
    left: -width * 0.3,
    width: width * 1.6,
    height: height * 0.55,
    borderRadius: width,
    backgroundColor: 'rgba(26, 232, 204, 0.07)',
  },
  kav: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    paddingBottom: 40,
  },

  // Logo
  logoArea: {
    alignItems: 'center',
    paddingTop: 64,
    paddingBottom: 24,
  },
  logoMark: {
    width: 52,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  logoTriangle: {
    width: 0,
    height: 0,
    borderLeftWidth: 22,
    borderRightWidth: 22,
    borderBottomWidth: 40,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'rgba(255,255,255,0.9)',
  },
  logoTriangleGreen: {
    position: 'absolute',
    top: 10,
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderBottomWidth: 14,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: C.teal,
  },
  logoText: {
    fontSize: 32,
    fontWeight: '900',
    color: C.white,
    letterSpacing: 6,
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif-condensed',
  },

  // Card
  card: {
    marginHorizontal: 20,
    backgroundColor: C.card,
    borderRadius: 24,
    padding: 28,
    borderWidth: 1,
    borderColor: C.cardBorder,
  },
  heading: {
    fontSize: 28,
    fontWeight: '800',
    color: C.white,
    marginBottom: 6,
  },
  subheading: {
    fontSize: 14,
    color: C.textSub,
    marginBottom: 24,
    lineHeight: 20,
  },

  // Labels
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: C.white,
    marginBottom: 8,
  },

  // Input
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: C.input,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: C.inputBorder,
    paddingHorizontal: 16,
    marginBottom: 18,
    height: 52,
  },
  inputIcon: {
    fontSize: 16,
    marginRight: 12,
    color: C.gray,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: C.white,
    height: 52,
  },
  eyeIcon: {
    fontSize: 16,
    color: C.gray,
    paddingLeft: 8,
  },

  // Remember row
  rememberRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: C.inputBorder,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxActive: {
    backgroundColor: C.teal,
    borderColor: C.teal,
  },
  checkmark: {
    fontSize: 13,
    color: C.bg,
    fontWeight: '800',
  },
  rememberText: {
    fontSize: 13,
    color: C.white,
  },
  forgotText: {
    fontSize: 13,
    color: C.teal,
    fontWeight: '600',
  },

  // Login button
  loginBtn: {
    height: 56,
    borderRadius: 28,
    backgroundColor: C.teal,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    overflow: 'visible',
    shadowColor: C.teal,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 18,
    elevation: 10,
  },
  loginBtnGlow: {
    position: 'absolute',
    top: -6, left: -6, right: -6, bottom: -6,
    borderRadius: 34,
    borderWidth: 1,
    borderColor: 'rgba(26,232,204,0.25)',
  },
  loginBtnText: {
    fontSize: 17,
    fontWeight: '800',
    color: C.bg,
    letterSpacing: 0.3,
  },

  // Divider
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 10,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  dividerText: {
    fontSize: 10,
    color: C.textSub,
    letterSpacing: 1.5,
    fontWeight: '600',
  },

  // Social buttons
  socialBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 52,
    borderRadius: 28,
    backgroundColor: C.darkBtn,
    borderWidth: 1,
    borderColor: C.darkBtnBorder,
    marginBottom: 14,
    gap: 12,
  },
  socialIcon: {
    fontSize: 20,
    color: C.white,
  },
  socialText: {
    fontSize: 15,
    color: C.white,
    fontWeight: '600',
  },
  googleG: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleGText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#4285F4',
  },

  // Register
  registerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  registerText: {
    fontSize: 13,
    color: C.textSub,
  },
  registerLink: {
    fontSize: 13,
    color: C.teal,
    fontWeight: '800',
  },
});
