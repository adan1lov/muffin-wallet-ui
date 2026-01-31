import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8081';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const walletApi = {
  // Получение списка кошельков
  getWallets: (ownerName, page = 0, size = 10) => {
    return api.get('/v1/muffin-wallets', {
      params: { owner_name: ownerName, 'pageable.page': page, 'pageable.size': size }
    });
  },

  // Создание нового кошелька
  createWallet: (walletData) => {
    return api.post('/v1/muffin-wallets', walletData);
  },

  // Получение кошелька по ID
  getWalletById: (id) => {
    return api.get(`/v1/muffin-wallet/${id}`);
  },

  // Перевод между кошельками
  transferMuffins: (id, transactionData) => {
    return api.post(`/v1/muffin-wallet/${id}/transaction`, transactionData);
  }
};

export default api;