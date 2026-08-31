'use client';

import React from 'react';
import { useEcommerce } from '@/context/EcommerceContext';
import Image from 'next/image';
import Link from 'next/link';
import {
  Package,
  Truck,
  ChevronRight,
  ArrowRight,
  Printer,
  ShieldCheck,
  CheckCircle2,
  Calendar,
} from 'lucide-react';

export default function OrdersPage() {
  const { orders, formatPrice } = useEcommerce();

  return (
    <div className="min-h-screen bg-[#FAF9F6] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-[#777]">
          <Link href="/" className="hover:text-black transition">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/account" className="hover:text-black transition">
            Account
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-black font-semibold">Order History & Tracking</span>
        </nav>

        <div className="border-b border-[#E5E2D9] pb-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-4xl font-serif font-bold text-black">
              My Orders ({orders.length})
            </h1>
            <p className="text-xs text-[#666] mt-0.5">
              Track BlueDart air dispatches, view tailoring status, and re-order previous lawn suits.
            </p>
          </div>

          <Link
            href="/track-order"
            className="hidden sm:flex items-center gap-1.5 bg-[#FAF5EE] border border-[#E8DFC8] text-[#8B4513] text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-xs hover:bg-[#F5ECE0] transition"
          >
            <Truck className="w-4 h-4" />
            <span>Search by AWB / Phone</span>
          </Link>
        </div>

        {orders.length === 0 ? (
          <div className="max-w-md mx-auto py-16 text-center space-y-4 bg-white border border-[#E5E2D9] rounded-xs p-8">
            <Package className="w-12 h-12 text-[#8B4513] mx-auto" />
            <h2 className="font-serif text-xl font-bold text-black">No Orders Placed Yet</h2>
            <p className="text-xs text-[#666]">
              Your purchase history and real-time shipment status will appear here once you place an order.
            </p>
            <Link
              href="/products"
              className="inline-block bg-black text-white text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-xs"
            >
              Start Shopping 2026 Collection
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white border border-[#E5E2D9] rounded-xs overflow-hidden shadow-xs space-y-4"
              >
                {/* Order Top Bar */}
                <div className="p-4 sm:p-5 bg-[#FAF9F6] border-b border-[#E5E2D9] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="flex flex-wrap gap-4 sm:gap-6">
                    <div>
                      <div className="text-[10px] uppercase font-bold text-[#888]">Order Placed</div>
                      <div className="font-semibold text-black">{order.createdAt}</div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase font-bold text-[#888]">Order ID</div>
                      <div className="font-mono font-bold text-[#8B4513]">#{order.id}</div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase font-bold text-[#888]">Total Amount</div>
                      <div className="font-bold text-black">{formatPrice(order.grandTotal)}</div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase font-bold text-[#888]">Ship To</div>
                      <div className="font-medium text-black">{order.customer.fullName}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider bg-[#E8F5E9] text-[#2E7D32] px-2.5 py-1 rounded-xs border border-[#C8E6C9]">
                      {order.orderStatus.replace('_', ' ')}
                    </span>
                    <Link
                      href={`/track-order?id=${order.id}`}
                      className="bg-black hover:bg-[#2A2A2A] text-white text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-xs transition flex items-center gap-1.5"
                    >
                      <Truck className="w-3.5 h-3.5" />
                      <span>Live Track</span>
                    </Link>
                  </div>
                </div>

                {/* Items List */}
                <div className="p-4 sm:p-5 space-y-4">
                  <div className="divide-y divide-[#F2F0E9]">
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="pt-4 first:pt-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                      >
                        <div className="flex gap-4">
                          <Link
                            href={`/products/${item.product.id}`}
                            className="relative w-16 aspect-3/4 bg-[#EBE9E1] rounded-xs overflow-hidden shrink-0 border border-[#E5E2D9]"
                          >
                            <Image
                              src={item.product.images[0]}
                              alt={item.product.title}
                              fill
                              className="object-cover"
                              sizes="80px"
                            />
                          </Link>
                          <div className="space-y-1 text-xs">
                            <div className="text-[10px] font-bold uppercase tracking-widest text-[#8B4513]">
                              {item.product.brand}
                            </div>
                            <Link
                              href={`/products/${item.product.id}`}
                              className="font-serif font-bold text-black hover:text-[#8B4513] transition line-clamp-1"
                            >
                              {item.product.title}
                            </Link>
                            <div className="text-[#666]">
                              Qty: {item.quantity} • {formatPrice(item.unitPrice)}
                            </div>
                            <div className="text-[11px] font-semibold text-[#555]">
                              {item.stitchingOption === 'unstitched'
                                ? '3-Piece Unstitched'
                                : `Stitched: ${item.selectedSize || 'Custom'}`}
                            </div>
                          </div>
                        </div>

                        <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-2">
                          <div className="font-bold text-black text-sm">
                            {formatPrice(item.totalPrice)}
                          </div>
                          <Link
                            href={`/products/${item.product.id}`}
                            className="text-xs font-bold text-[#8B4513] hover:underline"
                          >
                            Buy Again →
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Delivery ETA info */}
                  <div className="pt-3 border-t border-[#F2F0E9] flex flex-wrap justify-between items-center text-xs text-[#666]">
                    <div className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-[#8B4513]" />
                      <span>
                        Carrier: <span className="font-bold text-black">{order.shippingCarrier}</span> (AWB: {order.trackingNumber})
                      </span>
                    </div>
                    <div>
                      Expected Delivery: <span className="font-bold text-black">{order.estimatedDelivery}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
