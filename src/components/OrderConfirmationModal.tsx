import React from 'react';
import { useShop } from '../context/ShopContext';
import { CheckCircle, Package, Truck, ArrowRight, X } from 'lucide-react';

export const OrderConfirmationModal: React.FC = () => {
  const { lastPlacedOrder, setLastPlacedOrder, formatPrice, setIsOrdersOpen } = useShop();

  if (!lastPlacedOrder) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div 
        className="relative bg-white rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden border border-slate-200 p-6 sm:p-8 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setLastPlacedOrder(null)}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-9 h-9" />
        </div>

        <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
          Payment & Order Confirmed
        </span>
        <h2 className="text-2xl font-extrabold text-slate-900 mt-1">
          Thank you for your order!
        </h2>
        <p className="text-xs text-slate-600 mt-1">
          We've sent a confirmation receipt to <strong>{lastPlacedOrder.shippingAddress.email}</strong>
        </p>

        {/* Order Details Card */}
        <div className="mt-6 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs space-y-3">
          <div className="flex justify-between pb-2 border-b border-slate-200">
            <div>
              <p className="text-slate-600">Order Number</p>
              <p className="font-mono font-bold text-slate-900">{lastPlacedOrder.id}</p>
            </div>
            <div className="text-right">
              <p className="text-slate-600">Est. Delivery</p>
              <p className="font-bold text-indigo-600">{lastPlacedOrder.estimatedDelivery}</p>
            </div>
          </div>

          <div>
            <p className="text-slate-600 mb-1">Tracking Number</p>
            <p className="font-mono font-bold text-slate-800 bg-white p-2 rounded-lg border border-slate-200 flex items-center justify-between">
              <span>{lastPlacedOrder.trackingNumber}</span>
              <span className="text-indigo-600 text-[10px] font-sans font-semibold">Active Courier</span>
            </p>
          </div>

          <div>
            <p className="text-slate-600 mb-1">Purchased Items ({lastPlacedOrder.items.length})</p>
            <div className="max-h-36 overflow-y-auto space-y-2">
              {lastPlacedOrder.items.map((it, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-2 truncate pr-2">
                    <img src={it.product.images[0]} alt={it.product.name} className="w-8 h-8 rounded-md object-cover border border-slate-200" />
                    <span className="truncate text-slate-800 font-medium">
                      {it.quantity}x {it.product.name}
                    </span>
                  </div>
                  <span className="font-bold text-slate-900 whitespace-nowrap">
                    {formatPrice(it.product.price * it.quantity)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-slate-200 flex justify-between font-extrabold text-sm text-slate-900">
            <span>Total Paid</span>
            <span>{formatPrice(lastPlacedOrder.total)}</span>
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => {
              setLastPlacedOrder(null);
              setIsOrdersOpen(true);
            }}
            className="flex-1 py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2"
          >
            <Package className="w-4 h-4" />
            <span>Track Order History</span>
          </button>

          <button
            onClick={() => setLastPlacedOrder(null)}
            className="flex-1 py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-1.5"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
