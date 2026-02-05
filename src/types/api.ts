// TypeScript interfaces for API requests and responses

// ==================== ENUMS ====================

export const UserRole = {
  Customer: 0,
  Admin: 1,
  Staff: 2,
  Shop: 3
} as const;

export type UserRole = typeof UserRole[keyof typeof UserRole];

export const OrderStatus = {
  Pending: 0,
  Confirmed: 1,
  Processing: 2,
  Shipped: 3,
  Delivered: 4,
  Cancelled: 5,
  Returned: 6
} as const;

export type OrderStatus = typeof OrderStatus[keyof typeof OrderStatus];

export const PaymentStatus = {
  Pending: 0,
  Paid: 1,
  Failed: 2,
  Refunded: 3
} as const;

export type PaymentStatus = typeof PaymentStatus[keyof typeof PaymentStatus];

// ==================== USER TYPES ====================

export interface UserDTO {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
  phone: string;
  address: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  accessToken: string | null;
  refreshToken: string | null;
  accessTokenExpiration: string | null;
  refreshTokenExpiration: string | null;
  user: {
    id: string;
    fullName: string;
    email: string;
    phone: string;
    role: UserRole;
    isVerified: boolean;
  } | null;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  success: boolean;
  message: string;
  accessToken: string;
  refreshToken: string;
  accessTokenExpiration: string;
  refreshTokenExpiration: string;
}

export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
}

// ==================== CATEGORY TYPES ====================

export interface CategoryDTO {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  displayOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCategoryRequest {
  name: string;
  description: string;
  imageUrl: string;
  displayOrder: number;
  isActive: boolean;
}

export interface UpdateCategoryRequest {
  name: string;
  description: string;
  imageUrl: string;
  displayOrder: number;
  isActive: boolean;
}

// ==================== PRODUCT TYPES ====================

export interface ProductColorDTO {
  id: string;
  colorName: string;
  colorCode: string;
  imageUrl: string;
  stockQuantity: number;
}

export interface ProductSizeDTO {
  id: string;
  size: string;
  stockQuantity: number;
}

export interface ProductDTO {
  id: string;
  name: string;
  description: string;
  price: number;
  salePrice: number;
  sku: string;
  brand: string;
  imageUrl: string;
  previewModelPath: string;
  modelFilePath: string;
  stockQuantity: number;
  isActive: boolean;
  isFeatured: boolean;
  categoryId: string;
  categoryName: string;
  productColors: ProductColorDTO[];
  productSizes: ProductSizeDTO[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductRequest {
  name: string;
  description: string;
  price: number;
  salePrice: number;
  sku: string;
  brand: string;
  imageUrl: string;
  modelFilePath: string;
  previewModelPath: string;
  stockQuantity: number;
  isActive: boolean;
  isFeatured: boolean;
  categoryId: string;
  productColors: {
    colorName: string;
    colorCode: string;
    imageUrl: string;
    stockQuantity: number;
  }[];
  productSizes: {
    size: string;
    stockQuantity: number;
  }[];
}

export interface UpdateProductRequest {
  name: string;
  description: string;
  price: number;
  salePrice: number;
  sku: string;
  brand: string;
  imageUrl: string;
  stockQuantity: number;
  isActive: boolean;
  isFeatured: boolean;
  categoryId: string;
}

export interface AddProductColorRequest {
  colorName: string;
  colorCode: string;
  imageUrl: string;
  stockQuantity: number;
}

export interface AddProductSizeRequest {
  size: string;
  stockQuantity: number;
}

// ==================== CART TYPES ====================

export interface CartItemDTO {
  id: string;
  productId: string;
  productName: string;
  productPrice: number;
  productImageUrl: string;
  quantity: number;
  size: string;
  color: string;
  totalPrice: number;
}

export interface AddToCartRequest {
  userId: string;
  productId: string;
  quantity: number;
  size: string;
  color: string;
}

export interface UpdateCartItemRequest {
  quantity: number;
}

// ==================== ORDER TYPES ====================

export interface OrderItemDTO {
  id: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  size: string;
  color: string;
  productId: string;
  productName: string;
  productImageUrl: string;
}

export interface OrderDTO {
  id: string;
  orderNumber: string;
  totalAmount: number;
  discountAmount: number;
  shippingFee: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: string;
  shippingAddress: string;
  receiverName: string;
  receiverPhone: string;
  note: string;
  shippedAt: string | null;
  deliveredAt: string | null;
  userId: string;
  userName: string;
  orderItems: OrderItemDTO[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderRequest {
  discountAmount: number;
  shippingFee: number;
  paymentMethod: string;
  shippingAddress: string;
  receiverName: string;
  receiverPhone: string;
  note: string;
  userId: string;
  orderItems: {
    productId: string;
    quantity: number;
    size: string;
    color: string;
  }[];
}

export interface UpdateOrderRequest {
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  shippedAt?: string;
  deliveredAt?: string;
  note: string;
}

// ==================== PAGINATION ====================

export interface PaginatedResponse<T> {
  items: T[];
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalCount: number;
  hasPrevious: boolean;
  hasNext: boolean;
}

// ==================== MODEL UPLOAD ====================

export interface ModelUploadResponse {
  filePath: string;
}
