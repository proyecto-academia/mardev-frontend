import apiClient from '../../services/apiClient';

const ClassRepository = {
  getClasses: () => apiClient.get('/classes'),
  getClass: (id) => apiClient.get(`/classes/${id}`),
  createClass: (data) => apiClient.post('/classes', data),
  updateClass: (id, data) => apiClient.put(`/classes/${id}`, data),
  deleteClass: (id) => apiClient.delete(`/classes/${id}`),
};

export default new ClassRepository();