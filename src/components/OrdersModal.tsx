import React from 'react';
import { useShop } from '../context/ShopContext';
import { 
  X, 
  Package, 
  Truck, 
  CheckCircle2, 
  Clock, 
  MapPin
} from 'lucide-react';

export const OrdersModal: React.FC = () => {
  const { orders, isOrdersOpen, setIsOrdersOpen, formatPrice } = useShop();

  if (!isOrdersOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        className="relative bg-slate-900 rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden border border-slate-800 my-8 flex flex-col max-h-[90vh] text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
          <div className="flex items-center gap-2.5">
            <Package className="w-5 h-5 text-amber-400" />
            <h2 className="text-base font-extrabold text-white">
              bigmark Orders ({orders.length})
            </h2>
          </div>
          <button
            onClick={() => setIsOrdersOpen(false)}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
            aria-label="Close orders"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Orders List */}
        <div className="overflow-y-auto p-5 space-y-5">
          {orders.length > 0 ? (
            orders.map((order) => (
              <div
                key={order.id}
                className="border border-slate-800 rounded-2xl p-5 bg-slate-950 shadow-md space-y-4"
              >
                {/* Order Top Bar */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-850 text-xs">
                  <div>
                    <span className="text-slate-500">Order ID:</span>{' '}
                    <span className="font-mono font-bold text-white">{order.id}</span>
                    <span className="text-slate-600 mx-2">•</span>
                    <span className="text-slate-400">{order.date}</span>
                  </div>

                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-400/10 text-amber-300 border border-amber-400/20 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-amber-400" />
                    {order.status}
                  </span>
                </div>

                {/* Tracking Progress Stepper */}
                <div className="py-2">
                  <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 mb-2">
                    <span className="text-amber-400 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Order Placed
                    </span>
                    <span className="text-amber-400 font-bold flex items-center gap-1">
                      <Package className="w-3.5 h-3.5" /> Warehouse
                    </span>
                    <span className="text-slate-500 flex items-center gap-1">
                      <Truck className="w-3.5 h-3.5" /> Dispatched
                    </span>
                    <span className="text-slate-500 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" /> Delivered
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-amber-400 to-amber-500 h-full w-1/2 rounded-full" />
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-slate-500 mt-1.5 font-medium">
                    <span>Tracking: <strong className="text-slate-300 font-mono">{order.trackingNumber}</strong></span>
                    <span>Est. Delivery: <strong className="text-amber-300">{order.estimatedDelivery}</strong></span>
                  </div>
                </div>

                {/* Items in this Order */}
                <div className="divide-y divide-slate-850 pt-1">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-10 h-10 object-cover rounded-lg border border-slate-800 bg-slate-900 shrink-0"
                        />
                        <div>
                          <p className="font-bold text-white">{item.product.name}</p>
                          <p className="text-[11px] text-slate-500">
                            Qty: {item.quantity} {item.selectedColor ? `• ${item.selectedColor}` : ''}
                          </p>
                        </div>
                      </div>
                      <span className="font-bold text-white">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Order Footer & Destination */}
                <div className="pt-3 border-t border-slate-850 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="text-slate-400">
                    <span>Delivering to: </span>
                    <strong className="text-slate-200">
                      {order.shippingAddress.fullName}, {order.shippingAddress.city}, {order.shippingAddress.country}
                    </strong>
                  </div>
                  <div className="text-sm font-extrabold text-white">
                    Total: <span className="text-amber-400">{formatPrice(order.total)}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-16 text-center text-slate-400">
              <div className="w-16 h-16 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center text-slate-500 mx-auto mb-3">
                <Package className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-white text-sm">No orders yet</h3>
              <p className="text-xs text-slate-500 max-w-xs mx-auto mt-1">
                When you place orders on bigmark, they will appear here with live tracking milestones and receipts.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
