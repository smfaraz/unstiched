'use client';

import React, { useState, useEffect } from 'react';
import { useEcommerce } from '@/context/EcommerceContext';
import { Truck, ShieldCheck, Sparkles, MessageCircle, Phone, Package, Heart, ShoppingBag, Settings, ChevronRight } from 'lucide-react';

export default function AnnouncementBar() {
  const {
    currency,
    setCurrency,
    openOrderTracking,
    openWishlist,
    openCart,
    openAdmin,
    wishlist,
    cartCount,
  } = useEcommerce();

  const announcements = [
    {
      text: "🛍️ MULTI-BUY OFFER: Buy 1 at 10% OFF • Add 2nd get 15% OFF • Add 3rd+ get 20% OFF (Auto-Applied)",
      highlight: "Shop Now",
    },
    {
      text: "🧵 Unstitched Elegance with Custom Size (S-36 to 4XL-48) & Bespoke Tailoring at Checkout",
      highlight: "Select Stitching",
    },
    {
      text: "✨ New Arrivals Live: Festive Glam, Formal Power Dressing & The Modern Edit",
      highlight: "Shop New Drops",
    },
    {
      text: "🚀 Free Express Pan-India Shipping on orders above ₹1,499 via BlueDart Air",
      highlight: "Check Pincode",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [announcements.length]);

  return (
    <aside aria-label="Store Announcement and Quick Links" className="bg-[#8B4513] text-white text-[11px] border-b border-[#783C10] w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-1.5 sm:py-2 flex flex-col sm:flex-row items-center justify-between gap-1 sm:gap-2 w-full min-w-0">
        {/* Ticker on left/center */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-hidden w-full sm:w-auto min-w-0 justify-center sm:justify-start">
          <span className="inline-flex items-center gap-1 bg-black/40 text-[#FAF9F6] text-[9px] font-bold tracking-[0.15em] px-1.5 py-0.5 rounded-xs uppercase shrink-0 border border-white/20">
            <Sparkles className="w-2.5 h-2.5 text-[#F5DEB3]" />
            Offer
          </span>
          <div className="transition-all duration-500 ease-in-out font-medium tracking-wide truncate text-[#FAF9F6] text-[10.5px] sm:text-[11px] text-center sm:text-left min-w-0">
            {announcements[currentIndex].text}
          </div>
        </div>

        {/* Action controls on right */}
        <div className="flex items-center justify-center gap-3 shrink-0 text-[10px] sm:text-[11px]">
          {/* WhatsApp Direct Styling Help */}
          <a
            href="https://wa.me/919820089123?text=Hi%20Unstitched%20Luxe,%20I%20am%20looking%20for%20authentic%20Pakistani%20designer%20suits"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-1 text-[#E0E7D9] hover:text-white transition font-medium tracking-wide"
            id="whatsapp-help-header-btn"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Styling Help: +91 98200 89123</span>
          </a>

          {/* Currency Switcher */}
          <div className="flex items-center bg-black/30 px-2 py-0.5 rounded-xs border border-white/20 text-[10px] font-semibold tracking-wider">
            <span className="text-[#E5E2D9] mr-1">Currency:</span>
            <select
              aria-label="Select Currency"
              value={currency}
              onChange={(e) => setCurrency(e.target.value as 'INR' | 'USD' | 'AED')}
              className="bg-transparent text-white focus:outline-none cursor-pointer font-bold"
              id="currency-selector"
            >
              <option value="INR" className="bg-[#1A1A1A] text-white">₹ INR</option>
              <option value="USD" className="bg-[#1A1A1A] text-white">$ USD</option>
              <option value="AED" className="bg-[#1A1A1A] text-white">AED</option>
            </select>
          </div>

          {/* Admin / Product Management Console Trigger */}
          <button
            onClick={openAdmin}
            className="hidden md:flex items-center gap-1 text-[#FAF9F6]/80 hover:text-white transition px-2 py-0.5 rounded-xs hover:bg-black/30 text-[10px] uppercase tracking-wider font-semibold border border-white/10"
            title="Product Management & Orders Studio"
            id="admin-console-trigger-btn"
          >
            <Settings className="w-3 h-3 text-[#F5DEB3]" />
            <span>Store Console</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
