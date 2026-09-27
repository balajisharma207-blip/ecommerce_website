import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { 
  X, 
  Star, 
  Heart, 
  ShoppingBag, 
  Check, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  ChevronRight,
  MessageSquarePlus,
  UserCheck
} from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const { 
    quickViewProduct, 
    setQuickViewProduct, 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    formatPrice,
    setIsCheckoutOpen,
    productReviews,
    addReview
  } = useShop();

  const product = quickViewProduct;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'reviews'>('overview');

  // Review Form State
  const [isAddingReview, setIsAddingReview] = useState(false);
  const [revAuthor, setRevAuthor] = useState('');
  const [revRating, setRevRating] = useState(5);
  const [revTitle, setRevTitle] = useState('');
  const [revComment, setRevComment] = useState('');

  if (!product) return null;

  const currentColor = selectedColor || (product.colors && product.colors[0]?.name);
  const currentSize = selectedSize || (product.sizes && product.sizes[0]);
  const isFavorited = isInWishlist(product.id);
  const reviews = productReviews[product.id] || [];

  const handleAddToCart = () => {
    addToCart(product, quantity, currentColor, currentSize);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, currentColor, currentSize);
    setQuickViewProduct(null);
    setIsCheckoutOpen(true);
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!revAuthor.trim() || !revComment.trim()) return;

    addReview(product.id, {
      author: revAuthor,
      rating: revRating,
      title: revTitle || 'Customer Review',
      comment: revComment,
      verified: true,
    });

    setRevAuthor('');
    setRevTitle('');
    setRevComment('');
    setIsAddingReview(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        className="relative bg-white rounded-3xl max-w-4xl w-full shadow-2xl overflow-hidden border border-slate-200 my-8 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            
            {/* Gallery Section */}
            <div className="space-y-4">
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                <img
                  src={product.images[activeImageIndex] || product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.badge && (
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-900 text-white">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto pb-1">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImageIndex(i)}
                      className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                        activeImageIndex === i
                          ? 'border-indigo-600 ring-2 ring-indigo-600/30'
                          : 'border-slate-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`thumb-${i}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Meta & Buying Controls */}
            <div className="space-y-5">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
                  {product.category}
                </span>
                <h2 className="mt-2 text-2xl font-extrabold text-slate-900 tracking-tight">
                  {product.name}
                </h2>
                <p className="mt-1 text-sm text-slate-600 leading-relaxed font-medium">
                  {product.tagline}
                </p>

                {/* Rating & Reviews anchor */}
                <div className="mt-3 flex items-center gap-3 text-sm">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-slate-300'
                        }`}
                      />
                    ))}
                    <span className="font-bold text-slate-800 ml-1">{product.rating}</span>
                  </div>
                  <span className="text-slate-400">•</span>
                  <button
                    onClick={() => setActiveTab('reviews')}
                    className="text-indigo-600 hover:underline text-xs font-semibold"
                  >
                    {reviews.length + product.reviewCount} customer reviews
                  </button>
                </div>
              </div>

              {/* Price display */}
              <div className="flex items-baseline gap-3 pt-2 border-t border-slate-100">
                <span className="text-3xl font-extrabold text-slate-900">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-base text-slate-400 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full ml-auto">
                  In Stock ({product.stockCount} available)
                </span>
              </div>

              {/* Color Selector */}
              {product.colors && product.colors.length > 0 && (
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold text-slate-700">
                    <span>Color</span>
                    <span className="text-slate-500 font-normal">{currentColor}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c.name)}
                        className={`group relative p-0.5 rounded-full border-2 transition-all ${
                          currentColor === c.name
                            ? 'border-indigo-600 scale-110'
                            : 'border-transparent hover:border-slate-300'
                        }`}
                        title={c.name}
                      >
                        <span
                          className="block w-6 h-6 rounded-full shadow-inner border border-black/10"
                          style={{ backgroundColor: c.hex }}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selector */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold text-slate-700">
                    <span>Size / Variant</span>
                    <span className="text-slate-500 font-normal">{currentSize}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                          currentSize === sz
                            ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity and Actions */}
              <div className="pt-2 space-y-3">
                <div className="flex items-center gap-3">
                  {/* Quantity Counter */}
                  <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 p-1">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 rounded-lg bg-white flex items-center justify-center font-bold text-slate-600 hover:bg-slate-100 shadow-xs"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="w-10 text-center font-bold text-sm text-slate-800">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                      className="w-8 h-8 rounded-lg bg-white flex items-center justify-center font-bold text-slate-600 hover:bg-slate-100 shadow-xs"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  {/* Add to Cart button */}
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 py-3 px-5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 active:scale-98 transition-all"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </button>

                  {/* Wishlist toggle */}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className={`p-3 rounded-xl border transition-all ${
                      isFavorited
                        ? 'bg-rose-50 border-rose-200 text-rose-500'
                        : 'border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                    aria-label="Save to wishlist"
                  >
                    <Heart className={`w-5 h-5 ${isFavorited ? 'fill-rose-500' : ''}`} />
                  </button>
                </div>

                {/* Instant Buy Now Button */}
                <button
                  onClick={handleBuyNow}
                  className="w-full py-3 px-5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 transition-all"
                >
                  <span>Instant Checkout</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Trust highlights */}
              <div className="grid grid-cols-3 gap-2 pt-4 border-t border-slate-100 text-[11px] text-slate-500">
                <div className="flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-indigo-500 shrink-0" />
                  <span>Free shipping &gt;$100</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <RotateCcw className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>30-Day returns</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>2-Year guarantee</span>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Tabs: Overview, Specifications, Reviews */}
          <div className="pt-6 border-t border-slate-200">
            <div className="flex border-b border-slate-200 gap-6">
              <button
                onClick={() => setActiveTab('overview')}
                className={`pb-3 text-sm font-bold border-b-2 transition-all ${
                  activeTab === 'overview'
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Overview & Description
              </button>
              <button
                onClick={() => setActiveTab('specs')}
                className={`pb-3 text-sm font-bold border-b-2 transition-all ${
                  activeTab === 'specs'
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Technical Specifications
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`pb-3 text-sm font-bold border-b-2 transition-all flex items-center gap-1.5 ${
                  activeTab === 'reviews'
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <span>Customer Reviews</span>
                <span className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full">
                  {reviews.length}
                </span>
              </button>
            </div>

            {/* Tab 1: Overview */}
            {activeTab === 'overview' && (
              <div className="py-6 space-y-4">
                <p className="text-sm text-slate-700 leading-relaxed">
                  {product.description}
                </p>
                {product.features && product.features.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2">
                      Key Highlights
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                      {product.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Tab 2: Specifications */}
            {activeTab === 'specs' && (
              <div className="py-6">
                <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden">
                  {Object.entries(product.specs).map(([label, val], idx) => (
                    <div
                      key={idx}
                      className="grid grid-cols-3 p-3.5 text-xs even:bg-slate-50/50"
                    >
                      <span className="font-semibold text-slate-600">{label}</span>
                      <span className="col-span-2 text-slate-900 font-medium">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 3: Reviews & Write a Review */}
            {activeTab === 'reviews' && (
              <div className="py-6 space-y-6">
                {/* Header and write review trigger */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div>
                    <h4 className="text-base font-bold text-slate-900">
                      Ratings & Feedback
                    </h4>
                    <p className="text-xs text-slate-500">
                      {product.rating} out of 5 stars based on verified purchases
                    </p>
                  </div>
                  <button
                    onClick={() => setIsAddingReview(!isAddingReview)}
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
                  >
                    <MessageSquarePlus className="w-3.5 h-3.5" />
                    <span>{isAddingReview ? 'Cancel Review' : 'Write a Review'}</span>
                  </button>
                </div>

                {/* Inline Review Form */}
                {isAddingReview && (
                  <form onSubmit={handleSubmitReview} className="p-5 rounded-2xl border border-indigo-200 bg-indigo-50/30 space-y-4">
                    <h5 className="text-sm font-bold text-slate-900">Share Your Experience</h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Your Name</label>
                        <input
                          type="text"
                          required
                          value={revAuthor}
                          onChange={(e) => setRevAuthor(e.target.value)}
                          placeholder="e.g. Alex Morgan"
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs focus:ring-2 focus:ring-indigo-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Rating</label>
                        <select
                          value={revRating}
                          onChange={(e) => setRevRating(Number(e.target.value))}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs focus:ring-2 focus:ring-indigo-500 outline-none"
                        >
                          <option value="5">★★★★★ (5 - Exceptional)</option>
                          <option value="4">★★★★☆ (4 - Great)</option>
                          <option value="3">★★★☆☆ (3 - Average)</option>
                          <option value="2">★★☆☆☆ (2 - Poor)</option>
                          <option value="1">★☆☆☆☆ (1 - Disappointed)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Headline</label>
                      <input
                        type="text"
                        value={revTitle}
                        onChange={(e) => setRevTitle(e.target.value)}
                        placeholder="Brief summary of your review"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs focus:ring-2 focus:ring-indigo-500 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Detailed Review</label>
                      <textarea
                        rows={3}
                        required
                        value={revComment}
                        onChange={(e) => setRevComment(e.target.value)}
                        placeholder="What did you love or dislike about this product?"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs focus:ring-2 focus:ring-indigo-500 outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700"
                    >
                      Publish Review
                    </button>
                  </form>
                )}

                {/* Review items */}
                {reviews.length > 0 ? (
                  <div className="space-y-4">
                    {reviews.map((rev) => (
                      <div key={rev.id} className="p-4 rounded-2xl border border-slate-100 bg-white shadow-2xs space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {rev.avatar ? (
                              <img src={rev.avatar} alt={rev.author} className="w-8 h-8 rounded-full object-cover" />
                            ) : (
                              <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">
                                {rev.author.charAt(0)}
                              </div>
                            )}
                            <div>
                              <p className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                                {rev.author}
                                {rev.verified && (
                                  <span className="inline-flex items-center gap-0.5 text-[10px] text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded font-medium">
                                    <UserCheck className="w-3 h-3" />
                                    Verified Buyer
                                  </span>
                                )}
                              </p>
                              <span className="text-[10px] text-slate-600">{rev.date}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-0.5 text-amber-400">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3.5 h-3.5 ${
                                  i < rev.rating ? 'fill-amber-400' : 'text-slate-200'
                                }`}
                              />
                            ))}
                          </div>
                        </div>

                        <h5 className="text-xs font-bold text-slate-800">{rev.title}</h5>
                        <p className="text-xs text-slate-600 leading-relaxed">{rev.comment}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center py-8 text-xs text-slate-600">
                    No reviews yet. Be the first to share your experience!
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
