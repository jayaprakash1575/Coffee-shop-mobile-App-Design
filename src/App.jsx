import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import SplashScreen from './pages/SplashScreen';
import HomeScreen from './pages/HomeScreen';
import DetailScreen from './pages/DetailScreen';
import OrderScreen from './pages/OrderScreen';
import TrackingScreen from './pages/TrackingScreen';
import FavoritesScreen from './pages/FavoritesScreen';
import CartScreen from './pages/CartScreen';
import NotificationsScreen from './pages/NotificationsScreen';

// Ultra-realistic iPhone 16 Pro Frame for Desktop Preview
const DeviceContainer = ({ children }) => {
  const [useFrame, setUseFrame] = useState(true);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center relative py-0 sm:py-8 select-none">
      {/* Top Floating Controls on Desktop */}
      <div className="hidden sm:flex items-center gap-3 mb-4 z-50 bg-black/60 backdrop-blur-xl px-4 py-2 rounded-full border border-white/10 shadow-2xl">
        <span className="text-white/80 text-xs font-semibold flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-coffee-primary animate-pulse" />
          CoffeeCo App Preview
        </span>
        <div className="w-px h-4 bg-white/20" />
        <button
          onClick={() => setUseFrame(!useFrame)}
          className="text-xs font-bold text-coffee-gold hover:text-white transition-colors"
        >
          {useFrame ? '📱 iPhone 16 Pro Frame (On)' : '🖥️ Borderless (Off)'}
        </button>
      </div>

      {/* Device Frame or Plain Container */}
      <div
        className={`w-full max-w-[390px] min-h-screen sm:min-h-[844px] sm:max-h-[844px] bg-[#faf8f5] overflow-hidden flex flex-col relative transition-all duration-300 ${
          useFrame
            ? 'sm:rounded-[52px] sm:ring-[12px] sm:ring-[#2b2725] sm:shadow-[0_25px_70px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.1)]'
            : 'sm:rounded-3xl sm:shadow-2xl'
        }`}
      >
        {/* Dynamic Island & Status Bar (on desktop frame) */}
        {useFrame && (
          <div className="hidden sm:flex items-center justify-between px-7 pt-3.5 pb-1 w-full absolute top-0 inset-x-0 z-50 pointer-events-none">
            {/* Time */}
            <span className="text-xs font-bold text-gray-800 tracking-tight">9:41</span>

            {/* Dynamic Island */}
            <div className="w-28 h-6 bg-black rounded-full flex items-center justify-center gap-2 shadow-inner px-2">
              <span className="w-2 h-2 rounded-full bg-coffee-primary animate-ping" />
              <span className="text-[10px] text-white/90 font-bold">CoffeeCo ☕</span>
            </div>

            {/* Icons */}
            <div className="flex items-center gap-1.5 text-gray-800">
              {/* Cellular */}
              <svg width="14" height="10" viewBox="0 0 17 12" fill="currentColor">
                <rect x="0" y="9" width="3" height="3" rx="0.5" />
                <rect x="4.5" y="6" width="3" height="6" rx="0.5" />
                <rect x="9" y="3" width="3" height="9" rx="0.5" />
                <rect x="13.5" y="0" width="3" height="12" rx="0.5" />
              </svg>
              {/* Wifi */}
              <svg width="14" height="11" viewBox="0 0 16 12" fill="currentColor">
                <path d="M8 9.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm-3.5-3a5 5 0 0 1 7 0l-1 1a3.5 3.5 0 0 0-5 0l-1-1zm-3-3a9.5 9.5 0 0 1 13 0l-1 1a8 8 0 0 0-11 0l-1-1z" />
              </svg>
              {/* Battery */}
              <div className="w-5 h-2.5 rounded-sm border border-current p-0.5 flex items-center">
                <div className="w-full h-full bg-current rounded-2xs" />
              </div>
            </div>
          </div>
        )}

        {/* Inner App Content */}
        <div className="flex-1 w-full overflow-hidden relative flex flex-col">
          {children}
        </div>

        {/* Bottom Home Indicator Bar (Desktop frame) */}
        {useFrame && (
          <div className="hidden sm:flex justify-center py-2 absolute bottom-0 inset-x-0 z-50 pointer-events-none">
            <div className="w-32 h-1 bg-gray-900/60 rounded-full" />
          </div>
        )}
      </div>
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <Router>
        <DeviceContainer>
          <Routes>
            <Route path="/" element={<SplashScreen />} />
            <Route path="/home" element={<HomeScreen />} />
            <Route path="/detail/:id" element={<DetailScreen />} />
            <Route path="/order" element={<OrderScreen />} />
            <Route path="/tracking" element={<TrackingScreen />} />
            <Route path="/favorites" element={<FavoritesScreen />} />
            <Route path="/cart" element={<CartScreen />} />
            <Route path="/notifications" element={<NotificationsScreen />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </DeviceContainer>
      </Router>
    </AppProvider>
  );
}

export default App;
