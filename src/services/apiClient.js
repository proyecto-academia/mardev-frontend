// src/services/apiClient.js
import axios from 'axios'
import useAuthStore from '../stores/authStore'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://mardev.es/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor: usa el token desde la store
apiClient.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

export default apiClient
