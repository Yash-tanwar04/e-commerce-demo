import { Coupon } from '../types';

export const initialCoupons: Coupon[] = [
  {
    id: 'c-0',
    code: 'DIWALI70',
    discountPercentage: 70,
    minOrderValue: 999,
    maxDiscount: 2000,
    description: 'Diwali Mega Sale 70% voucher on festive orders over ₹999',
    isActive: true,
    expiryDate: '2026-12-31T23:59:59Z'
  },
  {
    id: 'c-1',
    code: 'VOGUE70',
    discountPercentage: 70,
    minOrderValue: 999,
    maxDiscount: 2000,
    description: 'Flash 70% discount on select collection orders over ₹999',
    isActive: true,
    expiryDate: '2026-12-31T23:59:59Z'
  },
  {
    id: 'c-2',
    code: 'WINTER20',
    discountPercentage: 20,
    minOrderValue: 499,
    maxDiscount: 1000,
    description: 'Flat 20% OFF on all winter jackets & knitwear',
    isActive: true,
    expiryDate: '2026-12-31T23:59:59Z'
  },
  {
    id: 'c-3',
    code: 'WELCOME10',
    discountPercentage: 10,
    minOrderValue: 0,
    description: '10% OFF your very first order at VogueThread',
    isActive: true,
    expiryDate: '2026-12-31T23:59:59Z'
  }
];
