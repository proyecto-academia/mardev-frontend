import apiClient from './apiClient';

const EnrollmentRepository = {
  createEnrollment: (data) => apiClient.post('/enrollments', data),
  getEnrollment: (id) => apiClient.get(`/enrollments/${id}`),
};

export default new EnrollmentRepository();