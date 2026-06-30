For the registration flow, I want to make a few architectural improvements before implementing the first screen.

General requirements:

Registration remains inside the (auth) route group for now.
The first step creates the user by calling the existing /auth/register endpoint.
The backend returns a JWT, the user is authenticated immediately, and the app navigates to step 2.
If the user closes the app during registration, they should return to the last completed step after logging in again.

Implementation requirements:

Create a register.store.ts using Zustand.
This store will hold the complete registration state across all steps.
Include fields such as role, firstName, lastName, birthDate, email, password, and the current registration step.
Add update() and clear() actions.
Use React Hook Form for every registration screen, just like the login screen.
Validation should happen with React Hook Form.
The screen should update the Zustand store after successful validation.
Create reusable UI components instead of embedding them in the screen:
Stepper.tsx
RoleSelector.tsx
DateInput.tsx (can initially wrap a normal Input and be replaced with a native picker later).
Localize all user-facing text using the existing localization system. No hardcoded strings.
Keep the screen responsible only for presentation and validation.
Business logic and API calls should remain in the auth/register service layer.
Registration Step 1 should contain:
Role selector
First name
Last name
Birth date
Email
Password
Confirm password
The Next button should:
Validate the form.
Update the registration store.
Call the existing registration endpoint.
Save the returned JWT.
Authenticate the user.
Navigate to Step 2.

Please implement this incrementally so the application remains functional after each change, and avoid large refactors unless necessary.

Take into consideration that the required screen should look similar to this mock (there are some http artifacts embedded in the code, disregard these):
class="ct-c">// app/(auth)/register/step-1.tsx  (pattern repeated for steps 2–5)
import { useState } from class="ct-s">'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from class="ct-s">'react-native';
import { useRouter } from class="ct-s">'expo-router';
import { ArrowLeft } from class="ct-s">'lucide-react-native';
import { Input } from class="ct-s">'@/components/ui/Input';
import { Button } from class="ct-s">'@/components/ui/Button';
import { colors, spacing } from class="ct-s">'@/theme';

const TOTAL = 5;

export default function RegisterStep1() {
  const router = useRouter();
  const [role, setRole] = useState<class="ct-s">'coach' | class="ct-s">'athlete'>(class="ct-s">'coach');

  return (
    <ScrollView style={s.root} contentContainerStyle={s.content}>
      {/* Header */}
      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={20} color={colors.primary} />
        </TouchableOpacity>
        <Text style={s.stepLabel}>Paso 1 de {TOTAL}</Text>
      </View>
      {/* Progress */}
      <View style={s.track}>
        {Array.from({ length: TOTAL }).map((_, i) => (
          <View key={i} style={[s.seg, i < 1 && s.segActive]} />
        ))}
      </View>
      {/* Role selector */}
      <Text style={s.sectionTitle}>¿Cuál es tu rol?</Text>
      <View style={s.roleRow}>
        {([class="ct-s">'coach', class="ct-s">'athlete'] as const).map(r => (
          <TouchableOpacity key={r} style={[s.roleCard, role === r && s.roleCardActive]} onPress={() => setRole(r)}>
            <Text style={[s.roleText, role === r && s.roleTextActive]}>{r === class="ct-s">'coach' ? class="ct-s">'🏋 Coach' : class="ct-s">'🏃 Atleta'}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {/* Fields */}
      <Input label=class="ct-s">"Nombre" placeholder=class="ct-s">"Juan" />
      <Input label=class="ct-s">"Apellido" placeholder=class="ct-s">"Pérez" />
      <Input label=class="ct-s">"Fecha de nacimiento" placeholder=class="ct-s">"01/01/1990" />
      <Input label=class="ct-s">"Email" placeholder=class="ct-s">"juan@email.com" keyboardType=class="ct-s">"email-address" />
      <Input label=class="ct-s">"Contraseña" placeholder=class="ct-s">"••••••••" secureTextEntry />
      <Button label=class="ct-s">"Siguiente →" onPress={() => router.push(class="ct-s">`/(auth)/register/step-2`)} fullWidth />
    </ScrollView>
  );
}

const s = StyleSheet.create({
  root:          { flex: 1, backgroundColor: colors.background },
  content:       { padding: spacing[5], gap: spacing[3] },
  header:        { flexDirection: class="ct-s">'row', alignItems: class="ct-s">'center', justifyContent: class="ct-s">'space-between' },
  stepLabel:     { fontSize: 13, color: colors.mutedForeground },
  track:         { flexDirection: class="ct-s">'row', gap: 4 },
  seg:           { flex: 1, height: 4, borderRadius: 2, backgroundColor: colors.border },
  segActive:     { backgroundColor: colors.primary },
  sectionTitle:  { fontSize: 18, fontWeight: class="ct-s">'700', color: colors.foreground },
  roleRow:       { flexDirection: class="ct-s">'row', gap: spacing[2] },
  roleCard:      { flex: 1, borderWidth: 2, borderColor: colors.border, borderRadius: 12, padding: spacing[3], alignItems: class="ct-s">'center' },
  roleCardActive:{ borderColor: colors.primary, backgroundColor: class="ct-s">'#f0fafa' },
  roleText:      { fontSize: 14, fontWeight: class="ct-s">'600', color: colors.mutedForeground },
  roleTextActive:{ color: colors.primary },
});