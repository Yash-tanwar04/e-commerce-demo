import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, ArrowRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { CountdownTimer } from './CountdownTimer';
import { DiyaDecoration, FestiveFireworkBurst } from './DiwaliDecorations';

export const AnnouncementBar: React.FC = () => {
  const { promotions, settings, updatePromotion } = useStore();
  const [isDismissed, setIsDismissed] = useState(false);

  // Find active announcement bar promotion
  const announcementPromo = promotions.find(
    p => p.type === 'announcement_bar' && p.isActive
  );

  if (isDismissed || !settings.announcementEnabled || !announcementPromo) {
    return null;
  }

  const handleExpire = () => {
    updatePromotion(announcementPromo.id, { isActive: false });
  };

  return (
    <aside
      aria-label="Diwali Announcement"
      className="relative z-40 bg-gradient-to-r from-[#4A141A] via-[#671F27] to-[#4A141A] text-white py-2 px-4 text-xs md:text-sm border-b border-[#C99A45]/30 overflow-hidden shadow-sm"
    >
      {/* Subtle Corner Fireworks Graphic Watermarks matching reference */}
      <FestiveFireworkBurst className="absolute -left-3 -top-2 opacity-25" size={60} />
      <FestiveFireworkBurst className="absolute -right-3 -bottom-2 opacity-25" size={60} />

      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 relative z-10">
        
        {/* Left: Festive Headline with Glowing Diyas */}
        <div className="flex items-center gap-2.5 mx-auto md:mx-0">
          <DiyaDecoration size="sm" />
          <span className="font-serif text-sm md:text-base font-bold text-[#FFECC0] tracking-wide drop-shadow-sm">
            {announcementPromo.title || 'Diwali Mega Sale'}
          </span>
          <DiyaDecoration size="sm" />

          <span className="text-white/40 hidden sm:inline">|</span>

          <span className="text-white/90 hidden sm:inline font-sans text-xs">
            {announcementPromo.description || 'Up to 70% OFF on all styles'}
          </span>

          {announcementPromo.badgeText && (
            <span className="hidden lg:inline text-xs text-[#F4C56A] font-semibold border-l border-white/20 pl-2.5">
              {announcementPromo.badgeText}
            </span>
          )}
        </div>

        {/* Center / Right: Synchronized Live Countdown & Shop CTA */}
        <div className="flex items-center gap-3 sm:gap-5 mx-auto md:mx-0">
          {announcementPromo.isCountdownEnabled && (
            <div className="flex items-center gap-2 bg-black/25 px-2.5 py-1 rounded-xl border border-[#C99A45]/30">
              <CountdownTimer
                endDate={announcementPromo.endDate}
                onExpire={handleExpire}
                variant="banner"
              />
            </div>
          )}

          <div className="h-4 w-px bg-white/20 hidden sm:block" />

          {/* Golden Shop Now Pill Button matching reference */}
          <Link
            to={announcementPromo.ctaLink || '/shop?sale=true'}
            className="inline-flex items-center gap-1.5 font-bold text-xs bg-gradient-to-r from-[#F4C56A] to-[#C99A45] hover:from-[#FFECC0] hover:to-[#D4A359] text-[#4A141A] px-4 py-1.5 rounded-full shadow transition-all hover:scale-105 active:scale-95"
          >
            <span>{announcementPromo.ctaText || 'Shop Now'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          {/* Dismiss Button */}
          <button
            onClick={() => setIsDismissed(true)}
            className="text-white/60 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
            title="Dismiss announcement"
            aria-label="Close announcement bar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

      </div>
    </aside>
  );
};
