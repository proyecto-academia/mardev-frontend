import { create } from "zustand";
import PaymentRepository from "../api/core/PaymentRepository";
import { useNotificationStore } from "./useNotificationStore";
export const usePurchasesStore = create((set) => ({
  purchases: [],
  loading: false,

  fetchPurchases: async () => {
    set({ loading: true });
    try {
      const response = await PaymentRepository.getUserPurchases();
      console.log("User purchases fetched:", response);
      set({ purchases: response.purchases });
    } catch (error) {
      const notificationStore = useNotificationStore.getState();
      notificationStore.addNotification({
        type: "error",
        message: "Error al cargar las compras del usuario. Por favor, inténtalo de nuevo.",
      });
      console.error("Error fetching user purchases:", error);
    } finally {
      set({ loading: false });
    }
  },
}));