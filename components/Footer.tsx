'use client';

import React from 'react';
import { useEcommerce } from '@/context/EcommerceContext';
import {
  ShieldCheck,
  Truck,
  Scissors,
  HeartHandshake,
  Phone,
  Mail,
  MapPin,
  Sparkles,
  Layers,
  Lock,
  ArrowRight,
  Package,
  Settings,
} from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  const { setFilters, openSizeGuide, openOrderTracking, openAdmin } = useEcommerce();

  return (
    <footer className="bg-[#111111] text-[#C5BDB0] border-t border-[#262626]">
      {/* Top Newsletter / VIP Lounge Strip */}
      <div className="border-b border-[#222222] py-10 bg-[#161616]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-6 space-y-1 text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 text-[#C49A6C] text-[10px] font-bold uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Join Unstitched Privé Club</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white uppercase tracking-tight">
                Early Access to Pakistani Lawn &apos;26 Drops
              </h3>
              <p className="text-xs text-[#888]">
                Receive instant WhatsApp alerts for pure Swiss lawn and festive Pakistani suit drops.
              </p>
            </div>

            <div className="md:col-span-6">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert('Thank you for subscribing! You will receive VIP launch alerts on WhatsApp.');
                }}
                className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto md:ml-auto"
              >
                <input
                  type="tel"
                  placeholder="Enter 10-digit WhatsApp number (+91)"
                  className="bg-[#0A0A0A] border border-[#333333] rounded-xs px-4 py-3 text-xs text-white placeholder-[#666] focus:outline-none focus:border-[#C49A6C] flex-1"
                />
                <button
                  type="submit"
                  className="bg-white hover:bg-[#E5E2D9] text-black font-bold uppercase tracking-widest text-[10px] px-6 py-3 rounded-xs transition shadow-xs whitespace-nowrap"
                >
                  Join VIP List
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 text-xs">
          {/* Brand & About */}
          <div className="lg:col-span-2 space-y-4">
            <div className="space-y-1">
              <Link href="/" className="font-serif text-2xl font-bold tracking-[0.15em] text-white hover:text-[#C49A6C] transition">
                UNSTITCHED
              </Link>
              <p className="text-[10px] text-[#C49A6C] font-semibold uppercase tracking-widest">
                LUXURY PAKISTANI DESIGNER SUITS • INDIA
              </p>
            </div>

            <p className="text-[#999] leading-relaxed text-xs">
              UNSTITCHED is India’s premier authentic destination for Pakistani designer lawn, chiffon, and luxury festive wear. Every suit is imported directly from official design houses in Lahore and Karachi with verified holographic seals.
            </p>

            {/* Indian Operational details */}
            <div className="space-y-1.5 text-[11px] text-[#C5BDB0]">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#C49A6C]" />
                <span>Central Hub: Okhla Phase III, New Delhi 110020, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#22C55E]" />
                <span>WhatsApp Helpline: +91 98200 89123 (10 AM - 8 PM IST)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#C49A6C]" />
                <span>care@unstitched.in</span>
              </div>
            </div>
          </div>

          {/* Collections */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-widest text-[10px] border-b border-[#262626] pb-2">
              Pakistani Collections
            </h4>
            <ul className="space-y-2 text-[#999]">
              <li>
                <Link
                  href="/products?category=Pure%20Lawn"
                  className="hover:text-white transition text-left block"
                >
                  Pure Lawn 3-Piece Suits
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=Curves%20(XL-6XL)"
                  className="hover:text-white transition text-left font-semibold text-[#E5E2D9] block"
                >
                  Curves & Plus Size (XL - 6XL)
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=Festive%20Formals"
                  className="hover:text-white transition text-left block"
                >
                  Festive & Party Wear
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=Daily%20Cotton%20Lawn"
                  className="hover:text-white transition text-left block"
                >
                  Daily Wear Cambric Lawn
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=Under%20₹1999"
                  className="hover:text-white transition text-left text-[#C49A6C] block"
                >
                  Under ₹1,999 Value Steals
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=Wedding%20Edition"
                  className="hover:text-white transition text-left block"
                >
                  Bridal & Velvet Couture
                </Link>
              </li>
            </ul>
          </div>

          {/* Fabrics & Weaves */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-widest text-[10px] border-b border-[#262626] pb-2">
              Fabrics & Craft
            </h4>
            <ul className="space-y-2 text-[#999]">
              {[
                { name: 'Pure Swiss Voile', cat: 'Swiss Voile' },
                { name: 'Schiffli Cutwork Lawn', cat: 'Schiffli Cutwork' },
                { name: 'Pure Chiffon & Georgette', cat: 'Chiffon & Organza' },
                { name: 'Organza & Tissue', cat: 'Chiffon & Organza' },
                { name: 'Cotton Satin', cat: 'Cotton Satin' },
                { name: 'Silk Lawn & Pure Silk', cat: 'Pure Lawn' },
                { name: 'Micro Velvet & Brocade', cat: 'Wedding Edition' },
              ].map((f) => (
                <li key={f.name}>
                  <Link
                    href={`/products?category=${encodeURIComponent(f.cat)}`}
                    className="hover:text-white transition text-left block"
                  >
                    {f.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service & Tailoring */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-widest text-[10px] border-b border-[#262626] pb-2">
              Care & Info
            </h4>
            <ul className="space-y-2 text-[#999]">
              <li>
                <Link
                  href="/track-order"
                  className="hover:text-white transition text-left flex items-center gap-1 text-[#E5E2D9] font-bold"
                >
                  <Package className="w-3.5 h-3.5 text-[#C49A6C]" />
                  <span>Track BlueDart Shipment</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-white transition text-left block"
                >
                  Authenticity & Heritage Story
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-white transition text-left block"
                >
                  Styling Concierge & Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/size-guide"
                  className="hover:text-white transition text-left block"
                >
                  Stitching & Size Chart Guide
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="hover:text-white transition text-left block"
                >
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping-returns"
                  className="hover:text-white transition text-left block"
                >
                  Pan-India Shipping & 7-Day Returns
                </Link>
              </li>
              <li className="pt-2 border-t border-[#262626]">
                <Link
                  href="/admin"
                  className="flex items-center gap-1 text-[#C49A6C] hover:underline font-bold text-[11px] uppercase tracking-wider"
                  id="footer-admin-manager-btn"
                >
                  <Settings className="w-3.5 h-3.5" />
                  <span>Store Manager & Catalog Backend</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Pan-India Shipping Cities Bar */}
        <div className="mt-10 pt-6 border-t border-[#262626] text-[11px] text-[#777] space-y-2">
          <div>
            <strong className="text-[#C5BDB0]">Express 48h Delivery Active In:</strong> New Delhi NCR, Mumbai, Bengaluru, Hyderabad, Chennai, Kolkata, Ahmedabad, Pune, Surat, Lucknow, Jaipur, Chandigarh, Ludhiana, Srinagar, Kanpur, Nagpur, Indore, Bhopal, Patna, Vadodara, and 25,000+ Indian Pincodes.
          </div>
        </div>

        {/* Payment & Security Badges */}
        <div className="mt-6 pt-6 border-t border-[#262626] flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-[#999]">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold text-white uppercase tracking-wider text-[10px]">Regional Payments:</span>
            <span className="bg-[#1A1A1A] px-2 py-1 rounded-xs text-[#C5BDB0] border border-[#333]">
              UPI (GPay / PhonePe / Paytm)
            </span>
            <span className="bg-[#1A1A1A] px-2 py-1 rounded-xs text-[#C5BDB0] border border-[#333]">
              Cash on Delivery (COD)
            </span>
            <span className="bg-[#1A1A1A] px-2 py-1 rounded-xs text-[#C5BDB0] border border-[#333]">
              RuPay / Visa / Master
            </span>
            <span className="bg-[#1A1A1A] px-2 py-1 rounded-xs text-[#C5BDB0] border border-[#333]">
              NetBanking (SBI, HDFC, ICICI)
            </span>
          </div>

          <div className="flex items-center gap-2 text-[#C49A6C]">
            <Lock className="w-3.5 h-3.5" />
            <span>256-Bit SSL Encrypted Regional Indian Checkout</span>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-4 border-t border-[#262626] text-center text-[10px] text-[#666] flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            © {new Date().getFullYear()} UNSTITCHED India Pvt. Ltd. All rights reserved. Registered under Indian GST Law.
          </div>
          <div className="text-[#888]">
            Authentic Pakistani Designer Originals • Handcrafted with master artisan tailoring
          </div>
        </div>
      </div>
    </footer>
  );
}
