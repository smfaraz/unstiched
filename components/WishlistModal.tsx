'use client';

import React from 'react';
import Image from 'next/image';
import { useEcommerce, sanitizeProductImage } from '@/context/EcommerceContext';
import {
  X,
  Heart,
  ShoppingBag,
  Trash2,
  Star,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

export default function WishlistModal() {
  const {
    wishlist,
    products,
    activeModal,
    closeModals,
    toggleWishlist,
    addToCart,
    openProductDetail,
    formatPrice,
  } = useEcommerce();

  if (activeModal !== 'wishlist') return null;

  const savedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-xs border border-[#E5E2D9] max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#E5E2D9] flex items-center justify-between bg-[#FAF9F6]">
          <div className="flex items-center gap-2.5">
            <Heart className="w-5 h-5 text-[#8B4513] fill-[#8B4513]" />
            <h2 className="font-serif font-bold text-base text-[#1A1A1A]">
              Your Saved Pakistani Suits ({savedProducts.length})
            </h2>
          </div>
          <button
            onClick={closeModals}
            className="p-2 text-[#777] hover:text-black transition rounded-xs hover:bg-[#F2F0E9]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {savedProducts.length === 0 ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#FAF9F6] border border-[#E5E2D9] flex items-center justify-center mx-auto text-[#888]">
                <Heart className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <p className="font-serif font-bold text-base text-[#1A1A1A]">No suits saved yet</p>
                <p className="text-xs text-[#777]">Explore our authentic Pakistani lawn collections and save your favorites.</p>
              </div>
            </div>
          ) : (
            <div className="divide-y divide-[#E5E2D9]">
              {savedProducts.map((p) => (
                <div key={p.id} className="py-4 flex gap-4 items-center">
                  <div
                    onClick={() => {
                      closeModals();
                      openProductDetail(p.id);
                    }}
                    className="relative w-20 h-28 bg-[#EBE9E1] rounded-xs overflow-hidden shrink-0 border border-[#E5E2D9] cursor-pointer"
                  >
                    <Image
                      src={sanitizeProductImage(p.images?.[0])}
                      alt={p.title}
                      fill
                      className="object-cover object-top hover:scale-105 transition"
                      sizes="80px"
                    />
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col justify-between text-xs">
                    <div>
                      <div className="text-[9px] font-bold text-[#8B4513] uppercase tracking-widest">
                        {p.brand}
                      </div>
                      <h4
                        onClick={() => {
                          closeModals();
                          openProductDetail(p.id);
                        }}
                        className="font-serif font-semibold text-[#1A1A1A] truncate cursor-pointer hover:text-[#8B4513] text-xs mt-0.5"
                      >
                        {p.title}
                      </h4>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className="font-bold text-black">{formatPrice(p.price)}</span>
                        <span className="text-[10px] text-[#999] line-through">
                          {formatPrice(p.originalPrice)}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-2 border-t border-[#F2F0E9]">
                      <button
                        onClick={() => {
                          addToCart(p, 1, 'unstitched');
                          toggleWishlist(p.id);
                        }}
                        className="flex-1 bg-black hover:bg-[#222] text-white py-1.5 px-3 rounded-xs font-bold uppercase tracking-wider text-[10px] flex items-center justify-center gap-1.5 shadow-xs transition"
                      >
                        <ShoppingBag className="w-3.5 h-3.5 text-white" />
                        <span>Add to Bag</span>
                      </button>

                      <button
                        onClick={() => toggleWishlist(p.id)}
                        className="p-1.5 text-[#999] hover:text-black rounded-xs transition"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
