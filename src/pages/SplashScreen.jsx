import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { CupIcon, ArrowRightIcon, SparkleIcon } from '../components/Icons';

const SplashScreen = () => {
  const navigate = useNavigate();
  const canvasRef = useRef(null);

  // Floating coffee bean/particle dust canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles = Array.from({ length: 32 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2.2 + 0.6,
      vx: (Math.random() - 0.5) * 0.25,
      vy: -Math.random() * 0.4 - 0.15,
      opacity: Math.random() * 0.4 + 0.1,
    }));

    let animId;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212,168,71,${p.opacity})`;
        ctx.fill();
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < 0) {
          p.y = canvas.height;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-black flex flex-col justify-between">
      {/* Hero background image */}
      <img
        src="/splash_coffee.jpg"
        alt="Artisan Roast Coffee"
        className="absolute inset-0 w-full h-full object-cover scale-105"
        style={{ animation: 'float 7s ease-in-out infinite' }}
      />

      {/* Deep gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/45 to-black/95" />
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 65%, rgba(192,115,64,0.22) 0%, transparent 75%)',
        }}
      />

      {/* Floating particles */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Top Status / Open Pill */}
      <div className="relative z-10 pt-14 px-6 flex justify-center">
        <div className="glass px-4 py-2 rounded-full flex items-center gap-2 border border-white/20 shadow-lg">
          <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
          <span className="text-white/90 text-xs font-bold tracking-widest uppercase">
            Open Daily · 7 AM – 10 PM
          </span>
        </div>
      </div>

      {/* Bottom Content Card */}
      <div className="relative z-10 px-7 pb-12 pt-6">
        {/* Animated Cup Icon */}
        <div className="flex justify-center mb-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-coffee-primary to-coffee-dark flex items-center justify-center shadow-coffee-lg">
              <CupIcon size={30} color="#ffffff" />
            </div>
            <div className="absolute inset-0 rounded-full bg-coffee-primary opacity-40 animate-pulse-ring pointer-events-none" />
          </div>
        </div>

        {/* Brand Kicker */}
        <div className="flex items-center justify-center gap-2 mb-2">
          <SparkleIcon size={12} color="#D4A847" />
          <p className="text-coffee-gold text-xs font-extrabold tracking-[0.3em] uppercase">
            CoffeeCo Roastery
          </p>
          <SparkleIcon size={12} color="#D4A847" />
        </div>

        {/* Headline */}
        <h1
          className="font-display text-4xl font-black text-center text-white leading-[1.15] mb-3"
          style={{ textShadow: '0 2px 20px rgba(0,0,0,0.6)' }}
        >
          Fall in Love with
          <br />
          <span className="text-shimmer">Coffee in Blissful</span>
          <br />
          Delight!
        </h1>

        {/* Subtitle */}
        <p className="text-white/70 text-xs text-center mb-8 leading-relaxed max-w-xs mx-auto font-medium">
          Welcome to our cozy artisan roastery, where every handcrafted brew is a heartwarming sensory journey.
        </p>

        {/* Get Started CTA */}
        <div>
          <button
            id="get-started-btn"
            onClick={() => navigate('/home')}
            className="btn-primary w-full text-white font-black text-base py-4 rounded-2xl tracking-wide flex items-center justify-center gap-2 shadow-coffee-md active:scale-95 transition-all"
          >
            <span>Get Started</span>
            <ArrowRightIcon size={18} color="#ffffff" />
          </button>
        </div>

        {/* Pagination indicator dots */}
        <div className="flex justify-center gap-1.5 mt-5">
          <div className="w-6 h-1.5 rounded-full bg-coffee-primary" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
