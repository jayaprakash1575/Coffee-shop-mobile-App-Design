import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CloseIcon, CheckIcon, MapPinIcon, TicketIcon, WalletIcon, StarIcon, SparkleIcon } from './Icons';

// Modal Backdrop Container
export const ModalWrapper = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Dim backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      {/* Sheet Content */}
      <div className="relative w-full max-w-[390px] bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl p-6 z-10 max-h-[85vh] overflow-y-auto animate-fade-up">
        {/* Top bar handle */}
        <div className="w-12 h-1 bg-gray-200 rounded-full mx-auto mb-4" />
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-bold text-gray-900 text-lg">{title}</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:text-gray-800"
          >
            <CloseIcon size={16} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

// 1. Location Picker Modal
export const LocationModal = ({ isOpen, onClose, onSelect }) => {
  const locations = [
    { name: 'Bilzen, Tanjungbalai', desc: 'Default · Kpg. Sutoyo No. 620', time: '10 min delivery' },
    { name: 'Downtown Brew Lab', desc: 'Grand Central Blvd No. 42', time: '15 min delivery' },
    { name: 'CoffeeCo Beachfront', desc: 'Sunset Strip Pier 7', time: '20 min delivery' },
  ];

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} title="Choose Location">
      <div className="space-y-3">
        {locations.map((loc) => (
          <button
            key={loc.name}
            onClick={() => {
              onSelect(loc.name);
              onClose();
            }}
            className="w-full flex items-start gap-3 p-3.5 rounded-2xl border border-gray-100 bg-gray-50 hover:bg-orange-50/50 hover:border-coffee-primary/30 transition-all text-left"
          >
            <div className="w-9 h-9 rounded-xl bg-coffee-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <MapPinIcon size={18} color="#C07340" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-gray-900 text-sm">{loc.name}</p>
              <p className="text-gray-400 text-xs mt-0.5">{loc.desc}</p>
              <span className="inline-block mt-1 text-[10px] font-semibold text-coffee-primary bg-coffee-primary/10 px-2 py-0.5 rounded-full">
                {loc.time}
              </span>
            </div>
          </button>
        ))}
      </div>
    </ModalWrapper>
  );
};

