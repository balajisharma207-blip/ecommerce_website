import React, { useState, useRef, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { CURRENCIES, PRODUCTS } from '../data/products';
import { CurrencyCode, Product } from '../types';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  Package, 
  ChevronDown, 
  Sparkles, 
  X,
  Menu,
  Zap,
  CheckCircle2
} from 'lucide-react';

interface NavbarProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
}) => {
  const { 
    cartCount, 
    wishlist, 
    orders, 
    setIsCartOpen, 
    setIsWishlistOpen, 
    setIsOrdersOpen,
    currency,
    setCurrency,
    setQuickViewProduct
  } = useShop();

  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const currencyRef = useRef<HTMLDivElement>(null);

  // Close search suggestions on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
      if (currencyRef.current && !currencyRef.current.contains(e.target as Node)) {
        setCurrencyDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter products for search autocomplete preview
  const searchResults: Product[] = searchQuery.trim()
    ? PRODUCTS.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  return (
    <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-slate-800/80 transition-shadow">
      {/* Top micro promo announcement */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/70 to-slate-900 text-slate-300 text-xs py-1.5 px-4 text-center font-medium border-b border-slate-800/60 flex items-center justify-center gap-2">
        <span className="inline-flex items-center gap-1 text-amber-400 font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>bigmark Special:</span>
        </span>
        <span className="text-slate-300">
          Use coupon <strong className="text-amber-300 font-bold">WELCOME15</strong> for 15% off + Free Shipping over $100
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 gap-4">
          
          {/* Brand Logo - bigmark */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                onSelectCategory('all');
                onSearchChange('');
              }}
              className="flex items-center gap-2.5 text-left group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-indigo-600 flex items-center justify-center text-slate-950 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform font-black">
                <span className="text-xl tracking-tighter">bm</span>
              </div>
              <div>
                <span className="font-extrabold text-2xl tracking-tighter text-white flex items-center">
                  big<span className="text-amber-400">mark</span>
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block -mt-1">
                  Premium Gear
                </span>
              </div>
            </button>
          </div>

          {/* Search bar with autocomplete */}
          <div className="flex-1 max-w-lg hidden md:block" ref={searchRef}>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                placeholder="Search headphones, jackets, watches, ceramics..."
                className="w-full pl-10 pr-9 py-2 rounded-full border border-slate-800 bg-slate-900/90 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/80 focus:border-amber-400 transition-all shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              {/* Autocomplete Dropdown */}
              {isSearchFocused && searchQuery.trim().length > 0 && (
                <div className="absolute top-full mt-2 left-0 right-0 bg-slate-900 rounded-2xl shadow-2xl border border-slate-800 overflow-hidden z-50">
                  <div className="p-2 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400 px-3">
                    <span>Products matching "{searchQuery}"</span>
                    <span>{searchResults.length} found</span>
                  </div>
                  {searchResults.length > 0 ? (
                    <div className="max-h-80 overflow-y-auto divide-y divide-slate-800/80">
                      {searchResults.map((product) => (
                        <div
                          key={product.id}
                          onClick={() => {
                            setQuickViewProduct(product);
                            setIsSearchFocused(false);
                          }}
                          className="flex items-center gap-3 p-2.5 hover:bg-slate-800/70 cursor-pointer transition-colors"
                        >
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-11 h-11 object-cover rounded-lg border border-slate-800 shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-white truncate">
                              {product.name}
                            </p>
                            <p className="text-xs text-slate-400 capitalize">
                              {product.category} • ${product.price.toFixed(2)}
                            </p>
                          </div>
                          <span className="text-xs font-semibold text-amber-400 whitespace-nowrap bg-amber-400/10 border border-amber-400/20 px-2 py-0.5 rounded-full">
                            View
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-6 text-center text-slate-400 text-sm">
                      No matching products found for "{searchQuery}".
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right Action Icons & Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Currency Selector */}
            <div className="relative hidden sm:block" ref={currencyRef}>
              <button
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-slate-800 bg-slate-900 text-xs font-semibold text-slate-200 hover:bg-slate-800 hover:border-slate-700 transition-colors"
              >
                <span>{currency}</span>
                <span className="text-slate-400">({CURRENCIES[currency].symbol})</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {currencyDropdownOpen && (
                <div className="absolute right-0 mt-1.5 w-36 bg-slate-900 rounded-xl shadow-2xl border border-slate-800 py-1.5 z-50">
                  {(Object.keys(CURRENCIES) as CurrencyCode[]).map((cur) => (
                    <button
                      key={cur}
                      onClick={() => {
                        setCurrency(cur);
                        setCurrencyDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-slate-800 hover:text-amber-400 ${
                        currency === cur ? 'font-bold text-amber-400 bg-slate-800/60' : 'text-slate-300'
                      }`}
                    >
                      <span>{cur}</span>
                      <span className="text-slate-400">{CURRENCIES[cur].symbol}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Orders History Button */}
            <button
              onClick={() => setIsOrdersOpen(true)}
              className="relative p-2.5 rounded-xl text-slate-300 hover:text-amber-400 hover:bg-slate-900 border border-transparent hover:border-slate-800 transition-colors flex items-center gap-1.5"
              title="My Orders"
              aria-label="View Order History"
            >
              <Package className="w-5 h-5" />
              {orders.length > 0 && (
                <span className="hidden lg:inline text-xs font-semibold">
                  Orders ({orders.length})
                </span>
              )}
            </button>

            {/* Wishlist Button */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="relative p-2.5 rounded-xl text-slate-300 hover:text-rose-400 hover:bg-slate-900 border border-transparent hover:border-slate-800 transition-colors"
              title="Wishlist"
              aria-label="View Saved Items"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center shadow-sm">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Cart Drawer Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 px-3.5 py-2 rounded-xl font-bold text-sm shadow-lg shadow-amber-500/20 active:scale-95 transition-all"
              aria-label="Open Shopping Cart"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 text-slate-950" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-slate-950 text-amber-400 text-[10px] font-black flex items-center justify-center border border-amber-400">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline">Cart</span>
            </button>

            {/* Mobile menu hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:bg-slate-900 md:hidden"
              aria-label="Toggle menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile Search input */}
        <div className="pb-3 md:hidden">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-800 bg-slate-900 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>
        </div>
      </div>
    </header>
  );
};
