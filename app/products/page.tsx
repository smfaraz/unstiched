'use client';

import React, { Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useEcommerce } from '@/context/EcommerceContext';
import ProductGrid from '@/components/ProductGrid';
import Link from 'next/link';
import { ChevronRight, Award, ShieldCheck, Truck, Scissors } from 'lucide-react';

function ProductsCatalogContent() {
  const searchParams = useSearchParams();
  const { setFilters, filters } = useEcommerce();

  // Sync URL search params with store filters
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    const brandParam = searchParams.get('brand');
    const searchParam = searchParams.get('search');

    if (categoryParam || brandParam || searchParam !== null) {
      setFilters((prev) => ({
        ...prev,
        category: categoryParam || prev.category || 'All',
        brand: brandParam ? [brandParam] : prev.brand,
        searchQuery: searchParam !== null ? searchParam : prev.searchQuery,
      }));
    }
  }, [searchParams, setFilters]);

  return (
    <div className="space-y-8 pb-12">
      {/* Editorial Catalog Hero Bar */}
      <div className="bg-[#FAF5EE] border-b border-[#E8DFC8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs text-[#777] mb-4">
            <Link href="/" className="hover:text-black transition">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-black font-semibold">Pakistani Designer Lawn Collection</span>
            {filters.category && filters.category !== 'All' && (
              <>
                <ChevronRight className="w-3.5 h-3.5" />
                <span className="text-[#8B4513] font-bold">{filters.category}</span>
              </>
            )}
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-3xl space-y-2">
              <div className="inline-flex items-center gap-1.5 bg-[#8B4513] text-white px-2.5 py-0.5 rounded-xs text-[10px] font-bold tracking-widest uppercase">
                <Award className="w-3 h-3" />
                <span>100% Original Pakistani Lawn Ateliers</span>
              </div>
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#1A1A1A]">
                {filters.category && filters.category !== 'All'
                  ? `${filters.category} Collection`
                  : 'Pakistani Designer Lawn & Festive Suits'}
              </h1>
              <p className="text-xs sm:text-sm text-[#555] leading-relaxed">
                Explore original embroidered Swiss lawn, festive luxury chiffons, and cutwork organzas imported directly from top Pakistani couture houses with custom boutique tailoring and 24h express dispatch across India.
              </p>
            </div>

            {/* Quick Guarantees Pill */}
            <div className="hidden lg:flex flex-col gap-2 text-xs text-[#444] bg-white/80 p-4 rounded-xs border border-[#E8DFC8] shadow-xs">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#8B4513]" />
                <span>Original Brand Hologram Tags</span>
              </div>
              <div className="flex items-center gap-2">
                <Scissors className="w-4 h-4 text-[#8B4513]" />
                <span>Custom Stitching & Lining Included</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#8B4513]" />
                <span>Cash on Delivery & UPI Pan-India</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Filter & Products Grid Component */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <ProductGrid />
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto p-12 text-center text-xs text-[#777]">
          Loading Pakistani Designer Catalog...
        </div>
      }
    >
      <ProductsCatalogContent />
    </Suspense>
  );
}
