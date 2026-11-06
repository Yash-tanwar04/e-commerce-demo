import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, Search, ChevronRight, Truck, MapPin, Calendar } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const OrdersHistoryPage: React.FC = () => {
  const { orders } = useStore();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOrders = orders.filter(o => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    return (
      o.orderNumber.toLowerCase().includes(term) ||
      o.customerName.toLowerCase().includes(term) ||
      o.items.some(i => i.name.toLowerCase().includes(term))
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E8E2D8] mb-8">
        <div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#1D1D1B]">
            My Demo Orders
          </h1>
          <p className="text-xs sm:text-sm text-[#89857E] mt-1">
            Track orders placed in this browser session ({orders.length} total)
          </p>
        </div>

        {/* Search by Order Number */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-[#89857E] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search Order ID or style..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full text-xs pl-10 pr-4 py-2.5 bg-white border border-[#E8E2D8] rounded-full focus:outline-none focus:border-[#20392F]"
          />
        </div>
      </div>

      {filteredOrders.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-[#E8E2D8]">
          <Package className="w-12 h-12 text-[#89857E] mx-auto opacity-50 mb-3" />
          <h3 className="font-serif text-xl font-bold text-[#1D1D1B]">No orders found</h3>
          <p className="text-xs text-[#89857E] mt-1">
            Place an order through the checkout or clear your search term.
          </p>
          <Link
            to="/shop"
            className="mt-5 inline-block bg-[#20392F] text-white px-6 py-2.5 rounded-full text-xs font-semibold"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredOrders.map(order => (
            <div
              key={order.id}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E8E2D8] shadow-sm space-y-4 hover:shadow-md transition-shadow"
            >
              {/* Order Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#E8E2D8]">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-mono text-sm sm:text-base font-bold text-[#20392F]">
                    {order.orderNumber}
                  </span>
                  <span className="text-xs text-[#89857E]">
                    Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full ${
                      order.status === 'Delivered'
                        ? 'bg-green-100 text-green-800'
                        : order.status === 'Shipped'
                        ? 'bg-blue-100 text-blue-800'
                        : order.status === 'Cancelled'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    ● {order.status}
                  </span>
                  <span className="font-bold text-sm sm:text-base text-[#1D1D1B]">
                    ₹{order.total.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Items in order */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-2.5 bg-[#F8F5F0] rounded-2xl">
                    <div className="w-12 h-14 rounded-xl overflow-hidden bg-white shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 text-xs">
                      <p className="font-semibold text-[#1D1D1B] line-clamp-1">{item.name}</p>
                      <p className="text-[#89857E] mt-0.5">
                        {item.size} • {item.color} • Qty: {item.quantity}
                      </p>
                      <p className="font-bold text-[#20392F] mt-0.5">₹{item.price.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Delivery and Customer info */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs text-[#89857E]">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#20392F]" />
                  <span>Estimated Delivery: <strong className="text-[#1D1D1B]">{order.estimatedDelivery}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#20392F]" />
                  <span>{order.shippingAddress.city}, {order.shippingAddress.state}</span>
                </div>
                <Link
                  to={`/order-confirmation/${order.orderNumber}`}
                  className="text-[#20392F] font-semibold hover:underline flex items-center gap-1"
                >
                  <span>View Full Receipt</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
