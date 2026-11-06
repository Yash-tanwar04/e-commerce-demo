import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from '../product/ProductCard';
import { Product } from '../../types';
import { FestiveDivider } from '../common/DiwaliDecorations';

interface BestsellersSectionProps {
  onQuickView: (product: Product) => void;
}

const CATEGORY_TABS = ['All', 'Hoodies', 'Shirts', 'T-Shirts', 'Jackets'];

export const BestsellersSection: React.FC<BestsellersSectionProps> = ({ onQuickView }) => {
  const { products } = useStore();
  const [activeTab, setActiveTab] = useState('All');

  const filteredProducts = products.filter(product => {
    if (!product.isActive) return false;
    if (activeTab === 'All') return product.isBestseller;
    return product.category.toLowerCase() === activeTab.toLowerCase();
  });

  const displayProducts = filteredProducts.slice(0, 4);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header with Title, Festive Divider, Tabs, and View All */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          <div className="flex items-center gap-3">
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#1D1D1B]">
              Bestsellers
            </h2>
            <FestiveDivider />
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORY_TABS.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  activeTab === tab
                    ? 'bg-[#20392F] text-[#FFECC0] shadow-sm border border-[#C99A45]/50'
                    : 'bg-white/85 hover:bg-[#EAE0D0] text-[#1D1D1B]/80 hover:text-[#1D1D1B] border border-[#C99A45]/20'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <Link
          to={`/shop?${activeTab !== 'All' ? `category=${activeTab}` : 'filter=bestsellers'}`}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1D1D1B] hover:text-[#671F27] transition-colors self-start md:self-auto group"
        >
          <span>View All</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#C99A45]" />
        </Link>
      </div>

      {/* Product Grid */}
      {displayProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {displayProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={onQuickView}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white/60 rounded-3xl border border-[#C99A45]/20">
          <p className="text-sm text-[#89857E]">No bestsellers found in this category.</p>
        </div>
      )}
    </section>
  );
};
