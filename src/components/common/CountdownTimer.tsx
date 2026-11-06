import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  endDate: string;
  onExpire?: () => void;
  variant?: 'banner' | 'card' | 'compact';
  showDays?: boolean;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
  totalSeconds: number;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  endDate,
  onExpire,
  variant = 'banner'
}) => {
  const calculateTime = (): TimeRemaining => {
    const target = new Date(endDate).getTime();
    const now = new Date().getTime();
    const diff = target - now;

    if (isNaN(target) || diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true, totalSeconds: 0 };
    }

    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600) + days * 24; // Combine days into hours if needed, matching the "02 : 18 : 34" format from reference
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return { days, hours, minutes, seconds, isExpired: false, totalSeconds };
  };

  const [time, setTime] = useState<TimeRemaining>(calculateTime);

  useEffect(() => {
    // Initial check
    const initial = calculateTime();
    setTime(initial);
    if (initial.isExpired && onExpire) {
      onExpire();
    }

    const interval = setInterval(() => {
      const remaining = calculateTime();
      setTime(remaining);
      if (remaining.isExpired) {
        clearInterval(interval);
        if (onExpire) {
          onExpire();
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [endDate]);

  const pad = (num: number) => String(num).padStart(2, '0');

  if (time.isExpired) {
    return (
      <span className="text-xs uppercase tracking-wider font-semibold text-[#C95745] bg-[#C95745]/10 px-2.5 py-1 rounded-full">
        Offer Expired
      </span>
    );
  }

  // Exact reproduction of the UI reference countdown boxes!
  // E.g.: [ 02 ] : [ 18 ] : [ 34 ]
  //      Hours     Minutes  Seconds
  if (variant === 'banner') {
    return (
      <div className="flex items-center gap-1.5 text-white select-none">
        {/* Hours */}
        <div className="flex flex-col items-center">
          <div className="bg-[#152720]/95 border border-[#C99A45]/50 rounded-md px-2 py-1 min-w-[34px] text-center shadow-inner">
            <span className="text-sm md:text-base font-bold font-mono tracking-tight leading-none text-[#FFECC0]">
              {pad(time.hours)}
            </span>
          </div>
          <span className="text-[9px] uppercase tracking-wider text-[#F4C56A]/80 font-sans mt-0.5">Hours</span>
        </div>

        <span className="text-[#F4C56A]/70 font-bold mb-3">:</span>

        {/* Minutes */}
        <div className="flex flex-col items-center">
          <div className="bg-[#152720]/95 border border-[#C99A45]/50 rounded-md px-2 py-1 min-w-[34px] text-center shadow-inner">
            <span className="text-sm md:text-base font-bold font-mono tracking-tight leading-none text-[#FFECC0]">
              {pad(time.minutes)}
            </span>
          </div>
          <span className="text-[9px] uppercase tracking-wider text-[#F4C56A]/80 font-sans mt-0.5">Minutes</span>
        </div>

        <span className="text-[#F4C56A]/70 font-bold mb-3">:</span>

        {/* Seconds */}
        <div className="flex flex-col items-center">
          <div className="bg-[#152720]/95 border border-[#C99A45]/50 rounded-md px-2 py-1 min-w-[34px] text-center shadow-inner">
            <span className="text-sm md:text-base font-bold font-mono tracking-tight leading-none text-[#FFECC0]">
              {pad(time.seconds)}
            </span>
          </div>
          <span className="text-[9px] uppercase tracking-wider text-[#F4C56A]/80 font-sans mt-0.5">Seconds</span>
        </div>
      </div>
    );
  }

  if (variant === 'card') {
    return (
      <div className="flex items-center gap-1.5 text-white">
        <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-md px-2 py-1 min-w-[32px] text-center">
          <span className="text-xs font-bold font-mono leading-none text-white">{pad(time.hours)}</span>
          <span className="block text-[8px] text-white/70 uppercase">h</span>
        </div>
        <span className="text-white/60 font-bold">:</span>
        <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-md px-2 py-1 min-w-[32px] text-center">
          <span className="text-xs font-bold font-mono leading-none text-white">{pad(time.minutes)}</span>
          <span className="block text-[8px] text-white/70 uppercase">m</span>
        </div>
        <span className="text-white/60 font-bold">:</span>
        <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-md px-2 py-1 min-w-[32px] text-center">
          <span className="text-xs font-bold font-mono leading-none text-white">{pad(time.seconds)}</span>
          <span className="block text-[8px] text-white/70 uppercase">s</span>
        </div>
      </div>
    );
  }

  // Compact variant
  return (
    <div className="inline-flex items-center gap-1 font-mono text-xs font-semibold px-2 py-1 rounded bg-[#20392F]/10 text-[#20392F]">
      <span>{pad(time.hours)}</span>:<span>{pad(time.minutes)}</span>:<span>{pad(time.seconds)}</span>
    </div>
  );
};
