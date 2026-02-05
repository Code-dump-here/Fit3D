// Cart management hook
import { useState, useEffect } from 'react';
import { cartService } from '../services/cartService';
import type { CartItemDTO, AddToCartRequest } from '../types/api';

export const useCart = (userId: string | null) => {
  const [cartItems, setCartItems] = useState<CartItemDTO[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCart = async () => {
    if (!userId) {
      setCartItems([]);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const data = await cartService.getCart(userId);
      setCartItems(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch cart');
    } finally {
      setIsLoading(false);
    }
  };

  const addToCart = async (item: Omit<AddToCartRequest, 'userId'>) => {
    if (!userId) {
      setError('User not logged in');
      return { success: false };
    }

    try {
      setError(null);
      await cartService.addToCart({ ...item, userId });
      await fetchCart(); // Refresh cart
      return { success: true };
    } catch (err: any) {
      const message = err.response?.data?.message || 'Failed to add to cart';
      setError(message);
      return { success: false, message };
    }
  };

  const updateCartItem = async (cartItemId: string, quantity: number) => {
    try {
      setError(null);
      await cartService.updateCartItem(cartItemId, { quantity });
      await fetchCart(); // Refresh cart
      return { success: true };
    } catch (err: any) {
      const message = err.response?.data?.message || 'Failed to update cart item';
      setError(message);
      return { success: false, message };
    }
  };

  const removeCartItem = async (cartItemId: string) => {
    try {
      setError(null);
      await cartService.removeCartItem(cartItemId);
      await fetchCart(); // Refresh cart
      return { success: true };
    } catch (err: any) {
      const message = err.response?.data?.message || 'Failed to remove cart item';
      setError(message);
      return { success: false, message };
    }
  };

  const clearCart = async () => {
    if (!userId) return { success: false };

    try {
      setError(null);
      await cartService.clearCart(userId);
      setCartItems([]);
      return { success: true };
    } catch (err: any) {
      const message = err.response?.data?.message || 'Failed to clear cart';
      setError(message);
      return { success: false, message };
    }
  };

  useEffect(() => {
    fetchCart();
  }, [userId]);

  const cartTotal = cartService.getCartTotal(cartItems);
  const cartItemCount = cartService.getCartItemCount(cartItems);

  return {
    cartItems,
    cartTotal,
    cartItemCount,
    isLoading,
    error,
    addToCart,
    updateCartItem,
    removeCartItem,
    clearCart,
    refetch: fetchCart,
  };
};
