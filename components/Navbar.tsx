'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useEcommerce } from '@/context/EcommerceContext';
import {
  Search,
  Heart,
  ShoppingBag,
  Menu,
  X,
  Sparkles,
  ChevronDown,
  Phone,
  ShieldCheck,
  Scissors,
  ArrowRight,
  Package,
  Layers,
  Star,
  Info,
  BookOpen,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const router = useRouter();
  const {
    products,
    cartCount,
    cartSubtotal,
    formatPrice,
    wishlist,
    filters,
    setFilters,
    openCart,
    openWishlist,
    openOrderTracking,
    openProductDetail,
    openSizeGuide,
  } = useEcommerce();

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [designerDropdownOpen, setDesignerDropdownOpen] = useState(false);
  const [activeMegaTab, setActiveMegaTab] = useState<'designers' | 'categories' | 'curves' | null>(null);

  const searchRef = useRef<HTMLDivElement>(null);

  // Close search suggestions on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const searchResults = searchInput.trim()
    ? products
        .filter(
          (p) =>
            p.title.toLowerCase().includes(searchInput.toLowerCase()) ||
            p.brand.toLowerCase().includes(searchInput.toLowerCase()) ||
            p.category.toLowerCase().includes(searchInput.toLowerCase()) ||
            p.fabric.toLowerCase().includes(searchInput.toLowerCase()) ||
            p.tags.some((t) => t.toLowerCase().includes(searchInput.toLowerCase()))
        )
        .slice(0, 5)
    : [];

  const handleSelectCategory = (cat: string) => {
    setFilters((prev) => ({ ...prev, category: cat, searchQuery: '' }));
    setMobileMenuOpen(false);
    setActiveMegaTab(null);
    router.push(`/products?category=${encodeURIComponent(cat)}`);
  };

  const handleSelectBrand = (brandName: string) => {
    setFilters((prev) => ({
      ...prev,
      category: 'All',
      brand: [brandName],
      searchQuery: '',
    }));
    setMobileMenuOpen(false);
    setActiveMegaTab(null);
    router.push(`/products?brand=${encodeURIComponent(brandName)}`);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setFilters((prev) => ({ ...prev, searchQuery: searchInput.trim(), category: 'All' }));
      setSearchOpen(false);
      router.push(`/products?search=${encodeURIComponent(searchInput.trim())}`);
    }
  };

  const fabricsList = [
    { name: 'Pure Swiss Voile', cat: 'Swiss Voile' },
    { name: 'Schiffli Cutwork Lawn', cat: 'Schiffli Cutwork' },
    { name: 'Pure Cotton Lawn', cat: 'Pure Lawn' },
    { name: 'Pure Chiffon & Organza', cat: 'Chiffon & Organza' },
    { name: 'Cotton Satin', cat: 'Cotton Satin' },
    { name: 'Festive Jacquard & Zari', cat: 'Festive Formals' },
    { name: 'Curves Edition (XL-6XL)', cat: 'Curves (XL-6XL)' },
    { name: 'Daily Cambric Cotton', cat: 'Daily Cotton Lawn' },
    { name: 'Under ₹1,999 Suits', cat: 'Under ₹1999' },
    { name: 'Royal Velvet & Brocade', cat: 'Wedding Edition' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E5E2D9] shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Main Nav Row */}
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#1A1A1A] hover:bg-[#F2F0E9] rounded-sm transition"
            aria-label="Toggle Mobile Navigation"
            id="mobile-nav-toggle-btn"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Brand Logo & Tagline */}
          <Link
            href="/"
            onClick={() => {
              setFilters((prev) => ({ ...prev, category: 'All', brand: [], searchQuery: '' }));
            }}
            className="flex flex-col items-center sm:items-start cursor-pointer group select-none shrink-0"
            id="unstitched-brand-logo"
          >
            <div className="flex items-center gap-2">
              <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight uppercase text-[#1A1A1A] group-hover:text-[#8B4513] transition-colors">
                UNSTITCHED
              </span>
              <span className="text-[9px] font-sans bg-[#8B4513] text-white px-1.5 py-0.5 rounded-xs font-bold uppercase tracking-widest hidden md:inline-block">
                LUXE
              </span>
            </div>
            <span className="text-[9px] uppercase tracking-[0.25em] text-[#777] font-semibold hidden sm:block">
              Luxury Pakistani Designer Wear • India
            </span>
          </Link>

          {/* Search Bar - Desktop */}
          <div ref={searchRef} className="relative hidden md:flex flex-1 max-w-md mx-4">
            <form onSubmit={handleSearchSubmit} className="w-full relative">
              <input
                type="text"
                placeholder="Search Pure Lawn, Swiss Voile, Schiffli Cutwork, Chiffon suits..."
                value={searchInput}
                onChange={(e) => {
                  setSearchInput(e.target.value);
                  setSearchOpen(true);
                }}
                onFocus={() => setSearchOpen(true)}
                className="w-full bg-[#FAF9F6] border border-[#E5E2D9] rounded-sm pl-9 pr-9 py-2 text-xs text-[#1A1A1A] placeholder-[#888] focus:outline-none focus:border-black transition"
                id="main-desktop-search-input"
              />
              <Search className="w-4 h-4 text-[#888] absolute left-3 top-2.5" />
              {searchInput && (
                <button
                  type="button"
                  onClick={() => setSearchInput('')}
                  className="absolute right-3 top-2.5 text-[#888] hover:text-black"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </form>

            {/* Instant Search Predictive Dropdown */}
            {searchOpen && searchResults.length > 0 && (
              <div className="absolute top-11 left-0 right-0 bg-white border border-[#E5E2D9] rounded-sm shadow-xl z-50 p-2 overflow-hidden">
                <div className="text-[10px] font-bold text-[#777] uppercase tracking-widest px-3 py-1.5 border-b border-[#F2F0E9] flex justify-between items-center">
                  <span>Collections Found ({searchResults.length})</span>
                  <span className="text-[9px] text-[#8B4513]">Press Enter to view all</span>
                </div>
                <div className="divide-y divide-[#F2F0E9] max-h-80 overflow-y-auto">
                  {searchResults.map((item) => (
                    <Link
                      key={item.id}
                      href={`/products/${item.id}`}
                      onClick={() => setSearchOpen(false)}
                      className="flex items-center gap-3 p-2.5 hover:bg-[#FAF9F6] rounded-sm cursor-pointer transition"
                    >
                      <div className="relative w-11 h-14 bg-[#EBE9E1] rounded-xs overflow-hidden shrink-0 border border-[#E5E2D9]">
                        <Image
                          src={item.images[0]}
                          alt={item.title}
                          fill
                          className="object-cover"
                          sizes="44px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[9px] font-bold text-[#8B4513] uppercase tracking-widest">
                          {item.brand}
                        </div>
                        <div className="text-xs font-semibold text-[#1A1A1A] truncate">
                          {item.title}
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs font-bold text-black">
                            {formatPrice(item.price)}
                          </span>
                          <span className="text-[10px] text-[#888] line-through">
                            {formatPrice(item.originalPrice)}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Action Icons (Custom Tailoring, Track, Wishlist, Cart) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Track Order Direct Link */}
            <Link
              href="/track-order"
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-sm hover:bg-[#F2F0E9] text-[#555] hover:text-black text-[11px] uppercase tracking-wider font-semibold border border-transparent hover:border-[#E5E2D9] transition"
              id="header-track-order-btn"
            >
              <Package className="w-3.5 h-3.5 text-[#8B4513]" />
              <span>Track Order</span>
            </Link>

            {/* Custom Stitching Studio Link */}
            <Link
              href="/size-guide"
              className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-[#F2F0E9] hover:bg-[#E5E2D9] text-[#1A1A1A] text-[11px] uppercase tracking-wider font-semibold border border-[#E5E2D9] transition"
              id="custom-tailoring-header-btn"
            >
              <Scissors className="w-3.5 h-3.5 text-[#8B4513]" />
              <span>Size Guide</span>
            </Link>

            {/* Saved Wishlist */}
            <Link
              href="/wishlist"
              className="relative p-2 text-[#1A1A1A] hover:bg-[#F2F0E9] rounded-sm transition flex items-center justify-center"
              aria-label="Wishlist"
              id="header-wishlist-btn"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#8B4513] text-white text-[9px] font-bold rounded-full flex items-center justify-center shadow-xs">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Shopping Cart Link / Drawer */}
            <Link
              href="/cart"
              className="flex items-center gap-2.5 bg-black hover:bg-[#222] text-white px-3.5 py-2 rounded-sm shadow-xs transition group"
              id="header-shopping-cart-btn"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 text-white" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#8B4513] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                    {cartCount}
                  </span>
                )}
              </div>
              <div className="hidden sm:flex flex-col text-left text-[10px] leading-tight">
                <span className="text-[#AAA] text-[9px] uppercase tracking-widest font-semibold">Bag</span>
                <span className="font-bold text-white">{cartCount > 0 ? formatPrice(cartSubtotal) : '₹0'}</span>
              </div>
            </Link>
          </div>
        </div>

        {/* Mobile Search Input Row */}
        <div className="pb-3 md:hidden">
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <input
              type="text"
              placeholder="Search lawn suits, Maria B, Sana Safinaz..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full bg-[#FAF9F6] border border-[#E5E2D9] rounded-sm pl-8 pr-8 py-2 text-xs text-[#1A1A1A] placeholder-[#888] focus:outline-none focus:border-black"
              id="mobile-search-input"
            />
            <Search className="w-3.5 h-3.5 text-[#888] absolute left-2.5 top-2.5" />
          </form>
        </div>

        {/* Primary Desktop Category Navigation Bar */}
        <nav className="hidden lg:flex items-center justify-between border-t border-[#E5E2D9] py-2.5 text-[11px] uppercase tracking-widest font-semibold text-[#555] select-none">
          <div className="flex items-center gap-5">
            <Link
              href="/products"
              className="hover:text-black transition py-1 relative text-[#1A1A1A] font-bold"
              id="nav-all-suits"
            >
              All Suits
            </Link>

            <Link
              href="/products?category=New%20Arrivals"
              className="hover:text-black transition py-1 text-[#8B4513] font-bold flex items-center gap-1"
              id="nav-new-arrivals"
            >
              <Sparkles className="w-3 h-3 text-[#8B4513]" />
              <span>New Arrivals</span>
            </Link>

            <Link
              href="/products?category=Unstitched%20Elegance"
              className="hover:text-black transition py-1 text-[#1A1A1A] font-bold"
              id="nav-unstitched-elegance"
            >
              Unstitched Elegance
            </Link>

            <Link
              href="/products?category=Ready%20to%20Wear"
              className="hover:text-black transition py-1 text-[#555]"
              id="nav-ready-to-wear"
            >
              Ready to Wear
            </Link>

            <Link
              href="/products?category=Festive%20Glam"
              className="hover:text-black transition py-1 text-[#555]"
              id="nav-festive-glam"
            >
              Festive Glam
            </Link>

            <Link
              href="/products?category=Formal%20Wear"
              className="hover:text-black transition py-1 text-[#555]"
              id="nav-formal-wear"
            >
              Formal Wear
            </Link>

            <Link
              href="/products?category=The%20Modern%20Edit"
              className="hover:text-black transition py-1 text-[#555]"
              id="nav-modern-edit"
            >
              The Modern Edit
            </Link>

            <Link
              href="/products?category=Ethnic%20Daily%20Wear"
              className="hover:text-black transition py-1 text-[#555]"
              id="nav-ethnic-daily"
            >
              Ethnic Daily Wear
            </Link>

            <Link
              href="/products?category=Curves%20(XL-6XL)"
              className="flex items-center gap-1 hover:text-black transition py-0.5 px-2 rounded-xs border text-[10px] bg-[#F2F0E9] text-[#8B4513] border-[#E5E2D9] hover:border-black font-semibold"
              id="nav-curves-collection"
            >
              <Sparkles className="w-3 h-3" />
              <span>Curves (S - 4XL / 48)</span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/products?fastDispatch=true"
              className="text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-xs font-bold transition border bg-[#F2F0E9] text-[#1A1A1A] border-[#E5E2D9] hover:bg-[#E5E2D9]"
              id="nav-fast-dispatch-toggle"
            >
              ⚡ 24h Dispatch
            </Link>

            <Link
              href="/about"
              className="hover:text-black transition py-1 text-[#777] text-[10px]"
            >
              Our Story
            </Link>

            <Link
              href="/contact"
              className="hover:text-black transition py-1 text-[#777] text-[10px]"
            >
              Styling Concierge
            </Link>
          </div>
        </nav>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex">
          <div className="w-4/5 max-w-sm bg-[#FAF9F6] h-full overflow-y-auto p-5 shadow-2xl flex flex-col justify-between border-r border-[#E5E2D9]">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[#E5E2D9]">
                <div className="font-serif text-lg font-bold tracking-tight uppercase text-[#1A1A1A]">
                  UNSTITCHED LUXE
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 text-[#1A1A1A] hover:bg-[#E5E2D9] rounded-xs"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Pages */}
              <div className="py-3 border-b border-[#E5E2D9] space-y-1">
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-xs text-xs font-bold uppercase tracking-wider text-[#1A1A1A] hover:bg-[#F2F0E9]"
                >
                  Home
                </Link>
                <Link
                  href="/products"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-xs text-xs font-bold uppercase tracking-wider text-[#1A1A1A] hover:bg-[#F2F0E9]"
                >
                  Shop All Suits
                </Link>
                <Link
                  href="/cart"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-xs text-xs font-bold uppercase tracking-wider text-[#1A1A1A] hover:bg-[#F2F0E9]"
                >
                  Shopping Bag ({cartCount})
                </Link>
                <Link
                  href="/wishlist"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-xs text-xs font-bold uppercase tracking-wider text-[#1A1A1A] hover:bg-[#F2F0E9]"
                >
                  Wishlist ({wishlist.length})
                </Link>
                <Link
                  href="/track-order"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-xs text-xs font-bold uppercase tracking-wider text-[#1A1A1A] hover:bg-[#F2F0E9]"
                >
                  Track Order
                </Link>
                <Link
                  href="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-xs text-xs font-bold uppercase tracking-wider text-[#555] hover:bg-[#F2F0E9]"
                >
                  About Us & Authenticity
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-xs text-xs font-bold uppercase tracking-wider text-[#555] hover:bg-[#F2F0E9]"
                >
                  Contact & Styling
                </Link>
              </div>

              {/* Categories */}
              <div className="py-4 space-y-1">
                <div className="text-[10px] font-bold text-[#888] uppercase tracking-widest px-2 py-1">
                  Collections & Edits
                </div>
                {[
                  { name: 'All Suits', cat: 'All' },
                  { name: 'New Arrivals', cat: 'New Arrivals', badge: 'New' },
                  { name: 'Unstitched Elegance', cat: 'Unstitched Elegance', badge: 'Hot' },
                  { name: 'Ready to Wear / Style Now', cat: 'Ready to Wear' },
                  { name: 'Festive Glam (Celebration Edit)', cat: 'Festive Glam' },
                  { name: 'Formal Wear (Executive Style)', cat: 'Formal Wear' },
                  { name: 'The Modern Edit (Contemporary)', cat: 'The Modern Edit' },
                  { name: 'Ethnic Daily Wear', cat: 'Ethnic Daily Wear' },
                  { name: 'Curves (S to 4XL / 48)', cat: 'Curves (XL-6XL)', badge: 'Special' },
                ].map((item) => (
                  <button
                    key={item.name}
                    onClick={() => handleSelectCategory(item.cat)}
                    className="w-full text-left px-3 py-2.5 rounded-xs text-xs font-semibold uppercase tracking-wider text-[#1A1A1A] hover:bg-[#F2F0E9] flex items-center justify-between transition"
                  >
                    <span>{item.name}</span>
                    {item.badge && (
                      <span className="text-[9px] bg-[#8B4513] text-white px-2 py-0.5 rounded-xs font-bold uppercase tracking-widest">
                        {item.badge}
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {/* Designer Quick List */}
              <div className="py-3 border-t border-[#E5E2D9]">
                <div className="text-[10px] font-bold text-[#888] uppercase tracking-widest px-2 py-1">
                  Pakistani Designers
                </div>
                <div className="grid grid-cols-2 gap-1 mt-1">
                  {designersList.map((d) => (
                    <button
                      key={d}
                      onClick={() => handleSelectBrand(d)}
                      className="text-left px-2 py-1.5 rounded-xs text-xs font-medium text-[#555] hover:bg-[#F2F0E9] hover:text-black truncate"
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer buttons */}
            <div className="pt-4 border-t border-[#E5E2D9] space-y-2">
              <Link
                href="/track-order"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 bg-[#F2F0E9] text-[#1A1A1A] py-2.5 rounded-xs text-xs font-bold uppercase tracking-wider border border-[#E5E2D9]"
              >
                <Package className="w-4 h-4 text-[#8B4513]" />
                <span>Track Order</span>
              </Link>
              <a
                href="https://wa.me/919820089123?text=Hello%20Pehnava%20Lawns,%20I%20need%20assistance"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-[#1A1A1A] text-white py-2.5 rounded-xs text-xs font-bold uppercase tracking-wider shadow-xs hover:bg-[#333]"
              >
                <Phone className="w-4 h-4 text-[#8B4513]" />
                <span>WhatsApp Care</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
