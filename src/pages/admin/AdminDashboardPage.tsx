import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingBag, 
  Package, 
  DollarSign, 
  Tag, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowRight, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Eye
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Order } from '../../types';

export const AdminDashboardPage: React.FC = () => {
  const { products, orders, promotions, updateOrderStatus } = useStore();
  const [chartRange, setChartRange] = useState<'week' | 'month'>('month');

  // KPI Calculations
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, o) => sum + (o.status !== 'Cancelled' ? o.total : 0), 0);
  const activePromotions = promotions.filter(p => p.isActive).length;

  const recentOrders = orders.slice(0, 5);
  const bestsellers = products.filter(p => p.isBestseller).slice(0, 5);

  // Chart data
  const monthData = [
    { label: 'Jun', revenue: 42000, orders: 38 },
    { label: 'Jul', revenue: 58000, orders: 52 },
    { label: 'Aug', revenue: 74000, orders: 65 },
    { label: 'Sep', revenue: 68000, orders: 60 },
    { label: 'Oct', revenue: 92000, orders: 84 },
    { label: 'Nov', revenue: totalRevenue > 0 ? totalRevenue + 115000 : 124000, orders: totalOrders + 102 }
  ];

  const maxVal = Math.max(...monthData.map(d => d.revenue));

  return (
    <div className="space-y-8">
      
      {/* Page Title & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#1D1D1B]">
            Executive Overview
          </h1>
          <p className="text-xs sm:text-sm text-[#89857E] mt-1">
            Real-time telemetry on inventory, customer orders, and promotional flash campaigns.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            to="/admin/products"
            className="bg-[#20392F] hover:bg-[#152720] text-white px-4 py-2.5 rounded-xl text-xs font-semibold shadow-sm transition-colors flex items-center gap-1.5"
          >
            <span>+ Add Product</span>
          </Link>
          <Link
            to="/admin/promotions"
            className="bg-white hover:bg-[#EAE4D9] text-[#1D1D1B] border border-[#E8E2D8] px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5"
          >
            <span>Configure Promos</span>
          </Link>
        </div>
      </div>

      {/* 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Total Revenue */}
        <div className="bg-white p-6 rounded-3xl border border-[#E8E2D8] shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#89857E] uppercase tracking-wider">
              Total Revenue
            </span>
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold">
              ₹
            </div>
          </div>
          <div className="mt-3">
            <span className="font-serif text-3xl font-bold text-[#1D1D1B]">
              ₹{totalRevenue.toLocaleString()}
            </span>
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-700 font-semibold">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+18.4% from last period</span>
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-white p-6 rounded-3xl border border-[#E8E2D8] shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#89857E] uppercase tracking-wider">
              Total Orders
            </span>
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-800 flex items-center justify-center">
              <Package className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="font-serif text-3xl font-bold text-[#1D1D1B]">
              {totalOrders}
            </span>
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-blue-700 font-semibold">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>All demo orders synced</span>
          </div>
        </div>

        {/* Total Catalog Products */}
        <div className="bg-white p-6 rounded-3xl border border-[#E8E2D8] shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#89857E] uppercase tracking-wider">
              Live Products
            </span>
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-800 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="font-serif text-3xl font-bold text-[#1D1D1B]">
              {totalProducts}
            </span>
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-amber-800 font-semibold">
            <span>{products.filter(p => p.stock > 0).length} in stock</span>
          </div>
        </div>

        {/* Active Promotions */}
        <div className="bg-white p-6 rounded-3xl border border-[#E8E2D8] shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#89857E] uppercase tracking-wider">
              Active Campaigns
            </span>
            <div className="w-10 h-10 rounded-2xl bg-[#20392F]/10 text-[#20392F] flex items-center justify-center">
              <Tag className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="font-serif text-3xl font-bold text-[#1D1D1B]">
              {activePromotions}
            </span>
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-[#20392F] font-semibold">
            <Clock className="w-3.5 h-3.5" />
            <span>Countdowns running live</span>
          </div>
        </div>

      </div>

      {/* Sales Overview Chart (SVG) */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E8E2D8] shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif text-xl font-bold text-[#1D1D1B]">
              Sales & Revenue Trajectory
            </h2>
            <p className="text-xs text-[#89857E] mt-0.5">
              Monthly revenue breakdown across menswear, womenswear, and outerwear
            </p>
          </div>

          <div className="flex items-center gap-2 bg-[#F8F5F0] p-1 rounded-xl border border-[#E8E2D8] text-xs font-semibold">
            <button
              onClick={() => setChartRange('month')}
              className={`px-3 py-1 rounded-lg transition-colors ${
                chartRange === 'month' ? 'bg-[#20392F] text-white' : 'text-[#89857E] hover:text-[#1D1D1B]'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setChartRange('week')}
              className={`px-3 py-1 rounded-lg transition-colors ${
                chartRange === 'week' ? 'bg-[#20392F] text-white' : 'text-[#89857E] hover:text-[#1D1D1B]'
              }`}
            >
              Weekly
            </button>
          </div>
        </div>

        {/* Custom Interactive SVG Bar & Line Chart */}
        <div className="h-64 w-full flex items-end gap-4 sm:gap-8 pt-8 px-2 border-b border-[#E8E2D8]">
          {monthData.map((item, idx) => {
            const heightPercent = Math.max(15, (item.revenue / maxVal) * 100);
            return (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                <span className="text-[10px] sm:text-xs font-bold text-[#20392F] opacity-0 group-hover:opacity-100 transition-opacity">
                  ₹{(item.revenue / 1000).toFixed(0)}k
                </span>
                <div
                  className="w-full bg-[#EAE4D9] hover:bg-[#20392F] rounded-t-xl transition-all duration-300 relative cursor-pointer group-hover:shadow-lg"
                  style={{ height: `${heightPercent}%` }}
                >
                  <div className="absolute inset-0 bg-[#20392F]/20 rounded-t-xl opacity-0 group-hover:opacity-100" />
                </div>
                <span className="text-xs font-semibold text-[#89857E] group-hover:text-[#1D1D1B]">
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Two Column Grid: Recent Orders & Bestsellers */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Recent Orders (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-7 rounded-3xl border border-[#E8E2D8] shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D8]">
            <div>
              <h3 className="font-serif text-lg font-bold text-[#1D1D1B]">Recent Customer Orders</h3>
              <p className="text-xs text-[#89857E]">Update delivery stages in real-time</p>
            </div>
            <Link to="/admin/orders" className="text-xs font-semibold text-[#20392F] hover:underline flex items-center gap-1">
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-gray-100">
            {recentOrders.map(order => (
              <div key={order.id} className="py-3.5 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-[#1D1D1B]">{order.orderNumber}</span>
                    <span className="text-gray-400">•</span>
                    <span className="font-medium text-gray-700">{order.customerName}</span>
                  </div>
                  <p className="text-gray-400 text-[11px] mt-0.5">
                    {order.items.length} items • {order.paymentMethod.toUpperCase()}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-bold text-sm text-[#1D1D1B]">
                    ₹{order.total.toLocaleString()}
                  </span>

                  {/* Status Toggle Dropdown */}
                  <select
                    value={order.status}
                    onChange={e => updateOrderStatus(order.id, e.target.value as Order['status'])}
                    className="text-[11px] font-bold py-1 px-2.5 rounded-lg border border-gray-200 bg-[#F8F5F0] focus:outline-none cursor-pointer"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bestselling Products (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-7 rounded-3xl border border-[#E8E2D8] shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D8]">
            <div>
              <h3 className="font-serif text-lg font-bold text-[#1D1D1B]">Bestselling Garments</h3>
              <p className="text-xs text-[#89857E]">Top performing catalog pieces</p>
            </div>
            <Link to="/admin/products" className="text-xs font-semibold text-[#20392F] hover:underline flex items-center gap-1">
              <span>Manage</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {bestsellers.map(product => (
              <div key={product.id} className="flex items-center gap-3 p-2 bg-[#F8F5F0] rounded-2xl">
                <div className="w-12 h-14 rounded-xl overflow-hidden bg-white shrink-0">
                  <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 text-xs">
                  <h4 className="font-bold text-[#1D1D1B] line-clamp-1">{product.name}</h4>
                  <p className="text-[#89857E] text-[11px]">{product.category} • Stock: {product.stock}</p>
                </div>
                <div className="text-right text-xs">
                  <span className="font-bold text-[#1D1D1B]">₹{product.discountedPrice.toLocaleString()}</span>
                  <span className="block text-[10px] text-[#C95745] font-bold">{product.discountPercentage}% OFF</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
