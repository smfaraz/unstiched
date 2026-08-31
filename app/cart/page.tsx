'use client';

import React, { useState } from 'react';
import { useEcommerce } from '@/context/EcommerceContext';
import Image from 'next/image';
import Link from 'next/link';
import {
  ShoppingBag,
  Trash2,
  Scissors,
  ArrowRight,
  ShieldCheck,
  Truck,
  Sparkles,
  Tag,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react';

export default function CartPage() {
  const {
    cart,
    cartCount,
    removeFromCart,
    updateCartQuantity,
    cartSubtotal,
    cartStitchingTotal,
    cartGrandTotal,
    bundleDiscountPercent,
    bundleDiscountAmount,
    nextTierInfo,
    formatPrice,
    openCheckout,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    openSizeGuide,
  } = useEcommerce();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput.trim());
    if (!res.success) {
      setCouponError(res.message || 'Invalid coupon code. Try PEHNAVA10 or FIRSTDROP.');
    } else {
      setCouponError('');
      setCouponInput('');
    }
  };

  const discountAmount = appliedCoupon ? appliedCoupon.discountAmount : 0;
  const finalTotal = cartGrandTotal;

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-[#FAF5EE] flex items-center justify-center mx-auto text-[#8B4513] border border-[#E8DFC8]">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#1A1A1A]">
            Your Shopping Bag is Empty
          </h1>
          <p className="text-xs sm:text-sm text-[#666] max-w-md mx-auto">
            You haven&apos;t added any authentic Pakistani designer lawn or festive suits to your shopping bag yet.
          </p>
        </div>
        <div>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-black hover:bg-[#2A2A2A] text-white font-bold text-xs uppercase tracking-widest px-8 py-3.5 rounded-xs transition shadow-xs"
          >
            <span>Explore 2026 Lawn Collection</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 py-3 sm:py-8 space-y-4 sm:space-y-8">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-1.5 text-[10.5px] sm:text-xs text-[#888] overflow-x-auto no-scrollbar whitespace-nowrap">
        <Link href="/" className="hover:text-black transition">
          Home
        </Link>
        <ChevronRight className="w-3 h-3 text-[#AAA]" />
        <span className="text-black font-semibold">Shopping Bag ({cart.length} items)</span>
      </nav>

      <div className="border-b border-[#E5E2D9] pb-4">
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#1A1A1A]">
          Shopping Bag & Tailoring Review
        </h1>
        <p className="text-xs text-[#666] mt-1">
          Review your authentic Pakistani designer pieces and selected bespoke tailoring options.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          {cart.map((item) => {
            const itemUnitPrice = item.unitPrice;
            const itemTotalPrice = item.totalPrice;

            return (
              <div
                key={item.id}
                className="bg-white border border-[#E5E2D9] rounded-xs p-4 sm:p-5 flex flex-col sm:flex-row gap-4 justify-between shadow-xs"
              >
                <div className="flex gap-4">
                  {/* Thumbnail */}
                  <Link
                    href={`/products/${item.product.id}`}
                    className="relative w-20 sm:w-24 aspect-3/4 bg-[#EBE9E1] rounded-xs overflow-hidden shrink-0 border border-[#E5E2D9]"
                  >
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.title}
                      fill
                      className="object-cover object-top"
                      sizes="100px"
                    />
                  </Link>

                  {/* Info */}
                  <div className="space-y-1.5 flex-1">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-[#8B4513]">
                      {item.product.brand}
                    </div>
                    <Link
                      href={`/products/${item.product.id}`}
                      className="font-serif font-semibold text-xs sm:text-sm text-[#1A1A1A] hover:text-[#8B4513] transition line-clamp-2"
                    >
                      {item.product.title}
                    </Link>

                    {/* Stitching Badge / Details */}
                    <div className="text-xs text-[#555] pt-1">
                      {item.stitchingOption === 'unstitched' && (
                        <span className="inline-flex items-center gap-1 text-[#666] bg-[#FAF9F6] px-2 py-0.5 rounded-xs border border-[#E5E2D9] text-[11px]">
                          <span>3-Piece Unstitched Fabric</span>
                        </span>
                      )}
                      {item.stitchingOption === 'stitched_standard' && (
                        <div className="space-y-0.5">
                          <span className="inline-flex items-center gap-1 text-[#1A1A1A] font-semibold bg-[#FAF5EE] px-2 py-0.5 rounded-xs border border-[#E8DFC8] text-[11px]">
                            <Scissors className="w-3 h-3 text-[#8B4513]" />
                            <span>Standard Stitched (Size: {item.selectedSize || 'M'})</span>
                            <span className="text-[#8B4513] font-bold">
                              (+{formatPrice(item.stitchingPrice)})
                            </span>
                          </span>
                        </div>
                      )}
                      {item.stitchingOption === 'stitched_custom' && (
                        <div className="space-y-1">
                          <span className="inline-flex items-center gap-1 text-[#8B4513] font-bold bg-[#FAF5EE] px-2 py-0.5 rounded-xs border border-[#E8DFC8] text-[11px]">
                            <Sparkles className="w-3 h-3" />
                            <span>Bespoke Tailoring (+{formatPrice(item.stitchingPrice)})</span>
                          </span>
                          {item.customMeasurements && (
                            <div className="text-[10px] text-[#777]">
                              Bust: {item.customMeasurements.bust}&quot; | Waist: {item.customMeasurements.waist}&quot; | Trouser: {item.customMeasurements.trouserStyle}
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Unit Price */}
                    <div className="text-xs text-[#777] pt-1">
                      Unit Price: <span className="font-semibold text-black">{formatPrice(itemUnitPrice)}</span>
                    </div>
                  </div>
                </div>

                {/* Steppers & Line Total */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between gap-3 border-t sm:border-t-0 pt-3 sm:pt-0 border-[#F2F0E9]">
                  <div className="text-sm sm:text-base font-bold text-black">
                    {formatPrice(itemTotalPrice)}
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center border border-[#E5E2D9] rounded-xs bg-white">
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                        className="px-2.5 py-1 text-xs font-bold text-[#666] hover:text-black"
                      >
                        -
                      </button>
                      <span className="px-2.5 py-1 text-xs font-bold text-black min-w-[1.5rem] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                        className="px-2.5 py-1 text-xs font-bold text-[#666] hover:text-black"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-[#999] hover:text-[#DC2626] transition p-1"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          <div className="pt-2 flex justify-between items-center text-xs">
            <Link
              href="/products"
              className="text-black hover:text-[#8B4513] font-bold uppercase tracking-wider underline flex items-center gap-1"
            >
              ← Continue Shopping
            </Link>
            <button
              onClick={openSizeGuide}
              className="text-[#8B4513] hover:underline font-bold"
            >
              Need to adjust stitching sizes? Open Guide
            </button>
          </div>
        </div>

        {/* Right Column: Order Summary & Checkout */}
        <div className="lg:col-span-4 bg-white border border-[#E5E2D9] rounded-xs p-6 space-y-6 shadow-xs sticky top-24">
          <h2 className="font-serif font-bold text-lg text-[#1A1A1A] border-b border-[#E5E2D9] pb-3">
            Order Summary
          </h2>

          {/* Volume Tier Progress Widget */}
          <div className="p-3.5 bg-[#FAF5EE] border border-[#E8DFC8] rounded-xs space-y-2 text-xs">
            <div className="flex items-center justify-between font-bold">
              <span className="text-[#8B4513] uppercase tracking-wider text-[11px] flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                Multi-Buy Savings
              </span>
              <span className="bg-[#8B4513] text-white text-[10px] px-2 py-0.5 rounded-xs font-bold uppercase">
                {bundleDiscountPercent}% OFF Cart
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-[#E5E2D9] h-2 rounded-full overflow-hidden">
              <div
                className="bg-[#8B4513] h-full transition-all duration-500 rounded-full"
                style={{ width: `${Math.min(100, (cartCount / 3) * 100)}%` }}
              />
            </div>

            <p className="text-[11px] text-[#555]">
              {nextTierInfo ? (
                <>Add <strong>{nextTierInfo.needed} more suit</strong> to unlock <strong>{nextTierInfo.nextPercent}% OFF</strong> your entire order!</>
              ) : (
                <span className="text-[#2E7D32] font-bold">🎉 Maximum 20% Multi-Buy Discount Applied!</span>
              )}
            </p>
          </div>

          {/* Coupon Code Section */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-[#777] flex items-center gap-1">
              <Tag className="w-3 h-3 text-[#8B4513]" />
              <span>Extra Promo Code</span>
            </label>

            {appliedCoupon ? (
              <div className="bg-[#FAF5EE] border border-[#E8DFC8] p-2.5 rounded-xs flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-[#8B4513]">Code Applied: {appliedCoupon.code}</div>
                  <div className="text-[10px] text-[#666]">{appliedCoupon.description}</div>
                </div>
                <button
                  onClick={removeCoupon}
                  className="text-xs font-bold text-[#DC2626] hover:underline"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. UNSTITCHED10"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                  className="bg-[#FAF9F6] border border-[#E5E2D9] rounded-xs px-3 py-2 text-xs font-semibold uppercase flex-1 focus:outline-none focus:border-black"
                />
                <button
                  type="submit"
                  className="bg-black text-white px-4 py-2 rounded-xs text-xs font-bold uppercase tracking-wider hover:bg-[#2A2A2A]"
                >
                  Apply
                </button>
              </form>
            )}

            {couponError && <p className="text-[11px] text-[#DC2626] font-medium">{couponError}</p>}
          </div>

          {/* Totals Calculation Breakdown */}
          <div className="space-y-2.5 border-t border-[#E5E2D9] pt-4 text-xs">
            <div className="flex justify-between text-[#666]">
              <span>Suits Subtotal ({cartCount} {cartCount === 1 ? 'item' : 'items'})</span>
              <span className="font-semibold text-black">{formatPrice(cartSubtotal)}</span>
            </div>

            {cartStitchingTotal > 0 && (
              <div className="flex justify-between text-[#666]">
                <span>Boutique Tailoring Add-on</span>
                <span className="font-semibold text-black">+{formatPrice(cartStitchingTotal)}</span>
              </div>
            )}

            {bundleDiscountAmount > 0 && (
              <div className="flex justify-between text-[#2E7D32] font-semibold">
                <span>Multi-Buy Discount ({bundleDiscountPercent}%)</span>
                <span>-{formatPrice(bundleDiscountAmount)}</span>
              </div>
            )}

            {appliedCoupon && (
              <div className="flex justify-between text-[#2E7D32] font-semibold">
                <span>Coupon Discount ({appliedCoupon.code})</span>
                <span>-{formatPrice(appliedCoupon.discountAmount)}</span>
              </div>
            )}

            <div className="flex justify-between text-[#666]">
              <span>Pan-India Express Shipping</span>
              <span className="font-semibold text-[#2E7D32]">FREE (BlueDart Air)</span>
            </div>

            <div className="border-t border-[#E5E2D9] pt-3 flex justify-between items-baseline">
              <div>
                <div className="text-sm font-bold text-black">Total Payable</div>
                <div className="text-[10px] text-[#777]">Inclusive of all taxes and GST</div>
              </div>
              <div className="text-xl sm:text-2xl font-serif font-bold text-black">
                {formatPrice(finalTotal)}
              </div>
            </div>
          </div>

          {/* Checkout CTA */}
          <button
            onClick={openCheckout}
            className="w-full bg-black hover:bg-[#2A2A2A] text-white font-bold text-xs uppercase tracking-widest py-4 rounded-xs shadow-xs transition flex items-center justify-center gap-2"
            id="cart-proceed-checkout-btn"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Trust Highlights */}
          <div className="space-y-2 pt-2 border-t border-[#E5E2D9] text-[11px] text-[#666]">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#8B4513] shrink-0" />
              <span>Pan-India Cash on Delivery (COD) & UPI available</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#8B4513] shrink-0" />
              <span>100% Original Pakistani brand verification tags</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-3.5 h-3.5 text-[#8B4513] shrink-0" />
              <span>Dispatched via BlueDart Air with SMS tracking</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
