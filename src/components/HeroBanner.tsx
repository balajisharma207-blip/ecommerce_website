import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Truck, RefreshCw, Award, Zap } from 'lucide-react';

interface HeroBannerProps {
  onShopNow: () => void;
  onExploreCategory: (category: string) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onShopNow, onExploreCategory }) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white rounded-3xl mx-4 sm:mx-6 lg:mx-8 mt-6 shadow-2xl border border-slate-800">
      {/* Background ambient radial glow */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-gradient-to-br from-amber-500/20 to-indigo-600/25 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-gradient-to-tr from-indigo-500/20 to-amber-500/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 py-12 sm:py-16 md:py-20 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-10">
        
        {/* Left Copy */}
        <div className="max-w-xl text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-wider mb-6">
            <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>Welcome to bigmark</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight sm:leading-none text-white">
            Where Distinct Craft Meets <span className="bg-gradient-to-r from-amber-400 via-amber-200 to-indigo-400 bg-clip-text text-transparent">Peak Engineering</span>.
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
            Discover studio acoustic architecture, Japanese titanium optics, horological chronographs, and Italian double-faced wool curated for the modern connoisseur.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-4">
            <button
              onClick={onShopNow}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-extrabold text-sm shadow-xl shadow-amber-500/25 flex items-center gap-2 group transition-all"
            >
              <span>Explore bigmark Catalog</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => onExploreCategory('electronics')}
              className="px-6 py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border border-slate-700 font-semibold text-sm transition-all"
            >
              Featured Electronics
            </button>
          </div>

          {/* Micro promo tag */}
          <div className="mt-6 flex items-center justify-center lg:justify-start gap-2 text-xs text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Use code <strong className="text-amber-300 font-bold">WELCOME15</strong> at checkout for 15% off first order</span>
          </div>
        </div>

        {/* Right Feature Card Visual */}
        <div className="w-full lg:w-auto relative max-w-md">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-700/80 bg-slate-800/80 p-4">
            <div className="relative h-64 sm:h-72 rounded-xl overflow-hidden group">
              <img
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80"
                alt="Aura Pro Headphones"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent flex flex-col justify-end p-5">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  bigmark Spotlight
                </span>
                <h3 className="text-lg font-bold text-white">Aura Pro Wireless ANC</h3>
                <p className="text-xs text-slate-300">40-Hour Battery • Custom Spatial Drivers • $249.99</p>
              </div>
            </div>
            
            {/* Quick benefits row */}
            <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-slate-700/50 text-[11px] text-slate-300">
              <div className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-amber-400" />
                <span>Free Express Shipping</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>2-Year Warranty</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Badges Strip */}
      <div className="border-t border-slate-800/80 bg-slate-950/80 py-4 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-medium text-slate-300">
          <div className="flex items-center gap-2.5 justify-center md:justify-start">
            <Truck className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Fast Global Delivery over $100</span>
          </div>
          <div className="flex items-center gap-2.5 justify-center md:justify-start">
            <RefreshCw className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>30-Day Hassle-Free Returns</span>
          </div>
          <div className="flex items-center gap-2.5 justify-center md:justify-start">
            <ShieldCheck className="w-4 h-4 text-indigo-400 shrink-0" />
            <span>Secure 256-Bit SSL Checkout</span>
          </div>
          <div className="flex items-center gap-2.5 justify-center md:justify-start">
            <Award className="w-4 h-4 text-purple-400 shrink-0" />
            <span>Authentic Certified Goods</span>
          </div>
        </div>
      </div>
    </div>
  );
};
