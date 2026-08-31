'use client';

import React from 'react';
import { useEcommerce } from '@/context/EcommerceContext';
import { Sparkles, ShieldCheck, Truck, Scissors, ArrowRight, HeartHandshake } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function HeroBanner() {
  const router = useRouter();
  const { setFilters } = useEcommerce();

  return (
    <section className="relative overflow-hidden bg-[#FAF9F6] text-[#1A1A1A] border-b border-[#E5E2D9]">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-10 md:py-14">
        {/* Mobile: Visual Top Hero / Desktop: 2-Column Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-12 items-center">
          
          {/* Mobile Visual Card (Shown at Top on Mobile, Right on Desktop) */}
          <div className="lg:order-2 lg:col-span-5 relative">
            <div className="relative mx-auto max-w-sm sm:max-w-md lg:max-w-none">
              <Link
                href="/products?category=Unstitched%20Elegance"
                className="block relative rounded-xs overflow-hidden shadow-lg border border-[#E5E2D9] aspect-4/5 sm:aspect-3/4 bg-[#EBE9E1] group"
              >
                <Image
                  src="/images/hero/hero_banner.jpg"
                  alt="Pakistani Luxury Lawn Suit Collection 2026"
                  fill
                  priority
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 550px"
                />
                
                {/* Gradient vignette on mobile */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                {/* Floating Tag Top Left */}
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs border border-[#E5E2D9] text-[#1A1A1A] px-2.5 py-1 rounded-xs text-[9px] sm:text-[10px] uppercase tracking-widest font-bold flex items-center gap-1.5 shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-[#8B4513] animate-pulse" />
                  <span>2026 Collection Drop</span>
                </div>

                {/* Floating Discount Tag Top Right */}
                <div className="absolute top-3 right-3 bg-[#8B4513] text-white px-2.5 py-1 rounded-xs text-[9.5px] uppercase tracking-wider font-bold shadow-md">
                  Up to 29% OFF
                </div>

                {/* Floating Overlay Bottom Card */}
                <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md border border-[#E5E2D9] p-3 rounded-xs shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[9px] uppercase tracking-widest text-[#8B4513] font-bold">
                        Pure Swiss Voile & Schiffli
                      </div>
                      <div className="text-xs font-bold text-[#1A1A1A] line-clamp-1">
                        Original Pakistani Designer Weaves
                      </div>
                    </div>
                    <div className="text-right shrink-0 pl-2">
                      <div className="text-[10px] text-[#888] line-through">₹2,999</div>
                      <div className="text-sm font-serif font-bold text-[#1A1A1A]">₹2,199</div>
                    </div>
                  </div>
                  <div className="mt-1.5 pt-1.5 border-t border-[#F2F0E9] flex items-center justify-between text-[10px] text-[#666]">
                    <span className="flex items-center gap-1">
                      <Truck className="w-3 h-3 text-[#8B4513]" />
                      <span>Ready for 24h BlueDart Dispatch</span>
                    </span>
                    <span className="text-[#8B4513] font-bold uppercase">Shop Drop →</span>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* Text & CTAs (Left on Desktop, Below Card on Mobile) */}
          <div className="lg:order-1 lg:col-span-7 space-y-3.5 sm:space-y-6 text-center lg:text-left">
            {/* Top Pill */}
            <div className="inline-flex items-center gap-1.5 bg-[#FAF5EE] text-[#8B4513] px-3 py-1 rounded-xs text-[9.5px] sm:text-[10px] font-bold tracking-[0.18em] uppercase border border-[#E8DFC8]">
              <Sparkles className="w-3 h-3 text-[#8B4513]" />
              <span>Direct From Official Lahore & Karachi Houses</span>
            </div>

            {/* Headline */}
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-[1.15] text-[#1A1A1A] tracking-tight">
              Authentic Pakistani Lawn & Designer Suits in India
            </h1>

            {/* Subheading */}
            <p className="text-xs sm:text-base text-[#555] max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Pure Swiss Voile, Schiffli Cutwork, and Cotton Satin ensembles with 
              <strong className="text-[#1A1A1A] font-semibold"> 100% Original Hologram Verification</strong>. 
              Express Pan-India BlueDart dispatch, custom boutique tailoring, and COD / UPI payments.
            </p>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-3.5 pt-1">
              <Link
                href="/products?category=Unstitched%20Elegance"
                className="bg-black hover:bg-[#2A2A2A] text-white font-bold text-xs uppercase tracking-wider sm:tracking-widest py-3 sm:py-3.5 px-4 sm:px-7 rounded-xs shadow-xs transition-all duration-200 flex items-center justify-center gap-1.5 group"
                id="hero-explore-lawn-btn"
              >
                <span>Shop Unstitched</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/products?category=Ready%20to%20Wear"
                className="bg-[#8B4513] hover:bg-[#73390F] text-white font-bold text-xs uppercase tracking-wider sm:tracking-widest py-3 sm:py-3.5 px-4 sm:px-6 rounded-xs transition-all duration-200 flex items-center justify-center gap-1.5 shadow-xs"
                id="hero-curves-collection-btn"
              >
                <Sparkles className="w-3.5 h-3.5 text-white" />
                <span>Ready to Wear</span>
              </Link>
            </div>

            {/* Trust Bullet Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-[11px] text-[#444]">
              <div className="flex items-center gap-1.5 justify-center lg:justify-start bg-white/60 p-2 rounded-xs border border-[#E5E2D9]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#8B4513] shrink-0" />
                <span className="font-semibold text-[#1A1A1A]">100% Original Tags</span>
              </div>
              <div className="flex items-center gap-1.5 justify-center lg:justify-start bg-white/60 p-2 rounded-xs border border-[#E5E2D9]">
                <Truck className="w-3.5 h-3.5 text-[#8B4513] shrink-0" />
                <span className="font-semibold text-[#1A1A1A]">48-72h BlueDart</span>
              </div>
              <div className="flex items-center gap-1.5 justify-center lg:justify-start bg-white/60 p-2 rounded-xs border border-[#E5E2D9]">
                <Scissors className="w-3.5 h-3.5 text-[#8B4513] shrink-0" />
                <span className="font-semibold text-[#1A1A1A]">Stitching S to 4XL</span>
              </div>
              <div className="flex items-center gap-1.5 justify-center lg:justify-start bg-white/60 p-2 rounded-xs border border-[#E5E2D9]">
                <HeartHandshake className="w-3.5 h-3.5 text-[#8B4513] shrink-0" />
                <span className="font-semibold text-[#1A1A1A]">UPI & Cash on Del.</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
