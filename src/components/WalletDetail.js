import React, { useState } from 'react';
import { useWallet } from '../hooks/useWallet';
import { Link } from 'react-router-dom';
import './WalletDetail.css';
import { useParams } from 'react-router-dom';

const WalletDetail = () => {
  const { id } = useParams();
  const { wallet, loading, error, transferMuffins } = useWallet(id);
  const [toWalletId, setToWalletId] = useState('');
  const [amount, setAmount] = useState('');
  const [transferError, setTransferError] = useState('');
  const [transferSuccess, setTransferSuccess] = useState('');

  const handleTransfer = async (e) => {
    e.preventDefault();
    setTransferError('');
    setTransferSuccess('');
    
    if (!toWalletId || !amount) {
      setTransferError('Пожалуйста, заполните все поля');
      return;
    }

    try {
      await transferMuffins(toWalletId, amount);
      setTransferSuccess('Перевод успешно выполнен!');
      setToWalletId('');
      setAmount('');
      // Очистка сообщений через 3 секунды
      setTimeout(() => setTransferSuccess(''), 3000);
    } catch (err) {
      setTransferError(`Ошибка перевода: ${err.message}`);
    }
  };

  if (loading) return <div className="loading">Загрузка...</div>;
  if (error) return <div className="error">Ошибка: {error}</div>;
  if (!wallet) return <div className="error">Кошелек не найден</div>;

  return (
    <div className="wallet-detail-container">
      <div className="header">
        <Link to="/" className="back-link">← Назад к списку</Link>
        <h1>Детали кошелька</h1>
      </div>

      <div className="wallet-info">
        <div className="info-grid">
          <div className="info-item">
            <label>Владелец</label>
            <div className="info-value">{wallet.owner_name}</div>
          </div>
          
          <div className="info-item">
            <label>Тип</label>
            <div className="info-value">
              <span className={`type-badge ${wallet.type.toLowerCase()}`}>{wallet.type}</span>
            </div>
          </div>

          <div className="info-item">
            <label>Баланс</label>
            <div className="info-value balance-large">{wallet.balance} MUFFIN</div>
          </div>

          <div className="info-item">
            <label>ID кошелька</label>
            <div className="info-value code">{wallet.id}</div>
          </div>

          <div className="info-item">
            <label>Дата создания</label>
            <div className="info-value">{new Date(wallet.created_at).toLocaleString()}</div>
          </div>

          <div className="info-item">
            <label>Последнее обновление</label>
            <div className="info-value">{new Date(wallet.updated_at).toLocaleString()}</div>
          </div>
        </div>
      </div>

      <div className="transfer-section">
        <h2>Перевести маффины</h2>
        <form onSubmit={handleTransfer} className="transfer-form">
          <div className="form-group">
            <label htmlFor="toWalletId">ID получателя</label>
            <input
              type="text"
              id="toWalletId"
              value={toWalletId}
              onChange={(e) => setToWalletId(e.target.value)}
              placeholder="Введите ID кошелька получателя"
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label htmlFor="amount">Сумма</label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Введите сумму"
              step="0.01"
              min="0"
              className="form-control"
            />
          </div>

          {transferError && <div className="error-message">{transferError}</div>}
          {transferSuccess && <div className="success-message">{transferSuccess}</div>}

          <button type="submit" className="btn btn-primary">
            Выполнить перевод
          </button>
        </form>
      </div>
    </div>
  );
};

export default WalletDetail;