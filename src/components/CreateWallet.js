import React, { useState } from 'react';
import { walletApi } from '../services/api';
import { useNavigate } from 'react-router-dom';
import './CreateWallet.css';

const CreateWallet = () => {
  const [formData, setFormData] = useState({
    owner_name: '',
    type: 'CARAMEL'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (!formData.owner_name.trim()) {
      setError('Имя владельца обязательно для заполнения');
      return;
    }

    setLoading(true);
    try {
      const response = await walletApi.createWallet(formData);
      setSuccess('Кошелек успешно создан!');
      // Очистка формы
      setFormData({ owner_name: '', type: 'CARAMEL' });
      // Через 2 секунды переходим к списку кошельков
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err) {
      setError(`Ошибка создания кошелька: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-wallet-container">
      <div className="header">
        <h1>Создание нового кошелька</h1>
        <p>Создайте новый кошелек для хранения маффинов</p>
      </div>

      <form onSubmit={handleSubmit} className="wallet-form">
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <div className="form-group">
          <label htmlFor="owner_name">Имя владельца *</label>
          <input
            type="text"
            id="owner_name"
            name="owner_name"
            value={formData.owner_name}
            onChange={handleChange}
            placeholder="Введите имя владельца"
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="type">Тип кошелька</label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="form-control"
          >
            <option value="CARAMEL">Карамель</option>
            <option value="CHOKOLATE">Шоколад</option>
            <option value="PLAIN">Обычный</option>
          </select>
        </div>

        <div className="form-actions">
          <button type="button" onClick={() => navigate('/')} className="btn btn-secondary">
            Отмена
          </button>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Создание...' : 'Создать кошелек'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateWallet;