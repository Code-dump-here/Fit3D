// Authentication service: login, register, token refresh
import apiClient from '../api/apiClient';
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RefreshTokenResponse,
  ChangePasswordRequest,
} from '../types/api';

export const authService = {
  // Login
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>('/auth/login', credentials);
    
    if (response.data.success && response.data.accessToken) {
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken!);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    
    return response.data;
  },

  // Register
  async register(data: RegisterRequest): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>('/auth/register', data);
    
    if (response.data.success && response.data.accessToken) {
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken!);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    
    return response.data;
  },

  // Refresh token
  async refreshToken(refreshToken: string): Promise<RefreshTokenResponse> {
    const response = await apiClient.post<RefreshTokenResponse>('/auth/refresh-token', {
      refreshToken,
    });
    
    if (response.data.success) {
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
    }
    
    return response.data;
  },

  // Revoke token
  async revokeToken(refreshToken: string): Promise<void> {
    await apiClient.post('/auth/revoke-token', { refreshToken });
  },

  // Get current user
  async getCurrentUser() {
    const response = await apiClient.get('/auth/me');
    return response.data;
  },

  // Change password
  async changePassword(userId: string, data: ChangePasswordRequest): Promise<void> {
    await apiClient.post(`/users/${userId}/change-password`, data);
  },

  // Logout
  logout() {
    const refreshToken = localStorage.getItem('refreshToken');
    
    if (refreshToken) {
      // Optionally revoke token on server
      this.revokeToken(refreshToken).catch(() => {
        // Ignore errors on logout
      });
    }
    
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  },

  // Get stored user
  getStoredUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!localStorage.getItem('accessToken');
  },
};
