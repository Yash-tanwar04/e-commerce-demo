import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Star, 
  ShoppingBag, 
  Heart, 
  Share2, 
  Check, 
  Truck, 
  RotateCcw, 
  ShieldCheck, 
  ChevronRight, 
  Ruler, 
  Sparkles,
  MessageCircle,
  ThumbsUp,
  AlertCircle
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { ProductCard } from '../components/product/ProductCard';

export const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { products, reviews, addReview, settings } = useStore();
  const { addToCart, openCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const product = products.find(p => p.id === productId);

  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'fabric' | 'shipping' | 'reviews'>('details');
  const [validationError, setValidationError] = useState<string | null>(null);
  const [addedNotice, setAddedNotice] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // Review Form state
  const [reviewerName, setReviewerName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (product) {
      setActiveImage(0);
      setSelectedSize(product.sizes[0] || '');
      setSelectedColor(product.colors[0]?.name || '');
      setQuantity(1);
      setValidationError(null);
    }
  }, [productId, product]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <h2 className="font-serif text-3xl font-bold text-[#1D1D1B]">Product Not Found</h2>
        <p className="text-[#89857E] mt-2">The requested garment could not be found or has been archived.</p>
        <Link
          to="/shop"
          className="mt-6 inline-flex items-center gap-2 bg-[#20392F] text-white px-6 py-3 rounded-full text-sm font-semibold"
        >
          Return to Shop
        </Link>
      </div>
    );
  }

  const isFavorited = isInWishlist(product.id);
  const productReviews = reviews[product.id] || [];

  const handleAddToCart = () => {
    if (!selectedSize) {
      setValidationError('Please select a size to continue.');
      return;
    }
    if (!selectedColor) {
      setValidationError('Please select a color to continue.');
      return;
    }

    setValidationError(null);
    addToCart(product, selectedSize, selectedColor, quantity);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2000);
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      setValidationError('Please select a size to continue.');
      return;
    }
    if (!selectedColor) {
      setValidationError('Please select a color to continue.');
      return;
    }

    addToCart(product, selectedSize, selectedColor, quantity);
    navigate('/checkout');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName.trim() || !reviewComment.trim()) return;

    addReview(product.id, {
      userName: reviewerName.trim(),
      rating: reviewRating,
      comment: reviewComment.trim(),
      verified: true
    });

    setReviewerName('');
    setReviewComment('');
    setReviewSubmitted(true);
    setTimeout(() => setReviewSubmitted(false), 4000);
  };

  // Related products from same category or gender
  const relatedProducts = products
    .filter(p => p.id !== product.id && (p.category === product.category || p.isBestseller))
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-[#89857E] mb-6">
        <Link to="/" className="hover:text-[#20392F]">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link to="/shop" className="hover:text-[#20392F]">Catalog</Link>
        <ChevronRight className="w-3 h-3" />
        <Link to={`/shop?category=${product.category}`} className="hover:text-[#20392F]">
          {product.category}
        </Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-[#1D1D1B] font-medium truncate max-w-[200px]">
          {product.name}
        </span>
      </nav>

      {/* Main Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        
        {/* Left Column: Image Gallery (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Large Image */}
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-[#ECE6DC] flex items-center justify-center p-4 shadow-sm">
            {product.discountPercentage > 0 && (
              <span className="absolute top-4 left-4 z-10 bg-[#C95745] text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow">
                {product.discountPercentage}% OFF
              </span>
            )}

            <img
              src={product.images[activeImage] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover object-center rounded-2xl transition-all duration-300 hover:scale-105"
            />
          </div>

          {/* Gallery Thumbnails */}
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`aspect-[4/5] rounded-2xl overflow-hidden bg-[#ECE6DC] border-2 transition-all ${
                    activeImage === idx
                      ? 'border-[#20392F] shadow-md scale-102'
                      : 'border-transparent opacity-75 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Buying Controls & Info (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div className="space-y-5">
            
            {/* Category & SKU */}
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest font-bold text-[#20392F] bg-[#20392F]/10 px-3 py-1 rounded-full">
                {product.category} • {product.gender}
              </span>
              <span className="text-xs text-[#89857E]">
                SKU: <strong className="text-[#1D1D1B]">{product.sku}</strong>
              </span>
            </div>

            {/* Product Title */}
            <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#1D1D1B] leading-tight">
              {product.name}
            </h1>

            {/* Rating & Reviews Bar */}
            <div className="flex items-center gap-3 text-xs text-[#89857E] pb-2 border-b border-[#E8E2D8]">
              <div className="flex items-center text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating) ? 'fill-amber-500 text-amber-500' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="font-bold text-[#1D1D1B]">{product.rating}</span>
              <span>•</span>
              <button
                onClick={() => setActiveTab('reviews')}
                className="underline hover:text-[#20392F] transition-colors"
              >
                {product.reviewsCount} verified reviews
              </button>
            </div>

            {/* Price Box */}
            <div className="flex items-baseline gap-3">
              <span className="font-serif text-3xl font-bold text-[#1D1D1B]">
                ₹{product.discountedPrice.toLocaleString()}
              </span>
              {product.originalPrice > product.discountedPrice && (
                <span className="text-base text-[#89857E] line-through">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
              )}
              {product.discountPercentage > 0 && (
                <span className="text-xs font-bold text-[#C95745] bg-[#C95745]/10 px-2.5 py-1 rounded-md">
                  Save {product.discountPercentage}%
                </span>
              )}
            </div>

            {/* Stock indicator */}
            <div className="text-xs">
              {product.stock > 10 ? (
                <span className="text-green-700 font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse" />
                  In Stock ({product.stock} items ready to dispatch)
                </span>
              ) : product.stock > 0 ? (
                <span className="text-amber-700 font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-600" />
                  Only {product.stock} left in stock - order soon!
                </span>
              ) : (
                <span className="text-red-600 font-semibold">Out of Stock</span>
              )}
            </div>

            {/* Short Description */}
            <p className="text-sm text-[#1D1D1B]/80 leading-relaxed">
              {product.shortDescription || product.description}
            </p>

            {/* Color Swatches */}
            <div className="space-y-2 pt-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-[#1D1D1B]">Color:</span>
                <span className="font-semibold text-[#20392F]">{selectedColor}</span>
              </div>
              <div className="flex items-center gap-3">
                {product.colors.map(col => (
                  <button
                    key={col.name}
                    onClick={() => {
                      setSelectedColor(col.name);
                      setValidationError(null);
                    }}
                    className={`w-9 h-9 rounded-full border-2 transition-all flex items-center justify-center ${
                      selectedColor === col.name
                        ? 'border-[#20392F] scale-110 shadow-md ring-2 ring-[#20392F]/20'
                        : 'border-transparent hover:scale-105'
                    }`}
                    style={{ backgroundColor: col.hex }}
                    title={col.name}
                  >
                    {selectedColor === col.name && (
                      <Check className="w-4 h-4 text-white drop-shadow" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className="space-y-2 pt-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-[#1D1D1B]">Select Size:</span>
                <span className="text-[#89857E] flex items-center gap-1">
                  <Ruler className="w-3.5 h-3.5" />
                  <span>Size Guide (True to fit)</span>
                </span>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => {
                      setSelectedSize(size);
                      setValidationError(null);
                    }}
                    className={`min-w-[48px] py-2 px-3.5 rounded-xl text-xs font-bold border transition-all ${
                      selectedSize === size
                        ? 'bg-[#20392F] text-white border-[#20392F] shadow-sm'
                        : 'bg-white text-[#1D1D1B] border-[#E8E2D8] hover:border-[#20392F]'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 pt-2">
              <span className="text-xs font-bold text-[#1D1D1B]">Quantity:</span>
              <div className="flex items-center border border-[#E8E2D8] rounded-xl bg-white shadow-sm overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3.5 py-1.5 text-sm font-bold text-[#1D1D1B] hover:bg-[#F8F5F0]"
                >
                  -
                </button>
                <span className="px-3 text-xs font-bold text-[#1D1D1B]">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="px-3.5 py-1.5 text-sm font-bold text-[#1D1D1B] hover:bg-[#F8F5F0]"
                >
                  +
                </button>
              </div>
            </div>

            {/* Validation Error Message */}
            {validationError && (
              <p className="text-xs text-[#C95745] font-semibold flex items-center gap-1.5 bg-red-50 p-2.5 rounded-xl">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{validationError}</span>
              </p>
            )}

            {/* Action Buttons: Add to Cart & Buy Now */}
            <div className="space-y-3 pt-4">
              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock <= 0}
                  className={`flex-1 py-4 px-6 rounded-full font-semibold text-sm flex items-center justify-center gap-2.5 shadow-md transition-all ${
                    product.stock <= 0
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : addedNotice
                      ? 'bg-green-700 text-white'
                      : 'bg-[#20392F] hover:bg-[#152720] text-white hover:shadow-xl active:scale-98'
                  }`}
                >
                  {addedNotice ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Bag!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Bag • ₹{(product.discountedPrice * quantity).toLocaleString()}</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => toggleWishlist(product)}
                  className={`w-14 h-14 rounded-full border border-[#E8E2D8] flex items-center justify-center transition-all ${
                    isFavorited
                      ? 'bg-red-50 text-[#C95745] border-red-200'
                      : 'bg-white text-[#1D1D1B] hover:bg-gray-50'
                  }`}
                  title={isFavorited ? 'Remove from Wishlist' : 'Add to Wishlist'}
                >
                  <Heart className={`w-5 h-5 ${isFavorited ? 'fill-[#C95745]' : ''}`} />
                </button>
              </div>

              {/* Buy Now Button */}
              <button
                onClick={handleBuyNow}
                disabled={product.stock <= 0}
                className="w-full py-3.5 px-6 rounded-full font-semibold text-sm bg-[#E9DFD3] hover:bg-[#ded1c2] text-[#1D1D1B] border border-[#d9ccbd] transition-all shadow-sm"
              >
                Instant Buy Now
              </button>
            </div>

            {/* Service badges mini */}
            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-[#E8E2D8] text-[11px] text-[#89857E]">
              <div className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-[#20392F] shrink-0" />
                <span>Free dispatch over ₹999</span>
              </div>
              <div className="flex items-center gap-1.5">
                <RotateCcw className="w-4 h-4 text-[#20392F] shrink-0" />
                <span>7-day returns</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#20392F] shrink-0" />
                <span>Verified authentic</span>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Product Information Tabs */}
      <div className="mt-16 pt-8 border-t border-[#E8E2D8]">
        {/* Tab Headers */}
        <div className="flex items-center gap-6 border-b border-[#E8E2D8] pb-3 overflow-x-auto text-sm font-semibold">
          {[
            { id: 'details', label: 'Product Details' },
            { id: 'fabric', label: 'Fabric & Care' },
            { id: 'shipping', label: 'Shipping & Returns' },
            { id: 'reviews', label: `Reviews (${productReviews.length})` }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-3 transition-colors relative whitespace-nowrap ${
                activeTab === tab.id
                  ? 'text-[#20392F] font-bold border-b-2 border-[#20392F]'
                  : 'text-[#89857E] hover:text-[#1D1D1B]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="py-8">
          {activeTab === 'details' && (
            <div className="space-y-4 max-w-3xl text-sm text-[#1D1D1B]/80 leading-relaxed">
              <p>{product.description}</p>
              {product.details && product.details.length > 0 && (
                <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm pt-2">
                  {product.details.map((detail, idx) => (
                    <li key={idx}>{detail}</li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {activeTab === 'fabric' && (
            <div className="space-y-4 max-w-3xl text-sm text-[#1D1D1B]/80 leading-relaxed">
              <p>
                <strong>Material Composition:</strong> {product.fabric || '100% Premium Organic Cotton'}
              </p>
              {product.careInstructions && (
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-[#1D1D1B] mb-2">
                    Care Guidelines:
                  </h4>
                  <ul className="list-disc pl-5 space-y-1 text-xs">
                    {product.careInstructions.map((instruction, idx) => (
                      <li key={idx}>{instruction}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {activeTab === 'shipping' && (
            <div className="space-y-4 max-w-3xl text-sm text-[#1D1D1B]/80 leading-relaxed">
              <p>
                <strong>Express Courier Dispatch:</strong> All orders placed before 3:00 PM IST are processed and handed over to our premium courier partners on the same business day.
              </p>
              <p>
                <strong>Delivery Timeline:</strong> Metro cities: 2–3 business days. Rest of India: 3–5 business days. Free standard shipping applies to all orders over ₹{settings.freeShippingThreshold}.
              </p>
              <p>
                <strong>Hassle-Free Returns:</strong> Try at home with peace of mind. We offer complimentary reverse pickup within 7 calendar days from delivery.
              </p>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Existing Reviews List (7 cols) */}
              <div className="lg:col-span-7 space-y-4">
                <h3 className="font-serif text-xl font-bold text-[#1D1D1B]">
                  Customer Ratings & Experiences
                </h3>

                {productReviews.length === 0 ? (
                  <p className="text-xs text-[#89857E]">
                    No written reviews yet. Be the first to share your thoughts on this piece!
                  </p>
                ) : (
                  <div className="space-y-4">
                    {productReviews.map(r => (
                      <div key={r.id} className="p-4 bg-white rounded-2xl border border-[#E8E2D8] shadow-sm">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-[#1D1D1B]">{r.userName}</span>
                            {r.verified && (
                              <span className="text-[10px] bg-green-100 text-green-800 px-2 py-0.5 rounded-full font-medium">
                                Verified Buyer
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-[#89857E]">{r.date}</span>
                        </div>

                        {/* Star Rating */}
                        <div className="flex items-center text-amber-500 my-1.5">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3.5 h-3.5 ${
                                i < r.rating ? 'fill-amber-500 text-amber-500' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>

                        <p className="text-xs sm:text-sm text-[#1D1D1B]/80 leading-relaxed mt-1">
                          {r.comment}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Add Review Form (5 cols) */}
              <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-[#E8E2D8] shadow-sm self-start">
                <h4 className="font-serif text-lg font-bold text-[#1D1D1B] mb-2">
                  Write an Atelier Review
                </h4>
                <p className="text-xs text-[#89857E] mb-4">
                  Share your impressions on the fit, fabric texture, and craftsmanship.
                </p>

                <form onSubmit={handleSubmitReview} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-[#1D1D1B] mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Yash Vardhan"
                      value={reviewerName}
                      onChange={e => setReviewerName(e.target.value)}
                      className="w-full text-xs p-2.5 bg-[#F8F5F0] border border-[#E8E2D8] rounded-xl focus:outline-none focus:border-[#20392F]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1D1D1B] mb-1">
                      Rating
                    </label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map(star => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setReviewRating(star)}
                          className="p-1"
                        >
                          <Star
                            className={`w-5 h-5 ${
                              star <= reviewRating ? 'fill-amber-500 text-amber-500' : 'text-gray-300'
                            }`}
                          />
                        </button>
                      ))}
                      <span className="text-xs font-bold text-[#1D1D1B] ml-1">
                        {reviewRating} of 5 Stars
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1D1D1B] mb-1">
                      Review Comments
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder="How does it feel and fit?"
                      value={reviewComment}
                      onChange={e => setReviewComment(e.target.value)}
                      className="w-full text-xs p-2.5 bg-[#F8F5F0] border border-[#E8E2D8] rounded-xl focus:outline-none focus:border-[#20392F]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#20392F] hover:bg-[#152720] text-white py-2.5 px-4 rounded-xl text-xs font-semibold shadow-sm transition-colors"
                  >
                    Submit Verified Review
                  </button>

                  {reviewSubmitted && (
                    <p className="text-xs text-green-700 font-semibold text-center flex items-center justify-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      <span>Thank you! Your review has been published.</span>
                    </p>
                  )}
                </form>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16 pt-12 border-t border-[#E8E2D8]">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#1D1D1B]">
              You May Also Admire
            </h2>
            <Link
              to={`/shop?category=${product.category}`}
              className="text-xs sm:text-sm font-semibold text-[#20392F] hover:underline"
            >
              View More {product.category}
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map(rel => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
