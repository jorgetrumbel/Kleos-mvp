import { Stack } from 'expo-router';

import { AuthProvider } from './providers/AuthProvider';
import { useAuthInitialization } from '@/hooks/useAuthInitialization';

export default function RootLayout() {
  useAuthInitialization();

  return (
    <AuthProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </AuthProvider>
  );
}