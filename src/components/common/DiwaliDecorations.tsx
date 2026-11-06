import React from 'react';

// 1. Realistic Glowing Diya Decoration
interface DiyaDecorationProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  glow?: boolean;
}

export const DiyaDecoration: React.FC<DiyaDecorationProps> = ({
  size = 'md',
  className = '',
  glow = true
}) => {
  const sizeMap = {
    sm: { w: 20, h: 16 },
    md: { w: 32, h: 26 },
    lg: { w: 48, h: 38 }
  };

  const { w, h } = sizeMap[size];

  return (
    <div className={`relative inline-flex flex-col items-center select-none ${className}`}>
      {/* Outer Warm Light Aura Glow */}
      {glow && (
        <div
          className="absolute -top-2 w-8 h-8 rounded-full bg-[#F4C56A]/25 blur-md pointer-events-none"
          aria-hidden="true"
        />
      )}

      <svg
        width={w}
        height={h}
        viewBox="0 0 40 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
        aria-hidden="true"
      >
        <defs>
          {/* Flame Gradient */}
          <linearGradient id="flameGrad" x1="20" y1="2" x2="20" y2="17" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="25%" stopColor="#FFF2A1" />
            <stop offset="60%" stopColor="#F5A623" />
            <stop offset="100%" stopColor="#D9480F" />
          </linearGradient>

          {/* Diya Clay / Brass Gradient */}
          <linearGradient id="diyaGrad" x1="8" y1="14" x2="32" y2="28" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#D4A359" />
            <stop offset="40%" stopColor="#9C6B28" />
            <stop offset="80%" stopColor="#6E4413" />
            <stop offset="100%" stopColor="#4A2805" />
          </linearGradient>

          {/* Rim Gold Highlight */}
          <linearGradient id="goldRim" x1="6" y1="15" x2="34" y2="15" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ECC981" />
            <stop offset="50%" stopColor="#FFECC0" />
            <stop offset="100%" stopColor="#C99A45" />
          </linearGradient>
        </defs>

        {/* Flickering Animated Flame */}
        <g className="animate-flame" style={{ transformOrigin: '20px 16px' }}>
          {/* Outer Flame Glow */}
          <path
            d="M20 2C17.5 7 15 11 15 14.5C15 17.5 17.2 19 20 19C22.8 19 25 17.5 25 14.5C25 11 22.5 7 20 2Z"
            fill="url(#flameGrad)"
            opacity="0.95"
          />
          {/* Inner Hot Core */}
          <path
            d="M20 6C18.8 9.5 17.5 12 17.5 14C17.5 16 18.6 17 20 17C21.4 17 22.5 16 22.5 14C22.5 12 21.2 9.5 20 6Z"
            fill="#FFFBE8"
          />
        </g>

        {/* Diya Body (Traditional Terracotta / Brass Bowl) */}
        <path
          d="M6 16C6 16 9 26 20 26C31 26 34 16 34 16C34 16 31 19 20 19C9 19 6 16 6 16Z"
          fill="url(#diyaGrad)"
        />

        {/* Ornate Rim */}
        <ellipse cx="20" cy="16.5" rx="14" ry="2.2" fill="url(#goldRim)" />

        {/* Bottom pedestal stand */}
        <path
          d="M16 25.5H24C24 25.5 23 28 20 28C17 28 16 25.5 16 25.5Z"
          fill="#4A2805"
        />
      </svg>
    </div>
  );
};

