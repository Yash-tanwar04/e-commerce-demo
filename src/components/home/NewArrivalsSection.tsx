import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from '../product/ProductCard';
import { Product } from '../../types';
import { FestiveDivider } from '../common/DiwaliDecorations';

interface NewArrivalsSectionProps {
  onQuickView: (product: Product) => void;
}

export const NewArrivalsSection: React.FC<NewArrivalsSectionProps> = ({ onQuickView }) => {
  const { products } = useStore();

  const newProducts = products.filter(p => p.isActive && p.isNewArrival).slice(0, 4);

  if (newProducts.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#671F27] font-bold mb-1">
            <Sparkles className="w-3.5 h-3.5 text-[#C99A45]" />
            <span>Festive Drops</span>
          </div>
          <div className="flex items-center gap-3">
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#1D1D1B]">
              New Arrivals
            </h2>
            <FestiveDivider />
          </div>
        </div>

        <Link
          to="/shop?filter=new"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1D1D1B] hover:text-[#671F27] transition-colors group self-start sm:self-auto"
        >
          <span>View All Drops</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#C99A45]" />
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {newProducts.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onQuickView={onQuickView}
          />
        ))}
      </div>
    </section>
  );
};
