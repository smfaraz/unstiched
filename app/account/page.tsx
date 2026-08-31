'use client';

import React, { useState } from 'react';
import { useEcommerce } from '@/context/EcommerceContext';
import Link from 'next/link';
import {
  User,
  Package,
  Heart,
  Scissors,
  MapPin,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  Phone,
  Mail,
} from 'lucide-react';
import { CustomMeasurements } from '@/types/ecommerce';

export default function AccountPage() {
  const { orders, wishlist, formatPrice } = useEcommerce();

  const [savedMeasurements, setSavedMeasurements] = useState<CustomMeasurements>({
    bust: 38,
    waist: 32,
    hip: 40,
    kurtaLength: 44,
    sleeveLength: 21,
    trouserStyle: 'Straight Cigarette Pants',
    necklineStyle: 'Embroidered V-Neck',
    liningPreference: 'Full Cotton Lining',
    specialNotes: 'Require 2-inch extra side margins in kurti stitching',
  });

  const [savedToast, setSavedToast] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3000);
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
          <span className="text-black font-semibold">My UNSTITCHED Account & Tailoring Profile</span>
        </nav>

        {/* Profile Banner */}
        <div className="bg-white border border-[#E5E2D9] rounded-xs p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#FAF5EE] border border-[#E8DFC8] flex items-center justify-center text-[#8B4513] font-serif font-bold text-2xl">
              U
            </div>
            <div className="space-y-1">
              <div className="text-[10px] font-bold uppercase tracking-widest text-[#8B4513]">
                UNSTITCHED VIP Member
              </div>
              <h1 className="font-serif text-2xl font-bold text-black">
                Personal Atelier Profile
              </h1>
              <div className="flex flex-wrap gap-4 text-xs text-[#666]">
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-[#8B4513]" />
                  <span>concierge@unstitched.in</span>
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-[#8B4513]" />
                  <span>+91 98200 89123</span>
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Link
              href="/orders"
              className="bg-black hover:bg-[#2A2A2A] text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-xs transition flex items-center gap-1.5"
            >
              <Package className="w-3.5 h-3.5" />
              <span>View Past Orders ({orders.length})</span>
            </Link>
            <Link
              href="/wishlist"
              className="bg-white border border-[#E5E2D9] hover:bg-[#FAF5EE] text-black text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-xs transition flex items-center gap-1.5"
            >
              <Heart className="w-3.5 h-3.5 text-[#8B4513]" />
              <span>Saved Suits ({wishlist.length})</span>
            </Link>
          </div>
        </div>

        {/* Grid: Measurement Profile & Recent Orders */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Saved Measurement Profile */}
          <div className="lg:col-span-7 bg-white border border-[#E5E2D9] rounded-xs p-6 space-y-6 shadow-xs">
            <div className="border-b border-[#E5E2D9] pb-3 flex items-center justify-between">
              <div>
                <h2 className="font-serif text-lg font-bold text-black flex items-center gap-2">
                  <Scissors className="w-4 h-4 text-[#8B4513]" />
                  <span>Saved Bespoke Measurement Profile</span>
                </h2>
                <p className="text-xs text-[#666] mt-0.5">
                  Save your body measurements once to apply instant 1-click tailored stitching at checkout.
                </p>
              </div>
              {savedToast && (
                <span className="text-[11px] font-bold text-[#2E7D32] bg-[#E8F5E9] px-2.5 py-1 rounded-xs animate-fadeIn">
                  ✓ Profile Saved
                </span>
              )}
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-[#555] uppercase text-[10px] tracking-wider">
                    Bust (Inches)
                  </label>
                  <input
                    type="number"
                    value={savedMeasurements.bust}
                    onChange={(e) =>
                      setSavedMeasurements({ ...savedMeasurements, bust: Number(e.target.value) })
                    }
                    className="w-full bg-[#FAF9F6] border border-[#E5E2D9] rounded-xs p-2.5 font-bold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#555] uppercase text-[10px] tracking-wider">
                    Waist (Inches)
                  </label>
                  <input
                    type="number"
                    value={savedMeasurements.waist}
                    onChange={(e) =>
                      setSavedMeasurements({ ...savedMeasurements, waist: Number(e.target.value) })
                    }
                    className="w-full bg-[#FAF9F6] border border-[#E5E2D9] rounded-xs p-2.5 font-bold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#555] uppercase text-[10px] tracking-wider">
                    Hip (Inches)
                  </label>
                  <input
                    type="number"
                    value={savedMeasurements.hip}
                    onChange={(e) =>
                      setSavedMeasurements({ ...savedMeasurements, hip: Number(e.target.value) })
                    }
                    className="w-full bg-[#FAF9F6] border border-[#E5E2D9] rounded-xs p-2.5 font-bold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#555] uppercase text-[10px] tracking-wider">
                    Kurta Length (Inches)
                  </label>
                  <input
                    type="number"
                    value={savedMeasurements.kurtaLength}
                    onChange={(e) =>
                      setSavedMeasurements({
                        ...savedMeasurements,
                        kurtaLength: Number(e.target.value),
                      })
                    }
                    className="w-full bg-[#FAF9F6] border border-[#E5E2D9] rounded-xs p-2.5 font-bold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#555] uppercase text-[10px] tracking-wider">
                    Sleeve Length (Inches)
                  </label>
                  <input
                    type="number"
                    value={savedMeasurements.sleeveLength}
                    onChange={(e) =>
                      setSavedMeasurements({
                        ...savedMeasurements,
                        sleeveLength: Number(e.target.value),
                      })
                    }
                    className="w-full bg-[#FAF9F6] border border-[#E5E2D9] rounded-xs p-2.5 font-bold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#555] uppercase text-[10px] tracking-wider">
                    Lining Preference
                  </label>
                  <select
                    value={savedMeasurements.liningPreference}
                    onChange={(e) =>
                      setSavedMeasurements({
                        ...savedMeasurements,
                        liningPreference: e.target.value as any,
                      })
                    }
                    className="w-full bg-[#FAF9F6] border border-[#E5E2D9] rounded-xs p-2.5 font-semibold"
                  >
                    <option value="Full Cotton Lining">Full Cotton Lining</option>
                    <option value="Sleeves Unlined">Sleeves Unlined</option>
                    <option value="No Extra Lining">No Extra Lining</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-[#555] uppercase text-[10px] tracking-wider">
                    Preferred Trouser Cut
                  </label>
                  <select
                    value={savedMeasurements.trouserStyle}
                    onChange={(e) =>
                      setSavedMeasurements({
                        ...savedMeasurements,
                        trouserStyle: e.target.value as any,
                      })
                    }
                    className="w-full bg-[#FAF9F6] border border-[#E5E2D9] rounded-xs p-2.5 font-semibold"
                  >
                    <option value="Straight Cigarette Pants">Straight Cigarette Pants</option>
                    <option value="Traditional Farshi Salwar">Traditional Farshi Salwar</option>
                    <option value="Flared Gharara / Sharara">Flared Gharara / Sharara</option>
                    <option value="Culottes / Wide-leg Palazzo">Culottes / Wide-leg Palazzo</option>
                    <option value="Tulip Pants">Tulip Pants</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#555] uppercase text-[10px] tracking-wider">
                    Preferred Neckline Style
                  </label>
                  <select
                    value={savedMeasurements.necklineStyle}
                    onChange={(e) =>
                      setSavedMeasurements({
                        ...savedMeasurements,
                        necklineStyle: e.target.value as any,
                      })
                    }
                    className="w-full bg-[#FAF9F6] border border-[#E5E2D9] rounded-xs p-2.5 font-semibold"
                  >
                    <option value="Embroidered V-Neck">Embroidered V-Neck</option>
                    <option value="Boat Neck with Slit">Boat Neck with Slit</option>
                    <option value="Classic Round">Classic Round</option>
                    <option value="Angrakha Wrap">Angrakha Wrap</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#555] uppercase text-[10px] tracking-wider">
                  Special Tailoring Notes / Adjustments
                </label>
                <textarea
                  rows={2}
                  value={savedMeasurements.specialNotes || ''}
                  onChange={(e) =>
                    setSavedMeasurements({
                      ...savedMeasurements,
                      specialNotes: e.target.value,
                    })
                  }
                  className="w-full bg-[#FAF9F6] border border-[#E5E2D9] rounded-xs p-2.5 text-xs focus:outline-none focus:border-black"
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="bg-black hover:bg-[#2A2A2A] text-white text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-xs transition"
                >
                  Save Measurement Profile
                </button>
              </div>
            </form>
          </div>

          {/* Right: Recent Orders & Quick Links */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-[#E5E2D9] rounded-xs p-6 space-y-4 shadow-xs">
              <div className="flex items-center justify-between border-b border-[#E5E2D9] pb-3">
                <h3 className="font-serif font-bold text-base text-black flex items-center gap-2">
                  <Package className="w-4 h-4 text-[#8B4513]" />
                  <span>Recent Orders</span>
                </h3>
                <Link href="/orders" className="text-xs font-bold text-[#8B4513] hover:underline">
                  View All →
                </Link>
              </div>

              {orders.slice(0, 3).map((order) => (
                <div key={order.id} className="p-3 bg-[#FAF9F6] border border-[#E5E2D9] rounded-xs space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-black">#{order.id}</span>
                    <span className="text-[10px] font-bold uppercase bg-[#E8F5E9] text-[#2E7D32] px-2 py-0.5 rounded-xs">
                      {order.orderStatus.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="text-[11px] text-[#666]">
                    {order.items.length} items • Total: {formatPrice(order.grandTotal)}
                  </div>
                  <div className="flex justify-between items-center pt-1">
                    <span className="text-[10px] text-[#888]">{order.createdAt}</span>
                    <Link
                      href={`/track-order?id=${order.id}`}
                      className="text-xs font-bold text-[#8B4513] hover:underline flex items-center gap-1"
                    >
                      <span>Track BlueDart</span>
                      <ChevronRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Stylist Support Box */}
            <div className="bg-[#FAF5EE] border border-[#E8DFC8] rounded-xs p-6 space-y-3">
              <div className="font-serif font-bold text-base text-black">
                VIP Dedicated Stylist
              </div>
              <p className="text-xs text-[#555] leading-relaxed">
                Need color matching advice or dupatta custom finishing? Connect directly with our New Delhi boutique styling team.
              </p>
              <a
                href="https://wa.me/919820089123?text=Hi%20Pehnava%20Lawns,%20I%20am%20a%20VIP%20member%20and%20need%20styling%20advice."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#22C55E] hover:bg-[#16A34A] text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-xs transition"
              >
                Connect on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
