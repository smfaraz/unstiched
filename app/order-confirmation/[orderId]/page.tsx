'use client';

import React, { use } from 'react';
import { useEcommerce } from '@/context/EcommerceContext';
import Image from 'next/image';
import Link from 'next/link';
import {
  CheckCircle2,
  Package,
  Truck,
  MapPin,
  MessageCircle,
  Printer,
  ArrowRight,
  ShieldCheck,
  Scissors,
  Sparkles,
  Phone,
  Calendar,
  Clock,
  Download,
} from 'lucide-react';

interface PageProps {
  params: Promise<{ orderId: string }>;
}

export default function OrderConfirmationPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const { getOrderById, formatPrice } = useEcommerce();

  const order = getOrderById(resolvedParams.orderId);

  if (!order) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="font-serif text-3xl font-bold text-black">Order Not Found</h1>
        <p className="text-xs text-[#666]">
          We couldn&apos;t locate an order with ID <span className="font-bold text-black">{resolvedParams.orderId}</span>.
        </p>
        <Link
          href="/products"
          className="inline-block bg-black text-white text-xs font-bold uppercase tracking-widest px-8 py-3.5 rounded-xs"
        >
          Return to Catalog
        </Link>
      </div>
    );
  }

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] py-8 print:bg-white print:py-0">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Success Header Card */}
        <div className="bg-white border border-[#E5E2D9] rounded-xs p-6 sm:p-8 text-center space-y-4 shadow-xs">
          <div className="w-16 h-16 rounded-full bg-[#E8F5E9] text-[#2E7D32] flex items-center justify-center mx-auto border border-[#C8E6C9]">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-1">
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8B4513]">
              Order Confirmed & Payment Verified
            </div>
            <h1 className="font-serif text-2xl sm:text-4xl font-bold text-[#1A1A1A]">
              Thank You, {order.customer.fullName}!
            </h1>
            <p className="text-xs sm:text-sm text-[#555] max-w-lg mx-auto">
              Your order <span className="font-bold text-black">#{order.id}</span> has been confirmed. We have dispatched SMS & Email notifications to {order.customer.phone}.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href={`/track-order?id=${order.id}`}
              className="bg-black hover:bg-[#2A2A2A] text-white text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-xs shadow-xs transition flex items-center gap-2"
            >
              <Package className="w-4 h-4" />
              <span>Track Live Dispatch Status</span>
            </Link>

            <button
              onClick={handlePrint}
              className="bg-white border border-[#E5E2D9] hover:bg-[#FAF5EE] text-black text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-xs transition flex items-center gap-2"
            >
              <Printer className="w-4 h-4 text-[#8B4513]" />
              <span>Print Tax Invoice</span>
            </button>

            <a
              href={`https://wa.me/919820089123?text=Hi%20Pehnava%20Lawns,%20I%20just%20placed%20order%20${order.id}%20and%20need%20assistance.`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#22C55E] hover:bg-[#16A34A] text-white text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-xs transition flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>WhatsApp Stylist Concierge</span>
            </a>
          </div>
        </div>

        {/* Live Tracking Progress Timeline */}
        <div className="bg-white border border-[#E5E2D9] rounded-xs p-6 space-y-6 shadow-xs">
          <div className="flex items-center justify-between border-b border-[#E5E2D9] pb-3">
            <div className="font-serif font-bold text-base text-black flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#8B4513]" />
              <span>Estimated Delivery: {order.estimatedDelivery}</span>
            </div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#2E7D32] bg-[#E8F5E9] px-2.5 py-1 rounded-xs">
              Status: {order.orderStatus.replace('_', ' ')}
            </span>
          </div>

          <div className="space-y-4">
            {order.timeline.map((event, idx) => (
              <div key={idx} className="flex gap-4 items-start">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      event.isCompleted
                        ? 'bg-[#2E7D32] text-white'
                        : 'bg-[#FAF5EE] text-[#888] border border-[#E8DFC8]'
                    }`}
                  >
                    ✓
                  </div>
                  {idx < order.timeline.length - 1 && (
                    <div
                      className={`w-0.5 h-10 ${
                        event.isCompleted ? 'bg-[#2E7D32]' : 'bg-[#E5E2D9]'
                      }`}
                    />
                  )}
                </div>

                <div className="space-y-0.5 pt-0.5 flex-1">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs font-bold text-black">{event.status}</span>
                    <span className="text-[10px] text-[#888]">{event.timestamp}</span>
                  </div>
                  <p className="text-[11px] text-[#555]">{event.description}</p>
                  <span className="text-[10px] text-[#8B4513] font-semibold">{event.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Details & Summary Card */}
        <div className="bg-white border border-[#E5E2D9] rounded-xs p-6 space-y-6 shadow-xs">
          <h2 className="font-serif font-bold text-lg text-black border-b border-[#E5E2D9] pb-3">
            Itemized Order Summary
          </h2>

          <div className="space-y-4 divide-y divide-[#F2F0E9]">
            {order.items.map((item) => (
              <div key={item.id} className="pt-4 first:pt-0 flex flex-col sm:flex-row gap-4 justify-between">
                <div className="flex gap-4">
                  <div className="relative w-16 sm:w-20 aspect-3/4 rounded-xs overflow-hidden bg-[#EBE9E1] shrink-0 border border-[#E5E2D9]">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.title}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-[#8B4513]">
                      {item.product.brand}
                    </div>
                    <div className="font-serif font-bold text-xs sm:text-sm text-black">
                      {item.product.title}
                    </div>
                    <div className="text-xs text-[#666]">
                      Qty: {item.quantity} × {formatPrice(item.unitPrice)}
                    </div>
                    <div className="text-xs pt-1">
                      {item.stitchingOption === 'unstitched' ? (
                        <span className="text-[#555] bg-[#FAF9F6] px-2 py-0.5 rounded-xs border border-[#E5E2D9] text-[11px]">
                          3-Piece Unstitched Fabric
                        </span>
                      ) : item.stitchingOption === 'stitched_standard' ? (
                        <span className="text-[#8B4513] font-semibold bg-[#FAF5EE] px-2 py-0.5 rounded-xs border border-[#E8DFC8] text-[11px]">
                          Standard Stitched (Size: {item.selectedSize})
                        </span>
                      ) : (
                        <span className="text-[#8B4513] font-bold bg-[#FAF5EE] px-2 py-0.5 rounded-xs border border-[#E8DFC8] text-[11px]">
                          Bespoke Made-to-Measure
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="text-right sm:self-center">
                  <div className="font-serif font-bold text-sm sm:text-base text-black">
                    {formatPrice(item.totalPrice)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pricing breakdown */}
          <div className="border-t border-[#E5E2D9] pt-4 space-y-2 text-xs">
            <div className="flex justify-between text-[#666]">
              <span>Suits Subtotal</span>
              <span className="font-semibold text-black">{formatPrice(order.subtotal)}</span>
            </div>
            {order.stitchingTotal > 0 && (
              <div className="flex justify-between text-[#666]">
                <span>Boutique Tailoring</span>
                <span className="font-semibold text-black">+{formatPrice(order.stitchingTotal)}</span>
              </div>
            )}
            {order.discountTotal > 0 && (
              <div className="flex justify-between text-[#2E7D32] font-semibold">
                <span>Coupon Discount ({order.couponCode})</span>
                <span>-{formatPrice(order.discountTotal)}</span>
              </div>
            )}
            <div className="flex justify-between text-[#666]">
              <span>BlueDart Air Express Pan-India</span>
              <span className="font-bold text-[#2E7D32] uppercase text-[10px]">Free</span>
            </div>
            <div className="border-t border-[#E5E2D9] pt-3 flex justify-between items-baseline">
              <span className="font-serif font-bold text-base text-black">Total Paid / Payable</span>
              <span className="font-serif font-bold text-xl text-black">
                {formatPrice(order.grandTotal)}
              </span>
            </div>
          </div>
        </div>

        {/* Shipping & Payment Meta Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white border border-[#E5E2D9] rounded-xs p-6 space-y-2 shadow-xs text-xs">
            <div className="font-serif font-bold text-sm text-black flex items-center gap-1.5 border-b border-[#E5E2D9] pb-2">
              <MapPin className="w-4 h-4 text-[#8B4513]" />
              <span>Delivery Address</span>
            </div>
            <div className="font-bold text-black">{order.customer.fullName}</div>
            <div className="text-[#555]">{order.customer.addressLine1}</div>
            {order.customer.addressLine2 && <div className="text-[#555]">{order.customer.addressLine2}</div>}
            <div className="text-[#555]">{order.customer.city}, {order.customer.state} - {order.customer.pincode}</div>
            <div className="text-[#555]">Phone: +91 {order.customer.phone}</div>
          </div>

          <div className="bg-white border border-[#E5E2D9] rounded-xs p-6 space-y-2 shadow-xs text-xs">
            <div className="font-serif font-bold text-sm text-black flex items-center gap-1.5 border-b border-[#E5E2D9] pb-2">
              <ShieldCheck className="w-4 h-4 text-[#8B4513]" />
              <span>Payment & Shipping Method</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#666]">Payment Mode:</span>
              <span className="font-bold uppercase text-black">{order.paymentMethod}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#666]">Payment Status:</span>
              <span className="font-bold text-[#2E7D32] uppercase">{order.paymentStatus}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#666]">Carrier:</span>
              <span className="font-bold text-black">{order.shippingCarrier}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#666]">Tracking AWB:</span>
              <span className="font-mono font-bold text-[#8B4513]">{order.trackingNumber}</span>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center pt-4">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-black hover:bg-[#2A2A2A] text-white text-xs font-bold uppercase tracking-widest px-8 py-4 rounded-xs transition shadow-xs"
          >
            <span>Continue Exploring Designer Lawns</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
