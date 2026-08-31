'use client';

import React, { useState } from 'react';
import { useEcommerce } from '@/context/EcommerceContext';
import Link from 'next/link';
import {
  Package,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  MessageCircle,
  ChevronRight,
  Search,
  Scissors,
  ShieldCheck,
} from 'lucide-react';
import { Order } from '@/types/ecommerce';

export default function TrackOrderPage() {
  const { orders, formatPrice } = useEcommerce();
  const [orderQuery, setOrderQuery] = useState(orders[0]?.id || 'PEH-IND-2026-98124');
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(orders[0] || null);
  const [error, setError] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanQuery = orderQuery.trim().toUpperCase();
    const found = orders.find(
      (o) =>
        o.id.toUpperCase() === cleanQuery ||
        o.trackingNumber.toUpperCase() === cleanQuery ||
        o.customer.phone.includes(cleanQuery)
    );

    if (found) {
      setSearchedOrder(found);
      setError('');
    } else {
      setError(`No shipment found matching "${orderQuery}". Try sample orders: ${orders.map(o => o.id).join(' or ')}.`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-[#777]">
        <Link href="/" className="hover:text-black transition">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-black font-semibold">Track Order & Shipment</span>
      </nav>

      {/* Header */}
      <div className="border-b border-[#E5E2D9] pb-4">
        <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8B4513] mb-1">
          Real-time Pan-India Logistics
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#1A1A1A]">
          Track Your Pakistani Suit Shipment
        </h1>
        <p className="text-xs sm:text-sm text-[#666] mt-1">
          Enter your Pehnava order number or BlueDart / Delhivery Air tracking AWB number.
        </p>
      </div>

      {/* Search Bar */}
      <div className="bg-white border border-[#E5E2D9] p-6 rounded-xs shadow-xs space-y-4">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#777] absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Enter Order ID (e.g. PEH-IND-2026-98124) or Mobile / AWB"
              value={orderQuery}
              onChange={(e) => setOrderQuery(e.target.value)}
              className="w-full bg-[#FAF9F6] border border-[#E5E2D9] rounded-xs pl-10 pr-4 py-3 text-xs text-black font-semibold focus:outline-none focus:border-black"
            />
          </div>
          <button
            type="submit"
            className="bg-black hover:bg-[#2A2A2A] text-white font-bold text-xs uppercase tracking-widest px-8 py-3 rounded-xs transition shadow-xs whitespace-nowrap"
          >
            Track Status
          </button>
        </form>

        {/* Quick Sample Links */}
        <div className="flex items-center gap-2 text-xs text-[#777] flex-wrap">
          <span>Try sample orders:</span>
          {orders.map((o) => (
            <button
              key={o.id}
              onClick={() => {
                setOrderQuery(o.id);
                setSearchedOrder(o);
                setError('');
              }}
              className="underline font-semibold text-[#8B4513] hover:text-black"
            >
              {o.id} ({o.orderStatus})
            </button>
          ))}
        </div>

        {error && (
          <div className="p-3 bg-[#FEE2E2] text-[#B91C1C] text-xs rounded-xs font-medium">
            {error}
          </div>
        )}
      </div>

      {/* Order Status Display */}
      {searchedOrder && (
        <div className="bg-white border border-[#E5E2D9] rounded-xs p-6 sm:p-8 space-y-8 shadow-xs">
          {/* Top Order Summary Card */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5E2D9] pb-6">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif font-bold text-xl text-black">
                  Order #{searchedOrder.id}
                </h2>
                <span className="bg-[#FAF5EE] text-[#8B4513] border border-[#E8DFC8] text-[10px] font-bold px-2 py-0.5 rounded-xs uppercase tracking-wider">
                  {searchedOrder.orderStatus}
                </span>
              </div>
              <p className="text-xs text-[#666] mt-1">
                Placed on {searchedOrder.createdAt} • Courier: <strong>{searchedOrder.courierName} ({searchedOrder.trackingNumber})</strong>
              </p>
            </div>

            <div className="text-left sm:text-right">
              <div className="text-xs text-[#777]">Estimated Delivery</div>
              <div className="text-base font-bold text-[#2E7D32]">
                {searchedOrder.estimatedDelivery}
              </div>
            </div>
          </div>

          {/* Timeline Visualizer */}
          <div className="py-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#777] mb-6">
              Live Shipment Progress
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 relative">
              {searchedOrder.trackingTimeline.map((step, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-xs border transition ${
                    step.isCompleted
                      ? 'bg-[#FAF9F6] border-[#8B4513]/40'
                      : step.isCurrent
                      ? 'bg-[#FAF5EE] border-[#8B4513] ring-1 ring-[#8B4513]'
                      : 'bg-white border-[#E5E2D9] opacity-50'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    {step.isCompleted ? (
                      <CheckCircle2 className="w-4 h-4 text-[#8B4513]" />
                    ) : (
                      <Clock className="w-4 h-4 text-[#888]" />
                    )}
                    <span className="text-xs font-bold text-black">{step.status}</span>
                  </div>
                  <p className="text-[11px] text-[#666] leading-snug">{step.description}</p>
                  <div className="text-[10px] text-[#888] mt-2 font-mono">{step.timestamp}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery & Item Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#E5E2D9] text-xs">
            {/* Delivery Destination */}
            <div className="space-y-2 bg-[#FAF9F6] p-4 rounded-xs border border-[#E5E2D9]">
              <div className="font-bold text-black uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#8B4513]" />
                <span>Shipping Address</span>
              </div>
              <div className="text-[#444] space-y-0.5">
                <div className="font-semibold text-black">{searchedOrder.customer.fullName}</div>
                <div>{searchedOrder.customer.addressLine1} {searchedOrder.customer.landmark ? `(${searchedOrder.customer.landmark})` : ''}</div>
                <div>{searchedOrder.customer.city}, {searchedOrder.customer.state} - {searchedOrder.customer.pincode}</div>
                <div>Phone: +91 {searchedOrder.customer.phone}</div>
              </div>
            </div>

            {/* Item Details */}
            <div className="space-y-2 bg-[#FAF9F6] p-4 rounded-xs border border-[#E5E2D9]">
              <div className="font-bold text-black uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <Package className="w-3.5 h-3.5 text-[#8B4513]" />
                <span>Package Contents ({searchedOrder.items.length} suits)</span>
              </div>
              <div className="text-[#444] space-y-1.5">
                {searchedOrder.items.map((item) => (
                  <div key={item.id} className="flex justify-between items-start gap-2">
                    <div>
                      <div className="font-semibold text-black">{item.product.title} (x{item.quantity})</div>
                      <div className="text-[10px] text-[#777]">
                        {item.stitchingOption === 'unstitched'
                          ? '3-Piece Unstitched'
                          : item.stitchingOption === 'stitched_standard'
                          ? `Standard Stitched (${item.selectedSize})`
                          : 'Bespoke Custom Tailoring'}
                      </div>
                    </div>
                    <span className="font-semibold text-black shrink-0">{formatPrice(item.totalPrice)}</span>
                  </div>
                ))}
                <div className="pt-2 border-t border-[#E5E2D9] flex justify-between font-bold text-black text-xs">
                  <span>Total Paid ({searchedOrder.paymentMethod.toUpperCase()})</span>
                  <span>{formatPrice(searchedOrder.grandTotal)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Support Helpline Box */}
          <div className="bg-[#FAF5EE] border border-[#E8DFC8] p-4 rounded-xs flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-3 text-center sm:text-left">
              <Phone className="w-5 h-5 text-[#8B4513] shrink-0" />
              <div>
                <div className="font-bold text-black">Need assistance with your delivery?</div>
                <div className="text-[#666]">Our concierge team can modify delivery dates or coordinates.</div>
              </div>
            </div>
            <a
              href="https://wa.me/919820089123?text=Hi%20Pehnava%20Lawns,%20I%20need%20help%20with%20my%20order"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#22C55E] hover:bg-[#16A34A] text-white px-4 py-2.5 rounded-xs font-bold text-xs flex items-center gap-1.5 shrink-0"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Concierge</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
