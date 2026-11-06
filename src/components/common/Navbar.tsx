import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Search, 
  Heart, 
  ShoppingBag, 
  User, 
  Menu, 
  X, 
  ChevronDown, 
  ShieldCheck, 
  Package, 
  LogOut,
  Sparkles
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';
import { useStore } from '../../context/StoreContext';
import { DiyaDecoration } from './DiwaliDecorations';

interface NavbarProps {
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSearch }) => {
  const { itemCount, openCart } = useCart();
  const { wishlistCount } = useWishlist();
  const { isAdminAuthenticated, logout } = useAuth();
  const { settings } = useStore();
  const location = useLocation();
  const navigate = useNavigate();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsUserMenuOpen(false);
  }, [location.pathname, location.search]);

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header 
      className={`sticky top-0 z-30 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#F8F1E7]/95 backdrop-blur-md shadow-sm border-b border-[#C99A45]/30' 
          : 'bg-[#F8F1E7] border-b border-[#E8E2D8]/70'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 -ml-2 text-[#1D1D1B] hover:text-[#20392F] focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Brand Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 group">
              <span className="w-8 h-8 rounded-full bg-[#20392F] text-[#E9DFD3] flex items-center justify-center font-serif text-lg font-bold shadow-sm group-hover:scale-105 transition-transform">
                🧵
              </span>
              <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#1D1D1B] group-hover:text-[#20392F] transition-colors">
                {settings.storeName || 'VogueThread'}
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8 text-sm font-medium tracking-wide">
            <Link
              to="/"
              className={`transition-all duration-200 relative py-1 ${
                isActive('/') && location.search === ''
                  ? 'text-[#20392F] font-semibold border-b-2 border-[#20392F]'
                  : 'text-[#1D1D1B]/80 hover:text-[#20392F]'
              }`}
            >
              Home
            </Link>

            <Link
              to="/shop?gender=Men"
              className={`transition-all duration-200 hover:text-[#20392F] flex items-center gap-1 ${
                location.search.includes('gender=Men') ? 'text-[#20392F] font-semibold' : 'text-[#1D1D1B]/80'
              }`}
            >
              <span>Men</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-60" />
            </Link>

            <Link
              to="/shop?gender=Women"
              className={`transition-all duration-200 hover:text-[#20392F] flex items-center gap-1 ${
                location.search.includes('gender=Women') ? 'text-[#20392F] font-semibold' : 'text-[#1D1D1B]/80'
              }`}
            >
              <span>Women</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-60" />
            </Link>

            <Link
              to="/shop?filter=new"
              className={`transition-all duration-200 hover:text-[#20392F] ${
                location.search.includes('filter=new') ? 'text-[#20392F] font-semibold' : 'text-[#1D1D1B]/80'
              }`}
            >
              New Arrivals
            </Link>

            <Link
              to="/shop?filter=bestsellers"
              className={`transition-all duration-200 hover:text-[#20392F] ${
                location.search.includes('filter=bestsellers') ? 'text-[#20392F] font-semibold' : 'text-[#1D1D1B]/80'
              }`}
            >
              Bestsellers
            </Link>

            <Link
              to="/shop?sale=true"
              className="transition-all duration-200 bg-[#671F27]/10 hover:bg-[#671F27]/15 text-[#671F27] border border-[#C99A45]/40 hover:border-[#C99A45] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-xs"
            >
              <DiyaDecoration size="sm" />
              <span>Diwali Sale</span>
            </Link>
          </nav>

          {/* Action Icons */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Search Icon */}
            <button
              onClick={onOpenSearch}
              className="p-2.5 text-[#1D1D1B] hover:text-[#20392F] hover:bg-[#EAE4D9]/60 rounded-full transition-all"
              title="Search products"
              aria-label="Search products"
            >
              <Search className="w-5 h-5 stroke-[1.8]" />
            </button>

            {/* Wishlist Icon with count badge */}
            <Link
              to="/wishlist"
              className="p-2.5 text-[#1D1D1B] hover:text-[#20392F] hover:bg-[#EAE4D9]/60 rounded-full transition-all relative"
              title="Wishlist"
              aria-label={`Wishlist (${wishlistCount} items)`}
            >
              <Heart className={`w-5 h-5 stroke-[1.8] ${wishlistCount > 0 ? 'text-[#C95745] fill-[#C95745]/20' : ''}`} />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 bg-[#C95745] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Icon with count badge */}
            <button
              onClick={openCart}
              className="p-2.5 text-[#1D1D1B] hover:text-[#20392F] hover:bg-[#EAE4D9]/60 rounded-full transition-all relative"
              title="Cart"
              aria-label={`Cart (${itemCount} items)`}
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.8]" />
              {itemCount > 0 && (
                <span className="absolute top-1 right-1 bg-[#20392F] text-[#F8F5F0] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                  {itemCount}
                </span>
              )}
            </button>

            {/* User Profile / Admin Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="p-2.5 text-[#1D1D1B] hover:text-[#20392F] hover:bg-[#EAE4D9]/60 rounded-full transition-all flex items-center"
                title="Account"
                aria-label="Account Menu"
              >
                <User className="w-5 h-5 stroke-[1.8]" />
              </button>

              {/* User Dropdown Menu */}
              {isUserMenuOpen && (
                <div 
                  className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-[#E8E2D8] py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  onMouseLeave={() => setIsUserMenuOpen(false)}
                >
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-xs text-gray-500">Welcome to VogueThread</p>
                    <p className="text-sm font-semibold text-[#1D1D1B]">
                      {isAdminAuthenticated ? 'Admin: Store Director' : 'Guest Customer'}
                    </p>
                  </div>

                  <Link
                    to="/orders"
                    className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#1D1D1B] hover:bg-[#F8F5F0] hover:text-[#20392F] transition-colors"
                  >
                    <Package className="w-4 h-4 text-gray-500" />
                    <span>My Demo Orders</span>
                  </Link>

                  <Link
                    to="/wishlist"
                    className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#1D1D1B] hover:bg-[#F8F5F0] hover:text-[#20392F] transition-colors"
                  >
                    <Heart className="w-4 h-4 text-gray-500" />
                    <span>My Wishlist ({wishlistCount})</span>
                  </Link>

                  <div className="border-t border-gray-100 my-1" />

                  {/* Admin Portal Shortcut */}
                  <Link
                    to="/admin"
                    className="flex items-center justify-between px-4 py-2.5 text-sm text-[#20392F] font-semibold hover:bg-[#20392F]/5 transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#20392F]" />
                      <span>Admin Dashboard</span>
                    </span>
                    <span className="text-[10px] bg-[#20392F] text-white px-2 py-0.5 rounded-full font-medium">
                      Portal
                    </span>
                  </Link>

                  {isAdminAuthenticated && (
                    <button
                      onClick={() => {
                        logout();
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left flex items-center gap-2.5 px-4 py-2 text-sm text-[#C95745] hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Admin Sign Out</span>
                    </button>
                  )}
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#F8F5F0] border-b border-[#E8E2D8] px-4 pt-3 pb-6 space-y-3">
          <Link
            to="/"
            className="block px-3 py-2 text-base font-medium text-[#1D1D1B] hover:bg-[#EAE4D9] rounded-lg"
          >
            Home
          </Link>
          <Link
            to="/shop?gender=Men"
            className="block px-3 py-2 text-base font-medium text-[#1D1D1B] hover:bg-[#EAE4D9] rounded-lg"
          >
            Men
          </Link>
          <Link
            to="/shop?gender=Women"
            className="block px-3 py-2 text-base font-medium text-[#1D1D1B] hover:bg-[#EAE4D9] rounded-lg"
          >
            Women
          </Link>
          <Link
            to="/shop?filter=new"
            className="block px-3 py-2 text-base font-medium text-[#1D1D1B] hover:bg-[#EAE4D9] rounded-lg"
          >
            New Arrivals
          </Link>
          <Link
            to="/shop?filter=bestsellers"
            className="block px-3 py-2 text-base font-medium text-[#1D1D1B] hover:bg-[#EAE4D9] rounded-lg"
          >
            Bestsellers
          </Link>
          <Link
            to="/shop?sale=true"
            className="block px-3 py-2 text-base font-bold text-[#C95745] hover:bg-red-50 rounded-lg"
          >
            ⚡ Sale (Up to 70% OFF)
          </Link>
          <div className="pt-2 border-t border-[#E8E2D8] space-y-1">
            <Link
              to="/orders"
              className="block px-3 py-2 text-sm text-[#1D1D1B] hover:bg-[#EAE4D9] rounded-lg"
            >
              Track Orders
            </Link>
            <Link
              to="/admin"
              className="block px-3 py-2 text-sm font-semibold text-[#20392F] hover:bg-[#20392F]/10 rounded-lg"
            >
              🛡️ Admin Dashboard (/admin)
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
