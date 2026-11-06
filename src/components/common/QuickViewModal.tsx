import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, Star, ShoppingBag, Heart, Check, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, onClose }) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [addedSuccess, setAddedSuccess] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedImage(0);
      setSelectedSize(product.sizes[0] || 'M');
      setSelectedColor(product.colors[0]?.name || 'Standard');
      setQuantity(1);
      setAddedSuccess(false);
    }
  }, [product]);

  if (!product) return null;

  const isFavorited = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      onClose();
    }, 1200);
  };

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

        <div className="min-h-screen px-4 text-center flex items-center justify-center py-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="w-full max-w-4xl bg-[#F8F5F0] rounded-3xl shadow-2xl border border-[#E8E2D8] overflow-hidden text-left relative z-10"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-[#1D1D1B] flex items-center justify-center shadow-sm transition-all"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Product Gallery Left */}
              <div className="p-6 sm:p-8 bg-[#ECE6DC] flex flex-col justify-between">
                {/* Main image */}
                <div className="aspect-[4/5] w-full rounded-2xl overflow-hidden bg-white shadow-sm flex items-center justify-center">
                  <img
                    src={product.images[selectedImage] || product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Thumbnails */}
                {product.images.length > 1 && (
                  <div className="flex items-center gap-3 mt-4 overflow-x-auto pb-1">
                    {product.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImage(idx)}
                        className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                          selectedImage === idx ? 'border-[#20392F] shadow-sm scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Information Right */}
              <div className="p-6 sm:p-8 flex flex-col justify-between bg-white">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs uppercase tracking-wider font-bold text-[#20392F] bg-[#20392F]/10 px-2.5 py-0.5 rounded-full">
                      {product.category}
                    </span>
                    {product.isBestseller && (
                      <span className="text-xs uppercase tracking-wider font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full">
                        Bestseller
                      </span>
                    )}
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-[#1D1D1B]">
                    {product.name}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mt-2 text-xs text-[#89857E]">
                    <div className="flex items-center text-amber-500">
                      <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                    </div>
                    <span className="font-bold text-[#1D1D1B]">{product.rating}</span>
                    <span>({product.reviewsCount} customer reviews)</span>
                  </div>

                  {/* Pricing */}
                  <div className="flex items-baseline gap-3 mt-3">
                    <span className="font-bold text-2xl text-[#1D1D1B]">
                      ₹{product.discountedPrice.toLocaleString()}
                    </span>
                    {product.originalPrice > product.discountedPrice && (
                      <span className="text-sm text-[#89857E] line-through">
                        ₹{product.originalPrice.toLocaleString()}
                      </span>
                    )}
                    {product.discountPercentage > 0 && (
                      <span className="text-xs font-bold text-[#C95745] bg-[#C95745]/10 px-2 py-0.5 rounded-md">
                        {product.discountPercentage}% OFF
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-[#89857E] mt-3 line-clamp-3 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Color Selector */}
                  <div className="mt-5">
                    <label className="block text-xs font-semibold text-[#1D1D1B] mb-2">
                      Color: <span className="font-normal text-[#89857E]">{selectedColor}</span>
                    </label>
                    <div className="flex items-center gap-2.5">
                      {product.colors.map(col => (
                        <button
                          key={col.name}
                          onClick={() => setSelectedColor(col.name)}
                          className={`w-7 h-7 rounded-full border-2 transition-all relative flex items-center justify-center ${
                            selectedColor === col.name ? 'border-[#20392F] scale-110 shadow-sm' : 'border-transparent'
                          }`}
                          style={{ backgroundColor: col.hex }}
                          title={col.name}
                        >
                          {selectedColor === col.name && (
                            <Check className="w-3.5 h-3.5 text-white drop-shadow" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Size Selector */}
                  <div className="mt-4">
                    <label className="block text-xs font-semibold text-[#1D1D1B] mb-2">
                      Select Size
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map(size => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`min-w-[42px] py-1.5 px-3 rounded-xl text-xs font-semibold border transition-all ${
                            selectedSize === size
                              ? 'bg-[#20392F] text-white border-[#20392F]'
                              : 'bg-white text-[#1D1D1B] border-[#E8E2D8] hover:border-[#20392F]'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Quantity */}
                  <div className="mt-4 flex items-center gap-3">
                    <label className="text-xs font-semibold text-[#1D1D1B]">Quantity:</label>
                    <div className="flex items-center border border-[#E8E2D8] rounded-xl bg-[#F8F5F0]">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-3 py-1 text-sm font-bold text-[#1D1D1B]"
                      >
                        -
                      </button>
                      <span className="px-2 text-xs font-bold text-[#1D1D1B]">{quantity}</span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-3 py-1 text-sm font-bold text-[#1D1D1B]"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Actions Bottom */}
                <div className="pt-6 border-t border-[#E8E2D8] mt-6 space-y-3">
                  <div className="flex gap-3">
                    <button
                      onClick={handleAddToCart}
                      className={`flex-1 py-3 px-6 rounded-full font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
                        addedSuccess
                          ? 'bg-green-700 text-white'
                          : 'bg-[#20392F] hover:bg-[#152720] text-white shadow-md hover:shadow-lg'
                      }`}
                    >
                      {addedSuccess ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Added to Cart!</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-4 h-4" />
                          <span>Add to Cart • ₹{(product.discountedPrice * quantity).toLocaleString()}</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => toggleWishlist(product)}
                      className={`w-12 h-12 rounded-full border border-[#E8E2D8] flex items-center justify-center transition-colors ${
                        isFavorited ? 'bg-red-50 text-[#C95745] border-red-200' : 'bg-white text-[#1D1D1B] hover:bg-gray-50'
                      }`}
                      title={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
                    >
                      <Heart className={`w-5 h-5 ${isFavorited ? 'fill-[#C95745]' : ''}`} />
                    </button>
                  </div>

                  <div className="text-center">
                    <Link
                      to={`/product/${product.id}`}
                      onClick={onClose}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#20392F] hover:underline"
                    >
                      <span>View Full Product Page & Reviews</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
