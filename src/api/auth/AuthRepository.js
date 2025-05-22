import apiClient from '../services/apiClient';

class AuthRepository {
  // Realiza una petición de login
  async login(email, password) {
    try {
      const response = await apiClient.post('/login', { email, password });
      return response.data;
    } catch (error) {
      console.error('[LOGIN ERROR]:', error.response?.data?.message || error.message);
      throw error;
    }
  }

  // Realiza una petición de logout
  async logout() {
    try {
      const response = await apiClient.post('/logout');
      return response.data;
    } catch (error) {
      console.error('[LOGOUT ERROR]:', error.response?.data?.message || error.message);
      throw error;
    }
  }

  // Obtiene los datos del usuario autenticado
  async me() {
    try {
      const response = await apiClient.get('/me');
      return response.data;
    } catch (error) {
      console.error('[ME ERROR]:', error.response?.data?.message || error.message);
      throw error;
    }
  }

  // Refresca el token de autenticación
  async refresh() {
    try {
      const response = await apiClient.post('/refresh');
      return response.data;
    } catch (error) {
      console.error('[REFRESH ERROR]:', error.response?.data?.message || error.message);
      throw error;
    }
  }

  // Realiza una petición de registro
  async register(name, email, password, passwordConfirmation) {
    try {
      const response = await apiClient.post('/register', {
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
      });
      return response.data;
    } catch (error) {
      console.error('[REGISTER ERROR]:', error.response?.data?.message || error.message);
      throw error;
    }
  }
}

export default new AuthRepository();