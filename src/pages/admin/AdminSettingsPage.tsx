import React, { useState } from 'react';
import { Settings, Save, RotateCcw, Check, AlertTriangle, ShieldCheck } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const AdminSettingsPage: React.FC = () => {
  const { settings, updateSettings, resetToDemoData } = useStore();

  const [storeName, setStoreName] = useState(settings.storeName);
  const [currencySymbol, setCurrencySymbol] = useState(settings.currencySymbol);
  const [shippingCharges, setShippingCharges] = useState(settings.shippingCharges);
  const [freeShippingThreshold, setFreeShippingThreshold] = useState(settings.freeShippingThreshold);
  const [contactEmail, setContactEmail] = useState(settings.contactEmail);
  const [contactPhone, setContactPhone] = useState(settings.contactPhone);
  const [announcementEnabled, setAnnouncementEnabled] = useState(settings.announcementEnabled);
  const [announcementText, setAnnouncementText] = useState(settings.announcementText);
  const [isSaved, setIsSaved] = useState(false);
  const [isResetDone, setIsResetDone] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      storeName: storeName.trim(),
      currencySymbol,
      shippingCharges: Number(shippingCharges),
      freeShippingThreshold: Number(freeShippingThreshold),
      contactEmail: contactEmail.trim(),
      contactPhone: contactPhone.trim(),
      announcementEnabled,
      announcementText: announcementText.trim()
    });

    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleResetData = () => {
    if (window.confirm('Reset all catalog items, demo orders, promotions, and settings back to default factory demo state?')) {
      resetToDemoData();
      setIsResetDone(true);
      setTimeout(() => setIsResetDone(false), 3000);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      
      {/* Title */}
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#1D1D1B]">
          Store Settings & Configuration
        </h1>
        <p className="text-xs sm:text-sm text-[#89857E] mt-1">
          Configure branding, currency standards, fulfillment thresholds, and demo storage state.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Brand & Store Identity */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E8E2D8] shadow-sm space-y-4">
          <h2 className="font-serif text-lg font-bold text-[#1D1D1B] pb-2 border-b border-[#E8E2D8]">
            Brand & Identity
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-[#1D1D1B] uppercase tracking-wider mb-1">
                Store Name
              </label>
              <input
                type="text"
                value={storeName}
                onChange={e => setStoreName(e.target.value)}
                className="w-full p-3 bg-[#F8F5F0] border border-[#E8E2D8] rounded-xl focus:outline-none focus:border-[#20392F]"
              />
            </div>

            <div>
              <label className="block font-bold text-[#1D1D1B] uppercase tracking-wider mb-1">
                Currency Symbol
              </label>
              <input
                type="text"
                value={currencySymbol}
                onChange={e => setCurrencySymbol(e.target.value)}
                className="w-full p-3 bg-[#F8F5F0] border border-[#E8E2D8] rounded-xl focus:outline-none focus:border-[#20392F]"
              />
            </div>

            <div>
              <label className="block font-bold text-[#1D1D1B] uppercase tracking-wider mb-1">
                Concierge Contact Email
              </label>
              <input
                type="email"
                value={contactEmail}
                onChange={e => setContactEmail(e.target.value)}
                className="w-full p-3 bg-[#F8F5F0] border border-[#E8E2D8] rounded-xl focus:outline-none focus:border-[#20392F]"
              />
            </div>

            <div>
              <label className="block font-bold text-[#1D1D1B] uppercase tracking-wider mb-1">
                Customer Support Helpline
              </label>
              <input
                type="text"
                value={contactPhone}
                onChange={e => setContactPhone(e.target.value)}
                className="w-full p-3 bg-[#F8F5F0] border border-[#E8E2D8] rounded-xl focus:outline-none focus:border-[#20392F]"
              />
            </div>
          </div>
        </div>

        {/* Shipping & Delivery Charges */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E8E2D8] shadow-sm space-y-4">
          <h2 className="font-serif text-lg font-bold text-[#1D1D1B] pb-2 border-b border-[#E8E2D8]">
            Logistics & Shipping Rules
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-[#1D1D1B] uppercase tracking-wider mb-1">
                Standard Shipping Fee (₹)
              </label>
              <input
                type="number"
                min="0"
                value={shippingCharges}
                onChange={e => setShippingCharges(Number(e.target.value))}
                className="w-full p-3 bg-[#F8F5F0] border border-[#E8E2D8] rounded-xl focus:outline-none focus:border-[#20392F]"
              />
              <span className="text-[11px] text-gray-500 mt-0.5 block">
                Applied when order subtotal is below the threshold.
              </span>
            </div>

            <div>
              <label className="block font-bold text-[#1D1D1B] uppercase tracking-wider mb-1">
                Free Shipping Threshold (₹)
              </label>
              <input
                type="number"
                min="0"
                value={freeShippingThreshold}
                onChange={e => setFreeShippingThreshold(Number(e.target.value))}
                className="w-full p-3 bg-[#F8F5F0] border border-[#E8E2D8] rounded-xl focus:outline-none focus:border-[#20392F]"
              />
              <span className="text-[11px] text-gray-500 mt-0.5 block">
                Orders equal or exceeding this value receive complimentary delivery.
              </span>
            </div>
          </div>
        </div>

        {/* Announcement Bar Control */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E8E2D8] shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#E8E2D8]">
            <h2 className="font-serif text-lg font-bold text-[#1D1D1B]">
              Top Announcement Bar
            </h2>
            <label className="flex items-center gap-2 text-xs font-bold cursor-pointer">
              <input
                type="checkbox"
                checked={announcementEnabled}
                onChange={e => setAnnouncementEnabled(e.target.checked)}
                className="w-4 h-4 accent-[#20392F]"
              />
              <span>Enable Globally</span>
            </label>
          </div>

          <div className="text-xs">
            <label className="block font-bold text-[#1D1D1B] uppercase tracking-wider mb-1">
              Banner Headline Text
            </label>
            <input
              type="text"
              value={announcementText}
              onChange={e => setAnnouncementText(e.target.value)}
              className="w-full p-3 bg-[#F8F5F0] border border-[#E8E2D8] rounded-xl focus:outline-none focus:border-[#20392F]"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-2">
          <button
            type="submit"
            className="bg-[#20392F] hover:bg-[#152720] text-white px-8 py-3 rounded-full text-xs font-bold shadow-md transition-all flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Settings</span>
          </button>

          {isSaved && (
            <span className="text-xs font-semibold text-green-700 flex items-center gap-1">
              <Check className="w-4 h-4" />
              <span>Settings updated successfully!</span>
            </span>
          )}
        </div>
      </form>

      {/* Danger Zone: Factory Reset */}
      <div className="bg-red-50/60 rounded-3xl p-6 sm:p-8 border border-red-200/80 space-y-3 mt-12">
        <div className="flex items-center gap-2 text-red-800">
          <AlertTriangle className="w-5 h-5 text-red-600" />
          <h3 className="font-serif text-lg font-bold">Demo Data Management</h3>
        </div>
        <p className="text-xs text-red-700 max-w-xl">
          Reset local storage back to default initial seed data (12 fashion garments, matching reference promotions, and initial sample orders).
        </p>
        <button
          type="button"
          onClick={handleResetData}
          className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-sm transition-colors flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset All Demo Data</span>
        </button>

        {isResetDone && (
          <p className="text-xs text-green-700 font-bold pt-1">
            Demo factory data has been successfully reseeded!
          </p>
        )}
      </div>

    </div>
  );
};
