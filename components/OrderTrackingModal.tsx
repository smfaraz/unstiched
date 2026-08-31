'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useEcommerce } from '@/context/EcommerceContext';
import {
  X,
  Search,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  FileText,
  Phone,
  MessageCircle,
  ExternalLink,
} from 'lucide-react';

export default function OrderTrackingModal() {
  const {
    orders,
    activeModal,
    closeModals,
    trackingOrderId,
    formatPrice,
  } = useEcommerce();

  const [query, setQuery] = useState(trackingOrderId || '');
  const [selectedOrder, setSelectedOrder] = useState(() => {
    if (trackingOrderId) {
      return orders.find((o) => o.id === trackingOrderId) || orders[0];
    }
    return orders[0];
  });

  if (activeModal !== 'order_tracking') return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    const found = orders.find(
      (o) =>
        o.id.toLowerCase() === query.trim().toLowerCase() ||
        o.trackingNumber.toLowerCase() === query.trim().toLowerCase() ||
        o.customer.phone.includes(query.trim())
    );
    if (found) {
      setSelectedOrder(found);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#FAF9F6] rounded-xs shadow-2xl overflow-hidden border border-[#E5E2D9] my-8 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-[#E5E2D9] shrink-0">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-[#8B4513]" />
            <span className="font-serif text-lg font-bold text-[#1A1A1A] tracking-tight">
              Pan-India Order & Shipment Tracking
            </span>
          </div>
          <button
            onClick={closeModals}
            className="p-1.5 text-[#1A1A1A] hover:bg-[#F2F0E9] rounded-xs transition"
            aria-label="Close tracking modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6 flex-1 text-xs">
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Enter Order ID (e.g. PEH-IND-2026-89421) or Mobile Number"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-white border border-[#E5E2D9] rounded-xs pl-9 pr-3 py-2.5 text-xs font-semibold focus:outline-none focus:border-black"
              />
              <Search className="w-4 h-4 text-[#8B4513] absolute left-3 top-3" />
            </div>
            <button
              type="submit"
              className="bg-black hover:bg-[#222] text-white px-5 py-2.5 rounded-xs font-bold uppercase tracking-wider transition text-xs shadow-xs"
            >
              Track Order
            </button>
          </form>

          {/* Quick Select from existing customer orders */}
          {orders.length > 1 && (
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#777] shrink-0">Recent Orders:</span>
              {orders.map((o) => (
                <button
                  key={o.id}
                  onClick={() => setSelectedOrder(o)}
                  className={`px-3 py-1.5 rounded-xs border text-[11px] font-semibold whitespace-nowrap transition ${
                    selectedOrder?.id === o.id
                      ? 'bg-black text-white border-black'
                      : 'bg-white text-[#1A1A1A] border-[#E5E2D9] hover:bg-[#FAF5EE]'
                  }`}
                >
                  #{o.id} ({o.orderStatus})
                </button>
              ))}
            </div>
          )}

          {selectedOrder ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left 7 cols: Live Status Timeline & Courier Details */}
              <div className="lg:col-span-7 space-y-4">
                {/* Courier Card */}
                <div className="bg-white p-4 sm:p-5 rounded-xs border border-[#E5E2D9] shadow-xs space-y-3">
                  <div className="flex items-center justify-between border-b border-[#E5E2D9] pb-2.5">
                    <div>
                      <span className="text-[9px] uppercase tracking-widest font-bold text-[#777]">
                        Airway Bill (AWB)
                      </span>
                      <div className="text-sm font-mono font-bold text-[#8B4513]">
                        {selectedOrder.trackingNumber}
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-[9px] uppercase tracking-widest font-bold text-[#777]">
                        Status
                      </span>
                      <div>
                        <span className="inline-block bg-[#FAF5EE] border border-[#E5E2D9] text-[#8B4513] text-xs font-bold px-2.5 py-0.5 rounded-xs uppercase tracking-wider">
                          {selectedOrder.orderStatus}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] text-[#555]">
                    <div>
                      <strong className="text-[#1A1A1A]">Carrier:</strong> {selectedOrder.courierName}
                    </div>
                    <div>
                      <strong className="text-[#1A1A1A]">Est. Delivery:</strong> {selectedOrder.estimatedDelivery}
                    </div>
                    <div>
                      <strong className="text-[#1A1A1A]">Destination:</strong> {selectedOrder.customer.city} ({selectedOrder.customer.pincode})
                    </div>
                    <div>
                      <strong className="text-[#1A1A1A]">Payment:</strong> {selectedOrder.paymentMethod.toUpperCase()} ({selectedOrder.paymentStatus})
                    </div>
                  </div>
                </div>

                {/* Tracking Milestones Timeline */}
                <div className="bg-white p-4 sm:p-5 rounded-xs border border-[#E5E2D9] shadow-xs space-y-4">
                  <div className="font-serif font-bold text-xs uppercase tracking-wider text-[#1A1A1A]">
                    Real-Time BlueDart Tracking Events
                  </div>

                  <div className="space-y-4 relative before:content-[''] before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E5E2D9]">
                    {selectedOrder.trackingTimeline.map((event, idx) => (
                      <div key={idx} className="flex items-start gap-4 relative">
                        <div
                          className={`w-6 h-6 rounded-xs flex items-center justify-center shrink-0 z-10 ${
                            event.isCompleted
                              ? 'bg-black text-white shadow-xs'
                              : 'bg-[#E5E2D9] text-[#777]'
                          }`}
                        >
                          {event.isCompleted ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Clock className="w-3 h-3" />}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4
                              className={`font-serif font-bold text-xs ${
                                event.isCompleted ? 'text-[#1A1A1A]' : 'text-[#777]'
                              }`}
                            >
                              {event.status}
                            </h4>
                            <span className="text-[10px] text-[#777]">{event.timestamp}</span>
                          </div>
                          <p className="text-[11px] text-[#555] mt-0.5">{event.description}</p>
                          <div className="text-[10px] text-[#8B4513] font-semibold flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3 h-3" />
                            <span>{event.location}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right 5 cols: Order Items & Customer Support */}
              <div className="lg:col-span-5 space-y-4">
                <div className="bg-white p-4 sm:p-5 rounded-xs border border-[#E5E2D9] shadow-xs space-y-3">
                  <div className="font-serif font-bold text-xs uppercase tracking-wider text-[#1A1A1A] border-b border-[#E5E2D9] pb-2">
                    Ensemble Package Contents
                  </div>

                  <div className="space-y-3">
                    {selectedOrder.items.map((item) => (
                      <div key={item.id} className="flex gap-2.5 items-center">
                        <div className="relative w-12 h-14 bg-[#EBE9E1] rounded-xs overflow-hidden shrink-0 border border-[#E5E2D9]">
                          <Image
                            src={item.product.images[0]}
                            alt={item.product.title}
                            fill
                            className="object-cover"
                            sizes="48px"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-[#8B4513] text-[9px] uppercase tracking-widest">
                            {item.product.brand}
                          </div>
                          <div className="font-serif font-semibold text-[#1A1A1A] truncate text-xs">
                            {item.product.title}
                          </div>
                          <div className="text-[10px] text-[#777]">
                            {item.stitchingOption === 'unstitched'
                              ? '3-Piece Unstitched'
                              : `Stitched (${item.selectedSize})`}
                          </div>
                        </div>
                        <div className="font-bold text-[#1A1A1A]">
                          {formatPrice(item.totalPrice)}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-[#E5E2D9] flex justify-between font-bold text-xs">
                    <span>Total Invoice Paid:</span>
                    <span className="text-black font-serif text-sm">{formatPrice(selectedOrder.grandTotal)}</span>
                  </div>
                </div>

                {/* Delivery Address Card */}
                <div className="bg-white p-4 rounded-xs border border-[#E5E2D9] shadow-xs text-[11px] space-y-1 text-[#555]">
                  <div className="font-serif font-bold text-xs text-[#1A1A1A] uppercase tracking-wider mb-1">
                    Shipping Address
                  </div>
                  <div>
                    <strong className="text-[#1A1A1A]">{selectedOrder.customer.fullName}</strong>
                  </div>
                  <div>{selectedOrder.customer.addressLine1}</div>
                  <div>
                    {selectedOrder.customer.city}, {selectedOrder.customer.state} -{' '}
                    {selectedOrder.customer.pincode}
                  </div>
                  <div>
                    <strong className="text-[#1A1A1A]">Phone:</strong> +91 {selectedOrder.customer.phone}
                  </div>
                </div>

                {/* WhatsApp Escalation button */}
                <a
                  href={`https://wa.me/919820089123?text=Hi%20Pehnava%20Lawns,%20I%20am%20inquiring%20about%20Order%20%23${selectedOrder.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#1A1A1A] hover:bg-black text-white p-3 rounded-xs font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 shadow-xs transition border border-black"
                >
                  <MessageCircle className="w-4 h-4 text-[#22C55E]" />
                  <span>Support for this Order on WhatsApp</span>
                </a>
              </div>
            </div>
          ) : (
            <div className="py-12 text-center text-[#777]">
              No order found matching your search. Please check your Order ID or phone number.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
