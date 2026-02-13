import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
// import api from '../services/api';
import { toast } from 'vue3-toastify';

export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  token?: string;
}

export const useAuthStore = defineStore('auth', () => {
  // Auto-login as generic admin for development
  if (!localStorage.getItem('user')) {
    const mockUser: User = {
      _id: 'dev-admin',
      name: 'Developer Admin',
      email: 'admin@dev.com',
      role: 'admin',
      token: 'dev-mock-token'
    };
    localStorage.setItem('user', JSON.stringify(mockUser));
    localStorage.setItem('token', mockUser.token!);
  }

  const user = ref<User | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const isAuthenticated = computed(() => !!user.value);
  const isAdmin = computed(() => user.value?.role === 'admin');

  // Check if user is already authenticated
  function checkAuth() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        user.value = JSON.parse(storedUser);
      } catch (err) {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
  }

  // Register a new user
  async function register(userData: { name: string; email: string; password: string }) {
    loading.value = true;
    error.value = null;

    await new Promise(resolve => setTimeout(resolve, 800));

    try {
      const mockUser: User = {
        _id: 'mock-user-' + Date.now(),
        name: userData.name,
        email: userData.email,
        role: 'user',
        token: 'mock-token-' + Date.now()
      };

      user.value = mockUser;
      localStorage.setItem('token', mockUser.token!);
      localStorage.setItem('user', JSON.stringify(mockUser));

      toast.success('Registration successful (Mock)!');
      return true;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Registration failed';
      error.value = message;
      toast.error(message);
      return false;
    } finally {
      loading.value = false;
    }
  }

  // Login user
  async function login(credentials: { email: string; password: string }) {
    loading.value = true;
    error.value = null;

    await new Promise(resolve => setTimeout(resolve, 800));

    try {
      // Simulate successful login for any credentials
      const mockUser: User = {
        _id: 'mock-user-login',
        name: 'Mock User',
        email: credentials.email,
        role: 'user', // Default to user, admin logic handles specific emails if needed
        token: 'mock-token-login'
      };

      if (credentials.email.includes('admin')) {
        mockUser.name = 'Mock Admin';
        mockUser.role = 'admin';
        mockUser._id = 'mock-admin-login';
      }

      user.value = mockUser;
      localStorage.setItem('token', mockUser.token!);
      localStorage.setItem('user', JSON.stringify(mockUser));

      toast.success('Login successful (Mock)!');
      return true;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Login failed';
      error.value = message;
      toast.error(message);
      return false;
    } finally {
      loading.value = false;
    }
  }

  // Logout user
  function logout() {
    user.value = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.info('You have been logged out');
  }

  return {
    user,
    loading,
    error,
    isAuthenticated,
    isAdmin,
    checkAuth,
    register,
    login,
    logout,
  };
});