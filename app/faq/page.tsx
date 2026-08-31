'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  HelpCircle,
  ChevronDown,
  ChevronRight,
  ShieldCheck,
  Truck,
  Scissors,
  Sparkles,
  RotateCcw,
  MessageCircle,
} from 'lucide-react';

export default function FaqPage() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'authenticity' | 'stitching' | 'shipping' | 'payments' | 'returns'>('all');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      category: 'authenticity',
      categoryLabel: 'Authenticity & Brand Sourcing',
      question: 'Are all Pakistani lawn suits on Pehnava 100% original designer wear?',
      answer: 'Yes, unconditionally. We import directly from certified brand ateliers in Lahore, Karachi, and Faisalabad (including Maria B., Sana Safinaz, Asim Jofa, Baroque, Crimson, and Zara Shahjahan). Every garment comes with authentic brand hologram tags, barcode serial numbers, and manufacturer packaging.',
    },
    {
      category: 'authenticity',
      categoryLabel: 'Authenticity & Brand Sourcing',
      question: 'How do you prevent duplicate or master replica imports in India?',
      answer: 'Our in-house quality inspection team at our Okhla, New Delhi warehouse conducts physical fabric density (80s/100s yarn count) and schiffli embroidery thread checks on every shipment before clearing it for customer dispatch.',
    },
    {
      category: 'stitching',
      categoryLabel: 'Sizing & Boutique Custom Tailoring',
      question: 'What is the difference between Unstitched, Standard Stitched, and Bespoke Tailoring?',
      answer: '• 3-Piece Unstitched: Fabric set (3.25m shirt, 2.5m dupatta, 2.5m trouser + embroidered patches) ready for your local tailor.\n• Standard Stitched (+₹1,199): Stitched according to standard Indian pret sizes (XS to XXL) with cotton lining and lace embellishments.\n• Bespoke Made-to-Measure (+₹1,499): Handcrafted precisely to your custom bust (34"-56"), waist, hip, length, trouser silhouette, and preferred neckline.',
    },
    {
      category: 'stitching',
      categoryLabel: 'Sizing & Boutique Custom Tailoring',
      question: 'Do you offer plus sizes for curvier women (XL to 6XL)?',
      answer: 'Yes! Our "Curves Edition" is dedicated to bust sizes from 42" to 56". We provide generous fabric paneling, deep armhole facings, and dual-elastic waistbands for ultimate comfort and royal drape without any tight pulling.',
    },
    {
      category: 'shipping',
      categoryLabel: 'Pan-India Shipping & BlueDart Delivery',
      question: 'How long does delivery take across India?',
      answer: '• Unstitched Suits: Dispatched within 24 hours. Delivery takes 2 to 4 business days via BlueDart Air Express across 25,000+ pincodes.\n• Stitched / Custom Tailored Suits: Requires 5 to 7 days for boutique master stitching, followed by 2-day express air dispatch.',
    },
    {
      category: 'shipping',
      categoryLabel: 'Pan-India Shipping & BlueDart Delivery',
      question: 'Is shipping free or are there extra customs charges?',
      answer: 'Pan-India BlueDart Express shipping is 100% Free on all orders. All customs duties, cross-border import tariffs, and GST are fully covered by Pehnava Lawns with zero hidden charges at delivery.',
    },
    {
      category: 'payments',
      categoryLabel: 'Payments & COD',
      question: 'Is Cash on Delivery (COD) available in my city?',
      answer: 'Yes, Cash on Delivery is available across 25,000+ Indian pincodes. You can pay cash or scan the BlueDart delivery partner UPI QR code at your doorstep.',
    },
    {
      category: 'payments',
      categoryLabel: 'Payments & COD',
      question: 'What online payment methods do you support?',
      answer: 'We accept Google Pay, PhonePe, Paytm, BHIM UPI (with instant dynamic QR code), all Visa, MasterCard, and RuPay Credit/Debit Cards, and NetBanking across 50+ Indian banks.',
    },
    {
      category: 'returns',
      categoryLabel: '7-Day Returns & Exchanges',
      question: 'What is your return and exchange policy?',
      answer: 'We provide a 7-day hassle-free exchange and return window for unstitched suits if the package is unopened with brand tags intact. For custom tailored pieces, our master tailor provides free alteration adjustments if the fit requires fine-tuning.',
    },
  ];

  const filteredFaqs = faqs.filter(
    (f) => activeCategory === 'all' || f.category === activeCategory
  );

  return (
    <div className="space-y-12 pb-16">
      {/* Header */}
      <div className="bg-[#FAF5EE] border-b border-[#E8DFC8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
          <nav className="flex items-center gap-2 text-xs text-[#777] mb-4">
            <Link href="/" className="hover:text-black transition">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-black font-semibold">Frequently Asked Questions</span>
          </nav>

          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-1.5 bg-[#8B4513] text-white px-2.5 py-0.5 rounded-xs text-[10px] font-bold tracking-widest uppercase">
              <HelpCircle className="w-3 h-3" />
              <span>Customer Help Concierge</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#1A1A1A]">
              Frequently Asked Questions
            </h1>
            <p className="text-xs sm:text-sm text-[#555] leading-relaxed">
              Find answers regarding authentic Pakistani lawn sourcing, custom master tailoring, Pan-India BlueDart express air timelines, and regional payment modes.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'all', label: 'All Questions' },
            { id: 'authenticity', label: '100% Authenticity' },
            { id: 'stitching', label: 'Tailoring & Curves' },
            { id: 'shipping', label: 'BlueDart Shipping' },
            { id: 'payments', label: 'COD & Payments' },
            { id: 'returns', label: '7-Day Exchanges' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-4 py-2 rounded-xs text-xs font-bold uppercase tracking-wider transition ${
                activeCategory === cat.id
                  ? 'bg-black text-white'
                  : 'bg-white border border-[#E5E2D9] text-[#666] hover:text-black'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="bg-white border border-[#E5E2D9] rounded-xs overflow-hidden shadow-xs transition"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-[#FAF9F6] transition"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#8B4513]">
                      {faq.categoryLabel}
                    </span>
                    <h3 className="font-serif font-bold text-sm sm:text-base text-black">
                      {faq.question}
                    </h3>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-[#888] shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-black' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-[#555] leading-relaxed border-t border-[#F2F0E9] whitespace-pre-line animate-fadeIn">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* WhatsApp Quick Help Box */}
        <div className="bg-[#FAF5EE] border border-[#E8DFC8] rounded-xs p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-serif font-bold text-lg text-black">
              Still have a question about your order or fabric?
            </h3>
            <p className="text-xs text-[#666]">
              Our New Delhi boutique stylist team is available 7 days a week on WhatsApp.
            </p>
          </div>
          <a
            href="https://wa.me/919820089123?text=Hi%20Pehnava%20Lawns,%20I%20have%20a%20question%20about%20your%20Pakistani%20designer%20suits."
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#22C55E] hover:bg-[#16A34A] text-white text-xs font-bold uppercase tracking-widest px-6 py-3.5 rounded-xs transition flex items-center gap-2 shrink-0"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
