'use client';

import React from 'react';
import Image from 'next/image';
import { useEcommerce } from '@/context/EcommerceContext';
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
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#FAF9F6] rounded-xs shadow-2xl overflow-hidden border border-[#E5E2D9] my-8 max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-[#E5E2D9] shrink-0">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-[#8B4513] fill-[#8B4513]" />
            <span className="font-serif text-lg font-bold text-[#1A1A1A] uppercase tracking-tight">
              Saved Pakistani Suits ({savedProducts.length})
            </span>
          </div>
          <button
            onClick={closeModals}
            className="p-1.5 text-[#1A1A1A] hover:bg-[#F2F0E9] rounded-xs transition"
            aria-label="Close wishlist"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List of saved suits */}
        <div className="overflow-y-auto p-4 sm:p-6 flex-1">
          {savedProducts.length === 0 ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-14 h-14 bg-[#FAF5EE] border border-[#E5E2D9] rounded-xs flex items-center justify-center text-[#8B4513] mx-auto">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-base text-[#1A1A1A] uppercase tracking-tight">Your Wishlist is Empty</h3>
              <p className="text-xs text-[#777] max-w-xs mx-auto">
                Tap the heart icon on any Maria B, Sana Safinaz or Asim Jofa lawn suit to save your favorites here.
              </p>
              <button
                onClick={closeModals}
                className="bg-black text-white text-xs font-bold uppercase tracking-widest px-6 py-2.5 rounded-xs shadow-xs hover:bg-[#222] transition"
              >
                Browse Lawn Suits
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {savedProducts.map((p) => (
                <div
                  key={p.id}
                  className="bg-white p-3.5 rounded-xs border border-[#E5E2D9] shadow-xs flex gap-3 relative"
                >
                  <div
                    onClick={() => {
                      closeModals();
                      openProductDetail(p.id);
                    }}
                    className="relative w-20 h-28 bg-[#EBE9E1] rounded-xs overflow-hidden shrink-0 border border-[#E5E2D9] cursor-pointer"
                  >
                    <Image
                      src={p.images[0]}
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
