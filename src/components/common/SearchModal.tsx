import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight, Star, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../../context/StoreContext';
import { Product } from '../../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onQuickView?: (product: Product) => void;
}

const POPULAR_SEARCHES = ['Hoodie', 'Linen Shirt', 'Cargo Pants', 'Sweater', 'Overcoat', 'Cap'];

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onQuickView }) => {
  const { products } = useStore();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  const categories = ['All', 'Hoodies', 'Shirts', 'T-Shirts', 'Pants', 'Jackets', 'Accessories'];

  const results = products.filter(product => {
    if (!product.isActive) return false;
    const matchesCategory = selectedCategory === 'All' || product.category.toLowerCase() === selectedCategory.toLowerCase();
    
    if (!query.trim()) return matchesCategory;

    const q = query.toLowerCase().trim();
    const matchesText =
      product.name.toLowerCase().includes(q) ||
      product.category.toLowerCase().includes(q) ||
      product.description.toLowerCase().includes(q) ||
      product.colors.some(c => c.name.toLowerCase().includes(q));

    return matchesCategory && matchesText;
  });

  const handleProductClick = (productId: string) => {
    onClose();
    navigate(`/product/${productId}`);
  };

  const handlePopularClick = (term: string) => {
    setQuery(term);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <div className="min-h-screen px-4 text-center flex items-start justify-center pt-16 sm:pt-24 pb-12">
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            className="w-full max-w-3xl bg-[#F8F5F0] rounded-3xl shadow-2xl border border-[#E8E2D8] overflow-hidden text-left relative z-10"
          >
            {/* Input Header */}
            <div className="p-4 sm:p-6 bg-white border-b border-[#E8E2D8] flex items-center gap-3">
              <Search className="w-6 h-6 text-[#20392F] shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search products, styles, collections..."
                className="w-full text-base sm:text-lg bg-transparent focus:outline-none text-[#1D1D1B] placeholder:text-[#89857E]"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="text-gray-400 hover:text-gray-600 p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
              <button
                onClick={onClose}
                className="p-2 -mr-2 text-gray-400 hover:text-[#1D1D1B] rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Close search"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Category Pills & Trending */}
            <div className="px-6 py-3.5 bg-[#EAE4D9]/40 border-b border-[#E8E2D8] flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-1.5">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-xs px-3 py-1 rounded-full font-medium transition-colors ${
                      selectedCategory === cat
                        ? 'bg-[#20392F] text-white'
                        : 'bg-white/80 text-[#1D1D1B]/80 hover:bg-white border border-[#E8E2D8]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Popular Searches */}
              <div className="flex items-center gap-2 text-xs text-[#89857E]">
                <TrendingUp className="w-3.5 h-3.5 text-[#20392F]" />
                <span className="font-semibold text-[#1D1D1B]">Trending:</span>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {POPULAR_SEARCHES.slice(0, 3).map(term => (
                    <button
                      key={term}
                      onClick={() => handlePopularClick(term)}
                      className="underline hover:text-[#20392F]"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Results Grid / List */}
            <div className="p-6 max-h-[60vh] overflow-y-auto space-y-4">
              {results.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-[#EAE4D9] flex items-center justify-center text-[#89857E] mx-auto mb-3">
                    <Search className="w-7 h-7 opacity-60" />
                  </div>
                  <h4 className="font-serif text-lg font-bold text-[#1D1D1B]">
                    No matches found
                  </h4>
                  <p className="text-xs text-[#89857E] mt-1 max-w-sm mx-auto">
                    We couldn't find any products matching "{query}". Try checking your spelling or search for popular terms like "Hoodie" or "Linen".
                  </p>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between mb-3 text-xs text-[#89857E]">
                    <span>Found <strong>{results.length}</strong> products</span>
                    <button
                      onClick={() => {
                        onClose();
                        navigate(`/shop?q=${encodeURIComponent(query)}`);
                      }}
                      className="text-[#20392F] font-semibold flex items-center gap-1 hover:underline"
                    >
                      <span>View in full catalog</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {results.map(prod => (
                      <div
                        key={prod.id}
                        onClick={() => handleProductClick(prod.id)}
                        className="flex gap-3.5 p-3 rounded-2xl bg-white border border-[#E8E2D8] hover:border-[#20392F]/40 shadow-sm hover:shadow-md cursor-pointer transition-all group"
                      >
                        <div className="w-16 h-20 rounded-xl overflow-hidden bg-[#ECE6DC] shrink-0">
                          <img
                            src={prod.images[0]}
                            alt={prod.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                        <div className="flex-1 flex flex-col justify-center">
                          <span className="text-[10px] uppercase font-bold tracking-wider text-[#20392F]">
                            {prod.category}
                          </span>
                          <h4 className="font-semibold text-sm text-[#1D1D1B] group-hover:text-[#20392F] transition-colors line-clamp-1">
                            {prod.name}
                          </h4>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="font-bold text-sm text-[#1D1D1B]">
                              ₹{prod.discountedPrice.toLocaleString()}
                            </span>
                            {prod.originalPrice > prod.discountedPrice && (
                              <span className="text-xs text-[#89857E] line-through">
                                ₹{prod.originalPrice.toLocaleString()}
                              </span>
                            )}
                            <span className="text-[10px] text-[#C95745] font-bold">
                              {prod.discountPercentage}% OFF
                            </span>
                          </div>
                          <div className="flex items-center gap-1 mt-1 text-[11px] text-[#89857E]">
                            <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                            <span>{prod.rating}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
