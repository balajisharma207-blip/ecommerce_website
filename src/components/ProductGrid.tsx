import React, { useState, useMemo } from 'react';
import { Product } from '../types';
import { CATEGORIES } from '../data/products';
import { ProductCard } from './ProductCard';
import { SlidersHorizontal, ArrowUpDown, X, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';

interface ProductGridProps {
  products: Product[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  searchQuery: string;
  onClearSearch: () => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onClearSearch,
}) => {
  const { formatPrice } = useShop();

  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [maxPrice, setMaxPrice] = useState<number>(450);
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);

  // Compute filtered & sorted products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category
        if (selectedCategory !== 'all' && p.category !== selectedCategory) {
          return false;
        }
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const match =
            p.name.toLowerCase().includes(q) ||
            p.tagline.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q);
          if (!match) return false;
        }
        // In-stock
        if (inStockOnly && (!p.inStock || p.stockCount <= 0)) {
          return false;
        }
        // Max Price
        if (p.price > maxPrice) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        // featured default
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      });
  }, [products, selectedCategory, searchQuery, inStockOnly, maxPrice, sortBy]);

  const resetAllFilters = () => {
    onSelectCategory('all');
    onClearSearch();
    setInStockOnly(false);
    setMaxPrice(450);
    setSortBy('featured');
  };

  const hasActiveFilters =
    selectedCategory !== 'all' ||
    searchQuery.trim() !== '' ||
    inStockOnly ||
    maxPrice < 450;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10" id="catalog-section">
      
      {/* Category Pills Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all flex items-center gap-2 border ${
                isSelected
                  ? 'bg-amber-400 text-slate-950 border-amber-400 shadow-lg shadow-amber-400/20 font-bold'
                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700 hover:bg-slate-850 hover:text-white'
              }`}
            >
              <span>{cat.name}</span>
              <span
                className={`text-[11px] px-1.5 py-0.2 rounded-full font-bold ${
                  isSelected ? 'bg-slate-950 text-amber-400' : 'bg-slate-800 text-slate-400'
                }`}
              >
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Filter and Controls Toolbar */}
      <div className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-md">
        
        {/* Left: Active Results Count & Active tags */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
          <span className="font-bold text-white text-sm">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'Product' : 'Products'} Found
          </span>

          {searchQuery && (
            <span className="inline-flex items-center gap-1 bg-amber-400/10 text-amber-300 border border-amber-400/20 font-medium px-2.5 py-1 rounded-lg">
              Search: "{searchQuery}"
              <button onClick={onClearSearch} className="hover:text-white ml-1">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {hasActiveFilters && (
            <button
              onClick={resetAllFilters}
              className="text-amber-400 hover:text-amber-300 hover:underline font-bold text-xs ml-2 cursor-pointer"
            >
              Clear all filters
            </button>
          )}
        </div>

        {/* Right: Sort Dropdown & Filter Toggle */}
        <div className="flex items-center gap-3">
          
          {/* Quick in-stock checkbox */}
          <label className="hidden md:flex items-center gap-2 text-xs font-semibold text-slate-300 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
              className="rounded border-slate-700 bg-slate-800 text-amber-400 focus:ring-amber-400 accent-amber-400"
            />
            <span>In Stock Only</span>
          </label>

          {/* Price Range Slider */}
          <div className="hidden lg:flex items-center gap-2 text-xs text-slate-300">
            <span>Under {formatPrice(maxPrice)}</span>
            <input
              type="range"
              min="50"
              max="450"
              step="10"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-24 accent-amber-400 cursor-pointer"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-slate-200">
            <ArrowUpDown className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent text-slate-200 font-semibold focus:outline-none cursor-pointer"
            >
              <option value="featured" className="bg-slate-900 text-white">Featured First</option>
              <option value="price-low" className="bg-slate-900 text-white">Price: Low to High</option>
              <option value="price-high" className="bg-slate-900 text-white">Price: High to Low</option>
              <option value="rating" className="bg-slate-900 text-white">Highest Rated</option>
            </select>
          </div>

          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setShowFilterDrawer(!showFilterDrawer)}
            className="lg:hidden p-2 rounded-xl border border-slate-800 hover:bg-slate-800 text-slate-300"
            title="Filter options"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mobile Filters Panel */}
      {showFilterDrawer && (
        <div className="mt-3 p-4 bg-slate-900 rounded-2xl border border-slate-800 lg:hidden space-y-4 text-slate-200">
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-300 mb-2">
              <span>Maximum Price</span>
              <span className="text-amber-400 font-bold">{formatPrice(maxPrice)}</span>
            </div>
            <input
              type="range"
              min="50"
              max="450"
              step="10"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-amber-400"
            />
          </div>

          <label className="flex items-center gap-2 text-xs font-medium text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
              className="rounded border-slate-700 bg-slate-800 text-amber-400 accent-amber-400"
            />
            <span>Show In-Stock items only</span>
          </label>
        </div>
      )}

      {/* Product Grid Cards */}
      {filteredProducts.length > 0 ? (
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="mt-12 py-16 px-4 text-center rounded-3xl bg-slate-900/90 border border-slate-800">
          <div className="w-14 h-14 rounded-2xl bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-white">No matching products found</h3>
          <p className="mt-1 text-sm text-slate-400 max-w-sm mx-auto">
            Try adjusting your search terms, changing the category, or expanding your price range.
          </p>
          <button
            onClick={resetAllFilters}
            className="mt-6 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 text-xs font-bold transition-colors shadow-lg shadow-amber-500/20 cursor-pointer"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </section>
  );
};
