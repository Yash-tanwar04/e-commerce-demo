import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Lock, Mail, ArrowRight, ArrowLeft, KeyRound, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AdminLoginPage: React.FC = () => {
  const { login, isAdminAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  // If already authenticated, redirect
  React.useEffect(() => {
    if (isAdminAuthenticated) {
      navigate('/admin');
    }
  }, [isAdminAuthenticated, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const success = login(email, password);
    if (success) {
      navigate('/admin');
    } else {
      setError('Invalid credentials. Use admin@voguethread.com and admin123');
    }
  };

  const handleFillDemo = () => {
    setEmail('admin@voguethread.com');
    setPassword('admin123');
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#F8F5F0] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      
      {/* Return to Store */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4 mb-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#89857E] hover:text-[#20392F] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Customer Store</span>
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4">
        {/* Brand Header */}
        <div className="text-center mb-6">
          <span className="w-12 h-12 rounded-2xl bg-[#20392F] text-[#E9DFD3] inline-flex items-center justify-center font-serif text-2xl font-bold shadow-md mb-3">
            🧵
          </span>
          <h1 className="font-serif text-3xl font-bold tracking-tight text-[#1D1D1B]">
            VogueThread Admin
          </h1>
          <p className="text-xs text-[#89857E] mt-1.5">
            Store Management & Promotion Control Dashboard
          </p>
        </div>

        {/* Card */}
        <div className="bg-white py-8 px-6 sm:px-10 rounded-3xl border border-[#E8E2D8] shadow-xl">
          
          {/* Quick Demo Credential Banner */}
          <div className="mb-6 p-3.5 bg-[#EAE4D9]/60 rounded-2xl border border-[#E8E2D8] flex items-center justify-between gap-2">
            <div className="text-xs">
              <span className="font-bold text-[#1D1D1B] block">Demo Credentials:</span>
              <span className="text-[#89857E] text-[11px]">admin@voguethread.com / admin123</span>
            </div>
            <button
              type="button"
              onClick={handleFillDemo}
              className="text-xs font-bold bg-[#20392F] text-white px-3 py-1.5 rounded-xl hover:bg-[#152720] transition-colors shrink-0 flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3" />
              <span>Auto-Fill</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#1D1D1B] uppercase tracking-wider mb-1">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="admin@voguethread.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full text-xs pl-10 pr-3 py-3 bg-[#F8F5F0] border border-[#E8E2D8] rounded-xl focus:outline-none focus:border-[#20392F]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1D1D1B] uppercase tracking-wider mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="admin123"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full text-xs pl-10 pr-3 py-3 bg-[#F8F5F0] border border-[#E8E2D8] rounded-xl focus:outline-none focus:border-[#20392F]"
                />
              </div>
            </div>

            {error && (
              <p className="text-xs text-red-600 bg-red-50 p-2.5 rounded-xl font-medium">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-[#20392F] hover:bg-[#152720] text-white py-3.5 px-4 rounded-xl text-xs font-bold tracking-wider uppercase transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 mt-2"
            >
              <KeyRound className="w-4 h-4" />
              <span>Enter Management Portal</span>
            </button>
          </form>

          <p className="text-[11px] text-gray-400 text-center mt-6">
            Frontend demonstration prototype • Stored securely in client storage
          </p>
        </div>
      </div>
    </div>
  );
};
