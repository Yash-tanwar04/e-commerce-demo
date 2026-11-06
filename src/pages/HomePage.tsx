import React, { useState } from 'react';
import { HeroSlider } from '../components/home/HeroSlider';
import { ServiceHighlights } from '../components/home/ServiceHighlights';
import { CategorySection } from '../components/home/CategorySection';
import { FlashSaleBanner } from '../components/common/FlashSaleBanner';
import { BestsellersSection } from '../components/home/BestsellersSection';
import { NewArrivalsSection } from '../components/home/NewArrivalsSection';
import { LookbookBanner } from '../components/home/LookbookBanner';
import { QuickViewModal } from '../components/common/QuickViewModal';
import { Product } from '../types';

export const HomePage: React.FC = () => {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  return (
    <div className="pb-16">
      {/* Hero Section */}
      <HeroSlider />

      {/* Service Highlights */}
      <ServiceHighlights />

      {/* Shop by Category */}
      <CategorySection />

      {/* Flash Sale Banner with Live Synchronized Countdown */}
      <FlashSaleBanner />

      {/* Bestsellers Section matching UI reference */}
      <BestsellersSection onQuickView={prod => setQuickViewProduct(prod)} />

      {/* New Arrivals Section */}
      <NewArrivalsSection onQuickView={prod => setQuickViewProduct(prod)} />

      {/* Lookbook / Collection Banner */}
      <LookbookBanner />

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
};
