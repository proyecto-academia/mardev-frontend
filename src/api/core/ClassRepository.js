import apiClient from '../../services/apiClient';
import MediaRepository from '../media/MediaRepository';

class ClassRepository {
  constructor() {
    this.prefix = import.meta.env.VITE_PROD_CORE_PREFIX || import.meta.env.VITE_DEV_CORE_PREFIX || '';
  }

  async getClasses(params = {}) {
    try {
      const response = await apiClient.get(`${this.prefix}/classes`, {
        params,
      });
      return response.data.data;
    } catch (error) {
      console.error("[GET CLASSES ERROR]:", error.response?.data?.message || error.message);
      throw error;
    }
  }

  async getClass(id) {
    try {
      const response = await apiClient.get(`${this.prefix}/classes/${id}`);
      return response.data.data;
    } catch (error) {
      console.error(`[GET CLASS ERROR]: ${error.response?.data?.message || error.message}`);
      throw error;
    }
  }

  async createClass(data) {
    try {
      const response = await apiClient.post(`${this.prefix}/classes`, data);
      return response.data.data;
    } catch (error) {
      console.error('[CREATE CLASS ERROR]:', error.response?.data?.message || error.message);
      throw error;
    }
  }

  async updateClass(id, data) {
    try {
      const response = await apiClient.put(`${this.prefix}/classes/${id}`, data);
      return response.data.data;
    } catch (error) {
      console.error('[UPDATE CLASS ERROR]:', error.response?.data?.message || error.message);
      throw error;
    }
  }

  async deleteClass(id) {
    try {
      const response = await apiClient.delete(`${this.prefix}/classes/${id}`);
      return response.data.data;
    } catch (error) {
      console.error('[DELETE CLASS ERROR]:', error.response?.data?.message || error.message);
      throw error;
    }
  }

  async getMinPosition() {
    try {
      const response = await apiClient.get(`${this.prefix}/classes/positions/min`);
      console.log('[GET MIN POSITION RESPONSE]:', response.data);
      return response.data.data;
    } catch (error) {
      console.error('[GET MIN POSITION ERROR]:', error.response?.data?.message || error.message);
      throw error;
    }
  }

  async getMaxPosition() {
    try {
      const response = await apiClient.get(`${this.prefix}/classes/positions/max`);
      console.log('[GET MAX POSITION RESPONSE]:', response.data);
      return response.data.data;
    } catch (error) {
      console.error('[GET MAX POSITION ERROR]:', error.response?.data?.message || error.message);
      throw error;
    }
  }

  async getClassPhoto(id) {
    try {
      const response = await MediaRepository.getUrlSingleObject("classes", id, "photo");
      return response?.url || null;
    } catch (error) {
      console.error(`[GET CLASS PHOTO ERROR]: ${error.response?.data?.message || error.message}`);
      throw error;
    }
  }

  async getClassVideo(id) {
    try {
      const response = await MediaRepository.getUrlSingleObject("classes", id, "video");
      return response?.url || null;
    } catch (error) {
      console.error(`[GET CLASS VIDEO ERROR]: ${error.response?.data?.message || error.message}`);
      throw error;
    }
  }
}

export default new ClassRepository();