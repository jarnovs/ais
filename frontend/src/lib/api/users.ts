import * as z from 'zod';
import { apiClient } from './api-client';
import { BaseEntity } from './types';

export interface AdminUser extends BaseEntity {
  name: string;
}

export interface UserFormData {
  name: string;
  password: string;
}

export const usersApi = {
  getUsers: async (): Promise<AdminUser[]> => {
    const response = await apiClient.get('/users?limit=999', {
      headers: { 'Cache-Control': 'no-store' },
    });
    return response.data;
  },

  getUser: async (id: number): Promise<AdminUser> => {
    const response = await apiClient.get(`/users/${id}`);
    return response.data;
  },

  createUser: async (data: UserFormData): Promise<AdminUser> => {
    const response = await apiClient.post('/users', data);
    return response.data;
  },

  updateUser: async (id: number, data: Partial<UserFormData>): Promise<AdminUser> => {
    const response = await apiClient.patch(`/users/${id}`, data);
    return response.data;
  },

  deleteUser: async (id: number): Promise<AdminUser> => {
    const response = await apiClient.delete(`/users/${id}`);
    return response.data;
  },
};

export const UserSchema = z.object({
  name: z
    .string()
    .min(1, 'Имя пользователя обязательно')
    .max(50, 'Имя пользователя не может быть длиннее 50 символов'),
  password: z.string().min(1, 'Пароль обязателен'),
});
