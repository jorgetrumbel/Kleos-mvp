// app/(coach)/index.tsx

import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';

import { colors } from '@/theme';

import { Button } from '@/components/ui/Button';
import { useAuthStore } from '@/store/auth.store';

import { removeToken } from '@/services/storage.service';
import { setAuthToken } from '@/services/api';

export default function CoachHomeScreen() {
  const user = useAuthStore(state => state.user);
  const router = useRouter();
  const logout = useAuthStore(state => state.logout);

  const handleLogout = async () => {
    await removeToken();
    setAuthToken(null);
    logout();
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background,
      }}
    >
      <Text style={{ color: colors.primary }}>
        Welcome {user?.email}
      </Text>

      <Button
        label="Logout"
        onPress={handleLogout}
      />
      
    </View>
  );
}



