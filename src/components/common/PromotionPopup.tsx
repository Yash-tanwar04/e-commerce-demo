import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, ArrowRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../../context/StoreContext';
import { DiyaDecoration, FestiveFireworkBurst } from './DiwaliDecorations';

const POPUP_STORAGE_KEY = 'vt_popup_dismissed_v2';

export const PromotionPopup: React.FC = () => {
  const { promotions } = useStore();
  const [isVisible, setIsVisible] = useState(false);

  // Find active popup promotion
  const popupPromo = promotions.find(p => p.type === 'popup_modal' && p.isActive && p.isPopupEnabled);

  useEffect(() => {
    if (!popupPromo) {
      setIsVisible(false);
      return;
    }

    // Check frequency rule
    const dismissedTime = localStorage.getItem(POPUP_STORAGE_KEY);
    if (popupPromo.popupFrequency === 'once_per_session' && dismissedTime) {
      return;
    }

    if (popupPromo.popupFrequency === 'daily' && dismissedTime) {
      const hoursSince = (Date.now() - Number(dismissedTime)) / (1000 * 3600);
      if (hoursSince < 24) return;
    }

    // Respect delay
    const delayMs = (popupPromo.popupDelaySeconds || 2) * 1000;
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delayMs);

    return () => clearTimeout(timer);
  }, [popupPromo]);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem(POPUP_STORAGE_KEY, Date.now().toString());
  };

  if (!popupPromo || !isVisible) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="fixed bottom-6 right-6 z-50 w-full max-w-[380px] sm:max-w-[430px] shadow-2xl rounded-3xl overflow-hidden bg-gradient-to-br from-[#4A141A] via-[#671F27] to-[#20392F] text-white border-2 border-[#C99A45]/60"
        role="dialog"
        aria-modal="true"
        aria-label="Diwali Mega Sale Promotion"
      >
        {/* Decorative Golden Firework Sparkle in Corner */}
        <FestiveFireworkBurst className="absolute -top-4 -right-4 opacity-30" size={80} />

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-3.5 right-3.5 z-20 w-8 h-8 rounded-full bg-black/30 hover:bg-black/50 text-[#FFECC0] flex items-center justify-center transition-colors border border-[#C99A45]/40"
          title="Close offer"
          aria-label="Close promotional offer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-5 sm:p-6 flex items-center gap-4 relative z-10">
          
          {/* Left: 3D Gift Box Visual Graphic with Glowing Diya */}
          <div className="relative shrink-0 w-28 h-28 flex items-center justify-center">
            {/* Soft Warm Golden Glow */}
            <div className="absolute inset-0 bg-[#F4C56A]/25 rounded-full blur-xl animate-pulse-subtle" />
            
            <img
              src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=300&q=80"
              alt="Diwali Gift Surprise"
              className="w-24 h-24 object-cover rounded-2xl shadow-xl rotate-[-5deg] hover:rotate-0 transition-transform duration-300 border border-[#C99A45]/40"
            />

            {/* Glowing Diya sitting in front of gift box */}
            <div className="absolute -bottom-2 -left-1">
              <DiyaDecoration size="sm" />
            </div>

            {/* Sparkle Icons */}
            <Sparkles className="w-4 h-4 text-[#F4C56A] absolute -top-1 right-1 animate-bounce" />
          </div>

          {/* Right: Festive Copy */}
          <div className="flex flex-col flex-1 pl-1">
            <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-widest text-[#F4C56A]">
              <span>DIWALI MEGA SALE</span>
            </div>

            <div className="font-serif text-3xl sm:text-4xl font-extrabold text-[#FFECC0] leading-none my-1 tracking-tight drop-shadow-sm">
              UP TO {popupPromo.discountPercentage || 70}% OFF
            </div>

            {/* Limited Time Offer Pill */}
            <div className="inline-block my-1">
              <span className="bg-gradient-to-r from-[#F4C56A] to-[#C99A45] text-[#4A141A] text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
                {popupPromo.badgeText || 'Limited Time Offer!'}
              </span>
            </div>

            <p className="text-xs text-white/90 line-clamp-2 mt-1 leading-snug">
              {popupPromo.description || 'Celebrate the festival of lights with festive styles and incredible offers.'}
            </p>

            {/* Shop Now CTA */}
            <div className="mt-3.5">
              <Link
                to={popupPromo.ctaLink || '/shop?sale=true'}
                onClick={handleClose}
                className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#F4C56A] via-[#ECC981] to-[#C99A45] hover:from-[#FFECC0] hover:to-[#D4A359] text-[#1D1D1B] font-bold text-xs sm:text-sm py-2.5 px-4 rounded-full shadow-md transition-all hover:scale-[1.02] active:scale-95 border border-[#FFECC0]"
              >
                <span>{popupPromo.ctaText || 'SHOP NOW'}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#4A141A]" />
              </Link>
            </div>

          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
