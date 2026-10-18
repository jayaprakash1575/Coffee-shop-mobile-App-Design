import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { HomeIcon, HeartIcon, BagIcon, BellIcon } from './Icons';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartCount, unreadNotificationsCount, favorites } = useApp();

  const tabs = [
    {
      id: 'home',
      label: 'Home',
      path: '/home',
      icon: (active) => <HomeIcon size={22} color={active ? '#C07340' : '#9ca3af'} />,
      badge: 0,
    },
    {
      id: 'wishlist',
      label: 'Wishlist',
      path: '/favorites',
      icon: (active) => <HeartIcon size={22} filled={active} color={active ? '#C07340' : '#9ca3af'} />,
      badge: favorites.length > 0 ? favorites.length : 0,
    },
    {
      id: 'cart',
      label: 'Cart',
      path: '/cart',
      icon: (active) => <BagIcon size={22} color={active ? '#C07340' : '#9ca3af'} />,
      badge: cartCount,
    },
    {
      id: 'alerts',
      label: 'Alerts',
      path: '/notifications',
      icon: (active) => <BellIcon size={22} color={active ? '#C07340' : '#9ca3af'} />,
      badge: unreadNotificationsCount,
    },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="w-full flex items-center justify-around px-3 py-2 bg-white/95 backdrop-blur-xl border-t border-gray-100 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-40 flex-shrink-0">
      {tabs.map((tab) => {
        const active = isActive(tab.path);
        return (
          <button
            key={tab.id}
            id={`nav-${tab.id}`}
            onClick={() => navigate(tab.path)}
            className="flex-1 flex flex-col items-center justify-center py-1 relative group transition-all duration-200"
          >
            {/* Active Pill background */}
            {active && (
              <span className="absolute inset-x-2 -inset-y-1 rounded-2xl bg-orange-50/90 -z-10 transition-all duration-300" />
            )}

            <div className="relative">
              <span className={`inline-block transition-transform duration-200 ${active ? 'scale-110' : 'group-hover:scale-105'}`}>
                {tab.icon(active)}
              </span>

              {/* Dynamic Badge */}
              {tab.badge > 0 && (
                <span className={`absolute -top-1.5 -right-2.5 min-w-[17px] h-[17px] px-1 text-[10px] font-black rounded-full flex items-center justify-center text-white border-2 border-white shadow-sm ${
                  tab.id === 'alerts' ? 'bg-red-500' : 'bg-coffee-primary'
                }`}>
                  {tab.badge}
                </span>
              )}
            </div>

            <span className={`text-[10px] font-bold mt-1 tracking-tight transition-colors duration-200 ${
              active ? 'text-coffee-primary font-extrabold' : 'text-gray-400 group-hover:text-gray-600'
            }`}>
              {tab.label}
            </span>

            {/* Active indicator dot */}
            {active && (
              <span className="w-1.5 h-1.5 rounded-full bg-coffee-primary mt-0.5" />
            )}
          </button>
        );
      })}
    </nav>
  );
};

export default BottomNav;
