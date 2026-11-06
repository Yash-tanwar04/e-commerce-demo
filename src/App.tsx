import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { StoreProvider } from './context/StoreContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { AuthProvider } from './context/AuthContext';

// Common Components
import { AnnouncementBar } from './components/common/AnnouncementBar';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { CartDrawer } from './components/common/CartDrawer';
import { PromotionPopup } from './components/common/PromotionPopup';
import { FloatingChatWidget } from './components/common/FloatingChatWidget';
import { SearchModal } from './components/common/SearchModal';

// Customer Pages
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
import { WishlistPage } from './pages/WishlistPage';
import { OrdersHistoryPage } from './pages/OrdersHistoryPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Admin Subsystem
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminProductsPage } from './pages/admin/AdminProductsPage';
import { AdminPromotionsPage } from './pages/admin/AdminPromotionsPage';
import { AdminOrdersPage } from './pages/admin/AdminOrdersPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';

// Main Customer Layout Wrapper
const CustomerLayout: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F5F0] text-[#1D1D1B]">
      {/* Top Announcement Bar */}
      <AnnouncementBar />

      {/* Main Navbar */}
      <Navbar onOpenSearch={() => setIsSearchOpen(true)} />

      {/* Main Outlet */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Slide-out Cart Drawer */}
      <CartDrawer />

      {/* 70% Discount Popup Modal from UI Reference */}
      <PromotionPopup />

      {/* Floating Concierge Chat Support Widget */}
      <FloatingChatWidget />

      {/* Instant Search Overlay */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      {/* Global Footer */}
      <Footer />
    </div>
  );
};

export function App() {
  return (
    <BrowserRouter>
      <StoreProvider>
        <CartProvider>
          <WishlistProvider>
            <AuthProvider>
              <Routes>
                {/* Customer Storefront Routes */}
                <Route element={<CustomerLayout />}>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/shop" element={<ShopPage />} />
                  <Route path="/product/:productId" element={<ProductDetailPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/order-confirmation/:orderNumber" element={<OrderConfirmationPage />} />
                  <Route path="/wishlist" element={<WishlistPage />} />
                  <Route path="/orders" element={<OrdersHistoryPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Route>

                {/* Admin Login Route */}
                <Route path="/admin/login" element={<AdminLoginPage />} />

                {/* Protected Admin Routes */}
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<AdminDashboardPage />} />
                  <Route path="products" element={<AdminProductsPage />} />
                  <Route path="promotions" element={<AdminPromotionsPage />} />
                  <Route path="orders" element={<AdminOrdersPage />} />
                  <Route path="settings" element={<AdminSettingsPage />} />
                </Route>
              </Routes>
            </AuthProvider>
          </WishlistProvider>
        </CartProvider>
      </StoreProvider>
    </BrowserRouter>
  );
}

export default App;
