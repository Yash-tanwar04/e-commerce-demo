import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { FestiveDivider } from '../common/DiwaliDecorations';

export const CategorySection: React.FC = () => {
  const { categories } = useStore();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header with Golden Festive Flourish matching reference */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#1D1D1B]">
            Shop by Category
          </h2>
          <FestiveDivider />
        </div>

        <Link
          to="/shop"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1D1D1B] hover:text-[#671F27] transition-colors group self-start sm:self-auto"
        >
          <span>View All</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#C99A45]" />
        </Link>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4 sm:gap-5">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            to={`/shop?category=${cat.name}`}
            className="group flex flex-col items-center"
          >
            {/* Rounded Squircle Container with Warm Festive Backing */}
            <div className="w-full aspect-[4/5] rounded-3xl bg-[#EFE8DC] group-hover:bg-[#E8DFC2] border border-[#C99A45]/20 group-hover:border-[#C99A45]/60 flex items-center justify-center p-3 sm:p-4 overflow-hidden transition-all duration-300 group-hover:shadow-md group-hover:-translate-y-1">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover object-center rounded-2xl group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
            
            {/* Category Name */}
            <span className="mt-3 font-semibold text-sm sm:text-base text-[#1D1D1B] group-hover:text-[#671F27] transition-colors text-center">
              {cat.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
};
