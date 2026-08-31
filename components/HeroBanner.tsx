'use client';

import React from 'react';
import { useEcommerce } from '@/context/EcommerceContext';
import { Sparkles, ShieldCheck, Truck, Scissors, ArrowRight, HeartHandshake, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function HeroBanner() {
  const router = useRouter();
  const { setFilters, openSizeGuide } = useEcommerce();

  const handleExplore = (category: string) => {
    setFilters((prev) => ({ ...prev, category, searchQuery: '' }));
    router.push(`/products?category=${encodeURIComponent(category)}`);
  };

  return (
    <section className="relative overflow-hidden bg-[#FAF9F6] text-[#1A1A1A] border-b border-[#E5E2D9]">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Hero Copy & Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Top Pill */}
            <div className="inline-flex items-center gap-2 bg-[#F2F0E9] text-[#8B4513] px-3.5 py-1.5 rounded-xs text-[10px] font-bold tracking-[0.2em] uppercase border border-[#E5E2D9]">
              <Sparkles className="w-3.5 h-3.5 text-[#8B4513]" />
              <span>2026 Festive Lawn Edition</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-[1.12] text-[#1A1A1A] tracking-tight">
              Authentic Pakistani Lawn & Fabric Suits in India
            </h1>

            {/* Subheading */}
            <p className="text-sm sm:text-base text-[#555] max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Pure Swiss Voile, Schiffli Cutwork, Bamberg Chiffon, and Cotton Satin ensembles with 
              <strong className="text-[#1A1A1A] font-semibold"> 100% Original Weave Verification</strong>. 
              Express Pan-India BlueDart dispatch, bespoke boutique stitching, and seamless UPI & Cash on Delivery.
            </p>

            {/* Trust Bullet Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1 pb-1 text-xs text-[#444]">
              <div className="flex items-center gap-1.5 justify-center lg:justify-start">
                <CheckCircle2 className="w-4 h-4 text-[#8B4513] shrink-0" />
                <span>100% Original Imports</span>
              </div>
              <div className="flex items-center gap-1.5 justify-center lg:justify-start">
                <CheckCircle2 className="w-4 h-4 text-[#8B4513] shrink-0" />
                <span>48-72h Pan-India Express</span>
              </div>
              <div className="flex items-center gap-1.5 justify-center lg:justify-start">
                <CheckCircle2 className="w-4 h-4 text-[#8B4513] shrink-0" />
                <span>Bespoke Stitching (XS - 6XL)</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
              <Link
                href="/products?category=Pure%20Lawn"
                className="bg-black hover:bg-[#2A2A2A] text-white font-bold text-xs uppercase tracking-widest px-7 py-3.5 rounded-xs shadow-xs transition-all duration-200 flex items-center gap-2 group"
                id="hero-explore-lawn-btn"
              >
                <span>Shop Pure Lawn &apos;26</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/products?category=Curves%20(XL-6XL)"
                className="bg-[#8B4513] hover:bg-[#73390F] text-white font-bold text-xs uppercase tracking-widest px-6 py-3.5 rounded-xs transition-all duration-200 flex items-center gap-2 shadow-xs"
                id="hero-curves-collection-btn"
              >
                <Sparkles className="w-4 h-4 text-white" />
                <span>Curves (XL to 6XL)</span>
              </Link>

              <Link
                href="/products"
                className="text-[#1A1A1A] hover:text-[#8B4513] text-xs font-bold uppercase tracking-wider underline underline-offset-4 px-2 py-2 transition"
                id="hero-view-all-suits-btn"
              >
                Browse All Suits →
              </Link>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Visual Card */}
              <Link href="/products/prod-1" className="block relative rounded-xs overflow-hidden shadow-xl border border-[#E5E2D9] aspect-3/4 bg-[#EBE9E1] group">
                <Image
                  src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80"
                  alt="Pakistani Luxury Lawn Suit Collection 2026"
                  fill
                  priority
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 500px"
                />
                
                {/* Floating Tag Top Left */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-xs border border-[#E5E2D9] text-[#1A1A1A] px-3 py-1.5 rounded-xs text-[10px] uppercase tracking-widest font-bold flex items-center gap-1.5 shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-[#8B4513] animate-pulse" />
                  <span>2026 Collection Drop</span>
                </div>

                {/* Floating Bottom Card */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-xs border border-[#E5E2D9] p-3.5 rounded-xs shadow-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-[#8B4513] font-bold">
                        Maria B. & Sana Safinaz
                      </div>
                      <div className="text-xs font-bold text-[#1A1A1A]">
                        Pure Swiss Voile & Organza Cutwork
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[11px] text-[#888] line-through">₹5,999</div>
                      <div className="text-sm font-bold text-[#1A1A1A]">₹4,499</div>
                    </div>
                  </div>
                  <div className="mt-2 pt-2 border-t border-[#F2F0E9] flex items-center justify-between text-[11px] text-[#666]">
                    <span className="flex items-center gap-1">
                      <Truck className="w-3.5 h-3.5 text-[#8B4513]" />
                      <span>Ready for 24h Express Dispatch</span>
                    </span>
                    <span className="text-[#8B4513] font-bold text-[10px] uppercase tracking-wider">25% OFF</span>
                  </div>
                </div>
              </Link>

              {/* Side Floating Badge */}
              <div className="absolute -top-3 -right-2 sm:-right-3 bg-[#8B4513] text-white p-3 rounded-xs shadow-lg flex flex-col items-center justify-center font-bold text-center border border-white">
                <ShieldCheck className="w-5 h-5 text-white" />
                <span className="text-[9px] uppercase tracking-widest mt-1">100% Original</span>
                <span className="text-[11px] font-bold">Direct Import</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust & Service Strip */}
      <div className="border-t border-[#E5E2D9] bg-white">
        <div className="max-w-7xl mx-auto px-4 py-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-[#555]">
          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <ShieldCheck className="w-5 h-5 text-[#8B4513] shrink-0" />
            <div>
              <div className="font-bold text-[#1A1A1A] uppercase text-[11px] tracking-wider">Authenticity Guarantee</div>
              <div className="text-[11px] text-[#777]">Original Pakistani Brand Tags</div>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <Truck className="w-5 h-5 text-[#8B4513] shrink-0" />
            <div>
              <div className="font-bold text-[#1A1A1A] uppercase text-[11px] tracking-wider">Pan-India Express</div>
              <div className="text-[11px] text-[#777]">BlueDart Air (2-4 Days)</div>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <Scissors className="w-5 h-5 text-[#8B4513] shrink-0" />
            <div>
              <div className="font-bold text-[#1A1A1A] uppercase text-[11px] tracking-wider">Custom Stitching</div>
              <div className="text-[11px] text-[#777]">Bespoke Cuts & Linings</div>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <HeartHandshake className="w-5 h-5 text-[#8B4513] shrink-0" />
            <div>
              <div className="font-bold text-[#1A1A1A] uppercase text-[11px] tracking-wider">Regional Payments</div>
              <div className="text-[11px] text-[#777]">UPI & Cash on Delivery</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
