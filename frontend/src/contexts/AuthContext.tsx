import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';
import { toast } from 'react-toastify';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextData {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  forgotPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('@VITTA:token');
    const storedUser = localStorage.getItem('@VITTA:user');

    if (token && storedUser) {
      api.defaults.headers.authorization = `Bearer ${token}`;
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, user } = response.data;

      localStorage.setItem('@VITTA:token', token);
      localStorage.setItem('@VITTA:user', JSON.stringify(user));

      api.defaults.headers.authorization = `Bearer ${token}`;
      setUser(user);
    } catch (error) {
      toast.error('Erro ao fazer login. Verifique suas credenciais.');
      throw error;
    }
  };

  const signOut = () => {
    localStorage.removeItem('@VITTA:token');
    localStorage.removeItem('@VITTA:user');
    setUser(null);
  };

  const forgotPassword = async (email: string) => {
    try {
      await api.post('/auth/forgot-password', { email });
      toast.success('Instruções de recuperação de senha enviadas para seu email.');
    } catch (error) {
      toast.error('Erro ao processar recuperação de senha.');
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut, forgotPassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}; 