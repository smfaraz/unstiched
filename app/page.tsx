'use client';

import React, { useState, useEffect } from 'react';
import HeroBanner from '@/components/HeroBanner';
import CategoryPills from '@/components/CategoryPills';
import ProductCard from '@/components/ProductCard';
import { useEcommerce } from '@/context/EcommerceContext';
import Link from 'next/link';
import Image from 'next/image';
import {
  Sparkles,
  Scissors,
  Truck,
  ShieldCheck,
  ArrowRight,
  Star,
  CheckCircle2,
  Package,
  Layers,
  HeartHandshake,
  Clock,
  Tag,
  MapPin,
  HelpCircle,
  Eye,
  Gift,
  Award,
  Zap,
} from 'lucide-react';

export default function HomePage() {
  const { products, openSizeGuide, formatPrice, checkPincodeDelivery, addToCart } = useEcommerce();

  // Curated tab state
  const [activeTab, setActiveTab] = useState<'trending' | 'lawn2026' | 'festive' | 'curves' | 'readyToWear' | 'under1999'>('trending');

  // Flash Sale Live Countdown Timer
  const [timeLeft, setTimeLeft] = useState({ hours: 9, minutes: 42, seconds: 18 });
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Homepage Pincode Checker
  const [homePincode, setHomePincode] = useState('');
  const [homePincodeResult, setHomePincodeResult] = useState<ReturnType<typeof checkPincodeDelivery> | null>(null);

  const handleCheckHomePincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (homePincode.trim().length === 6) {
      setHomePincodeResult(checkPincodeDelivery(homePincode.trim()));
    }
  };

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.includes('@')) {
      setNewsletterSubscribed(true);
    }
  };

  // Curated filter sets
  const getTabProducts = () => {
    switch (activeTab) {
      case 'trending':
        return products.filter((p) => p.isBestseller || p.rating >= 4.8).slice(0, 8);
      case 'swissVoile':
        return products.filter((p) => p.category === 'Swiss Voile' || p.fabric === 'Swiss Voile').slice(0, 8);
      case 'schiffli':
        return products.filter((p) => p.category === 'Schiffli Cutwork' || p.craftWork === 'Schiffli Cutwork').slice(0, 8);
      case 'chiffon':
        return products.filter((p) => p.category === 'Chiffon & Organza' || p.fabric === 'Chiffon' || p.fabric === 'Pure Organza').slice(0, 8);
      case 'curves':
        return products.filter((p) => p.category === 'Curves (XL-6XL)').slice(0, 8);
      case 'cottonSatin':
        return products.filter((p) => p.category === 'Cotton Satin' || p.fabric === 'Cotton Satin').slice(0, 8);
      case 'under1999':
        return products.filter((p) => p.price <= 2499 || p.category === 'Under ₹1999').slice(0, 8);
      default:
        return products.slice(0, 8);
    }
  };

  const fabrics = [
    {
      name: 'Pure Swiss Voile Lawn',
      origin: '80s & 100s Count Combed Cotton',
      tagline: 'Featherlight, breathable weave for peak summer',
      image: '/images/products/pink_lawn_suit.jpg',
      category: 'Unstitched Elegance',
    },
    {
      name: 'Schiffli & Chikankari Cutwork',
      origin: 'Laser-Cut Embroidered Borders',
      tagline: 'Delicate open-work floral cutouts with resham',
      image: '/images/products/mint_chikankari_suit.jpg',
      category: 'Festive Glam',
    },
    {
      name: 'Pure Chiffon & Silk Dupattas',
      origin: 'Bamberg Silk & Flowing Georgette',
      tagline: 'Lustrous, fluid drape that floats effortlessly',
      image: '/images/products/lavender_chiffon_suit.jpg',
      category: 'The Modern Edit',
    },
    {
      name: 'Festive Jacquard & Zari Tilla',
      origin: 'Woven Metallic Gold Jaal & Organza',
      tagline: 'Rich heirloom textures for weddings and Eid',
      image: '/images/products/emerald_festive_suit.jpg',
      category: 'Formal Wear',
    },
  ];

  const featuredFlashProduct = products[0];

  return (
    <div className="space-y-16 pb-20">
      {/* 1. Flagship Hero Banner */}
      <HeroBanner />

      {/* 2. Quick Category Exploration Pills */}
      <CategoryPills />

      {/* 3. Limited-Time Flash Deal / Daily Drop Bar */}
      {featuredFlashProduct && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="bg-[#1A1A1A] text-white rounded-xs p-6 sm:p-8 border border-[#333] shadow-md relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#8B4513]/20 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 bg-[#8B4513] text-white px-3 py-1 rounded-xs text-[10px] font-bold uppercase tracking-widest">
                  <Zap className="w-3.5 h-3.5 fill-white" />
                  <span>Flash Deal of the Day • Limited Stock</span>
                </div>

                <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white leading-tight">
                  {featuredFlashProduct.title}
                </h2>

                <p className="text-xs sm:text-sm text-[#CCC] line-clamp-2 max-w-xl leading-relaxed">
                  {featuredFlashProduct.description}
                </p>

                {/* Countdown Timer */}
                <div className="flex items-center gap-3 pt-1">
                  <span className="text-xs font-bold uppercase text-[#C5BDB0] tracking-wider flex items-center gap-1">
                    <Clock className="w-4 h-4 text-[#8B4513]" />
                    <span>Offer Ends In:</span>
                  </span>
                  <div className="flex gap-1.5 font-mono font-bold text-sm">
                    <span className="bg-white/10 px-2.5 py-1 rounded-xs border border-white/20">
                      {String(timeLeft.hours).padStart(2, '0')}h
                    </span>
                    <span className="self-center">:</span>
                    <span className="bg-white/10 px-2.5 py-1 rounded-xs border border-white/20">
                      {String(timeLeft.minutes).padStart(2, '0')}m
                    </span>
                    <span className="self-center">:</span>
                    <span className="bg-[#8B4513] text-white px-2.5 py-1 rounded-xs">
                      {String(timeLeft.seconds).padStart(2, '0')}s
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <div className="space-y-0.5">
                    <div className="text-2xl font-serif font-bold text-white">
                      {formatPrice(featuredFlashProduct.price)}
                    </div>
                    <div className="text-xs text-[#888] line-through">
                      {formatPrice(featuredFlashProduct.originalPrice)}
                    </div>
                  </div>

                  <Link
                    href={`/products/${featuredFlashProduct.id}`}
                    className="bg-[#8B4513] hover:bg-[#72380F] text-white text-xs font-bold uppercase tracking-widest px-8 py-3.5 rounded-xs transition shadow-xs flex items-center gap-2"
                  >
                    <span>Claim Deal & Select Sizing</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Product Visual */}
              <div className="lg:col-span-5 flex justify-center">
                <Link
                  href={`/products/${featuredFlashProduct.id}`}
                  className="relative w-64 sm:w-72 aspect-3/4 rounded-xs overflow-hidden border border-[#444] shadow-2xl group"
                >
                  <Image
                    src={featuredFlashProduct.images[0]}
                    alt={featuredFlashProduct.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="300px"
                  />
                  <div className="absolute top-3 left-3 bg-[#8B4513] text-white text-[10px] font-bold uppercase px-2.5 py-1 rounded-xs">
                    {featuredFlashProduct.discountPercent}% OFF
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4. Pakistani Fabrics & Artisan Weaves Gallery */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 border-b border-[#E5E2D9] pb-4">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8B4513] mb-1">
              Textile Heritage & Weaves
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1A1A1A]">
              Shop by Pakistani Fabric & Craft
            </h2>
          </div>
          <Link
            href="/products"
            className="text-xs font-bold uppercase tracking-wider text-black hover:text-[#8B4513] flex items-center gap-1 group transition"
          >
            <span>Browse All Fabrics</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {fabrics.map((fabric) => (
            <Link
              key={fabric.name}
              href={`/products?category=${encodeURIComponent(fabric.category)}`}
              className="group relative bg-white border border-[#E5E2D9] rounded-xs overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col"
            >
              <div className="relative aspect-4/5 w-full bg-[#EBE9E1] overflow-hidden">
                <Image
                  src={fabric.image}
                  alt={fabric.name}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4 text-white">
                  <span className="text-[9px] uppercase tracking-widest text-[#E5E2D9] font-medium">
                    {fabric.origin}
                  </span>
                  <h3 className="text-xl font-serif font-bold tracking-tight">
                    {fabric.name}
                  </h3>
                  <p className="text-[11px] text-[#C5BDB0] line-clamp-1 mt-0.5">
                    {fabric.tagline}
                  </p>
                </div>
              </div>
              <div className="p-3 bg-white text-center border-t border-[#F2F0E9]">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#8B4513] group-hover:underline">
                  Shop {fabric.category} Suits →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. Curated Multi-Tab Fabric Catalog Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E5E2D9] pb-4">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8B4513] mb-1">
              Pure Pakistani Weaves
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1A1A1A]">
              Explore Fabric Edits & Masterpieces
            </h2>
          </div>
          <Link
            href="/products"
            className="text-xs font-bold uppercase tracking-wider text-black hover:text-[#8B4513] flex items-center gap-1 group transition"
          >
            <span>Browse Full Catalog</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'trending', label: '★ All Trending' },
            { id: 'swissVoile', label: 'Pure Swiss Lawn' },
            { id: 'schiffli', label: 'Schiffli Cutwork' },
            { id: 'chiffon', label: 'Chiffon & Organza' },
            { id: 'curves', label: 'Curves Edition (XL - 6XL)' },
            { id: 'cottonSatin', label: 'Cotton Satin' },
            { id: 'under1999', label: 'Under ₹1999 Edit' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xs text-xs font-bold uppercase tracking-wider transition ${
                activeTab === tab.id
                  ? 'bg-black text-white shadow-xs'
                  : 'bg-white border border-[#E5E2D9] text-[#666] hover:text-black'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dynamic Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 animate-fadeIn">
          {getTabProducts().map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 6. Spotlight: Curves & Plus Size (XL to 6XL) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-[#FAF5EE] border border-[#E8DFC8] rounded-xs p-6 sm:p-10 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-1.5 bg-[#8B4513] text-white px-3 py-1 rounded-xs text-[10px] font-bold tracking-widest uppercase shadow-xs">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Inclusive Luxury Sizing</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#1A1A1A] leading-tight">
                Curves Edition: Pakistani Suits from XL to 6XL
              </h2>
              <p className="text-sm text-[#555] leading-relaxed">
                Why should standard sizing hold you back from authentic Pakistani lawn elegance? Pehnava Lawns provides extended cuts with custom bust tailoring (42&quot; to 56&quot;), comfortable armhole deep-facings, and extra fabric panels tailored precisely to your silhouette.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  href="/collections/curves-plus-size"
                  className="bg-black hover:bg-[#2A2A2A] text-white text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-xs shadow-xs transition"
                >
                  Shop Curves Collection
                </Link>
                <Link
                  href="/size-guide"
                  className="bg-white border border-[#E8DFC8] hover:bg-[#FAF9F6] text-[#8B4513] text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-xs transition"
                >
                  View Curves Size Chart
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-3 gap-3">
              <div className="bg-white p-4 rounded-xs border border-[#E8DFC8] text-center space-y-1">
                <div className="text-xl sm:text-2xl font-serif font-bold text-[#8B4513]">56&quot;</div>
                <div className="text-[11px] font-bold text-[#1A1A1A]">Max Bust Size</div>
                <div className="text-[10px] text-[#777]">Tailored to order</div>
              </div>
              <div className="bg-white p-4 rounded-xs border border-[#E8DFC8] text-center space-y-1">
                <div className="text-xl sm:text-2xl font-serif font-bold text-[#8B4513]">3.5m</div>
                <div className="text-[11px] font-bold text-[#1A1A1A]">Extra Fabric</div>
                <div className="text-[10px] text-[#777]">No short cuts</div>
              </div>
              <div className="bg-white p-4 rounded-xs border border-[#E8DFC8] text-center space-y-1">
                <div className="text-xl sm:text-2xl font-serif font-bold text-[#8B4513]">100%</div>
                <div className="text-[11px] font-bold text-[#1A1A1A]">Pure Cotton</div>
                <div className="text-[10px] text-[#777]">Lining included</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. The Bespoke Tailoring & Stitching Feature */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-white border border-[#E5E2D9] rounded-xs p-6 sm:p-10 shadow-xs">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-8">
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8B4513]">
              Boutique Atelier Craftsmanship
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1A1A1A]">
              Choose Your Perfect Stitching Finish
            </h2>
            <p className="text-xs sm:text-sm text-[#666]">
              Every Pakistani suit in our catalog can be ordered as raw unstitched fabric, standard ready-to-wear, or bespoke made-to-measure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-[#FAF9F6] border border-[#E5E2D9] rounded-xs space-y-3">
              <div className="w-10 h-10 rounded-full bg-white border border-[#E5E2D9] flex items-center justify-center text-[#8B4513] font-bold">
                1
              </div>
              <h3 className="font-serif font-bold text-base text-black">3-Piece Unstitched Fabric</h3>
              <p className="text-xs text-[#666] leading-relaxed">
                Includes full 3.25m printed/embroidered shirt fabric, 2.5m dupatta (chiffon/silk/organza), 2.5m cambric trouser, and all organza neck/sleeve embroidery patches.
              </p>
              <div className="text-xs font-bold text-[#2E7D32]">Included at Base Price • 24h Fast Dispatch</div>
            </div>

            <div className="p-6 bg-[#FAF9F6] border border-[#E5E2D9] rounded-xs space-y-3">
              <div className="w-10 h-10 rounded-full bg-white border border-[#E5E2D9] flex items-center justify-center text-[#8B4513] font-bold">
                2
              </div>
              <h3 className="font-serif font-bold text-base text-black">Standard Stitched Pret</h3>
              <p className="text-xs text-[#666] leading-relaxed">
                Expertly stitched according to standard Indian sizes (XS to XXL) with pure cotton lining, finished lace borders, and matching straight cigarette pants.
              </p>
              <div className="text-xs font-bold text-[#8B4513]">+₹1,199 Tailoring Fee • Dispatched in 5 Days</div>
            </div>

            <div className="p-6 bg-[#FAF5EE] border border-[#E8DFC8] rounded-xs space-y-3">
              <div className="w-10 h-10 rounded-full bg-white border border-[#E8DFC8] flex items-center justify-center text-[#8B4513] font-bold">
                3
              </div>
              <h3 className="font-serif font-bold text-base text-black">Bespoke Made-to-Measure</h3>
              <p className="text-xs text-[#666] leading-relaxed">
                Tailored precisely to your custom bust, waist, hip, kameez length, neckline style (V-Neck / Boat Neck), and trouser cut (Farshi Salwar / Gharara / Palazzo).
              </p>
              <div className="text-xs font-bold text-[#8B4513]">+₹1,499 Master Fee • Tailor Phone Verification</div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Live Pincode Delivery Estimator Widget */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-[#FAF5EE] border border-[#E8DFC8] rounded-xs p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-[#8B4513]">
              <Truck className="w-3.5 h-3.5" />
              <span>Pan-India BlueDart Air Cargo</span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-black">
              Check Instant Delivery Timeline in Your City
            </h3>
            <p className="text-xs text-[#666]">
              Enter your 6-digit Indian postal code to view live courier transit time and COD availability.
            </p>
          </div>

          <div className="w-full md:w-auto space-y-2">
            <form onSubmit={handleCheckHomePincode} className="flex gap-2">
              <input
                type="text"
                maxLength={6}
                placeholder="Enter 6-digit Pincode (e.g. 110001)"
                value={homePincode}
                onChange={(e) => setHomePincode(e.target.value.replace(/\D/g, ''))}
                className="bg-white border border-[#E8DFC8] rounded-xs px-3.5 py-2.5 text-xs font-semibold text-black focus:outline-none focus:border-black w-60"
              />
              <button
                type="submit"
                className="bg-black text-white px-5 py-2.5 rounded-xs text-xs font-bold uppercase tracking-wider hover:bg-[#2A2A2A] transition"
              >
                Check
              </button>
            </form>

            {homePincodeResult && (
              <div className="text-xs text-[#2E7D32] font-semibold bg-white p-2 rounded-xs border border-[#C8E6C9] animate-fadeIn">
                ✓ {homePincodeResult.city}, {homePincodeResult.state} • Delivery in {homePincodeResult.estimatedDays} via {homePincodeResult.courierPartner} (COD Available)
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 9. Verified Shopper Reviews & Social Proof Wall */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-1">
          <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8B4513]">
            Verified Customer Reviews
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1A1A1A]">
            Loved by 15,000+ Women Across India
          </h2>
          <p className="text-xs text-[#666]">
            Real feedback and styling experiences from verified buyers across Delhi, Mumbai, Bengaluru, and Kolkata.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-[#E5E2D9] p-6 rounded-xs space-y-3 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex text-[#8B4513]">
                {'★'.repeat(5)}
              </div>
              <span className="text-[10px] font-bold text-[#2E7D32] bg-[#E8F5E9] px-2 py-0.5 rounded-xs">
                Verified Purchase
              </span>
            </div>
            <h4 className="font-serif font-bold text-sm text-black">
              &quot;100% Original Maria B. Lawn with Authentic Tags!&quot;
            </h4>
            <p className="text-xs text-[#555] leading-relaxed">
              I was skeptical about ordering Pakistani suits online in India due to so many replica sellers. Pehnava delivered within 48 hours in Mumbai with original brand packaging and barcode seals.
            </p>
            <div className="pt-2 border-t border-[#F2F0E9] flex justify-between items-center text-xs">
              <span className="font-bold text-black">Ayesha Siddiqui</span>
              <span className="text-[#888]">Bandra, Mumbai</span>
            </div>
          </div>

          <div className="bg-white border border-[#E5E2D9] p-6 rounded-xs space-y-3 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex text-[#8B4513]">
                {'★'.repeat(5)}
              </div>
              <span className="text-[10px] font-bold text-[#2E7D32] bg-[#E8F5E9] px-2 py-0.5 rounded-xs">
                Verified Purchase
              </span>
            </div>
            <h4 className="font-serif font-bold text-sm text-black">
              &quot;The Curves 4XL Bespoke Stitching was Flawless&quot;
            </h4>
            <p className="text-xs text-[#555] leading-relaxed">
              Being a 48-inch bust size, finding original Pakistani lawns with enough fabric was impossible. Pehnava tailored my Asim Jofa suit with deep armholes and cotton lining. It fits like a royal dream!
            </p>
            <div className="pt-2 border-t border-[#F2F0E9] flex justify-between items-center text-xs">
              <span className="font-bold text-black">Fatima Khan</span>
              <span className="text-[#888]">South Extension, Delhi</span>
            </div>
          </div>

          <div className="bg-white border border-[#E5E2D9] p-6 rounded-xs space-y-3 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex text-[#8B4513]">
                {'★'.repeat(5)}
              </div>
              <span className="text-[10px] font-bold text-[#2E7D32] bg-[#E8F5E9] px-2 py-0.5 rounded-xs">
                Verified Purchase
              </span>
            </div>
            <h4 className="font-serif font-bold text-sm text-black">
              &quot;Superfast BlueDart Delivery & Smooth COD&quot;
            </h4>
            <p className="text-xs text-[#555] leading-relaxed">
              Ordered 2 unstitched Sana Safinaz suits on Tuesday and received them Thursday morning in Bengaluru. Smooth Cash on Delivery with zero hassles.
            </p>
            <div className="pt-2 border-t border-[#F2F0E9] flex justify-between items-center text-xs">
              <span className="font-bold text-black">Pooja Nambiar</span>
              <span className="text-[#888]">Indiranagar, Bengaluru</span>
            </div>
          </div>
        </div>
      </section>

      {/* 10. UNSTITCHED Authenticity Guarantee & Trust Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-[#FAF9F6] border border-[#E5E2D9] rounded-xs p-8 sm:p-12 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8B4513]">
              Our Promise to India
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1A1A1A]">
              The UNSTITCHED Authenticity Seal
            </h2>
            <p className="text-xs sm:text-sm text-[#666]">
              Direct import contracts with Karachi & Lahore ateliers guarantee zero master replicas and complete customer peace of mind.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div className="bg-white p-6 rounded-xs border border-[#E5E2D9] space-y-2 shadow-xs">
              <ShieldCheck className="w-8 h-8 text-[#8B4513] mx-auto" />
              <h3 className="font-serif font-bold text-sm text-black">100% Brand Originals</h3>
              <p className="text-xs text-[#666]">Original manufacturer barcode serial tags and security holograms.</p>
            </div>

            <div className="bg-white p-6 rounded-xs border border-[#E5E2D9] space-y-2 shadow-xs">
              <Truck className="w-8 h-8 text-[#8B4513] mx-auto" />
              <h3 className="font-serif font-bold text-sm text-black">Pan-India Express</h3>
              <p className="text-xs text-[#666]">BlueDart Air Cargo delivery with live SMS tracking to 25,000+ pincodes.</p>
            </div>

            <div className="bg-white p-6 rounded-xs border border-[#E5E2D9] space-y-2 shadow-xs">
              <Scissors className="w-8 h-8 text-[#8B4513] mx-auto" />
              <h3 className="font-serif font-bold text-sm text-black">Boutique Stitching</h3>
              <p className="text-xs text-[#666]">Master tailor finish with full cotton lining, neckline styles, and custom bust.</p>
            </div>

            <div className="bg-white p-6 rounded-xs border border-[#E5E2D9] space-y-2 shadow-xs">
              <HeartHandshake className="w-8 h-8 text-[#8B4513] mx-auto" />
              <h3 className="font-serif font-bold text-sm text-black">COD & Instant UPI</h3>
              <p className="text-xs text-[#666]">Doorstep Cash on Delivery or instant QR payments with zero hidden fees.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 11. VIP Early Access Club / Newsletter Signup */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-[#1A1A1A] text-white rounded-xs p-8 sm:p-12 text-center space-y-4 relative overflow-hidden">
          <div className="max-w-xl mx-auto space-y-2">
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8B4513]">
              Join Club UNSTITCHED
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white">
              Get ₹500 Off Your First Pakistani Suit Order
            </h2>
            <p className="text-xs sm:text-sm text-[#CCC]">
              Be the first to access new lawn season drops from Maria B. and Sana Safinaz before they sell out.
            </p>
          </div>

          {newsletterSubscribed ? (
            <div className="bg-[#FAF5EE] text-[#8B4513] p-4 rounded-xs max-w-md mx-auto text-xs font-bold animate-fadeIn border border-[#E8DFC8]">
              ✓ Welcome to Club UNSTITCHED! Use coupon code <span className="font-mono text-black font-bold">FIRSTDROP</span> at checkout for ₹500 off.
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto flex gap-2 pt-2">
              <input
                type="email"
                required
                placeholder="Enter your email address..."
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="bg-white/10 border border-white/20 rounded-xs px-4 py-3 text-xs text-white placeholder:text-[#888] flex-1 focus:outline-none focus:border-white"
              />
              <button
                type="submit"
                className="bg-[#8B4513] hover:bg-[#72380F] text-white text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-xs transition shrink-0"
              >
                Claim ₹500 Off
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
