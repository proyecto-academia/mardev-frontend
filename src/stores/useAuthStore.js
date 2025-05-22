import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem('token') || null,

  save: (userData, token) => {
    localStorage.setItem('token', token);
    set({ user: userData, token });
  },

  clear: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null });
  },

  loadUserFromStorage: () => {
    const token = localStorage.getItem('token')
    const userString = localStorage.getItem('user')
    const user = userString ? JSON.parse(userString) : null

    if (token && user) {
      set({ token, user }) 
    }
  },

  isAuthenticated: () => !!localStorage.getItem('token'),
}));
