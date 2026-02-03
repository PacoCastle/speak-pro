import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';

import SEO from './components/common/SEO';

function App() {
  return (
    <Router>
      <AuthProvider>
        <SEO />
        <div className="bg-gray-50 min-h-screen font-sans selection:bg-brand-500 selection:text-white">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
