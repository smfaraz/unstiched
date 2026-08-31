'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useEcommerce, sanitizeProductImage } from '@/context/EcommerceContext';
import {
  Search,
  Heart,
  ShoppingBag,
  Menu,
  X,
  Sparkles,
  ChevronDown,
  ArrowRight,
  Package,
  Scissors,
  Phone,
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
    setFilters,
  } = useEcommerce();

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    router.push(`/products?category=${encodeURIComponent(cat)}`);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setFilters((prev) => ({ ...prev, searchQuery: searchInput.trim(), category: 'All' }));
      setSearchOpen(false);
      router.push(`/products?search=${encodeURIComponent(searchInput.trim())}`);
    }
  };

  const navCategories = [
    { name: 'All Suits', path: '/products', isSpecial: false },
    { name: 'New Arrivals', path: '/products?category=New%20Arrivals', isSpecial: true },
    { name: 'Unstitched Elegance', path: '/products?category=Unstitched%20Elegance', isSpecial: false },
    { name: 'Ready to Wear', path: '/products?category=Ready%20to%20Wear', isSpecial: false },
    { name: 'Festive Glam', path: '/products?category=Festive%20Glam', isSpecial: false },
    { name: 'Formal Wear', path: '/products?category=Formal%20Wear', isSpecial: false },
    { name: 'The Modern Edit', path: '/products?category=The%20Modern%20Edit', isSpecial: false },
    { name: 'Curves (S–4XL)', path: '/products?category=Curves%20(XL-6XL)', isSpecial: true },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#EBE8DF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Header Bar */}
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          
          {/* Left: Mobile Menu Trigger & Quick Links on Desktop */}
          <div className="flex items-center gap-3 sm:gap-6">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#1A1A1A] hover:bg-[#F6F5F0] rounded-sm transition -ml-2"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Desktop Quick Nav */}
            <div className="hidden lg:flex items-center gap-6 text-[11px] uppercase tracking-[0.18em] font-medium text-[#4A4A4A]">
              <Link href="/products?category=New%20Arrivals" className="hover:text-[#8B4513] transition-colors flex items-center gap-1 font-semibold text-[#8B4513]">
                <Sparkles className="w-3 h-3 text-[#8B4513]" />
                <span>New In</span>
              </Link>
              <Link href="/products?category=Unstitched%20Elegance" className="hover:text-black transition-colors">
                Unstitched
              </Link>
              <Link href="/products?category=Festive%20Glam" className="hover:text-black transition-colors">
                Festive
              </Link>
              <Link href="/products?category=Curves%20(XL-6XL)" className="hover:text-black transition-colors">
                Curves (48)
              </Link>
            </div>
          </div>

          {/* Center: Brand Logo */}
          <div className="flex-1 lg:flex-initial flex justify-center text-center">
            <Link
              href="/"
              onClick={() => setFilters((prev) => ({ ...prev, category: 'All', brand: [], searchQuery: '' }))}
              className="flex flex-col items-center group select-none"
            >
              <span className="font-serif text-2xl sm:text-3xl font-bold tracking-[0.08em] uppercase text-[#1A1A1A] group-hover:text-[#8B4513] transition-colors leading-none">
                UNSTITCHED
              </span>
              <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.3em] text-[#888] font-medium mt-1">
                Luxury Pakistani Suits
              </span>
            </Link>
          </div>

          {/* Right: Search, Size Guide, Wishlist & Cart */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            {/* Search Trigger / Input Box */}
            <div ref={searchRef} className="relative">
              {searchOpen ? (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-64 sm:w-80 z-50 animate-in fade-in zoom-in-95 duration-200">
                  <form onSubmit={handleSearchSubmit} className="relative">
                    <input
                      type="text"
                      placeholder="Search suits, fabric, lawn..."
                      value={searchInput}
                      autoFocus
                      onChange={(e) => setSearchInput(e.target.value)}
                      className="w-full bg-white border border-[#1A1A1A] rounded-xs pl-8 pr-8 py-2 text-xs text-[#1A1A1A] placeholder-[#888] shadow-lg focus:outline-none"
                    />
                    <Search className="w-3.5 h-3.5 text-[#888] absolute left-2.5 top-3" />
                    <button
                      type="button"
                      onClick={() => {
                        setSearchOpen(false);
                        setSearchInput('');
                      }}
                      className="absolute right-2.5 top-2.5 text-[#888] hover:text-black p-0.5"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </form>

                  {/* Search Results Dropdown */}
                  {searchResults.length > 0 && (
                    <div className="absolute top-full right-0 w-full mt-1.5 bg-white border border-[#EBE8DF] rounded-xs shadow-xl p-2 max-h-72 overflow-y-auto">
                      {searchResults.map((item) => (
                        <Link
                          key={item.id}
                          href={`/products/${item.id}`}
                          onClick={() => {
                            setSearchOpen(false);
                            setSearchInput('');
                          }}
                          className="flex items-center gap-2.5 p-2 hover:bg-[#FAF9F6] rounded-xs transition"
                        >
                          <div className="relative w-9 h-11 bg-[#EBE9E1] rounded-xs overflow-hidden shrink-0">
                            <Image
                              src={sanitizeProductImage(item.images?.[0])}
                              alt={item.title}
                              fill
                              className="object-cover object-top"
                              sizes="36px"
                            />
                          </div>
                          <div className="flex-1 min-w-0 text-left">
                            <div className="text-[11px] font-semibold text-[#1A1A1A] truncate">{item.title}</div>
                            <div className="text-[10px] font-bold text-[#8B4513]">{formatPrice(item.price)}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="p-2 text-[#4A4A4A] hover:text-black hover:bg-[#F6F5F0] rounded-xs transition"
                  aria-label="Search"
                >
                  <Search className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                </button>
              )}
            </div>

            {/* Size Guide Link */}
            <Link
              href="/size-guide"
              className="hidden md:flex items-center gap-1 px-2.5 py-1.5 rounded-xs text-[#555] hover:text-black hover:bg-[#F6F5F0] text-[10px] uppercase tracking-[0.15em] font-medium transition"
            >
              <Scissors className="w-3.5 h-3.5 text-[#8B4513]" />
              <span>Sizes</span>
            </Link>

            {/* Track Link */}
            <Link
              href="/track-order"
              className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-xs text-[#555] hover:text-black hover:bg-[#F6F5F0] text-[10px] uppercase tracking-[0.15em] font-medium transition"
            >
              <Package className="w-3.5 h-3.5 text-[#8B4513]" />
              <span>Track</span>
            </Link>

            {/* Saved Wishlist */}
            <Link
              href="/wishlist"
              className="relative p-2 text-[#4A4A4A] hover:text-black hover:bg-[#F6F5F0] rounded-xs transition"
              aria-label="Wishlist"
            >
              <Heart className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-[#8B4513] text-white text-[8px] font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Shopping Bag Button */}
            <Link
              href="/cart"
              className="flex items-center gap-2 bg-[#1A1A1A] hover:bg-black text-white px-3 sm:px-3.5 py-2 rounded-xs transition shadow-xs group"
            >
              <div className="relative">
                <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#8B4513] text-white text-[8px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="text-[11px] font-semibold tracking-wider hidden sm:inline-block">
                {cartCount > 0 ? formatPrice(cartSubtotal) : 'Bag'}
              </span>
            </Link>
          </div>
        </div>

        {/* Secondary Category Sub-Nav: Clean, Uncluttered, Refined */}
        <nav className="hidden lg:flex items-center justify-center gap-7 py-2.5 border-t border-[#EBE8DF] text-[11px] uppercase tracking-[0.16em] font-medium text-[#555]">
          {navCategories.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className={`transition-colors py-0.5 hover:text-black ${
                item.isSpecial ? 'text-[#8B4513] font-semibold flex items-center gap-1' : 'text-[#4A4A4A]'
              }`}
            >
              {item.isSpecial && <Sparkles className="w-2.5 h-2.5 text-[#8B4513]" />}
              <span>{item.name}</span>
            </Link>
          ))}
          <Link
            href="/products?fastDispatch=true"
            className="text-[10px] text-[#1A1A1A] bg-[#F2F0E9] hover:bg-[#E5E2D9] px-2 py-0.5 rounded-xs font-semibold tracking-wider transition ml-2"
          >
            ⚡ 24h Dispatch
          </Link>
        </nav>
      </div>

      {/* Mobile Slide-in Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex animate-in fade-in duration-200">
          <div className="w-4/5 max-w-sm bg-white h-full overflow-y-auto p-5 shadow-2xl flex flex-col justify-between border-r border-[#EBE8DF]">
            <div className="space-y-6">
              {/* Drawer Top */}
              <div className="flex items-center justify-between pb-4 border-b border-[#EBE8DF]">
                <div>
                  <div className="font-serif text-lg font-bold tracking-wider uppercase text-[#1A1A1A]">
                    UNSTITCHED
                  </div>
                  <div className="text-[9px] uppercase tracking-[0.2em] text-[#888]">Luxury Pakistani Suits</div>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 text-[#1A1A1A] hover:bg-[#F6F5F0] rounded-xs"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Category Links */}
              <div className="space-y-1">
                <div className="text-[10px] font-bold text-[#888] uppercase tracking-[0.2em] px-2 py-1">
                  Shop Collections
                </div>
                {navCategories.map((cat) => (
                  <Link
                    key={cat.name}
                    href={cat.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 text-xs font-medium uppercase tracking-[0.14em] text-[#1A1A1A] hover:bg-[#F6F5F0] rounded-xs transition"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>

              {/* Useful Links */}
              <div className="pt-4 border-t border-[#EBE8DF] space-y-1">
                <div className="text-[10px] font-bold text-[#888] uppercase tracking-[0.2em] px-2 py-1">
                  Customer Care
                </div>
                <Link
                  href="/track-order"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 text-xs text-[#555] hover:text-black rounded-xs transition"
                >
                  <Package className="w-4 h-4 text-[#8B4513]" />
                  <span>Track Order Status</span>
                </Link>
                <Link
                  href="/size-guide"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 text-xs text-[#555] hover:text-black rounded-xs transition"
                >
                  <Scissors className="w-4 h-4 text-[#8B4513]" />
                  <span>Size & Stitching Guide</span>
                </Link>
                <Link
                  href="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 text-xs text-[#555] hover:text-black rounded-xs transition"
                >
                  About Us & Authenticity
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 text-xs text-[#555] hover:text-black rounded-xs transition"
                >
                  Contact & Concierge
                </Link>
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="pt-4 border-t border-[#EBE8DF]">
              <a
                href="https://wa.me/919820089123?text=Hello%20Unstitched%20Luxe,%20I%20need%20assistance"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-[#1A1A1A] text-white py-2.5 rounded-xs text-xs font-semibold uppercase tracking-wider hover:bg-black transition"
              >
                <Phone className="w-3.5 h-3.5 text-[#C49A6C]" />
                <span>WhatsApp Concierge</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
