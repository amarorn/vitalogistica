import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Login } from '../pages/Login';
import { Dashboard } from '../pages/Dashboard';
import { Budgets } from '../pages/Budgets';
import { Suppliers } from '../pages/Suppliers';
import { Calculations } from '../pages/Calculations';
import { Users } from '../pages/Users';
import { Settings } from '../pages/Settings';
import { Layout } from '../components/Layout';
import { Validations } from '../pages/Validations';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <Layout>{children}</Layout>;
};

export const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/orcamentos"
          element={
            <PrivateRoute>
              <Budgets />
            </PrivateRoute>
          }
        />
        <Route
          path="/fornecedores"
          element={
            <PrivateRoute>
              <Suppliers />
            </PrivateRoute>
          }
        />
        <Route
          path="/calculos"
          element={
            <PrivateRoute>
              <Calculations />
            </PrivateRoute>
          }
        />
        <Route
          path="/usuarios"
          element={
            <PrivateRoute>
              <Users />
            </PrivateRoute>
          }
        />
        <Route
          path="/configuracoes"
          element={
            <PrivateRoute>
              <Settings />
            </PrivateRoute>
          }
        />
        <Route
          path="/validacoes"
          element={
            <PrivateRoute>
              <Validations />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}; 