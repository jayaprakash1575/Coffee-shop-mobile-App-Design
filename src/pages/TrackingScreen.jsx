import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeftIcon,
  TargetIcon,
  ClockIcon,
  ChatIcon,
  PhoneIcon,
  CheckCircleIcon,
  CupIcon,
  DeliveryScooterIcon,
  StorefrontIcon,
  StarIcon,
} from '../components/Icons';
import { ChatModal, CallModal } from '../components/Modals';

const TrackingScreen = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(30);
  const [eta, setEta] = useState(8);
  const [mapPulse, setMapPulse] = useState(false);

  // Modals
  const [showChatModal, setShowChatModal] = useState(false);
  const [showCallModal, setShowCallModal] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 65) return p;
        return p + 0.3;
      });
    }, 150);
    return () => clearInterval(timer);
  }, []);

  const handleRecenter = () => {
    setMapPulse(true);
    setTimeout(() => setMapPulse(false), 1200);
  };

  const steps = [
    {
      title: 'Order Confirmed',
      desc: 'Your payment was approved and receipt generated.',
      done: true,
      icon: (c) => <CheckCircleIcon size={18} color={c} />,
    },
    {
      title: 'Barista Crafting Coffee',
      desc: 'Steaming milk and pulling double espresso shots.',
      done: progress >= 20,
      icon: (c) => <CupIcon size={18} color={c} />,
    },
    {
      title: 'Courier on Delivery Route',
      desc: 'Brooklyn is riding towards Jl. Kpg Sutoyo.',
      done: progress >= 40,
      icon: (c) => <DeliveryScooterIcon size={18} color={c} />,
    },
    {
      title: 'Delivered Fresh & Hot',
      desc: 'Enjoy your handcrafted coffee!',
      done: progress >= 95,
      icon: (c) => <StorefrontIcon size={18} color={c} />,
    },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col overflow-hidden relative">
      {/* ── VECTOR MAP SECTION ───────────────── */}
      <div className="relative flex-shrink-0" style={{ height: '46vh' }}>
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 390 320"
          preserveAspectRatio="xMidYMid slice"
          className="w-full h-full"
        >
          {/* Base ground */}
          <rect width="390" height="320" fill="#f4f1ea" />

          {/* Green garden blocks */}
          <rect x="25" y="25" width="85" height="55" rx="8" fill="#d9ebd9" />
          <rect x="280" y="215" width="85" height="70" rx="8" fill="#d9ebd9" />

          {/* Grid streets */}
          {[45, 95, 145, 195, 245, 295].map((y) => (
            <g key={y}>
              <rect x="0" y={y} width="390" height="18" fill="#ffffff" />
              <line x1="0" y1={y + 9} x2="390" y2={y + 9} stroke="#ede8e0" strokeWidth="1" strokeDasharray="8 6" />
            </g>
          ))}

          {[60, 130, 200, 270, 340].map((x) => (
            <g key={x}>
              <rect x={x} y="0" width="18" height="320" fill="#ffffff" />
              <line x1={x + 9} y1="0" x2={x + 9} y2="320" stroke="#ede8e0" strokeWidth="1" strokeDasharray="8 6" />
            </g>
          ))}

          {/* City blocks */}
          {[
            [85, 115, 38, 25],
            [155, 115, 38, 25],
            [225, 115, 38, 25],
            [85, 165, 38, 25],
            [155, 165, 38, 25],
            [225, 165, 38, 25],
            [85, 215, 38, 25],
            [155, 215, 38, 25],
          ].map(([x, y, w, h], i) => (
            <rect key={i} x={x} y={y} width={w} height={h} rx="4" fill="#e2ded6" />
          ))}

          {/* Delivery Road Path */}
          <path
            d="M 88 260 L 88 95 L 235 95 L 235 170"
            fill="none"
            stroke="#C07340"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M 88 260 L 88 95 L 235 95 L 235 170"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="6 4"
          />

          {/* Destination marker (Coffee Shop Origin) */}
          <circle cx="88" cy="260" r="16" fill="rgba(192,115,64,0.2)" />
          <circle cx="88" cy="260" r="10" fill="#C07340" stroke="#ffffff" strokeWidth="2" />
          {/* Shop icon inside marker */}
          <path d="M 84 257 L 88 254 L 92 257 L 92 263 L 84 263 Z" fill="#ffffff" />

          {/* Courier Position Marker */}
          <circle
            cx="235"
            cy="170"
            r={mapPulse ? '28' : '20'}
            fill="rgba(192,115,64,0.25)"
            className="transition-all duration-500"
          />
          <circle cx="235" cy="170" r="12" fill="#C07340" stroke="#ffffff" strokeWidth="2.5" />
          {/* Scooter circle inner dot */}
          <circle cx="235" cy="170" r="4" fill="#ffffff" />
        </svg>

        {/* Top Controls Overlay */}
        <button
          id="tracking-back-btn"
          onClick={() => navigate('/home')}
          className="absolute top-12 left-5 w-10 h-10 rounded-2xl bg-white shadow-card flex items-center justify-center text-gray-800 transition-transform active:scale-90 z-20"
        >
          <ArrowLeftIcon size={18} color="#1f2937" />
        </button>

        <button
          id="target-btn"
          onClick={handleRecenter}
          className={`absolute top-12 right-5 w-10 h-10 rounded-2xl bg-white shadow-card flex items-center justify-center text-coffee-primary transition-transform active:scale-90 z-20 ${
            mapPulse ? 'scale-110 ring-4 ring-orange-200' : ''
          }`}
        >
          <TargetIcon size={18} color="#C07340" />
        </button>

        {/* Floating ETA chip */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl px-5 py-2.5 shadow-coffee-md border border-orange-200/50 flex items-center gap-2.5">
            <ClockIcon size={18} color="#C07340" />
            <div>
              <span className="font-display font-black text-gray-900 text-sm">{eta} mins</span>
              <span className="text-[11px] text-gray-400 font-semibold ml-1.5">Estimated Arrival</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── BOTTOM DRAWER ─────────────────────── */}
      <div className="flex-1 bg-white rounded-t-3xl -mt-5 shadow-2xl overflow-y-auto px-5 pt-4 pb-8 z-30 relative">
        <div className="w-12 h-1 bg-gray-200 rounded-full mx-auto mb-4" />

        {/* Status Title */}
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="font-display font-bold text-xl text-gray-900">{eta} minutes away</h2>
            <p className="text-gray-400 text-xs mt-0.5">Delivery to Jl. Kpg Sutoyo No. 620</p>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-orange-50 border border-orange-200/60 flex items-center justify-center">
            <DeliveryScooterIcon size={22} color="#C07340" />
          </div>
        </div>

        {/* Progress Bar Segments */}
        <div className="flex gap-1.5 mb-5">
          {[1, 2, 3, 4].map((seg) => {
            const filled = (progress / 100) * 4 >= seg;
            return (
              <div key={seg} className="flex-1 h-2 rounded-full overflow-hidden bg-gray-100">
                <div
                  className="h-full btn-primary rounded-full transition-all duration-500"
                  style={{ width: filled ? '100%' : '0%' }}
                />
              </div>
            );
          })}
        </div>

        {/* Steps Timeline */}
        <div className="space-y-2.5 mb-5">
          {steps.map((s, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-2xl flex items-center gap-3 border transition-all ${
                s.done
                  ? 'bg-orange-50/50 border-orange-200/70'
                  : 'bg-gray-50 border-gray-100 opacity-60'
              }`}
            >
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  s.done ? 'bg-white shadow-xs' : 'bg-gray-100'
                }`}
              >
                {s.icon(s.done ? '#C07340' : '#9ca3af')}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-xs font-bold ${s.done ? 'text-gray-900' : 'text-gray-400'}`}>
                  {s.title}
                </p>
                <p className="text-[10px] text-gray-400 truncate mt-0.5">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Courier Info Card */}
        <div className="bg-white border border-gray-200/80 rounded-2xl p-3.5 shadow-card flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=brooklyn&backgroundColor=c0aede"
                alt="Courier"
                className="w-11 h-11 rounded-full border-2 border-coffee-primary/30"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
            </div>

            <div>
              <p className="font-bold text-gray-900 text-xs">Brooklyn Simmons</p>
              <div className="flex items-center gap-1 mt-0.5">
                <StarIcon size={10} color="#FFC107" />
                <span className="text-[11px] font-bold text-gray-700">4.9</span>
                <span className="text-[10px] text-gray-400 font-medium">· CoffeeCo Courier</span>
              </div>
            </div>
          </div>

          {/* Chat & Call Buttons */}
          <div className="flex gap-2">
            <button
              id="chat-courier-btn"
              onClick={() => setShowChatModal(true)}
              className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-200/60 flex items-center justify-center text-coffee-primary transition-transform active:scale-90"
            >
              <ChatIcon size={16} color="#C07340" />
            </button>
            <button
              id="call-courier-btn"
              onClick={() => setShowCallModal(true)}
              className="w-10 h-10 rounded-xl btn-primary flex items-center justify-center text-white transition-transform active:scale-90 shadow-coffee-sm"
            >
              <PhoneIcon size={16} color="#ffffff" />
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <ChatModal isOpen={showChatModal} onClose={() => setShowChatModal(false)} />
      <CallModal isOpen={showCallModal} onClose={() => setShowCallModal(false)} />
    </div>
  );
};

export default TrackingScreen;
