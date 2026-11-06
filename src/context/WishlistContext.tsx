import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../types';
import { useStore } from './StoreContext';

interface WishlistContextType {
  wishlistIds: string[];
  wishlistProducts: Product[];
  wishlistCount: number;
  isInWishlist: (productId: string) => boolean;
  toggleWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

const WISHLIST_KEY = 'vt_wishlist_v2';

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { products } = useStore();

  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_KEY);
      return saved ? JSON.parse(saved) : ['prod-004']; // Seed with Striped Sweater
    } catch {
      return ['prod-004'];
    }
  });

  useEffect(() => {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlistIds));
  }, [wishlistIds]);

  const isInWishlist = (productId: string) => wishlistIds.includes(productId);

  const toggleWishlist = (product: Product) => {
    setWishlistIds(prev =>
      prev.includes(product.id) ? prev.filter(id => id !== product.id) : [...prev, product.id]
    );
  };

  const removeFromWishlist = (productId: string) => {
    setWishlistIds(prev => prev.filter(id => id !== productId));
  };

  const wishlistProducts = products.filter(p => wishlistIds.includes(p.id));
  const wishlistCount = wishlistIds.length;

  return (
    <WishlistContext.Provider
      value={{
        wishlistIds,
        wishlistProducts,
        wishlistCount,
        isInWishlist,
        toggleWishlist,
        removeFromWishlist
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