// 2. Fairy Lights String along top
export const FairyLights: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`w-full overflow-hidden pointer-events-none select-none z-20 ${className}`}>
      <svg
        viewBox="0 0 1200 46"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-8 sm:h-11 object-cover"
        preserveAspectRatio="none"
      >
        {/* Swagged Wire Cable */}
        <path
          d="M0 2 Q 100 24, 200 8 Q 300 26, 400 6 Q 500 28, 600 7 Q 700 27, 800 6 Q 900 26, 1000 8 Q 1100 25, 1200 4"
          stroke="#42301C"
          strokeWidth="1.2"
          fill="none"
        />

        {/* Micro Bulbs along wire with alternating animation classes */}
        {[
          { cx: 50, cy: 18, anim: 'animate-fairy-1' },
          { cx: 100, cy: 23, anim: 'animate-fairy-2' },
          { cx: 150, cy: 16, anim: 'animate-fairy-3' },
          { cx: 200, cy: 8, anim: 'animate-fairy-1' },
          { cx: 250, cy: 19, anim: 'animate-fairy-2' },
          { cx: 300, cy: 25, anim: 'animate-fairy-3' },
          { cx: 350, cy: 16, anim: 'animate-fairy-1' },
          { cx: 400, cy: 6, anim: 'animate-fairy-2' },
          { cx: 450, cy: 20, anim: 'animate-fairy-3' },
          { cx: 500, cy: 27, anim: 'animate-fairy-1' },
          { cx: 550, cy: 18, anim: 'animate-fairy-2' },
          { cx: 600, cy: 7, anim: 'animate-fairy-3' },
          { cx: 650, cy: 21, anim: 'animate-fairy-1' },
          { cx: 700, cy: 26, anim: 'animate-fairy-2' },
          { cx: 750, cy: 16, anim: 'animate-fairy-3' },
          { cx: 800, cy: 6, anim: 'animate-fairy-1' },
          { cx: 850, cy: 19, anim: 'animate-fairy-2' },
          { cx: 900, cy: 25, anim: 'animate-fairy-3' },
          { cx: 950, cy: 17, anim: 'animate-fairy-1' },
          { cx: 1000, cy: 8, anim: 'animate-fairy-2' },
          { cx: 1050, cy: 20, anim: 'animate-fairy-3' },
          { cx: 1100, cy: 24, anim: 'animate-fairy-1' },
          { cx: 1150, cy: 14, anim: 'animate-fairy-2' }
        ].map((bulb, i) => (
          <g key={i} className={bulb.anim}>
            {/* Bulb cap */}
            <rect x={bulb.cx - 1} y={bulb.cy - 2} width="2" height="2" fill="#5A4A35" />
            {/* Bulb glow */}
            <circle cx={bulb.cx} cy={bulb.cy + 3} r="5" fill="#F4C56A" opacity="0.3" filter="blur(1px)" />
            {/* Bulb teardrop */}
            <circle cx={bulb.cx} cy={bulb.cy + 2.5} r="2.4" fill="#FFF2B2" />
          </g>
        ))}
      </svg>
    </div>
  );
};

// 3. Ornate Brass Hanging Lantern (Kandil / Fanoos)
export const HangingLantern: React.FC<{ height?: number; className?: string }> = ({
  height = 140,
  className = ''
}) => {
  return (
    <div className={`relative flex flex-col items-center animate-lantern select-none ${className}`}>
      <svg
        width={height * 0.42}
        height={height}
        viewBox="0 0 60 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        <defs>
          <linearGradient id="brassGrad" x1="0" y1="0" x2="60" y2="140" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ECC981" />
            <stop offset="40%" stopColor="#C99A45" />
            <stop offset="70%" stopColor="#8F641B" />
            <stop offset="100%" stopColor="#543708" />
          </linearGradient>
          <radialGradient id="lanternGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFF7D6" />
            <stop offset="40%" stopColor="#F4C56A" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#C99A45" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Chain from ceiling */}
        <line x1="30" y1="0" x2="30" y2="35" stroke="url(#brassGrad)" strokeWidth="1.5" strokeDasharray="3 2" />
        <circle cx="30" cy="36" r="3" fill="url(#brassGrad)" />

        {/* Lantern Top Dome */}
        <path d="M18 52 C 18 40, 42 40, 42 52 Z" fill="url(#brassGrad)" />
        <rect x="22" y="38" width="16" height="4" rx="1" fill="url(#brassGrad)" />

        {/* Glowing Glass Body */}
        <rect x="16" y="52" width="28" height="42" rx="3" fill="url(#lanternGlow)" />

        {/* Brass Jali Grille Lattice */}
        <rect x="15" y="52" width="30" height="42" rx="2" stroke="url(#brassGrad)" strokeWidth="2" fill="none" />
        <line x1="25" y1="52" x2="25" y2="94" stroke="url(#brassGrad)" strokeWidth="1.2" />
        <line x1="35" y1="52" x2="35" y2="94" stroke="url(#brassGrad)" strokeWidth="1.2" />
        <line x1="15" y1="66" x2="45" y2="66" stroke="url(#brassGrad)" strokeWidth="1" />
        <line x1="15" y1="80" x2="45" y2="80" stroke="url(#brassGrad)" strokeWidth="1" />

        {/* Center Candle Flame inside */}
        <ellipse cx="30" cy="74" rx="2.5" ry="5.5" fill="#FFFBE8" className="animate-flame" />

        {/* Lantern Base */}
        <path d="M16 94 H 44 L 38 104 H 22 Z" fill="url(#brassGrad)" />

        {/* Bottom Finial / Pendant */}
        <circle cx="30" cy="107" r="2.5" fill="url(#brassGrad)" />
        <path d="M30 110 L 32 118 L 30 120 L 28 118 Z" fill="url(#brassGrad)" />
      </svg>
    </div>
  );
};

