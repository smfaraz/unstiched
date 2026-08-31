'use client';

import React from 'react';
import Link from 'next/link';
import {
  Truck,
  RotateCcw,
  ShieldCheck,
  Package,
  ChevronRight,
  CheckCircle2,
  Clock,
  MapPin,
  Sparkles,
} from 'lucide-react';

export default function ShippingReturnsPage() {
  return (
    <div className="space-y-12 pb-16">
      {/* Header */}
      <div className="bg-[#FAF5EE] border-b border-[#E8DFC8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
          <nav className="flex items-center gap-2 text-xs text-[#777] mb-4">
            <Link href="/" className="hover:text-black transition">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-black font-semibold">Pan-India Shipping & 7-Day Returns</span>
          </nav>

          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-1.5 bg-[#8B4513] text-white px-2.5 py-0.5 rounded-xs text-[10px] font-bold tracking-widest uppercase">
              <Truck className="w-3 h-3" />
              <span>BlueDart Air Express Logistics</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#1A1A1A]">
              Pan-India Express Shipping & 7-Day Exchange Policy
            </h1>
            <p className="text-xs sm:text-sm text-[#555] leading-relaxed">
              Transparent transit timelines, zero hidden customs charges, and risk-free returns for our authentic Pakistani couture catalog.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-10 text-xs sm:text-sm text-[#555] leading-relaxed">
        {/* Key Logistics Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-[#E5E2D9] p-6 rounded-xs space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-full bg-[#FAF5EE] text-[#8B4513] flex items-center justify-center border border-[#E8DFC8]">
              <Truck className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-base text-black">
              24h Fast Dispatch
            </h3>
            <p className="text-xs text-[#666]">
              All unstitched 3-piece designer lawn suits are stored in our New Delhi fulfillment hub and dispatched within 24 hours via BlueDart Air.
            </p>
          </div>

          <div className="bg-white border border-[#E5E2D9] p-6 rounded-xs space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-full bg-[#FAF5EE] text-[#8B4513] flex items-center justify-center border border-[#E8DFC8]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-base text-black">
              100% Free Shipping & Customs
            </h3>
            <p className="text-xs text-[#666]">
              Free express delivery across 25,000+ Indian pincodes. All cross-border Pakistani import duties and GST are completely prepaid.
            </p>
          </div>

          <div className="bg-white border border-[#E5E2D9] p-6 rounded-xs space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-full bg-[#FAF5EE] text-[#8B4513] flex items-center justify-center border border-[#E8DFC8]">
              <RotateCcw className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-base text-black">
              7-Day Doorstep Exchange
            </h3>
            <p className="text-xs text-[#666]">
              Not in love with the color or print? Request an exchange or return within 7 days of delivery with original tags intact.
            </p>
          </div>
        </div>

        {/* Section 1: Shipping Timelines by Region */}
        <div className="bg-white border border-[#E5E2D9] p-6 sm:p-8 rounded-xs space-y-4 shadow-xs">
          <h2 className="font-serif font-bold text-xl text-black border-b border-[#E5E2D9] pb-3">
            Estimated Delivery Timelines by Region
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-[#FAF9F6] border border-[#E5E2D9] rounded-xs space-y-1">
              <div className="font-bold text-black flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#8B4513]" />
                <span>Delhi NCR, Mumbai, Bengaluru, Hyderabad</span>
              </div>
              <p className="text-[#666]">2 to 3 Business Days via BlueDart Air Express flight cargo.</p>
            </div>

            <div className="p-4 bg-[#FAF9F6] border border-[#E5E2D9] rounded-xs space-y-1">
              <div className="font-bold text-black flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#8B4513]" />
                <span>Chennai, Kolkata, Pune, Ahmedabad, Jaipur</span>
              </div>
              <p className="text-[#666]">3 to 4 Business Days via Priority Express.</p>
            </div>

            <div className="p-4 bg-[#FAF9F6] border border-[#E5E2D9] rounded-xs space-y-1">
              <div className="font-bold text-black flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#8B4513]" />
                <span>Tier-2, Tier-3 & Regional Pincodes</span>
              </div>
              <p className="text-[#666]">3 to 5 Business Days via Surface Express courier network.</p>
            </div>

            <div className="p-4 bg-[#FAF9F6] border border-[#E5E2D9] rounded-xs space-y-1">
              <div className="font-bold text-black flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#8B4513]" />
                <span>International Delivery (UAE, UK, USA)</span>
              </div>
              <p className="text-[#666]">5 to 8 Business Days via DHL / FedEx Global Express.</p>
            </div>
          </div>
        </div>

        {/* Section 2: Returns & Exchanges Policy */}
        <div className="bg-white border border-[#E5E2D9] p-6 sm:p-8 rounded-xs space-y-4 shadow-xs">
          <h2 className="font-serif font-bold text-xl text-black border-b border-[#E5E2D9] pb-3">
            7-Day Hassle-Free Returns & Exchanges
          </h2>
          <div className="space-y-3 text-xs sm:text-sm">
            <p>
              We want you to feel completely confident when ordering luxury Pakistani designer lawns. If you wish to exchange your suit for a different print or brand, our concierge makes the process straightforward:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-[#555]">
              <li>
                <span className="font-bold text-black">Unstitched 3-Piece Suits:</span> Eligible for complete exchange or refund within 7 days of delivery, provided fabric is uncut and brand tags/holograms remain intact.
              </li>
              <li>
                <span className="font-bold text-black">Standard Stitched Pret:</span> Eligible for size exchange within 7 days.
              </li>
              <li>
                <span className="font-bold text-black">Bespoke Made-to-Measure:</span> Custom crafted garments are tailored specifically to your measurements. If adjustments are needed, we provide complimentary master tailor alterations at our New Delhi atelier.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
