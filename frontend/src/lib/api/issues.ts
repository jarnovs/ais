import * as z from 'zod';
import { apiClient } from './api-client';
import { BaseEntity } from './types';

export interface Issue extends BaseEntity {
  effective_date: string 
  publication_date: string 
  reason_for_change: string
  status: "active" | "future" | "archived" | "hidden"
  folder: string
}

export interface IssueFormData {
  effective_date: string 
  publication_date: string 
  reason_for_change: string
  status: "active" | "future" | "archived" | "hidden"
  folder: string
}

export const issuesApi = {
  getIssues: async (params?: string): Promise<Issue[]> => {
    const response = await apiClient.get(`/eaip_issues?limit=999&${params}`, {
      headers: { 'Cache-Control': 'no-store' },
    });
    return response.data;
  },

  getIssue: async (id: number): Promise<Issue> => {
    const response = await apiClient.get(`/eaip_issues/${id}`);
    return response.data;
  },

  createIssue: async (data: any, config = {}) => {
    const response = await apiClient.post("/eaip_issues/", data, config);
    return response.data;
  },

  updateIssue: async (id: number, data: any, config = {}) => {
    const response = await apiClient.patch(`/eaip_issues/${id}`, data, config);
    return response.data;
  },

  deleteIssue: async (id: number): Promise<Issue> => {
    const response = await apiClient.delete(`/eaip_issues/${id}`);
    return response.data;
  },
};
