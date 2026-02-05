// Authentication hook
import { useState, useEffect } from 'react';
import { authService } from '../services/authService';
import type { LoginRequest, RegisterRequest } from '../types/api';

interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: number;
  isVerified: boolean;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize - check if user is already logged in
  useEffect(() => {
    const storedUser = authService.getStoredUser();
    if (storedUser) {
      setUser(storedUser);
    }
    setIsLoading(false);
  }, []);

  const login = async (credentials: LoginRequest) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await authService.login(credentials);
      
      if (response.success && response.user) {
        setUser(response.user);
        return { success: true };
      } else {
        setError(response.message || 'Login failed');
        return { success: false, message: response.message };
      }
    } catch (err: any) {
      const message = err.response?.data?.message || 'Login failed';
      setError(message);
      return { success: false, message };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterRequest) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await authService.register(data);
      
      if (response.success && response.user) {
        setUser(response.user);
        return { success: true };
      } else {
        setError(response.message || 'Registration failed');
        return { success: false, message: response.message };
      }
    } catch (err: any) {
      const message = err.response?.data?.message || 'Registration failed';
      setError(message);
      return { success: false, message };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const isAuthenticated = () => {
    return !!user && authService.isAuthenticated();
  };

  return {
    user,
    isLoading,
    error,
    login,
    register,
    logout,
    isAuthenticated,
  };
};
