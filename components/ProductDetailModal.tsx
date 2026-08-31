'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useEcommerce, sanitizeProductImage } from '@/context/EcommerceContext';
import { CustomMeasurements } from '@/types/ecommerce';
import {
  X,
  Star,
  ShieldCheck,
  Truck,
  Heart,
  ShoppingBag,
  Scissors,
  Check,
  Sparkles,
  MessageCircle,
  Clock,
  HelpCircle,
  ChevronRight,
  Eye,
  Gift,
  BadgeCheck,
  Send,
  Plus,
} from 'lucide-react';

export default function ProductDetailModal() {
  const {
    products,
    selectedProductId,
    activeModal,
    closeModals,
    formatPrice,
    addToCart,
    toggleWishlist,
    isInWishlist,
    checkPincodeDelivery,
    addReview,
    openSizeGuide,
  } = useEcommerce();

  const product = products.find((p) => p.id === selectedProductId);

  // States
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [stitchingOption, setStitchingOption] = useState<'unstitched' | 'stitched_standard' | 'stitched_custom'>('unstitched');
  const [selectedSize, setSelectedSize] = useState('M');
  const [customMeasurements, setCustomMeasurements] = useState<CustomMeasurements>({
    bust: 38,
    waist: 32,
    hip: 40,
    kurtaLength: 45,
    sleeveLength: 21,
    trouserStyle: 'Straight Cigarette Pants',
    necklineStyle: 'Embroidered V-Neck',
    liningPreference: 'Full Cotton Lining',
    specialNotes: '',
  });

  const [quantity, setQuantity] = useState(1);
  const [pincodeInput, setPincodeInput] = useState('');
  const [pincodeResult, setPincodeResult] = useState<ReturnType<typeof checkPincodeDelivery> | null>(null);

  // Review submission form state
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewAuthor, setReviewAuthor] = useState('');
  const [reviewLocation, setReviewLocation] = useState('');
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [reviewFit, setReviewFit] = useState<'True to size' | 'Generous fabric length' | 'Perfect for custom stitching'>('True to size');

  if (activeModal !== 'product_detail' || !product) return null;

  const isSaved = isInWishlist(product.id);

  // Calculate stitching fee
  let stitchingFee = 0;
  if (stitchingOption === 'stitched_standard') stitchingFee = 1199;
  if (stitchingOption === 'stitched_custom') stitchingFee = 1499;

  const unitTotal = product.price + stitchingFee;
  const grandTotal = unitTotal * quantity;

  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincodeInput.trim().length >= 6) {
      const res = checkPincodeDelivery(pincodeInput);
      setPincodeResult(res);
    }
  };

  const handleAddToCart = () => {
    addToCart(
      product,
      quantity,
      stitchingOption,
      stitchingOption === 'stitched_standard' ? selectedSize : undefined,
      stitchingOption === 'stitched_custom' ? customMeasurements : undefined
    );
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewAuthor || !reviewComment) return;

    addReview(product.id, {
      author: reviewAuthor,
      location: reviewLocation || 'India',
      rating: reviewRating,
      title: reviewTitle || 'Verified Customer Review',
      comment: reviewComment,
      verifiedPurchase: true,
      fitFeedback: reviewFit,
      selectedOption: stitchingOption === 'unstitched' ? '3-Piece Unstitched' : `Stitched (${selectedSize})`,
    });

    setShowReviewForm(false);
    setReviewComment('');
    setReviewTitle('');
  };

  const whatsappMessage = encodeURIComponent(
    `Hi Pehnava Lawns! I am interested in ordering "${product.title}" (SKU: ${product.sku}) priced at ${formatPrice(product.price)}. Please share live fabric details & delivery confirmation.`
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-[#FAF9F6] rounded-xs shadow-2xl overflow-hidden border border-[#E5E2D9] my-8 max-h-[92vh] flex flex-col">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-[#E5E2D9] shrink-0">
          <div className="flex items-center gap-2">
            <span className="font-serif text-lg font-bold text-[#1A1A1A] tracking-tight">PEHNAVA LAWNS</span>
            <span className="text-[10px] text-[#777] font-bold uppercase tracking-widest hidden sm:inline">| SKU: {product.sku}</span>
          </div>
          <button
            onClick={closeModals}
            className="p-1.5 text-[#1A1A1A] hover:bg-[#F2F0E9] rounded-xs transition"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-8 flex-1">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left 6 cols: Image Gallery */}
            <div className="lg:col-span-6 space-y-4">
              {/* Main Zoom Display */}
              <div className="relative aspect-3/4 w-full bg-[#EBE9E1] rounded-xs overflow-hidden shadow-xs border border-[#E5E2D9]">
                <Image
                  src={sanitizeProductImage(product.images?.[selectedImageIdx] || product.images?.[0], selectedImageIdx)}
                  alt={product.title}
                  fill
                  priority
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 500px"
                />

                {/* Floating Tags */}
                <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
                  <span className="bg-[#8B4513] text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-xs shadow-xs">
                    {product.discountPercent}% OFF
                  </span>
                  <span className="bg-[#111] text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-xs shadow-xs flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-[#C49A6C]" />
                    <span>100% Original Pakistani Fabric</span>
                  </span>
                </div>

                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  aria-label={isSaved ? 'Remove from saved wishlist' : 'Save to wishlist'}
                  className={`absolute top-3 right-3 p-2.5 rounded-xs backdrop-blur-md transition shadow-xs border ${
                    isSaved ? 'bg-black text-white border-black' : 'bg-white/90 text-black border-[#E5E2D9] hover:bg-white'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isSaved ? 'fill-white' : ''}`} />
                </button>
              </div>

              {/* Thumbnail Selector */}
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIdx(idx)}
                    className={`relative aspect-3/4 rounded-xs overflow-hidden border transition ${
                      selectedImageIdx === idx
                        ? 'border-black ring-1 ring-black'
                        : 'border-[#E5E2D9] opacity-75 hover:opacity-100'
                    }`}
                  >
                    <Image
                      src={sanitizeProductImage(img, idx)}
                      alt={`View ${idx + 1}`}
                      fill
                      className="object-cover object-top"
                      sizes="100px"
                    />
                  </button>
                ))}
              </div>

              {/* Fabric Specs Box */}
              <div className="bg-white p-4 rounded-xs border border-[#E5E2D9] space-y-2 text-xs">
                <div className="font-bold text-[10px] uppercase tracking-widest text-black border-b border-[#E5E2D9] pb-1.5 flex items-center gap-1.5">
                  <Scissors className="w-3.5 h-3.5 text-[#8B4513]" />
                  <span>3-Piece Ensemble Fabric Breakdown</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[#555] pt-1">
                  <div>
                    <strong className="text-black">Shirt:</strong> {product.pieceDetails.shirt}
                  </div>
                  <div>
                    <strong className="text-black">Dupatta:</strong> {product.pieceDetails.dupatta}
                  </div>
                  <div>
                    <strong className="text-black">Trouser:</strong> {product.pieceDetails.trouser}
                  </div>
                  {product.pieceDetails.embellishments && (
                    <div>
                      <strong className="text-black">Details:</strong> {product.pieceDetails.embellishments}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right 6 cols: Product Specs, Stitching Options, Pricing & CTAs */}
            <div className="lg:col-span-6 space-y-5">
              {/* Brand & Title */}
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#8B4513] bg-[#FAF5EE] px-2.5 py-0.5 rounded-xs border border-[#E5E2D9]">
                    {product.brand}
                  </span>
                  <span className="text-xs text-[#777] font-semibold">
                    Fabric: {product.fabric}
                  </span>
                </div>
                <h1 className="text-xl sm:text-2xl font-serif font-bold text-[#1A1A1A] mt-1.5 leading-snug">
                  {product.title}
                </h1>
                
                {/* Rating Bar */}
                <div className="flex items-center gap-3 mt-2 text-xs">
                  <div className="flex items-center bg-[#FAF5EE] text-[#8B4513] border border-[#E5E2D9] px-2 py-0.5 rounded-xs font-bold text-[11px]">
                    <Star className="w-3 h-3 fill-[#8B4513] text-[#8B4513] mr-1" />
                    <span>{product.rating} / 5.0</span>
                  </div>
                  <span className="text-[#777] underline cursor-pointer font-medium text-[11px]">
                    {product.reviewCount} Verified Buyer Reviews
                  </span>
                  <span className="text-[#8B4513] font-bold flex items-center gap-1 ml-auto text-[11px]">
                    <Clock className="w-3 h-3" />
                    <span>In Stock (Only {product.stockCount} left)</span>
                  </span>
                </div>
              </div>

              {/* Price Banner */}
              <div className="bg-[#FAF5EE] p-4 rounded-xs border border-[#E5E2D9] flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-[#777] uppercase font-bold tracking-widest">Price (GST Included)</div>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-2xl font-bold text-black font-serif">
                      {formatPrice(unitTotal)}
                    </span>
                    <span className="text-sm text-[#999] line-through">
                      {formatPrice(product.originalPrice + stitchingFee)}
                    </span>
                    <span className="text-[10px] font-bold text-[#8B4513] bg-[#EFECE6] border border-[#E5E2D9] px-2 py-0.5 rounded-xs uppercase tracking-wider">
                      Save {formatPrice(product.originalPrice - product.price)}
                    </span>
                  </div>
                </div>

                {stitchingFee > 0 && (
                  <div className="text-right text-[10px] text-[#8B4513] font-bold uppercase tracking-wider">
                    Includes ₹{stitchingFee} Tailoring Fee
                  </div>
                )}
              </div>

              {/* STITCHING & CUSTOM TAILORING SELECTION */}
              <div className="space-y-3 bg-white p-4 rounded-xs border border-[#E5E2D9]">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A] flex items-center gap-1.5">
                    <Scissors className="w-4 h-4 text-[#8B4513]" />
                    <span>Step 1: Choose Stitching Option</span>
                  </div>
                  <button
                    onClick={openSizeGuide}
                    className="text-xs text-[#8B4513] font-bold uppercase tracking-wider hover:underline text-[10px]"
                  >
                    View Size Chart
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {/* Unstitched */}
                  <button
                    type="button"
                    onClick={() => setStitchingOption('unstitched')}
                    className={`p-3 rounded-xs border text-left transition ${
                      stitchingOption === 'unstitched'
                        ? 'border-black bg-[#FAF9F6] ring-1 ring-black'
                        : 'border-[#E5E2D9] bg-[#FAF9F6] hover:bg-[#F2F0E9]'
                    }`}
                  >
                    <div className="text-xs font-bold text-[#1A1A1A]">3-PC Unstitched</div>
                    <div className="text-[10px] text-[#8B4513] font-bold uppercase tracking-wider mt-0.5">Free (Included)</div>
                    <div className="text-[10px] text-[#777] mt-1">24h Express Dispatch</div>
                  </button>

                  {/* Standard Stitched */}
                  <button
                    type="button"
                    onClick={() => setStitchingOption('stitched_standard')}
                    className={`p-3 rounded-xs border text-left transition ${
                      stitchingOption === 'stitched_standard'
                        ? 'border-black bg-[#FAF9F6] ring-1 ring-black'
                        : 'border-[#E5E2D9] bg-[#FAF9F6] hover:bg-[#F2F0E9]'
                    }`}
                  >
                    <div className="text-xs font-bold text-[#1A1A1A]">Standard Stitched</div>
                    <div className="text-[10px] text-[#8B4513] font-bold uppercase tracking-wider mt-0.5">+₹1,199 Fee</div>
                    <div className="text-[10px] text-[#777] mt-1">Sizes XS to 6XL</div>
                  </button>

                  {/* Custom Boutique Tailoring */}
                  <button
                    type="button"
                    onClick={() => setStitchingOption('stitched_custom')}
                    className={`p-3 rounded-xs border text-left transition ${
                      stitchingOption === 'stitched_custom'
                        ? 'border-black bg-[#FAF9F6] ring-1 ring-black'
                        : 'border-[#E5E2D9] bg-[#FAF9F6] hover:bg-[#F2F0E9]'
                    }`}
                  >
                    <div className="text-xs font-bold text-[#1A1A1A]">Custom Tailoring</div>
                    <div className="text-[10px] text-[#8B4513] font-bold uppercase tracking-wider mt-0.5">+₹1,499 Fee</div>
                    <div className="text-[10px] text-[#777] mt-1">Exact Measurements</div>
                  </button>
                </div>

                {/* Standard Size Selector (if stitched_standard selected) */}
                {stitchingOption === 'stitched_standard' && (
                  <div className="pt-2 border-t border-[#E5E2D9] space-y-2 animate-fadeIn">
                    <div className="text-xs font-semibold text-[#555]">
                      Select Standard Size (Includes Cotton Lining & Interlock):
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {['XS (34)', 'S (36)', 'M (38)', 'L (40)', 'XL (42)', 'XXL (44)', '3XL (46)', '4XL (48)', '5XL (52)', '6XL (56)'].map((sz) => {
                        const code = sz.split(' ')[0];
                        return (
                          <button
                            key={sz}
                            type="button"
                            onClick={() => setSelectedSize(code)}
                            className={`px-3 py-1.5 rounded-xs text-xs font-bold transition border ${
                              selectedSize === code
                                ? 'bg-black text-white border-black shadow-xs'
                                : 'bg-[#FAF9F6] text-[#1A1A1A] border-[#E5E2D9] hover:bg-[#E5E2D9]'
                            }`}
                          >
                            {sz}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Custom Measurements Form (if stitched_custom selected) */}
                {stitchingOption === 'stitched_custom' && (
                  <div className="pt-2 border-t border-[#E5E2D9] space-y-3 animate-fadeIn text-xs">
                    <div className="font-bold text-black uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#8B4513]" />
                      <span>Enter Your Exact Tailoring Measurements (Inches):</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      <div>
                        <label htmlFor="custom-bust-input" className="block text-[10px] font-bold uppercase tracking-wider text-[#555] mb-1">
                          Bust / Chest (in)
                        </label>
                        <input
                          id="custom-bust-input"
                          type="number"
                          value={customMeasurements.bust}
                          onChange={(e) =>
                            setCustomMeasurements((p) => ({ ...p, bust: Number(e.target.value) }))
                          }
                          className="w-full bg-[#FAF9F6] border border-[#E5E2D9] rounded-xs p-1.5 text-xs font-bold text-center"
                        />
                      </div>

                      <div>
                        <label htmlFor="custom-waist-input" className="block text-[10px] font-bold uppercase tracking-wider text-[#555] mb-1">
                          Waist (in)
                        </label>
                        <input
                          id="custom-waist-input"
                          type="number"
                          value={customMeasurements.waist}
                          onChange={(e) =>
                            setCustomMeasurements((p) => ({ ...p, waist: Number(e.target.value) }))
                          }
                          className="w-full bg-[#FAF9F6] border border-[#E5E2D9] rounded-xs p-1.5 text-xs font-bold text-center"
                        />
                      </div>

                      <div>
                        <label htmlFor="custom-hip-input" className="block text-[10px] font-bold uppercase tracking-wider text-[#555] mb-1">
                          Hip (in)
                        </label>
                        <input
                          id="custom-hip-input"
                          type="number"
                          value={customMeasurements.hip}
                          onChange={(e) =>
                            setCustomMeasurements((p) => ({ ...p, hip: Number(e.target.value) }))
                          }
                          className="w-full bg-[#FAF9F6] border border-[#E5E2D9] rounded-xs p-1.5 text-xs font-bold text-center"
                        />
                      </div>

                      <div>
                        <label htmlFor="custom-kurta-length-input" className="block text-[10px] font-bold uppercase tracking-wider text-[#555] mb-1">
                          Kurta Length (in)
                        </label>
                        <input
                          id="custom-kurta-length-input"
                          type="number"
                          value={customMeasurements.kurtaLength}
                          onChange={(e) =>
                            setCustomMeasurements((p) => ({ ...p, kurtaLength: Number(e.target.value) }))
                          }
                          className="w-full bg-[#FAF9F6] border border-[#E5E2D9] rounded-xs p-1.5 text-xs font-bold text-center"
                        />
                      </div>

                      <div>
                        <label htmlFor="custom-sleeve-length-input" className="block text-[10px] font-bold uppercase tracking-wider text-[#555] mb-1">
                          Sleeve Length (in)
                        </label>
                        <input
                          id="custom-sleeve-length-input"
                          type="number"
                          value={customMeasurements.sleeveLength}
                          onChange={(e) =>
                            setCustomMeasurements((p) => ({ ...p, sleeveLength: Number(e.target.value) }))
                          }
                          className="w-full bg-[#FAF9F6] border border-[#E5E2D9] rounded-xs p-1.5 text-xs font-bold text-center"
                        />
                      </div>

                      <div>
                        <label htmlFor="custom-trouser-style-select" className="block text-[10px] font-bold uppercase tracking-wider text-[#555] mb-1">
                          Bottom / Trouser Cut
                        </label>
                        <select
                          id="custom-trouser-style-select"
                          value={customMeasurements.trouserStyle}
                          onChange={(e) =>
                            setCustomMeasurements((p) => ({
                              ...p,
                              trouserStyle: e.target.value as CustomMeasurements['trouserStyle'],
                            }))
                          }
                          className="w-full bg-[#FAF9F6] border border-[#E5E2D9] rounded-xs p-1.5 text-xs font-medium"
                        >
                          <option value="Straight Cigarette Pants">Straight Cigarette Pants</option>
                          <option value="Farshi Salwar">Farshi Salwar</option>
                          <option value="Flared Gharara">Flared Gharara</option>
                          <option value="Culottes / Palazzo">Culottes / Palazzo</option>
                          <option value="Tulip Pants">Tulip Pants</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="custom-tailoring-notes-input" className="block text-[10px] font-bold uppercase tracking-wider text-[#555] mb-1">
                        Special Tailoring Instructions (Optional)
                      </label>
                      <input
                        id="custom-tailoring-notes-input"
                        type="text"
                        placeholder="e.g. Keep armholes roomy, attach laces with scalloped hem"
                        value={customMeasurements.specialNotes || ''}
                        onChange={(e) =>
                          setCustomMeasurements((p) => ({ ...p, specialNotes: e.target.value }))
                        }
                        className="w-full bg-[#FAF9F6] border border-[#E5E2D9] rounded-xs p-2 text-xs"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* PINCODE DELIVERY CHECKER */}
              <div className="bg-white p-4 rounded-xs border border-[#E5E2D9] space-y-2 text-xs">
                <div className="font-bold text-[10px] uppercase tracking-widest text-[#1A1A1A] flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-[#8B4513]" />
                  <span>Check Pan-India Delivery & COD by Pincode</span>
                </div>
                <form onSubmit={handlePincodeCheck} className="flex gap-2">
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="Enter 6-digit Pincode (e.g. 110001, 400050, 560001)"
                    value={pincodeInput}
                    onChange={(e) => setPincodeInput(e.target.value)}
                    className="flex-1 bg-[#FAF9F6] border border-[#E5E2D9] rounded-xs px-3 py-2 text-xs font-semibold text-[#1A1A1A] focus:outline-none focus:border-[#8B4513]"
                  />
                  <button
                    type="submit"
                    className="bg-black hover:bg-[#222] text-white px-4 py-2 rounded-xs text-[10px] font-bold uppercase tracking-wider transition"
                  >
                    Check
                  </button>
                </form>

                {pincodeResult && (
                  <div className="bg-[#FAF5EE] border border-[#E5E2D9] p-3 rounded-xs space-y-1 animate-fadeIn">
                    <div className="font-bold text-[#8B4513] flex items-center gap-1.5 text-xs">
                      <Check className="w-4 h-4 text-[#8B4513]" />
                      <span>
                        Deliverable to {pincodeResult.city}, {pincodeResult.state}
                      </span>
                    </div>
                    <div className="text-[11px] text-[#555]">
                      🚀 Delivery Timeline: <strong>{pincodeResult.estimatedDays}</strong> via {pincodeResult.courierPartner}
                    </div>
                    <div className="text-[11px] text-[#8B4513] font-bold">
                      💵 Cash on Delivery (COD) Available at this pincode
                    </div>
                  </div>
                )}
              </div>

              {/* ACTION BUTTONS (Add to Cart, Buy Now, WhatsApp) */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center gap-3">
                  {/* Quantity */}
                  <div className="flex items-center border border-[#E5E2D9] bg-white rounded-xs overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-3 text-xs font-bold text-[#1A1A1A] hover:bg-[#E5E2D9]"
                    >
                      -
                    </button>
                    <span className="px-3 text-xs font-bold text-[#1A1A1A]">{quantity}</span>
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-3 text-xs font-bold text-[#1A1A1A] hover:bg-[#E5E2D9]"
                    >
                      +
                    </button>
                  </div>

                  {/* Add to Bag */}
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className="flex-1 bg-black hover:bg-[#222] text-white font-bold uppercase tracking-widest text-xs py-3.5 px-6 rounded-xs shadow-xs flex items-center justify-center gap-2 transition"
                    id="modal-add-to-bag-btn"
                  >
                    <ShoppingBag className="w-4 h-4 text-white" />
                    <span>Add to Bag • {formatPrice(grandTotal)}</span>
                  </button>
                </div>

                {/* WhatsApp Direct Order Button */}
                <a
                  href={`https://wa.me/919820089123?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#22C55E] hover:bg-[#16A34A] text-white font-bold py-2.5 px-4 rounded-xs shadow-xs flex items-center justify-center gap-2 text-xs transition"
                  id="modal-whatsapp-order-btn"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Order or Ask Sizing on WhatsApp (+91 98200 89123)</span>
                </a>
              </div>

              {/* Trust Features */}
              <div className="grid grid-cols-2 gap-2 text-[10px] text-[#777] pt-2">
                <div className="flex items-center gap-1.5">
                  <BadgeCheck className="w-4 h-4 text-[#8B4513]" />
                  <span>100% Original Brand Hologram</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#8B4513]" />
                  <span>7-Day Easy Exchange</span>
                </div>
              </div>
            </div>
          </div>

          {/* CUSTOMER REVIEWS & FEEDBACK SECTION */}
          <div className="pt-8 border-t border-[#E5E2D9] space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg sm:text-xl font-serif font-bold text-[#1A1A1A]">
                  Customer Reviews & Fit Experience ({product.reviews.length})
                </h3>
                <p className="text-xs text-[#777] mt-0.5">
                  Real feedback from verified Indian buyers across Delhi, Mumbai, Bangalore, Hyderabad & Lucknow
                </p>
              </div>

              <button
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="bg-[#FAF5EE] hover:bg-[#EBE7DF] text-[#1A1A1A] font-bold text-[10px] uppercase tracking-wider px-4 py-2.5 rounded-xs border border-[#E5E2D9] transition flex items-center gap-1.5 self-start sm:self-auto"
                id="write-a-review-btn"
              >
                <Plus className="w-3.5 h-3.5 text-[#8B4513]" />
                <span>Write a Review</span>
              </button>
            </div>

            {/* Write Review Form Drawer */}
            {showReviewForm && (
              <form
                onSubmit={handleReviewSubmit}
                className="bg-white p-5 rounded-xs border border-[#E5E2D9] shadow-sm space-y-4 animate-fadeIn text-xs"
              >
                <div className="font-serif font-bold text-sm text-black border-b border-[#E5E2D9] pb-2">
                  Share Your Review for {product.title}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label htmlFor="review-author-input" className="block text-[10px] font-bold uppercase tracking-wider text-[#555] mb-1">
                      Your Name *
                    </label>
                    <input
                      id="review-author-input"
                      type="text"
                      required
                      placeholder="e.g. Zainab Fatima"
                      value={reviewAuthor}
                      onChange={(e) => setReviewAuthor(e.target.value)}
                      className="w-full bg-[#FAF9F6] border border-[#E5E2D9] rounded-xs p-2 text-xs"
                    />
                  </div>

                  <div>
                    <label htmlFor="review-location-input" className="block text-[10px] font-bold uppercase tracking-wider text-[#555] mb-1">
                      City / Area
                    </label>
                    <input
                      id="review-location-input"
                      type="text"
                      placeholder="e.g. South Delhi / Bandra Mumbai"
                      value={reviewLocation}
                      onChange={(e) => setReviewLocation(e.target.value)}
                      className="w-full bg-[#FAF9F6] border border-[#E5E2D9] rounded-xs p-2 text-xs"
                    />
                  </div>

                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-[#555] mb-1">Rating</span>
                    <div className="flex items-center gap-1 mt-1.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setReviewRating(star)}
                          className="p-1 hover:scale-125 transition"
                          aria-label={`Rate ${star} out of 5 stars`}
                        >
                          <Star
                            className={`w-4 h-4 ${
                              star <= reviewRating
                                ? 'fill-[#8B4513] text-[#8B4513]'
                                : 'text-[#D1C7BA]'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="review-title-input" className="block text-[10px] font-bold uppercase tracking-wider text-[#555] mb-1">
                    Review Headline
                  </label>
                  <input
                    id="review-title-input"
                    type="text"
                    placeholder="e.g. Beautiful embroidery and exact original Pakistani quality"
                    value={reviewTitle}
                    onChange={(e) => setReviewTitle(e.target.value)}
                    className="w-full bg-[#FAF9F6] border border-[#E5E2D9] rounded-xs p-2 text-xs font-semibold"
                  />
                </div>

                <div>
                  <label htmlFor="review-comment-input" className="block text-[10px] font-bold uppercase tracking-wider text-[#555] mb-1">
                    Your Detailed Review *
                  </label>
                  <textarea
                    id="review-comment-input"
                    rows={3}
                    required
                    placeholder="Describe fabric texture, lawn softness, dupatta length, stitching satisfaction, and delivery speed..."
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    className="w-full bg-[#FAF9F6] border border-[#E5E2D9] rounded-xs p-2 text-xs"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowReviewForm(false)}
                    className="px-4 py-2 text-xs font-semibold text-[#777]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-black hover:bg-[#222] text-white px-5 py-2 rounded-xs text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-xs"
                  >
                    <Send className="w-3 h-3" />
                    <span>Submit Verified Review</span>
                  </button>
                </div>
              </form>
            )}

            {/* Reviews List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="bg-white p-4 rounded-xs border border-[#E5E2D9] shadow-xs space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className="flex">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-[#8B4513] text-[#8B4513]" />
                        ))}
                      </div>
                      <span className="font-bold text-[#1A1A1A] font-serif">{rev.title}</span>
                    </div>
                    <span className="text-[10px] text-[#777]">{rev.date}</span>
                  </div>

                  <p className="text-[#555] leading-relaxed italic">
                    &quot;{rev.comment}&quot;
                  </p>

                  <div className="flex flex-wrap items-center justify-between text-[10px] pt-2 border-t border-[#F2F0E9] text-[#777]">
                    <div className="flex items-center gap-1.5">
                      <strong className="text-black">{rev.author}</strong>
                      <span>• {rev.location}</span>
                    </div>
                    {rev.verifiedPurchase && (
                      <span className="text-[#8B4513] font-bold flex items-center gap-1">
                        <BadgeCheck className="w-3.5 h-3.5" />
                        <span>Verified Buyer</span>
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
