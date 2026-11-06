import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShoppingBag } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-24 text-center">
      <span className="font-cursive text-4xl text-[#20392F]">Page Not Found</span>
      <h1 className="font-serif text-5xl sm:text-6xl font-extrabold text-[#1D1D1B] mt-2 mb-4">
        404
      </h1>
      <p className="text-sm text-[#89857E] max-w-md mx-auto leading-relaxed mb-8">
        The archive page or editorial collection you are seeking has been moved or does not exist.
      </p>
      <div className="flex justify-center gap-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-[#20392F] text-white px-6 py-3 rounded-full text-xs font-bold hover:bg-[#152720] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return Home</span>
        </Link>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 bg-white border border-[#E8E2D8] text-[#1D1D1B] px-6 py-3 rounded-full text-xs font-bold hover:bg-[#EAE4D9] transition-colors"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Explore Catalog</span>
        </Link>
      </div>
    </div>
  );
};
