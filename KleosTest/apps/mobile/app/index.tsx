import { Redirect } from 'expo-router';

import LoadingScreen from './loading';
import { useAuthStore } from '@/store/auth.store';
import { useRegisterStore } from '@/store/register.store';

export default function Index() {
  const isAuthenticated = useAuthStore(
    state => state.isAuthenticated
  );
  const isLoading = useAuthStore(
    state => state.isLoading
  );
  const registrationStep = useRegisterStore(
    state => state.currentStep
  );

  if (isLoading) {
    return <LoadingScreen />;
  }

  console.log('AUTH STATE:', isAuthenticated);
  if (isAuthenticated) {
    if (registrationStep > 1) {
      return <Redirect href="/(auth)/register/step-2" />;
    }

    return <Redirect href="/(coach)" />;
  }

  return <Redirect href="/(auth)/login" />;
}
