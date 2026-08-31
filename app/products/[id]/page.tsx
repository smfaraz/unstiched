'use client';

import React, { useState, useEffect, use } from 'react';
import { useEcommerce } from '@/context/EcommerceContext';
import Image from 'next/image';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import {
  Heart,
  ShoppingBag,
  Truck,
  ShieldCheck,
  Scissors,
  Sparkles,
  ChevronRight,
  Star,
  Check,
  MapPin,
  HelpCircle,
  Clock,
  ArrowRight,
  CheckCircle2,
  Share2,
  Tag,
  Eye,
  Gift,
} from 'lucide-react';
import { CustomMeasurements } from '@/types/ecommerce';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const {
    products,
    formatPrice,
    addToCart,
    toggleWishlist,
    isInWishlist,
    openSizeGuide,
    openCheckout,
    checkPincodeDelivery,
    cartCount,
    bundleDiscountPercent,
    nextTierInfo,
  } = useEcommerce();

  const product = products.find((p) => p.id === resolvedParams.id);

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedStitching, setSelectedStitching] = useState<'unstitched' | 'stitched_standard' | 'stitched_custom'>('unstitched');
  const [selectedSize, setSelectedSize] = useState('M – 38');
  const [customMeasurements, setCustomMeasurements] = useState<CustomMeasurements>({
    bust: 38,
    waist: 32,
    hip: 40,
    kurtaLength: 45,
    sleeveLength: 21,
    trouserStyle: 'Straight Cigarette Pants',
    necklineStyle: 'Embroidered V-Neck',
    liningPreference: 'Full Cotton Lining',
    specialNotes: '',
  });

  const [quantity, setQuantity] = useState(1);
  const [pincodeInput, setPincodeInput] = useState('');
  const [isCheckingPincode, setIsCheckingPincode] = useState(false);
  const [pincodeResult, setPincodeResult] = useState<ReturnType<typeof checkPincodeDelivery> | null>(null);
  
  // Action Loaders & Psychological feedback
  const [isAdding, setIsAdding] = useState(false);
  const [isBuyingNow, setIsBuyingNow] = useState(false);
  const [addedToast, setAddedToast] = useState(false);
  const [liveViewers, setLiveViewers] = useState(18);

  useEffect(() => {
    const timer = setInterval(() => {
      setLiveViewers((prev) => {
        const delta = Math.floor(Math.random() * 5) - 2;
        return Math.max(12, Math.min(27, prev + delta));
      });
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="font-serif text-3xl font-bold text-black">Product Not Found</h1>
        <p className="text-xs text-[#666]">The Pakistani suit you are looking for may be out of stock or retired.</p>
        <Link
          href="/products"
          className="inline-block bg-black text-white text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-xs"
        >
          Return to Catalog
        </Link>
      </div>
    );
  }

  const isSaved = isInWishlist(product.id);

  // Calculate stitching fee
  let stitchingFee = 0;
  if (selectedStitching === 'stitched_standard') stitchingFee = 1199;
  if (selectedStitching === 'stitched_custom') stitchingFee = 1499;

  const unitPrice = product.price + stitchingFee;
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    setIsAdding(true);
    setTimeout(() => {
      addToCart(
        product,
        quantity,
        selectedStitching,
        selectedStitching === 'stitched_standard' ? selectedSize : selectedStitching === 'unstitched' ? 'Unstitched (Suit Set)' : undefined,
        selectedStitching === 'stitched_custom' ? customMeasurements : undefined
      );
      setIsAdding(false);
      setAddedToast(true);
      setTimeout(() => setAddedToast(false), 4500);
    }, 400);
  };

  const handleBuyNow = () => {
    setIsBuyingNow(true);
    setTimeout(() => {
      addToCart(
        product,
        quantity,
        selectedStitching,
        selectedStitching === 'stitched_standard' ? selectedSize : selectedStitching === 'unstitched' ? 'Unstitched (Suit Set)' : undefined,
        selectedStitching === 'stitched_custom' ? customMeasurements : undefined
      );
      setIsBuyingNow(false);
      openCheckout();
    }, 350);
  };

  const handlePincodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincodeInput.trim().length >= 6) {
      setIsCheckingPincode(true);
      setTimeout(() => {
        const res = checkPincodeDelivery(pincodeInput);
        setPincodeResult(res);
        setIsCheckingPincode(false);
      }, 400);
    }
  };

  // Related products from same brand or category
  const relatedProducts = products
    .filter((p) => p.id !== product.id && (p.brand === product.brand || p.category === product.category))
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-12">
      {/* Breadcrumb Navigation */}
      <nav className="flex flex-wrap items-center gap-2 text-xs text-[#777]">
        <Link href="/" className="hover:text-black transition">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/products" className="hover:text-black transition">
          Pakistani Lawn Suits
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link
          href={`/products?category=${encodeURIComponent(product.category)}`}
          className="hover:text-black transition"
        >
          {product.category}
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-black font-semibold truncate max-w-[200px] sm:max-w-none">
          {product.title}
        </span>
      </nav>

      {/* Main PDP Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-7 space-y-4 lg:sticky lg:top-24">
          {/* Main Selected Image */}
          <div className="relative aspect-3/4 w-full bg-[#EBE9E1] rounded-xs overflow-hidden border border-[#E5E2D9] shadow-sm">
            <Image
              src={product.images[selectedImageIndex] || product.images[0]}
              alt={product.title}
              fill
              priority
              className="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 650px"
            />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
              {product.discountPercent > 0 && (
                <span className="bg-[#8B4513] text-white text-[10px] font-bold px-2.5 py-1 rounded-xs uppercase tracking-widest shadow-xs">
                  {product.discountPercent}% OFF
                </span>
              )}
              {product.isFastDispatch24h && (
                <span className="bg-black text-white text-[9px] font-bold px-2.5 py-1 rounded-xs uppercase tracking-widest shadow-xs flex items-center gap-1">
                  <Truck className="w-3 h-3" />
                  <span>24h Ready Dispatch</span>
                </span>
              )}
            </div>

            {/* Wishlist Button */}
            <button
              onClick={() => toggleWishlist(product.id)}
              aria-label="Wishlist"
              className={`absolute top-4 right-4 p-2.5 rounded-xs border shadow-sm transition ${
                isSaved
                  ? 'bg-[#8B4513] text-white border-[#8B4513]'
                  : 'bg-white/90 text-black hover:bg-black hover:text-white border-[#E5E2D9]'
              }`}
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-white' : ''}`} />
            </button>
          </div>

          {/* Thumbnail Strip */}
          {product.images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`relative w-20 sm:w-24 aspect-3/4 rounded-xs overflow-hidden border-2 transition shrink-0 ${
                    selectedImageIndex === idx
                      ? 'border-black shadow-xs'
                      : 'border-[#E5E2D9] opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.title} thumbnail ${idx + 1}`}
                    fill
                    className="object-cover object-top"
                    sizes="100px"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Direct Brand Authenticity Strip */}
          <div className="bg-[#FAF9F6] border border-[#E5E2D9] p-4 rounded-xs flex items-center justify-between text-xs text-[#555]">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#8B4513]" />
              <span>
                <strong>100% Original {product.brand}</strong> with verifiable import QR code seal.
              </span>
            </div>
            <span className="text-[10px] uppercase font-bold text-[#8B4513]">Official Stock</span>
          </div>
        </div>

        {/* Right Column: Product Info & Purchase Form */}
        <div className="lg:col-span-5 space-y-6">
          {/* Header Area */}
          <div className="space-y-2 border-b border-[#E5E2D9] pb-5">
            <div className="flex items-center justify-between">
              <Link
                href={`/products?brand=${encodeURIComponent(product.brand)}`}
                className="text-xs font-bold uppercase tracking-[0.2em] text-[#8B4513] hover:underline"
              >
                {product.brand} Pakistan
              </Link>
              <span className="text-[10px] text-[#777] font-semibold bg-[#FAF9F6] px-2 py-0.5 rounded-xs border border-[#E5E2D9]">
                SKU: {product.sku}
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-[#1A1A1A] leading-tight">
              {product.title}
            </h1>

            {/* Rating and Reviews */}
            <div className="flex items-center gap-2 text-xs">
              <div className="flex items-center bg-[#FAF9F6] text-black px-2 py-0.5 rounded-xs border border-[#E5E2D9] font-bold">
                <Star className="w-3.5 h-3.5 fill-[#8B4513] text-[#8B4513] mr-1" />
                <span>{product.rating}</span>
              </div>
              <span className="text-[#666]">({product.reviewCount} verified Indian customer reviews)</span>
            </div>

            {/* Price Display */}
            <div className="pt-2 flex items-baseline gap-3">
              <span className="text-2xl sm:text-3xl font-serif font-bold text-black">
                {formatPrice(unitPrice)}
              </span>
              <span className="text-sm sm:text-base text-[#888] line-through">
                {formatPrice(product.originalPrice + stitchingFee)}
              </span>
              <span className="bg-[#FAF5EE] text-[#8B4513] border border-[#E8DFC8] text-xs font-bold px-2 py-0.5 rounded-xs uppercase tracking-wider">
                Save {formatPrice(product.originalPrice - product.price)}
              </span>
            </div>

            {/* Multi-Buy Volume Tier Banner */}
            <div className="p-3 bg-[#FAF5EE] border border-[#E8DFC8] rounded-xs space-y-1 text-xs">
              <div className="flex items-center gap-1.5 text-[#8B4513] font-bold uppercase tracking-wider text-[11px]">
                <Sparkles className="w-3.5 h-3.5 text-[#8B4513]" />
                <span>Multi-Buy Special Offer</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center pt-1">
                <div className="p-1.5 bg-white border border-[#E5E2D9] rounded-xs">
                  <div className="font-bold text-black text-[11px]">Buy 1</div>
                  <div className="text-[10px] text-[#8B4513] font-bold">10% OFF</div>
                </div>
                <div className="p-1.5 bg-white border border-[#8B4513]/40 rounded-xs ring-1 ring-[#8B4513]/20">
                  <div className="font-bold text-black text-[11px]">Buy 2</div>
                  <div className="text-[10px] text-[#8B4513] font-bold">15% OFF</div>
                </div>
                <div className="p-1.5 bg-[#8B4513] text-white rounded-xs">
                  <div className="font-bold text-white text-[11px]">Buy 3+</div>
                  <div className="text-[10px] text-white font-bold">20% OFF</div>
                </div>
              </div>
              <p className="text-[10px] text-[#666] pt-0.5">
                Discounts apply automatically across your total cart during checkout!
              </p>
            </div>

            <p className="text-[11px] text-[#777]">
              Inclusive of all Indian import custom duties and GST. Free express shipping on all orders.
            </p>
          </div>

          {/* Stitching Customization Options */}
          <div className="space-y-4 border-b border-[#E5E2D9] pb-6">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-black flex items-center gap-1.5">
                <Scissors className="w-3.5 h-3.5 text-[#8B4513]" />
                <span>Select Stitching / Suit Option</span>
              </label>
              <button
                onClick={openSizeGuide}
                className="text-[11px] text-[#8B4513] hover:underline font-bold"
              >
                Size Guide & Charts →
              </button>
            </div>

            {/* Stitching Radio Cards */}
            <div className="space-y-2">
              {/* Option 1: Unstitched */}
              <label
                className={`flex items-start justify-between p-3 rounded-xs border cursor-pointer transition ${
                  selectedStitching === 'unstitched'
                    ? 'bg-[#FAF9F6] border-black ring-1 ring-black'
                    : 'bg-white border-[#E5E2D9] hover:border-[#888]'
                }`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="stitching"
                    checked={selectedStitching === 'unstitched'}
                    onChange={() => {
                      setSelectedStitching('unstitched');
                      setSelectedSize('Unstitched (Suit Set)');
                    }}
                    className="accent-black mt-1"
                  />
                  <div>
                    <div className="text-xs font-bold text-black">
                      Suit Set (Unstitched)
                    </div>
                    <div className="text-[11px] text-[#666]">
                      Shirt, pure dupatta, cambric trousers & original brand embroidery patches.
                    </div>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#8B4513]">Included</span>
              </label>

              {/* Option 2: Standard Stitched with S-36 to 4XL-48 */}
              <label
                className={`flex items-start justify-between p-3 rounded-xs border cursor-pointer transition ${
                  selectedStitching === 'stitched_standard'
                    ? 'bg-[#FAF9F6] border-black ring-1 ring-black'
                    : 'bg-white border-[#E5E2D9] hover:border-[#888]'
                }`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="stitching"
                    checked={selectedStitching === 'stitched_standard'}
                    onChange={() => {
                      setSelectedStitching('stitched_standard');
                      if (selectedSize === 'Unstitched (Suit Set)' || selectedSize === 'Custom Size – Tailored Fit') {
                        setSelectedSize('M – 38');
                      }
                    }}
                    className="accent-black mt-1"
                  />
                  <div>
                    <div className="text-xs font-bold text-black">
                      Ready to Wear (Stitched: S – 36 to 4XL – 48)
                    </div>
                    <div className="text-[11px] text-[#666]">
                      Master boutique stitched with pure cotton inner lining, hem pipings, and interlocking.
                    </div>
                  </div>
                </div>
                <span className="text-xs font-bold text-black">
                  +{formatPrice(1199)}
                </span>
              </label>

              {/* Size Selector for Standard Stitching */}
              {selectedStitching === 'stitched_standard' && (
                <div className="pl-6 pt-2 pb-1 space-y-2">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#666]">
                    Select Size & Bust Inch:
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    {[
                      { size: 'S – 36', label: 'S (36")' },
                      { size: 'M – 38', label: 'M (38")' },
                      { size: 'L – 40', label: 'L (40")' },
                      { size: 'XL – 42', label: 'XL (42")' },
                      { size: '2XL – 44', label: '2XL (44")' },
                      { size: '3XL – 46', label: '3XL (46")' },
                      { size: '4XL – 48', label: '4XL (48")' },
                    ].map((item) => (
                      <button
                        key={item.size}
                        type="button"
                        onClick={() => setSelectedSize(item.size)}
                        className={`px-3 py-2 rounded-xs text-xs font-bold border transition ${
                          selectedSize === item.size
                            ? 'bg-black text-white border-black'
                            : 'bg-white text-black border-[#E5E2D9] hover:border-black'
                        }`}
                      >
                        {item.size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Option 3: Custom Measurements */}
              <label
                className={`flex items-start justify-between p-3 rounded-xs border cursor-pointer transition ${
                  selectedStitching === 'stitched_custom'
                    ? 'bg-[#FAF9F6] border-black ring-1 ring-black'
                    : 'bg-white border-[#E5E2D9] hover:border-[#888]'
                }`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="stitching"
                    checked={selectedStitching === 'stitched_custom'}
                    onChange={() => {
                      setSelectedStitching('stitched_custom');
                      setSelectedSize('Custom Size – Tailored Fit');
                    }}
                    className="accent-black mt-1"
                  />
                  <div>
                    <div className="text-xs font-bold text-black flex items-center gap-1.5">
                      <span>Custom Size – Tailored Fit</span>
                      <span className="bg-[#8B4513] text-white text-[8px] font-bold px-1.5 py-0.2 rounded-xs uppercase">
                        Bespoke
                      </span>
                    </div>
                    <div className="text-[11px] text-[#666]">
                      Tailored to your exact bust, waist, hip inches, kameez length & neck styling.
                    </div>
                  </div>
                </div>
                <span className="text-xs font-bold text-black">
                  +{formatPrice(1499)}
                </span>
              </label>

              {/* Custom Measurements Form Drawer */}
              {selectedStitching === 'stitched_custom' && (
                <div className="p-4 bg-[#FAF5EE] border border-[#E8DFC8] rounded-xs space-y-3 mt-2 text-xs">
                  <div className="font-bold text-[#1A1A1A] uppercase tracking-wider text-[11px]">
                    Specify Custom Measurements (Inches):
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="text-[10px] text-[#666] block">Bust (32-56&quot;)</label>
                      <input
                        type="number"
                        value={customMeasurements.bust}
                        onChange={(e) =>
                          setCustomMeasurements({ ...customMeasurements, bust: Number(e.target.value) })
                        }
                        className="w-full bg-white border border-[#D5CAA8] rounded-xs px-2 py-1.5 text-xs text-black font-semibold"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-[#666] block">Waist (26-50&quot;)</label>
                      <input
                        type="number"
                        value={customMeasurements.waist}
                        onChange={(e) =>
                          setCustomMeasurements({ ...customMeasurements, waist: Number(e.target.value) })
                        }
                        className="w-full bg-white border border-[#D5CAA8] rounded-xs px-2 py-1.5 text-xs text-black font-semibold"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-[#666] block">Hips (34-60&quot;)</label>
                      <input
                        type="number"
                        value={customMeasurements.hip}
                        onChange={(e) =>
                          setCustomMeasurements({ ...customMeasurements, hip: Number(e.target.value) })
                        }
                        className="w-full bg-white border border-[#D5CAA8] rounded-xs px-2 py-1.5 text-xs text-black font-semibold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] text-[#666] block">Kameez Length</label>
                      <input
                        type="number"
                        value={customMeasurements.kurtaLength}
                        onChange={(e) =>
                          setCustomMeasurements({
                            ...customMeasurements,
                            kurtaLength: Number(e.target.value),
                          })
                        }
                        className="w-full bg-white border border-[#D5CAA8] rounded-xs px-2 py-1.5 text-xs text-black font-semibold"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-[#666] block">Trouser Style</label>
                      <select
                        value={customMeasurements.trouserStyle}
                        onChange={(e) =>
                          setCustomMeasurements({
                            ...customMeasurements,
                            trouserStyle: e.target.value as any,
                          })
                        }
                        className="w-full bg-white border border-[#D5CAA8] rounded-xs px-2 py-1.5 text-xs text-black font-semibold"
                      >
                        <option value="Straight Cigarette Pants">Straight Cigarette Pants</option>
                        <option value="Farshi Salwar">Traditional Farshi Salwar</option>
                        <option value="Flared Gharara">Flared Gharara / Sharara</option>
                        <option value="Culottes / Palazzo">Culottes / Wide Palazzo</option>
                        <option value="Tulip Pants">Tulip Pants</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Real-time Psychological Urgency Banner */}
          <div className="flex items-center justify-between p-3 bg-[#FAF5EE] border border-[#E8DFC8] rounded-xs text-[11px]">
            <div className="flex items-center gap-1.5 text-[#8B4513] font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#8B4513] animate-ping" />
              <span><strong>{liveViewers} people</strong> are viewing this Pakistani suit right now</span>
            </div>
            <span className="text-[#2E7D32] font-bold text-[10px] uppercase tracking-wider">
              ⚡ Only {product.stockCount} Left
            </span>
          </div>

          {/* Quantity & Add to Bag / Buy Now Actions */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              {/* Quantity Selector */}
              <div className="flex items-center border border-[#E5E2D9] rounded-xs bg-white">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-3 text-sm font-bold text-[#666] hover:text-black transition"
                >
                  -
                </button>
                <span className="px-3 py-3 text-xs font-bold text-black min-w-[2rem] text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-3 text-sm font-bold text-[#666] hover:text-black transition"
                >
                  +
                </button>
              </div>

              {/* Add to Bag Button */}
              <button
                onClick={handleAddToCart}
                disabled={isAdding}
                className="flex-1 bg-black hover:bg-[#2A2A2A] text-white font-bold text-xs uppercase tracking-widest py-3.5 px-6 rounded-xs shadow-xs transition flex items-center justify-center gap-2 group active:scale-98"
                id="pdp-add-to-cart-btn"
              >
                {isAdding ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Adding to Bag...</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-white" />
                    <span>Add to Bag • {formatPrice(totalPrice)}</span>
                  </>
                )}
              </button>
            </div>

            {/* Instant Buy Now Button */}
            <button
              onClick={handleBuyNow}
              disabled={isBuyingNow}
              className="w-full bg-[#8B4513] hover:bg-[#73390F] text-white font-bold text-xs uppercase tracking-widest py-3.5 rounded-xs shadow-xs transition flex items-center justify-center gap-2 active:scale-98"
              id="pdp-buy-now-btn"
            >
              {isBuyingNow ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Securing Order Gateway...</span>
                </>
              ) : (
                <>
                  <span>Instant Buy (UPI / Cash on Delivery)</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {/* Celebratory Added to Bag Card with Multi-Buy Status */}
            {addedToast && (
              <div className="p-4 bg-[#1A1A1A] text-white text-xs rounded-xs space-y-3 shadow-2xl border border-[#333] animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-[#22C55E] flex items-center justify-center text-black font-bold text-[10px]">
                      ✓
                    </div>
                    <div>
                      <div className="font-bold text-white text-xs">Suit Added to Shopping Bag!</div>
                      <div className="text-[10px] text-[#AAA]">{selectedStitching === 'unstitched' ? '3-Piece Unstitched Fabric' : `Stitched: ${selectedSize}`}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setAddedToast(false)}
                    className="text-[#888] hover:text-white text-xs"
                  >
                    ✕
                  </button>
                </div>

                <div className="p-2.5 bg-[#262626] rounded-xs border border-[#3A3A3A] flex items-center justify-between text-[11px]">
                  <span className="text-[#F5DEB3] font-semibold flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    Multi-Buy: <strong>{bundleDiscountPercent}% OFF</strong> Active
                  </span>
                  {nextTierInfo && (
                    <span className="text-[10px] text-[#CCC]">
                      Add <strong>{nextTierInfo.needed} more</strong> for <strong>{nextTierInfo.nextPercent}% OFF</strong>
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <Link
                    href="/cart"
                    className="flex-1 bg-[#8B4513] hover:bg-[#A0522D] text-white py-2.5 rounded-xs font-bold text-center uppercase tracking-wider text-[11px] transition"
                  >
                    View Bag & Checkout ({cartCount}) →
                  </Link>
                  <button
                    onClick={() => setAddedToast(false)}
                    className="px-3 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xs font-semibold text-[11px] transition"
                  >
                    Keep Shopping
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Pan-India Pincode Delivery Check */}
          <div className="bg-[#FAF9F6] border border-[#E5E2D9] p-4 rounded-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-black uppercase tracking-wider">
                <Truck className="w-4 h-4 text-[#8B4513]" />
                <span>Pan-India BlueDart Express Check</span>
              </div>
              <span className="text-[10px] text-[#2E7D32] font-bold uppercase">⚡ Same-Day Dispatch</span>
            </div>
            <form onSubmit={handlePincodeSubmit} className="flex gap-2">
              <input
                type="text"
                placeholder="Enter 6-digit Pincode (e.g. 110001, 400050)"
                maxLength={6}
                value={pincodeInput}
                onChange={(e) => setPincodeInput(e.target.value.replace(/\D/g, ''))}
                className="bg-white border border-[#E5E2D9] rounded-xs px-3 py-2 text-xs text-black font-semibold focus:outline-none focus:border-black flex-1"
              />
              <button
                type="submit"
                disabled={isCheckingPincode}
                className="bg-black text-white px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xs hover:bg-[#2A2A2A] transition flex items-center gap-1.5"
              >
                {isCheckingPincode ? (
                  <>
                    <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Verifying...</span>
                  </>
                ) : (
                  <span>Verify</span>
                )}
              </button>
            </form>

            {pincodeResult && (
              <div
                className={`text-xs font-semibold p-2.5 rounded-xs border flex items-center gap-2 ${
                  pincodeResult.isDeliverable
                    ? 'text-[#2E7D32] bg-white border-[#C8E6C9]'
                    : 'text-[#DC2626] bg-white border-[#FCA5A5]'
                }`}
              >
                {pincodeResult.isDeliverable ? (
                  <>
                    <Check className="w-4 h-4 text-[#2E7D32] shrink-0" />
                    <span>
                      Delivery in <strong>{pincodeResult.estimatedDays}</strong> to {pincodeResult.city}, {pincodeResult.state} via {pincodeResult.courierPartner}. {pincodeResult.isCodAvailable ? 'COD Available' : 'Prepaid Only'}.
                    </span>
                  </>
                ) : (
                  <span>Sorry, pincode {pincodeResult.pincode} is currently unserviceable for air express.</span>
                )}
              </div>
            )}
          </div>

          {/* Product Specifications & Details Accordion */}
          <div className="border-t border-[#E5E2D9] pt-6 space-y-4 text-xs">
            <div>
              <h3 className="font-bold text-black uppercase tracking-wider text-[11px] mb-2">
                Fabric & Component Breakdown:
              </h3>
              <p className="text-[#555] leading-relaxed">
                {product.description}
              </p>
              <ul className="mt-2 space-y-1 text-[#666] list-disc list-inside">
                <li><strong>Shirt Front & Back:</strong> {product.pieceDetails.shirt}</li>
                <li><strong>Dupatta:</strong> {product.pieceDetails.dupatta}</li>
                <li><strong>Trouser:</strong> {product.pieceDetails.trouser}</li>
                {product.pieceDetails.embellishments && (
                  <li><strong>Embellishments:</strong> {product.pieceDetails.embellishments}</li>
                )}
              </ul>
            </div>

            <div className="border-t border-[#E5E2D9] pt-4">
              <h3 className="font-bold text-black uppercase tracking-wider text-[11px] mb-2">
                Wash & Care Instructions:
              </h3>
              <ul className="space-y-1 text-[#666] list-disc list-inside">
                {product.careInstructions.map((instruction, idx) => (
                  <li key={idx}>{instruction}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Carousel */}
      {relatedProducts.length > 0 && (
        <section className="border-t border-[#E5E2D9] pt-10 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8B4513] mb-1">
                More from {product.brand}
              </div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#1A1A1A]">
                You May Also Admire
              </h2>
            </div>
            <Link
              href={`/products?brand=${encodeURIComponent(product.brand)}`}
              className="text-xs font-bold uppercase tracking-wider text-black hover:text-[#8B4513] transition"
            >
              View More →
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
