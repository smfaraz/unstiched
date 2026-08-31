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
      name: 'Maria B.',
      slug: 'maria-b',
      brandName: 'Maria B.',
      origin: 'Lahore, Pakistan',
      established: 'Est. 1999',
      tagline: 'The undisputed Queen of Luxury Lawn & M.Prints',
      bio: 'Known globally for fine Swiss lawns, schiffli embroidery, pure jacquards, and heirloom dupattas. Maria B. is one of the most coveted designer labels across India and the diaspora.',
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    },
    {
      name: 'Sana Safinaz',
      slug: 'sana-safinaz',
      brandName: 'Sana Safinaz',
      origin: 'Karachi, Pakistan',
      established: 'Est. 1989',
      tagline: 'Muzlin, Mahay & Luxury Silk Lawn Pioneers',
      bio: 'Celebrated for avant-garde color palettes, bold geometric and botanical prints, and high-fashion luxury pret lines that redefine modern South Asian fashion.',
      image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
    },
    {
      name: 'Asim Jofa',
      slug: 'asim-jofa',
      brandName: 'Asim Jofa',
      origin: 'Karachi, Pakistan',
      established: 'Est. 2009',
      tagline: 'Zari, Organza & Royal Festive Couture',
      bio: 'With roots in fine jewellery, Asim Jofa infuses regal gold zari, crystal hand embellishments, and sheer organza fabrics into breathtaking festive & wedding formals.',
      image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80',
    },
    {
      name: 'Baroque',
      slug: 'baroque',
      brandName: 'Baroque',
      origin: 'Lahore, Pakistan',
      established: 'Est. 2012',
      tagline: 'Chantelle Embroidered Chiffon & Swiss Lawns',
      bio: 'Mastering feminine aesthetics with delicate pastel color palettes, intricate French-inspired lace cutwork, and signature 3-piece unstitched luxury ensembles.',
      image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80',
    },
    {
      name: 'Crimson',
      slug: 'crimson',
      brandName: 'Crimson',
      origin: 'Lahore, Pakistan',
      established: 'Est. 2016',
      tagline: 'Heavy Laser Cutwork & Botanical Embroidery',
      bio: 'A trendsetting couture house renowned for lavish multi-panel embroidery, architectural laser cutwork borders, and luxurious silk dupattas.',
      image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80',
    },
    {
      name: 'Zara Shahjahan',
      slug: 'zara-shahjahan',
      brandName: 'Zara Shahjahan',
      origin: 'Lahore, Pakistan',
      established: 'Est. 2004',
      tagline: 'Vintage Florals, Gota Craft & Heritage Lawns',
      bio: 'Celebrating nostalgic Old-Lahore romanticism with authentic hand-drawn florals, earthy muted tones, and softest lawn weaves.',
      image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80',
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
