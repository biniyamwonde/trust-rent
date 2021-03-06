'use client';

// Updated import

import { useState, useEffect, createContext } from 'react';
// Updated import
import { apiService } from '../services/api';

interface User {
  uid: string;
  token: string;
  nickname?: string;
  email?: string;
  phone?: string;
  lang: string;
  session_expires?: string;
  is_first_login?: boolean;
  profile_complete_percentage?: number;
  kyc_status?: string;
  member_tier?: string;
  rewards_points?: number;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkAuth: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Realistic mock user for development (matches actual API response structure)
const MOCK_USER: User = {
  uid: 'usr_123456789',
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJ1c3JfMTIzNDU2Nzg5IiwiZXhwIjoxNzM4MzAwODAwfQ.mock_token_signature',
  nickname: 'John',
  email: 'john.smith@example.com',
  phone: '+66812345678',
  lang: 'en',
  session_expires: new Date(Date.now() + 86400000).toISOString(), // 24 hours from now
  is_first_login: false,
  profile_complete_percentage: 85,
  kyc_status: 'verified',
  member_tier: 'gold',
  rewards_points: 1250
};

export function useAuth(): AuthContextType {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on mount
    checkAuth();
  }, []);

  const checkAuth = async (): Promise<boolean> => {
    try {
      setLoading(true);

      // Check localStorage for stored user
      const storedUser = localStorage.getItem('trustrent_user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);

        // Validate token with backend
        const response = await apiService.checkToken(parsedUser.token);

        if (response.status === 'SUCCESS') {
          setUser(parsedUser);
          return true;
        } else {
          // Token invalid, clear storage
          localStorage.removeItem('trustrent_user');
        }
      }

      // For development: use mock user if no real auth
      if (process.env.NODE_ENV === 'development') {
        setUser(MOCK_USER);
        return true;
      }

      setUser(null);
      return false;
    } catch (error) {
      console.error('Auth check failed:', error);

      // For development: fallback to mock user
      if (process.env.NODE_ENV === 'development') {
        setUser(MOCK_USER);
        return true;
      }

      setUser(null);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);

      const response = await apiService.login(username, password);

      if (response.status === 'SUCCESS' && response.data) {
        const userData: User = {
          uid: response.data.uid || response.data.userId,
          token: response.data.token,
          nickname: response.data.nickname,
          lang: response.data.lang || 'en'
        };

        setUser(userData);
        localStorage.setItem('trustrent_user', JSON.stringify(userData));
        return true;
      }

      return false;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('trustrent_user');
  };

  return {
    user,
    loading,
    login,
    logout,
    checkAuth
  };
}

export { AuthContext };


// Last updated: 2025-11-24

// TODO: Review implementation
