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
  Phone,
  ShieldCheck,
  Scissors,
  ArrowRight,
  Package,
  Layers,
  Star,
  CheckCircle2,
  ChevronRight,
  SlidersHorizontal,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
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
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>('unstitched');

  const searchRef = useRef<HTMLDivElement>(null);
  const navContainerRef = useRef<HTMLDivElement>(null);

  // Close search suggestions on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchOpen(false);
      }
      if (navContainerRef.current && !navContainerRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
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

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setFilters((prev) => ({ ...prev, searchQuery: searchInput.trim(), category: 'All' }));
      setSearchOpen(false);
      router.push(`/products?search=${encodeURIComponent(searchInput.trim())}`);
    }
  };

  const navigateCategory = (cat: string) => {
    setFilters((prev) => ({ ...prev, category: cat, searchQuery: '' }));
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    router.push(`/products?category=${encodeURIComponent(cat)}`);
  };

  interface MegaMenuLink {
    label: string;
    cat?: string;
    href?: string;
    query?: string;
  }

  interface MegaMenuColumn {
    heading: string;
    links: MegaMenuLink[];
  }

  interface NavPillar {
    id: string;
    label: string;
    href: string;
    badge?: string;
    isSpecial?: boolean;
    megaMenu: {
      columns: MegaMenuColumn[];
      featuredProduct?: {
        title: string;
        subtitle: string;
        price?: number;
        image: string;
        category?: string;
        href?: string;
      };
    };
  }

  // Miller's 5 Core Pillars
  const NAV_PILLARS: NavPillar[] = [
    {
      id: 'new-in',
      label: 'New Arrivals',
      href: '/products?category=New%20Arrivals',
      badge: '2026 Edition',
      isSpecial: true,
      megaMenu: {
        columns: [
          {
            heading: 'Trending Collections',
            links: [
              { label: 'Schiffli Cutwork Lawn Drop', cat: 'New Arrivals' },
              { label: 'Botanical Laser Cutwork Ensembles', cat: 'New Arrivals' },
              { label: 'Swiss Voile with Organza Dupatta', cat: 'Unstitched Elegance' },
              { label: 'View All Fresh Season Drops', cat: 'New Arrivals' },
            ],
          },
          {
            heading: 'Top Curations',
            links: [
              { label: 'Express 24h Ready to Ship', cat: 'All', query: 'fastDispatch=true' },
              { label: 'Pastel Lilac & Sage Edits', cat: 'New Arrivals' },
              { label: 'Multi-Buy Discounts (Up to 20% OFF)', cat: 'All' },
            ],
          },
        ],
        featuredProduct: {
          title: 'Botanical Laser Cutwork Luxury 3-Piece',
          subtitle: 'Cotton Satin & Organza Dupatta',
          price: 2499,
          image: '/images/products/blue_cutwork_suit.jpg',
          category: 'New Arrivals',
        },
      },
    },
    {
      id: 'unstitched',
      label: 'Unstitched',
      href: '/products?category=Unstitched%20Elegance',
      megaMenu: {
        columns: [
          {
            heading: 'By Fabric Type',
            links: [
              { label: 'Pure Swiss Voile Lawn (80s/100s)', cat: 'Unstitched Elegance' },
              { label: 'Pure Cotton Slub Lawn', cat: 'Unstitched Elegance' },
              { label: 'Cotton Satin & Silk Lawn', cat: 'Unstitched Elegance' },
              { label: 'Plush Micro 9000 Velvet', cat: 'Festive Glam' },
            ],
          },
          {
            heading: 'By Artisanal Craft',
            links: [
              { label: 'Schiffli Open-Work Cutwork', cat: 'Festive Glam' },
              { label: 'Resham Chikankari Embroidery', cat: 'Festive Glam' },
              { label: 'Mughal Botanical Digital Prints', cat: 'Ethnic Daily Wear' },
              { label: 'Antique Zari & Tilla Dori', cat: 'Formal Wear' },
            ],
          },
        ],
        featuredProduct: {
          title: 'Pure Swiss Voile Lawn with Schiffli Cutwork',
          subtitle: 'Original Weave with Hologram Seal',
          price: 2199,
          image: '/images/products/pink_lawn_suit.jpg',
          category: 'Unstitched Elegance',
        },
      },
    },
    {
      id: 'occasions',
      label: 'Occasions & Formals',
      href: '/products?category=Festive%20Glam',
      megaMenu: {
        columns: [
          {
            heading: 'Celebration Edits',
            links: [
              { label: 'Festive Glam / The Celebration Edit', cat: 'Festive Glam' },
              { label: 'Formal Wear / Executive Style', cat: 'Formal Wear' },
              { label: 'The Modern Edit / The Contemporary', cat: 'The Modern Edit' },
              { label: 'Ethnic Daily Wear Staple', cat: 'Ethnic Daily Wear' },
            ],
          },
          {
            heading: 'Curated Dupattas',
            links: [
              { label: 'Bamberg Silk Chiffon Dupattas', cat: 'The Modern Edit' },
              { label: 'Scalloped Laser Organza Dupattas', cat: 'Unstitched Elegance' },
              { label: 'Banarasi Zari Tissue Dupattas', cat: 'Formal Wear' },
              { label: 'Soft Cotton Mulmul Dupattas', cat: 'Ethnic Daily Wear' },
            ],
          },
        ],
        featuredProduct: {
          title: 'Executive Zari & Dori Self-Jacquard 3-Piece',
          subtitle: 'Ruby Red & Antique Gold Tilla',
          price: 2699,
          image: '/images/products/emerald_festive_suit.jpg',
          category: 'Formal Wear',
        },
      },
    },
    {
      id: 'ready-to-wear',
      label: 'Ready to Wear / Curves',
      href: '/products?category=Ready%20to%20Wear',
      megaMenu: {
        columns: [
          {
            heading: 'Pre-Stitched & Curves',
            links: [
              { label: 'Ready to Wear / Style Now', cat: 'Ready to Wear' },
              { label: 'Curves Edition (S – 36 to 4XL – 48)', cat: 'Ready to Wear' },
              { label: 'Extended 3.75m+ Fabric Yardage', cat: 'Ready to Wear' },
              { label: 'Custom Tailored Fit at Checkout', cat: 'All' },
            ],
          },
          {
            heading: 'Size Hierarchy (Inches)',
            links: [
              { label: 'S – 36 / M – 38 / L – 40', cat: 'Ready to Wear' },
              { label: 'XL – 42 / 2XL – 44', cat: 'Ready to Wear' },
              { label: '3XL – 46 / 4XL – 48', cat: 'Ready to Wear' },
              { label: 'Custom Size – Bespoke Fit', cat: 'Ready to Wear' },
            ],
          },
        ],
        featuredProduct: {
          title: 'Curves Edition Pure Lawn 3-Piece Ensemble',
          subtitle: 'Available up to 4XL (48 Bust)',
          price: 1799,
          image: '/images/products/peach_curves_suit.jpg',
          category: 'Ready to Wear',
        },
      },
    },
    {
      id: 'atelier',
      label: 'The Atelier & Studio',
      href: '/about',
      megaMenu: {
        columns: [
          {
            heading: 'Brand & Craftsmanship',
            links: [
              { label: 'Our Story & Hologram Authenticity', href: '/about' },
              { label: 'Master Tailoring & Size Guide', href: '/size-guide' },
              { label: 'Track Order & BlueDart Air Status', href: '/track-order' },
              { label: 'Styling Concierge & Support', href: '/contact' },
            ],
          },
          {
            heading: 'Trust & Commitments',
            links: [
              { label: '100% Original Pakistani Weaves', href: '/about' },
              { label: 'Express Pan-India BlueDart Shipping', href: '/track-order' },
              { label: 'Multi-Buy Tier Discounts', href: '/products' },
              { label: 'Bespoke Custom Stitching Studio', href: '/size-guide' },
            ],
          },
        ],
        featuredProduct: {
          title: 'Heirloom Craftsmanship & Barcode Seal',
          subtitle: 'Direct Weave Verification',
          price: 1899,
          image: '/images/hero/hero_banner.jpg',
          href: '/about',
        },
      },
    },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E5E2D9] shadow-xs" ref={navContainerRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Tier 1: Main Header Bar (Logo, Global Search, Actions) */}
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Mobile Hamburger Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#1A1A1A] hover:bg-[#F2F0E9] rounded-xs transition"
            aria-label="Toggle Navigation Menu"
            id="mobile-nav-toggle-btn"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Luxury Brand Entity (Unstitched Luxe) */}
          <Link
            href="/"
            onClick={() => {
              setFilters((prev) => ({ ...prev, category: 'All', brand: [], searchQuery: '' }));
              setActiveDropdown(null);
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
            <span className="text-[8.5px] uppercase tracking-[0.28em] text-[#777] font-semibold hidden sm:block">
              Luxury Pakistani Designer Wear • India
            </span>
          </Link>

          {/* Global Predictive Search (Hick's Law Search Simplification) */}
          <div ref={searchRef} className="relative hidden md:flex flex-1 max-w-lg mx-6">
            <form onSubmit={handleSearchSubmit} className="w-full relative">
              <input
                type="text"
                placeholder="Search Pakistani suits, Swiss Voile, Schiffli Cutwork, Chiffon..."
                value={searchInput}
                onChange={(e) => {
                  setSearchInput(e.target.value);
                  setSearchOpen(true);
                }}
                onFocus={() => setSearchOpen(true)}
                className="w-full bg-[#FAF9F6] border border-[#E5E2D9] rounded-xs pl-9 pr-9 py-2.5 text-xs text-[#1A1A1A] placeholder-[#888] focus:outline-none focus:border-[#8B4513] focus:ring-1 focus:ring-[#8B4513] transition shadow-2xs"
                id="main-desktop-search-input"
              />
              <Search className="w-4 h-4 text-[#888] absolute left-3 top-3" />
              {searchInput && (
                <button
                  type="button"
                  onClick={() => setSearchInput('')}
                  className="absolute right-3 top-3 text-[#888] hover:text-black"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </form>

            {/* Instant Predictive Results Dropdown */}
            {searchOpen && searchResults.length > 0 && (
              <div className="absolute top-12 left-0 right-0 bg-white border border-[#E5E2D9] rounded-xs shadow-xl z-50 p-2 overflow-hidden animate-in fade-in duration-200">
                <div className="text-[10px] font-bold text-[#777] uppercase tracking-widest px-3 py-1.5 border-b border-[#F2F0E9] flex justify-between items-center">
                  <span>Found ({searchResults.length} Matches)</span>
                  <span className="text-[9px] text-[#8B4513]">Press Enter to view all</span>
                </div>
                <div className="divide-y divide-[#F2F0E9] max-h-80 overflow-y-auto">
                  {searchResults.map((item) => (
                    <Link
                      key={item.id}
                      href={`/products/${item.id}`}
                      onClick={() => setSearchOpen(false)}
                      className="flex items-center gap-3 p-2.5 hover:bg-[#FAF9F6] rounded-xs cursor-pointer transition group"
                    >
                      <div className="relative w-11 h-14 bg-[#EBE9E1] rounded-xs overflow-hidden shrink-0 border border-[#E5E2D9]">
                        <Image
                          src={sanitizeProductImage(item.images?.[0])}
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
                        <div className="text-xs font-semibold text-[#1A1A1A] truncate group-hover:text-[#8B4513] transition-colors">
                          {item.title}
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs font-bold text-black">
                            {formatPrice(item.price)}
                          </span>
                          {item.originalPrice && (
                            <span className="text-[10px] text-[#888] line-through">
                              {formatPrice(item.originalPrice)}
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Entities (Fitts's Law Target Sizing) */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Quick Track Order */}
            <Link
              href="/track-order"
              className="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-xs hover:bg-[#F2F0E9] text-[#444] hover:text-black text-[11px] uppercase tracking-wider font-semibold border border-transparent hover:border-[#E5E2D9] transition"
              id="header-track-order-btn"
            >
              <Package className="w-4 h-4 text-[#8B4513]" />
              <span>Track</span>
            </Link>

            {/* Size Guide Link */}
            <Link
              href="/size-guide"
              className="hidden xl:flex items-center gap-1.5 px-3 py-2 rounded-xs bg-[#F2F0E9] hover:bg-[#E5E2D9] text-[#1A1A1A] text-[11px] uppercase tracking-wider font-semibold border border-[#E5E2D9] transition"
              id="header-size-guide-btn"
            >
              <Scissors className="w-3.5 h-3.5 text-[#8B4513]" />
              <span>Size Guide</span>
            </Link>

            {/* Saved Wishlist */}
            <Link
              href="/wishlist"
              className="relative p-2.5 text-[#1A1A1A] hover:bg-[#F2F0E9] rounded-xs transition flex items-center justify-center border border-transparent hover:border-[#E5E2D9]"
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

            {/* Shopping Bag (Primary CTA) */}
            <Link
              href="/cart"
              className="flex items-center gap-2.5 bg-black hover:bg-[#222] text-white px-4 py-2.5 rounded-xs shadow-xs transition group"
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
                <span className="text-[#AAA] text-[8.5px] uppercase tracking-widest font-semibold">Bag</span>
                <span className="font-bold text-white">{cartCount > 0 ? formatPrice(cartSubtotal) : '₹0'}</span>
              </div>
            </Link>
          </div>
        </div>

        {/* Mobile Search Row */}
        <div className="pb-3 md:hidden">
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <input
              type="text"
              placeholder="Search Pakistani suits, fabrics..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full bg-[#FAF9F6] border border-[#E5E2D9] rounded-xs pl-8 pr-8 py-2 text-xs text-[#1A1A1A] placeholder-[#888] focus:outline-none focus:border-black"
              id="mobile-search-input"
            />
            <Search className="w-3.5 h-3.5 text-[#888] absolute left-2.5 top-2.5" />
          </form>
        </div>

        {/* Tier 2: Streamlined Miller's 5-Pillar Navigation Bar */}
        <nav className="hidden lg:flex items-center justify-between border-t border-[#E5E2D9] py-2 text-[11.5px] uppercase tracking-[0.16em] font-semibold text-[#444] select-none">
          <div className="flex items-center gap-8">
            {/* All Suits Link */}
            <Link
              href="/products"
              onMouseEnter={() => setActiveDropdown(null)}
              className="hover:text-black transition py-1 text-[#1A1A1A] font-bold"
              id="nav-all-suits"
            >
              Shop All
            </Link>

            {/* 5 Core Pillars with Progressive Mega-Menu Disclosure */}
            {NAV_PILLARS.map((pillar) => (
              <div
                key={pillar.id}
                className="relative"
                onMouseEnter={() => setActiveDropdown(pillar.id)}
              >
                <Link
                  href={pillar.href}
                  className={`inline-flex items-center gap-1.5 py-1.5 transition ${
                    activeDropdown === pillar.id ? 'text-[#8B4513] font-bold' : 'hover:text-black'
                  } ${pillar.isSpecial ? 'text-[#8B4513] font-bold' : ''}`}
                >
                  {pillar.isSpecial && <Sparkles className="w-3 h-3 text-[#8B4513]" />}
                  <span>{pillar.label}</span>
                  <ChevronDown
                    className={`w-3 h-3 text-[#888] transition-transform duration-200 ${
                      activeDropdown === pillar.id ? 'rotate-180 text-[#8B4513]' : ''
                    }`}
                  />
                </Link>
              </div>
            ))}
          </div>

          {/* Quick Right Utilities (Fast Dispatch & Styling) */}
          <div className="flex items-center gap-4">
            <Link
              href="/products?fastDispatch=true"
              className="text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-xs font-bold transition border bg-[#FAF5EE] text-[#8B4513] border-[#E8DFC8] hover:bg-[#8B4513] hover:text-white"
              id="nav-fast-dispatch-toggle"
            >
              ⚡ 24h Dispatch
            </Link>

            <Link
              href="/contact"
              className="hover:text-black transition py-1 text-[#666] text-[10.5px] font-medium"
            >
              Concierge
            </Link>
          </div>
        </nav>
      </div>

      {/* Global Interactive Mega-Menu Flyout (Progressive Disclosure) */}
      {activeDropdown && (
        <div
          className="hidden lg:block absolute top-full left-0 right-0 bg-white border-b border-[#E5E2D9] shadow-xl animate-in fade-in slide-in-from-top-2 duration-200 z-50"
          onMouseLeave={() => setActiveDropdown(null)}
        >
          <div className="max-w-7xl mx-auto px-6 py-8">
            {NAV_PILLARS.filter((p) => p.id === activeDropdown).map((pillar) => (
              <div key={pillar.id} className="grid grid-cols-12 gap-8 items-start">
                {/* Mega Menu Links (Columns 1 & 2) */}
                <div className="col-span-8 grid grid-cols-2 gap-8">
                  {pillar.megaMenu.columns.map((col, idx) => (
                    <div key={idx} className="space-y-3">
                      <h4 className="text-[11px] font-serif font-bold tracking-widest text-[#1A1A1A] uppercase border-b border-[#F2F0E9] pb-2">
                        {col.heading}
                      </h4>
                      <ul className="space-y-2">
                        {col.links.map((link, lIdx) => (
                          <li key={lIdx}>
                            {link.href ? (
                              <Link
                                href={link.href}
                                onClick={() => setActiveDropdown(null)}
                                className="text-xs text-[#555] hover:text-[#8B4513] hover:translate-x-1 transition-all inline-flex items-center gap-1.5 py-0.5"
                              >
                                <ChevronRight className="w-3 h-3 text-[#BBB]" />
                                <span>{link.label}</span>
                              </Link>
                            ) : (
                              <button
                                onClick={() => {
                                  if (link.cat) navigateCategory(link.cat);
                                }}
                                className="text-xs text-[#555] hover:text-[#8B4513] hover:translate-x-1 transition-all inline-flex items-center gap-1.5 py-0.5 text-left"
                              >
                                <ChevronRight className="w-3 h-3 text-[#BBB]" />
                                <span>{link.label}</span>
                              </button>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Featured Lookbook Highlight Card (Column 3) */}
                {pillar.megaMenu.featuredProduct && (
                  <div className="col-span-4 bg-[#FAF9F6] p-4 rounded-xs border border-[#E5E2D9] flex gap-4 items-center group">
                    <div className="relative w-24 aspect-3/4 rounded-xs overflow-hidden shrink-0 border border-[#E5E2D9] bg-[#EBE9E1]">
                      <Image
                        src={sanitizeProductImage(pillar.megaMenu.featuredProduct.image)}
                        alt={pillar.megaMenu.featuredProduct.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="100px"
                      />
                    </div>
                    <div className="space-y-1.5 text-xs">
                      <span className="text-[9px] uppercase tracking-widest font-bold text-[#8B4513] bg-[#F2F0E9] px-2 py-0.5 rounded-xs">
                        Featured Selection
                      </span>
                      <h5 className="font-serif font-bold text-sm text-[#1A1A1A] leading-tight line-clamp-2">
                        {pillar.megaMenu.featuredProduct.title}
                      </h5>
                      <p className="text-[11px] text-[#777]">
                        {pillar.megaMenu.featuredProduct.subtitle}
                      </p>
                      {pillar.megaMenu.featuredProduct.price && (
                        <div className="font-bold text-[#1A1A1A] pt-1">
                          {formatPrice(pillar.megaMenu.featuredProduct.price)}
                        </div>
                      )}
                      <Link
                        href={pillar.megaMenu.featuredProduct.href || `/products?category=${encodeURIComponent(pillar.megaMenu.featuredProduct.category || 'All')}`}
                        onClick={() => setActiveDropdown(null)}
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-[#8B4513] hover:underline pt-1"
                      >
                        <span>Explore Collection</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mobile Drawer Menu (Hierarchical Progressive Disclosure) */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex">
          <div className="w-4/5 max-w-sm bg-[#FAF9F6] h-full overflow-y-auto p-5 shadow-2xl flex flex-col justify-between border-r border-[#E5E2D9] animate-in slide-in-from-left duration-300">
            <div className="space-y-5">
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

              {/* Quick Actions Bar */}
              <div className="grid grid-cols-2 gap-2 text-center text-xs">
                <Link
                  href="/products"
                  onClick={() => setMobileMenuOpen(false)}
                  className="bg-black text-white py-2 rounded-xs font-bold uppercase tracking-wider text-[10px]"
                >
                  Shop All Suits
                </Link>
                <Link
                  href="/track-order"
                  onClick={() => setMobileMenuOpen(false)}
                  className="bg-[#F2F0E9] text-[#1A1A1A] py-2 rounded-xs font-bold uppercase tracking-wider text-[10px] border border-[#E5E2D9]"
                >
                  Track Order
                </Link>
              </div>

              {/* Accordion Categories */}
              <div className="space-y-2 text-xs">
                {NAV_PILLARS.map((pillar) => (
                  <div key={pillar.id} className="border border-[#E5E2D9] rounded-xs bg-white overflow-hidden">
                    <button
                      onClick={() => setMobileAccordion(mobileAccordion === pillar.id ? null : pillar.id)}
                      className="w-full p-3 flex items-center justify-between font-bold text-[#1A1A1A] uppercase tracking-wider text-[11px] text-left hover:bg-[#FAF9F6]"
                    >
                      <span className="flex items-center gap-1.5">
                        {pillar.isSpecial && <Sparkles className="w-3.5 h-3.5 text-[#8B4513]" />}
                        <span>{pillar.label}</span>
                      </span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          mobileAccordion === pillar.id ? 'rotate-180 text-[#8B4513]' : ''
                        }`}
                      />
                    </button>

                    {mobileAccordion === pillar.id && (
                      <div className="p-3 bg-[#FAF9F6] border-t border-[#E5E2D9] space-y-2">
                        {pillar.megaMenu.columns.flatMap((col: MegaMenuColumn) => col.links).map((link: MegaMenuLink, idx: number) => (
                          <div key={idx}>
                            {link.href ? (
                              <Link
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="block py-1 text-xs text-[#555] hover:text-[#8B4513]"
                              >
                                • {link.label}
                              </Link>
                            ) : (
                              <button
                                onClick={() => {
                                  if (link.cat) navigateCategory(link.cat);
                                }}
                                className="block py-1 text-xs text-[#555] hover:text-[#8B4513] text-left w-full"
                              >
                                • {link.label}
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Auxiliary Quick Links */}
              <div className="space-y-1 pt-2 border-t border-[#E5E2D9] text-xs">
                <Link
                  href="/size-guide"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between py-2 px-3 rounded-xs hover:bg-[#F2F0E9] text-[#444]"
                >
                  <span className="flex items-center gap-2">
                    <Scissors className="w-4 h-4 text-[#8B4513]" />
                    <span>Size Guide & Stitching</span>
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#AAA]" />
                </Link>

                <Link
                  href="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between py-2 px-3 rounded-xs hover:bg-[#F2F0E9] text-[#444]"
                >
                  <span className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#8B4513]" />
                    <span>Brand & Authenticity</span>
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#AAA]" />
                </Link>

                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between py-2 px-3 rounded-xs hover:bg-[#F2F0E9] text-[#444]"
                >
                  <span className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#8B4513]" />
                    <span>Concierge & Styling</span>
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#AAA]" />
                </Link>
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="pt-4 border-t border-[#E5E2D9] text-[10px] text-[#777] space-y-2">
              <div className="flex items-center gap-1.5 text-[#8B4513] font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>100% Original Pakistani Suits • Pan-India Delivery</span>
              </div>
              <p>© 2026 UNSTITCHED LUXE. All Rights Reserved.</p>
            </div>
          </div>
          <div className="flex-1" onClick={() => setMobileMenuOpen(false)} />
        </div>
      )}
    </header>
  );
}
