import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal, ArrowUpDown, X, RotateCcw } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/product/ProductCard';
import { QuickViewModal } from '../components/common/QuickViewModal';
import { Product } from '../types';

export const ShopPage: React.FC = () => {
  const { products, categories } = useStore();
  const [searchParams, setSearchParams] = useSearchParams();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedGender, setSelectedGender] = useState<string>('All');
  const [maxPrice, setMaxPrice] = useState<number>(7000);
  const [minDiscount, setMinDiscount] = useState<number>(0);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Read URL query params
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setSelectedCategory(cat);

    const gen = searchParams.get('gender');
    if (gen) setSelectedGender(gen);

    const sale = searchParams.get('sale');
    if (sale === 'true') setMinDiscount(50);

    const filter = searchParams.get('filter');
    if (filter === 'bestsellers') setSortBy('popularity');
    if (filter === 'new') setSortBy('newest');

    const q = searchParams.get('q');
    // search text handled via URL query if present
  }, [searchParams]);

  const searchQuery = searchParams.get('q') || '';

  // All available sizes
  const allSizes = ['S', 'M', 'L', 'XL', 'XXL', '30', '32', '34', '36', 'One Size'];

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      if (!product.isActive) return false;

      // Search Query
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchesQuery =
          product.name.toLowerCase().includes(q) ||
          product.category.toLowerCase().includes(q) ||
          product.description.toLowerCase().includes(q);
        if (!matchesQuery) return false;
      }

      // Category
      if (selectedCategory !== 'All' && product.category.toLowerCase() !== selectedCategory.toLowerCase()) {
        return false;
      }

      // Gender
      if (selectedGender !== 'All' && product.gender !== 'Unisex' && product.gender !== selectedGender) {
        return false;
      }

      // Price
      if (product.discountedPrice > maxPrice) {
        return false;
      }

      // Discount
      if (product.discountPercentage < minDiscount) {
        return false;
      }

      // Sizes
      if (selectedSizes.length > 0) {
        const hasSize = product.sizes.some(s => selectedSizes.includes(s));
        if (!hasSize) return false;
      }

      // In Stock Only
      if (inStockOnly && product.stock <= 0) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.discountedPrice - b.discountedPrice;
        case 'price-high':
          return b.discountedPrice - a.discountedPrice;
        case 'discount':
          return b.discountPercentage - a.discountPercentage;
        case 'popularity':
          return b.reviewsCount - a.reviewsCount;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        default:
          return (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0);
      }
    });
  }, [products, searchQuery, selectedCategory, selectedGender, maxPrice, minDiscount, selectedSizes, inStockOnly, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('All');
    setSelectedGender('All');
    setMaxPrice(7000);
    setMinDiscount(0);
    setSelectedSizes([]);
    setSortBy('featured');
    setInStockOnly(false);
    setSearchParams({});
  };

  const toggleSize = (size: string) => {
    setSelectedSizes(prev =>
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Title & Top Breadcrumb Banner */}
      <div className="mb-8">
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1D1D1B]">
          {searchQuery
            ? `Search Results for "${searchQuery}"`
            : selectedCategory !== 'All'
            ? selectedCategory
            : selectedGender !== 'All'
            ? `${selectedGender}'s Festive Collection`
            : 'Diwali Festive & Winter Collection'}
        </h1>
        <p className="text-sm text-[#89857E] mt-2">
          Curated celebratory garments woven from organic cottons, European flax linens, and warm lambswool.
        </p>
      </div>

      {/* Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#E8E2D8]">
        {/* Mobile Filter Toggle */}
        <button
          onClick={() => setIsMobileFilterOpen(true)}
          className="lg:hidden flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-[#E8E2D8] text-xs font-semibold text-[#1D1D1B] shadow-sm"
        >
          <SlidersHorizontal className="w-4 h-4 text-[#20392F]" />
          <span>Filters</span>
          {(selectedCategory !== 'All' || minDiscount > 0 || selectedSizes.length > 0 || maxPrice < 7000) && (
            <span className="w-2 h-2 rounded-full bg-[#C95745]" />
          )}
        </button>

        {/* Item Count */}
        <p className="text-xs sm:text-sm text-[#89857E]">
          Showing <strong className="text-[#1D1D1B] font-semibold">{filteredProducts.length}</strong> styles
        </p>

        {/* Sorting Dropdown */}
        <div className="flex items-center gap-2.5">
          <label htmlFor="sort-select" className="text-xs font-medium text-[#89857E] hidden sm:inline">
            Sort by:
          </label>
          <div className="relative">
            <select
              id="sort-select"
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="appearance-none bg-white border border-[#E8E2D8] text-xs font-semibold text-[#1D1D1B] pl-4 pr-9 py-2.5 rounded-full focus:outline-none focus:border-[#20392F] shadow-sm cursor-pointer"
            >
              <option value="featured">Featured & Bestsellers</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="discount">Highest Discount</option>
              <option value="rating">Customer Rating</option>
              <option value="newest">Newest Drops</option>
            </select>
            <ArrowUpDown className="w-3.5 h-3.5 text-[#89857E] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Main Grid Content with Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pt-8">
        
        {/* Desktop Filter Sidebar */}
        <aside className="hidden lg:block space-y-6 pr-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-lg font-bold text-[#1D1D1B] flex items-center gap-2">
              <Filter className="w-4 h-4 text-[#20392F]" />
              <span>Filters</span>
            </h3>
            <button
              onClick={resetFilters}
              className="text-xs text-[#89857E] hover:text-[#C95745] font-medium flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>

          {/* Category Filter */}
          <div className="space-y-3 pt-4 border-t border-[#E8E2D8]">
            <h4 className="text-xs uppercase tracking-wider font-bold text-[#1D1D1B]">
              Category
            </h4>
            <div className="space-y-1.5 text-xs">
              <button
                onClick={() => setSelectedCategory('All')}
                className={`w-full text-left py-1 px-2 rounded-lg transition-colors flex items-center justify-between ${
                  selectedCategory === 'All' ? 'bg-[#20392F] text-white font-semibold' : 'text-[#1D1D1B] hover:bg-[#EAE4D9]/50'
                }`}
              >
                <span>All Categories</span>
                <span>{products.length}</span>
              </button>
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`w-full text-left py-1 px-2 rounded-lg transition-colors flex items-center justify-between ${
                    selectedCategory.toLowerCase() === cat.name.toLowerCase()
                      ? 'bg-[#20392F] text-white font-semibold'
                      : 'text-[#1D1D1B] hover:bg-[#EAE4D9]/50'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className="opacity-70">
                    {products.filter(p => p.category.toLowerCase() === cat.name.toLowerCase()).length}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Gender Filter */}
          <div className="space-y-3 pt-4 border-t border-[#E8E2D8]">
            <h4 className="text-xs uppercase tracking-wider font-bold text-[#1D1D1B]">
              Gender
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {['All', 'Men', 'Women'].map(gen => (
                <button
                  key={gen}
                  onClick={() => setSelectedGender(gen)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    selectedGender === gen
                      ? 'bg-[#20392F] text-white'
                      : 'bg-white text-[#1D1D1B] border border-[#E8E2D8] hover:bg-[#EAE4D9]'
                  }`}
                >
                  {gen}
                </button>
              ))}
            </div>
          </div>

          {/* Max Price Slider */}
          <div className="space-y-3 pt-4 border-t border-[#E8E2D8]">
            <div className="flex justify-between items-center text-xs">
              <span className="uppercase tracking-wider font-bold text-[#1D1D1B]">Max Price</span>
              <span className="font-bold text-[#20392F]">₹{maxPrice.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="500"
              max="7000"
              step="200"
              value={maxPrice}
              onChange={e => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#20392F] cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-[#89857E]">
              <span>₹500</span>
              <span>₹7,000</span>
            </div>
          </div>

          {/* Discount Filter */}
          <div className="space-y-3 pt-4 border-t border-[#E8E2D8]">
            <h4 className="text-xs uppercase tracking-wider font-bold text-[#1D1D1B]">
              Discount
            </h4>
            <div className="space-y-2 text-xs">
              {[
                { label: 'All Discounts', val: 0 },
                { label: '50% or more', val: 50 },
                { label: '60% or more', val: 60 },
                { label: '70% Flash Offers', val: 70 }
              ].map(d => (
                <label key={d.val} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="discountFilter"
                    checked={minDiscount === d.val}
                    onChange={() => setMinDiscount(d.val)}
                    className="accent-[#20392F]"
                  />
                  <span className={minDiscount === d.val ? 'font-bold text-[#20392F]' : 'text-[#1D1D1B]'}>
                    {d.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Size Filter */}
          <div className="space-y-3 pt-4 border-t border-[#E8E2D8]">
            <h4 className="text-xs uppercase tracking-wider font-bold text-[#1D1D1B]">
              Sizes
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {allSizes.map(size => (
                <button
                  key={size}
                  onClick={() => toggleSize(size)}
                  className={`min-w-[38px] px-2.5 py-1 text-xs rounded-xl border font-semibold transition-all ${
                    selectedSizes.includes(size)
                      ? 'bg-[#20392F] text-white border-[#20392F]'
                      : 'bg-white text-[#1D1D1B] border-[#E8E2D8] hover:border-[#20392F]'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* In Stock Toggle */}
          <div className="pt-4 border-t border-[#E8E2D8]">
            <label className="flex items-center gap-2 text-xs font-semibold text-[#1D1D1B] cursor-pointer">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={e => setInStockOnly(e.target.checked)}
                className="w-4 h-4 rounded text-[#20392F] accent-[#20392F]"
              />
              <span>In-stock items only</span>
            </label>
          </div>
        </aside>

        {/* Product Grid Area (3 cols desktop) */}
        <div className="lg:col-span-3">
          {/* Active Filter Chips */}
          {(selectedCategory !== 'All' || selectedGender !== 'All' || minDiscount > 0 || selectedSizes.length > 0 || searchQuery) && (
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className="text-xs font-medium text-[#89857E]">Active:</span>
              
              {searchQuery && (
                <span className="inline-flex items-center gap-1 bg-white border border-[#E8E2D8] px-2.5 py-1 rounded-full text-xs font-medium">
                  "{searchQuery}"
                  <button onClick={() => setSearchParams({})} className="hover:text-red-500">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {selectedCategory !== 'All' && (
                <span className="inline-flex items-center gap-1 bg-[#20392F] text-white px-2.5 py-1 rounded-full text-xs font-medium">
                  {selectedCategory}
                  <button onClick={() => setSelectedCategory('All')} className="hover:text-red-300">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {minDiscount > 0 && (
                <span className="inline-flex items-center gap-1 bg-[#C95745] text-white px-2.5 py-1 rounded-full text-xs font-medium">
                  {minDiscount}%+ OFF
                  <button onClick={() => setMinDiscount(0)}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {selectedSizes.map(sz => (
                <span key={sz} className="inline-flex items-center gap-1 bg-white border border-[#E8E2D8] px-2.5 py-1 rounded-full text-xs font-medium">
                  Size: {sz}
                  <button onClick={() => toggleSize(sz)}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}

              <button
                onClick={resetFilters}
                className="text-xs text-[#89857E] hover:text-[#C95745] underline ml-2"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-white/60 rounded-3xl border border-[#E8E2D8]">
              <div className="w-16 h-16 rounded-full bg-[#EAE4D9] flex items-center justify-center text-[#89857E] mx-auto mb-4">
                <Filter className="w-7 h-7 opacity-60" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#1D1D1B]">
                No items match your criteria
              </h3>
              <p className="text-xs text-[#89857E] mt-1 max-w-sm mx-auto">
                Try widening your price range, choosing another category, or clearing active filters.
              </p>
              <button
                onClick={resetFilters}
                className="mt-5 bg-[#20392F] text-white px-6 py-2.5 rounded-full text-xs font-semibold hover:bg-[#152720] transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={prod => setQuickViewProduct(prod)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
          <div
            onClick={() => setIsMobileFilterOpen(false)}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-xs bg-[#F8F5F0] p-6 shadow-2xl flex flex-col justify-between overflow-y-auto">
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-[#E8E2D8]">
                  <h3 className="font-serif text-lg font-bold">Filters</h3>
                  <button onClick={() => setIsMobileFilterOpen(false)}>
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                {/* Categories */}
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-bold mb-2">Category</h4>
                  <div className="flex flex-wrap gap-1.5">
                    <button
                      onClick={() => setSelectedCategory('All')}
                      className={`text-xs px-3 py-1 rounded-full border ${selectedCategory === 'All' ? 'bg-[#20392F] text-white' : 'bg-white'}`}
                    >
                      All
                    </button>
                    {categories.map(c => (
                      <button
                        key={c.id}
                        onClick={() => setSelectedCategory(c.name)}
                        className={`text-xs px-3 py-1 rounded-full border ${selectedCategory.toLowerCase() === c.name.toLowerCase() ? 'bg-[#20392F] text-white' : 'bg-white'}`}
                      >
                        {c.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span>Max Price</span>
                    <span>₹{maxPrice}</span>
                  </div>
                  <input
                    type="range"
                    min="500"
                    max="7000"
                    step="200"
                    value={maxPrice}
                    onChange={e => setMaxPrice(Number(e.target.value))}
                    className="w-full accent-[#20392F]"
                  />
                </div>
              </div>

              <div className="pt-6 border-t border-[#E8E2D8] flex gap-2">
                <button
                  onClick={resetFilters}
                  className="flex-1 py-2.5 rounded-full border text-xs font-semibold bg-white"
                >
                  Reset
                </button>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="flex-1 py-2.5 rounded-full bg-[#20392F] text-white text-xs font-semibold"
                >
                  Show Results
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
};
