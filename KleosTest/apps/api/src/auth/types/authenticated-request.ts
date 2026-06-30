import { Request } from 'express';

export type AuthenticatedUser = {
  id: string;
  email: string;
  role: 'coach' | 'athlete';
};

export type AuthenticatedRequest = Request & {
  user: AuthenticatedUser;
};
