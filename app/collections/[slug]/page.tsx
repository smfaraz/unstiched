'use client';

import React, { use } from 'react';
import { useEcommerce } from '@/context/EcommerceContext';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Sparkles, ShieldCheck, Truck, Scissors, Award, ArrowLeft } from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

const COLLECTION_METADATA: Record<
  string,
  {
    title: string;
    categoryMatch: string;
    tagline: string;
    description: string;
    bannerImage: string;
  }
> = {
  'unstitched-elegance': {
    title: 'Unstitched Elegance: Pure Swiss Voile Lawn Suits',
    categoryMatch: 'Unstitched Elegance',
    tagline: '80s & 100s Ultra-Fine Combed Summer Weaves',
    description: 'The gold standard of Pakistani summer fabric. Ultra-fine Swiss Voile yarns dyed in rich pastel tones, paired with airy dupattas for peak breathable comfort.',
    bannerImage: '/images/products/pink_lawn_suit.jpg',
  },
  'swiss-voile': {
    title: 'Pure Swiss Voile Lawn Suits',
    categoryMatch: 'Unstitched Elegance',
    tagline: '80s & 100s Ultra-Fine Combed Summer Weaves',
    description: 'The gold standard of Pakistani summer fabric. Ultra-fine Swiss Voile yarns dyed in rich pastel tones, paired with airy dupattas for peak breathable comfort.',
    bannerImage: '/images/products/pink_lawn_suit.jpg',
  },
  'schiffli-cutwork': {
    title: 'Schiffli & Chikankari Cutwork Suits',
    categoryMatch: 'Festive Glam',
    tagline: 'Laser Cutwork & Resham Thread Needlecraft',
    description: 'Intricate open-work laser schiffli embroidery, delicate scalloped borders, and artisanal chikankari needlework crafted on pure cotton lawns.',
    bannerImage: '/images/products/mint_chikankari_suit.jpg',
  },
  'festive-glam': {
    title: 'Festive Glam & The Celebration Edit',
    categoryMatch: 'Festive Glam',
    tagline: 'Zari, Sequins & Organza Couture for Celebrations',
    description: 'Royal festive attire featuring tilla embroidery, hand-worked crystal embellishments, and sheer organza dupattas for weddings and celebratory evenings.',
    bannerImage: '/images/products/emerald_festive_suit.jpg',
  },
  'formal-wear': {
    title: 'Formal Wear & Executive Style',
    categoryMatch: 'Formal Wear',
    tagline: 'Zari, Tilla & Power Dressing Suits',
    description: 'Regal showstoppers crafted on rich self-jacquard lawns with gold dori cord embroidery, antique tilla work, and banarasi dupattas.',
    bannerImage: '/images/products/emerald_festive_suit.jpg',
  },
  'ready-to-wear': {
    title: 'Ready to Wear / Style Now (S to 4XL / 48)',
    categoryMatch: 'Ready to Wear',
    tagline: 'Inclusive Luxury Tailoring & Generous Sizing',
    description: 'Designed exclusively for fuller South Asian silhouettes. Extended fabric yardage, tailored bust measurements from 36 to 48 inches.',
    bannerImage: '/images/products/peach_curves_suit.jpg',
  },
  'modern-edit': {
    title: 'The Modern Edit & Contemporary Suits',
    categoryMatch: 'The Modern Edit',
    tagline: 'Featherweight Breathable Silk Chiffon & Tissue',
    description: 'Lightweight ethereal ensembles suited for warm climates with delicate laser-cut borders, pearl accents, and flowing dupattas.',
    bannerImage: '/images/products/lavender_chiffon_suit.jpg',
  },
  'new-arrivals': {
    title: 'New Arrivals & Botanical Laser Cutwork',
    categoryMatch: 'New Arrivals',
    tagline: 'Fresh Season Drop & 3D Floral Appliques',
    description: 'Fresh Season Drop featuring layered laser cutwork, delicate pastel resham embroidery on glossy cotton satin, and pure silk organza dupattas.',
    bannerImage: '/images/products/blue_cutwork_suit.jpg',
  },
  'ethnic-daily-wear': {
    title: 'Ethnic Daily Wear & Cambric Cotton Suits',
    categoryMatch: 'Ethnic Daily Wear',
    tagline: 'Everyday Pakistani Floral Prints & Cambric Cottons',
    description: 'Affordable authentic Pakistani printed lawn and kurti sets for everyday elegance, workwear, and casual outings.',
    bannerImage: '/images/products/mustard_daily_suit.jpg',
  },
  'wedding-edition': {
    title: 'Wedding Edition & Royal Velvet',
    categoryMatch: 'Festive Glam',
    tagline: 'Opulent Embroidered Velvet & Raw Silk Formals',
    description: 'Masterpiece wedding suits featuring heavy hand embellishments, velvet shawls, and bespoke gharara & farshi salwar tailoring.',
    bannerImage: '/images/products/maroon_velvet_suit.jpg',
  },
};

