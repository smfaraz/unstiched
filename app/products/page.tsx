'use client';

import React, { Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useEcommerce } from '@/context/EcommerceContext';
import ProductGrid from '@/components/ProductGrid';
import CategoryPills from '@/components/CategoryPills';

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
    <div className="min-h-screen bg-[#FAF9F6] pb-16">
      {/* Category Pills Strip */}
      <CategoryPills />

      {/* Main Catalog Section */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-8">
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
