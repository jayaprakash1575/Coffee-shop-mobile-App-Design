import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { coffees } from '../data/coffees';
import BottomNav from '../components/BottomNav';
import { HeartIcon, StarIcon, ArrowRightIcon, PlusIcon, ArrowLeftIcon } from '../components/Icons';

const FavoritesScreen = () => {
  const navigate = useNavigate();
  const { favorites, toggleFavorite, addToCart } = useApp();

  const favoriteCoffees = coffees.filter(c => favorites.includes(c.id));

  return (
    <div className="h-full flex flex-col bg-[#faf8f5] overflow-hidden">
      {/* ── HEADER ────────────────────────────── */}
      <div className="bg-white px-5 pt-12 pb-4 flex items-center justify-between border-b border-gray-100 shadow-sm flex-shrink-0 z-20">
        <button
          id="favorites-back-btn"
          onClick={() => navigate('/home')}
          className="w-10 h-10 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-800 transition-transform active:scale-90"
        >
          <ArrowLeftIcon size={18} color="#1f2937" />
        </button>
        <div className="text-center">
          <h1 className="font-bold text-gray-900 text-base">Your Wishlist</h1>
          <p className="text-[11px] text-gray-400 font-medium">{favoriteCoffees.length} saved blends</p>
        </div>
        <div className="w-10" />
      </div>

      {/* ── SCROLLABLE LIST ───────────────────── */}
      <div className="flex-1 overflow-y-auto px-5 pt-5 pb-4">
        {favoriteCoffees.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center px-6">
            <div className="w-20 h-20 rounded-3xl bg-orange-50 border border-orange-200/60 flex items-center justify-center mb-4">
              <HeartIcon size={36} filled={false} color="#C07340" />
            </div>
            <h3 className="font-display font-bold text-xl text-gray-900 mb-1">Your Wishlist is Empty</h3>
            <p className="text-gray-400 text-xs leading-relaxed max-w-xs mb-6">
              Explore our handcrafted coffee blends and tap the heart icon to save your favorites here.
            </p>
            <button
              onClick={() => navigate('/home')}
              className="btn-primary text-white font-bold text-sm px-6 py-3.5 rounded-2xl shadow-coffee-sm flex items-center gap-2"
            >
              Explore Menu
              <ArrowRightIcon size={16} color="#ffffff" />
            </button>
          </div>
        ) : (
          <div className="space-y-3.5">
            {favoriteCoffees.map((coffee) => (
              <div
                key={coffee.id}
                id={`favorite-card-${coffee.id}`}
                onClick={() => navigate(`/detail/${coffee.id}`)}
                className="bg-white rounded-3xl p-3.5 shadow-card border border-gray-100 flex items-center gap-3.5 cursor-pointer hover:shadow-card-hover transition-all active:scale-[0.98]"
              >
                {/* Image */}
                <div className="w-22 h-22 w-[84px] h-[84px] rounded-2xl overflow-hidden bg-gray-100 relative flex-shrink-0">
                  <img
                    src={coffee.image}
                    alt={coffee.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-1.5 left-1.5 flex items-center gap-0.5 bg-black/60 backdrop-blur-sm px-1.5 py-0.5 rounded-md">
                    <StarIcon size={10} color="#FFC107" />
                    <span className="text-white text-[10px] font-bold">{coffee.rating}</span>
                  </div>
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <span className="text-[9px] font-bold text-coffee-primary uppercase tracking-wider bg-orange-50 px-2 py-0.5 rounded-full">
                    {coffee.category}
                  </span>
                  <h3 className="font-bold text-gray-900 text-sm mt-1 truncate">{coffee.name}</h3>
                  <p className="text-gray-400 text-xs truncate">{coffee.subtitle}</p>

                  <div className="flex items-center justify-between mt-2.5">
                    <span className="font-black text-gray-900 text-sm">
                      <span className="text-coffee-primary font-semibold text-xs">$</span> {coffee.price.toFixed(2)}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(coffee.id);
                        }}
                        className="w-8 h-8 rounded-xl bg-orange-50 border border-orange-200/50 flex items-center justify-center transition-transform active:scale-90"
                      >
                        <HeartIcon size={15} filled={true} color="#C07340" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(coffee, 'M', 1);
                        }}
                        className="btn-primary text-white text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1 shadow-coffee-sm"
                      >
                        <PlusIcon size={12} color="#ffffff" />
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default FavoritesScreen;
