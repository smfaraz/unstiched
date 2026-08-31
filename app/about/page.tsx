'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ShieldCheck,
  Scissors,
  Truck,
  Sparkles,
  Award,
  Users,
  ChevronRight,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-[#777]">
        <Link href="/" className="hover:text-black transition">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-black font-semibold">About UNSTITCHED & Authenticity Heritage</span>
      </nav>

      {/* Hero Header */}
      <div className="relative bg-[#FAF5EE] border border-[#E8DFC8] rounded-xs p-8 sm:p-12 overflow-hidden">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-1.5 bg-[#8B4513] text-white px-3 py-1 rounded-xs text-[10px] font-bold tracking-widest uppercase">
            <Award className="w-3.5 h-3.5" />
            <span>Direct Pakistani Couture Imports</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#1A1A1A] leading-tight">
            Bridging Heritage Craft with Contemporary Luxury in India
          </h1>
          <p className="text-sm sm:text-base text-[#555] leading-relaxed">
            Founded with a passion for authentic South Asian textiles, UNSTITCHED is India’s premier destination for original Pakistani lawn suits, festive chiffons, and bespoke couture wear from Maria B., Sana Safinaz, Asim Jofa, and Baroque.
          </p>
        </div>
      </div>

      {/* Story & Philosophy Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-6 space-y-4 text-xs sm:text-sm text-[#555] leading-relaxed">
          <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8B4513]">
            Our Journey
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1A1A1A]">
            Why Authentic Pakistani Lawn is Unique
          </h2>
          <p>
            Pakistani lawn is renowned globally for its ultra-fine 80s and 100s count Swiss cotton yarns, intricate schiffli cutwork, and vibrant digital silk and organza dupattas. 
          </p>
          <p>
            However, the Indian market has long struggled with duplicate replicas, slow shipping, and untrusted customs imports. UNSTITCHED was built to solve this completely: we import directly from authorized brand ateliers in Lahore, Karachi, and Faisalabad, store stock locally in New Delhi, and deliver within 48 to 72 hours via BlueDart Air Express across 25,000+ Indian pincodes.
          </p>

          <div className="space-y-2 pt-2 text-xs text-[#333]">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#8B4513]" />
              <span>Hologram-certified original packaging on every box</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#8B4513]" />
              <span>Transparent GST invoicing & zero hidden customs fees</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#8B4513]" />
              <span>Full inclusive sizing from standard XS to Curves 6XL</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 relative aspect-4/3 w-full bg-[#EBE9E1] rounded-xs overflow-hidden border border-[#E5E2D9] shadow-md">
          <Image
            src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80"
            alt="Pehnava Lawns Craftsmanship"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Core Values Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        <div className="bg-white border border-[#E5E2D9] p-6 rounded-xs space-y-3 shadow-xs">
          <ShieldCheck className="w-8 h-8 text-[#8B4513]" />
          <h3 className="font-serif font-bold text-lg text-black">Zero Replica Policy</h3>
          <p className="text-xs text-[#666] leading-relaxed">
            We never sell copies or replicas. Every suit comes with the official brand barcodes, original designer hangtags, and verified brand packaging.
          </p>
        </div>

        <div className="bg-white border border-[#E5E2D9] p-6 rounded-xs space-y-3 shadow-xs">
          <Scissors className="w-8 h-8 text-[#8B4513]" />
          <h3 className="font-serif font-bold text-lg text-black">Master Tailoring Studio</h3>
          <p className="text-xs text-[#666] leading-relaxed">
            Our in-house master tailors specialize in Pakistani silhouettes—including soft mulmul lining, delicate lace insertions, latkan tassels, and customized pant cuts.
          </p>
        </div>

        <div className="bg-white border border-[#E5E2D9] p-6 rounded-xs space-y-3 shadow-xs">
          <Truck className="w-8 h-8 text-[#8B4513]" />
          <h3 className="font-serif font-bold text-lg text-black">Express Pan-India Logistics</h3>
          <p className="text-xs text-[#666] leading-relaxed">
            In-stock items are shipped out in 24 hours from New Delhi. Experience fast delivery to Mumbai, Delhi NCR, Hyderabad, Bangalore, Chennai, Kolkata, and beyond.
          </p>
        </div>
      </div>

      {/* CTA Strip */}
      <div className="bg-[#111] text-white p-8 sm:p-10 rounded-xs flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="font-serif font-bold text-2xl">Ready to explore authentic Pakistani Couture?</h3>
          <p className="text-xs text-[#888] mt-1">Browse our latest 2026 Festive Lawn drops and curated designer edit.</p>
        </div>
        <Link
          href="/products"
          className="bg-white hover:bg-[#E5E2D9] text-black font-bold uppercase tracking-widest text-xs px-8 py-3.5 rounded-xs transition whitespace-nowrap shadow-xs"
        >
          Explore Collection
        </Link>
      </div>
    </div>
  );
}
