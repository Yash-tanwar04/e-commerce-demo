import React, { useState, useEffect } from 'react';
import { X, Tag, Clock, Sparkles, AlertCircle } from 'lucide-react';
import { Promotion } from '../../types';
import { useStore } from '../../context/StoreContext';

interface PromotionModalProps {
  isOpen: boolean;
  onClose: () => void;
  promotionToEdit?: Promotion | null;
}

export const PromotionModal: React.FC<PromotionModalProps> = ({
  isOpen,
  onClose,
  promotionToEdit
}) => {
  const { addPromotion, updatePromotion } = useStore();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState<number>(70);
  const [type, setType] = useState<Promotion['type']>('flash_sale');
  const [bannerImage, setBannerImage] = useState('');
  const [ctaText, setCtaText] = useState('Shop Now');
  const [ctaLink, setCtaLink] = useState('/shop?sale=true');
  const [badgeText, setBadgeText] = useState('⚡ Limited Time Offer!');
  const [hoursFromNow, setHoursFromNow] = useState<number>(3);
  const [isCountdownEnabled, setIsCountdownEnabled] = useState(true);
  const [isPopupEnabled, setIsPopupEnabled] = useState(false);
  const [popupDelaySeconds, setPopupDelaySeconds] = useState(2);
  const [popupFrequency, setPopupFrequency] = useState<'always' | 'once_per_session' | 'daily'>('once_per_session');
  const [isActive, setIsActive] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (promotionToEdit) {
      setTitle(promotionToEdit.title);
      setDescription(promotionToEdit.description);
      setDiscountPercentage(promotionToEdit.discountPercentage);
      setType(promotionToEdit.type);
      setBannerImage(promotionToEdit.bannerImage || '');
      setCtaText(promotionToEdit.ctaText);
      setCtaLink(promotionToEdit.ctaLink);
      setBadgeText(promotionToEdit.badgeText || '');
      setIsCountdownEnabled(promotionToEdit.isCountdownEnabled);
      setIsPopupEnabled(promotionToEdit.isPopupEnabled);
      setPopupDelaySeconds(promotionToEdit.popupDelaySeconds || 2);
      setPopupFrequency(promotionToEdit.popupFrequency || 'once_per_session');
      setIsActive(promotionToEdit.isActive);
    } else {
      setTitle('Flash Sale Extravaganza');
      setDescription('Grab your favorites at unbelievable prices!');
      setDiscountPercentage(70);
      setType('flash_sale');
      setBannerImage('');
      setCtaText('Shop Now');
      setCtaLink('/shop?sale=true');
      setBadgeText('⚡ Limited Time Offer!');
      setHoursFromNow(4);
      setIsCountdownEnabled(true);
      setIsPopupEnabled(false);
      setPopupDelaySeconds(2);
      setPopupFrequency('once_per_session');
      setIsActive(true);
    }
    setError(null);
  }, [promotionToEdit, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Promotion title is required.');
      return;
    }

    const calculatedEndDate = new Date();
    calculatedEndDate.setHours(calculatedEndDate.getHours() + hoursFromNow);

    const promoPayload = {
      title: title.trim(),
      description: description.trim(),
      discountPercentage: Number(discountPercentage),
      type,
      bannerImage: bannerImage.trim() || undefined,
      ctaText: ctaText.trim() || 'Shop Now',
      ctaLink: ctaLink.trim() || '/shop?sale=true',
      badgeText: badgeText.trim() || undefined,
      startDate: new Date().toISOString(),
      endDate: promotionToEdit ? promotionToEdit.endDate : calculatedEndDate.toISOString(),
      isCountdownEnabled,
      isPopupEnabled,
      popupDelaySeconds: Number(popupDelaySeconds),
      popupFrequency,
      isActive
    };

    if (promotionToEdit) {
      updatePromotion(promotionToEdit.id, promoPayload);
    } else {
      addPromotion(promoPayload);
    }

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="min-h-screen px-4 text-center flex items-center justify-center py-10">
        <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#E8E2D8] overflow-hidden text-left relative z-10">
          
          {/* Header */}
          <div className="px-6 py-5 bg-[#20392F] text-white flex items-center justify-between">
            <h2 className="font-serif text-xl font-bold flex items-center gap-2">
              <Tag className="w-5 h-5" />
              <span>{promotionToEdit ? 'Configure Promotion' : 'Create Promotion Campaign'}</span>
            </h2>
            <button onClick={onClose} className="p-1.5 text-white/70 hover:text-white rounded-full">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5 max-h-[80vh] overflow-y-auto">
            {error && (
              <p className="text-xs text-red-600 bg-red-50 p-3 rounded-xl flex items-center gap-1.5 font-semibold">
                <AlertCircle className="w-4 h-4" />
                <span>{error}</span>
              </p>
            )}

            {/* Title & Type */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#1D1D1B] uppercase tracking-wider mb-1">
                  Campaign Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Flash Sale"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full text-xs p-3 bg-[#F8F5F0] border border-[#E8E2D8] rounded-xl focus:outline-none focus:border-[#20392F]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1D1D1B] uppercase tracking-wider mb-1">
                  Placement Type *
                </label>
                <select
                  value={type}
                  onChange={e => setType(e.target.value as any)}
                  className="w-full text-xs p-3 bg-[#F8F5F0] border border-[#E8E2D8] rounded-xl focus:outline-none focus:border-[#20392F]"
                >
                  <option value="flash_sale">Flash Sale Banner (Homepage)</option>
                  <option value="announcement_bar">Top Announcement Bar</option>
                  <option value="popup_modal">70% Discount Popup Modal</option>
                  <option value="hero">Hero Slider Promo</option>
                  <option value="banner">Editorial Banner</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-[#1D1D1B] uppercase tracking-wider mb-1">
                  Promotional Message / Subtitle
                </label>
                <input
                  type="text"
                  placeholder="e.g. Grab your favorites at unbelievable prices!"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  className="w-full text-xs p-3 bg-[#F8F5F0] border border-[#E8E2D8] rounded-xl focus:outline-none focus:border-[#20392F]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1D1D1B] uppercase tracking-wider mb-1">
                  Discount Percentage (%)
                </label>
                <input
                  type="number"
                  min="5"
                  max="90"
                  value={discountPercentage}
                  onChange={e => setDiscountPercentage(Number(e.target.value))}
                  className="w-full text-xs p-3 bg-[#F8F5F0] border border-[#E8E2D8] rounded-xl font-bold text-[#C95745]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1D1D1B] uppercase tracking-wider mb-1">
                  Badge Tag
                </label>
                <input
                  type="text"
                  placeholder="e.g. ⚡ Limited Time Offer!"
                  value={badgeText}
                  onChange={e => setBadgeText(e.target.value)}
                  className="w-full text-xs p-3 bg-[#F8F5F0] border border-[#E8E2D8] rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1D1D1B] uppercase tracking-wider mb-1">
                  Button CTA Text
                </label>
                <input
                  type="text"
                  value={ctaText}
                  onChange={e => setCtaText(e.target.value)}
                  className="w-full text-xs p-3 bg-[#F8F5F0] border border-[#E8E2D8] rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1D1D1B] uppercase tracking-wider mb-1">
                  Destination Link
                </label>
                <input
                  type="text"
                  value={ctaLink}
                  onChange={e => setCtaLink(e.target.value)}
                  className="w-full text-xs p-3 bg-[#F8F5F0] border border-[#E8E2D8] rounded-xl"
                />
              </div>
            </div>

            {/* Countdown Configuration */}
            <div className="p-4 bg-[#F8F5F0] rounded-2xl border border-[#E8E2D8] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#1D1D1B] uppercase tracking-wider flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#20392F]" />
                  <span>Countdown Timer Settings</span>
                </span>
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold">
                  <input
                    type="checkbox"
                    checked={isCountdownEnabled}
                    onChange={e => setIsCountdownEnabled(e.target.checked)}
                    className="accent-[#20392F]"
                  />
                  <span>Enable Live Countdown</span>
                </label>
              </div>

              {isCountdownEnabled && (
                <div className="pt-2">
                  <label className="block text-[11px] text-[#89857E] mb-1">
                    Set Expiry Duration: <strong>{hoursFromNow} Hours from now</strong>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="72"
                    step="1"
                    value={hoursFromNow}
                    onChange={e => setHoursFromNow(Number(e.target.value))}
                    className="w-full accent-[#20392F]"
                  />
                  <div className="flex justify-between text-[10px] text-gray-500">
                    <span>1 hour</span>
                    <span>24 hours</span>
                    <span>72 hours</span>
                  </div>
                </div>
              )}
            </div>

            {/* Popup Modal Behavior */}
            {type === 'popup_modal' && (
              <div className="p-4 bg-[#EAE4D9]/40 rounded-2xl border border-[#E8E2D8] space-y-3">
                <span className="text-xs font-bold text-[#1D1D1B] uppercase tracking-wider block">
                  Popup Display Logic
                </span>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-[11px] text-gray-600 mb-1">Delay Before Showing</label>
                    <select
                      value={popupDelaySeconds}
                      onChange={e => setPopupDelaySeconds(Number(e.target.value))}
                      className="w-full p-2 bg-white border border-[#E8E2D8] rounded-xl"
                    >
                      <option value="1">1 second</option>
                      <option value="2">2 seconds (default)</option>
                      <option value="5">5 seconds</option>
                      <option value="10">10 seconds</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] text-gray-600 mb-1">Display Frequency</label>
                    <select
                      value={popupFrequency}
                      onChange={e => setPopupFrequency(e.target.value as any)}
                      className="w-full p-2 bg-white border border-[#E8E2D8] rounded-xl"
                    >
                      <option value="once_per_session">Once Per Session</option>
                      <option value="always">Always (Every render)</option>
                      <option value="daily">Once Per 24 Hours</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Active Toggle */}
            <div className="pt-2 border-t border-[#E8E2D8]">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-[#1D1D1B]">
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={e => setIsActive(e.target.checked)}
                  className="w-4 h-4 accent-[#20392F]"
                />
                <span>Active Campaign (Immediately visible on customer storefront)</span>
              </label>
            </div>

            {/* Submit */}
            <div className="pt-4 border-t border-[#E8E2D8] flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 rounded-full border border-[#E8E2D8] text-xs font-semibold text-[#89857E]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-[#20392F] hover:bg-[#152720] text-white px-8 py-2.5 rounded-full text-xs font-bold shadow-md"
              >
                {promotionToEdit ? 'Update Promotion' : 'Launch Promotion'}
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
};
