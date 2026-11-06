import { Order, StoreSettings } from '../types';

export const initialOrders: Order[] = [
  {
    id: 'ord-1001',
    orderNumber: 'VT-2026-94821',
    customerName: 'Aditya Kashyap',
    email: 'aditya.k@gmail.com',
    phone: '+91 98765 43210',
    shippingAddress: {
      street: '402, Skyline Residency, Indiranagar',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560038',
      country: 'India'
    },
    items: [
      {
        productId: 'prod-001',
        name: 'Classic Forest Hoodie',
        image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=85',
        price: 899,
        quantity: 1,
        size: 'L',
        color: 'Forest Green'
      },
      {
        productId: 'prod-004',
        name: 'Striped Heritage Knit Sweater',
        image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=800&q=85',
        price: 1099,
        quantity: 1,
        size: 'M',
        color: 'Ecru & Forest'
      }
    ],
    subtotal: 1998,
    discount: 200,
    shippingFee: 0,
    total: 1798,
    couponCode: 'WINTER20',
    paymentMethod: 'upi',
    status: 'Delivered',
    createdAt: '2026-11-04T14:22:00Z',
    estimatedDelivery: '2026-11-06'
  },
  {
    id: 'ord-1002',
    orderNumber: 'VT-2026-95104',
    customerName: 'Meera Nambiar',
    email: 'meera.nambiar@outlook.com',
    phone: '+91 98111 22334',
    shippingAddress: {
      street: 'Flat 12B, Palm Grove Towers, Bandra West',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400050',
      country: 'India'
    },
    items: [
      {
        productId: 'prod-002',
        name: 'Linen Casual Shirt',
        image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=85',
        price: 799,
        quantity: 2,
        size: 'M',
        color: 'Sand Beige'
      }
    ],
    subtotal: 1598,
    discount: 160,
    shippingFee: 0,
    total: 1438,
    couponCode: 'WELCOME10',
    paymentMethod: 'card',
    status: 'Shipped',
    createdAt: '2026-11-05T09:15:00Z',
    estimatedDelivery: '2026-11-08'
  },
  {
    id: 'ord-1003',
    orderNumber: 'VT-2026-95388',
    customerName: 'Kabir Sen',
    email: 'kabir.sen@gmail.com',
    phone: '+91 99000 77665',
    shippingAddress: {
      street: 'House 88, Sector 15, Golf Course Road',
      city: 'Gurugram',
      state: 'Haryana',
      pincode: '122001',
      country: 'India'
    },
    items: [
      {
        productId: 'prod-007',
        name: 'Wool Blend Tailored Overcoat',
        image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=85',
        price: 2999,
        quantity: 1,
        size: 'XL',
        color: 'Camel Tan'
      }
    ],
    subtotal: 2999,
    discount: 0,
    shippingFee: 0,
    total: 2999,
    paymentMethod: 'cod',
    status: 'Processing',
    createdAt: '2026-11-06T08:30:00Z',
    estimatedDelivery: '2026-11-10'
  }
];

export const initialSettings: StoreSettings = {
  storeName: 'VogueThread',
  storeLogoText: 'VogueThread',
  currency: 'INR',
  currencySymbol: '₹',
  shippingCharges: 99,
  freeShippingThreshold: 999,
  contactEmail: 'concierge@voguethread.com',
  contactPhone: '+91 1800 200 4848',
  address: 'Level 4, Designer Arcade, DLF Promenade, New Delhi 110070',
  announcementEnabled: true,
  announcementText: 'Limited Time Offer! Up to 70% OFF on all styles'
};
