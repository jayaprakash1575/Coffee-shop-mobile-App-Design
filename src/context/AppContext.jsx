import React, { createContext, useContext, useState, useEffect } from 'react';
import { coffees } from '../data/coffees';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  // ── Favorites State ───────────────────────────────────────────
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('coffee_favorites');
      return saved ? JSON.parse(saved) : [1, 3]; // default initial favorites
    } catch {
      return [1, 3];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('coffee_favorites', JSON.stringify(favorites));
    } catch (e) {
      console.error(e);
    }
  }, [favorites]);

  const toggleFavorite = (id) => {
    setFavorites(prev => {
      const exists = prev.includes(id);
      const next = exists ? prev.filter(item => item !== id) : [...prev, id];
      showToast(exists ? 'Removed from Wishlist' : 'Added to Wishlist! ❤️');
      return next;
    });
  };

  const isFavorite = (id) => favorites.includes(id);

  // ── Cart State ───────────────────────────────────────────────
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('coffee_cart');
      return saved ? JSON.parse(saved) : [
        {
          cartId: 'item-1',
          coffeeId: 1,
          size: 'M',
          qty: 1,
          price: 4.53,
        }
      ];
    } catch {
      return [{ cartId: 'item-1', coffeeId: 1, size: 'M', qty: 1, price: 4.53 }];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('coffee_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  const addToCart = (coffee, size = 'M', qty = 1) => {
    const sizeMultiplier = { S: 0.85, M: 1.0, L: 1.2 };
    const unitPrice = parseFloat((coffee.price * (sizeMultiplier[size] || 1)).toFixed(2));
    
    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.coffeeId === coffee.id && item.size === size);
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          qty: next[existingIndex].qty + qty,
        };
        return next;
      }
      return [
        ...prev,
        {
          cartId: `item-${Date.now()}-${Math.random()}`,
          coffeeId: coffee.id,
          size,
          qty,
          price: unitPrice,
        }
      ];
    });
    showToast(`Added ${qty}x ${coffee.name} to Cart! ☕`);
  };

  const updateCartQty = (cartId, delta) => {
    setCart(prev =>
      prev
        .map(item => {
          if (item.cartId === cartId) {
            const newQty = item.qty + delta;
            return newQty > 0 ? { ...item, qty: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const removeFromCart = (cartId) => {
    setCart(prev => prev.filter(item => item.cartId !== cartId));
    showToast('Item removed from cart');
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  // ── Discount / Voucher ────────────────────────────────────────
  const [discount, setDiscount] = useState({
    code: 'COFFEE50',
    amount: 1.0,
    label: '$1.00 Welcome Discount',
    active: true,
  });

  const availableVouchers = [
    { code: 'COFFEE50', amount: 1.0, label: '$1.00 Off CoffeeCo Welcome', minOrder: 0 },
    { code: 'BOGO2026', amount: 2.0, label: '$2.00 Off Buy-One-Get-One', minOrder: 6.0 },
    { code: 'FREESHIP', amount: 1.0, label: 'Free Delivery ($1.00 Off)', minOrder: 5.0 },
  ];

  const applyVoucher = (code) => {
    const voucher = availableVouchers.find(v => v.code.toUpperCase() === code.trim().toUpperCase());
    if (voucher) {
      setDiscount({ ...voucher, active: true });
      showToast(`Voucher "${voucher.code}" applied! 🎉`);
      return true;
    }
    showToast('Invalid promo code');
    return false;
  };

  const removeVoucher = () => {
    setDiscount({ code: '', amount: 0, label: 'No discount applied', active: false });
    showToast('Discount removed');
  };

  // ── Delivery Address & Notes ──────────────────────────────────
  const [address, setAddress] = useState('Jl. Kpg Sutoyo No. 620, Bilzen, Tanjungbalai');
  const [note, setNote] = useState('Please leave by the front door');
  const [deliveryMode, setDeliveryMode] = useState('Deliver'); // 'Deliver' | 'Pick Up'
  const [paymentMethod, setPaymentMethod] = useState('Cash / Wallet'); // 'Cash / Wallet', 'Apple Pay', 'Credit Card'

  // ── Loyalty Points ────────────────────────────────────────────
  const [loyaltyPoints, setLoyaltyPoints] = useState(480);
  const redeemReward = (pts, rewardName) => {
    if (loyaltyPoints >= pts) {
      setLoyaltyPoints(p => p - pts);
      showToast(`Redeemed ${rewardName}! (-${pts} pts) 🎁`);
      return true;
    }
    showToast('Not enough points yet!');
    return false;
  };

  // ── Notifications ─────────────────────────────────────────────
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Order on the way!',
      desc: 'Courier Brooklyn Simmons is 8 minutes away with your Caffe Mocha.',
      time: 'Just now',
      read: false,
      tag: 'Order',
    },
    {
      id: 2,
      title: '🎉 Buy 1 Get 1 FREE Today',
      desc: 'Use promo code BOGO2026 at checkout for double coffee goodness.',
      time: '2 hours ago',
      read: false,
      tag: 'Offer',
    },
    {
      id: 3,
      title: 'Loyalty Reward Unlocked',
      desc: 'You reached 480 points! Claim a free artisan espresso shot.',
      time: 'Yesterday',
      read: true,
      tag: 'Reward',
    },
  ]);

  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    showToast('All notifications marked as read');
  };

  // ── Toast Notification System ────────────────────────────────
  const [toast, setToast] = useState({ visible: false, message: '' });

  const showToast = (message) => {
    setToast({ visible: true, message });
    setTimeout(() => {
      setToast({ visible: false, message: '' });
    }, 2400);
  };

  // Helper to get full coffee object for cart item
  const cartItemsWithDetails = cart.map(item => {
    const coffee = coffees.find(c => c.id === item.coffeeId) || coffees[0];
    return {
      ...item,
      coffee,
      lineTotal: (item.price * item.qty).toFixed(2),
    };
  });

  return (
    <AppContext.Provider
      value={{
        favorites,
        toggleFavorite,
        isFavorite,
        cart,
        cartItems: cartItemsWithDetails,
        addToCart,
        updateCartQty,
        removeFromCart,
        clearCart,
        cartCount,
        cartSubtotal,
        discount,
        availableVouchers,
        applyVoucher,
        removeVoucher,
        address,
        setAddress,
        note,
        setNote,
        deliveryMode,
        setDeliveryMode,
        paymentMethod,
        setPaymentMethod,
        loyaltyPoints,
        redeemReward,
        notifications,
        unreadNotificationsCount,
        markAllNotificationsRead,
        showToast,
      }}
    >
      {children}

      {/* Floating Global Toast */}
      {toast.visible && (
        <div className="fixed top-12 left-1/2 -translate-x-1/2 z-[999] pointer-events-none transition-all duration-300 animate-fade-down">
          <div className="bg-gray-900/95 backdrop-blur-xl text-white px-5 py-3 rounded-2xl shadow-2xl border border-white/10 flex items-center gap-2 text-sm font-semibold tracking-wide">
            <span>{toast.message}</span>
          </div>
        </div>
      )}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
