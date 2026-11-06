import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Promotion, Order, Coupon, StoreSettings, Review } from '../types';
import { initialProducts, initialCategories, sampleReviews } from '../data/initialProducts';
import { initialPromotions } from '../data/initialPromotions';
import { initialOrders, initialSettings } from '../data/initialOrders';
import { initialCoupons } from '../data/initialCoupons';

interface StoreContextType {
  products: Product[];
  categories: typeof initialCategories;
  promotions: Promotion[];
  orders: Order[];
  coupons: Coupon[];
  settings: StoreSettings;
  reviews: Record<string, Review[]>;
  addProduct: (product: Omit<Product, 'id' | 'createdAt'>) => Product;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addPromotion: (promo: Omit<Promotion, 'id'>) => Promotion;
  updatePromotion: (id: string, promo: Partial<Promotion>) => void;
  deletePromotion: (id: string) => void;
  togglePromotionStatus: (id: string) => void;
  addOrder: (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'status'>) => Order;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  updateSettings: (newSettings: Partial<StoreSettings>) => void;
  addReview: (productId: string, review: Omit<Review, 'id' | 'productId' | 'date'>) => void;
  resetToDemoData: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PRODUCTS: 'vt_products_v3',
  PROMOTIONS: 'vt_promotions_v3',
  ORDERS: 'vt_orders_v3',
  COUPONS: 'vt_coupons_v3',
  SETTINGS: 'vt_settings_v3',
  REVIEWS: 'vt_reviews_v3'
};

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize state with localStorage or defaults
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      return saved ? JSON.parse(saved) : initialProducts;
    } catch {
      return initialProducts;
    }
  });

  const [categories] = useState(initialCategories);

  const [promotions, setPromotions] = useState<Promotion[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROMOTIONS);
      return saved ? JSON.parse(saved) : initialPromotions;
    } catch {
      return initialPromotions;
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
      return saved ? JSON.parse(saved) : initialOrders;
    } catch {
      return initialOrders;
    }
  });

  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COUPONS);
      return saved ? JSON.parse(saved) : initialCoupons;
    } catch {
      return initialCoupons;
    }
  });

  const [settings, setSettings] = useState<StoreSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return saved ? JSON.parse(saved) : initialSettings;
    } catch {
      return initialSettings;
    }
  });

  const [reviews, setReviews] = useState<Record<string, Review[]>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.REVIEWS);
      return saved ? JSON.parse(saved) : sampleReviews;
    } catch {
      return sampleReviews;
    }
  });

  // Sync to localStorage whenever states change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PROMOTIONS, JSON.stringify(promotions));
  }, [promotions]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.COUPONS, JSON.stringify(coupons));
  }, [coupons]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
  }, [reviews]);

  // Product actions
  const addProduct = (productData: Omit<Product, 'id' | 'createdAt'>): Product => {
    const newProduct: Product = {
      ...productData,
      id: `prod-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    setProducts(prev => [newProduct, ...prev]);
    return newProduct;
  };

  const updateProduct = (id: string, updatedFields: Partial<Product>) => {
    setProducts(prev =>
      prev.map(p => (p.id === id ? { ...p, ...updatedFields } : p))
    );
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  // Promotion actions
  const addPromotion = (promoData: Omit<Promotion, 'id'>): Promotion => {
    const newPromo: Promotion = {
      ...promoData,
      id: `promo-${Date.now()}`
    };
    setPromotions(prev => [newPromo, ...prev]);
    return newPromo;
  };

  const updatePromotion = (id: string, updatedFields: Partial<Promotion>) => {
    setPromotions(prev =>
      prev.map(p => (p.id === id ? { ...p, ...updatedFields } : p))
    );
  };

  const deletePromotion = (id: string) => {
    setPromotions(prev => prev.filter(p => p.id !== id));
  };

  const togglePromotionStatus = (id: string) => {
    setPromotions(prev =>
      prev.map(p => (p.id === id ? { ...p, isActive: !p.isActive } : p))
    );
  };

  // Order actions
  const addOrder = (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'status'>): Order => {
    const randomDigits = Math.floor(10000 + Math.random() * 90000);
    const newOrder: Order = {
      ...orderData,
      id: `ord-${Date.now()}`,
      orderNumber: `VT-2026-${randomDigits}`,
      status: 'Processing',
      createdAt: new Date().toISOString()
    };

    setOrders(prev => [newOrder, ...prev]);

    // Also deduct stock from products
    setProducts(prev =>
      prev.map(prod => {
        const matchingItem = orderData.items.find(item => item.productId === prod.id);
        if (matchingItem) {
          return {
            ...prod,
            stock: Math.max(0, prod.stock - matchingItem.quantity)
          };
        }
        return prod;
      })
    );

    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev =>
      prev.map(o => (o.id === orderId ? { ...o, status } : o))
    );
  };

  // Settings
  const updateSettings = (newSettings: Partial<StoreSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  // Reviews
  const addReview = (productId: string, reviewData: Omit<Review, 'id' | 'productId' | 'date'>) => {
    const newReview: Review = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      productId,
      date: 'Just now'
    };
    setReviews(prev => {
      const existing = prev[productId] || [];
      return {
        ...prev,
        [productId]: [newReview, ...existing]
      };
    });

    // Update product average rating and count
    setProducts(prev =>
      prev.map(prod => {
        if (prod.id === productId) {
          const prodReviews = [...(reviews[productId] || []), newReview];
          const avg = prodReviews.reduce((sum, r) => sum + r.rating, 0) / prodReviews.length;
          return {
            ...prod,
            rating: Number(avg.toFixed(1)),
            reviewsCount: prod.reviewsCount + 1
          };
        }
        return prod;
      })
    );
  };

  // Reset to demo factory state
  const resetToDemoData = () => {
    localStorage.removeItem(STORAGE_KEYS.PRODUCTS);
    localStorage.removeItem(STORAGE_KEYS.PROMOTIONS);
    localStorage.removeItem(STORAGE_KEYS.ORDERS);
    localStorage.removeItem(STORAGE_KEYS.COUPONS);
    localStorage.removeItem(STORAGE_KEYS.SETTINGS);
    localStorage.removeItem(STORAGE_KEYS.REVIEWS);

    setProducts(initialProducts);
    setPromotions(initialPromotions);
    setOrders(initialOrders);
    setCoupons(initialCoupons);
    setSettings(initialSettings);
    setReviews(sampleReviews);
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        categories,
        promotions,
        orders,
        coupons,
        settings,
        reviews,
        addProduct,
        updateProduct,
        deleteProduct,
        addPromotion,
        updatePromotion,
        deletePromotion,
        togglePromotionStatus,
        addOrder,
        updateOrderStatus,
        updateSettings,
        addReview,
        resetToDemoData
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
