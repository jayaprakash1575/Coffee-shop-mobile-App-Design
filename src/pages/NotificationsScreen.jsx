import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import BottomNav from '../components/BottomNav';
import { ArrowLeftIcon, BellIcon, SparkleIcon, CheckCircleIcon, ArrowRightIcon } from '../components/Icons';

const NotificationsScreen = () => {
  const navigate = useNavigate();
  const { notifications, markAllNotificationsRead } = useApp();

  return (
    <div className="h-full flex flex-col bg-[#faf8f5] overflow-hidden">
      {/* ── HEADER ────────────────────────────── */}
      <div className="bg-white px-5 pt-12 pb-4 flex items-center justify-between border-b border-gray-100 shadow-sm flex-shrink-0 z-20">
        <button
          id="notif-back-btn"
          onClick={() => navigate('/home')}
          className="w-10 h-10 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-800 transition-transform active:scale-90"
        >
          <ArrowLeftIcon size={18} color="#1f2937" />
        </button>
        <div className="text-center">
          <h1 className="font-bold text-gray-900 text-base">Notifications</h1>
          <p className="text-[11px] text-gray-400 font-medium">Updates & Offers</p>
        </div>
        <button
          onClick={markAllNotificationsRead}
          className="text-xs font-bold text-coffee-primary hover:underline"
        >
          Read All
        </button>
      </div>

      {/* ── SCROLLABLE LIST ───────────────────── */}
      <div className="flex-1 overflow-y-auto px-5 pt-4 pb-4 space-y-3">
        {notifications.map((n) => (
          <div
            key={n.id}
            onClick={() => {
              if (n.tag === 'Order') navigate('/tracking');
            }}
            className={`p-3.5 rounded-3xl border transition-all cursor-pointer ${
              n.read
                ? 'bg-white border-gray-100 shadow-sm opacity-80'
                : 'bg-white border-orange-200/80 shadow-card'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`w-9 h-9 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                n.tag === 'Order'
                  ? 'bg-orange-50 text-coffee-primary'
                  : n.tag === 'Offer'
                  ? 'bg-amber-50 text-amber-600'
                  : 'bg-green-50 text-green-600'
              }`}>
                {n.tag === 'Order' && <CheckCircleIcon size={18} color="#C07340" />}
                {n.tag === 'Offer' && <SparkleIcon size={18} color="#D4A847" />}
                {n.tag === 'Reward' && <BellIcon size={18} color="#22c55e" />}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className={`text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                    n.tag === 'Order'
                      ? 'bg-orange-100/60 text-coffee-primary'
                      : n.tag === 'Offer'
                      ? 'bg-amber-100/60 text-amber-700'
                      : 'bg-green-100/60 text-green-700'
                  }`}>
                    {n.tag}
                  </span>
                  <span className="text-[10px] text-gray-400 font-medium">{n.time}</span>
                </div>
                <h4 className="font-bold text-gray-900 text-xs mt-1">{n.title}</h4>
                <p className="text-gray-500 text-xs mt-0.5 leading-relaxed">{n.desc}</p>
                {n.tag === 'Order' && (
                  <div className="mt-2 text-coffee-primary font-bold text-[11px] flex items-center gap-1">
                    Track Courier Live
                    <ArrowRightIcon size={11} color="#C07340" />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <BottomNav />
    </div>
  );
};

export default NotificationsScreen;
