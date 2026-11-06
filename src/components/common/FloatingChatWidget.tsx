import React, { useState } from 'react';
import { MessageSquare, X, Send, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const FloatingChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ sender: 'bot' | 'user'; text: string }>>([
    {
      sender: 'bot',
      text: 'Hello! I am your VogueThread style concierge. How may I assist your wardrobe selection today?'
    }
  ]);
  const [inputText, setInputText] = useState('');

  const quickPrompts = [
    'What promo codes are active?',
    'What is your return policy?',
    'How do I track an order?'
  ];

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMsg = text.trim();
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setInputText('');

    setTimeout(() => {
      let botReply = "Thank you for asking! Our concierge is available 24/7. Explore our Winter Essentials collection for up to 70% off.";

      const lower = userMsg.toLowerCase();
      if (lower.includes('promo') || lower.includes('coupon') || lower.includes('discount') || lower.includes('code') || lower.includes('diwali')) {
        botReply = "Happy Diwali! 🪔 Use coupon code 'DIWALI70' or 'VOGUE70' at checkout for 70% off orders over ₹999, or 'WINTER20' for 20% off all festive apparel!";
      } else if (lower.includes('return') || lower.includes('exchange')) {
        botReply = "We offer a 7-day hassle-free return and exchange guarantee on all unwashed items with tags attached.";
      } else if (lower.includes('track') || lower.includes('order')) {
        botReply = "You can view and track your demo orders anytime by visiting the '/orders' page or clicking Account > My Demo Orders.";
      } else if (lower.includes('size') || lower.includes('fit')) {
        botReply = "Our pieces have modern tailoring. If you prefer a relaxed boxy look, select your true size; for a standard fit, size down.";
      }

      setMessages(prev => [...prev, { sender: 'bot', text: botReply }]);
    }, 600);
  };

  return (
    <div className="fixed bottom-6 left-6 sm:bottom-6 sm:right-6 sm:left-auto z-40">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            className="mb-3 w-80 sm:w-96 bg-white rounded-3xl shadow-2xl border border-[#E8E2D8] overflow-hidden flex flex-col h-[460px]"
          >
            {/* Header */}
            <div className="p-4 bg-[#20392F] text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#E9DFD3] text-[#20392F] flex items-center justify-center font-bold text-xs">
                  VT
                </div>
                <div>
                  <h4 className="font-serif text-sm font-semibold">VogueThread Concierge</h4>
                  <span className="text-[10px] text-green-300 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    Online & Ready
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/70 hover:text-white p-1"
                aria-label="Close concierge chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#F8F5F0]">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                      m.sender === 'user'
                        ? 'bg-[#20392F] text-white rounded-br-none'
                        : 'bg-white text-[#1D1D1B] border border-[#E8E2D8] rounded-bl-none shadow-sm'
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Prompts */}
            <div className="p-2 bg-white border-t border-[#E8E2D8] flex gap-1.5 overflow-x-auto">
              {quickPrompts.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(q)}
                  className="shrink-0 text-[10px] bg-[#F8F5F0] hover:bg-[#EAE4D9] text-[#1D1D1B] px-2.5 py-1 rounded-full border border-[#E8E2D8] transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <form
              onSubmit={e => {
                e.preventDefault();
                handleSend(inputText);
              }}
              className="p-3 bg-white border-t border-[#E8E2D8] flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Ask our stylists..."
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                className="flex-1 text-xs bg-[#F8F5F0] border border-[#E8E2D8] rounded-full px-3.5 py-2 focus:outline-none focus:border-[#20392F]"
              />
              <button
                type="submit"
                className="w-8 h-8 rounded-full bg-[#20392F] text-white flex items-center justify-center hover:bg-[#152720] transition-colors shrink-0"
                aria-label="Send message"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger Button - Matches round chat button in UI reference */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#20392F] hover:bg-[#152720] text-white shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 border-2 border-white/20"
        title="Live Concierge Chat"
        aria-label="Live Concierge Chat"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </button>
    </div>
  );
};