// 4. Marigold Flower Garland (Genda Phool)
export const MarigoldGarland: React.FC<{ length?: number; className?: string }> = ({
  length = 6,
  className = ''
}) => {
  return (
    <div className={`flex flex-col items-center gap-1.5 select-none pointer-events-none ${className}`}>
      {Array.from({ length }).map((_, i) => (
        <div key={i} className="relative">
          {/* Marigold flower bloom */}
          <div
            className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full shadow-sm flex items-center justify-center ${
              i % 2 === 0
                ? 'bg-gradient-to-br from-[#FFA726] via-[#FB8C00] to-[#E65100]'
                : 'bg-gradient-to-br from-[#FFEE58] via-[#FDD835] to-[#F57F17]'
            }`}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#BF360C]/60" />
          </div>
        </div>
      ))}
    </div>
  );
};

// 5. Traditional Golden Flourish Divider with Central Diya
export const FestiveDivider: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`inline-flex items-center gap-2 text-[#C99A45] ${className}`}>
      {/* Left Floral Filigree */}
      <svg width="42" height="12" viewBox="0 0 42 12" fill="none" className="opacity-80">
        <path
          d="M0 6H24M24 6C26 3 30 1 34 6C30 11 26 9 24 6ZM34 6C36 4 38 3 40 6"
          stroke="#C99A45"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <circle cx="41" cy="6" r="1.5" fill="#C99A45" />
      </svg>

      {/* Center Mini Diya */}
      <DiyaDecoration size="sm" />

      {/* Right Floral Filigree (Mirrored) */}
      <svg width="42" height="12" viewBox="0 0 42 12" fill="none" className="opacity-80 rotate-180">
        <path
          d="M0 6H24M24 6C26 3 30 1 34 6C30 11 26 9 24 6ZM34 6C36 4 38 3 40 6"
          stroke="#C99A45"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <circle cx="41" cy="6" r="1.5" fill="#C99A45" />
      </svg>
    </div>
  );
};

// 6. Intricate Traditional Golden Mandala Border Pattern (For Flash Sale / Banners)
export const FestiveMandalaBorder: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <svg
      viewBox="0 0 100 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none pointer-events-none opacity-40 ${className}`}
    >
      <circle cx="0" cy="60" r="45" stroke="#C99A45" strokeWidth="1" strokeDasharray="3 2" />
      <circle cx="0" cy="60" r="35" stroke="#F4C56A" strokeWidth="1.2" />
      <circle cx="0" cy="60" r="22" stroke="#ECC981" strokeWidth="0.8" />
      {/* Paisley/Lotus Petals */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * 22.5) - 45;
        return (
          <path
            key={i}
            d={`M 0 60 Q 30 ${60 + (i - 4) * 10} 42 ${60 + (i - 4) * 8}`}
            stroke="#ECC981"
            strokeWidth="0.9"
            strokeLinecap="round"
            transform={`rotate(${angle} 0 60)`}
          />
        );
      })}
    </svg>
  );
};

// 7. Subtle Golden Fireworks Burst Sparkle
export const FestiveFireworkBurst: React.FC<{ className?: string; size?: number }> = ({
  className = '',
  size = 70
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      className={`pointer-events-none select-none opacity-30 ${className}`}
    >
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, i) => (
        <g key={i} transform={`rotate(${deg} 50 50)`}>
          <line x1="50" y1="20" x2="50" y2="40" stroke="#F4C56A" strokeWidth="1" strokeDasharray="1 3" />
          <circle cx="50" cy="18" r="1.5" fill="#FFE8A3" />
          <circle cx="50" cy="27" r="1" fill="#C99A45" />
        </g>
      ))}
      <circle cx="50" cy="50" r="3" fill="#FFECC0" />
    </svg>
  );
};
