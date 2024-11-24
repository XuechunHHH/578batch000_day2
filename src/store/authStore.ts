import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';

interface AuthState {
  isAuthenticated: boolean;
  username: string | null;
  token: string | null;
  error: string | null;
  signup: (username: string, password: string) => Promise<void>;
  login: (username: string, password: string) => Promise<void>;
  loginAsGuest: () => void;
  logout: () => void;
  clearError: () => void;
}

const API_URL = import.meta.env.VITE_API_URL;

// Initialize axios auth header from stored token
const storedAuth = JSON.parse(localStorage.getItem('auth-storage') || '{}');
if (storedAuth.state?.token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${storedAuth.state.token}`;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      username: null,
      token: null,
      error: null,
      signup: async (username: string, password: string) => {
        try {
          const response = await axios.post(`${API_URL}/api/auth/signup`, {
            username,
            password
          });
          const { token } = response.data;
          set({ isAuthenticated: true, username, token, error: null });
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } catch (error: any) {
          const message = error.response?.data?.message || 'Signup failed';
          set({ error: message });
          throw error;
        }
      },
      login: async (username: string, password: string) => {
        try {
          const response = await axios.post(`${API_URL}/api/auth/login`, {
            username,
            password
          });
          const { token } = response.data;
          set({ isAuthenticated: true, username, token, error: null });
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } catch (error: any) {
          const message = error.response?.data?.message || 'Login failed';
          set({ error: message });
          throw error;
        }
      },
      loginAsGuest: () => {
        set({ isAuthenticated: true, username: 'Guest', token: null, error: null });
      },
      logout: () => {
        set({ isAuthenticated: false, username: null, token: null, error: null });
        delete axios.defaults.headers.common['Authorization'];
      },
      clearError: () => set({ error: null })
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        username: state.username,
        token: state.token
      })
    }
  )
);