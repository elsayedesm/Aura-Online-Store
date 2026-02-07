export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  shortDescription: string;
  category: 'hoodie' | 'pants';
  sizes: string[];
  images: string[];
  featured: boolean;
  hasDiscount?: boolean;
  discountPercentage?: number;
  createdAt: string;
}

export type ProductFormData = Omit<Product, 'id' | 'createdAt'>;
