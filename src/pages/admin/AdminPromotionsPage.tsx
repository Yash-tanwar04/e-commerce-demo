import React, { useState } from 'react';
import { 
  Plus, 
  Tag, 
  Clock, 
  Edit2, 
  Trash2, 
  RotateCcw, 
  Check, 
  X, 
  ExternalLink,
  Zap,
  Sparkles
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { PromotionModal } from '../../components/admin/PromotionModal';
import { Promotion } from '../../types';
import { CountdownTimer } from '../../components/common/CountdownTimer';

export const AdminPromotionsPage: React.FC = () => {
  const { promotions, deletePromotion, updatePromotion, togglePromotionStatus } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPromo, setEditingPromo] = useState<Promotion | null>(null);

  const handleOpenAdd = () => {
    setEditingPromo(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (promo: Promotion) => {
    setEditingPromo(promo);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Delete promotion "${title}"?`)) {
      deletePromotion(id);
    }
  };

  // Restart / Extend countdown by N hours
  const handleRestartCountdown = (promo: Promotion, hours: number = 3) => {
    const newEnd = new Date();
    newEnd.setHours(newEnd.getHours() + hours);
    newEnd.setMinutes(newEnd.getMinutes() + 18);
    newEnd.setSeconds(newEnd.getSeconds() + 34);

    updatePromotion(promo.id, {
      endDate: newEnd.toISOString(),
      isActive: true
    });
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#1D1D1B]">
            Promotions & Live Deals
          </h1>
          <p className="text-xs sm:text-sm text-[#89857E] mt-1">
            Manage top announcement bars, flash sale countdowns, and floating 70% OFF popups in real-time.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="bg-[#20392F] hover:bg-[#152720] text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Promotion Campaign</span>
        </button>
      </div>

      {/* Promotions Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {promotions.map(promo => {
          const isExpired = new Date(promo.endDate).getTime() <= Date.now();

          return (
            <div
              key={promo.id}
              className={`bg-white rounded-3xl p-6 border shadow-sm transition-all flex flex-col justify-between ${
                promo.isActive ? 'border-[#20392F]/40' : 'border-[#E8E2D8] opacity-75'
              }`}
            >
              <div>
                {/* Header row */}
                <div className="flex items-start justify-between gap-2 pb-3 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-[#20392F]/10 text-[#20392F] px-2.5 py-1 rounded-full">
                      {promo.type.replace('_', ' ')}
                    </span>
                    {promo.discountPercentage > 0 && (
                      <span className="text-[10px] font-bold bg-[#C95745] text-white px-2 py-0.5 rounded-full">
                        {promo.discountPercentage}% OFF
                      </span>
                    )}
                  </div>

                  {/* Status Toggle Button */}
                  <button
                    onClick={() => togglePromotionStatus(promo.id)}
                    className={`text-[10px] font-bold px-2.5 py-1 rounded-full transition-colors ${
                      promo.isActive
                        ? 'bg-green-100 text-green-800 hover:bg-green-200'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {promo.isActive ? '● Live on Store' : '○ Disabled'}
                  </button>
                </div>

                {/* Body */}
                <div className="mt-4 space-y-2">
                  <h3 className="font-serif text-xl font-bold text-[#1D1D1B]">
                    {promo.title}
                  </h3>
                  <p className="text-xs text-[#89857E] leading-relaxed">
                    {promo.description}
                  </p>

                  <div className="flex items-center gap-2 text-xs pt-1">
                    <span className="text-[#89857E]">CTA:</span>
                    <strong className="text-[#1D1D1B]">{promo.ctaText}</strong>
                    <span className="text-gray-300">→</span>
                    <span className="font-mono text-gray-500 text-[11px]">{promo.ctaLink}</span>
                  </div>
                </div>

                {/* Live Countdown Monitor Box */}
                {promo.isCountdownEnabled && (
                  <div className="mt-4 p-3 bg-[#F8F5F0] rounded-2xl border border-[#E8E2D8] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#20392F]" />
                      <span className="text-xs font-semibold text-[#1D1D1B]">Live Countdown:</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <CountdownTimer endDate={promo.endDate} variant="compact" />
                      <button
                        onClick={() => handleRestartCountdown(promo, 3)}
                        className="text-[10px] bg-white border border-[#E8E2D8] hover:bg-[#EAE4D9] text-[#20392F] font-bold px-2.5 py-1 rounded-lg flex items-center gap-1 transition-colors"
                        title="Reset timer to 3 hours from now"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Restart</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-5 mt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-[11px] text-gray-400">
                  Target: {new Date(promo.endDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenEdit(promo)}
                    className="p-2 text-gray-600 hover:text-[#20392F] hover:bg-gray-100 rounded-xl transition-colors"
                    title="Edit Promotion"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(promo.id, promo.title)}
                    className="p-2 text-gray-400 hover:text-[#C95745] hover:bg-red-50 rounded-xl transition-colors"
                    title="Delete Promotion"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* Promotion Modal */}
      <PromotionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        promotionToEdit={editingPromo}
      />
    </div>
  );
};
