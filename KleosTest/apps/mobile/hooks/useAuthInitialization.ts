import { useEffect } from 'react';

import { getMe } from '@/services/auth.service';
import { setAuthToken } from '@/services/api';
import {
  getRegistrationStep,
  getToken,
  removeToken,
} from '@/services/storage.service';
import { useAuthStore } from '@/store/auth.store';
import { useRegisterStore } from '@/store/register.store';

export function useAuthInitialization() {
  const restoreSession = useAuthStore(state => state.restoreSession);
  const stopLoading = useAuthStore(state => state.stopLoading);
  const updateRegistration = useRegisterStore(state => state.update);

  useEffect(() => {
    const initialize = async () => {
      console.log('INITIALIZING AUTH');
      try {
        const token = await getToken();
        console.log('RESTORED TOKEN:', token);
        
        if (token) {
          const user = await getMe(token);

          setAuthToken(token);
          restoreSession(user, token);

          const registrationStep = await getRegistrationStep();

          if (registrationStep && registrationStep > 1) {
            updateRegistration({
              currentStep: registrationStep,
            });
          }
        }
      } catch (error) {
        console.error('Failed to restore session', error);
        setAuthToken(null);
        await removeToken();
      } finally {
        stopLoading();
      }
    };

    initialize();
  }, []);
}
