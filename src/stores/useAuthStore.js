import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem('token') || null,
  tokenTime: localStorage.getItem('tokenTime') || null,

  save: (user, token) => {
    const expirationTime = 30 * 60 * 1000; // 30 minutos en milisegundos
    const currentTime = Date.now();
    const expirationDate = currentTime + expirationTime;

    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('tokenTime', expirationDate);

    set({ user, token, tokenTime: expirationDate });
  },

  clear: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('tokenTime');
    set({ user: null, token: null, tokenTime: null });
  },

  loadUserFromStorage: () => {
    const token = localStorage.getItem('token');
    const userString = localStorage.getItem('user');
    const tokenTime = localStorage.getItem('tokenTime');
    const user = userString ? JSON.parse(userString) : null;

    if (token && user && tokenTime && Date.now() < parseInt(tokenTime, 10)) {
      set({ token, user, tokenTime });
    } else {
      // Si el token ha expirado, limpiar el almacenamiento
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('tokenTime');
      set({ user: null, token: null, tokenTime: null });
    }
  },

  isAuthenticated: () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    const tokenTime = localStorage.getItem('tokenTime');

    return (
      !!token &&
      !!user &&
      tokenTime &&
      Date.now() < parseInt(tokenTime, 10)
    );
  },
}));
