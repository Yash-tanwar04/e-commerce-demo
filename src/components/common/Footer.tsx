import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Mail, Check } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const Footer: React.FC = () => {
  const { settings } = useStore();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-[#152720] text-[#E9DFD3] pt-16 pb-12 border-t border-[#20392F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-[#E9DFD3] text-[#20392F] flex items-center justify-center font-serif text-lg font-bold">
                🧵
              </span>
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                {settings.storeName || 'VogueThread'}
              </span>
            </Link>

            <p className="text-xs sm:text-sm text-white/70 max-w-sm leading-relaxed">
              VogueThread is an editorial fashion house redefining contemporary essentials. We marry European sartorial precision with natural, tactile fibers designed to outlive trends.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a 
                href="#social" 
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a 
                href="#social" 
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a 
                href="#social" 
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.82 0-1.611.263-1.996.657-.386.395-.494 1.025-.494 2.115v1.213h4.482l-.652 3.667h-3.83v7.98H9.1z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 1: Collections */}
          <div className="space-y-3">
            <h4 className="font-serif text-base font-semibold text-white tracking-wider">
              Collections
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-white/70">
              <li>
                <Link to="/shop?category=Hoodies" className="hover:text-white transition-colors">
                  Hoodies & Knits
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Shirts" className="hover:text-white transition-colors">
                  Linen Shirts
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Jackets" className="hover:text-white transition-colors">
                  Winter Overcoats
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Pants" className="hover:text-white transition-colors">
                  Tailored Trousers
                </Link>
              </li>
              <li>
                <Link to="/shop?sale=true" className="hover:text-[#C95745] font-semibold transition-colors">
                  ⚡ Flash Sale (70% OFF)
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Assistance */}
          <div className="space-y-3">
            <h4 className="font-serif text-base font-semibold text-white tracking-wider">
              Concierge
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-white/70">
              <li>
                <Link to="/orders" className="hover:text-white transition-colors">
                  Track Demo Orders
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-white transition-colors">
                  My Shopping Bag
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="hover:text-white transition-colors">
                  Saved Wishlist
                </Link>
              </li>
              <li>
                <span className="text-white/50 block">Shipping: {settings.freeShippingThreshold ? `Free over ₹${settings.freeShippingThreshold}` : 'Standard'}</span>
              </li>
              <li>
                <span className="text-white/50 block">{settings.contactEmail}</span>
              </li>
            </ul>
          </div>

          {/* Column 3: Newsletter */}
          <div className="space-y-3">
            <h4 className="font-serif text-base font-semibold text-white tracking-wider">
              The Gazette
            </h4>
            <p className="text-xs text-white/70 leading-relaxed">
              Subscribe for private member previews, editorial journals, and private flash sales.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/40 text-xs px-3.5 py-2.5 rounded-full focus:outline-none focus:border-[#E9DFD3]"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#E9DFD3] text-[#20392F] flex items-center justify-center hover:bg-white transition-colors"
                  aria-label="Subscribe to newsletter"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {isSubscribed && (
                <p className="text-[11px] text-[#E9DFD3] flex items-center gap-1">
                  <Check className="w-3 h-3 text-[#E9DFD3]" />
                  <span>Welcome to the VogueThread private registry!</span>
                </p>
              )}
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>© {new Date().getFullYear()} VogueThread Apparel Ltd. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <Link to="/admin" className="text-white/80 hover:text-white flex items-center gap-1.5 font-medium transition-colors">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Dashboard (/admin)</span>
            </Link>
            <span className="text-white/30">•</span>
            <span>Made with precision for demo</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
