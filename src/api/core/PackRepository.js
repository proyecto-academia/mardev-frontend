import apiClient from './apiClient';

const PackRepository = {
  getPacks: () => apiClient.get('/packs'),
  getPack: (id) => apiClient.get(`/packs/${id}`),
  createPack: (data) => apiClient.post('/packs', data),
  updatePack: (id, data) => apiClient.put(`/packs/${id}`, data),
  deletePack: (id) => apiClient.delete(`/packs/${id}`),
};

export default new PackRepository();