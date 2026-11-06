import { Promotion } from '../types';

// Helper to create future target timestamps so timers start realistically
const getFutureDate = (hours: number, minutes: number = 0, seconds: number = 0): string => {
  const d = new Date();
  d.setHours(d.getHours() + hours);
  d.setMinutes(d.getMinutes() + minutes);
  d.setSeconds(d.getSeconds() + seconds);
  return d.toISOString();
};

export const initialPromotions: Promotion[] = [
  {
    id: 'promo-announcement-bar',
    title: 'Diwali Mega Sale',
    description: 'Up to 70% OFF on all styles',
    discountPercentage: 70,
    type: 'announcement_bar',
    ctaText: 'Shop Now',
    ctaLink: '/shop?sale=true',
    startDate: new Date().toISOString(),
    endDate: getFutureDate(2, 18, 34),
    isCountdownEnabled: true,
    isPopupEnabled: false,
    popupDelaySeconds: 0,
    popupFrequency: 'always',
    isActive: true,
    badgeText: 'Limited Time Offer!'
  },
  {
    id: 'promo-flash-sale',
    title: 'Diwali Flash Sale',
    description: 'Grab your favorites at unbelievable prices!',
    discountPercentage: 70,
    type: 'flash_sale',
    ctaText: 'Shop Now',
    ctaLink: '/shop?sale=true',
    startDate: new Date().toISOString(),
    endDate: getFutureDate(2, 18, 34),
    isCountdownEnabled: true,
    isPopupEnabled: false,
    popupDelaySeconds: 0,
    popupFrequency: 'always',
    isActive: true,
    badgeText: 'Diwali Flash Sale'
  },
  {
    id: 'promo-70-popup',
    title: 'UP TO 70% OFF',
    description: 'Celebrate the festival of lights with festive styles and incredible offers.',
    discountPercentage: 70,
    type: 'popup_modal',
    bannerImage: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=600&q=80',
    ctaText: 'SHOP NOW',
    ctaLink: '/shop?sale=true',
    startDate: new Date().toISOString(),
    endDate: getFutureDate(2, 18, 34),
    isCountdownEnabled: true,
    isPopupEnabled: true,
    popupDelaySeconds: 2,
    popupFrequency: 'once_per_session',
    isActive: true,
    badgeText: 'Limited Time Offer!'
  },
  {
    id: 'promo-hero-winter',
    title: 'Festive Collection',
    description: 'Celebrate Diwali in Style. Up to 70% OFF on Festive & Winter Styles',
    discountPercentage: 70,
    type: 'hero',
    bannerImage: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1600&q=85',
    ctaText: 'Shop the Diwali Sale',
    ctaLink: '/shop?sale=true',
    startDate: new Date().toISOString(),
    endDate: getFutureDate(48),
    isCountdownEnabled: false,
    isPopupEnabled: false,
    popupDelaySeconds: 0,
    popupFrequency: 'always',
    isActive: true,
    badgeText: 'Diwali Special'
  }
];
