import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, Tag, Check, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { useStore } from '../../context/StoreContext';

export const CartDrawer: React.FC = () => {
  const {
    items,
    itemCount,
    subtotal,
    discount,
    shippingFee,
    total,
    appliedCoupon,
    couponError,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    applyCoupon,
    removeCoupon
  } = useCart();

  const { settings } = useStore();
  const navigate = useNavigate();

  const [couponInput, setCouponInput] = useState('');
  const [couponAppliedSuccess, setCouponAppliedSuccess] = useState(false);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput) return;
    const success = applyCoupon(couponInput);
    if (success) {
      setCouponAppliedSuccess(true);
      setCouponInput('');
      setTimeout(() => setCouponAppliedSuccess(false), 3000);
    }
  };

  const handleCheckoutClick = () => {
    closeCart();
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
          />

          {/* Drawer Container */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="w-screen max-w-md bg-[#F8F5F0] shadow-2xl flex flex-col"
            >
              {/* Drawer Header */}
              <div className="px-6 py-5 bg-white border-b border-[#E8E2D8] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <ShoppingBag className="w-5 h-5 text-[#20392F]" />
                  <h3 className="font-serif text-xl font-bold text-[#1D1D1B]">
                    Shopping Bag
                  </h3>
                  <span className="bg-[#20392F]/10 text-[#20392F] text-xs font-bold px-2 py-0.5 rounded-full">
                    {itemCount}
                  </span>
                </div>

                <button
                  onClick={closeCart}
                  className="p-2 text-gray-400 hover:text-[#1D1D1B] rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="Close cart drawer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Free Shipping Progress Bar */}
              <div className="px-6 py-3 bg-[#EAE4D9]/50 border-b border-[#E8E2D8] text-xs text-[#1D1D1B]">
                {subtotal >= settings.freeShippingThreshold ? (
                  <p className="font-medium text-[#20392F] flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-[#20392F]" />
                    <span>You've unlocked <strong>FREE Standard Delivery</strong>!</span>
                  </p>
                ) : (
                  <div>
                    <p>
                      Add <strong>₹{(settings.freeShippingThreshold - subtotal).toLocaleString()}</strong> more to get <strong>FREE Delivery</strong>
                    </p>
                    <div className="w-full bg-[#E8E2D8] h-1.5 rounded-full mt-2 overflow-hidden">
                      <div
                        className="bg-[#20392F] h-full rounded-full transition-all duration-300"
                        style={{ width: `${Math.min(100, (subtotal / settings.freeShippingThreshold) * 100)}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center py-12">
                    <div className="w-20 h-20 rounded-full bg-[#EAE4D9]/60 flex items-center justify-center text-[#20392F] mb-4">
                      <ShoppingBag className="w-8 h-8 opacity-60" />
                    </div>
                    <h4 className="font-serif text-lg font-bold text-[#1D1D1B]">
                      Your shopping bag is empty
                    </h4>
                    <p className="text-xs text-[#89857E] mt-1 max-w-xs">
                      Looks like you haven't added anything to your cart yet. Explore our fresh winter drops!
                    </p>
                    <button
                      onClick={() => {
                        closeCart();
                        navigate('/shop');
                      }}
                      className="mt-6 inline-flex items-center gap-2 bg-[#20392F] text-white px-6 py-2.5 rounded-full text-xs font-semibold hover:bg-[#152720] transition-colors"
                    >
                      <span>Explore Catalog</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  items.map(item => (
                    <div
                      key={item.id}
                      className="flex gap-4 p-3.5 bg-white rounded-2xl border border-[#E8E2D8] shadow-sm relative group"
                    >
                      {/* Product Thumbnail */}
                      <div className="w-20 h-24 rounded-xl overflow-hidden bg-[#ECE6DC] shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 flex flex-col justify-between py-0.5">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="text-sm font-semibold text-[#1D1D1B] line-clamp-1">
                              {item.name}
                            </h4>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-gray-400 hover:text-[#C95745] transition-colors p-1"
                              title="Remove item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Selected Attributes */}
                          <div className="flex items-center gap-3 mt-1 text-xs text-[#89857E]">
                            <span>Size: <strong className="text-[#1D1D1B]">{item.size}</strong></span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              Color: 
                              <span 
                                className="w-3 h-3 rounded-full border border-gray-300 inline-block"
                                style={{ backgroundColor: item.colorHex || '#1D1D1B' }}
                              />
                              <strong className="text-[#1D1D1B]">{item.color}</strong>
                            </span>
                          </div>
                        </div>

                        {/* Price & Quantity Controls */}
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-baseline gap-1.5">
                            <span className="font-bold text-sm text-[#1D1D1B]">
                              ₹{(item.price * item.quantity).toLocaleString()}
                            </span>
                            {item.originalPrice > item.price && (
                              <span className="text-[11px] text-[#89857E] line-through">
                                ₹{(item.originalPrice * item.quantity).toLocaleString()}
                              </span>
                            )}
                          </div>

                          {/* Stepper */}
                          <div className="flex items-center border border-[#E8E2D8] rounded-full bg-[#F8F5F0] overflow-hidden">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1 hover:bg-[#EAE4D9] text-[#1D1D1B] transition-colors"
                              title="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2.5 text-xs font-bold text-[#1D1D1B]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 hover:bg-[#EAE4D9] text-[#1D1D1B] transition-colors"
                              title="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Drawer Footer with calculations & Checkout */}
              {items.length > 0 && (
                <div className="p-6 bg-white border-t border-[#E8E2D8] space-y-4">
                  {/* Coupon Code Input */}
                  <div>
                    {appliedCoupon ? (
                      <div className="flex items-center justify-between bg-green-50 border border-green-200 px-3 py-2 rounded-xl text-xs text-green-800">
                        <div className="flex items-center gap-2">
                          <Tag className="w-3.5 h-3.5 text-green-700" />
                          <span>Coupon <strong>{appliedCoupon.code}</strong> applied ({appliedCoupon.discountPercentage}% OFF)</span>
                        </div>
                        <button
                          onClick={removeCoupon}
                          className="text-red-500 hover:text-red-700 font-bold ml-2 text-xs"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleApplyCoupon} className="flex gap-2">
                        <div className="relative flex-1">
                          <Tag className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            placeholder="Promo Code (e.g. VOGUE70)"
                            value={couponInput}
                            onChange={e => setCouponInput(e.target.value)}
                            className="w-full pl-9 pr-3 py-2 text-xs bg-[#F8F5F0] border border-[#E8E2D8] rounded-xl focus:outline-none focus:border-[#20392F]"
                          />
                        </div>
                        <button
                          type="submit"
                          className="bg-[#20392F] text-white px-4 py-2 rounded-xl text-xs font-semibold hover:bg-[#152720] transition-colors"
                        >
                          Apply
                        </button>
                      </form>
                    )}

                    {couponError && (
                      <p className="text-[11px] text-[#C95745] flex items-center gap-1 mt-1.5">
                        <AlertCircle className="w-3 h-3" />
                        <span>{couponError}</span>
                      </p>
                    )}
                    {couponAppliedSuccess && (
                      <p className="text-[11px] text-green-700 flex items-center gap-1 mt-1.5">
                        <Check className="w-3 h-3" />
                        <span>Coupon applied successfully!</span>
                      </p>
                    )}
                  </div>

                  {/* Summary Breakdown */}
                  <div className="space-y-1.5 text-xs text-[#89857E]">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-semibold text-[#1D1D1B]">₹{subtotal.toLocaleString()}</span>
                    </div>

                    {discount > 0 && (
                      <div className="flex justify-between text-[#C95745]">
                        <span>Promotion Discount</span>
                        <span>-₹{discount.toLocaleString()}</span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span>Estimated Shipping</span>
                      <span className="font-semibold text-[#1D1D1B]">
                        {shippingFee === 0 ? <span className="text-green-700 uppercase font-bold">Free</span> : `₹${shippingFee}`}
                      </span>
                    </div>

                    <div className="border-t border-[#E8E2D8] pt-2 flex justify-between text-base font-bold text-[#1D1D1B]">
                      <span>Final Total</span>
                      <span>₹{total.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2 pt-1">
                    <button
                      onClick={handleCheckoutClick}
                      className="w-full bg-[#20392F] hover:bg-[#152720] text-white font-semibold py-3.5 px-6 rounded-full flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all text-sm group"
                    >
                      <span>Proceed to Checkout</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <button
                      onClick={closeCart}
                      className="w-full text-center text-xs font-semibold text-[#89857E] hover:text-[#1D1D1B] py-1 transition-colors"
                    >
                      Continue Shopping
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