// 2. Filter Modal
export const FilterModal = ({ isOpen, onClose, onApply, activeFilters }) => {
  const [category, setCategory] = useState(activeFilters.category || 'All Coffee');
  const [roast, setRoast] = useState(activeFilters.roast || 'Any');
  const [maxPrice, setMaxPrice] = useState(activeFilters.maxPrice || 6.0);

  const roasts = ['Any', 'Light', 'Medium', 'Dark'];
  const categories = ['All Coffee', 'Machiato', 'Latte', 'Americano'];

  const handleApply = () => {
    onApply({ category, roast, maxPrice });
    onClose();
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} title="Filter Coffee">
      <div className="space-y-5">
        {/* Category */}
        <div>
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">Category</label>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                  category === c
                    ? 'btn-primary text-white shadow-coffee-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Roast Level */}
        <div>
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">Roast Profile</label>
          <div className="grid grid-cols-4 gap-2">
            {roasts.map((r) => (
              <button
                key={r}
                onClick={() => setRoast(r)}
                className={`py-2 rounded-xl text-xs font-bold transition-all text-center ${
                  roast === r
                    ? 'bg-coffee-primary text-white shadow-coffee-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Price Slider */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Max Price</label>
            <span className="text-sm font-extrabold text-coffee-primary">${Number(maxPrice).toFixed(2)}</span>
          </div>
          <input
            type="range"
            min="2.5"
            max="6.0"
            step="0.25"
            value={maxPrice}
            onChange={(e) => setMaxPrice(parseFloat(e.target.value))}
            className="w-full accent-coffee-primary cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-gray-400 mt-1">
            <span>$2.50</span>
            <span>$6.00</span>
          </div>
        </div>

        {/* Apply CTA */}
        <div className="pt-2 flex gap-3">
          <button
            onClick={() => {
              setCategory('All Coffee');
              setRoast('Any');
              setMaxPrice(6.0);
            }}
            className="flex-1 py-3 rounded-2xl border border-gray-200 text-gray-600 font-bold text-sm"
          >
            Reset
          </button>
          <button
            onClick={handleApply}
            className="flex-1 btn-primary text-white font-bold py-3 rounded-2xl text-sm"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
};

// 3. Promo BOGO Modal
export const PromoModal = ({ isOpen, onClose }) => {
  const { applyVoucher, showToast } = useApp();

  const handleClaim = () => {
    applyVoucher('BOGO2026');
    onClose();
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} title="Buy 1 Get 1 Free Promo">
      <div className="text-center">
        <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-amber-400 to-coffee-primary flex items-center justify-center mx-auto mb-4 shadow-coffee-md">
          <SparkleIcon size={32} color="#ffffff" />
        </div>
        <h4 className="font-display font-extrabold text-2xl text-gray-900 mb-1">Double the Coffee Joy!</h4>
        <p className="text-gray-500 text-sm mb-5 leading-relaxed">
          Order any handcrafted beverage today and receive a second one on the house with code <span className="font-bold text-coffee-primary">BOGO2026</span>.
        </p>

        <div className="p-4 bg-orange-50/70 border border-orange-200/60 rounded-2xl mb-5 flex items-center justify-between">
          <div>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Coupon Code</p>
            <p className="font-mono font-black text-lg text-coffee-primary">BOGO2026</p>
          </div>
          <button
            onClick={handleClaim}
            className="btn-primary text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-coffee-sm"
          >
            Claim & Apply
          </button>
        </div>

        <p className="text-[11px] text-gray-400">Valid today until 11:59 PM · Applicable at all branches</p>
      </div>
    </ModalWrapper>
  );
};

// 4. Loyalty Points Modal
export const LoyaltyModal = ({ isOpen, onClose }) => {
  const { loyaltyPoints, redeemReward } = useApp();

  const rewards = [
    { pts: 200, name: 'Free Espresso Shot', icon: '☕' },
    { pts: 350, name: 'Warm Croissant / Pastry', icon: '🥐' },
    { pts: 480, name: 'Artisan Latte of Choice', icon: '🥛' },
    { pts: 600, name: 'CoffeeCo Ceramic Tumbler', icon: '🎁' },
  ];

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} title="Loyalty Rewards Club">
      <div>
        <div className="bg-gradient-to-br from-[#1a0e07] to-[#3d1f0a] rounded-3xl p-5 text-white mb-5 shadow-coffee-md relative overflow-hidden">
          <div className="flex items-center justify-between relative z-10">
            <div>
              <p className="text-coffee-gold text-xs font-bold uppercase tracking-widest">CoffeeCo VIP Tier</p>
              <h4 className="text-3xl font-black mt-1">{loyaltyPoints} <span className="text-sm font-semibold text-white/60">Points</span></h4>
              <p className="text-white/60 text-xs mt-1">Earn 10 points for every $1 spent</p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center">
              <StarIcon size={28} color="#FFC107" />
            </div>
          </div>
        </div>

        <h5 className="font-bold text-gray-900 text-sm mb-3">Redeemable Rewards</h5>
        <div className="space-y-2.5">
          {rewards.map((r) => {
            const canRedeem = loyaltyPoints >= r.pts;
            return (
              <div
                key={r.name}
                className={`flex items-center justify-between p-3.5 rounded-2xl border ${
                  canRedeem ? 'border-orange-200/80 bg-orange-50/40' : 'border-gray-100 bg-gray-50 opacity-60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{r.icon}</span>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{r.name}</p>
                    <p className="text-coffee-primary font-bold text-xs">{r.pts} pts required</p>
                  </div>
                </div>
                <button
                  disabled={!canRedeem}
                  onClick={() => {
                    redeemReward(r.pts, r.name);
                    onClose();
                  }}
                  className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all ${
                    canRedeem
                      ? 'btn-primary text-white shadow-coffee-sm'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {canRedeem ? 'Redeem' : 'Locked'}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </ModalWrapper>
  );
};

// 5. Courier Chat Modal
export const ChatModal = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    { from: 'courier', text: "Hello! I have picked up your freshly brewed coffee.", time: '12:02' },
    { from: 'courier', text: "I'm on a scooter and will arrive in approx 8-10 minutes.", time: '12:03' },
  ]);
  const [input, setInput] = useState('');

  const send = (txt) => {
    const textToSend = txt || input;
    if (!textToSend.trim()) return;
    setMessages(prev => [...prev, { from: 'me', text: textToSend, time: 'Just now' }]);
    setInput('');

    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { from: 'courier', text: 'Got it! Handing it over hot & fresh soon! 🛵', time: 'Just now' },
      ]);
    }, 1200);
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} title="Chat with Brooklyn">
      <div className="flex flex-col h-[360px]">
        {/* Messages feed */}
        <div className="flex-1 overflow-y-auto space-y-3 p-1">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex flex-col ${m.from === 'me' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[78%] px-4 py-2.5 rounded-2xl text-xs font-medium leading-relaxed ${
                  m.from === 'me'
                    ? 'bg-coffee-primary text-white rounded-br-none'
                    : 'bg-gray-100 text-gray-800 rounded-bl-none'
                }`}
              >
                {m.text}
              </div>
              <span className="text-[10px] text-gray-400 mt-1 px-1">{m.time}</span>
            </div>
          ))}
        </div>

        {/* Quick suggestions */}
        <div className="flex gap-2 py-2 overflow-x-auto scrollbar-hide">
          {['Are you close?', 'Please leave at door', 'Thanks so much!'].map((pill) => (
            <button
              key={pill}
              onClick={() => send(pill)}
              className="flex-shrink-0 bg-gray-50 border border-gray-200 text-gray-600 text-[11px] font-semibold px-3 py-1 rounded-full hover:bg-orange-50 hover:text-coffee-primary"
            >
              {pill}
            </button>
          ))}
        </div>

        {/* Input box */}
        <div className="flex gap-2 pt-2">
          <input
            type="text"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && send()}
            className="flex-1 bg-gray-50 border border-gray-200 rounded-2xl px-4 py-2.5 text-xs outline-none focus:border-coffee-primary"
          />
          <button
            onClick={() => send()}
            className="btn-primary text-white px-4 py-2.5 rounded-2xl text-xs font-bold"
          >
            Send
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
};

// 6. Courier Phone Call Modal
export const CallModal = ({ isOpen, onClose }) => {
  const [seconds, setSeconds] = useState(0);
  const [muted, setMuted] = useState(false);
  const [speaker, setSpeaker] = useState(false);

  React.useEffect(() => {
    if (!isOpen) return;
    setSeconds(0);
    const interval = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
  const secs = String(seconds % 60).padStart(2, '0');

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/85 backdrop-blur-md" />
      <div className="relative w-full max-w-[340px] bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white rounded-3xl p-7 z-10 flex flex-col items-center shadow-2xl animate-scale-in border border-white/10">
        <div className="relative mb-4">
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=brooklyn&backgroundColor=c0aede"
            alt="Courier"
            className="w-24 h-24 rounded-full border-4 border-coffee-primary/40 shadow-xl"
          />
          <span className="absolute inset-0 rounded-full border-2 border-coffee-primary animate-ping opacity-30" />
        </div>

        <h4 className="font-bold text-xl text-white">Brooklyn Simmons</h4>
        <p className="text-coffee-gold text-xs font-semibold mt-1">Coffee Delivery Partner</p>
        <p className="font-mono text-white/70 text-sm mt-3 tracking-widest">{mins}:{secs}</p>

        {/* Audio Waveform visualization */}
        <div className="flex items-center gap-1.5 h-8 my-6">
          {[12, 24, 16, 28, 20, 32, 14, 22].map((h, i) => (
            <span
              key={i}
              className="w-1 bg-coffee-primary rounded-full transition-all"
              style={{
                height: `${h}px`,
                animation: 'float 1s ease-in-out infinite alternate',
                animationDelay: `${i * 0.12}s`,
              }}
            />
          ))}
        </div>

        {/* Call Controls */}
        <div className="flex items-center gap-5 mb-3">
          <button
            onClick={() => setMuted(!muted)}
            className={`w-12 h-12 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
              muted ? 'bg-red-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            {muted ? 'Unmute' : 'Mute'}
          </button>
          <button
            onClick={onClose}
            className="w-16 h-16 rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center text-white shadow-xl transition-transform active:scale-90"
          >
            <CloseIcon size={24} color="#ffffff" />
          </button>
          <button
            onClick={() => setSpeaker(!speaker)}
            className={`w-12 h-12 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
              speaker ? 'bg-coffee-primary text-white' : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            {speaker ? 'Air' : 'Spk'}
          </button>
        </div>
      </div>
    </div>
  );
};
