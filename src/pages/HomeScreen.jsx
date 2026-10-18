import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { coffees, categories } from '../data/coffees';
import BottomNav from '../components/BottomNav';
import {
  SearchIcon,
  FilterIcon,
  BellIcon,
  ChevronDownIcon,
  StarIcon,
  PlusIcon,
  HeartIcon,
  ArrowRightIcon,
  MapPinIcon,
  SparkleIcon,
  CupIcon,
} from '../components/Icons';
import { LocationModal, FilterModal, PromoModal, LoyaltyModal } from '../components/Modals';

const testimonials = [
  { name: 'Sarah Miller', stars: 5, text: 'Best brew in town! The Caffe Mocha with extra foam is heavenly.', avatar: 'SM', drink: 'Caffe Mocha' },
  { name: 'David Chen', stars: 5, text: 'Fast delivery! The Flat White was hot and microfoam was pristine.', avatar: 'DC', drink: 'Flat White' },
  { name: 'Priya Sharma', stars: 5, text: 'Love the loyalty perks and the seamless ordering experience.', avatar: 'PS', drink: 'Vanilla Oat Latte' },
];

const HomeScreen = () => {
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite, addToCart, address, setAddress, unreadNotificationsCount } = useApp();

  const [activeCategory, setActiveCategory] = useState('All Coffee');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterState, setFilterState] = useState({ category: 'All Coffee', roast: 'Any', maxPrice: 6.0 });

  // Modal open states
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showPromoModal, setShowPromoModal] = useState(false);
  const [showLoyaltyModal, setShowLoyaltyModal] = useState(false);

  // Filter coffees
  const filteredCoffees = coffees.filter((c) => {
    const matchesCategory =
      activeCategory === 'All Coffee' ||
      (activeCategory === 'Latte' && (c.category === 'Latte' || c.name.toLowerCase().includes('latte'))) ||
      (activeCategory === 'Machiato' && (c.category === 'Machiato' || c.name.toLowerCase().includes('macchiato') || c.name.toLowerCase().includes('espresso'))) ||
      (activeCategory === 'Americano' && (c.category === 'Americano' || c.name.toLowerCase().includes('americano'))) ||
      c.category === activeCategory;

    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.subtitle.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesPrice = c.price <= filterState.maxPrice;

    return matchesCategory && matchesSearch && matchesPrice;
  });

  return (
    <div className="h-full flex flex-col bg-[#faf8f5] overflow-hidden">
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden pb-4">
        {/* ── TOP APP BAR ───────────────────────── */}
        <div className="bg-white px-5 pt-12 pb-4 shadow-sm border-b border-gray-100">
        {/* Location & Notification Row */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-1.5 mb-0.5">
              <MapPinIcon size={14} color="#C07340" />
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Delivery Location</span>
            </div>
            <button
              id="location-btn"
              onClick={() => setShowLocationModal(true)}
              className="flex items-center gap-1 text-gray-900 font-bold text-sm hover:text-coffee-primary transition-colors text-left"
            >
              <span className="truncate max-w-[200px]">{address.split(',')[0]}</span>
              <ChevronDownIcon size={14} color="#C07340" />
            </button>
          </div>

          <button
            id="bell-btn"
            onClick={() => navigate('/notifications')}
            className="relative w-11 h-11 rounded-2xl bg-gray-50 border border-gray-100 shadow-sm flex items-center justify-center transition-transform active:scale-90"
          >
            <BellIcon size={20} color="#374151" />
            {unreadNotificationsCount > 0 && (
              <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white animate-pulse" />
            )}
          </button>
        </div>

        {/* Greeting Banner */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-gray-900 font-display font-extrabold text-2xl leading-tight">
              Good Morning! ☕
            </h2>
            <p className="text-gray-400 text-xs mt-0.5 font-medium">Which artisan roast would you like today?</p>
          </div>
        </div>

        {/* Search Bar + Filter Button */}
        <div className="flex gap-2.5">
          <div className="flex-1 flex items-center gap-2.5 bg-gray-50 border border-gray-200/80 rounded-2xl px-4 py-3 focus-within:border-coffee-primary focus-within:shadow-coffee-sm transition-all duration-200">
            <SearchIcon size={18} color="#9ca3af" />
            <input
              id="search-input"
              type="text"
              placeholder="Search mocha, latte, flat white..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none font-medium"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="text-xs text-gray-400 hover:text-gray-600 font-bold">
                ✕
              </button>
            )}
          </div>

          <button
            id="filter-btn"
            onClick={() => setShowFilterModal(true)}
            className="w-12 h-12 rounded-2xl btn-primary flex items-center justify-center flex-shrink-0 shadow-coffee-sm transition-transform active:scale-90"
          >
            <FilterIcon size={18} color="#ffffff" />
          </button>
        </div>
      </div>

      {/* ── PROMO BANNER ──────────────────────── */}
      <div className="px-5 pt-4 mb-6">
        <div
          id="promo-card"
          onClick={() => setShowPromoModal(true)}
          className="relative rounded-3xl overflow-hidden h-44 shadow-coffee-md cursor-pointer group"
          style={{
            backgroundImage: 'url(/promo_banner.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Gradients */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-transparent transition-opacity group-hover:opacity-90" />
          <div
            className="absolute -right-10 -top-10 w-44 h-44 rounded-full opacity-30 pointer-events-none"
            style={{ background: 'radial-gradient(circle,#C07340,transparent)', filter: 'blur(25px)' }}
          />

          {/* Badge */}
          <span className="absolute top-4 left-4 z-10 flex items-center gap-1.5 bg-red-500 text-white text-xs font-black px-3 py-1 rounded-full shadow-lg">
            <SparkleIcon size={12} color="#ffffff" />
            PROMO DEAL
          </span>

          {/* Text */}
          <div className="absolute bottom-4 left-4 z-10">
            <h2 className="text-white font-display font-black text-2xl leading-tight drop-shadow-md">
              Buy One Get<br />One <span className="text-amber-300 underline decoration-coffee-primary">FREE</span>
            </h2>
            <p className="text-white/80 text-xs mt-1 font-medium">Use code BOGO2026 · Limited time only</p>
          </div>

          {/* Arrow CTA */}
          <button
            id="promo-arrow-btn"
            onClick={(e) => {
              e.stopPropagation();
              setShowPromoModal(true);
            }}
            className="absolute bottom-4 right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center bg-white/20 backdrop-blur-md border border-white/30 text-white transition-all group-hover:scale-110 active:scale-95"
          >
            <ArrowRightIcon size={16} color="#ffffff" />
          </button>
        </div>
      </div>

      {/* ── CATEGORIES ────────────────────────── */}
      <div className="mb-5">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide px-5 pb-1">
          {categories.map((cat) => {
            const isCurrent = activeCategory === cat;
            return (
              <button
                key={cat}
                id={`cat-${cat.replace(/\s+/g, '-').toLowerCase()}`}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all duration-200 ${
                  isCurrent
                    ? 'btn-primary text-white shadow-coffee-sm'
                    : 'bg-white text-gray-500 border border-gray-200/90 hover:border-coffee-primary/40'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── TODAY'S SPECIALS ──────────────────── */}
      <div className="mb-6">
        <div className="px-5 flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <CupIcon size={18} color="#C07340" />
            <h3 className="font-bold text-gray-900 text-base">Today's Specials</h3>
          </div>
          <button
            id="see-specials-btn"
            onClick={() => setActiveCategory('All Coffee')}
            className="text-coffee-primary text-xs font-bold flex items-center gap-1 hover:underline"
          >
            See all
            <ArrowRightIcon size={12} color="#C07340" />
          </button>
        </div>

        <div className="flex gap-3 overflow-x-auto scrollbar-hide px-5 pb-2">
          {coffees.slice(0, 4).map((item) => (
            <div
              key={item.id}
              id={`special-${item.id}`}
              onClick={() => navigate(`/detail/${item.id}`)}
              className="flex-shrink-0 w-36 bg-white rounded-3xl p-2.5 shadow-card border border-gray-100 cursor-pointer group hover:shadow-card-hover transition-all active:scale-95"
            >
              <div className="relative h-28 rounded-2xl overflow-hidden mb-2 bg-gray-100">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <span className="absolute top-2 left-2 text-[9px] font-black text-white px-2 py-0.5 rounded-full bg-coffee-primary shadow-xs">
                  {item.tag || 'Special'}
                </span>
              </div>
              <p className="font-bold text-gray-900 text-xs truncate">{item.name}</p>
              <div className="flex items-center justify-between mt-1">
                <p className="text-coffee-primary font-black text-sm">${item.price.toFixed(2)}</p>
                <div className="flex items-center gap-0.5">
                  <StarIcon size={10} color="#FFC107" />
                  <span className="text-[10px] text-gray-500 font-bold">{item.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── POPULAR PICKS (GRID) ──────────────── */}
      <div className="px-5 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-gray-900 text-base">Popular Handcrafted Coffee</h3>
          <button
            id="see-all-btn"
            onClick={() => {
              setActiveCategory('All Coffee');
              setSearchQuery('');
            }}
            className="text-coffee-primary text-xs font-bold flex items-center gap-1 hover:underline"
          >
            View all ({coffees.length})
            <ArrowRightIcon size={12} color="#C07340" />
          </button>
        </div>

        {filteredCoffees.length === 0 ? (
          <div className="bg-white rounded-3xl p-8 text-center border border-gray-100 shadow-sm">
            <div className="w-16 h-16 rounded-2xl bg-orange-50 flex items-center justify-center mx-auto mb-3">
              <SearchIcon size={24} color="#C07340" />
            </div>
            <h4 className="font-bold text-gray-900 text-sm">No coffee matches your filter</h4>
            <p className="text-gray-400 text-xs mt-1 mb-4">Try clearing your search query or adjusting your filters.</p>
            <button
              onClick={() => {
                setActiveCategory('All Coffee');
                setSearchQuery('');
                setFilterState({ category: 'All Coffee', roast: 'Any', maxPrice: 6.0 });
              }}
              className="btn-primary text-white text-xs font-bold px-4 py-2 rounded-xl"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3.5">
            {filteredCoffees.map((coffee) => (
              <div
                key={coffee.id}
                id={`coffee-card-${coffee.id}`}
                onClick={() => navigate(`/detail/${coffee.id}`)}
                className="bg-white rounded-3xl overflow-hidden shadow-card border border-gray-100 cursor-pointer transition-all duration-200 hover:shadow-card-hover hover:-translate-y-1 active:scale-[0.98] group"
              >
                {/* Image */}
                <div className="relative h-36 overflow-hidden bg-gray-100">
                  <img
                    src={coffee.image}
                    alt={coffee.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                  {/* Rating badge */}
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md">
                    <StarIcon size={10} color="#FFC107" />
                    <span className="text-white text-[10px] font-bold">{coffee.rating}</span>
                  </div>

                  {/* Wishlist Like Button */}
                  <button
                    id={`like-${coffee.id}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(coffee.id);
                    }}
                    className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md transition-transform active:scale-90"
                  >
                    <HeartIcon size={14} filled={isFavorite(coffee.id)} color="#C07340" />
                  </button>
                </div>

                {/* Info */}
                <div className="p-3">
                  <span className="text-[9px] font-bold text-coffee-primary uppercase tracking-wider bg-orange-50 px-2 py-0.5 rounded-full">
                    {coffee.category}
                  </span>
                  <h4 className="font-bold text-gray-900 text-sm mt-1 truncate">{coffee.name}</h4>
                  <p className="text-gray-400 text-xs truncate mt-0.5">{coffee.subtitle}</p>

                  <div className="flex items-center justify-between mt-3">
                    <span className="font-black text-gray-900 text-sm">
                      <span className="text-coffee-primary font-bold text-xs">$</span> {coffee.price.toFixed(2)}
                    </span>
                    <button
                      id={`add-btn-${coffee.id}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(coffee, 'M', 1);
                      }}
                      className="w-8 h-8 rounded-xl btn-primary flex items-center justify-center shadow-coffee-sm transition-transform active:scale-90 text-white"
                    >
                      <PlusIcon size={14} color="#ffffff" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── LOYALTY CARD ──────────────────────── */}
      <div className="px-5 mb-6">
        <div
          onClick={() => setShowLoyaltyModal(true)}
          className="relative rounded-3xl overflow-hidden p-5 cursor-pointer shadow-coffee-md hover:shadow-lg transition-all"
          style={{ background: 'linear-gradient(135deg,#1a0e07 0%,#3d1f0a 60%,#1a0e07 100%)' }}
        >
          <div className="flex items-center justify-between relative z-10">
            <div>
              <p className="text-amber-400 text-[10px] font-black uppercase tracking-[0.2em] mb-1">
                CoffeeCo Club Member
              </p>
              <h4 className="text-white font-display font-black text-xl leading-tight">Loyalty Rewards</h4>
              <p className="text-coffee-primary font-bold text-xs mt-0.5">You have 480 Points Available</p>
              <button
                id="loyalty-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowLoyaltyModal(true);
                }}
                className="mt-3 flex items-center gap-1.5 bg-coffee-primary text-white text-xs font-bold px-3.5 py-1.5 rounded-xl shadow-coffee-sm"
              >
                Claim Free Drink
                <ArrowRightIcon size={12} color="#ffffff" />
              </button>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center">
                <StarIcon size={26} color="#FFC107" />
              </div>
              <span className="text-white/60 text-[10px] font-semibold mt-1">Tier 2 VIP</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── WHAT CUSTOMERS SAY ─────────────────── */}
      <div className="mb-6">
        <div className="px-5 flex items-center justify-between mb-3">
          <h3 className="font-bold text-gray-900 text-base">Coffee Lovers Reviews</h3>
        </div>
        <div className="flex gap-3 overflow-x-auto scrollbar-hide px-5 pb-2">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="flex-shrink-0 w-60 bg-white rounded-3xl p-4 shadow-card border border-gray-100"
            >
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-8 h-8 rounded-xl bg-orange-100/70 text-coffee-primary flex items-center justify-center font-bold text-xs">
                  {t.avatar}
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-xs">{t.name}</p>
                  <div className="flex gap-0.5">
                    {[...Array(t.stars)].map((_, i) => (
                      <StarIcon key={i} size={10} color="#FFC107" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-500 text-xs leading-relaxed italic">"{t.text}"</p>
            </div>
          ))}
        </div>
      </div>
      </div>

      <BottomNav />

      {/* ── MODALS ────────────────────────────── */}
      <LocationModal
        isOpen={showLocationModal}
        onClose={() => setShowLocationModal(false)}
        onSelect={(newLoc) => setAddress(newLoc)}
      />
      <FilterModal
        isOpen={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        activeFilters={filterState}
        onApply={(filters) => {
          setFilterState(filters);
          if (filters.category !== 'All Coffee') setActiveCategory(filters.category);
        }}
      />
      <PromoModal isOpen={showPromoModal} onClose={() => setShowPromoModal(false)} />
      <LoyaltyModal isOpen={showLoyaltyModal} onClose={() => setShowLoyaltyModal(false)} />
    </div>
  );
};

export default HomeScreen;
