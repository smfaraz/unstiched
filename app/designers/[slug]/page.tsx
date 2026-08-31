'use client';

import React, { use } from 'react';
import { useEcommerce } from '@/context/EcommerceContext';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Award, ShieldCheck, Truck, Scissors, ArrowLeft, MapPin } from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

const DESIGNER_PROFILES: Record<
  string,
  {
    name: string;
    brandMatch: string;
    origin: string;
    tagline: string;
    description: string;
    bannerImage: string;
    specialties: string[];
  }
> = {
  'maria-b': {
    name: 'Maria B.',
    brandMatch: 'Maria B.',
    origin: 'Lahore, Pakistan',
    tagline: 'Signature Luxury Embroidered Lawns & M.Prints',
    description: 'Pioneering Pakistani designer lawn with delicate schiffli borders, pure jacquard unstitched fabrics, and bespoke formal couture. Guaranteed 100% authentic original imports.',
    bannerImage: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1600&q=80',
    specialties: ['Swiss Voile Lawn', 'Schiffli Cutwork', 'Digital Silk Dupattas', 'M.Prints'],
  },
  'sana-safinaz': {
    name: 'Sana Safinaz',
    brandMatch: 'Sana Safinaz',
    origin: 'Karachi, Pakistan',
    tagline: 'Muzlin & Mahay Summer Chiffon Collections',
    description: 'Renowned for striking jewel tones, contemporary prints, and featherlight fabrics tailored for hot South Asian summers and festive occasions.',
    bannerImage: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1600&q=80',
    specialties: ['Muzlin Lawn', 'Chiffon Dupattas', 'Mahay Series', 'Silk Tunics'],
  },
  'asim-jofa': {
    name: 'Asim Jofa',
    brandMatch: 'Asim Jofa',
    origin: 'Karachi, Pakistan',
    tagline: 'Royal Zari, Organza & Festive Formals',
    description: 'Regal bridal and formal attire infused with metallic gold and antique silver zari work, organza panels, and rich raw silk trousers.',
    bannerImage: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1600&q=80',
    specialties: ['Zari & Tilla Work', 'Organza Formals', 'Heavy Festive Pret', 'Luxury Jacquard'],
  },
  'baroque': {
    name: 'Baroque',
    brandMatch: 'Baroque',
    origin: 'Lahore, Pakistan',
    tagline: 'Swiss Lawn & Chantelle Embroidered Couture',
    description: 'Subtle elegance featuring romantic pastel palettes, intricate French schiffli lace borders, and breathable unstitched 3-piece ensembles.',
    bannerImage: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1600&q=80',
    specialties: ['Chantelle Chiffon', 'Swiss Voile', 'Pastel Formals', 'Embroidered Lawn'],
  },
  'crimson': {
    name: 'Crimson',
    brandMatch: 'Crimson',
    origin: 'Lahore, Pakistan',
    tagline: 'Heavy Laser Cutwork & Luxury Lawn',
    description: 'Statement fashion with bold botanical embroidery, multi-layered organza appliqués, and high-end silk finishes.',
    bannerImage: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1600&q=80',
    specialties: ['Laser Cutwork', 'Botanical Embroideries', 'Multi-panel Kurtas', 'Chiffon Dupattas'],
  },
  'zara-shahjahan': {
    name: 'Zara Shahjahan',
    brandMatch: 'Zara Shahjahan',
    origin: 'Lahore, Pakistan',
    tagline: 'Vintage Florals & Heritage Craft',
    description: 'Nostalgic South Asian craft traditions brought alive with block-print inspirations, gota borders, and pure cotton lawn weaves.',
    bannerImage: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1600&q=80',
    specialties: ['Vintage Florals', 'Gota Embellishments', 'Lawn 3-Piece', 'Cotton Cambric'],
  },
};

export default function DesignerDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const { products } = useEcommerce();

  const profile = DESIGNER_PROFILES[resolvedParams.slug] || {
    name: resolvedParams.slug.replace('-', ' ').toUpperCase(),
    brandMatch: resolvedParams.slug.replace('-', ' '),
    origin: 'Pakistan',
    tagline: 'Authentic Designer Couture',
    description: 'Direct imported Pakistani lawn and festive formal ensembles with authentic brand tags.',
    bannerImage: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1600&q=80',
    specialties: ['Pure Lawn', 'Embroidered Suits', 'Bespoke Tailoring'],
  };

  const designerProducts = products.filter(
    (p) =>
      p.brand.toLowerCase().includes(profile.brandMatch.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(resolvedParams.slug.toLowerCase()))
  );

  return (
    <div className="space-y-10 pb-16">
      {/* Editorial Banner */}
      <div className="relative bg-[#1A1A1A] text-white min-h-[320px] flex items-center">
        <div className="absolute inset-0 opacity-35">
          <Image
            src={profile.bannerImage}
            alt={profile.name}
            fill
            className="object-cover object-top"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-4 w-full">
          <nav className="flex items-center gap-2 text-xs text-[#C5BDB0]">
            <Link href="/" className="hover:text-white transition">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/designers" className="hover:text-white transition">
              Designers
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white font-semibold">{profile.name}</span>
          </nav>

          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-1.5 bg-[#8B4513] text-white px-3 py-1 rounded-xs text-[10px] font-bold tracking-widest uppercase shadow-xs">
              <MapPin className="w-3.5 h-3.5" />
              <span>{profile.origin} Atelier</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white leading-tight">
              {profile.name}
            </h1>
            <p className="text-xs sm:text-sm text-[#D1CCC4] leading-relaxed">
              {profile.description}
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {profile.specialties.map((spec) => (
                <span
                  key={spec}
                  className="bg-white/10 backdrop-blur-md border border-white/20 px-2.5 py-1 rounded-xs text-[11px] font-medium text-white"
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Trust guarantees */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-white border border-[#E5E2D9] rounded-xs shadow-xs text-xs">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#8B4513] shrink-0" />
            <span>100% Original {profile.name} Import</span>
          </div>
          <div className="flex items-center gap-2">
            <Scissors className="w-4 h-4 text-[#8B4513] shrink-0" />
            <span>Custom Stitching (XS - 6XL)</span>
          </div>
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-[#8B4513] shrink-0" />
            <span>Dispatched in 24-48 Hours</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-[#8B4513] shrink-0" />
            <span>COD & UPI Across India</span>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="flex items-center justify-between border-b border-[#E5E2D9] pb-3">
          <h2 className="font-serif font-bold text-xl text-black">
            Available {profile.name} Suits ({designerProducts.length} items)
          </h2>
          <Link
            href="/designers"
            className="text-xs font-bold uppercase tracking-wider text-[#8B4513] hover:underline flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Design Houses</span>
          </Link>
        </div>

        {designerProducts.length === 0 ? (
          <div className="py-16 text-center space-y-4 bg-white border border-[#E5E2D9] rounded-xs p-8">
            <h3 className="font-serif text-xl font-bold text-black">New Season Drop Arriving</h3>
            <p className="text-xs text-[#666]">
              We are currently unpacking new 2026 collections directly from {profile.name} ateliers.
            </p>
            <Link
              href="/products"
              className="inline-block bg-black text-white text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-xs"
            >
              Browse All Available Pakistani Suits
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {designerProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
