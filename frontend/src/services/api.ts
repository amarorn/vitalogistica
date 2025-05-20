import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://vitalogistica-backend.onrender.com/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('@VITTA:token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const budgetService = {
  async create(data: any) {
    const response = await api.post('/budgets', data);
    return response.data;
  },

  async update(id: string, data: any) {
    const response = await api.put(`/budgets/${id}`, data);
    return response.data;
  },

  async delete(id: string) {
    const response = await api.delete(`/budgets/${id}`);
    return response.data;
  },

  async getById(id: string) {
    const response = await api.get(`/budgets/${id}`);
    return response.data;
  },

  async list(filters?: any) {
    const response = await api.get('/budgets', { params: filters });
    return response.data;
  },

  async approve(id: string) {
    const response = await api.post(`/budgets/${id}/approve`);
    return response.data;
  }
};

export { api }; 