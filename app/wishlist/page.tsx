'use client';

import React from 'react';
import { useEcommerce } from '@/context/EcommerceContext';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';
import { Heart, ArrowRight, ChevronRight, ShoppingBag, Share2, Sparkles } from 'lucide-react';

export default function WishlistPage() {
  const { wishlist, products, addToCart } = useEcommerce();

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  const handleMoveAllToBag = () => {
    wishlistProducts.forEach((p) => {
      addToCart(p, 1, 'unstitched');
    });
  };

  const handleShareWishlist = () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      navigator.share({
        title: 'My UNSTITCHED Wishlist',
        text: 'Check out my favorite Pakistani luxury lawn & designer suits on UNSTITCHED!',
        url: window.location.href,
      }).catch(() => {});
    } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      alert('Wishlist link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-[#777]">
          <Link href="/" className="hover:text-black transition">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-black font-semibold">My Saved Suits ({wishlist.length})</span>
        </nav>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E5E2D9] pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-[#8B4513] text-white px-2.5 py-0.5 rounded-xs text-[10px] font-bold tracking-widest uppercase mb-1">
              <Sparkles className="w-3 h-3" />
              <span>Personal Dressing Room</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-serif font-bold text-[#1A1A1A]">
              My Curated Wishlist
            </h1>
            <p className="text-xs text-[#666] mt-0.5">
              Saved Pakistani lawn, luxury formals, and bespoke ensembles for your upcoming occasions.
            </p>
          </div>

          {wishlistProducts.length > 0 && (
            <div className="flex items-center gap-3">
              <button
                onClick={handleShareWishlist}
                className="bg-white border border-[#E5E2D9] hover:bg-[#FAF5EE] text-black text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-xs transition flex items-center gap-1.5"
              >
                <Share2 className="w-3.5 h-3.5 text-[#8B4513]" />
                <span>Share Wishlist</span>
              </button>

              <button
                onClick={handleMoveAllToBag}
                className="bg-black hover:bg-[#2A2A2A] text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-xs transition flex items-center gap-1.5"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Move All to Bag</span>
              </button>
            </div>
          )}
        </div>

        {wishlistProducts.length === 0 ? (
          <div className="max-w-md mx-auto py-16 text-center space-y-6 bg-white border border-[#E5E2D9] rounded-xs p-8 shadow-xs">
            <div className="w-16 h-16 rounded-full bg-[#FAF5EE] text-[#8B4513] border border-[#E8DFC8] flex items-center justify-center mx-auto">
              <Heart className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h2 className="font-serif text-2xl font-bold text-black">Your Wishlist is Empty</h2>
              <p className="text-xs text-[#666]">
                Save your favorite Pakistani designer lawn suits, festive chiffons, and bespoke stitched wear here while browsing.
              </p>
            </div>
            <div>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-black text-white text-xs font-bold uppercase tracking-widest px-8 py-3.5 rounded-xs hover:bg-[#2A2A2A] transition"
              >
                <span>Discover 2026 Lawn Drop</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {wishlistProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
