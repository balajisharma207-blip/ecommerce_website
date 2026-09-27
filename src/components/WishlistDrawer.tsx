import React from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';

export const WishlistDrawer: React.FC = () => {
  const {
    wishlist,
    isWishlistOpen,
    setIsWishlistOpen,
    toggleWishlist,
    addToCart,
    formatPrice,
    setQuickViewProduct
  } = useShop();

  if (!isWishlistOpen) return null;

  const savedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/80 backdrop-blur-sm flex justify-end animate-fadeIn">
      <div className="absolute inset-0" onClick={() => setIsWishlistOpen(false)} />

      <div className="relative w-full max-w-md bg-slate-900 border-l border-slate-800 h-full shadow-2xl flex flex-col z-10 text-slate-100">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
            <h2 className="text-base font-extrabold text-white">
              Saved Wishlist ({savedProducts.length})
            </h2>
          </div>
          <button
            onClick={() => setIsWishlistOpen(false)}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close wishlist"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content List */}
        <div className="flex-1 overflow-y-auto p-5 divide-y divide-slate-800">
          {savedProducts.length > 0 ? (
            savedProducts.map((product) => (
              <div key={product.id} className="py-4 first:pt-0 last:pb-0 flex gap-3.5">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  onClick={() => {
                    setQuickViewProduct(product);
                    setIsWishlistOpen(false);
                  }}
                  className="w-20 h-20 object-cover rounded-xl border border-slate-800 bg-slate-950 shrink-0 cursor-pointer hover:opacity-90"
                />

                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-1">
                      <h4
                        onClick={() => {
                          setQuickViewProduct(product);
                          setIsWishlistOpen(false);
                        }}
                        className="text-xs font-bold text-white hover:text-amber-400 cursor-pointer line-clamp-1"
                      >
                        {product.name}
                      </h4>
                      <button
                        onClick={() => toggleWishlist(product.id)}
                        className="text-slate-500 hover:text-rose-400 p-1"
                        title="Remove from wishlist"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="text-[11px] text-slate-400 capitalize">{product.category}</p>
                    <p className="text-sm font-extrabold text-white mt-1">
                      {formatPrice(product.price)}
                    </p>
                  </div>

                  <div className="mt-2">
                    <button
                      onClick={() => addToCart(product, 1)}
                      className="w-full py-1.5 px-3 rounded-lg bg-slate-800 hover:bg-amber-400 hover:text-slate-950 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors border border-slate-700"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Move to Cart</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
              <div className="w-16 h-16 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center text-rose-400 mb-3">
                <Heart className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-white text-sm">Your wishlist is empty</h3>
              <p className="text-xs text-slate-400 max-w-xs mt-1">
                Save items you love by tapping the heart icon on any product card in bigmark.
              </p>
            </div>
          )}
        </div>

        {savedProducts.length > 0 && (
          <div className="p-4 border-t border-slate-800 bg-slate-950">
            <button
              onClick={() => {
                savedProducts.forEach((p) => addToCart(p, 1));
              }}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 text-xs font-extrabold flex items-center justify-center gap-2 shadow-lg shadow-amber-400/20"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add All to Cart</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
