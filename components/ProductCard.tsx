'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/ecommerce';
import { useEcommerce, sanitizeProductImage } from '@/context/EcommerceContext';
import {
  Heart,
  Eye,
  ShoppingBag,
  Star,
  Truck,
  ShieldCheck,
  Scissors,
  Sparkles,
} from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const {
    formatPrice,
    openProductDetail,
    addToCart,
    toggleWishlist,
    isInWishlist,
  } = useEcommerce();

  const [isHovered, setIsHovered] = useState(false);
  const [quickAddOpen, setQuickAddOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const isSaved = isInWishlist(product.id);

  const primaryImg = sanitizeProductImage(product.images?.[0], 0);
  const secondaryImg = product.images?.[1] ? sanitizeProductImage(product.images[1], 1) : null;

  const handleQuickAdd = (stitching: 'unstitched' | 'stitched_standard') => {
    setIsAdding(true);
    setTimeout(() => {
      addToCart(product, 1, stitching, stitching === 'stitched_standard' ? 'M – 38' : 'Unstitched (Suit Set)');
      setIsAdding(false);
      setJustAdded(true);
      setQuickAddOpen(false);
      setTimeout(() => setJustAdded(false), 2200);
    }, 350);
  };

  return (
    <div
      className="group relative bg-white border border-[#E5E2D9] rounded-xs overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setQuickAddOpen(false);
      }}
      id={`product-card-${product.id}`}
    >
      {/* Product Image Area */}
      <div className="relative aspect-3/4 w-full bg-[#EBE9E1] overflow-hidden cursor-pointer">
        {/* Main Link to PDP */}
        <Link
          href={`/products/${product.id}`}
          className="relative block w-full h-full"
        >
          <Image
            src={primaryImg}
            alt={product.title}
            fill
            className={`object-cover object-top transition-transform duration-700 ease-out ${
              isHovered && secondaryImg ? 'opacity-0' : 'opacity-100 group-hover:scale-103'
            }`}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />

          {/* Secondary Hover Image */}
          {secondaryImg && (
            <Image
              src={secondaryImg}
              alt={`${product.title} preview`}
              fill
              className={`object-cover object-top transition-all duration-700 ease-out absolute inset-0 ${
                isHovered ? 'opacity-100 scale-103' : 'opacity-0'
              }`}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          )}
        </Link>

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10 pointer-events-none">
          {product.isNewArrival && (
            <span className="bg-black text-white text-[9px] font-bold px-2 py-0.5 rounded-xs uppercase tracking-widest shadow-xs">
              New Arrival
            </span>
          )}
          {product.isBestseller && (
            <span className="bg-[#8B4513] text-white text-[9px] font-bold px-2 py-0.5 rounded-xs uppercase tracking-widest shadow-xs">
              ★ Popular
            </span>
          )}
          {product.stockCount <= 5 && (
            <span className="bg-[#FAF5EE] text-[#8B4513] text-[9px] font-bold px-2 py-0.5 rounded-xs uppercase tracking-wider border border-[#E8DFC8] shadow-xs">
              Only {product.stockCount} Left
            </span>
          )}
        </div>

        {/* Top Right: Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-md transition shadow-xs z-20 ${
            isSaved
              ? 'bg-[#FAF5EE] text-[#8B4513] border border-[#E8DFC8]'
              : 'bg-white/90 text-[#444] hover:text-black border border-white/40'
          }`}
          aria-label={isSaved ? 'Remove from wishlist' : 'Save to wishlist'}
          title={isSaved ? 'Saved to Wishlist' : 'Add to Wishlist'}
        >
          <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-[#8B4513]' : ''}`} />
        </button>

        {/* Hover Quick Action Buttons */}
        <div
          className={`absolute inset-x-3 bottom-3 flex items-center gap-2 transition-all duration-300 z-20 ${
            isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'
          }`}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              openProductDetail(product.id);
            }}
            className="flex-1 bg-white hover:bg-[#FAF9F6] text-[#1A1A1A] text-[10px] font-bold uppercase tracking-wider py-2 px-2.5 rounded-xs shadow-md border border-[#E5E2D9] transition flex items-center justify-center gap-1.5"
            title="Quick View Details"
          >
            <Eye className="w-3.5 h-3.5 text-[#8B4513]" />
            <span>Quick View</span>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setQuickAddOpen(!quickAddOpen);
            }}
            disabled={isAdding}
            className={`p-2 rounded-xs shadow-md flex items-center justify-center transition border ${
              justAdded
                ? 'bg-[#2E7D32] text-white border-[#2E7D32]'
                : 'bg-black hover:bg-[#333] text-white border-black'
            }`}
            title="Quick Add to Bag"
          >
            {isAdding ? (
              <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : justAdded ? (
              <span className="text-[10px] font-bold px-1">✓</span>
            ) : (
              <ShoppingBag className="w-3.5 h-3.5 text-white" />
            )}
          </button>
        </div>

        {/* Quick Add Stitching Popover */}
        {quickAddOpen && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute inset-x-2 bottom-2 bg-white p-3 rounded-xs shadow-2xl border border-[#E5E2D9] z-30 animate-in fade-in slide-in-from-bottom-2 duration-200"
          >
            <div className="text-[10px] font-bold uppercase tracking-wider text-[#1A1A1A] mb-2 text-center flex items-center justify-center gap-1">
              <Scissors className="w-3 h-3 text-[#8B4513]" />
              <span>Select Suit Finish:</span>
            </div>
            <div className="flex flex-col gap-1.5">
              <button
                onClick={() => handleQuickAdd('unstitched')}
                disabled={isAdding}
                className="w-full text-left bg-[#FAF9F6] hover:bg-[#F2F0E9] p-2 rounded-xs text-xs font-semibold text-[#1A1A1A] flex items-center justify-between border border-[#E5E2D9] transition active:scale-98"
              >
                <span>Suit Set (Unstitched)</span>
                <span className="text-[10px] text-[#8B4513] font-bold uppercase tracking-wider">Free</span>
              </button>
              <button
                onClick={() => handleQuickAdd('stitched_standard')}
                disabled={isAdding}
                className="w-full text-left bg-[#FAF9F6] hover:bg-[#F2F0E9] p-2 rounded-xs text-xs font-semibold text-[#1A1A1A] flex items-center justify-between border border-[#E5E2D9] transition active:scale-98"
              >
                <span>Ready to Wear (M – 38)</span>
                <span className="text-[10px] text-black font-bold">+₹499</span>
              </button>
              <Link
                href={`/products/${product.id}`}
                className="w-full text-center text-[10px] text-[#8B4513] font-bold uppercase tracking-wider underline pt-1 block"
              >
                Custom Size (S to 4XL / 48) →
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Product Details Area */}
      <div className="p-2.5 sm:p-4 flex flex-col justify-between flex-1 gap-1.5 sm:gap-2">
        <div>
          {/* Brand & Authentic Badge */}
          <div className="flex items-center justify-between text-[10px] sm:text-[11px] mb-1">
            <span className="font-bold text-[#8B4513] uppercase tracking-widest text-[9.5px] sm:text-[10px]">
              {product.brand}
            </span>
            <span className="text-[8.5px] sm:text-[9px] text-[#777] font-medium bg-[#FAF9F6] px-1.5 py-0.2 sm:py-0.5 rounded-xs border border-[#E5E2D9] uppercase tracking-wider">
              {product.fabric}
            </span>
          </div>

          {/* Title */}
          <Link
            href={`/products/${product.id}`}
            className="text-xs sm:text-sm font-serif font-semibold text-[#1A1A1A] line-clamp-1 sm:line-clamp-2 hover:text-[#8B4513] cursor-pointer transition leading-snug block"
            title={product.title}
          >
            {product.title}
          </Link>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-1 sm:mt-1.5">
            <div className="flex items-center bg-[#FAF9F6] text-[#1A1A1A] px-1.5 py-0.2 sm:py-0.5 rounded-xs border border-[#E5E2D9] text-[9.5px] sm:text-[10px] font-bold">
              <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-[#8B4513] text-[#8B4513] mr-1" />
              <span>{product.rating}</span>
            </div>
            <span className="text-[9.5px] sm:text-[10px] text-[#777]">({product.reviewCount})</span>
            <span className="text-[9px] sm:text-[10px] text-[#2E7D32] font-semibold ml-auto hidden sm:flex items-center gap-0.5">
              <ShieldCheck className="w-3 h-3 text-[#2E7D32]" />
              <span>Original</span>
            </span>
          </div>
        </div>

        {/* Price & Mobile Add CTA */}
        <div className="pt-1.5 sm:pt-2 border-t border-[#F2F0E9]">
          <div className="flex items-baseline justify-between gap-1">
            <div className="flex items-baseline gap-1 sm:gap-1.5 flex-wrap">
              <span className="text-xs sm:text-base font-serif font-bold text-black">
                {formatPrice(product.price)}
              </span>
              <span className="text-[10px] sm:text-xs text-[#888] line-through">
                {formatPrice(product.originalPrice)}
              </span>
            </div>
            <span className="text-[9px] sm:text-[10px] text-[#8B4513] font-bold uppercase tracking-wider shrink-0 bg-[#FAF5EE] px-1 py-0.2 rounded-xs border border-[#E8DFC8]">
              {product.discountPercent}% OFF
            </span>
          </div>

          {/* Mobile Direct Button */}
          <Link
            href={`/products/${product.id}`}
            className="sm:hidden mt-2 w-full bg-black active:bg-[#222] text-white py-1.5 rounded-xs text-[10.5px] uppercase tracking-wider font-bold flex items-center justify-center gap-1 shadow-xs"
          >
            <span>View & Style</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
