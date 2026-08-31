'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Scissors,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Award,
  ArrowRight,
  Info,
  CheckCircle2,
  HelpCircle,
} from 'lucide-react';

export default function SizeGuidePage() {
  const [activeTab, setActiveTab] = useState<'standard' | 'curves' | 'bespoke' | 'silhouettes'>('standard');
  const [unit, setUnit] = useState<'inches' | 'cm'>('inches');

  const standardSizes = [
    { size: 'XS (34)', bust: 34, waist: 28, hip: 36, kurtaLength: 42, shoulder: 14, sleeve: 20 },
    { size: 'S (36)', bust: 36, waist: 30, hip: 38, kurtaLength: 43, shoulder: 14.5, sleeve: 20.5 },
    { size: 'M (38)', bust: 38, waist: 32, hip: 40, kurtaLength: 44, shoulder: 15, sleeve: 21 },
    { size: 'L (40)', bust: 40, waist: 35, hip: 43, kurtaLength: 45, shoulder: 15.5, sleeve: 21.5 },
    { size: 'XL (42)', bust: 42, waist: 38, hip: 46, kurtaLength: 45, shoulder: 16, sleeve: 22 },
    { size: 'XXL (44)', bust: 44, waist: 40, hip: 48, kurtaLength: 46, shoulder: 16.5, sleeve: 22 },
  ];

  const curvesSizes = [
    { size: '3XL (46)', bust: 46, waist: 43, hip: 51, kurtaLength: 46, shoulder: 17, armhole: 21 },
    { size: '4XL (48)', bust: 48, waist: 45, hip: 54, kurtaLength: 47, shoulder: 17.5, armhole: 22 },
    { size: '5XL (52)', bust: 52, waist: 49, hip: 58, kurtaLength: 47, shoulder: 18, armhole: 23 },
    { size: '6XL (56)', bust: 56, waist: 53, hip: 62, kurtaLength: 48, shoulder: 18.5, armhole: 24 },
  ];

  const trouserSilhouettes = [
    {
      name: 'Straight Cigarette Pants',
      description: 'Clean structured look tailored with side slits, matching embroidery lace trims, and elastic waistband.',
      bestFor: 'Daily Lawn & Modern Pret',
    },
    {
      name: 'Traditional Farshi Salwar',
      description: 'Authentic royal Pakistani pleated cut with heavy gather pleats and structured bottom cuffs.',
      bestFor: 'Classic Lawn & Organza Kurtas',
    },
    {
      name: 'Flared Gharara & Sharara',
      description: 'Dramatic dual-tier flare gathered at knee level with intricate gota/zari borders.',
      bestFor: 'Festive Formals & Wedding Wear',
    },
    {
      name: 'Culottes / Wide-leg Palazzo',
      description: 'Breezy wide-hem trousers offering ultimate airflow in hot summer weather.',
      bestFor: 'Swiss Voile & Daily Prints',
    },
    {
      name: 'Tulip Pants',
      description: 'Overlapping petal wrap pants with pearl bead accents on hems.',
      bestFor: 'Contemporary Short Tunics',
    },
  ];

  return (
    <div className="space-y-12 pb-16">
      {/* Header Bar */}
      <div className="bg-[#FAF5EE] border-b border-[#E8DFC8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
          <nav className="flex items-center gap-2 text-xs text-[#777] mb-4">
            <Link href="/" className="hover:text-black transition">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-black font-semibold">Luxury Sizing & Bespoke Tailoring Guide</span>
          </nav>

          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-1.5 bg-[#8B4513] text-white px-2.5 py-0.5 rounded-xs text-[10px] font-bold tracking-widest uppercase">
              <Scissors className="w-3 h-3" />
              <span>Master Atelier Standards</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#1A1A1A]">
              Pakistani Sizing & Bespoke Measurement Guide
            </h1>
            <p className="text-xs sm:text-sm text-[#555] leading-relaxed">
              Find your flawless fit. Whether choosing Ready-to-Wear standard sizing (XS to XXL), our inclusive Curves Edition (3XL to 6XL), or Bespoke Made-to-Measure tailoring with custom linings and necklines.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Tab Controls & Unit Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5E2D9] pb-4">
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'standard', label: 'Standard Sizing (XS - XXL)' },
              { id: 'curves', label: 'Curves Plus-Size (3XL - 6XL)' },
              { id: 'bespoke', label: 'Bespoke Measurement Steps' },
              { id: 'silhouettes', label: 'Trouser Silhouettes Guide' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-xs text-xs font-bold uppercase tracking-wider transition ${
                  activeTab === tab.id
                    ? 'bg-black text-white shadow-xs'
                    : 'bg-white border border-[#E5E2D9] text-[#666] hover:text-black'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 bg-white border border-[#E5E2D9] p-1 rounded-xs self-start sm:self-auto">
            <button
              onClick={() => setUnit('inches')}
              className={`px-3 py-1 text-xs font-bold rounded-xs transition ${
                unit === 'inches' ? 'bg-[#8B4513] text-white' : 'text-[#666]'
              }`}
            >
              Inches (&quot;)
            </button>
            <button
              onClick={() => setUnit('cm')}
              className={`px-3 py-1 text-xs font-bold rounded-xs transition ${
                unit === 'cm' ? 'bg-[#8B4513] text-white' : 'text-[#666]'
              }`}
            >
              Centimeters (cm)
            </button>
          </div>
        </div>

        {/* Tab 1: Standard Ready-to-Wear Chart */}
        {activeTab === 'standard' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-white border border-[#E5E2D9] rounded-xs overflow-hidden shadow-xs">
              <div className="p-4 bg-[#FAF9F6] border-b border-[#E5E2D9] flex justify-between items-center">
                <h3 className="font-serif font-bold text-base text-black">
                  Ready-to-Wear Standard Sizing (XS to XXL)
                </h3>
                <span className="text-[11px] text-[#666]">Garment Finished Dimensions</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#FAF5EE] border-b border-[#E5E2D9] text-[10px] font-bold uppercase tracking-wider text-[#8B4513]">
                      <th className="p-3.5">Size Tag</th>
                      <th className="p-3.5">Bust</th>
                      <th className="p-3.5">Waist</th>
                      <th className="p-3.5">Hips</th>
                      <th className="p-3.5">Kurta Length</th>
                      <th className="p-3.5">Shoulder</th>
                      <th className="p-3.5">Sleeve Length</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F2F0E9]">
                    {standardSizes.map((row) => (
                      <tr key={row.size} className="hover:bg-[#FAF9F6] transition">
                        <td className="p-3.5 font-bold text-black">{row.size}</td>
                        <td className="p-3.5 font-semibold text-[#1A1A1A]">
                          {unit === 'inches' ? `${row.bust}"` : `${Math.round(row.bust * 2.54)} cm`}
                        </td>
                        <td className="p-3.5">
                          {unit === 'inches' ? `${row.waist}"` : `${Math.round(row.waist * 2.54)} cm`}
                        </td>
                        <td className="p-3.5">
                          {unit === 'inches' ? `${row.hip}"` : `${Math.round(row.hip * 2.54)} cm`}
                        </td>
                        <td className="p-3.5">
                          {unit === 'inches' ? `${row.kurtaLength}"` : `${Math.round(row.kurtaLength * 2.54)} cm`}
                        </td>
                        <td className="p-3.5">
                          {unit === 'inches' ? `${row.shoulder}"` : `${Math.round(row.shoulder * 2.54)} cm`}
                        </td>
                        <td className="p-3.5">
                          {unit === 'inches' ? `${row.sleeve}"` : `${Math.round(row.sleeve * 2.54)} cm`}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-[#FAF5EE] border border-[#E8DFC8] p-4 rounded-xs text-xs text-[#555] flex items-start gap-3">
              <Info className="w-4 h-4 text-[#8B4513] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-black">Master Tailor Fit Tip:</span> If your measurements fall between two standard sizes, we recommend ordering one size up for a relaxed luxury drape, or selecting <span className="font-bold text-[#8B4513]">Bespoke Made-to-Measure Tailoring</span> on the product page.
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Curves Plus-Size Chart */}
        {activeTab === 'curves' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-white border border-[#E5E2D9] rounded-xs overflow-hidden shadow-xs">
              <div className="p-4 bg-[#FAF9F6] border-b border-[#E5E2D9] flex justify-between items-center">
                <div>
                  <h3 className="font-serif font-bold text-base text-black">
                    Curves Edition Plus-Size Charts (3XL to 6XL)
                  </h3>
                  <p className="text-[11px] text-[#666]">Extended bust circumference (46&quot; to 56&quot;) with extra fabric allowances.</p>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-[#8B4513] text-white px-2.5 py-1 rounded-xs">
                  Curves Certified
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#FAF5EE] border-b border-[#E5E2D9] text-[10px] font-bold uppercase tracking-wider text-[#8B4513]">
                      <th className="p-3.5">Curves Size</th>
                      <th className="p-3.5">Bust</th>
                      <th className="p-3.5">Waist</th>
                      <th className="p-3.5">Hips</th>
                      <th className="p-3.5">Deep Armhole</th>
                      <th className="p-3.5">Shoulder</th>
                      <th className="p-3.5">Kameez Length</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F2F0E9]">
                    {curvesSizes.map((row) => (
                      <tr key={row.size} className="hover:bg-[#FAF9F6] transition">
                        <td className="p-3.5 font-bold text-black">{row.size}</td>
                        <td className="p-3.5 font-semibold text-[#8B4513]">
                          {unit === 'inches' ? `${row.bust}"` : `${Math.round(row.bust * 2.54)} cm`}
                        </td>
                        <td className="p-3.5">
                          {unit === 'inches' ? `${row.waist}"` : `${Math.round(row.waist * 2.54)} cm`}
                        </td>
                        <td className="p-3.5">
                          {unit === 'inches' ? `${row.hip}"` : `${Math.round(row.hip * 2.54)} cm`}
                        </td>
                        <td className="p-3.5 font-medium">
                          {unit === 'inches' ? `${row.armhole}"` : `${Math.round(row.armhole * 2.54)} cm`}
                        </td>
                        <td className="p-3.5">
                          {unit === 'inches' ? `${row.shoulder}"` : `${Math.round(row.shoulder * 2.54)} cm`}
                        </td>
                        <td className="p-3.5">
                          {unit === 'inches' ? `${row.kurtaLength}"` : `${Math.round(row.kurtaLength * 2.54)} cm`}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="bg-white p-4 border border-[#E5E2D9] rounded-xs space-y-1">
                <div className="font-bold text-black flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#8B4513]" />
                  <span>No Extra Fabric Shortages</span>
                </div>
                <p className="text-[#666]">Our unstitched suits provide 3.25m to 3.5m shirt fabric to easily craft 56&quot; bust sizes.</p>
              </div>

              <div className="bg-white p-4 border border-[#E5E2D9] rounded-xs space-y-1">
                <div className="font-bold text-black flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#8B4513]" />
                  <span>Comfort Armhole Facings</span>
                </div>
                <p className="text-[#666]">Deep armhole allowances prevent tight underarm pinching during movement.</p>
              </div>

              <div className="bg-white p-4 border border-[#E5E2D9] rounded-xs space-y-1">
                <div className="font-bold text-black flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#8B4513]" />
                  <span>Custom Trouser Inseams</span>
                </div>
                <p className="text-[#666]">Waistband with dual front-belt and back elastic for supreme waist comfort.</p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Bespoke Measurement Steps */}
        {activeTab === 'bespoke' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white border border-[#E5E2D9] p-6 rounded-xs space-y-3 shadow-xs">
                <div className="w-8 h-8 rounded-full bg-[#FAF5EE] text-[#8B4513] font-bold flex items-center justify-center border border-[#E8DFC8]">
                  1
                </div>
                <h4 className="font-serif font-bold text-base text-black">1. Bust Measurement</h4>
                <p className="text-xs text-[#666] leading-relaxed">
                  Wrap the measuring tape around the fullest part of your bust while wearing your standard bra. Ensure the tape is straight across your shoulder blades in the back.
                </p>
              </div>

              <div className="bg-white border border-[#E5E2D9] p-6 rounded-xs space-y-3 shadow-xs">
                <div className="w-8 h-8 rounded-full bg-[#FAF5EE] text-[#8B4513] font-bold flex items-center justify-center border border-[#E8DFC8]">
                  2
                </div>
                <h4 className="font-serif font-bold text-base text-black">2. Waist & Hip Circumference</h4>
                <p className="text-xs text-[#666] leading-relaxed">
                  Measure natural waistline (narrowest torso section above belly button) and widest point of hips. Keep 1 finger slack for relaxed comfort.
                </p>
              </div>

              <div className="bg-white border border-[#E5E2D9] p-6 rounded-xs space-y-3 shadow-xs">
                <div className="w-8 h-8 rounded-full bg-[#FAF5EE] text-[#8B4513] font-bold flex items-center justify-center border border-[#E8DFC8]">
                  3
                </div>
                <h4 className="font-serif font-bold text-base text-black">3. Kurta & Sleeve Length</h4>
                <p className="text-xs text-[#666] leading-relaxed">
                  Measure from highest shoulder point down past your knee for standard Pakistani long kurta drape (typically 42&quot; to 48&quot;).
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Trouser Silhouettes */}
        {activeTab === 'silhouettes' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
            {trouserSilhouettes.map((sil) => (
              <div key={sil.name} className="bg-white border border-[#E5E2D9] p-6 rounded-xs space-y-3 shadow-xs">
                <div className="inline-block bg-[#FAF5EE] text-[#8B4513] border border-[#E8DFC8] px-2.5 py-0.5 rounded-xs text-[10px] font-bold uppercase tracking-wider">
                  {sil.bestFor}
                </div>
                <h4 className="font-serif font-bold text-base text-black">{sil.name}</h4>
                <p className="text-xs text-[#666] leading-relaxed">{sil.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        <div className="bg-[#FAF5EE] border border-[#E8DFC8] rounded-xs p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-serif font-bold text-lg text-black">
              Need Personal Sizing Assistance?
            </h3>
            <p className="text-xs text-[#666]">
              Our New Delhi master tailoring concierge is available on WhatsApp to verify measurements.
            </p>
          </div>
          <a
            href="https://wa.me/919820089123?text=Hi%20Pehnava%20Lawns,%20I%20need%20help%20choosing%20my%20size%20and%20tailoring%20option."
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#22C55E] hover:bg-[#16A34A] text-white text-xs font-bold uppercase tracking-widest px-6 py-3.5 rounded-xs transition shrink-0"
          >
            Chat with Master Tailor
          </a>
        </div>
      </div>
    </div>
  );
}
