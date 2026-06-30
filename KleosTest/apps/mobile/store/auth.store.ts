import { create } from 'zustand';

type User = {
  id: string;
  email: string;
  role: 'coach' | 'athlete';
};

type AuthState = {
  user: User | null;
  token: string | null;

  isAuthenticated: boolean;
  isLoading: boolean;

  login: (user: User, token: string) => void;
  logout: () => void;
  setToken: (token: string) => void;
  restoreSession: (user: User, token: string) => void;

  startLoading: () => void;
  stopLoading: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,

  isAuthenticated: false,
  isLoading: true,

  login: (user, token) =>
    set({
      user,
      token,
      isAuthenticated: true,
    }),

  logout: () =>
    set({
      user: null,
      token: null,
      isAuthenticated: false,
    }),

  setToken: (token) =>
    set({
      token,
      isAuthenticated: false,
    }),

  restoreSession: (user, token) =>
    set({
      user,
      token,
      isAuthenticated: true,
    }),

  startLoading: () =>
    set({
      isLoading: true,
    }),

  stopLoading: () => {
    console.log('STOP LOADING CALLED');

    set({
      isLoading: false,
    });
  },
}));
