import React, { useState } from 'react';
import { Outlet, Navigate, Link } from 'react-router-dom';
import { Menu, Bell, Shield, ExternalLink } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { AdminSidebar } from './AdminSidebar';
import { useStore } from '../../context/StoreContext';

export const AdminLayout: React.FC = () => {
  const { isAdminAuthenticated } = useAuth();
  const { orders } = useStore();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  if (!isAdminAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  const pendingOrders = orders.filter(o => o.status === 'Processing' || o.status === 'Pending').length;

  return (
    <div className="min-h-screen bg-[#F1EDE6] text-[#1D1D1B] flex">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 shrink-0">
        <div className="fixed inset-y-0 w-64">
          <AdminSidebar />
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-64 z-10">
            <AdminSidebar onCloseMobile={() => setIsMobileSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Admin Header */}
        <header className="bg-white border-b border-[#E8E2D8] sticky top-0 z-30 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="lg:hidden p-2 text-gray-600 hover:text-black rounded-lg"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-semibold uppercase tracking-wider text-[#20392F]">
                VogueThread Management Suite
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/admin/orders"
              className="relative p-2 text-gray-500 hover:text-[#20392F] transition-colors"
              title="Pending Orders"
            >
              <Bell className="w-5 h-5" />
              {pendingOrders > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#C95745] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {pendingOrders}
                </span>
              )}
            </Link>

            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-[#20392F] bg-[#20392F]/10 hover:bg-[#20392F]/20 px-3.5 py-1.5 rounded-full transition-colors"
            >
              <span>Customer Store</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 sm:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
