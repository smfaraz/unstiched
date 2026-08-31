'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Clock,
  Send,
  CheckCircle2,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    inquiryType: 'Sizing & Custom Tailoring Consultation',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-[#777]">
        <Link href="/" className="hover:text-black transition">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-black font-semibold">Contact Stylist & Concierge</span>
      </nav>

      {/* Header */}
      <div className="border-b border-[#E5E2D9] pb-6">
        <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8B4513] mb-1">
          Indian Client Support & Styling
        </div>
        <h1 className="text-2xl sm:text-4xl font-serif font-bold text-[#1A1A1A]">
          We&apos;re Here to Assist Your Luxury Lawn Orders
        </h1>
        <p className="text-xs sm:text-sm text-[#666] mt-1">
          Speak with our Pakistani couture stylists for measurement guidance, wedding orders, or shipment status.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Contact Methods & Operational Hub */}
        <div className="lg:col-span-5 space-y-6">
          {/* WhatsApp Direct Card */}
          <div className="bg-[#FAF5EE] border border-[#E8DFC8] p-6 rounded-xs space-y-3">
            <div className="inline-flex items-center gap-1.5 bg-[#22C55E] text-white px-2.5 py-0.5 rounded-xs text-[10px] font-bold uppercase tracking-wider">
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Instant WhatsApp Concierge</span>
            </div>
            <h3 className="font-serif font-bold text-lg text-black">
              Chat with a Senior Stylist
            </h3>
            <p className="text-xs text-[#555] leading-relaxed">
              Send reference pictures, inquire about lawn restocks, or receive live fabric videos directly on WhatsApp.
            </p>
            <a
              href="https://wa.me/919820089123?text=Hi%20Pehnava%20Lawns,%20I%20need%20assistance%20with%20Pakistani%20designer%20suits"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#22C55E] hover:bg-[#16A34A] text-white text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-xs transition shadow-xs"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Open WhatsApp Chat</span>
            </a>
          </div>

          {/* Contact Details */}
          <div className="bg-white border border-[#E5E2D9] p-6 rounded-xs space-y-4 text-xs">
            <h4 className="font-bold uppercase tracking-wider text-[#1A1A1A] text-[11px] border-b border-[#E5E2D9] pb-2">
              Customer Experience Hours
            </h4>

            <div className="flex items-start gap-3">
              <Phone className="w-4 h-4 text-[#8B4513] shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-black">+91 98200 89123 / +91 11 4059 8812</div>
                <div className="text-[#777]">Monday to Saturday, 10:00 AM – 8:00 PM IST</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-4 h-4 text-[#8B4513] shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-black">care@pehnavalawns.com</div>
                <div className="text-[#777]">Typical email response time: Under 3 hours</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-[#8B4513] shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-black">Central Fulfilment Hub & Tailoring Atelier</div>
                <div className="text-[#777]">Plot 42, Okhla Industrial Area Phase III, New Delhi 110020, India</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Inquiry Form */}
        <div className="lg:col-span-7 bg-white border border-[#E5E2D9] p-6 sm:p-8 rounded-xs shadow-xs">
          {formSubmitted ? (
            <div className="text-center py-12 space-y-4">
              <CheckCircle2 className="w-12 h-12 text-[#2E7D32] mx-auto" />
              <h3 className="font-serif font-bold text-2xl text-black">
                Message Received Successfully
              </h3>
              <p className="text-xs text-[#666] max-w-md mx-auto leading-relaxed">
                Thank you for contacting Pehnava Lawns. A senior stylist has been assigned to your request and will reach out via WhatsApp / Email shortly.
              </p>
              <button
                onClick={() => setFormSubmitted(false)}
                className="text-xs font-bold uppercase tracking-wider text-[#8B4513] underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="font-serif font-bold text-xl text-black mb-2">
                Send an Inquiry or Styling Request
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#666]">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Ayesha Sharma"
                    className="w-full bg-[#FAF9F6] border border-[#E5E2D9] rounded-xs px-3 py-2.5 text-xs text-black font-semibold focus:outline-none focus:border-black"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#666]">
                    WhatsApp Number (+91) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="10-digit mobile number"
                    className="w-full bg-[#FAF9F6] border border-[#E5E2D9] rounded-xs px-3 py-2.5 text-xs text-black font-semibold focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#666]">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="ayesha@example.com"
                    className="w-full bg-[#FAF9F6] border border-[#E5E2D9] rounded-xs px-3 py-2.5 text-xs text-black font-semibold focus:outline-none focus:border-black"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#666]">
                    Inquiry Nature
                  </label>
                  <select
                    value={formData.inquiryType}
                    onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                    className="w-full bg-[#FAF9F6] border border-[#E5E2D9] rounded-xs px-3 py-2.5 text-xs text-black font-semibold focus:outline-none focus:border-black"
                  >
                    <option>Sizing & Custom Tailoring Consultation</option>
                    <option>Order Status & BlueDart Shipment</option>
                    <option>Bridal / Bulk Trousseau Inquiries</option>
                    <option>Restock Request for Pakistani Lawn &apos;26</option>
                    <option>Returns & Size Exchange</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#666]">
                  Your Message or Special Sizing Notes
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us what you are looking for (designer name, event date, custom bust/hip measurements)..."
                  className="w-full bg-[#FAF9F6] border border-[#E5E2D9] rounded-xs px-3 py-2.5 text-xs text-black font-semibold focus:outline-none focus:border-black"
                />
              </div>

              <button
                type="submit"
                className="bg-black hover:bg-[#2A2A2A] text-white font-bold text-xs uppercase tracking-widest px-8 py-3.5 rounded-xs transition shadow-xs flex items-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Request</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
