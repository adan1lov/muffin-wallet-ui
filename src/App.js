import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WalletList from './components/WalletList';
import WalletDetail from './components/WalletDetail';
import CreateWallet from './components/CreateWallet';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<WalletList />} />
          <Route path="/wallet/:id" element={<WalletDetail />} />
          <Route path="/create" element={<CreateWallet />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;