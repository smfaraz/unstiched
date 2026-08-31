'use client';

import React from 'react';
import { useEcommerce } from '@/context/EcommerceContext';
import { X, Scissors, Sparkles, Check, Ruler, Info } from 'lucide-react';

export default function SizeGuideModal() {
  const { activeModal, closeModals } = useEcommerce();

  if (activeModal !== 'size_guide') return null;

  const sizeTable = [
    { size: 'XS', indiaSize: '34', bust: '34"', waist: '28"', hip: '36"', length: '44"', sleeve: '20"' },
    { size: 'S', indiaSize: '36', bust: '36"', waist: '30"', hip: '38"', length: '45"', sleeve: '21"' },
    { size: 'M', indiaSize: '38', bust: '38"', waist: '32"', hip: '40"', length: '45"', sleeve: '21"' },
    { size: 'L', indiaSize: '40', bust: '40"', waist: '34"', hip: '42"', length: '46"', sleeve: '21.5"' },
    { size: 'XL', indiaSize: '42', bust: '42"', waist: '36"', hip: '44"', length: '46"', sleeve: '22"' },
    { size: 'XXL', indiaSize: '44', bust: '44"', waist: '38"', hip: '46"', length: '46"', sleeve: '22"' },
    { size: '3XL', indiaSize: '46', bust: '46"', waist: '41"', hip: '49"', length: '47"', sleeve: '22.5"' },
    { size: '4XL', indiaSize: '48', bust: '48"', waist: '44"', hip: '52"', length: '47"', sleeve: '22.5"' },
    { size: '5XL', indiaSize: '52', bust: '52"', waist: '48"', hip: '56"', length: '48"', sleeve: '23"' },
    { size: '6XL', indiaSize: '56', bust: '56"', waist: '52"', hip: '60"', length: '48"', sleeve: '23"' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#FAF9F6] rounded-xs shadow-2xl overflow-hidden border border-[#E5E2D9] my-8 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-[#E5E2D9] shrink-0">
          <div className="flex items-center gap-2">
            <Scissors className="w-4 h-4 text-[#8B4513]" />
            <span className="font-serif text-lg font-bold text-[#1A1A1A] uppercase tracking-tight">
              Pakistani Suit Stitching & Size Guide
            </span>
          </div>
          <button
            onClick={closeModals}
            className="p-1.5 text-[#1A1A1A] hover:bg-[#F2F0E9] rounded-xs transition"
            aria-label="Close size guide"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6 flex-1 text-xs">
          {/* Intro Card */}
          <div className="bg-white p-4 rounded-xs border border-[#E5E2D9] shadow-xs space-y-2">
            <div className="font-serif font-bold text-sm text-[#1A1A1A] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#8B4513]" />
              <span>Bespoke Indian Master-Tailoring Service</span>
            </div>
            <p className="text-[#555] leading-relaxed">
              All our unstitched Pakistani suits come with generous original designer fabrics. When you choose our <strong>Stitched Standard</strong> or <strong>Custom Tailoring</strong> option, our master craftsmen include premium 100% cotton soft lining (Malmal), overlock interlock, and designer lace placement exactly as pictured in the catalog.
            </p>
          </div>

          {/* Size Chart Table */}
          <div className="bg-white rounded-xs border border-[#E5E2D9] shadow-xs overflow-hidden">
            <div className="p-3 bg-[#FAF5EE] border-b border-[#E5E2D9] font-bold text-xs text-[#1A1A1A] flex items-center justify-between">
              <span className="uppercase tracking-wider font-serif">Standard Ready Garment Measurement Chart (Inches)</span>
              <span className="text-[10px] text-[#777]">Includes 2&quot; Margin Inside</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#FAF9F6] border-b border-[#E5E2D9] text-[#555] font-bold uppercase tracking-wider text-[10px]">
                    <th className="p-2.5">Size</th>
                    <th className="p-2.5">India No.</th>
                    <th className="p-2.5">Bust</th>
                    <th className="p-2.5">Waist</th>
                    <th className="p-2.5">Hip</th>
                    <th className="p-2.5">Kurta Length</th>
                    <th className="p-2.5">Sleeve</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F2F0E9] text-[#1A1A1A]">
                  {sizeTable.map((row) => (
                    <tr key={row.size} className="hover:bg-[#FAF9F6] transition">
                      <td className="p-2.5 font-bold text-[#8B4513]">{row.size}</td>
                      <td className="p-2.5">{row.indiaSize}</td>
                      <td className="p-2.5 font-semibold">{row.bust}</td>
                      <td className="p-2.5">{row.waist}</td>
                      <td className="p-2.5">{row.hip}</td>
                      <td className="p-2.5">{row.length}</td>
                      <td className="p-2.5">{row.sleeve}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* How to Measure */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-xs border border-[#E5E2D9] space-y-1.5">
              <div className="font-serif font-bold text-[#1A1A1A] flex items-center gap-1.5">
                <Ruler className="w-4 h-4 text-[#8B4513]" />
                <span>How to Measure Bust & Chest</span>
              </div>
              <p className="text-[#777] leading-relaxed">
                Measure around the fullest part of your bust across the shoulder blades with a measuring tape kept level.
              </p>
            </div>

            <div className="bg-white p-4 rounded-xs border border-[#E5E2D9] space-y-1.5">
              <div className="font-serif font-bold text-[#1A1A1A] flex items-center gap-1.5">
                <Ruler className="w-4 h-4 text-[#8B4513]" />
                <span>Custom Curves (XL to 6XL)</span>
              </div>
              <p className="text-[#777] leading-relaxed">
                Our Pakistani lawn suits are cut from 3.5 to 4.0 meters of lawn fabric, comfortably accommodating plus size stitching up to 6XL without extra joins.
              </p>
            </div>
          </div>

          {/* Guarantee Note */}
          <div className="bg-[#FAF5EE] p-3.5 rounded-xs border border-[#E5E2D9] flex items-center gap-2.5 text-[#1A1A1A]">
            <Check className="w-4 h-4 shrink-0 text-[#8B4513]" />
            <span className="font-medium text-xs">
              Free Alteration Assistance: If you need slight adjustments after receiving your stitched suit, our tailoring team provides prompt support.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
