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
      text: "🚀 Free Express Pan-India Shipping on orders above ₹1,999 via BlueDart Air",
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
    <aside aria-label="Store Announcement and Quick Links" className="bg-[#1A1A1A] text-white text-[11px] border-b border-[#2A2A2A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex items-center justify-between gap-4">
        {/* Ticker on left */}
        <div className="flex items-center gap-2 overflow-hidden flex-1">
          <span className="bg-[#8B4513] text-white text-[8px] font-bold tracking-[0.2em] px-2 py-0.5 rounded-xs uppercase shrink-0">
            OFFER
          </span>
          <div className="transition-all duration-500 ease-in-out font-medium tracking-wide truncate text-[#DDD] text-[10px] sm:text-[11px]">
            {announcements[currentIndex].text}
          </div>
        </div>

        {/* Quick Utilities on right */}
        <div className="flex items-center gap-4 shrink-0 text-[10px] uppercase tracking-wider text-[#BBB]">
          {/* Currency Switcher */}
          <div className="flex items-center gap-1">
            <select
              aria-label="Select Currency"
              value={currency}
              onChange={(e) => setCurrency(e.target.value as 'INR' | 'USD' | 'AED')}
              className="bg-transparent text-white focus:outline-none cursor-pointer font-bold uppercase tracking-wider"
              id="currency-selector"
            >
              <option value="INR" className="bg-[#1A1A1A] text-white">₹ INR</option>
              <option value="USD" className="bg-[#1A1A1A] text-white">$ USD</option>
              <option value="AED" className="bg-[#1A1A1A] text-white">AED</option>
            </select>
          </div>

          {/* WhatsApp Direct Link */}
          <a
            href="https://wa.me/919820089123?text=Hi%20Unstitched%20Luxe,%20I%20am%20looking%20for%20authentic%20Pakistani%20designer%20suits"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1 text-[#BBB] hover:text-white transition font-medium"
            id="whatsapp-help-header-btn"
          >
            <Phone className="w-3 h-3 text-[#C49A6C]" />
            <span>Help: +91 98200 89123</span>
          </a>
        </div>
      </div>
    </aside>
  );
}
