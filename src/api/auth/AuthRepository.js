import apiClient from '../../services/apiClient';

class AuthRepository {
  constructor() {
    this.prefix = import.meta.env.VITE_PROD_AUTH_PREFIX || import.meta.env.VITE_DEV_AUTH_PREFIX || '';
  }

  async login(email, password) {
    try {
      const response = await apiClient.post(`${this.prefix}/login`, { email, password });
      console.log('Login response:', response.data);
      const {access_token, user} = response.data.data;
      return {
        user,
        token: access_token,
      };
    } catch (error) {
      console.error('[LOGIN ERROR]:', error.response?.data?.message || error.message);
      throw error;
    }
  }

  async logout() {
    try {
      const response = await apiClient.post(`${this.prefix}/logout`);
      return response.data.data;
    } catch (error) {
      console.error('[LOGOUT ERROR]:', error.response?.data?.message || error.message);
      throw error;
    }
  }

  async me() {
    try {
      const response = await apiClient.get(`${this.prefix}/me`);
      return response.data.data;
    } catch (error) {
      console.error('[ME ERROR]:', error.response?.data?.message || error.message);
      throw error;
    }
  }

  async refresh() {
    try {
      const response = await apiClient.post(`${this.prefix}/refresh`);
      return response.data.data;
    } catch (error) {
      console.error('[REFRESH ERROR]:', error.response?.data?.message || error.message);
      throw error;
    }
  }

  async register(name, email, password, passwordConfirmation) {
    try {
      const response = await apiClient.post(`${this.prefix}/register`, {
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
      });
      return response.data.data;
    } catch (error) {
      console.error('[REGISTER ERROR]:', error.response?.data?.message || error.message);
      throw error;
    }
  }
}

export default new AuthRepository();