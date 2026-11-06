import React, { useState } from 'react';
import { 
  Package, 
  Search, 
  Filter, 
  Eye, 
  Clock, 
  CheckCircle2, 
  Truck, 
  XCircle, 
  MapPin, 
  User, 
  CreditCard,
  X
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Order } from '../../types';

export const AdminOrdersPage: React.FC = () => {
  const { orders, updateOrderStatus } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [inspectingOrder, setInspectingOrder] = useState<Order | null>(null);

  const filteredOrders = orders.filter(order => {
    const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
    const q = searchTerm.toLowerCase().trim();
    const matchesSearch = !q ||
      order.orderNumber.toLowerCase().includes(q) ||
      order.customerName.toLowerCase().includes(q) ||
      order.email.toLowerCase().includes(q);
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#1D1D1B]">
            Order Fulfillment & Tracking
          </h1>
          <p className="text-xs sm:text-sm text-[#89857E] mt-1">
            Dispatch, track, and update fulfillment stages for all customer purchases ({orders.length} orders total).
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#E8E2D8] shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-[#89857E] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by order ID, customer name or email..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full text-xs pl-10 pr-3 py-2 bg-[#F8F5F0] border border-[#E8E2D8] rounded-xl focus:outline-none focus:border-[#20392F]"
          />
        </div>

        <div className="flex items-center gap-2">
          <label className="text-xs font-semibold text-[#89857E]">Status:</label>
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="text-xs bg-[#F8F5F0] border border-[#E8E2D8] rounded-xl py-2 px-3 font-semibold focus:outline-none"
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-3xl border border-[#E8E2D8] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8F5F0] text-[#1D1D1B] uppercase tracking-wider font-bold border-b border-[#E8E2D8]">
              <tr>
                <th className="py-3.5 px-4">Order ID</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4">Customer</th>
                <th className="py-3.5 px-4">Items</th>
                <th className="py-3.5 px-4">Total</th>
                <th className="py-3.5 px-4">Payment</th>
                <th className="py-3.5 px-4">Fulfillment Status</th>
                <th className="py-3.5 px-4 text-right">Inspect</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filteredOrders.map(order => (
                <tr key={order.id} className="hover:bg-[#F8F5F0]/60 transition-colors">
                  {/* Order Number */}
                  <td className="py-3.5 px-4 font-mono font-bold text-[#20392F]">
                    {order.orderNumber}
                  </td>

                  {/* Date */}
                  <td className="py-3.5 px-4 text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short'
                    })}
                  </td>

                  {/* Customer */}
                  <td className="py-3.5 px-4">
                    <p className="font-bold text-[#1D1D1B]">{order.customerName}</p>
                    <p className="text-[11px] text-gray-400">{order.email}</p>
                  </td>

                  {/* Items Count */}
                  <td className="py-3.5 px-4">
                    <span className="font-semibold text-gray-700">
                      {order.items.reduce((s, i) => s + i.quantity, 0)} pcs
                    </span>
                  </td>

                  {/* Total Amount */}
                  <td className="py-3.5 px-4 font-bold text-[#1D1D1B]">
                    ₹{order.total.toLocaleString()}
                  </td>

                  {/* Payment */}
                  <td className="py-3.5 px-4">
                    <span className="uppercase text-[10px] font-bold tracking-wider px-2 py-0.5 rounded bg-gray-100 text-gray-700">
                      {order.paymentMethod}
                    </span>
                  </td>

                  {/* Status Dropdown */}
                  <td className="py-3.5 px-4">
                    <select
                      value={order.status}
                      onChange={e => updateOrderStatus(order.id, e.target.value as Order['status'])}
                      className={`text-[11px] font-bold py-1 px-2.5 rounded-lg border focus:outline-none cursor-pointer ${
                        order.status === 'Delivered'
                          ? 'bg-green-100 text-green-800 border-green-200'
                          : order.status === 'Shipped'
                          ? 'bg-blue-100 text-blue-800 border-blue-200'
                          : order.status === 'Cancelled'
                          ? 'bg-red-100 text-red-800 border-red-200'
                          : 'bg-amber-100 text-amber-800 border-amber-200'
                      }`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>

                  {/* Inspect CTA */}
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => setInspectingOrder(order)}
                      className="p-1.5 text-gray-500 hover:text-[#20392F] hover:bg-gray-100 rounded-lg transition-colors"
                      title="View Order Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {inspectingOrder && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setInspectingOrder(null)} />
          
          <div className="min-h-screen px-4 text-center flex items-center justify-center py-10">
            <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#E8E2D8] overflow-hidden text-left relative z-10">
              
              {/* Modal Header */}
              <div className="px-6 py-5 bg-[#20392F] text-white flex items-center justify-between">
                <div>
                  <h2 className="font-serif text-lg font-bold">
                    Order Reference: {inspectingOrder.orderNumber}
                  </h2>
                  <p className="text-[11px] text-white/70">
                    Recorded on {new Date(inspectingOrder.createdAt).toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => setInspectingOrder(null)}
                  className="p-1.5 text-white/70 hover:text-white rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto text-xs">
                {/* Customer & Shipping Summary */}
                <div className="grid grid-cols-2 gap-4 p-4 bg-[#F8F5F0] rounded-2xl border border-[#E8E2D8]">
                  <div>
                    <span className="font-bold text-[#1D1D1B] block mb-1">Customer Profile</span>
                    <p className="text-gray-700 font-semibold">{inspectingOrder.customerName}</p>
                    <p className="text-gray-500">{inspectingOrder.email}</p>
                    <p className="text-gray-500">{inspectingOrder.phone}</p>
                  </div>
                  <div>
                    <span className="font-bold text-[#1D1D1B] block mb-1">Shipping Address</span>
                    <p className="text-gray-700">{inspectingOrder.shippingAddress.street}</p>
                    <p className="text-gray-700">
                      {inspectingOrder.shippingAddress.city}, {inspectingOrder.shippingAddress.state} - {inspectingOrder.shippingAddress.pincode}
                    </p>
                    <p className="text-gray-500">{inspectingOrder.shippingAddress.country}</p>
                  </div>
                </div>

                {/* Items */}
                <div>
                  <h4 className="font-bold text-[#1D1D1B] uppercase tracking-wider mb-2">
                    Line Items ({inspectingOrder.items.length})
                  </h4>
                  <div className="divide-y divide-gray-100 border border-gray-100 rounded-2xl overflow-hidden">
                    {inspectingOrder.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 bg-white">
                        <div className="w-12 h-14 rounded-xl overflow-hidden bg-[#ECE6DC] shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-[#1D1D1B]">{item.name}</p>
                          <p className="text-gray-500 text-[11px]">
                            Size: {item.size} • Color: {item.color} • Qty: {item.quantity}
                          </p>
                        </div>
                        <span className="font-bold text-[#1D1D1B]">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Financial Breakdown */}
                <div className="space-y-1.5 pt-3 border-t border-gray-100 text-gray-600">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>₹{inspectingOrder.subtotal.toLocaleString()}</span>
                  </div>
                  {inspectingOrder.discount > 0 && (
                    <div className="flex justify-between text-[#C95745] font-semibold">
                      <span>Discount Voucher:</span>
                      <span>-₹{inspectingOrder.discount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Shipping Charges:</span>
                    <span>₹{inspectingOrder.shippingFee}</span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-[#1D1D1B] pt-2 border-t border-gray-100">
                    <span>Final Amount:</span>
                    <span className="text-[#20392F]">₹{inspectingOrder.total.toLocaleString()}</span>
                  </div>
                </div>

                {/* Change Status */}
                <div className="p-4 bg-gray-50 rounded-2xl flex items-center justify-between">
                  <span className="font-bold text-[#1D1D1B]">Update Fulfillment Stage:</span>
                  <select
                    value={inspectingOrder.status}
                    onChange={e => {
                      const newStatus = e.target.value as Order['status'];
                      updateOrderStatus(inspectingOrder.id, newStatus);
                      setInspectingOrder({ ...inspectingOrder, status: newStatus });
                    }}
                    className="p-2 text-xs font-bold rounded-xl border border-gray-300 bg-white"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 bg-gray-50 border-t border-gray-100 text-right">
                <button
                  onClick={() => setInspectingOrder(null)}
                  className="px-6 py-2 bg-[#20392F] text-white rounded-full text-xs font-semibold"
                >
                  Done
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};
