'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Home, Layers, Search, Heart, ShoppingBag, MessageCircle } from 'lucide-react';
import { useEcommerce } from '@/context/EcommerceContext';

export default function MobileBottomNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { wishlist, cartCount } = useEcommerce();

  const navItems = [
    {
      label: 'Home',
      href: '/',
      icon: Home,
      isActive: pathname === '/',
    },
    {
      label: 'Suits',
      href: '/products',
      icon: Layers,
      isActive: pathname === '/products' || pathname.startsWith('/products/'),
    },
    {
      label: 'Search',
      href: '/products?focus=search',
      icon: Search,
      isActive: false,
      onClick: (e: React.MouseEvent) => {
        e.preventDefault();
        const searchEl = document.getElementById('mobile-search-input');
        if (searchEl) {
          searchEl.focus();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          router.push('/products');
        }
      },
    },
    {
      label: 'Wishlist',
      href: '/wishlist',
      icon: Heart,
      badge: wishlist.length > 0 ? wishlist.length : null,
      isActive: pathname === '/wishlist',
    },
    {
      label: 'Bag',
      href: '/cart',
      icon: ShoppingBag,
      badge: cartCount > 0 ? cartCount : null,
      isActive: pathname === '/cart' || pathname === '/checkout',
    },
  ];

  return (
    <>
      {/* 1-Tap WhatsApp Mobile Concierge Floating Button */}
      <a
        href="https://wa.me/919820089123?text=Hi%20Unstitched%20Luxe,%20I%20am%20exploring%20Pakistani%20designer%20suits%20and%20need%20assistance."
        target="_blank"
        rel="noopener noreferrer"
        className="lg:hidden fixed bottom-16 right-3 z-40 bg-[#25D366] hover:bg-[#1EBE5D] text-white p-2.5 rounded-full shadow-2xl flex items-center gap-1.5 transition-transform active:scale-95 border border-white"
        aria-label="WhatsApp Styling Concierge"
        id="mobile-floating-whatsapp-btn"
      >
        <MessageCircle className="w-4 h-4 fill-current" />
        <span className="text-[10px] font-bold pr-0.5">Stylist</span>
      </a>

      {/* Fixed Native Mobile Bottom Tab Bar */}
      <nav
        aria-label="Mobile Bottom Navigation"
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-[#E5E2D9] px-2 py-1.5 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] select-none"
      >
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = item.isActive;

            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={item.onClick}
                className={`flex flex-col items-center justify-center py-1 px-3 relative rounded-xs transition-colors ${
                  active ? 'text-[#8B4513]' : 'text-[#666] hover:text-black'
                }`}
                id={`mobile-bottom-nav-${item.label.toLowerCase()}`}
              >
                <div className="relative">
                  <Icon className={`w-5 h-5 ${active ? 'stroke-[2.5px]' : 'stroke-[1.8px]'}`} />
                  {item.badge !== null && item.badge !== undefined && (
                    <span className="absolute -top-1.5 -right-2.5 bg-[#8B4513] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className={`text-[9.5px] mt-0.5 tracking-wider uppercase ${active ? 'font-bold' : 'font-medium'}`}>
                  {item.label}
                </span>
                {active && (
                  <span className="w-1 h-1 rounded-full bg-[#8B4513] mt-0.5" />
                )}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
