'use client';

import React, { useState, useMemo } from 'react';
import { useEcommerce } from '@/context/EcommerceContext';
import { ProductFilter } from '@/types/ecommerce';
import ProductCard from './ProductCard';
import {
  SlidersHorizontal,
  X,
  RotateCcw,
  Check,
  ChevronDown,
  Sparkles,
  ArrowUpDown,
  Filter,
} from 'lucide-react';

export default function ProductGrid() {
  const { products, filters, setFilters, resetFilters, formatPrice } = useEcommerce();
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Available unique filter values
  const availableBrands = useMemo(() => {
    const brandsSet = new Set<string>();
    products.forEach((p) => brandsSet.add(p.brand));
    return Array.from(brandsSet).sort();
  }, [products]);

  const availableFabrics = useMemo(() => {
    const fabricsSet = new Set<string>();
    products.forEach((p) => fabricsSet.add(p.fabric));
    return Array.from(fabricsSet).sort();
  }, [products]);

  const availableSuitTypes = useMemo(() => {
    const typesSet = new Set<string>();
    products.forEach((p) => typesSet.add(p.suitType));
    return Array.from(typesSet).sort();
  }, [products]);

  // Filtered & Sorted Product List
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category filter
      if (filters.category && filters.category !== 'All') {
        if (p.category !== filters.category) return false;
      }

      // Brand filter
      if (filters.brand.length > 0) {
        if (!filters.brand.includes(p.brand)) return false;
      }

      // Fabric filter
      if (filters.fabric.length > 0) {
        if (!filters.fabric.includes(p.fabric)) return false;
      }

      // Suit type filter
      if (filters.suitType.length > 0) {
        if (!filters.suitType.includes(p.suitType)) return false;
      }

      // Price filter
      if (p.price < filters.minPrice || p.price > filters.maxPrice) {
        return false;
      }

      // Fast dispatch only
      if (filters.fastDispatchOnly && !p.isFastDispatch24h) {
        return false;
      }

      // In stock only
      if (filters.inStockOnly && !p.inStock) {
        return false;
      }

      // Search Query
      if (filters.searchQuery.trim()) {
        const q = filters.searchQuery.toLowerCase();
        const matchTitle = p.title.toLowerCase().includes(q);
        const matchBrand = p.brand.toLowerCase().includes(q);
        const matchFabric = p.fabric.toLowerCase().includes(q);
        const matchTags = p.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchTitle && !matchBrand && !matchFabric && !matchTags) return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price-asc') return a.price - b.price;
      if (filters.sortBy === 'price-desc') return b.price - a.price;
      if (filters.sortBy === 'rating-desc') return b.rating - a.rating;
      if (filters.sortBy === 'discount-desc') return b.discountPercent - a.discountPercent;
      if (filters.sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      return 0; // 'featured'
    });
  }, [products, filters]);

  const handleBrandToggle = (brand: string) => {
    setFilters((prev) => {
      const exists = prev.brand.includes(brand);
      return {
        ...prev,
        brand: exists ? prev.brand.filter((b) => b !== brand) : [...prev.brand, brand],
      };
    });
  };

  const handleFabricToggle = (fabric: string) => {
    setFilters((prev) => {
      const exists = prev.fabric.includes(fabric);
      return {
        ...prev,
        fabric: exists ? prev.fabric.filter((f) => f !== fabric) : [...prev.fabric, fabric],
      };
    });
  };

  const handleSuitTypeToggle = (type: string) => {
    setFilters((prev) => {
      const exists = prev.suitType.includes(type);
      return {
        ...prev,
        suitType: exists ? prev.suitType.filter((t) => t !== type) : [...prev.suitType, type],
      };
    });
  };

  const activeFilterCount =
    (filters.category !== 'All' ? 1 : 0) +
    filters.brand.length +
    filters.fabric.length +
    filters.suitType.length +
    (filters.fastDispatchOnly ? 1 : 0) +
    (filters.maxPrice < 15000 ? 1 : 0) +
    (filters.searchQuery ? 1 : 0);

  return (
    <section id="products-collection" className="w-full">
      {/* Header & Sort Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 mb-4 border-b border-[#E5E2D9]">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg sm:text-2xl font-serif font-bold text-[#1A1A1A] uppercase tracking-tight">
              {filters.category === 'All' ? 'Pakistani Lawn & Designer Suits' : filters.category}
            </h2>
            {filters.searchQuery && (
              <span className="text-[10px] bg-[#F2F0E9] text-[#8B4513] px-2 py-0.5 rounded-xs font-bold uppercase tracking-widest border border-[#E5E2D9]">
                &quot;{filters.searchQuery}&quot;
              </span>
            )}
          </div>
          <p className="text-[11px] sm:text-xs text-[#777] mt-0.5">
            <strong>{filteredProducts.length}</strong> authentic luxury pieces • Pan-India Free Delivery
          </p>
        </div>

        {/* Action Controls & Sort Dropdown */}
        <div className="flex items-center justify-between sm:justify-end gap-2">
          {/* Mobile Filter Button */}
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-1.5 bg-white border border-[#E5E2D9] px-3 py-1.5 rounded-xs text-[10.5px] uppercase tracking-wider font-bold text-[#1A1A1A] shadow-2xs"
            id="mobile-filter-drawer-open-btn"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#8B4513]" />
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <span className="w-4 h-4 bg-[#8B4513] text-white text-[9px] rounded-full flex items-center justify-center font-bold">
                {activeFilterCount}
              </span>
            )}
          </button>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-1.5 bg-white border border-[#E5E2D9] px-2.5 py-1.5 rounded-xs text-[10.5px] shadow-2xs uppercase tracking-wider">
            <ArrowUpDown className="w-3 h-3 text-[#8B4513]" />
            <select
              id="sort-by-select"
              aria-label="Sort products by"
              value={filters.sortBy}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  sortBy: e.target.value as ProductFilter['sortBy'],
                }))
              }
              className="bg-transparent font-bold text-[#1A1A1A] focus:outline-none cursor-pointer text-[11px]"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating-desc">Rating</option>
              <option value="discount-desc">Discount</option>
              <option value="newest">New Drops</option>
            </select>
          </div>
        </div>
      </div>

      {/* Active Filter Badges Bar */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap items-center gap-2 py-3">
          <span className="text-[10px] text-[#777] uppercase tracking-widest font-bold">Active Filters:</span>
          {filters.category !== 'All' && (
            <span className="inline-flex items-center gap-1 bg-[#F2F0E9] text-[#8B4513] text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-xs border border-[#E5E2D9]">
              Category: {filters.category}
              <button
                onClick={() => setFilters((p) => ({ ...p, category: 'All' }))}
                className="hover:text-black"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.brand.map((b) => (
            <span
              key={b}
              className="inline-flex items-center gap-1 bg-[#FAF9F6] text-[#1A1A1A] text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-xs border border-[#E5E2D9]"
            >
              {b}
              <button onClick={() => handleBrandToggle(b)} className="hover:text-[#8B4513]">
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}

          {filters.fabric.map((f) => (
            <span
              key={f}
              className="inline-flex items-center gap-1 bg-[#FAF9F6] text-[#1A1A1A] text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-xs border border-[#E5E2D9]"
            >
              {f}
              <button onClick={() => handleFabricToggle(f)} className="hover:text-[#8B4513]">
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}

          {filters.fastDispatchOnly && (
            <span className="inline-flex items-center gap-1 bg-black text-white text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-xs border border-black">
              ⚡ 24h Dispatch
              <button
                onClick={() => setFilters((p) => ({ ...p, fastDispatchOnly: false }))}
                className="hover:text-[#8B4513]"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.searchQuery && (
            <span className="inline-flex items-center gap-1 bg-[#F2F0E9] text-[#1A1A1A] text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-xs border border-[#E5E2D9]">
              &quot;{filters.searchQuery}&quot;
              <button
                onClick={() => setFilters((p) => ({ ...p, searchQuery: '' }))}
                className="hover:text-black"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          <button
            onClick={resetFilters}
            className="text-[10px] uppercase tracking-wider text-[#8B4513] hover:underline font-bold ml-2 flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset All</span>
          </button>
        </div>
      )}

      {/* Main Content Grid: Sidebar + Product Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-6">
        {/* Desktop Filter Sidebar */}
        <aside className="hidden lg:block lg:col-span-1 space-y-6 bg-white p-5 rounded-xs border border-[#E5E2D9] shadow-xs h-fit sticky top-24">
          <div className="flex items-center justify-between pb-3 border-b border-[#E5E2D9]">
            <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-[#1A1A1A]">
              <SlidersHorizontal className="w-4 h-4 text-[#8B4513]" />
              <span>Filter Pieces</span>
            </div>
            {activeFilterCount > 0 && (
              <button
                onClick={resetFilters}
                className="text-[10px] uppercase tracking-wider text-[#8B4513] font-bold hover:underline"
              >
                Clear All
              </button>
            )}
          </div>

          {/* Fabric / Craft Edition Checklist */}
          <div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-[#777] mb-3">
              Fabric & Weave Editions ({availableBrands.length})
            </div>
            <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
              {availableBrands.map((brand) => {
                const isSelected = filters.brand.includes(brand);
                const count = products.filter((p) => p.brand === brand).length;
                return (
                  <label
                    key={brand}
                    className="flex items-center justify-between text-xs text-[#1A1A1A] hover:text-[#8B4513] cursor-pointer group select-none"
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleBrandToggle(brand)}
                        className="rounded-xs border-[#E5E2D9] text-[#8B4513] focus:ring-[#8B4513] cursor-pointer accent-[#8B4513]"
                      />
                      <span className={isSelected ? 'font-bold text-[#8B4513]' : 'font-medium'}>
                        {brand}
                      </span>
                    </div>
                    <span className="text-[10px] text-[#888] group-hover:text-[#8B4513]">
                      ({count})
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Fabric Type Checklist */}
          <div className="pt-4 border-t border-[#E5E2D9]">
            <div className="text-[10px] font-bold uppercase tracking-widest text-[#777] mb-3">
              Fabric
            </div>
            <div className="space-y-2">
              {availableFabrics.map((fabric) => {
                const isSelected = filters.fabric.includes(fabric);
                const count = products.filter((p) => p.fabric === fabric).length;
                return (
                  <label
                    key={fabric}
                    className="flex items-center justify-between text-xs text-[#1A1A1A] hover:text-[#8B4513] cursor-pointer select-none"
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleFabricToggle(fabric)}
                        className="rounded-xs border-[#E5E2D9] text-[#8B4513] focus:ring-[#8B4513] cursor-pointer accent-[#8B4513]"
                      />
                      <span className={isSelected ? 'font-bold text-[#8B4513]' : 'font-medium'}>
                        {fabric}
                      </span>
                    </div>
                    <span className="text-[10px] text-[#888]">({count})</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Suit Type Checklist */}
          <div className="pt-4 border-t border-[#E5E2D9]">
            <div className="text-[10px] font-bold uppercase tracking-widest text-[#777] mb-3">
              Suit Type
            </div>
            <div className="space-y-2">
              {availableSuitTypes.map((type) => {
                const isSelected = filters.suitType.includes(type);
                return (
                  <label
                    key={type}
                    className="flex items-center gap-2 text-xs text-[#1A1A1A] hover:text-[#8B4513] cursor-pointer select-none"
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleSuitTypeToggle(type)}
                      className="rounded-xs border-[#E5E2D9] text-[#8B4513] focus:ring-[#8B4513] cursor-pointer accent-[#8B4513]"
                    />
                    <span className={isSelected ? 'font-bold text-[#8B4513]' : 'font-medium'}>
                      {type}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="pt-4 border-t border-[#E5E2D9]">
            <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-[#777] mb-2">
              <span>Price Range</span>
              <span className="text-[#8B4513] font-bold">Up to {formatPrice(filters.maxPrice)}</span>
            </div>
            <input
              type="range"
              min={1000}
              max={15000}
              step={500}
              value={filters.maxPrice}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, maxPrice: Number(e.target.value) }))
              }
              className="w-full accent-[#8B4513] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#888] mt-1 font-semibold">
              <span>₹1,000</span>
              <span>₹15,000+</span>
            </div>
          </div>

          {/* Fast 24h Dispatch Switch */}
          <div className="pt-4 border-t border-[#E5E2D9]">
            <label className="flex items-center justify-between cursor-pointer">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#1A1A1A] uppercase tracking-wider">24h Fast Dispatch</span>
                <span className="text-[10px] text-[#777]">Express stock from Delhi/Mumbai</span>
              </div>
              <input
                type="checkbox"
                checked={filters.fastDispatchOnly}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, fastDispatchOnly: e.target.checked }))
                }
                className="w-4 h-4 rounded-xs text-[#8B4513] focus:ring-[#8B4513] accent-[#8B4513]"
              />
            </label>
          </div>
        </aside>

        {/* Product Cards Grid Area */}
        <div className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-xs p-12 text-center border border-[#E5E2D9] shadow-xs space-y-4">
              <Filter className="w-12 h-12 text-[#888] mx-auto" />
              <h3 className="text-lg font-serif font-bold text-[#1A1A1A] uppercase tracking-tight">No pieces match your filters</h3>
              <p className="text-xs text-[#777] max-w-sm mx-auto">
                Try clearing some designer brand or fabric filters to discover our complete Pakistani lawn catalog.
              </p>
              <button
                onClick={resetFilters}
                className="bg-black text-white text-xs font-bold uppercase tracking-widest px-6 py-2.5 rounded-xs shadow-xs hover:bg-[#222] transition"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Drawer Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end">
          <div className="w-full max-w-xs bg-[#FAF9F6] h-full overflow-y-auto p-5 shadow-2xl flex flex-col justify-between border-l border-[#E5E2D9]">
            <div className="space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#E5E2D9]">
                <div className="font-bold text-xs uppercase tracking-widest text-[#1A1A1A] flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-[#8B4513]" />
                  <span>Filter Pieces</span>
                </div>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1 text-[#1A1A1A] hover:bg-[#E5E2D9] rounded-xs"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Brands */}
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#777] mb-2">
                  Pakistani Brands
                </div>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {availableBrands.map((brand) => (
                    <label key={brand} className="flex items-center gap-2 text-xs text-[#1A1A1A]">
                      <input
                        type="checkbox"
                        checked={filters.brand.includes(brand)}
                        onChange={() => handleBrandToggle(brand)}
                        className="rounded-xs border-[#E5E2D9] text-[#8B4513] accent-[#8B4513]"
                      />
                      <span>{brand}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Fabric */}
              <div className="pt-3 border-t border-[#E5E2D9]">
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#777] mb-2">
                  Fabric
                </div>
                <div className="space-y-2">
                  {availableFabrics.map((fabric) => (
                    <label key={fabric} className="flex items-center gap-2 text-xs text-[#1A1A1A]">
                      <input
                        type="checkbox"
                        checked={filters.fabric.includes(fabric)}
                        onChange={() => handleFabricToggle(fabric)}
                        className="rounded-xs border-[#E5E2D9] text-[#8B4513] accent-[#8B4513]"
                      />
                      <span>{fabric}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Max Price */}
              <div className="pt-3 border-t border-[#E5E2D9]">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-[#777] mb-2">
                  <span>Price</span>
                  <span className="text-[#8B4513] font-bold">Up to {formatPrice(filters.maxPrice)}</span>
                </div>
                <input
                  type="range"
                  min={1000}
                  max={15000}
                  step={500}
                  value={filters.maxPrice}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, maxPrice: Number(e.target.value) }))
                  }
                  className="w-full accent-[#8B4513]"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-[#E5E2D9] space-y-2">
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full bg-black text-white py-2.5 rounded-xs text-xs uppercase tracking-widest font-bold shadow-xs hover:bg-[#222]"
              >
                Apply Filters ({filteredProducts.length} Suits)
              </button>
              <button
                onClick={() => {
                  resetFilters();
                  setMobileFilterOpen(false);
                }}
                className="w-full bg-[#F2F0E9] text-[#1A1A1A] py-2 rounded-xs text-xs uppercase tracking-widest font-bold border border-[#E5E2D9]"
              >
                Reset All
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
