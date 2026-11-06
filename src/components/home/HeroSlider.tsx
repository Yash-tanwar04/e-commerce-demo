import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DiyaDecoration,
  FairyLights,
  HangingLantern,
  MarigoldGarland,
  FestiveFireworkBurst
} from '../common/DiwaliDecorations';

const slides = [
  {
    id: 1,
    tag: 'Diwali Special',
    title: 'Festive Collection',
    subheading: 'Celebrate Diwali in Style',
    offer: 'Up to 70% OFF on Festive & Winter Styles',
    ctaText: 'Shop the Diwali Sale',
    ctaLink: '/shop?sale=true',
    // Elegant male model in dark green festive embroidered kurta / shawl matching the reference image!
    image: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1200&q=85',
    bgGradient: 'from-[#F5EDE1] via-[#EFE5D5] to-[#E5D7C2]'
  },
  {
    id: 2,
    tag: 'Artisanal Festive',
    title: 'Linen & Silk Kurtas',
    subheading: 'Heritage Weaves for Auspicious Evenings',
    offer: 'Up to 60% OFF on Pure European Linen & Silk',
    ctaText: 'Explore Festive Shirts',
    ctaLink: '/shop?category=Shirts',
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1200&q=85',
    bgGradient: 'from-[#F3ECE0] via-[#EBE0CD] to-[#DFD0BB]'
  },
  {
    id: 3,
    tag: 'Royal Winter Outerwear',
    title: 'Sartorial Overcoats',
    subheading: 'Regal Warmth for Winter Festivities',
    offer: 'Flat 50% OFF on Tailored Lambswool Coats',
    ctaText: 'Discover Outerwear',
    ctaLink: '/shop?category=Jackets',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1200&q=85',
    bgGradient: 'from-[#EFE7DC] via-[#E6DBCB] to-[#D8C9B5]'
  }
];

export const HeroSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 7500);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);
  };

  const slide = slides[currentSlide];

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-2 sm:pt-4 pb-8 max-w-7xl mx-auto">
      <div
        className={`relative overflow-hidden rounded-3xl bg-gradient-to-r ${slide.bgGradient} transition-colors duration-700 shadow-md min-h-[460px] md:min-h-[540px] flex items-center border border-[#C99A45]/25`}
      >
        {/* 1. Hanging Golden Fairy Lights along Top Edge */}
        <FairyLights className="absolute top-0 inset-x-0" />

        {/* 2. Left Side Hanging Brass Lantern & Marigold Garland */}
        <div className="absolute top-0 left-3 sm:left-6 z-20 flex items-start gap-2 sm:gap-3 pointer-events-none">
          <MarigoldGarland length={8} className="hidden sm:flex mt-1" />
          <HangingLantern height={145} />
          <HangingLantern height={110} className="hidden md:flex mt-2" />
        </div>

        {/* 3. Background Subtle Festive Fireworks */}
        <FestiveFireworkBurst className="absolute top-8 right-1/3 opacity-30" size={110} />
        <FestiveFireworkBurst className="absolute top-16 right-16 opacity-20 hidden md:block" size={90} />

        {/* 4. Navigation Arrow Left */}
        <button
          onClick={prevSlide}
          className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/85 hover:bg-white text-[#1D1D1B] flex items-center justify-center shadow-md transition-all hover:scale-105 active:scale-95 border border-[#C99A45]/30"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5 text-[#20392F]" />
        </button>

        {/* Navigation Arrow Right */}
        <button
          onClick={nextSlide}
          className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/85 hover:bg-white text-[#1D1D1B] flex items-center justify-center shadow-md transition-all hover:scale-105 active:scale-95 border border-[#C99A45]/30"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5 text-[#20392F]" />
        </button>

        {/* Slide Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55 }}
            className="w-full grid grid-cols-1 md:grid-cols-12 items-center"
          >
            {/* Left Column: Text & Festive Offer */}
            <div className="md:col-span-7 p-6 sm:p-10 lg:p-16 z-10 flex flex-col items-start justify-center pl-10 sm:pl-20 lg:pl-28">
              
              {/* Diwali Eyebrow with Miniature Diyas */}
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 sm:w-10 h-px bg-[#C99A45]" />
                <DiyaDecoration size="sm" />
                <span className="font-cursive text-2xl sm:text-3xl text-[#671F27] tracking-wider font-semibold">
                  {slide.tag}
                </span>
                <DiyaDecoration size="sm" />
                <span className="w-6 sm:w-10 h-px bg-[#C99A45]" />
              </div>

              {/* Bold Serif Headline */}
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1D1D1B] leading-[1.08] drop-shadow-xs">
                {slide.title}
              </h1>

              {/* Subheading */}
              <p className="text-lg sm:text-xl text-[#20392F] font-semibold mt-3 font-serif italic">
                {slide.subheading}
              </p>

              {/* Offer Text */}
              <p className="text-sm sm:text-base text-[#1D1D1B]/80 mt-1 font-sans">
                Up to <strong className="font-extrabold text-[#671F27]">70% OFF</strong> on Festive & Winter Styles
              </p>

              {/* CTA Button matching reference */}
              <div className="mt-8 flex items-center gap-4">
                <Link
                  to={slide.ctaLink}
                  className="inline-flex items-center gap-2.5 bg-[#20392F] hover:bg-[#152720] text-[#FFECC0] font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-95 text-sm sm:text-base border border-[#C99A45]/40 group"
                >
                  <span>{slide.ctaText}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#F4C56A]" />
                </Link>
              </div>
            </div>

            {/* Right Column: Festive Model Photography with Diyas at Base */}
            <div className="md:col-span-5 relative h-80 sm:h-96 md:h-[540px] flex items-end justify-center md:justify-end overflow-hidden">
              <motion.img
                src={slide.image}
                alt={slide.title}
                initial={{ scale: 1.04, opacity: 0.85 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.7 }}
                className="w-full h-full object-cover object-center md:object-top"
              />

              {/* Stone Ledge Bottom Lighting with Glowing Clay Diyas */}
              <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-black/50 via-black/20 to-transparent flex items-end justify-around px-6 pb-2 pointer-events-none">
                <DiyaDecoration size="md" />
                <DiyaDecoration size="md" />
                <DiyaDecoration size="md" />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Bottom Pagination Dots */}
        <div className="absolute bottom-4 left-1/2 md:left-28 -translate-x-1/2 md:translate-x-0 z-20 flex items-center gap-2.5">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`transition-all duration-300 rounded-full ${
                currentSlide === idx
                  ? 'w-7 h-2.5 bg-[#20392F] border border-[#C99A45]'
                  : 'w-2.5 h-2.5 bg-transparent border border-[#20392F]/60 hover:bg-[#20392F]/20'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
