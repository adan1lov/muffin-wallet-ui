import { useState, useEffect } from 'react';
import { walletApi } from '../services/api';

export const useWallets = () => {
  const [wallets, setWallets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 0,
    size: 10,
    totalElements: 0,
    totalPages: 0
  });

  const fetchWallets = async (ownerName = '', page = 0, size = 10) => {
    setLoading(true);
    setError(null);
    try {
      const response = await walletApi.getWallets(ownerName, page, size);
      setWallets(response.data.content);
      setPagination({
        page: response.data.page.number,
        size: response.data.page.size,
        totalElements: response.data.page.totalElements,
        totalPages: response.data.page.totalPages
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWallets();
  }, []);

  return { wallets, loading, error, pagination, fetchWallets };
};