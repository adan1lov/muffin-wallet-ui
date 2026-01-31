import React, { useState } from 'react';
import { useWallets } from '../hooks/useWallets';
import { Link } from 'react-router-dom';
import './WalletList.css';

const WalletList = () => {
  const { wallets, loading, error, pagination, fetchWallets } = useWallets();
  const [ownerName, setOwnerName] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    fetchWallets(ownerName);
  };

  if (loading) return <div className="loading">Загрузка...</div>;
  if (error) return <div className="error">Ошибка: {error}</div>;

  return (
    <div className="wallet-list-container">
      <div className="header">
        <h1>Маффин кошельки</h1>
        <Link to="/create" className="btn btn-primary">Создать кошелек</Link>
      </div>
      
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Имя владельца..."
          value={ownerName}
          onChange={(e) => setOwnerName(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="btn btn-secondary">Поиск</button>
      </form>

      {wallets.length === 0 ? (
        <div className="empty-state">
          <p>Кошельки не найдены</p>
        </div>
      ) : (
        <div className="wallet-grid">
          {wallets.map(wallet => (
            <div key={wallet.id} className="wallet-card">
              <div className="wallet-header">
                <h3>{wallet.owner_name}</h3>
                <span className={`status-badge ${wallet.type.toLowerCase()}`}>{wallet.type}</span>
              </div>
              <div className="wallet-balance">
                <span className="balance-label">Баланс:</span>
                <span className="balance-amount">{wallet.balance}</span>
              </div>
              <div className="wallet-id">
                <small>ID: {wallet.id}</small>
              </div>
              <div className="wallet-footer">
                <small>Создан: {new Date(wallet.created_at).toLocaleDateString()}</small>
                <Link to={`/wallet/${wallet.id}`} className="btn btn-small">Открыть</Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {pagination.totalPages > 1 && (
        <div className="pagination">
          <span>Страница {pagination.page + 1} из {pagination.totalPages}</span>
        </div>
      )}
    </div>
  );
};

export default WalletList;