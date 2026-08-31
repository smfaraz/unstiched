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

import MobileBottomNav from '@/components/MobileBottomNav';
import { CheckCircle, Info, AlertTriangle } from 'lucide-react';

function ToastNotification() {
  const { toast } = useEcommerce();

  if (!toast) return null;

  return (
    <div className="fixed bottom-20 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none animate-in fade-in slide-in-from-bottom-3 duration-300 w-[90vw] max-w-sm">
      <div className="bg-[#1A1A1A] text-white px-4 py-3 rounded-xs shadow-2xl border border-[#333] flex items-center gap-3">
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

function GlobalStoreShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#FAF9F6] text-[#1A1A1A] pb-16 lg:pb-0">
      <AnnouncementBar />
      <Navbar />
      
      <main className="flex-1">
        {children}
      </main>

      <Footer />
      <MobileBottomNav />
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
