import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ShippingAddress } from '../types';
import { 
  X, 
  CreditCard, 
  ShieldCheck, 
  Truck, 
  Lock, 
  CheckCircle2, 
  Wallet, 
  Banknote,
  Loader2
} from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    subtotal,
    discount,
    shippingFee,
    tax,
    formatPrice,
    placeOrder
  } = useShop();

  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'wallet' | 'cod'>('card');
  const [shippingSpeed, setShippingSpeed] = useState<'standard' | 'express'>('standard');

  const [formData, setFormData] = useState<ShippingAddress>({
    fullName: 'Balaji Sharma',
    email: 'balajisharma207@gmail.com',
    address: '742 Evergreen Terrace',
    city: 'San Francisco',
    state: 'CA',
    postalCode: '94107',
    country: 'United States',
    phone: '+1 (555) 234-5678',
  });

  const [cardData, setCardData] = useState({
    number: '4242 •••• •••• 4242',
    expiry: '12/28',
    cvc: '888',
    name: 'Balaji Sharma',
  });

  if (!isCheckoutOpen || cart.length === 0) return null;

  const finalShipping = shippingSpeed === 'express' ? shippingFee + 14.99 : shippingFee;
  const grandTotal = Math.max(0, subtotal - discount + finalShipping + tax);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      placeOrder(formData, paymentMethod === 'card' ? 'Credit Card' : paymentMethod === 'wallet' ? 'Apple Pay / Google Pay' : 'Cash on Delivery');
    }, 1400);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        className="relative bg-slate-900 rounded-3xl max-w-3xl w-full shadow-2xl overflow-hidden border border-slate-800 my-8 flex flex-col max-h-[92vh] text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-amber-400" />
            <h2 className="text-base font-extrabold text-white">
              bigmark Secure Checkout
            </h2>
          </div>
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-6">
          
          {/* Shipping Address */}
          <div>
            <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <Truck className="w-4 h-4 text-amber-400" />
              1. Delivery Information
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-950 text-white focus:ring-2 focus:ring-amber-400 outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-950 text-white focus:ring-2 focus:ring-amber-400 outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-slate-300 font-semibold mb-1">Street Address</label>
                <input
                  type="text"
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-950 text-white focus:ring-2 focus:ring-amber-400 outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">City</label>
                <input
                  type="text"
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-950 text-white focus:ring-2 focus:ring-amber-400 outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">State / Province</label>
                <input
                  type="text"
                  name="state"
                  required
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-950 text-white focus:ring-2 focus:ring-amber-400 outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Postal Code</label>
                <input
                  type="text"
                  name="postalCode"
                  required
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-950 text-white focus:ring-2 focus:ring-amber-400 outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-950 text-white focus:ring-2 focus:ring-amber-400 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Shipping Speed Selection */}
          <div className="pt-4 border-t border-slate-800">
            <h3 className="text-sm font-bold text-white mb-3">2. Shipping Method</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <label
                onClick={() => setShippingSpeed('standard')}
                className={`p-3.5 rounded-xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                  shippingSpeed === 'standard'
                    ? 'border-amber-400 bg-amber-400/10 text-white'
                    : 'border-slate-800 hover:border-slate-700 text-slate-300 bg-slate-950'
                }`}
              >
                <div>
                  <p className="font-bold text-white">Standard Delivery (3-5 days)</p>
                  <p className="text-slate-400 text-[11px]">Carbon-neutral insured shipping</p>
                </div>
                <span className="font-bold text-amber-400">{shippingFee === 0 ? 'FREE' : formatPrice(shippingFee)}</span>
              </label>

              <label
                onClick={() => setShippingSpeed('express')}
                className={`p-3.5 rounded-xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                  shippingSpeed === 'express'
                    ? 'border-amber-400 bg-amber-400/10 text-white'
                    : 'border-slate-800 hover:border-slate-700 text-slate-300 bg-slate-950'
                }`}
              >
                <div>
                  <p className="font-bold text-white">Priority Express (1-2 days)</p>
                  <p className="text-slate-400 text-[11px]">Next-flight air courier dispatch</p>
                </div>
                <span className="font-bold text-amber-400">+{formatPrice(14.99)}</span>
              </label>
            </div>
          </div>

          {/* Payment Method */}
          <div className="pt-4 border-t border-slate-800">
            <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-amber-400" />
              3. Payment Method
            </h3>

            {/* Method Tabs */}
            <div className="grid grid-cols-3 gap-2 mb-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                  paymentMethod === 'card'
                    ? 'border-amber-400 bg-amber-400/15 text-amber-300'
                    : 'border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <CreditCard className="w-3.5 h-3.5" />
                <span>Card</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('wallet')}
                className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                  paymentMethod === 'wallet'
                    ? 'border-amber-400 bg-amber-400/15 text-amber-300'
                    : 'border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Wallet className="w-3.5 h-3.5" />
                <span>Digital Wallet</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('cod')}
                className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                  paymentMethod === 'cod'
                    ? 'border-amber-400 bg-amber-400/15 text-amber-300'
                    : 'border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Banknote className="w-3.5 h-3.5" />
                <span>Cash on Delivery</span>
              </button>
            </div>

            {/* Credit Card Inputs */}
            {paymentMethod === 'card' && (
              <div className="p-4 rounded-2xl border border-slate-800 bg-slate-950 space-y-3 text-xs">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Card Number</label>
                  <input
                    type="text"
                    required
                    value={cardData.number}
                    onChange={(e) => setCardData({ ...cardData, number: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-900 text-white font-mono"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Expiry Date</label>
                    <input
                      type="text"
                      required
                      value={cardData.expiry}
                      onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-900 text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Security CVC</label>
                    <input
                      type="text"
                      required
                      value={cardData.cvc}
                      onChange={(e) => setCardData({ ...cardData, cvc: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-900 text-white font-mono"
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'wallet' && (
              <div className="p-4 rounded-2xl border border-slate-800 bg-slate-950 text-center text-xs text-slate-400">
                <p className="font-semibold text-white">One-Touch Express Checkout</p>
                <p className="mt-1">Apple Pay & Google Pay authentication will prompt upon placing order.</p>
              </div>
            )}

            {paymentMethod === 'cod' && (
              <div className="p-4 rounded-2xl border border-slate-800 bg-slate-950 text-center text-xs text-slate-400">
                <p className="font-semibold text-white">Pay on Handover</p>
                <p className="mt-1">You will pay via cash or card upon package arrival at your door.</p>
              </div>
            )}
          </div>

          {/* Order Summary & Submit button */}
          <div className="pt-4 border-t border-slate-800 space-y-3">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs space-y-1.5">
              <div className="flex justify-between text-slate-400">
                <span>Items ({cart.reduce((a, b) => a + b.quantity, 0)})</span>
                <span className="text-white font-medium">{formatPrice(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-400 font-semibold">
                  <span>Promo Savings</span>
                  <span>-{formatPrice(discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-400">
                <span>Shipping</span>
                <span className="text-white font-medium">{finalShipping === 0 ? 'FREE' : formatPrice(finalShipping)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Estimated Taxes</span>
                <span className="text-white font-medium">{formatPrice(tax)}</span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-white pt-2 border-t border-slate-800">
                <span>Total Amount Due</span>
                <span className="text-amber-400">{formatPrice(grandTotal)}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 disabled:opacity-50 text-slate-950 font-extrabold text-sm shadow-xl shadow-amber-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Authorizing Order...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Place Order • {formatPrice(grandTotal)}</span>
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Zero-risk guarantee • SSL 256-bit encryption</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
