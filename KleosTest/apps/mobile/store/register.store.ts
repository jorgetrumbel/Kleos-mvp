import { create } from 'zustand';

export type RegistrationRole = 'coach' | 'athlete';

type RegistrationState = {
  role: RegistrationRole;
  firstName: string;
  lastName: string;
  birthDate: string;
  email: string;
  password: string;
  currentStep: number;
  update: (data: Partial<RegistrationData>) => void;
  clear: () => void;
};

type RegistrationData = Omit<RegistrationState, 'update' | 'clear'>;

const initialState: RegistrationData = {
  role: 'coach',
  firstName: '',
  lastName: '',
  birthDate: '',
  email: '',
  password: '',
  currentStep: 1,
};

export const useRegisterStore = create<RegistrationState>((set) => ({
  ...initialState,

  update: (data) =>
    set((state) => ({
      ...state,
      ...data,
    })),

  clear: () => set(initialState),
}));
