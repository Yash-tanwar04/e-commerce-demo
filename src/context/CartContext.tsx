import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product, Coupon } from '../types';
import { useStore } from './StoreContext';

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  appliedCoupon: Coupon | null;
  couponError: string | null;
  isCartOpen: boolean;
  addToCart: (product: Product, size: string, color: string, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'vt_cart_v2';
const COUPON_STORAGE_KEY = 'vt_applied_coupon_v2';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { settings, coupons } = useStore();

  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [
        // Seed initial 2 items to match the "2" badge in the UI reference!
        {
          id: 'prod-001-L-Forest Green',
          productId: 'prod-001',
          name: 'Classic Forest Hoodie',
          image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=85',
          price: 899,
          originalPrice: 2999,
          size: 'L',
          color: 'Forest Green',
          colorHex: '#20392F',
          quantity: 1,
          stock: 48,
          category: 'Hoodies'
        },
        {
          id: 'prod-002-M-Sand Beige',
          productId: 'prod-002',
          name: 'Linen Casual Shirt',
          image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=85',
          price: 799,
          originalPrice: 1999,
          size: 'M',
          color: 'Sand Beige',
          colorHex: '#D7C7B3',
          quantity: 1,
          stock: 35,
          category: 'Shirts'
        }
      ];
    } catch {
      return [];
    }
  });

  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(() => {
    try {
      const saved = localStorage.getItem(COUPON_STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [couponError, setCouponError] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  // Sync cart items to localStorage
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  // Sync applied coupon to localStorage
  useEffect(() => {
    if (appliedCoupon) {
      localStorage.setItem(COUPON_STORAGE_KEY, JSON.stringify(appliedCoupon));
    } else {
      localStorage.removeItem(COUPON_STORAGE_KEY);
    }
  }, [appliedCoupon]);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Calculate discount
  let discount = 0;
  if (appliedCoupon && subtotal >= appliedCoupon.minOrderValue) {
    const rawDiscount = (subtotal * appliedCoupon.discountPercentage) / 100;
    discount = appliedCoupon.maxDiscount ? Math.min(rawDiscount, appliedCoupon.maxDiscount) : rawDiscount;
  }

  // Shipping calculation
  const shippingFee = subtotal === 0 || subtotal >= settings.freeShippingThreshold ? 0 : settings.shippingCharges;
  const total = Math.max(0, subtotal - discount + shippingFee);

  const addToCart = (product: Product, size: string, color: string, quantity: number = 1) => {
    const colorObj = product.colors.find(c => c.name === color);
    const cartItemId = `${product.id}-${size}-${color}`;

    setItems(prevItems => {
      const existing = prevItems.find(item => item.id === cartItemId);
      if (existing) {
        return prevItems.map(item =>
          item.id === cartItemId
            ? { ...item, quantity: Math.min(item.stock, item.quantity + quantity) }
            : item
        );
      } else {
        const newItem: CartItem = {
          id: cartItemId,
          productId: product.id,
          name: product.name,
          image: product.images[0] || '',
          price: product.discountedPrice,
          originalPrice: product.originalPrice,
          size,
          color,
          colorHex: colorObj?.hex || '#000000',
          quantity,
          stock: product.stock,
          category: product.category
        };
        return [...prevItems, newItem];
      }
    });

    // Auto open drawer for immediate micro-interaction feedback
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setItems(prev => prev.filter(item => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setItems(prev =>
      prev.map(item =>
        item.id === cartItemId ? { ...item, quantity: Math.min(item.stock, quantity) } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    setAppliedCoupon(null);
    localStorage.removeItem(CART_STORAGE_KEY);
    localStorage.removeItem(COUPON_STORAGE_KEY);
  };

  const applyCoupon = (code: string): boolean => {
    setCouponError(null);
    const trimmed = code.trim().toUpperCase();
    const foundCoupon = coupons.find(c => c.code.toUpperCase() === trimmed && c.isActive);

    if (!foundCoupon) {
      setCouponError('Invalid coupon code. Try VOGUE70 or WINTER20');
      return false;
    }

    if (subtotal < foundCoupon.minOrderValue) {
      setCouponError(`Minimum order value of ₹${foundCoupon.minOrderValue} required for this code.`);
      return false;
    }

    setAppliedCoupon(foundCoupon);
    return true;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponError(null);
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen(prev => !prev);

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        subtotal,
        discount,
        shippingFee,
        total,
        appliedCoupon,
        couponError,
        isCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        applyCoupon,
        removeCoupon,
        openCart,
        closeCart,
        toggleCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
