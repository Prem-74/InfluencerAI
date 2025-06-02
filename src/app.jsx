
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Explore from './pages/Explore';
import ContractPage from './pages/contractpage';
import InvoicePage from './pages/invoicepage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/contract" element={<ContractPage />} />
        <Route path="/invoice" element={<InvoicePage />} />
        
      </Routes>
    </Router>
  );
}
