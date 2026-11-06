import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  CreditCard, 
  Smartphone, 
  Banknote, 
  Building2, 
  Tag, 
  Check, 
  AlertCircle, 
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useStore } from '../context/StoreContext';

export const CheckoutPage: React.FC = () => {
  const { items, itemCount, subtotal, discount, shippingFee, total, appliedCoupon, applyCoupon, removeCoupon, clearCart } = useCart();
  const { addOrder, settings } = useStore();
  const navigate = useNavigate();

  // Form Fields
  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [stateName, setStateName] = useState('Delhi');
  const [pincode, setPincode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'upi' | 'card' | 'netbanking'>('upi');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  // Demo card inputs
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8821');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('742');

  // Coupon
  const [couponInput, setCouponInput] = useState('');

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="font-serif text-3xl font-bold">Your cart is currently empty</h2>
        <p className="text-sm text-[#89857E] mt-2">Add items to your bag before checking out.</p>
        <Link
          to="/shop"
          className="mt-6 inline-flex items-center gap-2 bg-[#20392F] text-white px-6 py-3 rounded-full text-xs font-semibold"
        >
          <span>Return to Store</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    );
  }

  const validateForm = () => {
    const errs: Record<string, string> = {};
    if (!customerName.trim()) errs.customerName = 'Please enter your full name';
    if (!email.trim() || !email.includes('@')) errs.email = 'Please provide a valid email address';
    if (!phone.trim() || phone.length < 10) errs.phone = 'Please provide a 10-digit mobile number';
    if (!street.trim()) errs.street = 'Street address is required';
    if (!city.trim()) errs.city = 'City is required';
    if (!pincode.trim() || pincode.length < 6) errs.pincode = 'Valid 6-digit Pincode is required';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsPlacingOrder(true);

    setTimeout(() => {
      // Create new order record
      const orderItems = items.map(item => ({
        productId: item.productId,
        name: item.name,
        image: item.image,
        price: item.price,
        quantity: item.quantity,
        size: item.size,
        color: item.color
      }));

      // Calculate estimated delivery: 3 days from now
      const estDate = new Date();
      estDate.setDate(estDate.getDate() + 3);
      const formattedDelivery = estDate.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });

      const newOrder = addOrder({
        customerName: customerName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        shippingAddress: {
          street: street.trim(),
          city: city.trim(),
          state: stateName,
          pincode: pincode.trim(),
          country: 'India'
        },
        items: orderItems,
        subtotal,
        discount,
        shippingFee,
        total,
        couponCode: appliedCoupon?.code,
        paymentMethod,
        estimatedDelivery: formattedDelivery
      });

      // Clear shopping bag
      clearCart();
      setIsPlacingOrder(false);

      // Navigate to order confirmation
      navigate(`/order-confirmation/${newOrder.orderNumber}`);
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-[#89857E] mb-6">
        <Link to="/cart" className="hover:text-[#20392F]">Shopping Bag</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-[#1D1D1B] font-semibold">Secure Checkout</span>
      </nav>

      <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#1D1D1B] mb-8">
        Atelier Checkout
      </h1>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        
        {/* Left Column: Delivery & Payment Details (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Section 1: Customer & Shipping Address */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E2D8] shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D8]">
              <h2 className="font-serif text-xl font-bold text-[#1D1D1B]">
                1. Delivery Details
              </h2>
              <span className="text-xs text-[#89857E]">Ships across India</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-[#1D1D1B] mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Yash Vardhan"
                  value={customerName}
                  onChange={e => setCustomerName(e.target.value)}
                  className={`w-full text-xs p-3 bg-[#F8F5F0] border rounded-xl focus:outline-none focus:border-[#20392F] ${
                    errors.customerName ? 'border-red-500' : 'border-[#E8E2D8]'
                  }`}
                />
                {errors.customerName && <p className="text-[11px] text-red-500 mt-1">{errors.customerName}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1D1D1B] mb-1">
                  Email Address (for order updates) *
                </label>
                <input
                  type="email"
                  placeholder="name@domain.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className={`w-full text-xs p-3 bg-[#F8F5F0] border rounded-xl focus:outline-none focus:border-[#20392F] ${
                    errors.email ? 'border-red-500' : 'border-[#E8E2D8]'
                  }`}
                />
                {errors.email && <p className="text-[11px] text-red-500 mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1D1D1B] mb-1">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className={`w-full text-xs p-3 bg-[#F8F5F0] border rounded-xl focus:outline-none focus:border-[#20392F] ${
                    errors.phone ? 'border-red-500' : 'border-[#E8E2D8]'
                  }`}
                />
                {errors.phone && <p className="text-[11px] text-red-500 mt-1">{errors.phone}</p>}
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-[#1D1D1B] mb-1">
                  Street Address & Apartment *
                </label>
                <input
                  type="text"
                  placeholder="Flat, House no., Building, Apartment, Street"
                  value={street}
                  onChange={e => setStreet(e.target.value)}
                  className={`w-full text-xs p-3 bg-[#F8F5F0] border rounded-xl focus:outline-none focus:border-[#20392F] ${
                    errors.street ? 'border-red-500' : 'border-[#E8E2D8]'
                  }`}
                />
                {errors.street && <p className="text-[11px] text-red-500 mt-1">{errors.street}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1D1D1B] mb-1">
                  City *
                </label>
                <input
                  type="text"
                  placeholder="e.g. New Delhi"
                  value={city}
                  onChange={e => setCity(e.target.value)}
                  className={`w-full text-xs p-3 bg-[#F8F5F0] border rounded-xl focus:outline-none focus:border-[#20392F] ${
                    errors.city ? 'border-red-500' : 'border-[#E8E2D8]'
                  }`}
                />
                {errors.city && <p className="text-[11px] text-red-500 mt-1">{errors.city}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1D1D1B] mb-1">
                  State *
                </label>
                <select
                  value={stateName}
                  onChange={e => setStateName(e.target.value)}
                  className="w-full text-xs p-3 bg-[#F8F5F0] border border-[#E8E2D8] rounded-xl focus:outline-none focus:border-[#20392F]"
                >
                  <option value="Delhi">Delhi / NCR</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Haryana">Haryana</option>
                  <option value="Telangana">Telangana</option>
                  <option value="West Bengal">West Bengal</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="Other">Other States</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-[#1D1D1B] mb-1">
                  Pincode (Postal Code) *
                </label>
                <input
                  type="text"
                  maxLength={6}
                  placeholder="e.g. 110001"
                  value={pincode}
                  onChange={e => setPincode(e.target.value)}
                  className={`w-full text-xs p-3 bg-[#F8F5F0] border rounded-xl focus:outline-none focus:border-[#20392F] ${
                    errors.pincode ? 'border-red-500' : 'border-[#E8E2D8]'
                  }`}
                />
                {errors.pincode && <p className="text-[11px] text-red-500 mt-1">{errors.pincode}</p>}
              </div>
            </div>
          </div>

          {/* Section 2: Payment Method */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E2D8] shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D8]">
              <h2 className="font-serif text-xl font-bold text-[#1D1D1B]">
                2. Payment Method
              </h2>
              <span className="text-xs text-green-700 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-4 h-4" />
                <span>Demo Sandbox</span>
              </span>
            </div>

            <div className="space-y-3">
              {/* UPI */}
              <label className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                paymentMethod === 'upi' ? 'border-[#20392F] bg-[#20392F]/5 ring-1 ring-[#20392F]' : 'border-[#E8E2D8] bg-[#F8F5F0]/60 hover:bg-white'
              }`}>
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'upi'}
                  onChange={() => setPaymentMethod('upi')}
                  className="mt-1 accent-[#20392F]"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm font-bold text-[#1D1D1B] flex items-center gap-2">
                      <Smartphone className="w-4 h-4 text-[#20392F]" />
                      <span>Instant UPI / QR Code (Recommended)</span>
                    </span>
                    <span className="text-[10px] bg-green-100 text-green-800 font-bold px-2 py-0.5 rounded-full">
                      Zero Surcharge
                    </span>
                  </div>
                  <p className="text-xs text-[#89857E] mt-1">
                    Google Pay, PhonePe, Paytm, CRED or any UPI App
                  </p>
                </div>
              </label>

              {/* Card */}
              <label className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                paymentMethod === 'card' ? 'border-[#20392F] bg-[#20392F]/5 ring-1 ring-[#20392F]' : 'border-[#E8E2D8] bg-[#F8F5F0]/60 hover:bg-white'
              }`}>
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'card'}
                  onChange={() => setPaymentMethod('card')}
                  className="mt-1 accent-[#20392F]"
                />
                <div className="flex-1">
                  <span className="text-xs sm:text-sm font-bold text-[#1D1D1B] flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-[#20392F]" />
                    <span>Credit or Debit Card</span>
                  </span>
                  <p className="text-xs text-[#89857E] mt-1">
                    Visa, Mastercard, RuPay, American Express
                  </p>
                  
                  {paymentMethod === 'card' && (
                    <div className="mt-3 pt-3 border-t border-gray-200 grid grid-cols-2 gap-2 text-xs">
                      <div className="col-span-2">
                        <label className="text-[10px] text-gray-500">Demo Card Number</label>
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={e => setCardNumber(e.target.value)}
                          className="w-full p-2 bg-white border border-gray-300 rounded-lg text-xs font-mono"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-gray-500">Expiry</label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={e => setCardExpiry(e.target.value)}
                          className="w-full p-2 bg-white border border-gray-300 rounded-lg text-xs font-mono"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-gray-500">CVV</label>
                        <input
                          type="password"
                          value={cardCvv}
                          onChange={e => setCardCvv(e.target.value)}
                          className="w-full p-2 bg-white border border-gray-300 rounded-lg text-xs font-mono"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </label>

              {/* Cash on Delivery */}
              <label className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                paymentMethod === 'cod' ? 'border-[#20392F] bg-[#20392F]/5 ring-1 ring-[#20392F]' : 'border-[#E8E2D8] bg-[#F8F5F0]/60 hover:bg-white'
              }`}>
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                  className="mt-1 accent-[#20392F]"
                />
                <div className="flex-1">
                  <span className="text-xs sm:text-sm font-bold text-[#1D1D1B] flex items-center gap-2">
                    <Banknote className="w-4 h-4 text-[#20392F]" />
                    <span>Cash on Delivery (Pay at Doorstep)</span>
                  </span>
                  <p className="text-xs text-[#89857E] mt-1">
                    Pay in cash or digital scan upon courier arrival
                  </p>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary & Placement (5 cols) */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E2D8] shadow-sm space-y-6 sticky top-28">
            <h2 className="font-serif text-xl font-bold text-[#1D1D1B]">
              Order Summary ({itemCount} items)
            </h2>

            {/* Item Thumbnails Preview */}
            <div className="max-h-60 overflow-y-auto space-y-3 pr-1">
              {items.map(item => (
                <div key={item.id} className="flex items-center gap-3 py-2 border-b border-gray-100 last:border-0">
                  <div className="w-12 h-14 rounded-xl overflow-hidden bg-[#ECE6DC] shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 text-xs">
                    <h4 className="font-semibold text-[#1D1D1B] line-clamp-1">{item.name}</h4>
                    <p className="text-[#89857E]">
                      {item.size} • {item.color} • Qty: {item.quantity}
                    </p>
                  </div>
                  <span className="text-xs font-bold text-[#1D1D1B]">
                    ₹{(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            {/* Financial Breakdown */}
            <div className="space-y-2.5 pt-4 border-t border-[#E8E2D8] text-xs sm:text-sm text-[#89857E]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-[#1D1D1B]">₹{subtotal.toLocaleString()}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-[#C95745] font-semibold">
                  <span>Voucher Discount</span>
                  <span>-₹{discount.toLocaleString()}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Delivery Charges</span>
                <span className="font-semibold text-[#1D1D1B]">
                  {shippingFee === 0 ? <span className="text-green-700 font-bold uppercase">Free</span> : `₹${shippingFee}`}
                </span>
              </div>

              <div className="pt-3 border-t border-[#E8E2D8] flex justify-between items-baseline text-lg font-bold text-[#1D1D1B]">
                <span>Payable Amount</span>
                <span className="font-serif text-2xl text-[#20392F]">₹{total.toLocaleString()}</span>
              </div>
            </div>

            {/* Place Order CTA */}
            <button
              type="submit"
              disabled={isPlacingOrder}
              className={`w-full py-4 px-6 rounded-full font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all ${
                isPlacingOrder
                  ? 'bg-gray-400 text-white cursor-wait'
                  : 'bg-[#20392F] hover:bg-[#152720] text-white hover:scale-[1.01] active:scale-98'
              }`}
            >
              {isPlacingOrder ? (
                <span>Generating Demo Order...</span>
              ) : (
                <>
                  <span>Place Order • ₹{total.toLocaleString()}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <p className="text-[11px] text-[#89857E] text-center">
              By confirming, this order will be saved locally and trackable in the Orders history.
            </p>
          </div>
        </div>

      </form>
    </div>
  );
};
