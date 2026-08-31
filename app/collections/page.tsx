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
      title: 'Unstitched Elegance',
      slug: 'unstitched-elegance',
      category: 'Unstitched Elegance',
      subtitle: '80s & 100s Ultra-Fine Combed Summer Weave',
      count: products.filter((p) => p.category === 'Unstitched Elegance' || p.suitType === 'Suit Set (Unstitched)').length,
      image: '/images/products/pink_lawn_suit.jpg',
      description: 'The gold standard of Pakistani summer fabric. Ultra-fine Swiss Voile yarns dyed in rich pastel tones, paired with airy dupattas for peak breathable comfort.',
    },
    {
      title: 'Festive Glam & Celebration',
      slug: 'festive-glam',
      category: 'Festive Glam',
      subtitle: 'Laser Cutwork & Resham Thread Needlecraft',
      count: products.filter((p) => p.category === 'Festive Glam').length,
      image: '/images/products/mint_chikankari_suit.jpg',
      description: 'Intricate open-work laser schiffli embroidery, delicate scalloped borders, and artisanal chikankari needlework crafted on pure cotton lawns.',
    },
    {
      title: 'Formal Wear & Executive Style',
      slug: 'formal-wear',
      category: 'Formal Wear',
      subtitle: 'Executive Zari, Tilla & Self-Jacquard Ensembles',
      count: products.filter((p) => p.category === 'Formal Wear').length,
      image: '/images/products/emerald_festive_suit.jpg',
      description: 'Regal showstoppers crafted on rich self-jacquard lawns with gold dori cord embroidery, antique tilla work, and banarasi dupattas.',
    },
    {
      title: 'Ready to Wear / Style Now (S to 4XL / 48)',
      slug: 'ready-to-wear',
      category: 'Ready to Wear',
      subtitle: 'Instant Delivery & Extended Sizing',
      count: products.filter((p) => p.category === 'Ready to Wear' || p.suitType === 'Ready to Wear').length,
      image: '/images/products/peach_curves_suit.jpg',
      description: 'Generous cut silhouettes with 3.75m to 4.0m extra yardage, side kalis, and deep armhole facings tailored to perfection.',
    },
    {
      title: 'The Modern Edit / Contemporary',
      slug: 'modern-edit',
      category: 'The Modern Edit',
      subtitle: 'Featherlight Bamberg Chiffon & Silk Dupattas',
      count: products.filter((p) => p.category === 'The Modern Edit').length,
      image: '/images/products/lavender_chiffon_suit.jpg',
      description: 'Featherweight breathable silk chiffons and translucent organza jacquards perfect for evening dinners, parties, and celebrations.',
    },
    {
      title: 'New Arrivals Collection',
      slug: 'new-arrivals',
      category: 'New Arrivals',
      subtitle: 'Botanical Laser Cutwork & Silk Duos',
      count: products.filter((p) => p.category === 'New Arrivals' || p.isNewArrival).length,
      image: '/images/products/blue_cutwork_suit.jpg',
      description: 'Fresh Season Drop featuring layered laser cutwork, delicate pastel resham embroidery, and pure silk organza dupattas.',
    },
    {
      title: 'Ethnic Daily Wear',
      slug: 'ethnic-daily-wear',
      category: 'Ethnic Daily Wear',
      subtitle: 'Daily Printed Cambric & Mulmul Sets',
      count: products.filter((p) => p.category === 'Ethnic Daily Wear').length,
      image: '/images/products/mustard_daily_suit.jpg',
      description: 'Everyday Pakistani floral lawn prints and comfortable cambric cottons at an unbeatable direct-import price point.',
    },
    {
      title: 'Plush Velvet & Banarasi Silk',
      slug: 'wedding-edition',
      category: 'Festive Glam',
      subtitle: 'Micro 9000 Velvet, Zardozi & Banarasi Silk',
      count: products.filter((p) => p.fabric === 'Plush Velvet' || p.craftWork === 'Zari & Tilla').length,
      image: '/images/products/maroon_velvet_suit.jpg',
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
