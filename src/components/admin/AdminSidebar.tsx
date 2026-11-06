import React from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Tag, 
  Package, 
  Settings, 
  LogOut, 
  Store, 
  X,
  ExternalLink
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useStore } from '../../context/StoreContext';

interface AdminSidebarProps {
  onCloseMobile?: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ onCloseMobile }) => {
  const { logout, adminUser } = useAuth();
  const { settings } = useStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navItems = [
    { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
    { to: '/admin/products', label: 'Products', icon: ShoppingBag },
    { to: '/admin/promotions', label: 'Promotions & Deals', icon: Tag },
    { to: '/admin/orders', label: 'Orders', icon: Package },
    { to: '/admin/settings', label: 'Store Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-[#152720] text-white flex flex-col justify-between h-full border-r border-[#20392F]">
      <div>
        {/* Brand Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="w-8 h-8 rounded-full bg-[#E9DFD3] text-[#20392F] flex items-center justify-center font-serif text-lg font-bold">
              🧵
            </span>
            <div>
              <span className="font-serif text-xl font-bold tracking-tight text-white block">
                {settings.storeName || 'VogueThread'}
              </span>
              <span className="text-[10px] text-[#E9DFD3]/70 font-mono tracking-widest uppercase">
                Admin Console
              </span>
            </div>
          </Link>

          {onCloseMobile && (
            <button onClick={onCloseMobile} className="lg:hidden text-white/60 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Navigation Links */}
        <nav className="p-4 space-y-1.5">
          {navItems.map(item => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={onCloseMobile}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-semibold tracking-wide transition-all ${
                    isActive
                      ? 'bg-[#20392F] text-[#E9DFD3] shadow-md border border-white/10'
                      : 'text-white/70 hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Footer User Info & Exit to Storefront */}
      <div className="p-4 border-t border-white/10 space-y-3">
        {/* View Customer Storefront */}
        <Link
          to="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between w-full px-4 py-2.5 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-white transition-colors"
        >
          <span className="flex items-center gap-2">
            <Store className="w-4 h-4 text-[#E9DFD3]" />
            <span>View Storefront</span>
          </span>
          <ExternalLink className="w-3.5 h-3.5 opacity-60" />
        </Link>

        {/* User Badge */}
        <div className="px-3 py-2 bg-black/20 rounded-xl flex items-center justify-between">
          <div className="text-xs">
            <p className="font-semibold text-white truncate max-w-[120px]">
              {adminUser?.name || 'Administrator'}
            </p>
            <p className="text-[10px] text-white/50 truncate max-w-[120px]">
              {adminUser?.email || 'admin@voguethread.com'}
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="p-1.5 text-white/60 hover:text-[#C95745] hover:bg-white/10 rounded-lg transition-colors"
            title="Log out of admin session"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
