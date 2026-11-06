import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { CountdownTimer } from './CountdownTimer';
import { DiyaDecoration, FestiveMandalaBorder, FestiveFireworkBurst } from './DiwaliDecorations';

export const FlashSaleBanner: React.FC = () => {
  const { promotions, updatePromotion } = useStore();

  const flashPromo = promotions.find(p => p.type === 'flash_sale' && p.isActive);

  if (!flashPromo) return null;

  const handleExpire = () => {
    updatePromotion(flashPromo.id, { isActive: false });
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#172B23] via-[#20392F] to-[#172B23] text-white p-6 sm:p-8 md:p-10 shadow-xl border-2 border-[#C99A45]/40">
        
        {/* Left & Right Traditional Golden Mandala Borders matching reference */}
        <div className="absolute left-0 inset-y-0 w-32 overflow-hidden pointer-events-none">
          <FestiveMandalaBorder className="w-40 h-full -translate-x-12 opacity-50" />
        </div>
        <div className="absolute right-0 inset-y-0 w-32 overflow-hidden pointer-events-none">
          <FestiveMandalaBorder className="w-40 h-full translate-x-12 rotate-180 opacity-50" />
        </div>

        {/* Subtle Background Fireworks Sparkle */}
        <FestiveFireworkBurst className="absolute top-2 right-1/4 opacity-25" size={80} />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 md:gap-8">
          
          {/* Left Column: Traditional Glowing Diyas + Diwali Flash Sale Title */}
          <div className="flex items-center gap-5 text-center lg:text-left">
            {/* Pair of glowing diyas on golden plate */}
            <div className="relative flex items-end gap-1.5 shrink-0 select-none pb-1">
              <DiyaDecoration size="lg" glow={true} />
              <DiyaDecoration size="md" glow={true} className="-ml-3 mb-1" />
            </div>

            <div>
              <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#FFECC0] italic drop-shadow-sm">
                Diwali Flash Sale
              </h3>
              <p className="text-[#E9DFD3]/90 text-sm sm:text-base mt-1">
                {flashPromo.description || 'Grab your favorites at unbelievable prices!'}
              </p>
            </div>
          </div>

          {/* Center Column: Live Real-Time Synchronized Countdown */}
          <div className="flex items-center gap-4 sm:gap-6 bg-black/30 border border-[#C99A45]/50 px-5 py-3 rounded-2xl backdrop-blur-sm shadow-inner">
            <span className="text-xs sm:text-sm font-bold text-[#F4C56A] tracking-wider uppercase">
              Ends in:
            </span>
            <CountdownTimer
              endDate={flashPromo.endDate}
              onExpire={handleExpire}
              variant="banner"
            />
          </div>

          {/* Right Column: Golden Shop Now Pill Button */}
          <div>
            <Link
              to={flashPromo.ctaLink || '/shop?sale=true'}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#F4C56A] to-[#C99A45] hover:from-[#FFECC0] hover:to-[#D4A359] text-[#1D1D1B] font-bold px-8 py-3.5 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 text-sm sm:text-base border border-[#FFECC0]/50"
            >
              <span>{flashPromo.ctaText || 'Shop Now'}</span>
              <ArrowRight className="w-4 h-4 text-[#4A141A]" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};
