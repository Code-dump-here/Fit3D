// Product service: CRUD operations and filtering
import apiClient from '../api/apiClient';
import type {
  ProductDTO,
  PaginatedResponse,
  CreateProductRequest,
  UpdateProductRequest,
  AddProductColorRequest,
  AddProductSizeRequest,
  CategoryDTO,
} from '../types/api';

export const productService = {
  // Get paginated products
  async getProducts(params?: {
    page?: number;
    size?: number;
    search?: string;
    categoryId?: string;
  }): Promise<PaginatedResponse<ProductDTO>> {
    const response = await apiClient.get<PaginatedResponse<ProductDTO>>('/products', {
      params,
    });
    return response.data;
  },

  // Get all products (no pagination)
  async getAllProducts(): Promise<ProductDTO[]> {
    const response = await apiClient.get<ProductDTO[]>('/products/all');
    return response.data;
  },

  // Get product by ID
  async getProductById(id: string): Promise<ProductDTO> {
    const response = await apiClient.get<ProductDTO>(`/products/${id}`);
    return response.data;
  },

  // Create product
  async createProduct(data: CreateProductRequest): Promise<ProductDTO> {
    const response = await apiClient.post<ProductDTO>('/products', data);
    return response.data;
  },

  // Update product
  async updateProduct(id: string, data: UpdateProductRequest): Promise<ProductDTO> {
    const response = await apiClient.put<ProductDTO>(`/products/${id}`, data);
    return response.data;
  },

  // Delete product
  async deleteProduct(id: string): Promise<void> {
    await apiClient.delete(`/products/${id}`);
  },

  // Add product color
  async addProductColor(productId: string, data: AddProductColorRequest): Promise<ProductDTO> {
    const response = await apiClient.post<ProductDTO>(`/products/${productId}/colors`, data);
    return response.data;
  },

  // Delete product color
  async deleteProductColor(colorId: string): Promise<void> {
    await apiClient.delete(`/products/colors/${colorId}`);
  },

  // Add product size
  async addProductSize(productId: string, data: AddProductSizeRequest): Promise<ProductDTO> {
    const response = await apiClient.post<ProductDTO>(`/products/${productId}/sizes`, data);
    return response.data;
  },

  // Delete product size
  async deleteProductSize(sizeId: string): Promise<void> {
    await apiClient.delete(`/products/sizes/${sizeId}`);
  },
};

// Category service
export const categoryService = {
  // Get paginated categories
  async getCategories(params?: {
    page?: number;
    size?: number;
    search?: string;
  }): Promise<PaginatedResponse<CategoryDTO>> {
    const response = await apiClient.get<PaginatedResponse<CategoryDTO>>('/categories', {
      params,
    });
    return response.data;
  },

  // Get all categories (no pagination)
  async getAllCategories(): Promise<CategoryDTO[]> {
    const response = await apiClient.get<CategoryDTO[]>('/categories/all');
    return response.data;
  },

  // Get category by ID
  async getCategoryById(id: string): Promise<CategoryDTO> {
    const response = await apiClient.get<CategoryDTO>(`/categories/${id}`);
    return response.data;
  },
};
