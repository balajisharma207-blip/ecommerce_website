import React, { useState } from 'react';
import { Store, Send, ShieldCheck, Truck, RefreshCw, Heart } from 'lucide-react';
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
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-20">
      
      {/* Newsletter Strip */}
      <div className="border-b border-slate-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-md text-center md:text-left">
            <h3 className="text-xl font-extrabold text-white">
              Stay in the loop.
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
              className="flex-1 px-4 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-md flex items-center gap-1.5 transition-colors shrink-0"
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
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white">
              <Store className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-lg tracking-tight text-white">
              Nova<span className="text-indigo-400">Mart</span>
            </span>
          </div>
          <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
            Curated essentials engineered with timeless craftsmanship, organic materials, and minimalist aesthetics. Built for endurance and everyday elegance.
          </p>
          <div className="flex items-center gap-3 text-slate-400 text-xs">
            <span>© 2026 NovaMart Inc.</span>
            <span>•</span>
            <span>All rights reserved.</span>
          </div>
        </div>

        {/* Column: Categories */}
        <div className="space-y-3">
          <h4 className="font-bold text-white uppercase tracking-wider text-xs">Explore</h4>
          <ul className="space-y-2 text-slate-400">
            <li><a href="#catalog-section" className="hover:text-white transition-colors">Audio & Electronics</a></li>
            <li><a href="#catalog-section" className="hover:text-white transition-colors">Apparel & Outerwear</a></li>
            <li><a href="#catalog-section" className="hover:text-white transition-colors">Home & Living</a></li>
            <li><a href="#catalog-section" className="hover:text-white transition-colors">Footwear Collection</a></li>
            <li><a href="#catalog-section" className="hover:text-white transition-colors">Travel Gear & Bags</a></li>
          </ul>
        </div>

        {/* Column: Customer Care */}
        <div className="space-y-3">
          <h4 className="font-bold text-white uppercase tracking-wider text-xs">Customer Care</h4>
          <ul className="space-y-2 text-slate-400">
            <li><span className="hover:text-white transition-colors cursor-pointer">Order Tracking</span></li>
            <li><span className="hover:text-white transition-colors cursor-pointer">Shipping & Delivery</span></li>
            <li><span className="hover:text-white transition-colors cursor-pointer">30-Day Returns Policy</span></li>
            <li><span className="hover:text-white transition-colors cursor-pointer">Warranty & Repairs</span></li>
            <li><span className="hover:text-white transition-colors cursor-pointer">Contact Support</span></li>
          </ul>
        </div>

        {/* Column: Guarantees */}
        <div className="space-y-3">
          <h4 className="font-bold text-white uppercase tracking-wider text-xs">Our Commitment</h4>
          <ul className="space-y-2 text-slate-400">
            <li className="flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-indigo-400" />
              <span>Carbon-Neutral Freight</span>
            </li>
            <li className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Certified Authentic</span>
            </li>
            <li className="flex items-center gap-1.5">
              <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
              <span>Circular Recycling</span>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
