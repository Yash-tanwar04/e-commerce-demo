import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { DiyaDecoration } from '../common/DiwaliDecorations';

export const LookbookBanner: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#4A141A] via-[#671F27] to-[#20392F] text-white border-2 border-[#C99A45]/35 shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
          
          {/* Text Left */}
          <div className="lg:col-span-6 p-8 sm:p-12 lg:p-16 space-y-4">
            <div className="flex items-center gap-2">
              <DiyaDecoration size="sm" />
              <span className="font-cursive text-3xl sm:text-4xl text-[#F4C56A] block">
                Festive Edition Vol. V
              </span>
            </div>

            <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#FFECC0] leading-tight">
              The Art of Festive Elegance
            </h3>

            <p className="text-sm sm:text-base text-white/80 leading-relaxed max-w-md">
              Celebrate auspicious moments in hand-combed French Terry, pure European flax linen, and tailored Australian wool crafted for cold-weather festivities.
            </p>

            <div className="pt-2">
              <Link
                to="/shop?sale=true"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#F4C56A] to-[#C99A45] hover:from-[#FFECC0] hover:to-[#D4A359] text-[#1D1D1B] font-bold px-7 py-3.5 rounded-full shadow-md transition-all hover:scale-105 active:scale-95 text-sm border border-[#FFECC0]/50"
              >
                <span>Explore Festive Lookbook</span>
                <ArrowRight className="w-4 h-4 text-[#4A141A]" />
              </Link>
            </div>
          </div>

          {/* Image Right */}
          <div className="lg:col-span-6 h-72 sm:h-96 lg:h-[460px] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=85"
              alt="Diwali Festive Campaign"
              className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
            />
          </div>

        </div>
      </div>
    </section>
  );
};
