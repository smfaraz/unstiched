'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, ShieldCheck, CheckCircle2, X, ShoppingBag, Eye, Users } from 'lucide-react';
import { useEcommerce } from '@/context/EcommerceContext';

const RECENT_ACTIVITIES = [
  {
    name: 'Ayesha K.',
    city: 'South Delhi, Delhi',
    suit: 'Pure Swiss Voile Lawn 3-Piece Suite with Schiffli Cutwork',
    size: 'Unstitched (Suit Set)',
    timeAgo: '3 mins ago',
    image: '/images/products/pink_lawn_suit.jpg',
    productId: 'peh-lwn-01',
    highlight: 'Unlocked 10% Multi-Buy Off',
  },
  {
    name: 'Dr. Farhana Q.',
    city: 'Jubilee Hills, Hyderabad',
    suit: 'Festive Glam Chikankari Pure Cotton Lawn with Chiffon Dupatta',
    size: 'Custom Size – Tailored Fit',
    timeAgo: '7 mins ago',
    image: '/images/products/mint_chikankari_suit.jpg',
    productId: 'peh-chk-02',
    highlight: 'Bespoke Stitching Selected',
  },
  {
    name: 'Meera S.',
    city: 'Indiranagar, Bengaluru',
    suit: 'Formal Wear Executive Zari & Dori Self-Jacquard 3-Piece',
    size: 'L – 40',
    timeAgo: '12 mins ago',
    image: '/images/products/emerald_festive_suit.jpg',
    productId: 'peh-zar-03',
    highlight: 'BlueDart Express Air Dispatch',
  },
  {
    name: 'Parveen B.',
    city: 'Bandra West, Mumbai',
    suit: 'Curves Edition Cotton Lawn Suit (S to 4XL / 48)',
    size: '4XL – 48',
    timeAgo: '18 mins ago',
    image: '/images/products/peach_curves_suit.jpg',
    productId: 'peh-crv-07',
    highlight: '🎉 Unlocked 20% Multi-Buy Tier',
  },
  {
    name: 'Sana M.',
    city: 'Park Street, Kolkata',
    suit: 'New Arrival Laser Cutwork Botanical Cotton Satin Luxury 3-Piece',
    size: 'Unstitched (Suit Set)',
    timeAgo: '24 mins ago',
    image: '/images/products/blue_cutwork_suit.jpg',
    productId: 'peh-las-05',
    highlight: '100% Original Hologram Verified',
  },
];

export default function LiveSocialProof() {
  const [currentActivityIndex, setCurrentActivityIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [liveViewersCount, setLiveViewersCount] = useState(16);

  // Randomize viewer count subtly
  useEffect(() => {
    const viewerInterval = setInterval(() => {
      setLiveViewersCount((prev) => {
        const delta = Math.floor(Math.random() * 5) - 2;
        return Math.max(11, Math.min(28, prev + delta));
      });
    }, 8000);
    return () => clearInterval(viewerInterval);
  }, []);

  // Display cycle: Show for 6 seconds, hide for 14 seconds
  useEffect(() => {
    if (dismissed) return;

    const initialDelay = setTimeout(() => {
      setVisible(true);
    }, 3500);

    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrentActivityIndex((prev) => (prev + 1) % RECENT_ACTIVITIES.length);
        if (!dismissed) {
          setVisible(true);
        }
      }, 1000);
    }, 18000);

    return () => {
      clearTimeout(initialDelay);
      clearInterval(interval);
    };
  }, [dismissed]);

  if (dismissed || !visible) return null;

  const activity = RECENT_ACTIVITIES[currentActivityIndex];

  return (
    <aside
      aria-label="Recent Shopper Activity Notification"
      className="fixed bottom-16 sm:bottom-4 left-3 right-3 sm:right-auto sm:left-4 z-30 max-w-sm bg-white/95 backdrop-blur-md border border-[#E5E2D9] rounded-xs shadow-2xl p-3 animate-in slide-in-from-bottom-5 fade-in duration-500 text-xs transition-all"
    >
      <div className="flex items-start gap-3 relative">
        {/* Product Thumbnail */}
        <Link
          href={`/products/${activity.productId}`}
          className="relative w-12 h-16 bg-[#EBE9E1] rounded-xs overflow-hidden shrink-0 border border-[#E5E2D9] group"
        >
          <Image
            src={activity.image}
            alt={activity.suit}
            fill
            className="object-cover group-hover:scale-105 transition-transform"
            sizes="50px"
          />
          <div className="absolute inset-0 bg-black/10" />
        </Link>

        {/* Info */}
        <div className="flex-1 min-w-0 pr-4 space-y-1">
          <div className="flex items-center gap-1.5 text-[10px] text-[#2E7D32] font-bold">
            <span className="w-2 h-2 rounded-full bg-[#2E7D32] animate-ping shrink-0" />
            <span className="truncate">Recent Verified Purchase</span>
            <span className="text-[#999] font-normal">• {activity.timeAgo}</span>
          </div>

          <div className="text-[11px] font-semibold text-[#1A1A1A] leading-tight line-clamp-1">
            <strong>{activity.name}</strong> from {activity.city}
          </div>

          <Link
            href={`/products/${activity.productId}`}
            className="text-[11px] text-[#555] hover:text-[#8B4513] line-clamp-1 font-serif underline decoration-dotted transition"
          >
            {activity.suit}
          </Link>

          <div className="flex items-center gap-2 pt-0.5">
            <span className="text-[9px] bg-[#FAF5EE] text-[#8B4513] px-1.5 py-0.2 rounded-xs font-bold border border-[#E8DFC8]">
              {activity.highlight}
            </span>
            <span className="text-[9px] text-[#777]">
              Size: {activity.size}
            </span>
          </div>
        </div>

        {/* Dismiss button */}
        <button
          onClick={() => {
            setVisible(false);
            setDismissed(true);
          }}
          className="absolute -top-1 -right-1 text-[#999] hover:text-black p-1 transition"
          title="Dismiss notification"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Real-time viewer footer badge */}
      <div className="mt-2 pt-2 border-t border-[#F2F0E9] flex items-center justify-between text-[10px] text-[#666]">
        <div className="flex items-center gap-1 text-[#8B4513] font-semibold">
          <Users className="w-3 h-3 text-[#8B4513]" />
          <span><strong>{liveViewersCount}</strong> shoppers exploring Pakistani suits right now</span>
        </div>
        <span className="text-[#2E7D32] font-bold text-[9px] uppercase tracking-wider flex items-center gap-0.5">
          <ShieldCheck className="w-3 h-3" /> Live
        </span>
      </div>
    </aside>
  );
}
