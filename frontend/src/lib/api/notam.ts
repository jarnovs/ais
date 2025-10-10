import { apiClient } from './api-client';


export const notamApi = {
  getNotams: async () => {
    const response = await apiClient.get(`/notams`, {
      headers: { 'Cache-Control': 'no-store' },
    });
    return response.data;
  },

  createNotam: async (data: any, config: any = {}) => {
    const response = await apiClient.post("/notam/", data, {
      ...config,
      headers: {
        ...(config.headers || {}),
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  deleteNotam: async (name: string) => {
    const response = await apiClient.delete(`/notam/${name}`);
    return response.data;
  },
};