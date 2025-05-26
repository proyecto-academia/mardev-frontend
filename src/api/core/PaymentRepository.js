import apiClient from "../../services/apiClient";

class PaymentRepository {
  constructor() {
    this.prefix = import.meta.env.VITE_PROD_CORE_PREFIX || import.meta.env.VITE_DEV_CORE_PREFIX || "";
  }

  async createPaymentIntent(itemId, itemType) {
    try {
      const response = await apiClient.post(`${this.prefix}/create-payment-intent`, {
        id: itemId,
        type: itemType,
      });
      return response.data.data; // Devuelve el clientSecret
    } catch (error) {
      console.error("[CREATE PAYMENT INTENT ERROR]:", error.response?.data?.message || error.message);
      throw error;
    }
  }

  async confirmPurchase(paymentIntentId) {
    try {
      const response = await apiClient.post(`${this.prefix}/confirm-purchase`, {
        payment_intent_id: paymentIntentId,
      });
      return response.data.data; // Devuelve la confirmación de la compra
    } catch (error) {
      console.error("[CONFIRM PURCHASE ERROR]:", error.response?.data?.message || error.message);
      throw error;
    }
  }
}

export default new PaymentRepository();