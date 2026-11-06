import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

export const WishlistPage: React.FC = () => {
  const { wishlistProducts, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleMoveToCart = (prod: any) => {
    const size = prod.sizes[0] || 'M';
    const color = prod.colors[0]?.name || 'Standard';
    addToCart(prod, size, color, 1);
    removeFromWishlist(prod.id);
  };

  if (wishlistProducts.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <div className="w-20 h-20 rounded-full bg-[#EAE4D9]/80 flex items-center justify-center text-[#20392F] mx-auto mb-5">
          <Heart className="w-8 h-8 opacity-60" />
        </div>
        <h1 className="font-serif text-3xl font-bold text-[#1D1D1B]">Your Wishlist is Empty</h1>
        <p className="text-sm text-[#89857E] mt-2 max-w-sm mx-auto">
          Save items that catch your eye while browsing to curate your ideal capsule wardrobe.
        </p>
        <Link
          to="/shop"
          className="mt-6 inline-flex items-center gap-2 bg-[#20392F] text-white px-8 py-3.5 rounded-full font-semibold text-sm hover:bg-[#152720] transition-colors"
        >
          <span>Discover Products</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="flex items-baseline justify-between pb-6 border-b border-[#E8E2D8] mb-8">
        <div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#1D1D1B]">
            My Wishlist
          </h1>
          <p className="text-xs sm:text-sm text-[#89857E] mt-1">
            {wishlistProducts.length} {wishlistProducts.length === 1 ? 'item' : 'items'} saved for later
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlistProducts.map(product => (
          <div
            key={product.id}
            className="group relative flex flex-col bg-white rounded-3xl p-3.5 border border-[#E8E2D8] shadow-sm hover:shadow-md transition-all"
          >
            {/* Image Container */}
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-[#ECE6DC] mb-3">
              <Link to={`/product/${product.id}`}>
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </Link>

              <button
                onClick={() => removeFromWishlist(product.id)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-gray-500 hover:text-[#C95745] flex items-center justify-center shadow transition-colors"
                title="Remove from wishlist"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Info */}
            <div className="flex flex-col flex-1 justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#20392F]">
                  {product.category}
                </span>
                <h3 className="font-semibold text-sm text-[#1D1D1B] line-clamp-1 mt-0.5">
                  <Link to={`/product/${product.id}`} className="hover:text-[#20392F]">
                    {product.name}
                  </Link>
                </h3>

                <div className="flex items-baseline gap-2 mt-1">
                  <span className="font-bold text-base text-[#1D1D1B]">
                    ₹{product.discountedPrice.toLocaleString()}
                  </span>
                  {product.originalPrice > product.discountedPrice && (
                    <span className="text-xs text-[#89857E] line-through">
                      ₹{product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>

              {/* Move to Cart Button */}
              <button
                onClick={() => handleMoveToCart(product)}
                className="mt-4 w-full py-2.5 px-4 rounded-full bg-[#20392F] hover:bg-[#152720] text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Move to Bag</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
