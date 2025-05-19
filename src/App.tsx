import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PoolDetailPage from './pages/PoolDetailPage';
import PastPoolsPage from './pages/PastPoolsPage';
import UserProfilePage from './pages/UserProfilePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pool/:id" element={<PoolDetailPage />} />
        <Route path="/past-pools" element={<PastPoolsPage />} />
        <Route path="/profile" element={<UserProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;
