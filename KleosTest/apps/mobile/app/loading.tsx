import { View, ActivityIndicator } from 'react-native';

import { colors } from '@/theme';

export default function LoadingScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background,
      }}
    >
      <ActivityIndicator size="large" />
    </View>
  );
}