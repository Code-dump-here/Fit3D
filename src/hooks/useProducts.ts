// React Query hook for products
import { useState, useEffect } from 'react';
import { productService, categoryService } from '../services/productService';
import type { ProductDTO, CategoryDTO, PaginatedResponse } from '../types/api';

interface UseProductsOptions {
  page?: number;
  size?: number;
  search?: string;
  categoryId?: string;
  autoFetch?: boolean;
}

export const useProducts = (options: UseProductsOptions = {}) => {
  const { page = 1, size = 10, search, categoryId, autoFetch = true } = options;
  
  const [products, setProducts] = useState<ProductDTO[]>([]);
  const [pagination, setPagination] = useState<Omit<PaginatedResponse<ProductDTO>, 'items'> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await productService.getProducts({ page, size, search, categoryId });
      setProducts(response.items);
      setPagination({
        pageNumber: response.pageNumber,
        pageSize: response.pageSize,
        totalPages: response.totalPages,
        totalCount: response.totalCount,
        hasPrevious: response.hasPrevious,
        hasNext: response.hasNext,
      });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch products');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch) {
      fetchProducts();
    }
  }, [page, size, search, categoryId, autoFetch]);

  return {
    products,
    pagination,
    isLoading,
    error,
    refetch: fetchProducts,
  };
};

export const useProduct = (id: string) => {
  const [product, setProduct] = useState<ProductDTO | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProduct = async () => {
    if (!id) return;
    
    try {
      setIsLoading(true);
      setError(null);
      const data = await productService.getProductById(id);
      setProduct(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch product');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  return {
    product,
    isLoading,
    error,
    refetch: fetchProduct,
  };
};

export const useCategories = () => {
  const [categories, setCategories] = useState<CategoryDTO[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await categoryService.getAllCategories();
      setCategories(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch categories');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    categories,
    isLoading,
    error,
    refetch: fetchCategories,
  };
};
