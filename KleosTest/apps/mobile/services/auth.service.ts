import { api } from '@/services/api';

export type AuthUser = {
  id: string;
  email: string;
  role: 'coach' | 'athlete';
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  email: string;
  password: string;
  nombre: string;
  apellido: string;
  role: 'coach' | 'atleta';
};

export type LoginResponse = {
  user: AuthUser;
  accessToken: string;
};

export async function login(
  data: LoginRequest
): Promise<LoginResponse> {
  const response = await api.post(
    '/auth/login',
    data
  );

  return response.data;
}

export async function register(
  data: RegisterRequest
): Promise<LoginResponse> {
  const response = await api.post(
    '/auth/register',
    data
  );

  return response.data;
}

export async function getMe(token: string): Promise<AuthUser> {
  const response = await api.get('/auth/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
