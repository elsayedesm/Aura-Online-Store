import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, ProductFormData } from '@/types/product';

import hoodie1 from '@/assets/hoodie-1.jpg';
import hoodie2 from '@/assets/hoodie-2.jpg';
import hoodie3 from '@/assets/hoodie-3.jpg';
import pants1 from '@/assets/pants-1.jpg';
import pants2 from '@/assets/pants-2.jpg';

const initialProducts: Product[] = [
  {
    id: '1',
    name: 'AURA Essential Hoodie',
    price: 89,
    description: 'Premium heavyweight cotton hoodie with minimalist AURA branding. Features a relaxed oversized fit, kangaroo pocket, and ribbed cuffs. Made from 100% organic cotton for ultimate comfort.',
    shortDescription: 'Premium heavyweight cotton hoodie with relaxed fit',
    category: 'hoodie',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [hoodie1],
    featured: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'AURA Shadow Hoodie',
    price: 95,
    description: 'Charcoal gray hoodie crafted from premium French terry cotton. The subtle tonal AURA embroidery adds a refined touch. Double-layered hood and reinforced stitching throughout.',
    shortDescription: 'Charcoal gray French terry cotton hoodie',
    category: 'hoodie',
    sizes: ['S', 'M', 'L', 'XL'],
    images: [hoodie2],
    featured: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'AURA Cream Hoodie',
    price: 99,
    description: 'Luxurious cream-colored hoodie made from premium brushed fleece. Features drop shoulders and a boxy silhouette. The warm neutral tone pairs perfectly with any outfit.',
    shortDescription: 'Luxurious cream brushed fleece hoodie',
    category: 'hoodie',
    sizes: ['M', 'L', 'XL', 'XXL'],
    images: [hoodie3],
    featured: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'Milton Essential Sweatpants',
    price: 75,
    description: 'Classic Milton sweatpants in deep black. Crafted from heavyweight fleece with tapered leg design. Features elastic waistband with drawstring, side pockets, and ribbed ankle cuffs.',
    shortDescription: 'Classic heavyweight fleece sweatpants',
    category: 'pants',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [pants1],
    featured: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '5',
    name: 'Milton Shadow Sweatpants',
    price: 79,
    description: 'Premium charcoal Milton sweatpants with subtle MILTON branding. Made from ultra-soft cotton blend with a relaxed straight-leg fit. Perfect for everyday comfort.',
    shortDescription: 'Premium charcoal cotton blend sweatpants',
    category: 'pants',
    sizes: ['S', 'M', 'L', 'XL'],
    images: [pants2],
    featured: false,
    createdAt: new Date().toISOString(),
  },
];

interface ProductContextType {
  products: Product[];
  addProduct: (product: ProductFormData) => void;
  updateProduct: (id: string, product: ProductFormData) => void;
  deleteProduct: (id: string) => void;
  getProduct: (id: string) => Product | undefined;
  getFeaturedProducts: () => Product[];
  getProductsByCategory: (category: 'hoodie' | 'pants') => Product[];
  storageError: string | null;
  clearStorageError: () => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

const STORAGE_KEY = 'aura_products';

export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : initialProducts;
    } catch {
      return initialProducts;
    }
  });
  const [storageError, setStorageError] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
      setStorageError(null);
    } catch (e) {
      const isQuotaExceeded = e instanceof DOMException && (e.name === 'QuotaExceededError' || e.code === 22);
      if (isQuotaExceeded) {
        setStorageError('Storage full. Use image URLs instead of uploading, or remove some products.');
        const previous = localStorage.getItem(STORAGE_KEY);
        setProducts(previous ? JSON.parse(previous) : []);
      }
    }
  }, [products]);

  const addProduct = (productData: ProductFormData) => {
    const newProduct: Product = {
      ...productData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setProducts(prev => [...prev, newProduct]);
  };

  const updateProduct = (id: string, productData: ProductFormData) => {
    setProducts(prev =>
      prev.map(product =>
        product.id === id
          ? { ...product, ...productData }
          : product
      )
    );
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(product => product.id !== id));
  };

  const getProduct = (id: string) => {
    return products.find(product => product.id === id);
  };

  const getFeaturedProducts = () => {
    return products.filter(product => product.featured);
  };

  const getProductsByCategory = (category: 'hoodie' | 'pants') => {
    return products.filter(product => product.category === category);
  };

  const clearStorageError = () => setStorageError(null);

  return (
    <ProductContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        getProduct,
        getFeaturedProducts,
        getProductsByCategory,
        storageError,
        clearStorageError,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
}
