export interface Product {
  id: string;
  name: string;
  category: string;
  categorySlug: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  reviewCount: number;
  images: string[];
  description: string;
  shortDescription: string;
  colors?: string[];
  sizes?: string[];
  badge?: 'NEW' | 'BEST SELLER' | 'SALE' | 'LIMITED';
  inStock: boolean;
  isFeatured?: boolean;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  specifications?: { label: string; value: string }[];
  tags?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface WishlistItem {
  product: Product;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  productCount: number;
}

export type SortOption = 'featured' | 'newest' | 'price-asc' | 'price-desc' | 'best-selling';

export interface FilterState {
  categories: string[];
  priceRange: [number, number];
  minRating: number;
  inStockOnly: boolean;
  sortBy: SortOption;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}
