import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, Package, ArrowRight, Truck, Calendar, MapPin, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useStore } from '../context/StoreContext';

export const OrderConfirmationPage: React.FC = () => {
  const { orderNumber } = useParams<{ orderNumber: string }>();
  const { orders } = useStore();

  const order = orders.find(o => o.orderNumber === orderNumber) || orders[0];

  useEffect(() => {
    // Launch celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // safe fallback
    }
  }, []);

  if (!order) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="font-serif text-3xl font-bold">Order Not Found</h2>
        <Link to="/" className="mt-4 inline-block text-[#20392F] underline">
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      
      {/* Top Celebration Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E8E2D8] shadow-sm text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-green-100 text-green-700 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <span className="text-xs uppercase tracking-widest font-bold text-[#20392F]">
          Receipt & Confirmation
        </span>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1D1D1B]">
          Thank You, {order.customerName}!
        </h1>

        <p className="text-sm text-[#89857E] max-w-lg mx-auto leading-relaxed">
          Your order has been recorded in our demo system. An electronic invoice and delivery notification have been registered.
        </p>

        {/* Order ID Pill */}
        <div className="inline-flex items-center gap-3 bg-[#F8F5F0] border border-[#E8E2D8] px-5 py-2.5 rounded-full">
          <span className="text-xs text-[#89857E]">Order Reference:</span>
          <span className="font-mono font-bold text-sm text-[#20392F]">
            {order.orderNumber}
          </span>
        </div>
      </div>

      {/* Delivery Tracking Timeline */}
      <div className="mt-8 bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E2D8] shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#E8E2D8]">
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-[#20392F]" />
            <h3 className="font-serif text-lg font-bold text-[#1D1D1B]">Estimated Delivery</h3>
          </div>
          <span className="text-xs sm:text-sm font-bold text-[#20392F] bg-[#20392F]/10 px-3 py-1 rounded-full">
            {order.estimatedDelivery}
          </span>
        </div>

        {/* Step Progress Bar */}
        <div className="grid grid-cols-4 gap-2 text-center text-xs">
          <div className="space-y-1">
            <div className="w-6 h-6 rounded-full bg-[#20392F] text-white flex items-center justify-center mx-auto text-[10px] font-bold">✓</div>
            <p className="font-bold text-[#1D1D1B]">Confirmed</p>
            <p className="text-[10px] text-gray-400">Recorded</p>
          </div>
          <div className="space-y-1">
            <div className="w-6 h-6 rounded-full bg-[#20392F] text-white flex items-center justify-center mx-auto text-[10px] font-bold">2</div>
            <p className="font-bold text-[#1D1D1B]">Processing</p>
            <p className="text-[10px] text-gray-400">At Atelier</p>
          </div>
          <div className="space-y-1">
            <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center mx-auto text-[10px] font-bold">3</div>
            <p className="text-gray-500">Shipped</p>
            <p className="text-[10px] text-gray-400">In Transit</p>
          </div>
          <div className="space-y-1">
            <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center mx-auto text-[10px] font-bold">4</div>
            <p className="text-gray-500">Delivered</p>
            <p className="text-[10px] text-gray-400">Doorstep</p>
          </div>
        </div>
      </div>

      {/* Order Details & Summary Breakdown */}
      <div className="mt-8 bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E2D8] shadow-sm space-y-6">
        <h3 className="font-serif text-lg font-bold text-[#1D1D1B] pb-3 border-b border-[#E8E2D8]">
          Purchased Garments
        </h3>

        <div className="divide-y divide-gray-100">
          {order.items.map((item, idx) => (
            <div key={idx} className="flex items-center gap-4 py-3.5">
              <div className="w-14 h-16 rounded-xl overflow-hidden bg-[#ECE6DC] shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 text-xs sm:text-sm">
                <h4 className="font-bold text-[#1D1D1B]">{item.name}</h4>
                <p className="text-xs text-[#89857E]">
                  Size: {item.size} • Color: {item.color} • Qty: {item.quantity}
                </p>
              </div>
              <span className="font-bold text-sm text-[#1D1D1B]">
                ₹{(item.price * item.quantity).toLocaleString()}
              </span>
            </div>
          ))}
        </div>

        {/* Financial Recap */}
        <div className="space-y-2 pt-4 border-t border-[#E8E2D8] text-xs sm:text-sm text-[#89857E]">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span className="font-semibold text-[#1D1D1B]">₹{order.subtotal.toLocaleString()}</span>
          </div>

          {order.discount > 0 && (
            <div className="flex justify-between text-[#C95745] font-semibold">
              <span>Discount ({order.couponCode || 'Promo'})</span>
              <span>-₹{order.discount.toLocaleString()}</span>
            </div>
          )}

          <div className="flex justify-between">
            <span>Shipping</span>
            <span className="font-semibold text-[#1D1D1B]">
              {order.shippingFee === 0 ? 'Free' : `₹${order.shippingFee}`}
            </span>
          </div>

          <div className="pt-3 border-t border-[#E8E2D8] flex justify-between items-baseline text-base font-bold text-[#1D1D1B]">
            <span>Total Paid</span>
            <span className="font-serif text-xl text-[#20392F]">₹{order.total.toLocaleString()}</span>
          </div>
        </div>

        {/* Shipping Address Recap */}
        <div className="p-4 bg-[#F8F5F0] rounded-2xl border border-[#E8E2D8] text-xs space-y-1">
          <p className="font-bold text-[#1D1D1B] flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#20392F]" />
            <span>Shipping Destination</span>
          </p>
          <p className="text-[#89857E]">
            {order.customerName} • {order.phone}
          </p>
          <p className="text-[#89857E]">
            {order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
          </p>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Link
          to="/orders"
          className="bg-[#20392F] hover:bg-[#152720] text-white px-8 py-3.5 rounded-full font-semibold text-xs sm:text-sm shadow-md transition-all"
        >
          Track All My Orders
        </Link>
        <Link
          to="/shop"
          className="bg-white hover:bg-[#EAE4D9] text-[#1D1D1B] border border-[#E8E2D8] px-8 py-3.5 rounded-full font-semibold text-xs sm:text-sm transition-all"
        >
          Continue Shopping
        </Link>
        <Link
          to="/admin"
          className="text-xs text-[#20392F] hover:underline flex items-center gap-1 font-semibold ml-2"
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Verify in Admin Dashboard</span>
        </Link>
      </div>

    </div>
  );
};
