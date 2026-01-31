import { useState, useEffect } from 'react';
import { walletApi } from '../services/api';

export const useWallet = (id) => {
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWallet = async () => {
    if (!id) return;
    
    setLoading(true);
    setError(null);
    try {
      const response = await walletApi.getWalletById(id);
      setWallet(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWallet();
  }, [id]);

  const transferMuffins = async (toWalletId, amount) => {
    try {
      const response = await walletApi.transferMuffins(id, {
        to_muffin_wallet_id: toWalletId,
        amount: parseFloat(amount)
      });
      // Обновляем данные кошелька после перевода
      fetchWallet();
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return { wallet, loading, error, refetch: fetchWallet, transferMuffins };
};