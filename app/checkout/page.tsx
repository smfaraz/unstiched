'use client';

import React, { useState } from 'react';
import { useEcommerce } from '@/context/EcommerceContext';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ShieldCheck,
  Truck,
  CheckCircle2,
  Lock,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Scissors,
  CreditCard,
  QrCode,
  Banknote,
  Building2,
  Tag,
  Gift,
  ArrowLeft,
} from 'lucide-react';
import { CustomerDetails } from '@/types/ecommerce';

export default function CheckoutPage() {
  const router = useRouter();
  const {
    cart,
    cartCount,
    cartSubtotal,
    cartStitchingTotal,
    cartGrandTotal,
    bundleDiscountPercent,
    bundleDiscountAmount,
    formatPrice,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    createOrder,
    checkPincodeDelivery,
  } = useEcommerce();

  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form State
  const [formData, setFormData] = useState<CustomerDetails>({
    fullName: '',
    email: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    landmark: '',
    city: '',
    state: '',
    pincode: '',
    gstin: '',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [pincodeStatus, setPincodeStatus] = useState<string>('');

  // Shipping & Gift
  const [shippingMethod, setShippingMethod] = useState<
    'Express Pan-India (2-4 Days)' | 'Priority Superfast Air (24-48 Hours)' | 'Custom Tailoring Dispatch'
  >('Express Pan-India (2-4 Days)');
  const [giftWrap, setGiftWrap] = useState(false);
  const [giftMessage, setGiftMessage] = useState('');

  // Payment
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'cod' | 'card' | 'netbanking'>('upi');
  const [upiApp, setUpiApp] = useState<'gpay' | 'phonepe' | 'paytm' | 'qr'>('qr');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
  });
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');
  const [codOtpSent, setCodOtpSent] = useState(false);
  const [codOtp, setCodOtp] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderStage, setOrderStage] = useState<number>(1);

  // Coupon state
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  // Pincode auto-lookup
  const handlePincodeChange = (pincode: string) => {
    const clean = pincode.replace(/\D/g, '').slice(0, 6);
    setFormData((prev) => ({ ...prev, pincode: clean }));

    if (clean.length === 6) {
      const info = checkPincodeDelivery(clean);
      setFormData((prev) => ({
        ...prev,
        city: info.city,
        state: info.state,
      }));
      setPincodeStatus(`✓ Serviced by BlueDart Express: ${info.city}, ${info.state} (${info.estimatedDays})`);
      if (formErrors.pincode) {
        setFormErrors((prev) => {
          const next = { ...prev };
          delete next.pincode;
          return next;
        });
      }
    } else {
      setPincodeStatus('');
    }
  };

  const validateStep1 = () => {
    const errors: Record<string, string> = {};
    if (!formData.fullName.trim()) errors.fullName = 'Full name is required';
    if (!formData.email.trim() || !formData.email.includes('@')) errors.email = 'Valid email is required';
    if (!formData.phone.trim() || formData.phone.replace(/\D/g, '').length < 10) {
      errors.phone = 'Valid 10-digit Indian phone number is required';
    }
    if (!formData.addressLine1.trim()) errors.addressLine1 = 'Street address is required';
    if (!formData.pincode.trim() || formData.pincode.length !== 6) errors.pincode = 'Valid 6-digit Pincode is required';
    if (!formData.city.trim()) errors.city = 'City is required';
    if (!formData.state.trim()) errors.state = 'State is required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput.trim());
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponError('');
      setCouponInput('');
    }
  };

  const handlePlaceOrder = () => {
    if (!validateStep1()) {
      setStep(1);
      return;
    }

    if (paymentMethod === 'cod' && !codOtpSent) {
      setCodOtpSent(true);
      return;
    }

    setIsSubmitting(true);
    setOrderStage(1);

    // Staged psychological authorization steps
    setTimeout(() => setOrderStage(2), 500);
    setTimeout(() => setOrderStage(3), 1000);
    setTimeout(() => {
      setOrderStage(4);
      try {
        const order = createOrder({
          customer: formData,
          paymentMethod,
          shippingMethod,
          upiDetails: paymentMethod === 'upi' ? { app: upiApp, transactionRef: `UPI-REF-${Date.now().toString().slice(-6)}` } : undefined,
          giftWrap,
          giftMessage: giftWrap ? giftMessage : undefined,
        });

        setTimeout(() => {
          router.push(`/order-confirmation/${order.id}`);
        }, 600);
      } catch (err) {
        console.error(err);
        setIsSubmitting(false);
      }
    }, 1500);
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-[#FAF5EE] flex items-center justify-center mx-auto text-[#8B4513] border border-[#E8DFC8]">
          <Lock className="w-8 h-8" />
        </div>
        <h1 className="font-serif text-3xl font-bold text-black">Your Shopping Bag is Empty</h1>
        <p className="text-xs text-[#666] max-w-md mx-auto">
          Please add Pakistani designer lawn or couture pieces to your shopping bag before proceeding to checkout.
        </p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 bg-black text-white px-8 py-3.5 rounded-xs text-xs font-bold uppercase tracking-widest hover:bg-[#2A2A2A] transition"
        >
          <span>Explore 2026 Collection</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] py-3 sm:py-8">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 space-y-4 sm:space-y-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-[10.5px] sm:text-xs text-[#888] overflow-x-auto no-scrollbar whitespace-nowrap">
          <Link href="/" className="hover:text-black transition">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 text-[#AAA]" />
          <Link href="/cart" className="hover:text-black transition">
            Bag
          </Link>
          <ChevronRight className="w-3 h-3 text-[#AAA]" />
          <span className="text-black font-semibold">Express Secure Checkout</span>
        </nav>

        {/* Step Indicator */}
        <div className="bg-white border border-[#E5E2D9] rounded-xs p-4 sm:p-6 shadow-xs">
          <div className="grid grid-cols-3 gap-2 sm:gap-4 max-w-2xl mx-auto">
            <button
              onClick={() => setStep(1)}
              className={`flex items-center gap-2 pb-2 text-xs font-bold uppercase tracking-wider border-b-2 transition ${
                step === 1
                  ? 'border-[#8B4513] text-[#8B4513]'
                  : 'border-transparent text-[#888] hover:text-black'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-[#FAF5EE] border border-[#E8DFC8] flex items-center justify-center text-[10px]">
                1
              </span>
              <span className="truncate">Shipping Address</span>
            </button>

            <button
              onClick={() => {
                if (validateStep1()) setStep(2);
              }}
              className={`flex items-center gap-2 pb-2 text-xs font-bold uppercase tracking-wider border-b-2 transition ${
                step === 2
                  ? 'border-[#8B4513] text-[#8B4513]'
                  : 'border-transparent text-[#888] hover:text-black'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-[#FAF5EE] border border-[#E8DFC8] flex items-center justify-center text-[10px]">
                2
              </span>
              <span className="truncate">Tailoring & Review</span>
            </button>

            <button
              onClick={() => {
                if (validateStep1()) setStep(3);
              }}
              className={`flex items-center gap-2 pb-2 text-xs font-bold uppercase tracking-wider border-b-2 transition ${
                step === 3
                  ? 'border-[#8B4513] text-[#8B4513]'
                  : 'border-transparent text-[#888] hover:text-black'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-[#FAF5EE] border border-[#E8DFC8] flex items-center justify-center text-[10px]">
                3
              </span>
              <span className="truncate">Payment</span>
            </button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Flow Column */}
          <div className="lg:col-span-8 space-y-6">
            {/* Step 1: Customer Details & Shipping Address */}
            {step === 1 && (
              <div className="bg-white border border-[#E5E2D9] rounded-xs p-6 space-y-6 shadow-xs animate-fadeIn">
                <div className="border-b border-[#E5E2D9] pb-4 flex items-center justify-between">
                  <div>
                    <h2 className="font-serif text-xl font-bold text-[#1A1A1A]">
                      1. Contact & Delivery Address
                    </h2>
                    <p className="text-xs text-[#666] mt-0.5">
                      Pan-India express delivery with real-time SMS tracking updates.
                    </p>
                  </div>
                  <div className="hidden sm:flex items-center gap-1 text-[11px] text-[#2E7D32] bg-[#E8F5E9] px-2.5 py-1 rounded-xs font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>256-Bit SSL Encrypted</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#555]">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Ayesha Sharma"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className={`w-full bg-[#FAF9F6] border ${
                        formErrors.fullName ? 'border-[#DC2626]' : 'border-[#E5E2D9]'
                      } rounded-xs px-3.5 py-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-black`}
                    />
                    {formErrors.fullName && (
                      <span className="text-[10px] text-[#DC2626] font-medium">{formErrors.fullName}</span>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#555]">
                      Email Address (for invoice) *
                    </label>
                    <input
                      type="email"
                      placeholder="ayesha@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full bg-[#FAF9F6] border ${
                        formErrors.email ? 'border-[#DC2626]' : 'border-[#E5E2D9]'
                      } rounded-xs px-3.5 py-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-black`}
                    />
                    {formErrors.email && (
                      <span className="text-[10px] text-[#DC2626] font-medium">{formErrors.email}</span>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#555]">
                      10-Digit Mobile Number (for BlueDart delivery OTP) *
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 text-xs bg-[#EBE9E1] border border-r-0 border-[#E5E2D9] rounded-l-xs text-[#555] font-semibold">
                        +91
                      </span>
                      <input
                        type="tel"
                        placeholder="9876543210"
                        maxLength={10}
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })
                        }
                        className={`w-full bg-[#FAF9F6] border ${
                          formErrors.phone ? 'border-[#DC2626]' : 'border-[#E5E2D9]'
                        } rounded-r-xs px-3.5 py-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-black`}
                      />
                    </div>
                    {formErrors.phone && (
                      <span className="text-[10px] text-[#DC2626] font-medium">{formErrors.phone}</span>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#555]">
                      6-Digit Indian Pincode *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 110001 or 400050"
                      maxLength={6}
                      value={formData.pincode}
                      onChange={(e) => handlePincodeChange(e.target.value)}
                      className={`w-full bg-[#FAF9F6] border ${
                        formErrors.pincode ? 'border-[#DC2626]' : 'border-[#E5E2D9]'
                      } rounded-xs px-3.5 py-2.5 text-xs text-[#1A1A1A] font-semibold focus:outline-none focus:border-black`}
                    />
                    {pincodeStatus && (
                      <span className="text-[10px] text-[#2E7D32] font-semibold block">
                        {pincodeStatus}
                      </span>
                    )}
                    {formErrors.pincode && (
                      <span className="text-[10px] text-[#DC2626] font-medium">{formErrors.pincode}</span>
                    )}
                  </div>

                  <div className="sm:col-span-2 space-y-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#555]">
                      House / Flat / Building / Street Address *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Flat 402, Royal Palms, Linking Road"
                      value={formData.addressLine1}
                      onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
                      className={`w-full bg-[#FAF9F6] border ${
                        formErrors.addressLine1 ? 'border-[#DC2626]' : 'border-[#E5E2D9]'
                      } rounded-xs px-3.5 py-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-black`}
                    />
                    {formErrors.addressLine1 && (
                      <span className="text-[10px] text-[#DC2626] font-medium">
                        {formErrors.addressLine1}
                      </span>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#555]">
                      Landmark (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Near City Mall"
                      value={formData.landmark || ''}
                      onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
                      className="w-full bg-[#FAF9F6] border border-[#E5E2D9] rounded-xs px-3.5 py-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-black"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-[#555]">
                        City *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Mumbai"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full bg-[#FAF9F6] border border-[#E5E2D9] rounded-xs px-3 py-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-black"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-[#555]">
                        State *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Maharashtra"
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        className="w-full bg-[#FAF9F6] border border-[#E5E2D9] rounded-xs px-3 py-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-black"
                      />
                    </div>
                  </div>
                </div>

                {/* Shipping Method Selector */}
                <div className="space-y-3 pt-4 border-t border-[#E5E2D9]">
                  <label className="text-xs font-bold uppercase tracking-wider text-black flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-[#8B4513]" />
                    <span>Select Shipping Speed</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <label
                      className={`p-3.5 rounded-xs border cursor-pointer flex items-start gap-3 transition ${
                        shippingMethod === 'Express Pan-India (2-4 Days)'
                          ? 'border-[#8B4513] bg-[#FAF5EE]'
                          : 'border-[#E5E2D9] bg-white'
                      }`}
                    >
                      <input
                        type="radio"
                        name="shippingMethod"
                        checked={shippingMethod === 'Express Pan-India (2-4 Days)'}
                        onChange={() => setShippingMethod('Express Pan-India (2-4 Days)')}
                        className="mt-1 accent-[#8B4513]"
                      />
                      <div className="space-y-0.5 text-xs">
                        <div className="font-bold text-[#1A1A1A]">BlueDart Express (2-4 Days)</div>
                        <div className="text-[11px] text-[#666]">Standard Pan-India Air Cargo</div>
                        <div className="text-[11px] font-bold text-[#2E7D32] uppercase">Free Shipping</div>
                      </div>
                    </label>

                    <label
                      className={`p-3.5 rounded-xs border cursor-pointer flex items-start gap-3 transition ${
                        shippingMethod === 'Priority Superfast Air (24-48 Hours)'
                          ? 'border-[#8B4513] bg-[#FAF5EE]'
                          : 'border-[#E5E2D9] bg-white'
                      }`}
                    >
                      <input
                        type="radio"
                        name="shippingMethod"
                        checked={shippingMethod === 'Priority Superfast Air (24-48 Hours)'}
                        onChange={() => setShippingMethod('Priority Superfast Air (24-48 Hours)')}
                        className="mt-1 accent-[#8B4513]"
                      />
                      <div className="space-y-0.5 text-xs">
                        <div className="font-bold text-[#1A1A1A]">Priority Next-Day Air (24-48h)</div>
                        <div className="text-[11px] text-[#666]">Metro & Tier-1 cities express flight</div>
                        <div className="text-[11px] font-bold text-[#8B4513]">+₹199 Flat Fee</div>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      if (validateStep1()) setStep(2);
                    }}
                    className="bg-black hover:bg-[#2A2A2A] text-white text-xs font-bold uppercase tracking-widest px-8 py-3.5 rounded-xs transition flex items-center gap-2"
                  >
                    <span>Continue to Tailoring & Review</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Tailoring Review & Gift Wrap */}
            {step === 2 && (
              <div className="bg-white border border-[#E5E2D9] rounded-xs p-6 space-y-6 shadow-xs animate-fadeIn">
                <div className="border-b border-[#E5E2D9] pb-4 flex items-center justify-between">
                  <div>
                    <h2 className="font-serif text-xl font-bold text-[#1A1A1A]">
                      2. Tailoring Specifications & Gift Box
                    </h2>
                    <p className="text-xs text-[#666] mt-0.5">
                      Verify stitching preferences, measurements, and add complimentary gift notes.
                    </p>
                  </div>
                </div>

                {/* Items Tailoring Review */}
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 bg-[#FAF9F6] border border-[#E5E2D9] rounded-xs flex flex-col sm:flex-row gap-4 justify-between items-start"
                    >
                      <div className="flex gap-3">
                        <div className="relative w-16 aspect-3/4 rounded-xs overflow-hidden bg-[#EBE9E1] shrink-0 border border-[#E5E2D9]">
                          <Image
                            src={item.product.images[0]}
                            alt={item.product.title}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        </div>
                        <div className="space-y-1">
                          <div className="text-[10px] font-bold uppercase tracking-widest text-[#8B4513]">
                            {item.product.brand}
                          </div>
                          <div className="text-xs font-bold text-black">{item.product.title}</div>
                          <div className="text-xs text-[#666]">Quantity: {item.quantity}</div>
                        </div>
                      </div>

                      {/* Tailoring Badge */}
                      <div className="text-xs space-y-1 text-right">
                        {item.stitchingOption === 'unstitched' && (
                          <span className="inline-block bg-white border border-[#E5E2D9] px-2.5 py-1 rounded-xs text-[11px] font-semibold text-[#555]">
                            3-Piece Unstitched Fabric
                          </span>
                        )}
                        {item.stitchingOption === 'stitched_standard' && (
                          <div className="space-y-1">
                            <span className="inline-flex items-center gap-1 bg-[#FAF5EE] border border-[#E8DFC8] px-2.5 py-1 rounded-xs text-[11px] font-bold text-[#8B4513]">
                              <Scissors className="w-3 h-3" />
                              <span>Standard Stitched ({item.selectedSize})</span>
                            </span>
                            <div className="text-[10px] text-[#777]">
                              Boutique Master Tailored (+{formatPrice(item.stitchingPrice)})
                            </div>
                          </div>
                        )}
                        {item.stitchingOption === 'stitched_custom' && (
                          <div className="space-y-1 text-left sm:text-right">
                            <span className="inline-flex items-center gap-1 bg-[#FAF5EE] border border-[#E8DFC8] px-2.5 py-1 rounded-xs text-[11px] font-bold text-[#8B4513]">
                              <Sparkles className="w-3 h-3" />
                              <span>Bespoke Made-to-Measure</span>
                            </span>
                            {item.customMeasurements && (
                              <div className="text-[10px] text-[#666] bg-white p-2 rounded-xs border border-[#E5E2D9] max-w-xs">
                                <div>Bust: {item.customMeasurements.bust}&quot; | Waist: {item.customMeasurements.waist}&quot; | Hip: {item.customMeasurements.hip}&quot;</div>
                                <div>Trouser: {item.customMeasurements.trouserStyle}</div>
                                <div>Neckline: {item.customMeasurements.necklineStyle}</div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Gift Option */}
                <div className="p-4 bg-[#FAF5EE] border border-[#E8DFC8] rounded-xs space-y-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={giftWrap}
                      onChange={(e) => setGiftWrap(e.target.checked)}
                      className="accent-[#8B4513] rounded-xs w-4 h-4"
                    />
                    <span className="text-xs font-bold text-[#1A1A1A] flex items-center gap-1.5">
                      <Gift className="w-4 h-4 text-[#8B4513]" />
                      <span>Complimentary Luxury Ribbon Packaging & Handwritten Card</span>
                    </span>
                  </label>
                  {giftWrap && (
                    <div className="pt-2 animate-fadeIn space-y-1">
                      <textarea
                        rows={2}
                        placeholder="Write your custom gift message (e.g. Happy Eid / Happy Wedding Ayesha!)..."
                        value={giftMessage}
                        onChange={(e) => setGiftMessage(e.target.value)}
                        className="w-full bg-white border border-[#E8DFC8] rounded-xs p-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-black"
                      />
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-[#E5E2D9]">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-xs font-bold uppercase tracking-wider text-[#666] hover:text-black flex items-center gap-1"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Address</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="bg-black hover:bg-[#2A2A2A] text-white text-xs font-bold uppercase tracking-widest px-8 py-3.5 rounded-xs transition flex items-center gap-2"
                  >
                    <span>Proceed to Payment</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Payment Options */}
            {step === 3 && (
              <div className="bg-white border border-[#E5E2D9] rounded-xs p-6 space-y-6 shadow-xs animate-fadeIn">
                <div className="border-b border-[#E5E2D9] pb-4 flex items-center justify-between">
                  <div>
                    <h2 className="font-serif text-xl font-bold text-[#1A1A1A]">
                      3. Select Secure Payment Method
                    </h2>
                    <p className="text-xs text-[#666] mt-0.5">
                      All regional Indian payments and Cash on Delivery supported.
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-[#2E7D32] bg-[#E8F5E9] px-2.5 py-1 rounded-xs font-semibold">
                    <Lock className="w-3 h-3" />
                    <span>Instant Verification</span>
                  </div>
                </div>

                {/* Payment Method Selector Tabs */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`p-3.5 rounded-xs border text-left transition flex flex-col justify-between gap-2 ${
                      paymentMethod === 'upi'
                        ? 'border-[#8B4513] bg-[#FAF5EE] shadow-xs'
                        : 'border-[#E5E2D9] bg-white hover:border-[#CCC]'
                    }`}
                  >
                    <QrCode className="w-5 h-5 text-[#8B4513]" />
                    <div>
                      <div className="text-xs font-bold text-black">UPI / QR Code</div>
                      <div className="text-[10px] text-[#666]">GPay, PhonePe, Paytm</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-3.5 rounded-xs border text-left transition flex flex-col justify-between gap-2 ${
                      paymentMethod === 'cod'
                        ? 'border-[#8B4513] bg-[#FAF5EE] shadow-xs'
                        : 'border-[#E5E2D9] bg-white hover:border-[#CCC]'
                    }`}
                  >
                    <Banknote className="w-5 h-5 text-[#8B4513]" />
                    <div>
                      <div className="text-xs font-bold text-black">Cash on Delivery</div>
                      <div className="text-[10px] text-[#666]">Pay cash at doorstep</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3.5 rounded-xs border text-left transition flex flex-col justify-between gap-2 ${
                      paymentMethod === 'card'
                        ? 'border-[#8B4513] bg-[#FAF5EE] shadow-xs'
                        : 'border-[#E5E2D9] bg-white hover:border-[#CCC]'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 text-[#8B4513]" />
                    <div>
                      <div className="text-xs font-bold text-black">Cards (Debit/Credit)</div>
                      <div className="text-[10px] text-[#666]">Visa, Master, RuPay</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('netbanking')}
                    className={`p-3.5 rounded-xs border text-left transition flex flex-col justify-between gap-2 ${
                      paymentMethod === 'netbanking'
                        ? 'border-[#8B4513] bg-[#FAF5EE] shadow-xs'
                        : 'border-[#E5E2D9] bg-white hover:border-[#CCC]'
                    }`}
                  >
                    <Building2 className="w-5 h-5 text-[#8B4513]" />
                    <div>
                      <div className="text-xs font-bold text-black">NetBanking</div>
                      <div className="text-[10px] text-[#666]">50+ Indian Banks</div>
                    </div>
                  </button>
                </div>

                {/* Method Specific Panels */}
                {paymentMethod === 'upi' && (
                  <div className="p-5 bg-[#FAF9F6] border border-[#E5E2D9] rounded-xs space-y-4 animate-fadeIn">
                    <div className="flex flex-col sm:flex-row items-center gap-6 justify-between">
                      <div className="space-y-2 text-center sm:text-left">
                        <div className="text-xs font-bold text-black uppercase tracking-wider">
                          Scan to Pay via Any UPI App
                        </div>
                        <p className="text-[11px] text-[#666] max-w-sm">
                          Open Google Pay, PhonePe, Paytm, or BHIM on your mobile phone to scan the merchant QR code.
                        </p>
                        <div className="inline-block bg-[#E8F5E9] text-[#2E7D32] px-3 py-1 rounded-xs text-[10px] font-bold">
                          Merchant VPA: pehnavalawns.luxury@icici
                        </div>
                      </div>

                      {/* Mock Dynamic QR Code */}
                      <div className="bg-white p-3 border border-[#E5E2D9] rounded-xs shadow-xs text-center space-y-1">
                        <div className="w-36 h-36 bg-[#1A1A1A] rounded-xs flex items-center justify-center p-2 text-white">
                          <QrCode className="w-28 h-28 text-white" />
                        </div>
                        <span className="text-[9px] font-bold text-[#8B4513] uppercase tracking-widest">
                          Amount: {formatPrice(cartGrandTotal)}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'cod' && (
                  <div className="p-5 bg-[#FAF9F6] border border-[#E5E2D9] rounded-xs space-y-4 animate-fadeIn">
                    <div className="space-y-2">
                      <div className="text-xs font-bold text-black uppercase tracking-wider flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-[#8B4513]" />
                        <span>Cash on Delivery (COD) Pan-India</span>
                      </div>
                      <p className="text-[11px] text-[#666] leading-relaxed">
                        Pay cash or scan QR at your doorstep when the BlueDart executive arrives. A mobile OTP will be verified to confirm your booking.
                      </p>
                    </div>

                    {!codOtpSent ? (
                      <div className="bg-[#FAF5EE] border border-[#E8DFC8] p-3 rounded-xs flex items-center justify-between text-xs">
                        <span className="text-[#8B4513] font-semibold">
                          Click below to simulate SMS verification OTP for {formData.phone || 'your phone'}
                        </span>
                      </div>
                    ) : (
                      <div className="space-y-2 bg-[#E8F5E9] border border-[#C8E6C9] p-3 rounded-xs">
                        <div className="text-xs font-bold text-[#2E7D32]">
                          OTP sent to +91 {formData.phone || '9876543210'} (Use mock OTP: 7890)
                        </div>
                        <input
                          type="text"
                          placeholder="Enter 4-digit OTP"
                          maxLength={4}
                          value={codOtp}
                          onChange={(e) => setCodOtp(e.target.value)}
                          className="bg-white border border-[#C8E6C9] rounded-xs px-3 py-2 text-xs font-bold w-36 tracking-widest text-center"
                        />
                      </div>
                    )}
                  </div>
                )}

                {paymentMethod === 'card' && (
                  <div className="p-5 bg-[#FAF9F6] border border-[#E5E2D9] rounded-xs space-y-4 animate-fadeIn">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="sm:col-span-2 space-y-1">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-[#555]">
                          Card Number
                        </label>
                        <input
                          type="text"
                          placeholder="4532 •••• •••• 8892"
                          maxLength={19}
                          value={cardDetails.cardNumber}
                          onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })}
                          className="w-full bg-white border border-[#E5E2D9] rounded-xs px-3 py-2 text-xs font-semibold focus:outline-none focus:border-black"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-[#555]">
                          Cardholder Name
                        </label>
                        <input
                          type="text"
                          placeholder="Ayesha Sharma"
                          value={cardDetails.cardName}
                          onChange={(e) => setCardDetails({ ...cardDetails, cardName: e.target.value })}
                          className="w-full bg-white border border-[#E5E2D9] rounded-xs px-3 py-2 text-xs focus:outline-none focus:border-black"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-1">
                          <label className="text-[11px] font-bold uppercase tracking-wider text-[#555]">
                            Expiry
                          </label>
                          <input
                            type="text"
                            placeholder="MM/YY"
                            maxLength={5}
                            value={cardDetails.expiry}
                            onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                            className="w-full bg-white border border-[#E5E2D9] rounded-xs px-3 py-2 text-xs focus:outline-none focus:border-black"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[11px] font-bold uppercase tracking-wider text-[#555]">
                            CVV
                          </label>
                          <input
                            type="password"
                            placeholder="•••"
                            maxLength={4}
                            value={cardDetails.cvv}
                            onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                            className="w-full bg-white border border-[#E5E2D9] rounded-xs px-3 py-2 text-xs focus:outline-none focus:border-black"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'netbanking' && (
                  <div className="p-5 bg-[#FAF9F6] border border-[#E5E2D9] rounded-xs space-y-4 animate-fadeIn">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#555] block">
                      Select Popular Bank
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {['HDFC Bank', 'ICICI Bank', 'State Bank of India', 'Axis Bank', 'Kotak Mahindra', 'Punjab National Bank'].map((bank) => (
                        <button
                          key={bank}
                          type="button"
                          onClick={() => setSelectedBank(bank)}
                          className={`p-2.5 rounded-xs border text-xs font-semibold text-left transition ${
                            selectedBank === bank
                              ? 'border-black bg-white shadow-xs font-bold'
                              : 'border-[#E5E2D9] bg-white text-[#666]'
                          }`}
                        >
                          {bank}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Final Confirmation Button */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-[#E5E2D9]">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="text-xs font-bold uppercase tracking-wider text-[#666] hover:text-black flex items-center gap-1"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Tailoring</span>
                  </button>

                  <button
                    type="button"
                    onClick={handlePlaceOrder}
                    disabled={isSubmitting}
                    className="w-full sm:w-auto bg-[#8B4513] hover:bg-[#72380F] text-white text-xs font-bold uppercase tracking-widest px-10 py-4 rounded-xs transition shadow-md flex items-center justify-center gap-2"
                    id="place-order-submit-btn"
                  >
                    <Lock className="w-4 h-4" />
                    <span>
                      {isSubmitting ? 'Securing Order...' : `Authorize & Place Order (${formatPrice(cartGrandTotal)})`}
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Order Summary Sidebar */}
          <div className="lg:col-span-4 bg-white border border-[#E5E2D9] rounded-xs p-6 space-y-6 shadow-xs sticky top-24">
            <h3 className="font-serif font-bold text-lg text-black border-b border-[#E5E2D9] pb-3">
              Order Breakdown
            </h3>

            {/* Item summary */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-3 text-xs">
                  <div className="relative w-12 aspect-3/4 bg-[#EBE9E1] rounded-xs overflow-hidden shrink-0 border border-[#E5E2D9]">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.title}
                      fill
                      className="object-cover"
                      sizes="50px"
                    />
                  </div>
                  <div className="flex-1 space-y-0.5">
                    <div className="font-serif font-bold text-black line-clamp-1">
                      {item.product.title}
                    </div>
                    <div className="text-[10px] text-[#777]">
                      Qty: {item.quantity} × {formatPrice(item.unitPrice)}
                    </div>
                    <div className="text-[10px] font-semibold text-[#8B4513]">
                      {item.stitchingOption === 'unstitched' ? '3-Piece Unstitched' : `Stitched: ${item.selectedSize || 'Custom'}`}
                    </div>
                  </div>
                  <div className="font-bold text-black">{formatPrice(item.totalPrice)}</div>
                </div>
              ))}
            </div>

            {/* Coupon Application */}
            <div className="space-y-2 pt-2 border-t border-[#E5E2D9]">
              <label className="text-[10px] font-bold uppercase tracking-widest text-[#777] flex items-center gap-1">
                <Tag className="w-3 h-3 text-[#8B4513]" />
                <span>Coupon Code</span>
              </label>

              {appliedCoupon ? (
                <div className="bg-[#FAF5EE] border border-[#E8DFC8] p-2.5 rounded-xs flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-[#8B4513]">Code Applied: {appliedCoupon.code}</div>
                    <div className="text-[10px] text-[#666]">-{formatPrice(appliedCoupon.discountAmount)} Off</div>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-xs font-bold text-[#DC2626] hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. PEHNAVA10"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                    className="bg-[#FAF9F6] border border-[#E5E2D9] rounded-xs px-3 py-2 text-xs font-semibold uppercase flex-1 focus:outline-none focus:border-black"
                  />
                  <button
                    type="submit"
                    className="bg-black text-white px-3.5 py-2 rounded-xs text-xs font-bold uppercase tracking-wider hover:bg-[#2A2A2A]"
                  >
                    Apply
                  </button>
                </form>
              )}
              {couponError && <p className="text-[10px] text-[#DC2626]">{couponError}</p>}
            </div>

            {/* Cost Breakdown */}
            <div className="space-y-2 border-t border-[#E5E2D9] pt-4 text-xs">
              <div className="flex justify-between text-[#666]">
                <span>Suits Total ({cartCount} {cartCount === 1 ? 'item' : 'items'})</span>
                <span className="font-semibold text-black">{formatPrice(cartSubtotal)}</span>
              </div>
              {cartStitchingTotal > 0 && (
                <div className="flex justify-between text-[#666]">
                  <span>Tailoring Total</span>
                  <span className="font-semibold text-black">+{formatPrice(cartStitchingTotal)}</span>
                </div>
              )}
              {bundleDiscountAmount > 0 && (
                <div className="flex justify-between text-[#2E7D32] font-semibold">
                  <span>Multi-Buy Discount ({bundleDiscountPercent}%)</span>
                  <span>-{formatPrice(bundleDiscountAmount)}</span>
                </div>
              )}
              {appliedCoupon && (
                <div className="flex justify-between text-[#2E7D32] font-semibold">
                  <span>Coupon Discount ({appliedCoupon.code})</span>
                  <span>-{formatPrice(appliedCoupon.discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-[#666]">
                <span>Pan-India BlueDart Express</span>
                <span className="font-bold text-[#2E7D32] uppercase text-[10px]">Free</span>
              </div>
              <div className="border-t border-[#E5E2D9] pt-3 flex justify-between items-baseline">
                <span className="font-serif font-bold text-base text-black">Grand Total</span>
                <span className="font-serif font-bold text-xl text-black">
                  {formatPrice(cartGrandTotal)}
                </span>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="space-y-2 pt-2 border-t border-[#E5E2D9] text-[11px] text-[#666]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#8B4513] shrink-0" />
                <span>100% Original Pakistani brand tags guaranteed</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#8B4513] shrink-0" />
                <span>Zero-risk 7-day hassle-free exchange</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* High-Trust Psychological Order Authorization Modal */}
      {isSubmitting && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-[#FAF9F6] border border-[#E8DFC8] max-w-md w-full p-6 sm:p-8 rounded-xs shadow-2xl space-y-6 text-center animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-full bg-[#FAF5EE] border border-[#E8DFC8] flex items-center justify-center mx-auto text-[#8B4513] relative">
              <span className="w-full h-full rounded-full border-2 border-[#8B4513] border-t-transparent animate-spin absolute" />
              <ShieldCheck className="w-7 h-7 text-[#8B4513]" />
            </div>

            <div className="space-y-1.5">
              <h3 className="font-serif font-bold text-xl text-black uppercase tracking-tight">
                Authorizing Order & Dispatch
              </h3>
              <p className="text-xs text-[#666]">
                Please do not refresh. We are securing your original Pakistani designer suit inventory.
              </p>
            </div>

            {/* Staged verification steps */}
            <div className="space-y-3 text-left bg-white p-4 rounded-xs border border-[#E5E2D9] text-xs">
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  orderStage >= 1 ? 'bg-[#2E7D32] text-white' : 'bg-[#EEE] text-[#888]'
                }`}>
                  {orderStage > 1 ? '✓' : '1'}
                </div>
                <span className={`font-semibold ${orderStage >= 1 ? 'text-black' : 'text-[#888]'}`}>
                  Verifying 100% Original Brand Hologram & Seals
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  orderStage >= 2 ? 'bg-[#2E7D32] text-white' : 'bg-[#EEE] text-[#888]'
                }`}>
                  {orderStage > 2 ? '✓' : '2'}
                </div>
                <span className={`font-semibold ${orderStage >= 2 ? 'text-black' : 'text-[#888]'}`}>
                  Applying Multi-Buy Savings ({bundleDiscountPercent}% OFF applied)
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  orderStage >= 3 ? 'bg-[#2E7D32] text-white' : 'bg-[#EEE] text-[#888]'
                }`}>
                  {orderStage > 3 ? '✓' : '3'}
                </div>
                <span className={`font-semibold ${orderStage >= 3 ? 'text-black' : 'text-[#888]'}`}>
                  Assigning BlueDart Express Air Courier Tracking AWB
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  orderStage >= 4 ? 'bg-[#2E7D32] text-white' : 'bg-[#EEE] text-[#888]'
                }`}>
                  {orderStage === 4 ? '✓' : '4'}
                </div>
                <span className={`font-semibold ${orderStage >= 4 ? 'text-[#2E7D32]' : 'text-[#888]'}`}>
                  Order Confirmed! Generating Live Tracking Timeline...
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
