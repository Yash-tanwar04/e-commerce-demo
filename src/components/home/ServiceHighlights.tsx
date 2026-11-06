import React from 'react';
import { Truck, RotateCcw, ShieldCheck, Headphones } from 'lucide-react';

export const ServiceHighlights: React.FC = () => {
  const highlights = [
    {
      icon: Truck,
      title: 'Free Shipping',
      description: 'On orders above ₹999'
    },
    {
      icon: RotateCcw,
      title: 'Easy Returns',
      description: '7-day hassle free returns'
    },
    {
      icon: ShieldCheck,
      title: 'Secure Payments',
      description: '100% safe & encrypted'
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      description: "We're always here for you"
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
      <div className="relative py-6 px-4 sm:px-6 rounded-2xl bg-[#F8F1E7]/70 border-y border-[#C99A45]/30 shadow-xs">
        
        {/* Subtle Decorative Golden Filigree at End Corners */}
        <div className="absolute top-2 left-3 text-[#C99A45] opacity-40 text-xs select-none">
          ✦
        </div>
        <div className="absolute top-2 right-3 text-[#C99A45] opacity-40 text-xs select-none">
          ✦
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={index} 
                className={`flex items-center gap-3.5 ${
                  index !== 0 ? 'md:border-l md:border-[#C99A45]/20 md:pl-6' : ''
                }`}
              >
                <div className="w-11 h-11 rounded-full bg-[#EAE0D0] border border-[#C99A45]/30 flex items-center justify-center shrink-0 text-[#20392F] shadow-xs">
                  <Icon className="w-5 h-5 stroke-[1.8]" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm sm:text-base text-[#1D1D1B] leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#89857E] mt-0.5 leading-tight">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