export default function CollectionDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const { products } = useEcommerce();

  const meta = COLLECTION_METADATA[resolvedParams.slug] || {
    title: `${resolvedParams.slug.replace('-', ' ').toUpperCase()} Collection`,
    categoryMatch: resolvedParams.slug,
    tagline: 'Authentic Pakistani Designer Originals',
    description: 'Curated Pakistani suits imported directly with Pan-India express shipping and boutique tailoring.',
    bannerImage: '/images/hero/hero_banner.jpg',
  };

  const collectionProducts = products.filter(
    (p) =>
      p.category.toLowerCase().includes(meta.categoryMatch.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(resolvedParams.slug.toLowerCase()))
  );

  return (
    <div className="space-y-10 pb-16">
      {/* Editorial Banner */}
      <div className="relative bg-[#1A1A1A] text-white min-h-[320px] flex items-center">
        <div className="absolute inset-0 opacity-35">
          <Image
            src={meta.bannerImage}
            alt={meta.title}
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
            <Link href="/collections" className="hover:text-white transition">
              Collections
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white font-semibold">{meta.title}</span>
          </nav>

          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-1.5 bg-[#8B4513] text-white px-3 py-1 rounded-xs text-[10px] font-bold tracking-widest uppercase shadow-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{meta.tagline}</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white leading-tight">
              {meta.title}
            </h1>
            <p className="text-xs sm:text-sm text-[#D1CCC4] leading-relaxed">
              {meta.description}
            </p>
          </div>
        </div>
      </div>

      {/* Guarantees Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-white border border-[#E5E2D9] rounded-xs shadow-xs text-xs">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#8B4513] shrink-0" />
            <span>100% Original Brand Import</span>
          </div>
          <div className="flex items-center gap-2">
            <Scissors className="w-4 h-4 text-[#8B4513] shrink-0" />
            <span>Custom Bust Sizing (34&quot;-56&quot;)</span>
          </div>
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-[#8B4513] shrink-0" />
            <span>BlueDart Air Express (2-4 Days)</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-[#8B4513] shrink-0" />
            <span>Pan-India Cash on Delivery & UPI</span>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="flex items-center justify-between border-b border-[#E5E2D9] pb-3">
          <h2 className="font-serif font-bold text-xl text-black">
            Available Suits ({collectionProducts.length} items)
          </h2>
          <Link
            href="/products"
            className="text-xs font-bold uppercase tracking-wider text-[#8B4513] hover:underline flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>View All Products</span>
          </Link>
        </div>

        {collectionProducts.length === 0 ? (
          <div className="py-16 text-center space-y-4 bg-white border border-[#E5E2D9] rounded-xs p-8">
            <h3 className="font-serif text-xl font-bold text-black">New Drops Arriving Soon</h3>
            <p className="text-xs text-[#666]">
              We are updating inventory for this collection directly from ateliers in Lahore & Karachi.
            </p>
            <Link
              href="/products"
              className="inline-block bg-black text-white text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-xs"
            >
              Browse Available Lawn Suits
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {collectionProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
