import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { coffees } from '../data/coffees';
import {
  ArrowLeftIcon,
  DeliveryScooterIcon,
  StorefrontIcon,
  MapPinIcon,
  EditIcon,
  NoteIcon,
  TicketIcon,
  WalletIcon,
  ChevronRightIcon,
  PlusIcon,
  MinusIcon,
  CheckIcon,
  CloseIcon,
} from '../components/Icons';
import { ModalWrapper } from '../components/Modals';

const OrderScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    address,
    setAddress,
    note,
    setNote,
    deliveryMode,
    setDeliveryMode,
    discount,
    applyVoucher,
    availableVouchers,
    paymentMethod,
    setPaymentMethod,
    showToast,
  } = useApp();

  const state = location.state || {};
  const coffee = state.coffee || coffees[0];
  const size = state.size || 'M';
  const initPrice = state.price ? parseFloat(state.price) : coffee.price;
  const [quantity, setQuantity] = useState(state.qty || 1);

  // Modals
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [showVoucherModal, setShowVoucherModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // Temporary inputs inside modals
  const [tempAddress, setTempAddress] = useState(address);
  const [tempNote, setTempNote] = useState(note);
  const [voucherInput, setVoucherInput] = useState('');

  // Price calculations
  const unitPrice = initPrice / (state.qty || 1);
  const itemTotal = unitPrice * quantity;
  const deliveryFee = deliveryMode === 'Deliver' ? 1.0 : 0.0;
  const discountVal = discount.active ? discount.amount : 0.0;
  const finalTotal = Math.max(0, itemTotal + deliveryFee - discountVal).toFixed(2);

  return (
    <div className="h-full flex flex-col bg-[#faf8f5] overflow-hidden">
      {/* ── HEADER ────────────────────────────── */}
      <div className="bg-white px-5 pt-12 pb-4 flex items-center justify-between border-b border-gray-100 shadow-sm flex-shrink-0 z-20">
        <button
          id="order-back-btn"
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-800 transition-transform active:scale-90"
        >
          <ArrowLeftIcon size={18} color="#1f2937" />
        </button>
        <h1 className="font-bold text-gray-900 text-base">Order Confirmation</h1>
        <div className="w-10" />
      </div>

      <div className="flex-1 overflow-y-auto px-5 pt-4 pb-4 space-y-4">
        {/* ── DELIVER / PICK UP TOGGLE ─────────── */}
        <div className="bg-white p-1.5 rounded-2xl border border-gray-200/80 shadow-xs flex">
          {[
            { id: 'Deliver', label: 'Delivery', icon: DeliveryScooterIcon },
            { id: 'Pick Up', label: 'Pick Up', icon: StorefrontIcon },
          ].map((mode) => {
            const Icon = mode.icon;
            const active = deliveryMode === mode.id;
            return (
              <button
                key={mode.id}
                id={`mode-${mode.id.toLowerCase().replace(' ', '-')}`}
                onClick={() => setDeliveryMode(mode.id)}
                className={`flex-1 py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                  active
                    ? 'btn-primary text-white shadow-coffee-sm'
                    : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                <Icon size={16} color={active ? '#ffffff' : '#6b7280'} />
                <span>{mode.label}</span>
              </button>
            );
          })}
        </div>

        {/* ── DELIVERY ADDRESS CARD ────────────── */}
        {deliveryMode === 'Deliver' ? (
          <div className="bg-white rounded-3xl p-4 shadow-card border border-gray-100">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-xl bg-orange-50 flex items-center justify-center">
                <MapPinIcon size={14} color="#C07340" />
              </div>
              <h2 className="font-bold text-gray-900 text-sm">Delivery Address</h2>
            </div>

            <p className="font-bold text-gray-900 text-sm">{address.split(',')[0]}</p>
            <p className="text-gray-400 text-xs mt-0.5 leading-relaxed">{address}</p>

            {note && (
              <div className="mt-2.5 p-2.5 rounded-xl bg-orange-50/60 border border-orange-200/50 flex items-start gap-2">
                <NoteIcon size={14} color="#C07340" className="mt-0.5 flex-shrink-0" />
                <p className="text-xs text-gray-700 italic font-medium">"{note}"</p>
              </div>
            )}

            <div className="flex gap-2 mt-3.5">
              <button
                id="edit-address-btn"
                onClick={() => {
                  setTempAddress(address);
                  setShowAddressModal(true);
                }}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-coffee-primary bg-orange-50 border border-orange-200/60 hover:bg-orange-100/50 transition-colors"
              >
                <EditIcon size={12} color="#C07340" />
                Edit Address
              </button>
              <button
                id="add-note-btn"
                onClick={() => {
                  setTempNote(note);
                  setShowNoteModal(true);
                }}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-gray-600 bg-gray-50 border border-gray-200 hover:bg-gray-100 transition-colors"
              >
                <NoteIcon size={12} color="#4b5563" />
                {note ? 'Edit Note' : 'Add Note'}
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-4 shadow-card border border-gray-100">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-xl bg-orange-50 flex items-center justify-center">
                <StorefrontIcon size={14} color="#C07340" />
              </div>
              <h2 className="font-bold text-gray-900 text-sm">Store Pickup Location</h2>
            </div>
            <p className="font-bold text-gray-900 text-sm">CoffeeCo Bilzen Flagship</p>
            <p className="text-gray-400 text-xs mt-0.5">Ready for pickup in 10 minutes at Counter 1</p>
          </div>
        )}

        {/* ── ORDER ITEM CARD ──────────────────── */}
        <div className="bg-white rounded-3xl p-4 shadow-card border border-gray-100">
          <div className="flex items-center gap-3.5">
            <div className="w-20 h-20 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0 shadow-sm">
              <img src={coffee.image} alt={coffee.name} className="w-full h-full object-cover" />
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-gray-900 text-sm truncate">{coffee.name}</h3>
              <p className="text-gray-400 text-xs truncate mt-0.5">{coffee.subtitle}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] font-bold text-coffee-primary bg-orange-50 px-2 py-0.5 rounded-full">
                  Size {size}
                </span>
                <span className="text-[10px] font-semibold text-gray-400">
                  ${unitPrice.toFixed(2)} / cup
                </span>
              </div>
            </div>

            {/* Qty button */}
            <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200/80 rounded-2xl p-1">
              <button
                id="qty-minus-btn"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-7 h-7 rounded-xl bg-white shadow-xs flex items-center justify-center text-gray-700 transition-transform active:scale-90"
              >
                <MinusIcon size={12} color="#1f2937" />
              </button>
              <span className="text-xs font-black text-gray-900 w-4 text-center">{quantity}</span>
              <button
                id="qty-plus-btn"
                onClick={() => setQuantity(quantity + 1)}
                className="w-7 h-7 rounded-xl btn-primary flex items-center justify-center text-white transition-transform active:scale-90"
              >
                <PlusIcon size={12} color="#ffffff" />
              </button>
            </div>
          </div>
        </div>

        {/* ── DISCOUNT BANNER BUTTON ───────────── */}
        <button
          id="discount-btn"
          onClick={() => setShowVoucherModal(true)}
          className="w-full bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200/80 rounded-2xl p-3.5 flex items-center justify-between text-left hover:border-coffee-primary transition-all active:scale-[0.99]"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-coffee-primary/10 flex items-center justify-center flex-shrink-0">
              <TicketIcon size={18} color="#C07340" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-900">{discount.label}</p>
              <p className="text-[10px] text-coffee-primary font-semibold">
                {discount.active ? `Code "${discount.code}" applied · Tap to change` : 'Tap to apply promo voucher'}
              </p>
            </div>
          </div>
          <ChevronRightIcon size={16} color="#C07340" />
        </button>

        {/* ── PAYMENT SUMMARY ─────────────────── */}
        <div className="bg-white rounded-3xl p-5 shadow-card border border-gray-100 space-y-2.5">
          <h3 className="font-bold text-gray-900 text-sm mb-3">Payment Summary</h3>
          <div className="flex justify-between text-xs text-gray-500">
            <span>Price ({quantity} item{quantity > 1 ? 's' : ''})</span>
            <span className="font-bold text-gray-900">${itemTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <span>Delivery Fee</span>
            <div className="flex items-center gap-1.5">
              {deliveryMode === 'Deliver' && <span className="text-[10px] text-gray-400 line-through">$2.00</span>}
              <span className="font-bold text-gray-900">${deliveryFee.toFixed(2)}</span>
            </div>
          </div>
          {discount.active && (
            <div className="flex justify-between text-xs text-green-600 font-semibold">
              <span>Promo Discount</span>
              <span>-${discountVal.toFixed(2)}</span>
            </div>
          )}
          <div className="h-px bg-gray-100 my-2" />
          <div className="flex justify-between items-center text-sm font-black text-gray-900">
            <span>Total Payment</span>
            <span className="text-lg text-coffee-primary font-black">${finalTotal}</span>
          </div>
        </div>

        {/* ── PAYMENT METHOD SELECTOR ─────────── */}
        <button
          id="payment-method-btn"
          onClick={() => setShowPaymentModal(true)}
          className="w-full bg-white rounded-3xl p-4 shadow-card border border-gray-100 flex items-center justify-between text-left hover:border-coffee-primary/30 transition-all active:scale-[0.99]"
        >
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl btn-primary flex items-center justify-center text-white shadow-coffee-sm">
              <WalletIcon size={20} color="#ffffff" />
            </div>
            <div>
              <p className="font-bold text-gray-900 text-xs">Payment Method</p>
              <p className="text-coffee-primary font-bold text-sm mt-0.5">{paymentMethod}</p>
            </div>
          </div>
          <ChevronRightIcon size={16} color="#C07340" />
        </button>
      </div>

      {/* ── PLACE ORDER DOCKED BAR ───────────── */}
      <div className="flex-shrink-0 bg-white/95 backdrop-blur-xl px-5 py-3.5 border-t border-gray-100 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] z-30">
        <button
          id="place-order-btn"
          onClick={() => {
            showToast('Order placed successfully! ☕');
            navigate('/tracking');
          }}
          className="btn-primary w-full text-white font-bold py-3.5 rounded-2xl text-xs shadow-coffee-md flex items-center justify-center gap-2 tracking-wide"
        >
          <span>Order Now · ${finalTotal}</span>
        </button>
      </div>

      {/* ── ADDRESS MODAL ────────────────────── */}
      <ModalWrapper isOpen={showAddressModal} onClose={() => setShowAddressModal(false)} title="Edit Delivery Address">
        <div className="space-y-4">
          <textarea
            value={tempAddress}
            onChange={(e) => setTempAddress(e.target.value)}
            rows={3}
            className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-3 text-xs text-gray-800 outline-none focus:border-coffee-primary"
            placeholder="Enter street, apartment, and city..."
          />
          <div className="flex gap-2">
            {['Home', 'Office', 'Apartment'].map((tag) => (
              <button
                key={tag}
                onClick={() => setTempAddress(`Jl. Kpg Sutoyo (${tag} Block B), Tanjungbalai`)}
                className="px-3 py-1.5 rounded-xl bg-orange-50 border border-orange-200 text-coffee-primary text-xs font-semibold"
              >
                + {tag}
              </button>
            ))}
          </div>
          <button
            onClick={() => {
              setAddress(tempAddress);
              setShowAddressModal(false);
              showToast('Address updated!');
            }}
            className="btn-primary w-full text-white font-bold py-3.5 rounded-2xl text-xs"
          >
            Save Address
          </button>
        </div>
      </ModalWrapper>

      {/* ── NOTE MODAL ───────────────────────── */}
      <ModalWrapper isOpen={showNoteModal} onClose={() => setShowNoteModal(false)} title="Barista Instructions">
        <div className="space-y-4">
          <textarea
            value={tempNote}
            onChange={(e) => setTempNote(e.target.value)}
            rows={3}
            className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-3 text-xs text-gray-800 outline-none focus:border-coffee-primary"
            placeholder="e.g., Extra hot, oat milk only, leave at the front door..."
          />
          <div className="flex flex-wrap gap-2">
            {['Extra hot', 'Less ice', 'No sugar', 'Leave at door'].map((preset) => (
              <button
                key={preset}
                onClick={() => setTempNote((prev) => (prev ? `${prev}, ${preset}` : preset))}
                className="px-3 py-1.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-600 text-xs font-semibold hover:border-coffee-primary"
              >
                + {preset}
              </button>
            ))}
          </div>
          <button
            onClick={() => {
              setNote(tempNote);
              setShowNoteModal(false);
              showToast('Note saved!');
            }}
            className="btn-primary w-full text-white font-bold py-3.5 rounded-2xl text-xs"
          >
            Save Instructions
          </button>
        </div>
      </ModalWrapper>

      {/* ── VOUCHER MODAL ────────────────────── */}
      <ModalWrapper isOpen={showVoucherModal} onClose={() => setShowVoucherModal(false)} title="Apply Voucher">
        <div className="space-y-4">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter promo code (e.g. BOGO2026)"
              value={voucherInput}
              onChange={(e) => setVoucherInput(e.target.value)}
              className="flex-1 bg-gray-50 border border-gray-200 rounded-2xl px-3.5 py-2.5 text-xs outline-none uppercase font-mono font-bold"
            />
            <button
              onClick={() => {
                if (applyVoucher(voucherInput)) setShowVoucherModal(false);
              }}
              className="btn-primary text-white text-xs font-bold px-4 py-2.5 rounded-2xl"
            >
              Apply
            </button>
          </div>

          <div className="space-y-2">
            {availableVouchers.map((v) => (
              <div
                key={v.code}
                onClick={() => {
                  applyVoucher(v.code);
                  setShowVoucherModal(false);
                }}
                className={`p-3.5 rounded-2xl border cursor-pointer flex items-center justify-between ${
                  discount.code === v.code
                    ? 'border-coffee-primary bg-orange-50/70'
                    : 'border-gray-100 bg-gray-50 hover:bg-orange-50/30'
                }`}
              >
                <div>
                  <p className="font-mono font-bold text-xs text-coffee-primary">{v.code}</p>
                  <p className="text-xs font-bold text-gray-800">{v.label}</p>
                </div>
                {discount.code === v.code && <CheckIcon size={16} color="#C07340" />}
              </div>
            ))}
          </div>
        </div>
      </ModalWrapper>

      {/* ── PAYMENT METHOD MODAL ─────────────── */}
      <ModalWrapper isOpen={showPaymentModal} onClose={() => setShowPaymentModal(false)} title="Select Payment Method">
        <div className="space-y-2.5">
          {['Cash / Wallet', 'Apple Pay', 'Google Pay', 'Credit Card (•••• 4921)'].map((method) => (
            <button
              key={method}
              onClick={() => {
                setPaymentMethod(method);
                setShowPaymentModal(false);
                showToast(`Payment method set to ${method}`);
              }}
              className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between transition-all ${
                paymentMethod === method
                  ? 'border-coffee-primary bg-orange-50/70 font-bold text-coffee-primary'
                  : 'border-gray-100 bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <WalletIcon size={18} color="#C07340" />
                <span className="text-xs font-bold">{method}</span>
              </div>
              {paymentMethod === method && <CheckIcon size={16} color="#C07340" />}
            </button>
          ))}
        </div>
      </ModalWrapper>
    </div>
  );
};

export default OrderScreen;
