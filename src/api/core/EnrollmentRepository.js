import apiClient from '../../services/apiClient';

class EnrollmentRepository {
  constructor() {
    this.prefix = import.meta.env.VITE_PROD_CORE_PREFIX || import.meta.env.VITE_DEV_CORE_PREFIX || '';
  }

  async getUserEnrollments(){
    try {
      const response = await apiClient.get(`${this.prefix}/enrollments/user`);
      return response.data.data;
    } catch (error) {
      console.error('[GET USER ENROLLMENTS ERROR]:', error.response?.data?.message || error.message);
      throw error;
    }
  }

  async createEnrollment(data) {
    try {
      const response = await apiClient.post(`${this.prefix}/enrollments`, data);
      return response.data.data;
    } catch (error) {
      console.error('[CREATE ENROLLMENT ERROR]:', error.response?.data?.message || error.message);
      throw error;
    }
  }

  async getEnrollment(id) {
    try {
      const response = await apiClient.get(`${this.prefix}/enrollments/${id}`);
      return response.data.data;
    } catch (error) {
      console.error('[GET ENROLLMENT ERROR]:', error.response?.data?.message || error.message);
      throw error;
    }
  }

  async getAvailableCourses(){
    try {
      const response = await apiClient.get(`${this.prefix}/enrollments/courses`);
      console.log('available courses response:', response.data);
      return response.data.data;
    } catch (error) {
      console.error('[GET AVAILABLE COURSES ERROR]:', error.response?.data?.message || error.message);
      throw error;
    }
  }
}

export default new EnrollmentRepository();