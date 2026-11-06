export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  originalPrice: number;
  discountedPrice: number;
  discountPercentage: number;
  category: string;
  subCategory?: string;
  gender: 'Men' | 'Women' | 'Unisex';
  images: string[];
  rating: number;
  reviewsCount: number;
  sizes: string[];
  colors: {
    name: string;
    hex: string;
  }[];
  isBestseller: boolean;
  isNewArrival: boolean;
  isActive: boolean;
  stock: number;
  sku: string;
  createdAt: string;
  details?: string[];
  fabric?: string;
  careInstructions?: string[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  itemCount?: number;
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

export interface Promotion {
  id: string;
  title: string;
  description: string;
  discountPercentage: number;
  type: 'announcement_bar' | 'flash_sale' | 'hero' | 'popup_modal' | 'banner';
  bannerImage?: string;
  ctaText: string;
  ctaLink: string;
  startDate: string;
  endDate: string; // ISO string for real countdown
  isCountdownEnabled: boolean;
  isPopupEnabled: boolean;
  popupDelaySeconds: number;
  popupFrequency: 'always' | 'once_per_session' | 'daily';
  isActive: boolean;
  badgeText?: string;
}

export interface CartItem {
  id: string; // Composite unique key: productId + size + color
  productId: string;
  name: string;
  image: string;
  price: number;
  originalPrice: number;
  size: string;
  color: string;
  colorHex?: string;
  quantity: number;
  stock: number;
  category: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  size: string;
  color: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  email: string;
  phone: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  couponCode?: string;
  paymentMethod: 'cod' | 'card' | 'upi' | 'netbanking';
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  createdAt: string;
  estimatedDelivery: string;
}

export interface Coupon {
  id: string;
  code: string;
  discountPercentage: number;
  minOrderValue: number;
  maxDiscount?: number;
  description: string;
  isActive: boolean;
  expiryDate: string;
}

export interface StoreSettings {
  storeName: string;
  storeLogoText: string;
  currency: string;
  currencySymbol: string;
  shippingCharges: number;
  freeShippingThreshold: number;
  contactEmail: string;
  contactPhone: string;
  address: string;
  announcementEnabled: boolean;
  announcementText: string;
}
