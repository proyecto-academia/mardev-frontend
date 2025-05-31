import { create } from "zustand";
import PackRepository from "../api/core/PackRepository";
import { useNotificationStore } from "./useNotificationStore";

export const usePackStore = create((set) => ({
  packs: [],
  singlePack: null,
  enrolledPacks: [],
  pagination: {},
  loading: false,

  fetchPacks: async () => {
    set({ loading: true });
    try {
      const response = await PackRepository.getPacks();
      console.log(response);
      set({ packs: response.packs, pagination: response.pagination });
    } catch (error) {
      const notificationStore = useNotificationStore.getState();
      notificationStore.addNotification({
        type: "error",
        message: "Error al cargar los packs. Por favor, inténtalo de nuevo.",
      });
      console.error("Error loading packs:", error);
    } finally {
      set({ loading: false });
    }
  },

  fetchPack: async (packId) => {
    set({ loading: true });
    try {
      const response = await PackRepository.getPack(packId);
      console.log(response);
      set({ singlePack: response });
    } catch (error) {
      const notificationStore = useNotificationStore.getState();
      notificationStore.addNotification({
        type: "error",
        message: "Error al cargar el pack. Por favor, inténtalo de nuevo.",
      });
      console.error("Error loading pack:", error);
    } finally {
      set({ loading: false });
    }
  },

  fetchUserEnrolledPacks: async () => {
    set({ loading: true });
    try {
      const response = await PackRepository.getUserPacks();
      console.log(response);
      set({ enrolledPacks: response.packs});
    } catch (error) {
      const notificationStore = useNotificationStore.getState();
      notificationStore.addNotification({
        type: "error",
        message:
          "Error al cargar los packs inscritos. Por favor, inténtalo de nuevo.",
      });
      console.error("Error loading user enrolled packs:", error);
    } finally {
      set({ loading: false });
    }
  },
}));
