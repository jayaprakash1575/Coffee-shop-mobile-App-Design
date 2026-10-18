import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import BottomNav from '../components/BottomNav';
import { ArrowLeftIcon, ArrowRightIcon, PlusIcon, MinusIcon, TrashIcon, TicketIcon, BagIcon } from '../components/Icons';

const CartScreen = () => {
  const navigate = useNavigate();
  const { cartItems, updateCartQty, removeFromCart, cartSubtotal, discount } = useApp();

  const deliveryFee = cartItems.length > 0 ? 1.0 : 0.0;
  const discountAmount = discount.active ? discount.amount : 0.0;
  const finalTotal = Math.max(0, cartSubtotal + deliveryFee - discountAmount).toFixed(2);

  return (
    <div className="h-full flex flex-col bg-[#faf8f5] overflow-hidden">
      {/* ── HEADER ────────────────────────────── */}
      <div className="bg-white px-5 pt-12 pb-4 flex items-center justify-between border-b border-gray-100 shadow-sm flex-shrink-0 z-20">
        <button
          id="cart-back-btn"
          onClick={() => navigate('/home')}
          className="w-10 h-10 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-800 transition-transform active:scale-90"
        >
          <ArrowLeftIcon size={18} color="#1f2937" />
        </button>
        <div className="text-center">
          <h1 className="font-bold text-gray-900 text-base">Shopping Bag</h1>
          <p className="text-[11px] text-gray-400 font-medium">{cartItems.length} drinks in bag</p>
        </div>
        <div className="w-10" />
      </div>

      {/* ── SCROLLABLE LIST ───────────────────── */}
      <div className="flex-1 overflow-y-auto px-5 pt-4 pb-4">
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center px-6">
            <div className="w-20 h-20 rounded-3xl bg-orange-50 border border-orange-200/60 flex items-center justify-center mb-4">
              <BagIcon size={36} color="#C07340" />
            </div>
            <h3 className="font-display font-bold text-xl text-gray-900 mb-1">Your Bag is Empty</h3>
            <p className="text-gray-400 text-xs leading-relaxed max-w-xs mb-6">
              Looks like you haven't added any coffee to your bag yet. Craving a fresh roast?
            </p>
            <button
              onClick={() => navigate('/home')}
              className="btn-primary text-white font-bold text-sm px-6 py-3.5 rounded-2xl shadow-coffee-sm flex items-center gap-2"
            >
              Order Some Coffee
              <ArrowRightIcon size={16} color="#ffffff" />
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* List of items */}
            <div className="space-y-3">
              {cartItems.map((item) => (
                <div
                  key={item.cartId}
                  className="bg-white rounded-3xl p-3.5 shadow-card border border-gray-100 flex items-center gap-3.5"
                >
                  <div className="w-16 h-16 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0">
                    <img
                      src={item.coffee.image}
                      alt={item.coffee.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-bold text-gray-900 text-sm truncate">{item.coffee.name}</h4>
                        <span className="inline-block text-[10px] font-bold text-coffee-primary bg-orange-50 px-2 py-0.5 rounded-full mt-0.5">
                          Size {item.size}
                        </span>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.cartId)}
                        className="w-7 h-7 rounded-xl bg-red-50 text-red-500 flex items-center justify-center transition-transform active:scale-90"
                      >
                        <TrashIcon size={14} color="#ef4444" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-2.5">
                      <span className="font-black text-gray-900 text-sm">
                        ${(item.price * item.qty).toFixed(2)}
                      </span>
                      {/* Qty controls */}
                      <div className="flex items-center gap-2 bg-gray-50 border border-gray-200/80 rounded-xl px-2 py-1">
                        <button
                          onClick={() => updateCartQty(item.cartId, -1)}
                          className="w-6 h-6 rounded-lg bg-white shadow-xs flex items-center justify-center transition-transform active:scale-90"
                        >
                          <MinusIcon size={12} color="#1f2937" />
                        </button>
                        <span className="text-xs font-black text-gray-900 w-4 text-center">{item.qty}</span>
                        <button
                          onClick={() => updateCartQty(item.cartId, 1)}
                          className="w-6 h-6 rounded-lg btn-primary flex items-center justify-center transition-transform active:scale-90 text-white"
                        >
                          <PlusIcon size={12} color="#ffffff" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Voucher Row */}
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200/60 rounded-2xl p-3 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <TicketIcon size={18} color="#C07340" />
                <div>
                  <p className="font-bold text-gray-900 text-xs">{discount.label}</p>
                  <p className="text-[10px] text-coffee-primary font-semibold">Code: {discount.code}</p>
                </div>
              </div>
              <span className="text-xs font-black text-green-600">-${discountAmount.toFixed(2)}</span>
            </div>

            {/* Bill Summary */}
            <div className="bg-white rounded-3xl p-4 shadow-card border border-gray-100 space-y-2">
              <h4 className="font-bold text-gray-900 text-xs mb-2">Order Summary</h4>
              <div className="flex justify-between text-xs text-gray-500">
                <span>Subtotal</span>
                <span className="font-bold text-gray-900">${cartSubtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>Delivery Fee</span>
                <span className="font-bold text-gray-900">${deliveryFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs text-green-600 font-semibold">
                <span>Voucher Discount</span>
                <span>-${discountAmount.toFixed(2)}</span>
              </div>
              <div className="h-px bg-gray-100 my-1.5" />
              <div className="flex justify-between items-center text-sm font-black text-gray-900">
                <span>Total</span>
                <span className="text-base text-coffee-primary">${finalTotal}</span>
              </div>
            </div>

            {/* Checkout CTA */}
            <button
              onClick={() => navigate('/order')}
              className="btn-primary w-full text-white font-bold py-3.5 rounded-2xl text-xs shadow-coffee-md flex items-center justify-center gap-2"
            >
              Checkout · ${finalTotal}
              <ArrowRightIcon size={14} color="#ffffff" />
            </button>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default CartScreen;
