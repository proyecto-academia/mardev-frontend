import apiClient from '../../services/apiClient';

class PackRepository {
  constructor() {
    this.prefix = import.meta.env.VITE_PROD_CORE_PREFIX || import.meta.env.VITE_DEV_CORE_PREFIX || '';
  }

  async getPacks() {
    try {
      const response = await apiClient.get(`${this.prefix}/packs`);
      return response.data.data;
    } catch (error) {
      console.error('[GET PACKS ERROR]:', error.response?.data?.message || error.message);
      throw error;
    }
  }

  async getPack(id) {
    try {
      const response = await apiClient.get(`${this.prefix}/packs/${id}`);
      return response.data.data;
    } catch (error) {
      console.error(`[GET PACK ERROR]: ${error.response?.data?.message || error.message}`);
      throw error;
    }
  }

  async createPack(data) {
    try {
      const response = await apiClient.post(`${this.prefix}/packs`, data);
      return response.data.data;
    } catch (error) {
      console.error('[CREATE PACK ERROR]:', error.response?.data?.message || error.message);
      throw error;
    }
  }

  async updatePack(id, data) {
    try {
      const response = await apiClient.put(`${this.prefix}/packs/${id}`, data);
      return response.data.data;
    } catch (error) {
      console.error('[UPDATE PACK ERROR]:', error.response?.data?.message || error.message);
      throw error;
    }
  }

  async deletePack(id) {
    try {
      const response = await apiClient.delete(`${this.prefix}/packs/${id}`);
      return response.data.data;
    } catch (error) {
      console.error('[DELETE PACK ERROR]:', error.response?.data?.message || error.message);
      throw error;
    }
  }
}

export default new PackRepository();