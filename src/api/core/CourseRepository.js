import apiClient from '../../services/apiClient';
import MediaRepository from '../media/MediaRepository';

class CourseRepository {
  constructor() {
    this.prefix = import.meta.env.VITE_PROD_CORE_PREFIX || import.meta.env.VITE_DEV_CORE_PREFIX || '';
  }

  async getCourses() {
    try {
      const response = await apiClient.get(`${this.prefix}/courses`);
      return response.data.data;
    } catch (error) {
      console.error('[GET COURSES ERROR]:', error.response?.data?.message || error.message);
      throw error;
    }
  }

  async getLatestCourses() {
    try {
      const response = await apiClient.get(`${this.prefix}/courses/latest`);
      return response.data.data;
    } catch (error) {
      console.error('[GET LATEST COURSES ERROR]:', error.response?.data?.message || error.message);
      throw error;
    }
  }

  async getCourse(id) {
    try {
      const response = await apiClient.get(`${this.prefix}/courses/${id}`);
      return response.data.data;
    } catch (error) {
      console.error(`[GET COURSE ERROR]: ${error.response?.data?.message || error.message}`);
      throw error;
    }
  }

  async createCourse(data) {
    try {
      const response = await apiClient.post(`${this.prefix}/courses`, data);
      return response.data.data;
    } catch (error) {
      console.error('[CREATE COURSE ERROR]:', error.response?.data?.message || error.message);
      throw error;
    }
  }

  async updateCourse(id, data) {
    try {
      const response = await apiClient.put(`${this.prefix}/courses/${id}`, data);
      return response.data.data;
    } catch (error) {
      console.error('[UPDATE COURSE ERROR]:', error.response?.data?.message || error.message);
      throw error;
    }
  }

  async deleteCourse(id) {
    try {
      const response = await apiClient.delete(`${this.prefix}/courses/${id}`);
      return response.data.data;
    } catch (error) {
      console.error('[DELETE COURSE ERROR]:', error.response?.data?.message || error.message);
      throw error;
    }
  }
}

export default new CourseRepository();