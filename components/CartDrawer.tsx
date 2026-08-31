'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useEcommerce } from '@/context/EcommerceContext';
import {
  X,
  Trash2,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Scissors,
  Tag,
  Truck,
  Check,
  Sparkles,
  Percent,
} from 'lucide-react';

export default function CartDrawer() {
  const {
    cart,
    cartCount,
    activeModal,
    closeModals,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    cartSubtotal,
    cartStitchingTotal,
    cartGrandTotal,
    freeShippingRemaining,
    bundleDiscountPercent,
    bundleDiscountAmount,
    nextTierInfo,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    openCheckout,
    formatPrice,
  } = useEcommerce();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  if (activeModal !== 'cart') return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponError('');
      setCouponInput('');
    }
  };

  const handleQuickCoupon = (code: string) => {
    const res = applyCoupon(code);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponError('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end transition-opacity">
      <div className="w-full max-w-md bg-[#FAF9F6] h-full shadow-2xl flex flex-col justify-between border-l border-[#E5E2D9] animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#E5E2D9] flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-black" />
            <h2 className="font-serif font-bold text-base uppercase tracking-tight text-[#1A1A1A]">
              Shopping Bag ({cartCount})
            </h2>
          </div>
          <button
            onClick={closeModals}
            className="p-1 text-[#555] hover:text-black hover:bg-[#F2F0E9] rounded-xs transition"
            aria-label="Close Shopping Bag"
            id="close-cart-drawer-btn"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Multi-Buy Volume Tier & Shipping Bar */}
        <div className="bg-[#FAF5EE] border-b border-[#E8DFC8] p-3 space-y-2 shrink-0 text-xs">
          {/* Multi-buy Tier Meter */}
          <div className="space-y-1">
            <div className="flex items-center justify-between font-bold text-[#8B4513]">
              <span className="flex items-center gap-1 text-[11px]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Multi-Buy: <strong>{bundleDiscountPercent}% OFF</strong> Cart</span>
              </span>
              <span className="text-[10px] uppercase font-bold">
                {cartCount >= 3 ? '🎉 Max Tier' : `${cartCount}/3 Suits`}
              </span>
            </div>
            <div className="w-full bg-[#E5E2D9] rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-[#8B4513] h-full rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, (cartCount / 3) * 100)}%` }}
              />
            </div>
            <p className="text-[10px] text-[#666]">
              {nextTierInfo ? (
                <>Add <strong>{nextTierInfo.needed} more suit</strong> to unlock <strong>{nextTierInfo.nextPercent}% OFF</strong>!</>
              ) : (
                <span className="text-[#2E7D32] font-semibold">Maximum 20% bundle discount applied!</span>
              )}
            </p>
          </div>
        </div>

        {/* Cart Item List */}
        <div className="overflow-y-auto p-4 sm:p-5 flex-1 space-y-3">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
              <div className="w-16 h-16 rounded-xs bg-[#F2F0E9] border border-[#E5E2D9] flex items-center justify-center text-[#8B4513]">
                <ShoppingBag className="w-7 h-7" />
              </div>
              <h3 className="font-serif font-bold text-base text-[#1A1A1A] uppercase tracking-tight">Your shopping bag is empty</h3>
              <p className="text-xs text-[#777] max-w-xs">
                Explore authentic Pakistani designer suits from Maria B., Sana Safinaz, Baroque and more.
              </p>
              <button
                onClick={closeModals}
                className="bg-black text-white text-xs font-bold uppercase tracking-widest px-6 py-2.5 rounded-xs shadow-xs hover:bg-[#222] transition"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="bg-white p-3.5 rounded-xs border border-[#E5E2D9] shadow-xs flex gap-3 relative"
              >
                {/* Image */}
                <div className="relative w-20 h-24 bg-[#EBE9E1] rounded-xs overflow-hidden shrink-0 border border-[#E5E2D9]">
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.title}
                    fill
                    className="object-cover object-top"
                    sizes="80px"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0 flex flex-col justify-between text-xs">
                  <div>
                    <div className="flex items-center justify-between pr-6">
                      <span className="font-bold text-[#8B4513] uppercase tracking-widest text-[9px]">
                        {item.product.brand}
                      </span>
                    </div>
                    <h4 className="font-serif font-semibold text-[#1A1A1A] truncate text-xs mt-0.5">
                      {item.product.title}
                    </h4>

                    {/* Stitching Badge */}
                    <div className="mt-1 flex items-center gap-1.5 flex-wrap">
                      <span className="bg-[#FAF9F6] border border-[#E5E2D9] text-[#555] px-2 py-0.5 rounded-xs text-[10px] font-semibold flex items-center gap-1">
                        <Scissors className="w-2.5 h-2.5 text-[#8B4513]" />
                        {item.stitchingOption === 'unstitched'
                          ? '3-PC Unstitched'
                          : item.stitchingOption === 'stitched_standard'
                          ? `Stitched (${item.selectedSize})`
                          : 'Custom Tailored'}
                      </span>
                      {item.stitchingPrice > 0 && (
                        <span className="text-[10px] text-[#8B4513] font-bold">
                          +{formatPrice(item.stitchingPrice)} tailoring
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Quantity and Price */}
                  <div className="flex items-center justify-between pt-2 border-t border-[#F2F0E9] mt-2">
                    <div className="flex items-center border border-[#E5E2D9] rounded-xs bg-[#FAF9F6] overflow-hidden">
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                        className="px-2 py-0.5 text-xs font-bold text-[#1A1A1A] hover:bg-[#E5E2D9]"
                      >
                        -
                      </button>
                      <span className="px-2 text-xs font-bold text-[#1A1A1A]">{item.quantity}</span>
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-0.5 text-xs font-bold text-[#1A1A1A] hover:bg-[#E5E2D9]"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="font-bold text-black text-sm">
                        {formatPrice(item.totalPrice)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Delete Button */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="absolute top-2.5 right-2.5 text-[#999] hover:text-black p-1 transition"
                  title="Remove suit from cart"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer with Coupon, Subtotals & Checkout CTA */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 bg-white border-t border-[#E5E2D9] shrink-0 space-y-3 text-xs">
            {/* Coupon Section */}
            <div className="space-y-1.5">
              {!appliedCoupon ? (
                <div>
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        placeholder="Coupon code (e.g. PEHNAVA10)"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                        className="w-full bg-[#FAF9F6] border border-[#E5E2D9] rounded-xs pl-8 pr-3 py-2 text-xs font-bold text-[#1A1A1A] uppercase placeholder:normal-case focus:outline-none focus:border-[#8B4513]"
                      />
                      <Tag className="w-3.5 h-3.5 text-[#8B4513] absolute left-2.5 top-2.5" />
                    </div>
                    <button
                      type="submit"
                      className="bg-black hover:bg-[#222] text-white px-4 py-2 rounded-xs font-bold uppercase tracking-wider transition text-[10px]"
                    >
                      Apply
                    </button>
                  </form>
                  {couponError && (
                    <div className="text-[11px] text-[#EF4444] font-medium mt-1">{couponError}</div>
                  )}

                  {/* Quick Coupon Suggestions */}
                  <div className="flex items-center gap-1.5 pt-1.5 overflow-x-auto no-scrollbar">
                    <button
                      type="button"
                      onClick={() => handleQuickCoupon('PEHNAVA10')}
                      className="bg-[#FAF5EE] text-[#8B4513] text-[9px] font-bold px-2 py-0.5 rounded-xs border border-[#E5E2D9] shrink-0 uppercase tracking-wider hover:border-[#8B4513]"
                    >
                      PEHNAVA10 (10% OFF)
                    </button>
                    <button
                      type="button"
                      onClick={() => handleQuickCoupon('FIRSTBUY')}
                      className="bg-[#FAF5EE] text-[#8B4513] text-[9px] font-bold px-2 py-0.5 rounded-xs border border-[#E5E2D9] shrink-0 uppercase tracking-wider hover:border-[#8B4513]"
                    >
                      FIRSTBUY (₹300 OFF)
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-[#FAF5EE] border border-[#E5E2D9] p-2.5 rounded-xs flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[#8B4513] font-bold text-[11px]">
                    <Sparkles className="w-3.5 h-3.5 text-[#8B4513]" />
                    <span>Coupon <strong>{appliedCoupon.code}</strong> applied (-{formatPrice(appliedCoupon.discountAmount)})</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-[10px] text-[#EF4444] font-bold uppercase tracking-wider hover:underline"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 pt-2 border-t border-[#F2F0E9] text-[#555]">
              <div className="flex justify-between">
                <span>Product Subtotal</span>
                <span className="font-semibold text-[#1A1A1A]">{formatPrice(cartSubtotal)}</span>
              </div>

              {cartStitchingTotal > 0 && (
                <div className="flex justify-between">
                  <span>Tailoring & Stitching</span>
                  <span className="font-semibold text-[#8B4513]">+{formatPrice(cartStitchingTotal)}</span>
                </div>
              )}

              {appliedCoupon && (
                <div className="flex justify-between text-[#8B4513]">
                  <span>Discount Savings ({appliedCoupon.code})</span>
                  <span className="font-bold">-{formatPrice(appliedCoupon.discountAmount)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Pan-India Express Shipping</span>
                <span className="font-bold text-[#8B4513]">
                  {freeShippingRemaining === 0 ? 'FREE' : '₹99'}
                </span>
              </div>

              <div className="flex justify-between items-baseline pt-2 border-t border-[#E5E2D9] text-sm">
                <span className="font-bold text-[#1A1A1A]">Estimated Total</span>
                <span className="text-lg font-black text-black">
                  {formatPrice(cartGrandTotal + (freeShippingRemaining === 0 ? 0 : 99))}
                </span>
              </div>
            </div>

            {/* Checkout CTA */}
            <button
              onClick={() => {
                closeModals();
                openCheckout();
              }}
              className="w-full bg-black hover:bg-[#222] text-white font-bold uppercase tracking-widest py-3.5 px-4 rounded-xs shadow-xs flex items-center justify-center gap-2 text-xs transition group"
              id="proceed-to-checkout-btn"
            >
              <span>Proceed to Secure Checkout</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Trust note */}
            <div className="text-[10px] text-center text-[#777] pt-1 flex items-center justify-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#8B4513]" />
              <span>100% Original Pakistani Fabric • UPI / COD / Cards Accepted</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
