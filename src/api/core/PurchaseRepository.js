import apiClient from './apiClient';

const PurchaseRepository = {
  createPurchase: (data) => apiClient.post('/purchases', data),
  getPurchase: (id) => apiClient.get(`/purchases/${id}`),
};

export default new PurchaseRepository();