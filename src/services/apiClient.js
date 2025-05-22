// src/services/apiClient.js
import axios from 'axios';
import useAuthStore from '../stores/authStore';
import { useNotificationStore } from '../stores/useNotificationStore';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://mardev.es/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor: usa el token desde la store
apiClient.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor: manejo de errores global
apiClient.interceptors.response.use(
  (response) => response, // Deja pasar las respuestas exitosas
  (error) => {
    const notificationStore = useNotificationStore.getState();

    if (error.response) {
      // Errores de respuesta del servidor (códigos 4xx o 5xx)
      const message = error.response.data.message || 'Ocurrió un error en el servidor.';
      console.error(`[API ERROR] ${error.response.status}: ${message}`);
      notificationStore.addNotification({ type: 'error', message });
    } else if (error.request) {
      // Errores de red o sin respuesta del servidor
      console.error('[NETWORK ERROR]: No response received from server');
      notificationStore.addNotification({ type: 'error', message: 'No se pudo conectar con el servidor.' });
    } else {
      // Otros errores (configuración, etc.)
      console.error(`[UNKNOWN ERROR]: ${error.message}`);
      notificationStore.addNotification({ type: 'error', message: 'Ocurrió un error inesperado.' });
    }

    return Promise.reject(error); // Lanza el error para manejarlo en los repositorios o componentes
  }
);

export default apiClient;
