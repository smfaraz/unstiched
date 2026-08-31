'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useEcommerce } from '@/context/EcommerceContext';
import { CustomerDetails, Order } from '@/types/ecommerce';
import {
  X,
  ShieldCheck,
  Truck,
  CheckCircle2,
  Lock,
  ArrowRight,
  QrCode,
  CreditCard,
  Building,
  Banknote,
  Sparkles,
  Phone,
  Scissors,
  Download,
  Package,
} from 'lucide-react';

const INDIAN_STATES = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Delhi NCR',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jammu & Kashmir',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
];

export default function CheckoutModal() {
  const {
    cart,
    activeModal,
    closeModals,
    cartSubtotal,
    cartStitchingTotal,
    cartGrandTotal,
    appliedCoupon,
    formatPrice,
    createOrder,
    checkPincodeDelivery,
    openOrderTracking,
  } = useEcommerce();

  // Step control: 1 = Address, 2 = Payment, 3 = Confirmed
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Address Form State
  const [customer, setCustomer] = useState<CustomerDetails>({
    fullName: '',
    email: '',
    phone: '',
    alternatePhone: '',
    addressLine1: '',
    addressLine2: '',
    landmark: '',
    city: '',
    state: 'Delhi NCR',
    pincode: '',
    gstin: '',
  });

  const [shippingMethod, setShippingMethod] = useState<
    'Express Pan-India (2-4 Days)' | 'Priority Superfast Air (24-48 Hours)' | 'Custom Tailoring Dispatch'
  >('Express Pan-India (2-4 Days)');

  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'cod' | 'card' | 'netbanking'>('upi');
  const [selectedUpiApp, setSelectedUpiApp] = useState<'gpay' | 'phonepe' | 'paytm' | 'cred'>('gpay');
  const [upiIdInput, setUpiIdInput] = useState('');
  const [codOtp, setCodOtp] = useState('');
  const [codOtpSent, setCodOtpSent] = useState(false);
  const [giftWrap, setGiftWrap] = useState(false);
  const [giftMessage, setGiftMessage] = useState('');
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePincodeInputChange = (val: string) => {
    const cleanPin = val.replace(/\D/g, '');
    let updatedCity = customer.city;
    let updatedState = customer.state;

    if (cleanPin.length === 6) {
      const pinInfo = checkPincodeDelivery(cleanPin);
      if (pinInfo.isDeliverable) {
        updatedCity = pinInfo.city;
        if (pinInfo.state) updatedState = pinInfo.state;
      }
    }

    setCustomer((prev) => ({
      ...prev,
      pincode: cleanPin,
      city: updatedCity,
      state: updatedState,
    }));
  };

  if (activeModal !== 'checkout') return null;

  const isStitched = cart.some((i) => i.stitchingOption !== 'unstitched');
  const shippingCost = shippingMethod === 'Priority Superfast Air (24-48 Hours)' ? 150 : 0;
  const upiInstantDiscount = paymentMethod === 'upi' ? Math.round(cartGrandTotal * 0.05) : 0;
  const finalPayable = Math.max(0, cartGrandTotal + shippingCost - upiInstantDiscount);

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customer.fullName || !customer.phone || !customer.addressLine1 || !customer.pincode) {
      return;
    }
    setStep(2);
  };

  const handleFinalPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const order = createOrder({
        customer,
        paymentMethod,
        shippingMethod: isStitched ? 'Custom Tailoring Dispatch' : shippingMethod,
        upiDetails:
          paymentMethod === 'upi'
            ? {
                app: selectedUpiApp.toUpperCase(),
                transactionRef: `UPI-IND-${Math.floor(10000000 + Math.random() * 90000000)}`,
              }
            : undefined,
        giftWrap,
        giftMessage: giftWrap ? giftMessage : undefined,
      });

      setIsProcessing(false);
      setConfirmedOrder(order);
      setStep(3);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#FAF9F6] rounded-xs shadow-2xl overflow-hidden border border-[#E5E2D9] my-8 max-h-[92vh] flex flex-col">
        {/* Checkout Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-[#E5E2D9] shrink-0">
          <div className="flex items-center gap-3">
            <span className="font-serif text-xl font-bold text-[#1A1A1A] tracking-tight">PEHNAVA LAWNS</span>
            <span className="text-[10px] text-[#777] font-bold uppercase tracking-widest hidden sm:inline">
              | 🔒 256-Bit SSL Encrypted Regional Indian Checkout
            </span>
          </div>
          {step !== 3 && (
            <button
              onClick={closeModals}
              className="p-1.5 text-[#1A1A1A] hover:bg-[#F2F0E9] rounded-xs transition"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Step Progress Tracker */}
        {step !== 3 && (
          <div className="bg-[#F2F0E9] px-6 py-3 border-b border-[#E5E2D9] flex items-center justify-between text-xs font-bold text-[#1A1A1A]">
            <div className="flex items-center gap-2">
              <span
                className={`w-5 h-5 rounded-xs flex items-center justify-center text-[10px] font-bold ${
                  step === 1 ? 'bg-black text-white' : 'bg-[#8B4513] text-white'
                }`}
              >
                {step > 1 ? '✓' : '1'}
              </span>
              <span className="uppercase tracking-wider text-[11px]">1. Delivery Address & GST</span>
            </div>

            <div className="w-12 h-px bg-[#D1C7BA]" />

            <div className="flex items-center gap-2">
              <span
                className={`w-5 h-5 rounded-xs flex items-center justify-center text-[10px] font-bold ${
                  step === 2 ? 'bg-black text-white' : 'bg-[#E5E2D9] text-[#777]'
                }`}
              >
                2
              </span>
              <span className="uppercase tracking-wider text-[11px]">2. UPI, COD & Indian Payment</span>
            </div>

            <div className="w-12 h-px bg-[#D1C7BA] hidden sm:block" />

            <div className="hidden sm:flex items-center gap-2 text-[#777]">
              <span className="w-5 h-5 rounded-xs bg-[#E5E2D9] flex items-center justify-center text-[10px] text-[#777]">
                3
              </span>
              <span className="uppercase tracking-wider text-[11px]">3. Confirmation</span>
            </div>
          </div>
        )}

        {/* Modal Body */}
        <div className="overflow-y-auto p-4 sm:p-6 lg:p-8 flex-1">
          {/* STEP 1: DELIVERY ADDRESS & CONTACT */}
          {step === 1 && (
            <form onSubmit={handleAddressSubmit} className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left 7 cols: Address form */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="font-serif font-bold text-sm text-[#1A1A1A] flex items-center gap-2 border-b border-[#E5E2D9] pb-2">
                    <Truck className="w-4 h-4 text-[#8B4513]" />
                    <span>Customer & Delivery Details (Pan-India)</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label htmlFor="checkout-full-name-input" className="block text-[10px] font-bold uppercase tracking-wider text-[#555] mb-1">
                        Full Name *
                      </label>
                      <input
                        id="checkout-full-name-input"
                        type="text"
                        required
                        placeholder="e.g. Ayesha Siddiqui"
                        value={customer.fullName}
                        onChange={(e) => setCustomer({ ...customer, fullName: e.target.value })}
                        className="w-full bg-white border border-[#E5E2D9] rounded-xs p-2.5 text-xs font-semibold focus:outline-none focus:border-black"
                      />
                    </div>

                    <div>
                      <label htmlFor="checkout-phone-input" className="block text-[10px] font-bold uppercase tracking-wider text-[#555] mb-1">
                        Mobile Number (+91) *
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-2.5 text-xs font-bold text-[#777]">+91</span>
                        <input
                          id="checkout-phone-input"
                          type="tel"
                          required
                          maxLength={10}
                          placeholder="98200XXXXX (For WhatsApp Tracking)"
                          value={customer.phone}
                          onChange={(e) =>
                            setCustomer({
                              ...customer,
                              phone: e.target.value.replace(/\D/g, ''),
                            })
                          }
                          className="w-full bg-white border border-[#E5E2D9] rounded-xs pl-12 pr-3 py-2.5 text-xs font-semibold focus:outline-none focus:border-black"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="text-xs">
                    <label htmlFor="checkout-email-input" className="block text-[10px] font-bold uppercase tracking-wider text-[#555] mb-1">
                      Email Address (For Tax Invoice & BlueDart Tracking Link) *
                    </label>
                    <input
                      id="checkout-email-input"
                      type="email"
                      required
                      placeholder="e.g. ayesha.siddiqui@gmail.com"
                      value={customer.email}
                      onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                      className="w-full bg-white border border-[#E5E2D9] rounded-xs p-2.5 text-xs font-semibold focus:outline-none focus:border-black"
                    />
                  </div>

                  <div className="text-xs">
                    <label htmlFor="checkout-address-input" className="block text-[10px] font-bold uppercase tracking-wider text-[#555] mb-1">
                      Flat / House No. / Building / Street *
                    </label>
                    <input
                      id="checkout-address-input"
                      type="text"
                      required
                      placeholder="e.g. Flat 402, Al-Madina Heights, Linking Road"
                      value={customer.addressLine1}
                      onChange={(e) => setCustomer({ ...customer, addressLine1: e.target.value })}
                      className="w-full bg-white border border-[#E5E2D9] rounded-xs p-2.5 text-xs font-semibold focus:outline-none focus:border-black"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div>
                      <label htmlFor="checkout-pincode-input" className="block text-[10px] font-bold uppercase tracking-wider text-[#555] mb-1">
                        Pincode *
                      </label>
                      <input
                        id="checkout-pincode-input"
                        type="text"
                        required
                        maxLength={6}
                        placeholder="e.g. 400050"
                        value={customer.pincode}
                        onChange={(e) => handlePincodeInputChange(e.target.value)}
                        className="w-full bg-white border border-[#E5E2D9] rounded-xs p-2.5 text-xs font-bold focus:outline-none focus:border-black"
                      />
                    </div>

                    <div>
                      <label htmlFor="checkout-city-input" className="block text-[10px] font-bold uppercase tracking-wider text-[#555] mb-1">
                        City *
                      </label>
                      <input
                        id="checkout-city-input"
                        type="text"
                        required
                        placeholder="e.g. Mumbai"
                        value={customer.city}
                        onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                        className="w-full bg-white border border-[#E5E2D9] rounded-xs p-2.5 text-xs font-semibold focus:outline-none focus:border-black"
                      />
                    </div>

                    <div>
                      <label htmlFor="checkout-state-select" className="block text-[10px] font-bold uppercase tracking-wider text-[#555] mb-1">
                        State *
                      </label>
                      <select
                        id="checkout-state-select"
                        value={customer.state}
                        onChange={(e) => setCustomer({ ...customer, state: e.target.value })}
                        className="w-full bg-white border border-[#E5E2D9] rounded-xs p-2.5 text-xs font-semibold focus:outline-none focus:border-black"
                      >
                        {INDIAN_STATES.map((st) => (
                          <option key={st} value={st}>
                            {st}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label htmlFor="checkout-landmark-input" className="block text-[10px] font-bold uppercase tracking-wider text-[#555] mb-1">
                        Landmark (Optional)
                      </label>
                      <input
                        id="checkout-landmark-input"
                        type="text"
                        placeholder="e.g. Near Bandra Mosque / Metro Pillar"
                        value={customer.landmark || ''}
                        onChange={(e) => setCustomer({ ...customer, landmark: e.target.value })}
                        className="w-full bg-white border border-[#E5E2D9] rounded-xs p-2.5 text-xs focus:outline-none"
                      />
                    </div>

                    <div>
                      <label htmlFor="checkout-gstin-input" className="block text-[10px] font-bold uppercase tracking-wider text-[#555] mb-1">
                        GSTIN for Tax Invoice (Optional)
                      </label>
                      <input
                        id="checkout-gstin-input"
                        type="text"
                        placeholder="e.g. 07AAAAA0000A1Z5"
                        value={customer.gstin || ''}
                        onChange={(e) =>
                          setCustomer({ ...customer, gstin: e.target.value.toUpperCase() })
                        }
                        className="w-full bg-white border border-[#E5E2D9] rounded-xs p-2.5 text-xs uppercase focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Shipping Speed Selection */}
                  <div className="pt-2">
                    <div className="text-[10px] font-bold text-[#555] uppercase tracking-wider mb-2">
                      Select Pan-India Shipping Partner
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <button
                        type="button"
                        onClick={() => setShippingMethod('Express Pan-India (2-4 Days)')}
                        className={`p-3 rounded-xs border text-left transition ${
                          shippingMethod === 'Express Pan-India (2-4 Days)'
                            ? 'border-black bg-[#FAF5EE] ring-1 ring-black'
                            : 'border-[#E5E2D9] bg-white'
                        }`}
                      >
                        <div className="font-bold text-[#1A1A1A]">BlueDart Express Air (2-4 Days)</div>
                        <div className="text-[#8B4513] font-bold text-[10px] uppercase tracking-wider">Free Shipping</div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setShippingMethod('Priority Superfast Air (24-48 Hours)')}
                        className={`p-3 rounded-xs border text-left transition ${
                          shippingMethod === 'Priority Superfast Air (24-48 Hours)'
                            ? 'border-black bg-[#FAF5EE] ring-1 ring-black'
                            : 'border-[#E5E2D9] bg-white'
                        }`}
                      >
                        <div className="font-bold text-[#1A1A1A]">Priority Superfast Air (24-48h)</div>
                        <div className="text-[#8B4513] font-bold text-[10px] uppercase tracking-wider">+₹150 Next Flight</div>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right 5 cols: Order Summary Box */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="bg-white p-5 rounded-xs border border-[#E5E2D9] shadow-xs space-y-4 text-xs">
                    <div className="font-serif font-bold text-sm text-[#1A1A1A] border-b border-[#E5E2D9] pb-2 flex items-center justify-between">
                      <span>Order Summary ({cart.length} Suits)</span>
                      <span className="text-[#777] text-[10px] uppercase font-bold tracking-wider">Indian Delivery</span>
                    </div>

                    <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
                      {cart.map((item) => (
                        <div key={item.id} className="flex gap-2.5 items-center">
                          <div className="relative w-12 h-14 bg-[#EBE9E1] rounded-xs overflow-hidden shrink-0 border border-[#E5E2D9]">
                            <Image
                              src={item.product.images[0]}
                              alt={item.product.title}
                              fill
                              className="object-cover"
                              sizes="48px"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-bold text-[#8B4513] text-[9px] uppercase tracking-widest">
                              {item.product.brand}
                            </div>
                            <div className="font-serif font-semibold text-[#1A1A1A] truncate text-xs">
                              {item.product.title}
                            </div>
                            <div className="text-[10px] text-[#777]">
                              Qty: {item.quantity} •{' '}
                              {item.stitchingOption === 'unstitched'
                                ? 'Unstitched'
                                : `Stitched (${item.selectedSize || 'Custom'})`}
                            </div>
                          </div>
                          <div className="font-bold text-[#1A1A1A]">
                            {formatPrice(item.totalPrice)}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Price tally */}
                    <div className="pt-3 border-t border-[#F2F0E9] space-y-1.5 text-[#555]">
                      <div className="flex justify-between">
                        <span>Items Subtotal</span>
                        <span className="font-bold text-[#1A1A1A]">{formatPrice(cartSubtotal)}</span>
                      </div>
                      {cartStitchingTotal > 0 && (
                        <div className="flex justify-between">
                          <span>Custom Stitching & Tailoring</span>
                          <span className="font-bold text-[#8B4513]">+{formatPrice(cartStitchingTotal)}</span>
                        </div>
                      )}
                      {appliedCoupon && (
                        <div className="flex justify-between text-[#8B4513]">
                          <span>Coupon Discount ({appliedCoupon.code})</span>
                          <span className="font-bold">-{formatPrice(appliedCoupon.discountAmount)}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span>Pan-India Shipping</span>
                        <span className="font-bold text-[#8B4513]">
                          {shippingCost === 0 ? 'FREE' : formatPrice(shippingCost)}
                        </span>
                      </div>

                      <div className="flex justify-between items-baseline pt-2 border-t border-[#E5E2D9] text-sm">
                        <span className="font-bold text-[#1A1A1A]">Payable Amount</span>
                        <span className="text-base font-bold text-black font-serif">
                          {formatPrice(cartGrandTotal + shippingCost)}
                        </span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-black hover:bg-[#222] text-white font-bold uppercase tracking-widest py-3.5 px-4 rounded-xs shadow-xs flex items-center justify-center gap-2 text-xs transition"
                      id="continue-to-payment-btn"
                    >
                      <span>Continue to Payment</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </form>
          )}

          {/* STEP 2: REGIONAL INDIAN PAYMENT METHODS */}
          {step === 2 && (
            <form onSubmit={handleFinalPayment} className="space-y-6 animate-fadeIn">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left 7 cols: Payment Methods */}
                <div className="lg:col-span-7 space-y-4 text-xs">
                  <div className="flex items-center justify-between border-b border-[#E5E2D9] pb-2">
                    <div className="font-serif font-bold text-sm text-[#1A1A1A] flex items-center gap-2">
                      <Lock className="w-4 h-4 text-[#8B4513]" />
                      <span>Select Preferred Regional Payment Mode</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="text-xs text-[#8B4513] font-bold uppercase tracking-wider hover:underline"
                    >
                      ← Edit Address
                    </button>
                  </div>

                  {/* Payment Tabs (UPI, COD, Cards, NetBanking) */}
                  <div className="space-y-3">
                    {/* 1. UPI Payment Option */}
                    <div
                      onClick={() => setPaymentMethod('upi')}
                      className={`p-4 rounded-xs border transition cursor-pointer ${
                        paymentMethod === 'upi'
                          ? 'border-black bg-[#FAF5EE] ring-1 ring-black shadow-xs'
                          : 'border-[#E5E2D9] bg-white hover:bg-[#FAF9F6]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <input
                            type="radio"
                            name="paymentMethod"
                            checked={paymentMethod === 'upi'}
                            onChange={() => setPaymentMethod('upi')}
                            className="text-black focus:ring-black"
                          />
                          <div>
                            <div className="font-bold text-sm text-[#1A1A1A] flex items-center gap-2">
                              <span>UPI Instant Pay (GPay / PhonePe / Paytm / CRED)</span>
                              <span className="bg-[#EFECE6] border border-[#E5E2D9] text-[#8B4513] text-[9px] px-2 py-0.2 rounded-xs font-bold uppercase tracking-wider">
                                Extra 5% OFF
                              </span>
                            </div>
                            <div className="text-[11px] text-[#777]">
                              Fastest zero-charge payment directly from Indian bank accounts
                            </div>
                          </div>
                        </div>
                        <QrCode className="w-5 h-5 text-[#8B4513]" />
                      </div>

                      {paymentMethod === 'upi' && (
                        <div className="mt-4 pt-3 border-t border-[#E5E2D9] space-y-3 animate-fadeIn">
                          <div className="text-[10px] font-bold uppercase tracking-wider text-[#555]">
                            Select Your UPI App:
                          </div>
                          <div className="grid grid-cols-4 gap-2">
                            {[
                              { id: 'gpay', label: 'Google Pay' },
                              { id: 'phonepe', label: 'PhonePe' },
                              { id: 'paytm', label: 'Paytm UPI' },
                              { id: 'cred', label: 'CRED UPI' },
                            ].map((app) => (
                              <button
                                key={app.id}
                                type="button"
                                onClick={() => setSelectedUpiApp(app.id as typeof selectedUpiApp)}
                                className={`p-2 rounded-xs border text-center font-bold text-xs transition ${
                                  selectedUpiApp === app.id
                                    ? 'border-black bg-black text-white shadow-xs'
                                    : 'border-[#E5E2D9] bg-[#FAF9F6] text-[#1A1A1A]'
                                }`}
                              >
                                {app.label}
                              </button>
                            ))}
                          </div>

                          <div className="bg-[#FAF5EE] p-3 rounded-xs border border-[#E5E2D9] flex items-center justify-between">
                            <div className="space-y-0.5">
                              <div className="text-[10px] text-[#777] uppercase font-bold tracking-wider">Merchant UPI ID:</div>
                              <div className="font-mono font-bold text-xs text-[#1A1A1A]">
                                pehnavalawns@icici
                              </div>
                            </div>
                            <span className="text-[10px] font-bold text-[#8B4513] bg-[#EFECE6] border border-[#E5E2D9] px-2.5 py-1 rounded-xs uppercase tracking-wider">
                              Verified Merchant ✓
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* 2. Cash on Delivery (COD) */}
                    <div
                      onClick={() => setPaymentMethod('cod')}
                      className={`p-4 rounded-xs border transition cursor-pointer ${
                        paymentMethod === 'cod'
                          ? 'border-black bg-[#FAF5EE] ring-1 ring-black shadow-xs'
                          : 'border-[#E5E2D9] bg-white hover:bg-[#FAF9F6]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <input
                            type="radio"
                            name="paymentMethod"
                            checked={paymentMethod === 'cod'}
                            onChange={() => setPaymentMethod('cod')}
                            className="text-black focus:ring-black"
                          />
                          <div>
                            <div className="font-bold text-sm text-[#1A1A1A]">
                              Cash on Delivery (COD)
                            </div>
                            <div className="text-[11px] text-[#777]">
                              Pay cash or UPI to BlueDart courier agent at your doorstep
                            </div>
                          </div>
                        </div>
                        <Banknote className="w-5 h-5 text-[#8B4513]" />
                      </div>

                      {paymentMethod === 'cod' && (
                        <div className="mt-3 pt-3 border-t border-[#E5E2D9] text-[11px] text-[#555] space-y-2 animate-fadeIn">
                          <div className="bg-[#FAF5EE] p-2.5 rounded-xs border border-[#E5E2D9] text-[#8B4513] font-bold">
                            ✓ COD verified for pincode {customer.pincode} ({customer.city}). An SMS confirmation will be sent to +91 {customer.phone}.
                          </div>
                        </div>
                      )}
                    </div>

                    {/* 3. Debit & Credit Cards */}
                    <div
                      onClick={() => setPaymentMethod('card')}
                      className={`p-4 rounded-xs border transition cursor-pointer ${
                        paymentMethod === 'card'
                          ? 'border-black bg-[#FAF5EE] ring-1 ring-black shadow-xs'
                          : 'border-[#E5E2D9] bg-white hover:bg-[#FAF9F6]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <input
                            type="radio"
                            name="paymentMethod"
                            checked={paymentMethod === 'card'}
                            onChange={() => setPaymentMethod('card')}
                            className="text-black focus:ring-black"
                          />
                          <div>
                            <div className="font-bold text-sm text-[#1A1A1A]">
                              Credit / Debit Cards (RuPay, Visa, Master)
                            </div>
                            <div className="text-[11px] text-[#777]">
                              All Indian & International cards with 3D Secure OTP verification
                            </div>
                          </div>
                        </div>
                        <CreditCard className="w-5 h-5 text-[#8B4513]" />
                      </div>
                    </div>

                    {/* 4. NetBanking */}
                    <div
                      onClick={() => setPaymentMethod('netbanking')}
                      className={`p-4 rounded-xs border transition cursor-pointer ${
                        paymentMethod === 'netbanking'
                          ? 'border-black bg-[#FAF5EE] ring-1 ring-black shadow-xs'
                          : 'border-[#E5E2D9] bg-white hover:bg-[#FAF9F6]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <input
                            type="radio"
                            name="paymentMethod"
                            checked={paymentMethod === 'netbanking'}
                            onChange={() => setPaymentMethod('netbanking')}
                            className="text-black focus:ring-black"
                          />
                          <div>
                            <div className="font-bold text-sm text-[#1A1A1A]">
                              Indian NetBanking (SBI, HDFC, ICICI, Axis, Kotak)
                            </div>
                            <div className="text-[11px] text-[#777]">
                              Direct net banking access to 50+ Indian commercial banks
                            </div>
                          </div>
                        </div>
                        <Building className="w-5 h-5 text-[#8B4513]" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right 5 cols: Final Review & Pay Button */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="bg-white p-5 rounded-xs border border-[#E5E2D9] shadow-xs space-y-4 text-xs">
                    <div className="font-serif font-bold text-sm text-[#1A1A1A] border-b border-[#E5E2D9] pb-2">
                      Final Payment Amount
                    </div>

                    <div className="space-y-1.5 text-[#555]">
                      <div className="flex justify-between">
                        <span>Items Subtotal</span>
                        <span className="font-semibold text-[#1A1A1A]">{formatPrice(cartSubtotal)}</span>
                      </div>
                      {cartStitchingTotal > 0 && (
                        <div className="flex justify-between">
                          <span>Custom Stitching</span>
                          <span className="font-semibold text-[#8B4513]">+{formatPrice(cartStitchingTotal)}</span>
                        </div>
                      )}
                      {appliedCoupon && (
                        <div className="flex justify-between text-[#8B4513]">
                          <span>Coupon Discount ({appliedCoupon.code})</span>
                          <span className="font-bold">-{formatPrice(appliedCoupon.discountAmount)}</span>
                        </div>
                      )}
                      {upiInstantDiscount > 0 && (
                        <div className="flex justify-between text-[#8B4513] font-bold">
                          <span>UPI Instant 5% Discount</span>
                          <span>-{formatPrice(upiInstantDiscount)}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span>Pan-India BlueDart Shipping</span>
                        <span className="font-bold text-[#8B4513]">
                          {shippingCost === 0 ? 'FREE' : formatPrice(shippingCost)}
                        </span>
                      </div>

                      <div className="flex justify-between items-baseline pt-2 border-t border-[#E5E2D9] text-sm">
                        <span className="font-bold text-[#1A1A1A]">Total Amount</span>
                        <span className="text-lg font-bold text-black font-serif">
                          {formatPrice(finalPayable)}
                        </span>
                      </div>
                    </div>

                    {/* Delivery summary snippet */}
                    <div className="bg-[#FAF5EE] p-3 rounded-xs border border-[#E5E2D9] space-y-1 text-[11px] text-[#777]">
                      <div>
                        <strong className="text-black">Shipping to:</strong> {customer.fullName}, {customer.city} - {customer.pincode}
                      </div>
                      <div>
                        <strong className="text-black">Phone:</strong> +91 {customer.phone}
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="w-full bg-black hover:bg-[#222] text-white font-bold uppercase tracking-widest py-3.5 px-4 rounded-xs shadow-xs flex items-center justify-center gap-2 text-xs transition disabled:opacity-50"
                      id="place-order-pay-btn"
                    >
                      {isProcessing ? (
                        <span>Processing Order...</span>
                      ) : (
                        <span>
                          {paymentMethod === 'cod'
                            ? `Confirm COD Order • ${formatPrice(finalPayable)}`
                            : `Pay Securely • ${formatPrice(finalPayable)}`}
                        </span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          )}

          {/* STEP 3: ORDER CONFIRMATION & INVOICE */}
          {step === 3 && confirmedOrder && (
            <div className="space-y-6 text-center py-4 animate-fadeIn">
              <div className="w-14 h-14 bg-[#FAF5EE] border border-[#E5E2D9] text-[#8B4513] rounded-xs flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 className="w-8 h-8 text-[#8B4513]" />
              </div>

              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 bg-[#FAF5EE] text-[#8B4513] px-3 py-1 rounded-xs text-[10px] font-bold uppercase tracking-wider border border-[#E5E2D9]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Order Confirmed & Payment Verified</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1A1A1A] pt-1">
                  Thank You, {confirmedOrder.customer.fullName}!
                </h2>
                <p className="text-xs sm:text-sm text-[#777] max-w-lg mx-auto">
                  Your order <strong>#{confirmedOrder.id}</strong> has been registered. We have sent tracking SMS and WhatsApp updates to <strong>+91 {confirmedOrder.customer.phone}</strong>.
                </p>
              </div>

              {/* Order Quick Summary Card */}
              <div className="max-w-xl mx-auto bg-white p-5 rounded-xs border border-[#E5E2D9] shadow-xs text-left text-xs space-y-3">
                <div className="flex justify-between items-center border-b border-[#E5E2D9] pb-2.5">
                  <div>
                    <div className="text-[9px] text-[#777] uppercase font-bold tracking-widest">BlueDart Express AWB Tracking</div>
                    <div className="font-mono font-bold text-sm text-[#8B4513]">
                      {confirmedOrder.trackingNumber}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[9px] text-[#777] uppercase font-bold tracking-widest">Estimated Delivery</div>
                    <div className="font-bold text-xs text-[#1A1A1A]">
                      {confirmedOrder.estimatedDelivery}
                    </div>
                  </div>
                </div>

                {/* Items */}
                <div className="space-y-2">
                  <div className="text-[10px] font-bold text-[#777] uppercase tracking-wider">Suits Ordered:</div>
                  {confirmedOrder.items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center text-xs">
                      <div>
                        <strong className="font-serif">{item.product.brand}:</strong> {item.product.title} (x{item.quantity})
                        <div className="text-[10px] text-[#777]">
                          {item.stitchingOption === 'unstitched' ? 'Unstitched 3-Piece' : `Stitched (${item.selectedSize})`}
                        </div>
                      </div>
                      <span className="font-bold text-[#1A1A1A]">{formatPrice(item.totalPrice)}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-[#E5E2D9] flex justify-between items-center font-bold text-sm">
                  <span>Grand Total Paid:</span>
                  <span className="text-black font-serif">{formatPrice(confirmedOrder.grandTotal)}</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => {
                    closeModals();
                    openOrderTracking(confirmedOrder.id);
                  }}
                  className="bg-black hover:bg-[#222] text-white font-bold uppercase tracking-widest text-xs px-6 py-3 rounded-xs shadow-xs flex items-center gap-2 transition"
                >
                  <Package className="w-4 h-4 text-white" />
                  <span>Track Live BlueDart Shipment</span>
                </button>

                <button
                  onClick={closeModals}
                  className="bg-[#FAF5EE] hover:bg-[#EBE7DF] text-[#1A1A1A] font-bold uppercase tracking-wider text-xs px-6 py-3 rounded-xs border border-[#E5E2D9] transition"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
