import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://192.168.0.155:3000/api',
  timeout: 10000,
});

export function setAuthToken(token: string | null) {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    return;
  }

  delete api.defaults.headers.common.Authorization;
}

