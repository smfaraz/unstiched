'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, ArrowRight, ChevronRight, Award, Scissors, Layers, ShieldCheck } from 'lucide-react';
import { useEcommerce } from '@/context/EcommerceContext';

export default function CollectionsPage() {
  const { products } = useEcommerce();

  const collections = [
    {
      title: 'Pure Swiss Voile Lawn',
      slug: 'swiss-voile',
      category: 'Swiss Voile',
      subtitle: '80s & 100s Ultra-Fine Combed Summer Weave',
      count: products.filter((p) => p.category === 'Swiss Voile' || p.fabric === 'Swiss Voile').length,
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80',
      description: 'The gold standard of Pakistani summer fabric. Ultra-fine Swiss Voile yarns dyed in rich pastel tones, paired with airy dupattas for peak breathable comfort.',
    },
    {
      title: 'Schiffli & Chikankari Cutwork',
      slug: 'schiffli-cutwork',
      category: 'Schiffli Cutwork',
      subtitle: 'Laser Cutwork & Resham Thread Needlecraft',
      count: products.filter((p) => p.category === 'Schiffli Cutwork' || p.craftWork === 'Schiffli Cutwork').length,
      image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=80',
      description: 'Intricate open-work laser schiffli embroidery, delicate scalloped borders, and artisanal chikankari needlework crafted on pure cotton lawns.',
    },
    {
      title: 'Pure Lawn 3-Piece Suits',
      slug: 'pure-lawn',
      category: 'Pure Lawn',
      subtitle: 'Classic Breathable 3-Piece Cotton Sets',
      count: products.filter((p) => p.category === 'Pure Lawn' || p.fabric === 'Pure Lawn').length,
      image: 'https://images.unsplash.com/photo-1563178406-4cdc2923acbc?auto=format&fit=crop&w=900&q=80',
      description: 'Authentic 3-piece Pakistani unstitched lawn suits featuring 3.25m shirt fabric, printed dupattas, and cambric trousers for everyday elegance.',
    },
    {
      title: 'Curves Edition (XL - 6XL)',
      slug: 'curves-plus-size',
      category: 'Curves (XL-6XL)',
      subtitle: 'Bespoke Extended Bust 42" to 56" Sizing',
      count: products.filter((p) => p.category === 'Curves (XL-6XL)').length,
      image: 'https://images.unsplash.com/photo-1574634534894-89d7576c8259?auto=format&fit=crop&w=900&q=80',
      description: 'Generous cut silhouettes with 3.75m to 4.0m extra yardage, side kalis, and deep armhole facings designed specifically for plus size women.',
    },
    {
      title: 'Chiffon & Pure Organza',
      slug: 'chiffon-organza',
      category: 'Chiffon & Organza',
      subtitle: 'Featherlight Bamberg Chiffon & Tissue Dupattas',
      count: products.filter((p) => p.category === 'Chiffon & Organza' || p.fabric === 'Chiffon' || p.fabric === 'Pure Organza').length,
      image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=900&q=80',
      description: 'Featherweight breathable silk chiffons and translucent organza jacquards perfect for evening dinners, parties, and festive celebrations.',
    },
    {
      title: 'Cotton Satin & Jacquard',
      slug: 'cotton-satin',
      category: 'Cotton Satin',
      subtitle: 'Lustrous Sheen & Silky Soft Handfeel',
      count: products.filter((p) => p.category === 'Cotton Satin' || p.fabric === 'Cotton Satin').length,
      image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=900&q=80',
      description: 'Cotton Satin weaves combining pure cotton breathability with an understated lustrous gloss, paired with woven tissue jacquard dupattas.',
    },
    {
      title: 'Under ₹1999 Value Edits',
      slug: 'under-1999',
      category: 'Under ₹1999',
      subtitle: 'Daily Printed Lawn & 3-Piece Sets',
      count: products.filter((p) => p.category === 'Under ₹1999' || p.price < 2000).length,
      image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=900&q=80',
      description: 'Everyday Pakistani floral lawn prints and comfortable cambric cottons at an unbeatable direct-import price point.',
    },
    {
      title: 'Wedding & Royal Velvet',
      slug: 'wedding-edition',
      category: 'Wedding Edition',
      subtitle: 'Micro 9000 Velvet, Zardozi & Banarasi Silk',
      count: products.filter((p) => p.category === 'Wedding Edition').length,
      image: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=900&q=80',
      description: 'Heirloom-grade bridal and wedding reception ensembles with custom gharara, farshi salwar, and embellished zardozi needlework.',
    },
  ];

  return (
    <div className="space-y-12 pb-16">
      {/* Editorial Header */}
      <div className="bg-[#FAF5EE] border-b border-[#E8DFC8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
          <nav className="flex items-center gap-2 text-xs text-[#777] mb-4">
            <Link href="/" className="hover:text-black transition">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-black font-semibold">Collections Hub</span>
          </nav>

          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-1.5 bg-[#8B4513] text-white px-2.5 py-0.5 rounded-xs text-[10px] font-bold tracking-widest uppercase">
              <Sparkles className="w-3 h-3" />
              <span>Curated Seasonal Edits</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#1A1A1A]">
              Pakistani Designer Collections
            </h1>
            <p className="text-xs sm:text-sm text-[#555] leading-relaxed">
              Explore our hand-curated fashion edits ranging from breathable summer Swiss lawns to royal festive chiffons, designed for effortless elegance with custom boutique stitching.
            </p>
          </div>
        </div>
      </div>

      {/* Collections Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections.map((col) => (
            <Link
              key={col.slug}
              href={`/collections/${col.slug}`}
              className="group bg-white border border-[#E5E2D9] rounded-xs overflow-hidden shadow-xs hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-4/3 w-full bg-[#EBE9E1] overflow-hidden">
                  <Image
                    src={col.image}
                    alt={col.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-5 text-white">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#E5E2D9]">
                      {col.count} Designer Designs Available
                    </span>
                    <h3 className="text-xl font-serif font-bold tracking-tight mt-0.5">
                      {col.title}
                    </h3>
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <div className="text-[11px] font-bold text-[#8B4513] uppercase tracking-wider">
                    {col.subtitle}
                  </div>
                  <p className="text-xs text-[#666] leading-relaxed line-clamp-3">
                    {col.description}
                  </p>
                </div>
              </div>

              <div className="p-4 bg-[#FAF9F6] border-t border-[#F2F0E9] flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-widest text-black group-hover:text-[#8B4513] transition">
                  Shop {col.title}
                </span>
                <ArrowRight className="w-4 h-4 text-[#8B4513] group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
