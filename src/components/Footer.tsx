import React, { useState } from 'react';
import { Send, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Footer: React.FC = () => {
  const { addToast } = useShop();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      addToast('Please enter a valid email address', 'error');
      return;
    }
    addToast('Subscribed! Check your inbox for your 15% discount coupon.', 'success');
    setEmail('');
  };

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 mt-20">
      
      {/* Newsletter Strip */}
      <div className="border-b border-slate-850 py-12 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-md text-center md:text-left">
            <h3 className="text-xl font-extrabold text-white">
              Stay ahead with bigmark.
            </h3>
            <p className="mt-1 text-sm text-slate-400">
              Subscribe to get exclusive product drops, member-only sales, and design articles.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full max-w-md flex gap-2">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address..."
              className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-sm shadow-md flex items-center gap-1.5 transition-colors shrink-0 cursor-pointer"
            >
              <span>Join</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-2 md:grid-cols-5 gap-8 text-xs">
        
        {/* Brand Column */}
        <div className="col-span-2 space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center text-slate-950 font-black text-lg">
              bm
            </div>
            <span className="font-extrabold text-xl tracking-tighter text-white">
              big<span className="text-amber-400">mark</span>
            </span>
          </div>
          <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
            Curated essentials engineered with timeless craftsmanship, organic materials, and minimalist aesthetics. Built for endurance and everyday elegance.
          </p>
          <div className="flex items-center gap-3 text-slate-500 text-xs">
            <span>© 2026 bigmark Inc.</span>
            <span>•</span>
            <span>All rights reserved.</span>
          </div>
        </div>

        {/* Column: Categories */}
        <div className="space-y-3">
          <h4 className="font-bold text-white uppercase tracking-wider text-xs">Explore</h4>
          <ul className="space-y-2 text-slate-400">
            <li><a href="#catalog-section" className="hover:text-amber-400 transition-colors">Audio & Electronics</a></li>
            <li><a href="#catalog-section" className="hover:text-amber-400 transition-colors">Apparel & Outerwear</a></li>
            <li><a href="#catalog-section" className="hover:text-amber-400 transition-colors">Home & Living</a></li>
            <li><a href="#catalog-section" className="hover:text-amber-400 transition-colors">Footwear Collection</a></li>
            <li><a href="#catalog-section" className="hover:text-amber-400 transition-colors">Travel Gear & Bags</a></li>
          </ul>
        </div>

        {/* Column: Customer Care */}
        <div className="space-y-3">
          <h4 className="font-bold text-white uppercase tracking-wider text-xs">Customer Care</h4>
          <ul className="space-y-2 text-slate-400">
            <li><span className="hover:text-amber-400 transition-colors cursor-pointer">Order Tracking</span></li>
            <li><span className="hover:text-amber-400 transition-colors cursor-pointer">Shipping & Delivery</span></li>
            <li><span className="hover:text-amber-400 transition-colors cursor-pointer">30-Day Returns Policy</span></li>
            <li><span className="hover:text-amber-400 transition-colors cursor-pointer">Warranty & Repairs</span></li>
            <li><span className="hover:text-amber-400 transition-colors cursor-pointer">Contact Support</span></li>
          </ul>
        </div>

        {/* Column: Guarantees */}
        <div className="space-y-3">
          <h4 className="font-bold text-white uppercase tracking-wider text-xs">Our Commitment</h4>
          <ul className="space-y-2 text-slate-400">
            <li className="flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-amber-400" />
              <span>Carbon-Neutral Freight</span>
            </li>
            <li className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Certified Authentic</span>
            </li>
            <li className="flex items-center gap-1.5">
              <RefreshCw className="w-3.5 h-3.5 text-indigo-400" />
              <span>Circular Recycling</span>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
