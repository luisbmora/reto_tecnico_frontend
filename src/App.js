// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Sidebar from './components/Sidebar'; 
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import CompanyForm from './pages/CompanyForm';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

function AppContent() {
  const { isAuthenticated, user, logout } = useAuth();  

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div style={{ display: 'flex' }}>
      {/* Sidebar solo se muestra si el usuario está autenticado */}
      {isAuthenticated() && (
        <Sidebar username={user?.name} onLogout={handleLogout} />
      )}

      <div style={{ flexGrow: 1, marginLeft: isAuthenticated() ? '250px' : '0' }}>
        <Container fluid style={{ padding: '2em' }}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/companies/new" element={<ProtectedRoute><CompanyForm /></ProtectedRoute>} />
            <Route path="*" element={<Navigate to={isAuthenticated() ? "/dashboard" : "/login"} />} />
          </Routes>
        </Container>
      </div>
      <ToastContainer />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
