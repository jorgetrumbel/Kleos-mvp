import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'auth_token';
const REGISTRATION_STEP_KEY = 'registration_step';

export async function saveToken(token: string) {
  await SecureStore.setItemAsync(TOKEN_KEY, token);
}

export async function getToken() {
  return SecureStore.getItemAsync(TOKEN_KEY);
}

export async function removeToken() {
  return SecureStore.deleteItemAsync(TOKEN_KEY);
}

export async function saveRegistrationStep(step: number) {
  await SecureStore.setItemAsync(
    REGISTRATION_STEP_KEY,
    String(step),
  );
}

export async function getRegistrationStep() {
  const step = await SecureStore.getItemAsync(REGISTRATION_STEP_KEY);

  return step ? Number(step) : null;
}

export async function removeRegistrationStep() {
  return SecureStore.deleteItemAsync(REGISTRATION_STEP_KEY);
}
