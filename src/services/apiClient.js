// src/services/apiClient.js
import axios from "axios";
import { useAuthStore } from "../stores/useAuthStore";
import { useNotificationStore } from "../stores/useNotificationStore";

const apiClient = axios.create({
  baseURL:
    import.meta.env.VITE_PROD_API_URL ||
    import.meta.env.VITE_DEV_API_URL ||
    "https://mardev.es/api",
  headers: {
    "Content-Type": "application/json",
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
  (response) => {
    // Verificar si la respuesta contiene información sobre la expiración del token
    console.log("apiClient response.data.user:", response.data.user);
    if (response.data && response.data.user) {
      const authStore = useAuthStore.getState();
      authStore.saveTokenWithDefinedExpiration(
        response.data.user.token,
        response.data.user.expires_at
      ); // Guarda el token con la expiración definida
     

      
    }
    return response; // Deja pasar las respuestas exitosas
  }, 
  (error) => {
    const notificationStore = useNotificationStore.getState();

    if (error.response) {
      // Errores de respuesta del servidor (códigos 4xx o 5xx)
      if (
        error.response.status === 401 &&
        error.response.data.message === "token expired"
      ) {
        console.log("[API ERROR] Token expired, redirecting to login");
        //wait 5 seconds before redirecting
        const authStore = useAuthStore.getState();
        authStore.clear(); // Limpia el token y el usuario de la store
        notificationStore.addNotification({
          type: "error",
          message: "Tu sesión ha expirado. Por favor, inicia sesión de nuevo.",
        });
        window.location.href = "/login";

        return Promise.reject(error);
      }
      const message =
        error.response.data.message || "Ocurrió un error en el servidor.";
      if (message === "File not found in database") {
        return Promise.reject(error);
      }
      console.error(`[API ERROR] ${error.response.status}: ${message}`);
      notificationStore.addNotification({ type: "error", message });
    } else if (error.request) {
      // Errores de red o sin respuesta del servidor
      console.error("[NETWORK ERROR]: No response received from server");
      notificationStore.addNotification({
        type: "error",
        message: "No se pudo conectar con el servidor.",
      });
    } else {
      // Otros errores (configuración, etc.)
      console.error(`[UNKNOWN ERROR]: ${error.message}`);
      notificationStore.addNotification({
        type: "error",
        message: "Ocurrió un error inesperado.",
      });
    }

    return Promise.reject(error); // Lanza el error para manejarlo en los repositorios o componentes
  }
);

export default apiClient;
