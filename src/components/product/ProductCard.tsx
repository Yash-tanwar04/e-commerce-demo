import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Star, Eye, Check, Sparkles } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [isHovered, setIsHovered] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const isFavorited = isInWishlist(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Default to first size and first color
    const defaultSize = product.sizes[0] || 'M';
    const defaultColor = product.colors[0]?.name || 'Standard';

    addToCart(product, defaultSize, defaultColor, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleQuickViewClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onQuickView) {
      onQuickView(product);
    }
  };

  return (
    <div 
      className="group relative flex flex-col h-full bg-transparent transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Container */}
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-[#EFE8DC] border border-[#C99A45]/15 flex items-center justify-center p-4 transition-all duration-300 group-hover:border-[#C99A45]/40 group-hover:shadow-md">
        
        {/* Festive Gold-accented Discount Badge */}
        {product.discountPercentage > 0 && (
          <div className="absolute top-3 left-3 z-10">
            <span className="bg-gradient-to-r from-[#671F27] to-[#8C2B36] border border-[#C99A45]/70 text-[#FFF2CC] text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1">
              <span>{product.discountPercentage}% OFF</span>
            </span>
          </div>
        )}

        {/* Wishlist Button with Heart Animation */}
        <button
          onClick={handleWishlistToggle}
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/95 hover:bg-white text-[#1D1D1B] flex items-center justify-center shadow-md transition-all duration-200 hover:scale-110 active:scale-90 border border-[#C99A45]/25"
          title={isFavorited ? "Remove from wishlist" : "Add to wishlist"}
          aria-label={isFavorited ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart 
            className={`w-4 h-4 transition-colors ${
              isFavorited ? 'fill-[#C95745] text-[#C95745] scale-110' : 'stroke-[#1D1D1B]'
            }`} 
          />
        </button>

        {/* Main Clean Product Image */}
        <Link to={`/product/${product.id}`} className="w-full h-full flex items-center justify-center">
          <img
            src={isHovered && product.images[1] ? product.images[1] : product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover object-center rounded-xl transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />
        </Link>

        {/* Quick View Button on Hover */}
        {onQuickView && (
          <button
            onClick={handleQuickViewClick}
            className="absolute bottom-3 inset-x-4 bg-white/95 backdrop-blur-md text-[#1D1D1B] text-xs font-semibold py-2.5 rounded-xl shadow-lg opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 flex items-center justify-center gap-1.5 hover:bg-[#20392F] hover:text-[#FFECC0] border border-[#C99A45]/30"
          >
            <Eye className="w-4 h-4" />
            <span>Quick View</span>
          </button>
        )}
      </div>

      {/* Product Details */}
      <div className="flex flex-col flex-1 pt-3 pb-1">
        <Link 
          to={`/product/${product.id}`}
          className="font-medium text-[#1D1D1B] hover:text-[#671F27] transition-colors line-clamp-1 text-base tracking-tight"
        >
          {product.name}
        </Link>

        {/* Price Row */}
        <div className="flex items-baseline gap-2 mt-1">
          <span className="font-bold text-[#1D1D1B] text-base">
            ₹{product.discountedPrice.toLocaleString()}
          </span>
          {product.originalPrice > product.discountedPrice && (
            <span className="text-xs text-[#89857E] line-through">
              ₹{product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* Rating Row */}
        <div className="flex items-center gap-1 mt-1.5 text-xs text-[#89857E]">
          <div className="flex items-center text-[#C99A45]">
            <Star className="w-3.5 h-3.5 fill-[#C99A45] text-[#C99A45]" />
          </div>
          <span className="font-bold text-[#1D1D1B]">{product.rating}</span>
          <span>({product.reviewsCount > 999 ? `${(product.reviewsCount / 1000).toFixed(1)}k` : product.reviewsCount})</span>
        </div>

        {/* Add to Cart Button */}
        <div className="mt-3 pt-1">
          <button
            onClick={handleQuickAdd}
            disabled={product.stock <= 0}
            className={`w-full py-2.5 px-4 rounded-full border text-xs font-semibold flex items-center justify-center gap-2 transition-all duration-200 shadow-xs ${
              product.stock <= 0
                ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                : justAdded
                ? 'bg-[#20392F] text-[#FFECC0] border-[#C99A45]'
                : 'bg-white text-[#1D1D1B] border-[#C99A45]/30 hover:border-[#20392F] hover:bg-[#20392F] hover:text-[#FFECC0]'
            }`}
          >
            {product.stock <= 0 ? (
              <span>Out of Stock</span>
            ) : justAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added to Bag</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
