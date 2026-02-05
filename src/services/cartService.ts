// Cart service: cart operations
import apiClient from '../api/apiClient';
import type { CartItemDTO, AddToCartRequest, UpdateCartItemRequest } from '../types/api';

export const cartService = {
  // Get user's cart
  async getCart(userId: string): Promise<CartItemDTO[]> {
    const response = await apiClient.get<CartItemDTO[]>(`/cart/${userId}`);
    return response.data;
  },

  // Add item to cart
  async addToCart(data: AddToCartRequest): Promise<CartItemDTO> {
    const response = await apiClient.post<CartItemDTO>('/cart', data);
    return response.data;
  },

  // Update cart item quantity
  async updateCartItem(cartItemId: string, data: UpdateCartItemRequest): Promise<CartItemDTO> {
    const response = await apiClient.put<CartItemDTO>(`/cart/${cartItemId}`, data);
    return response.data;
  },

  // Remove item from cart
  async removeCartItem(cartItemId: string): Promise<void> {
    await apiClient.delete(`/cart/${cartItemId}`);
  },

  // Clear entire cart for user
  async clearCart(userId: string): Promise<void> {
    await apiClient.delete(`/cart/user/${userId}`);
  },

  // Get cart total
  getCartTotal(cartItems: CartItemDTO[]): number {
    return cartItems.reduce((total, item) => total + item.totalPrice, 0);
  },

  // Get cart item count
  getCartItemCount(cartItems: CartItemDTO[]): number {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  },
};
