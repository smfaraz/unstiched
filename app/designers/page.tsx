'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ChevronRight, Award, Sparkles, MapPin } from 'lucide-react';
import { useEcommerce } from '@/context/EcommerceContext';

export default function DesignersPage() {
  const { products } = useEcommerce();

  const designersList = [
    {
      name: 'Unstitched Elegance',
      slug: 'unstitched-elegance',
      brandName: 'Unstitched Elegance',
      origin: 'Lahore, Pakistan',
      established: 'Pure Lawn Specialist',
      tagline: 'Luxury Swiss Voile & Schiffli Cutwork Specialists',
      bio: 'Known globally for fine Swiss lawns, schiffli embroidery, pure jacquards, and heirloom dupattas with 100% original weave guarantee.',
      image: '/images/products/pink_lawn_suit.jpg',
    },
    {
      name: 'Festive Glam',
      slug: 'festive-glam',
      brandName: 'Festive Glam',
      origin: 'Karachi, Pakistan',
      established: 'The Celebration Edit',
      tagline: 'Chikankari, Chiffon & Pure Organza Celebrations',
      bio: 'Celebrated for avant-garde color palettes, intricate Chikankari needlework, and high-fashion celebration wear.',
      image: '/images/products/mint_chikankari_suit.jpg',
    },
    {
      name: 'Formal Wear',
      slug: 'formal-wear',
      brandName: 'Formal Wear',
      origin: 'Karachi, Pakistan',
      established: 'Executive Style',
      tagline: 'Zari, Tilla, Cotton Satin & Power Dressing',
      bio: 'Infuses regal gold zari, crystal hand embellishments, and glossy cotton satin fabrics into breathtaking formal ensembles.',
      image: '/images/products/emerald_festive_suit.jpg',
    },
    {
      name: 'The Modern Edit',
      slug: 'the-modern-edit',
      brandName: 'The Modern Edit',
      origin: 'Lahore, Pakistan',
      established: 'The Contemporary',
      tagline: 'Chantelle Embroidered Chiffon & Swiss Lawns',
      bio: 'Mastering feminine aesthetics with delicate pastel color palettes, intricate lace cutwork, and signature 3-piece unstitched luxury ensembles.',
      image: '/images/products/lavender_chiffon_suit.jpg',
    },
    {
      name: 'New Arrivals',
      slug: 'new-arrivals',
      brandName: 'New Arrivals',
      origin: 'Lahore, Pakistan',
      established: 'Fresh Season Drop',
      tagline: 'Heavy Laser Cutwork & Botanical Embroidery',
      bio: 'A trendsetting collection house renowned for lavish multi-panel embroidery, architectural laser cutwork borders, and luxurious silk dupattas.',
      image: '/images/products/blue_cutwork_suit.jpg',
    },
    {
      name: 'Ethnic Daily Wear',
      slug: 'ethnic-daily-wear',
      brandName: 'Ethnic Daily Wear',
      origin: 'Lahore, Pakistan',
      established: 'Daily Comfort',
      tagline: 'Vintage Florals, Cambric Cottons & Heritage Lawns',
      bio: 'Celebrating nostalgic South Asian romanticism with authentic botanical florals, earthy muted tones, and softest breathable lawn weaves.',
      image: '/images/products/mustard_daily_suit.jpg',
    },
  ];

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
            <span className="text-black font-semibold">Pakistani Design Houses</span>
          </nav>

          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-1.5 bg-[#8B4513] text-white px-2.5 py-0.5 rounded-xs text-[10px] font-bold tracking-widest uppercase">
              <Award className="w-3 h-3" />
              <span>Direct Atelier Partnerships</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#1A1A1A]">
              Iconic Pakistani Fashion Houses
            </h1>
            <p className="text-xs sm:text-sm text-[#555] leading-relaxed">
              Every garment at Pehnava Lawns is sourced directly from certified design houses in Karachi, Lahore, and Faisalabad. We guarantee 100% authenticity with original brand hologram seals, fabric swatches, and verified tags.
            </p>
          </div>
        </div>
      </div>

      {/* Designers Directory Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {designersList.map((designer) => {
            const count = products.filter((p) => p.brand.toLowerCase() === designer.brandName.toLowerCase()).length;

            return (
              <Link
                key={designer.slug}
                href={`/designers/${designer.slug}`}
                className="group bg-white border border-[#E5E2D9] rounded-xs overflow-hidden shadow-xs hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-4/3 w-full bg-[#EBE9E1] overflow-hidden">
                    <Image
                      src={designer.image}
                      alt={designer.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-5 text-white">
                      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-[#E5E2D9]">
                        <MapPin className="w-3 h-3" />
                        <span>{designer.origin}</span>
                        <span>•</span>
                        <span>{designer.established}</span>
                      </div>
                      <h3 className="text-2xl font-serif font-bold tracking-tight mt-0.5">
                        {designer.name}
                      </h3>
                    </div>
                  </div>

                  <div className="p-5 space-y-2">
                    <div className="text-[11px] font-bold text-[#8B4513] uppercase tracking-wider">
                      {designer.tagline}
                    </div>
                    <p className="text-xs text-[#666] leading-relaxed line-clamp-3">
                      {designer.bio}
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-[#FAF9F6] border-t border-[#F2F0E9] flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-widest text-black group-hover:text-[#8B4513] transition">
                    Explore {designer.name} Suits ({count > 0 ? count : 'New Drops'})
                  </span>
                  <ArrowRight className="w-4 h-4 text-[#8B4513] group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
