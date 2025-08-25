import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://ais.ansp.kg';

export const apiClient = axios.create({
  baseURL: `${API_BASE_URL}/api/v1`,
  withCredentials: true,
});

export interface LoginRequest {
  username: string;
  password: string;
}

export interface User {
  id: number;
  name: string;
}

export const authApi = {
  login: async (data: LoginRequest): Promise<void> => {
    await apiClient.post('/auth/login', data);
  },

  getAuth: async (): Promise<User> => {
    const response = await apiClient.get('/auth');
    return response.data;
  },

  logout: async (): Promise<void> => {
    await apiClient.post('/auth/logout');
  },

  logoutAll: async (): Promise<void> => {
    await apiClient.post('/auth/logout-all');
  },
};
