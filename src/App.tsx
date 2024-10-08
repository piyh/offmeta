// src/App.tsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CardExplorer from './components/CardExplorer/CardExplorer';
import CardDetail from './components/CardExplorer/CardDetail';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CardExplorer />} />
        <Route path="/card/:cardId" element={<CardDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
