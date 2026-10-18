import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { coffees } from '../data/coffees';
import {
  ArrowLeftIcon,
  HeartIcon,
  StarIcon,
  PlusIcon,
  MinusIcon,
  ArrowRightIcon,
  CupIcon,
  BeanIcon,
  MilkIcon,
  CheckIcon,
} from '../components/Icons';

const DetailScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite, addToCart } = useApp();

  const coffee = coffees.find((c) => c.id === parseInt(id)) || coffees[0];

  const [selectedSize, setSelectedSize] = useState(coffee.defaultSize || 'M');
  const [selectedMilk, setSelectedMilk] = useState('Whole Milk');
  const [selectedSweetness, setSelectedSweetness] = useState('Standard (70%)');
  const [qty, setQty] = useState(1);
  const [isExpanded, setIsExpanded] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const sizeMultiplier = { S: 0.85, M: 1.0, L: 1.25 };
  const sizeLabels = { S: 'Small · 8oz', M: 'Medium · 12oz', L: 'Large · 16oz' };
  const sizeCalories = { S: '95 kcal', M: '135 kcal', L: '180 kcal' };
  const sizeVolume = { S: '240 ml', M: '360 ml', L: '480 ml' };

  const unitPrice = coffee.price * sizeMultiplier[selectedSize];
  const totalPrice = (unitPrice * qty).toFixed(2);

  const handleBuyNow = () => {
    setAddedAnimation(true);
    addToCart(coffee, selectedSize, qty);
    setTimeout(() => {
      navigate('/order', {
        state: {
          coffee,
          size: selectedSize,
          price: totalPrice,
          qty,
          customizations: { milk: selectedMilk, sweetness: selectedSweetness },
        },
      });
    }, 350);
  };

  return (
    <div className="h-full flex flex-col bg-white overflow-hidden relative">
      {/* Scrollable Hero + Details */}
      <div className="flex-1 overflow-y-auto">
        {/* ── TOP HERO HEADER ───────────────────── */}
        <div className="relative h-72 flex-shrink-0 bg-gray-900">
        <img
          src={coffee.image}
          alt={coffee.name}
          className="w-full h-full object-cover"
        />
        {/* Soft overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />

        {/* Top bar controls */}
        <div className="absolute top-12 inset-x-5 flex items-center justify-between z-10">
          <button
            id="back-btn"
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md shadow-lg flex items-center justify-center text-gray-800 transition-transform active:scale-90"
          >
            <ArrowLeftIcon size={18} color="#1f2937" />
          </button>

          <span className="bg-black/50 backdrop-blur-md text-white font-bold text-xs tracking-wider uppercase px-4 py-1.5 rounded-full border border-white/10">
            Coffee Detail
          </span>

          <button
            id="like-btn"
            onClick={() => toggleFavorite(coffee.id)}
            className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md shadow-lg flex items-center justify-center transition-transform active:scale-90"
          >
            <HeartIcon size={18} filled={isFavorite(coffee.id)} color="#C07340" />
          </button>
        </div>

        {/* Floating rating badge over image */}
        <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between text-white z-10">
          <div className="flex items-center gap-1.5 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15">
            <StarIcon size={14} color="#FFC107" />
            <span className="font-extrabold text-xs">{coffee.rating}</span>
            <span className="text-[11px] text-white/70">({coffee.reviews} reviews)</span>
          </div>

          <span className="bg-coffee-primary/90 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1.5 rounded-full">
            {coffee.category}
          </span>
        </div>
      </div>

      {/* ── DETAILS BODY ──────────────────────── */}
      <div className="flex-1 px-5 pt-5 space-y-5">
        {/* Name and quick highlights */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="font-display font-black text-2xl text-gray-900 leading-tight">{coffee.name}</h1>
            <p className="text-gray-400 text-xs font-semibold mt-0.5">{coffee.subtitle}</p>
          </div>

          {/* Feature Badges */}
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center shadow-xs">
              <CupIcon size={18} color="#C07340" />
            </div>
            <div className="w-9 h-9 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center shadow-xs">
              <BeanIcon size={18} color="#C07340" />
            </div>
            <div className="w-9 h-9 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center shadow-xs">
              <MilkIcon size={18} color="#C07340" />
            </div>
          </div>
        </div>

        {/* Nutritional & Brew Stats */}
        <div className="grid grid-cols-3 gap-2.5">
          {[
            { label: 'Calories', val: sizeCalories[selectedSize] },
            { label: 'Volume', val: sizeVolume[selectedSize] },
            { label: 'Roast', val: coffee.roast || 'Medium' },
          ].map((stat) => (
            <div key={stat.label} className="bg-orange-50/60 border border-orange-200/50 rounded-2xl p-2.5 text-center">
              <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
              <p className="text-xs font-black text-gray-900 mt-0.5">{stat.val}</p>
            </div>
          ))}
        </div>

        {/* Description with Read More */}
        <div className="border-t border-gray-100 pt-4">
          <h3 className="font-bold text-gray-900 text-sm mb-1.5">Description</h3>
          <p className="text-gray-500 text-xs leading-relaxed">
            {isExpanded ? (
              <>
                {coffee.description}{' '}
                Sourced from high-altitude Ethiopian single-origin estates, washed and slow-roasted in small batches to preserve bright floral aromatics, rich cocoa body, and a silky smooth velvet finish.
              </>
            ) : (
              coffee.description
            )}
            <button
              id="read-more-btn"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-coffee-primary font-bold ml-1.5 hover:underline text-xs"
            >
              {isExpanded ? 'Show Less' : 'Read More'}
            </button>
          </p>
        </div>

        {/* Size Selection */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-gray-900 text-sm">Select Size</h3>
            <span className="text-[11px] font-bold text-coffee-primary bg-orange-50 px-2.5 py-0.5 rounded-full border border-orange-100">
              {sizeLabels[selectedSize]}
            </span>
          </div>

          <div className="flex gap-2.5">
            {['S', 'M', 'L'].map((s) => (
              <button
                key={s}
                id={`size-${s}`}
                onClick={() => setSelectedSize(s)}
                className={`flex-1 py-3 rounded-2xl text-sm font-bold border-2 transition-all ${
                  selectedSize === s
                    ? 'btn-primary text-white border-transparent shadow-coffee-sm'
                    : 'bg-white text-gray-500 border-gray-200 hover:border-coffee-primary/40'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Milk Selection */}
        <div>
          <h3 className="font-bold text-gray-900 text-sm mb-2">Milk Preference</h3>
          <div className="flex flex-wrap gap-2">
            {['Whole Milk', 'Oat Milk (+0.50)', 'Almond Milk', 'Skim Milk'].map((milk) => (
              <button
                key={milk}
                onClick={() => setSelectedMilk(milk)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                  selectedMilk === milk
                    ? 'bg-coffee-primary/10 border-coffee-primary text-coffee-primary font-bold'
                    : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                }`}
              >
                {milk}
              </button>
            ))}
          </div>
        </div>

        {/* Quantity selector */}
        <div className="bg-gray-50 border border-gray-200/80 rounded-2xl p-3.5 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-gray-900">Cup Quantity</p>
            <p className="text-[11px] text-gray-400">Freshly brewed to order</p>
          </div>

          <div className="flex items-center gap-2.5 bg-white rounded-xl px-2.5 py-1.5 shadow-sm border border-gray-200/70">
            <button
              id="qty-minus"
              onClick={() => setQty(Math.max(1, qty - 1))}
              className="w-7 h-7 rounded-lg bg-gray-50 flex items-center justify-center text-gray-700 transition-transform active:scale-90"
            >
              <MinusIcon size={14} color="#1f2937" />
            </button>
            <span className="text-sm font-black text-gray-900 w-5 text-center">{qty}</span>
            <button
              id="qty-plus"
              onClick={() => setQty(qty + 1)}
              className="w-7 h-7 rounded-lg btn-primary flex items-center justify-center text-white transition-transform active:scale-90"
            >
              <PlusIcon size={14} color="#ffffff" />
            </button>
          </div>
        </div>
      </div>
      </div>

      {/* ── DOCKED BOTTOM BAR ─────────────────── */}
      <div className="flex-shrink-0 bg-white/95 backdrop-blur-xl px-5 py-3.5 border-t border-gray-100 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] z-30">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Total Price</p>
            <div className="flex items-baseline gap-0.5 mt-0.5">
              <span className="text-coffee-primary font-bold text-sm">$</span>
              <span className="font-display font-black text-2xl text-gray-900">{totalPrice}</span>
            </div>
          </div>

          <button
            id="buy-now-btn"
            onClick={handleBuyNow}
            className={`flex-1 flex items-center justify-center gap-2 text-white font-bold py-4 rounded-2xl text-sm shadow-coffee-md transition-all duration-300 ${
              addedAnimation ? 'bg-green-600 scale-95' : 'btn-primary'
            }`}
          >
            {addedAnimation ? (
              <>
                <CheckIcon size={18} color="#ffffff" />
                <span>Added to Order!</span>
              </>
            ) : (
              <>
                <span>Order Now</span>
                <ArrowRightIcon size={16} color="#ffffff" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailScreen;
