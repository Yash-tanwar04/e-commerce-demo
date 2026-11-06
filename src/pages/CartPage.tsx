import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  Tag, 
  Check, 
  AlertCircle, 
  ShieldCheck, 
  Truck, 
  RotateCcw 
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useStore } from '../context/StoreContext';

export const CartPage: React.FC = () => {
  const {
    items,
    itemCount,
    subtotal,
    discount,
    shippingFee,
    total,
    appliedCoupon,
    couponError,
    updateQuantity,
    removeFromCart,
    clearCart,
    applyCoupon,
    removeCoupon
  } = useCart();

  const { settings } = useStore();
  const navigate = useNavigate();

  const [couponInput, setCouponInput] = useState('');
  const [couponSuccess, setCouponSuccess] = useState(false);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const success = applyCoupon(couponInput);
    if (success) {
      setCouponSuccess(true);
      setCouponInput('');
      setTimeout(() => setCouponSuccess(false), 3000);
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="w-24 h-24 rounded-full bg-[#EAE4D9]/80 flex items-center justify-center text-[#20392F] mx-auto mb-6">
          <ShoppingBag className="w-10 h-10 opacity-70" />
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1D1D1B]">
          Your Shopping Bag is Empty
        </h1>
        <p className="text-sm text-[#89857E] mt-2 max-w-md mx-auto">
          Your wardrobe awaits. Discover timeless tailored pieces, heavyweight cottons, and artisan knits.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-[#20392F] hover:bg-[#152720] text-white px-8 py-3.5 rounded-full font-semibold text-sm shadow-md transition-all"
          >
            <span>Explore Collections</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/shop?sale=true"
            className="inline-flex items-center gap-2 bg-white border border-[#E8E2D8] hover:bg-[#EAE4D9] text-[#1D1D1B] px-8 py-3.5 rounded-full font-semibold text-sm transition-all"
          >
            <span>View Flash Sale</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Header */}
      <div className="flex items-baseline justify-between pb-6 border-b border-[#E8E2D8] mb-8">
        <div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#1D1D1B]">
            Shopping Bag
          </h1>
          <p className="text-xs sm:text-sm text-[#89857E] mt-1">
            Review your selected garments ({itemCount} {itemCount === 1 ? 'item' : 'items'})
          </p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs text-[#89857E] hover:text-[#C95745] underline font-medium"
        >
          Clear All Items
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        
        {/* Left Column: Cart Items List (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          {items.map(item => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row gap-4 p-4 sm:p-5 bg-white rounded-3xl border border-[#E8E2D8] shadow-sm relative"
            >
              {/* Image */}
              <div className="w-full sm:w-28 h-36 rounded-2xl overflow-hidden bg-[#ECE6DC] shrink-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Details */}
              <div className="flex-1 flex flex-col justify-between py-1">
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-[#20392F]">
                        {item.category}
                      </span>
                      <h3 className="font-serif text-lg font-bold text-[#1D1D1B]">
                        <Link to={`/product/${item.productId}`} className="hover:text-[#20392F]">
                          {item.name}
                        </Link>
                      </h3>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-[#C95745] p-1.5 transition-colors"
                      title="Remove from bag"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Attributes */}
                  <div className="flex items-center gap-4 mt-2 text-xs text-[#89857E]">
                    <span>Size: <strong className="text-[#1D1D1B] font-semibold">{item.size}</strong></span>
                    <span>•</span>
                    <span className="flex items-center gap-1.5">
                      Color:
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-gray-300 inline-block shadow-sm"
                        style={{ backgroundColor: item.colorHex || '#000' }}
                      />
                      <strong className="text-[#1D1D1B] font-semibold">{item.color}</strong>
                    </span>
                  </div>
                </div>

                {/* Price & Quantity Controls */}
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#F1EDE6]">
                  <div className="flex items-baseline gap-2">
                    <span className="font-bold text-lg text-[#1D1D1B]">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </span>
                    {item.originalPrice > item.price && (
                      <span className="text-xs text-[#89857E] line-through">
                        ₹{(item.originalPrice * item.quantity).toLocaleString()}
                      </span>
                    )}
                    <span className="text-[11px] text-[#89857E]">
                      (₹{item.price.toLocaleString()} each)
                    </span>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-[#E8E2D8] rounded-full bg-[#F8F5F0] overflow-hidden">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-3 py-1 text-sm font-bold text-[#1D1D1B] hover:bg-[#EAE4D9] transition-colors"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 text-xs font-bold text-[#1D1D1B]">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-3 py-1 text-sm font-bold text-[#1D1D1B] hover:bg-[#EAE4D9] transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Service Promises Row */}
          <div className="p-4 bg-[#EAE4D9]/40 rounded-2xl border border-[#E8E2D8] flex flex-wrap items-center justify-around gap-4 text-xs text-[#89857E]">
            <span className="flex items-center gap-1.5 text-[#1D1D1B]">
              <Truck className="w-4 h-4 text-[#20392F]" />
              <span>Complimentary insured shipping over ₹999</span>
            </span>
            <span className="flex items-center gap-1.5 text-[#1D1D1B]">
              <RotateCcw className="w-4 h-4 text-[#20392F]" />
              <span>7-day doorstep return pickup</span>
            </span>
          </div>
        </div>

        {/* Right Column: Order Summary Card (4 cols) */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E8E2D8] shadow-sm space-y-6 sticky top-28">
            <h2 className="font-serif text-xl font-bold text-[#1D1D1B]">
              Order Summary
            </h2>

            {/* Coupon Code Section */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-[#1D1D1B] uppercase tracking-wider">
                Promotional Voucher
              </label>

              {appliedCoupon ? (
                <div className="flex items-center justify-between bg-green-50 border border-green-200 p-3 rounded-2xl text-xs text-green-900">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-green-700" />
                    <span>Coupon <strong>{appliedCoupon.code}</strong> applied ({appliedCoupon.discountPercentage}% OFF)</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-red-600 hover:text-red-800 font-bold ml-2 underline text-xs"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-4 h-4 text-[#89857E] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Try VOGUE70 or WINTER20"
                      value={couponInput}
                      onChange={e => setCouponInput(e.target.value)}
                      className="w-full text-xs pl-10 pr-3 py-2.5 bg-[#F8F5F0] border border-[#E8E2D8] rounded-xl focus:outline-none focus:border-[#20392F]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-[#20392F] hover:bg-[#152720] text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-colors shadow-sm"
                  >
                    Apply
                  </button>
                </form>
              )}

              {couponError && (
                <p className="text-[11px] text-[#C95745] flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  <span>{couponError}</span>
                </p>
              )}
              {couponSuccess && (
                <p className="text-[11px] text-green-700 flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  <span>Coupon successfully applied to your order!</span>
                </p>
              )}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-3 pt-4 border-t border-[#E8E2D8] text-xs sm:text-sm text-[#89857E]">
              <div className="flex justify-between">
                <span>Subtotal ({itemCount} items)</span>
                <span className="font-semibold text-[#1D1D1B]">₹{subtotal.toLocaleString()}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-[#C95745] font-semibold">
                  <span>Promotional Discount</span>
                  <span>-₹{discount.toLocaleString()}</span>
                </div>
              )}

              <div className="flex justify-between items-center">
                <span>Estimated Shipping</span>
                <span className="font-semibold text-[#1D1D1B]">
                  {shippingFee === 0 ? (
                    <span className="text-green-700 uppercase font-bold text-xs bg-green-50 px-2 py-0.5 rounded-md">
                      Free
                    </span>
                  ) : (
                    `₹${shippingFee}`
                  )}
                </span>
              </div>

              <div className="pt-4 border-t border-[#E8E2D8] flex justify-between items-baseline text-lg font-bold text-[#1D1D1B]">
                <span>Total Amount</span>
                <span className="font-serif text-2xl text-[#20392F]">₹{total.toLocaleString()}</span>
              </div>
            </div>

            {/* Checkout CTA */}
            <div className="space-y-2 pt-2">
              <button
                onClick={() => navigate('/checkout')}
                className="w-full bg-[#20392F] hover:bg-[#152720] text-white font-semibold py-4 px-6 rounded-full flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all text-sm group"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <Link
                to="/shop"
                className="block text-center text-xs font-semibold text-[#89857E] hover:text-[#1D1D1B] py-2 transition-colors"
              >
                Continue Shopping
              </Link>
            </div>

            {/* Trust badge */}
            <div className="flex items-center justify-center gap-2 text-[11px] text-[#89857E] pt-2">
              <ShieldCheck className="w-4 h-4 text-[#20392F]" />
              <span>Safe & Encrypted 256-bit Checkout</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
