import { create } from 'zustand'

export const useNotificationStore = create((set) => ({
  notifications: [],

  addNotification: (notification) =>
    set((state) => ({
      notifications: [...state.notifications, notification],
    })),

  removeNotification: (index) =>
    set((state) => ({
      notifications: state.notifications.filter((_, i) => i !== index),
    })),

  clearNotifications: () =>
    set(() => ({
      notifications: [],
    })),

    reset: () =>
    set(() => ({
      notifications: [],
    })),
}))
