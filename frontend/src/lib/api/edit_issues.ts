import { apiClient } from './api-client';


export const eaipContentAPI = {
  updateEaipContent: async (id: number, data: any)  => {
    const response = await apiClient.patch(`/eaip_content/${id}`, data);
    return response.data;
  }
};