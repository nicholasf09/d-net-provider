import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import CustomerPage from "./pages/CustomerPage";
import TransactionPage from "./pages/TransactionPage";

const App = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/customers" element={<CustomerPage />} />
      <Route path="/transactions" element={<TransactionPage />} />
    </Routes>
  </Router>
);

export default App;