// Order service: order management
import apiClient from '../api/apiClient';
import type {
  OrderDTO,
  PaginatedResponse,
  CreateOrderRequest,
  UpdateOrderRequest,
} from '../types/api';
import { OrderStatus, PaymentStatus } from '../types/api';

export const orderService = {
  // Get paginated orders
  async getOrders(params?: {
    page?: number;
    size?: number;
    userId?: string;
    status?: OrderStatus;
  }): Promise<PaginatedResponse<OrderDTO>> {
    const response = await apiClient.get<PaginatedResponse<OrderDTO>>('/orders', {
      params,
    });
    return response.data;
  },

  // Get order by ID
  async getOrderById(id: string): Promise<OrderDTO> {
    const response = await apiClient.get<OrderDTO>(`/orders/${id}`);
    return response.data;
  },

  // Create order
  async createOrder(data: CreateOrderRequest): Promise<OrderDTO> {
    const response = await apiClient.post<OrderDTO>('/orders', data);
    return response.data;
  },

  // Update order
  async updateOrder(id: string, data: UpdateOrderRequest): Promise<OrderDTO> {
    const response = await apiClient.put<OrderDTO>(`/orders/${id}`, data);
    return response.data;
  },

  // Delete order
  async deleteOrder(id: string): Promise<void> {
    await apiClient.delete(`/orders/${id}`);
  },

  // Get user's order history
  async getUserOrders(userId: string, page = 1, size = 10): Promise<PaginatedResponse<OrderDTO>> {
    return this.getOrders({ userId, page, size });
  },

  // Helper: Get order status label
  getOrderStatusLabel(status: OrderStatus): string {
    const labels = {
      [OrderStatus.Pending]: 'Pending',
      [OrderStatus.Confirmed]: 'Confirmed',
      [OrderStatus.Processing]: 'Processing',
      [OrderStatus.Shipped]: 'Shipped',
      [OrderStatus.Delivered]: 'Delivered',
      [OrderStatus.Cancelled]: 'Cancelled',
      [OrderStatus.Returned]: 'Returned',
    };
    return labels[status];
  },

  // Helper: Get payment status label
  getPaymentStatusLabel(status: PaymentStatus): string {
    const labels = {
      [PaymentStatus.Pending]: 'Pending',
      [PaymentStatus.Paid]: 'Paid',
      [PaymentStatus.Failed]: 'Failed',
      [PaymentStatus.Refunded]: 'Refunded',
    };
    return labels[status];
  },
};
