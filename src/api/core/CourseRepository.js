import apiClient from '../../services/apiClient';

class CourseRepository{
  constructor() {
    this.prefix = import.meta.env.VITE_PROD_CORE_PREFIX || import.meta.env.VITE_DEV_CORE_PREFIX || '';
  }
  async getCourses() {
    try {
      const response = await apiClient.get('/courses');
      return response.data.data;
    } catch (error) {
      console.error('[GET COURSES ERROR]:', error.response?.data?.message || error.message);
      throw error; // Lanza el error para que el componente lo maneje
    }
  }

  async getLatestCourses() {
    try {
      const response = await apiClient.get('/courses/latest');
      return response.data.data;
    } catch (error) {
      console.error('[GET LATEST COURSES ERROR]:', error.response?.data?.message || error.message);
      throw error; // Lanza el error para que el componente lo maneje
    }
  }

  async getCourse(id) {
    try {
      const response = await apiClient.get(`/courses/${id}`);
      return response.data.data;
    } catch (error) {
      console.error(`[GET COURSE ERROR]: ${error.response?.data?.message || error.message}`);
      throw error;
    }
  }

  async createCourse(data) {
    try {
      const response = await apiClient.post('/courses', data);
      return response.data.data;
    } catch (error) {
      console.error('[CREATE COURSE ERROR]:', error.response?.data?.message || error.message);
      throw error;
    }
  }

  async updateCourse(id, data) {
    try {
      const response = await apiClient.put(`/courses/${id}`, data);
      return response.data.data;
    } catch (error) {
      console.error('[UPDATE COURSE ERROR]:', error.response?.data?.message || error.message);
      throw error;
    }
  }

  async deleteCourse(id) {
    try {
      const response = await apiClient.delete(`/courses/${id}`);
      return response.data.data;
    } catch (error) {
      console.error('[DELETE COURSE ERROR]:', error.response?.data?.message || error.message);
      throw error;
    }
  }
};

export default new CourseRepository();