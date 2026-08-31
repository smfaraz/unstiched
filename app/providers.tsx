'use client';

import React from 'react';
import { EcommerceProvider, useEcommerce } from '@/context/EcommerceContext';
import AnnouncementBar from '@/components/AnnouncementBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Modals & Drawers
import ProductDetailModal from '@/components/ProductDetailModal';
import CartDrawer from '@/components/CartDrawer';
import CheckoutModal from '@/components/CheckoutModal';
import WishlistModal from '@/components/WishlistModal';
import OrderTrackingModal from '@/components/OrderTrackingModal';
import SizeGuideModal from '@/components/SizeGuideModal';
import AdminProductManagerModal from '@/components/AdminProductManagerModal';
import LiveSocialProof from '@/components/LiveSocialProof';

// Floating Quick Actions
import { MessageCircle, Package, Scissors, ShoppingBag, CheckCircle, Info, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

function ToastNotification() {
  const { toast } = useEcommerce();

  if (!toast) return null;

  return (
    <div className="fixed bottom-20 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none animate-in fade-in slide-in-from-bottom-3 duration-300">
      <div className="bg-[#1A1A1A] text-white px-4 py-3 rounded-xs shadow-2xl border border-[#333] flex items-center gap-3 max-w-md">
        {toast.type === 'success' && <CheckCircle className="w-4 h-4 text-[#22C55E] shrink-0" />}
        {toast.type === 'info' && <Info className="w-4 h-4 text-[#8B4513] shrink-0" />}
        {toast.type === 'error' && <AlertTriangle className="w-4 h-4 text-[#EF4444] shrink-0" />}
        <div>
          <div className="text-xs font-serif font-bold">{toast.title}</div>
          <div className="text-[11px] text-[#CCC]">{toast.message}</div>
        </div>
      </div>
    </div>
  );
}

function FloatingCustomerControls() {
  const { cartCount, openCart, openOrderTracking, openSizeGuide } = useEcommerce();

  return (
    <>
      {/* WhatsApp Floating Chat Button */}
      <a
        href="https://wa.me/919820089123?text=Hi%20Unstitched%20Luxe,%20I%20need%20help%20with%20Pakistani%20suit%20orders%20and%20sizing"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-20 md:bottom-6 right-5 z-30 bg-[#22C55E] hover:bg-[#16A34A] text-white p-3.5 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center group"
        aria-label="Chat with Stylist on WhatsApp"
        id="floating-whatsapp-btn"
      >
        <MessageCircle className="w-5 h-5 fill-white text-[#22C55E]" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 text-xs font-bold pl-0 group-hover:pl-2">
          Chat with Stylist
        </span>
      </a>

      {/* Floating Bottom Quick Bar for Mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-[#E5E2D9] px-4 py-2 flex items-center justify-around shadow-2xl">
        <Link
          href="/products"
          className="flex flex-col items-center gap-0.5 text-[#555] hover:text-black transition text-[9px] font-bold uppercase tracking-wider"
        >
          <Scissors className="w-4 h-4 text-[#8B4513]" />
          <span>Shop All</span>
        </Link>

        <Link
          href="/track-order"
          className="flex flex-col items-center gap-0.5 text-[#555] hover:text-black transition text-[9px] font-bold uppercase tracking-wider"
        >
          <Package className="w-4 h-4 text-[#8B4513]" />
          <span>Track</span>
        </Link>

        <Link
          href="/cart"
          className="flex flex-col items-center gap-0.5 text-[#1A1A1A] transition text-[9px] font-bold uppercase tracking-wider relative"
        >
          <div className="relative">
            <ShoppingBag className="w-4 h-4 text-black" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-black text-white text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </div>
          <span>Bag ({cartCount})</span>
        </Link>
      </div>
    </>
  );
}

function GlobalStoreShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#FAF9F6] text-[#1A1A1A]">
      <AnnouncementBar />
      <Navbar />
      
      <main className="flex-1">
        {children}
      </main>

      <Footer />
      <FloatingCustomerControls />
      <ToastNotification />
      <LiveSocialProof />

      {/* Interactive Overlays / Modals */}
      <ProductDetailModal />
      <CartDrawer />
      <CheckoutModal />
      <WishlistModal />
      <OrderTrackingModal />
      <SizeGuideModal />
      <AdminProductManagerModal />
    </div>
  );
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <EcommerceProvider>
      <GlobalStoreShell>
        {children}
      </GlobalStoreShell>
    </EcommerceProvider>
  );
}
