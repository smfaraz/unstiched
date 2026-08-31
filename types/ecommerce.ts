export interface Review {
  id: string;
  author: string;
  location: string; // e.g. "South Delhi, DL", "Bandra, Mumbai", "Indiranagar, Bengaluru"
  rating: number;
  date: string;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
  photos?: string[];
  fitFeedback?: 'True to size' | 'Runs slightly loose' | 'Perfect for custom stitching' | 'Generous fabric length';
  helpfulCount: number;
  selectedOption?: string; // e.g. "Stitched - Size M" or "3-Piece Unstitched"
}

export interface CustomMeasurements {
  bust: number; // in inches
  waist: number;
  hip: number;
  kurtaLength: number;
  sleeveLength: number;
  trouserStyle: 'Straight Cigarette Pants' | 'Farshi Salwar' | 'Flared Gharara' | 'Culottes / Palazzo' | 'Tulip Pants';
  necklineStyle: 'Embroidered V-Neck' | 'Boat Neck with Slit' | 'Classic Round' | 'Angrakha Wrap';
  liningPreference: 'Full Cotton Lining' | 'Sleeves Unlined' | 'No Extra Lining';
  specialNotes?: string;
}

export interface Product {
  id: string;
  sku: string;
  title: string;
  slug: string;
  brand: string; // Fabric / Collection line
  category: 'New Arrivals' | 'Unstitched Elegance' | 'Ready to Wear' | 'Festive Glam' | 'Formal Wear' | 'The Modern Edit' | 'Ethnic Daily Wear' | 'Curves (XL-6XL)' | string;
  fabric: 'Pure Lawn' | 'Swiss Voile' | 'Jacquard Lawn' | 'Chiffon' | 'Cotton Satin' | 'Pure Organza' | 'Silk Lawn' | 'Velvet' | string;
  craftWork?: 'Schiffli Cutwork' | 'Zari & Tilla' | 'Chikankari' | 'Foil Mirror Work' | 'Resham Embroidery' | 'Digital Floral Print' | 'Laser Cutwork' | string;
  suitType: 'Suit Set (Unstitched)' | 'Ready to Wear' | '3-Piece Unstitched' | 'Custom Tailored Ensemble';
  price: number; // In INR
  originalPrice: number;
  discountPercent: number;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockCount: number;
  isBestseller?: boolean;
  isNewArrival?: boolean;
  isFastDispatch24h?: boolean;
  images: string[];
  colors: { name: string; hex: string }[];
  availableSizes: string[]; // e.g. ["Unstitched", "XS", "S", "M", "L", "XL", "XXL", "3XL", "4XL", "5XL", "6XL", "Custom Stitching"]
  pieceDetails: {
    shirt: string;
    dupatta: string;
    trouser: string;
    embellishments?: string;
  };
  description: string;
  origin: string; // "100% Authentic Pakistani Designer Original - Direct Import"
  careInstructions: string[];
  reviews: Review[];
  tags: string[];
  readyToShipDays: number; // e.g. 1 for unstitched, 5 for custom stitched
}

export interface CartItem {
  id: string; // Unique cart item ID (combines product + size/stitching)
  productId: string;
  product: Product;
  quantity: number;
  stitchingOption: 'unstitched' | 'stitched_standard' | 'stitched_custom';
  selectedSize?: string; // S, M, L, XL, XXL, 3XL, etc.
  customMeasurements?: CustomMeasurements;
  stitchingPrice: number; // ₹0 for unstitched, ₹1,199 for standard, ₹1,499 for custom
  unitPrice: number;
  totalPrice: number;
}

export interface CustomerDetails {
  fullName: string;
  email: string;
  phone: string; // 10-digit Indian phone
  alternatePhone?: string;
  addressLine1: string;
  addressLine2?: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
  gstin?: string; // Optional GSTIN for Indian business billing
}

export interface TrackingEvent {
  status: string;
  description: string;
  location: string;
  timestamp: string;
  isCompleted: boolean;
  isCurrent?: boolean;
}

export interface Order {
  id: string; // e.g. "PEH-IND-2026-98124"
  createdAt: string;
  customer: CustomerDetails;
  items: CartItem[];
  subtotal: number;
  stitchingTotal: number;
  discount: number;
  couponCode?: string;
  shippingFee: number;
  shippingMethod: 'Express Pan-India (2-4 Days)' | 'Priority Superfast Air (24-48 Hours)' | 'Custom Tailoring Dispatch';
  grandTotal: number;
  paymentMethod: 'upi' | 'cod' | 'card' | 'netbanking';
  paymentStatus: 'Paid' | 'Pending COD' | 'Failed';
  upiDetails?: {
    app?: string; // GPay, PhonePe, Paytm, CRED
    transactionRef?: string;
  };
  orderStatus: 'Confirmed' | 'Tailoring & QC' | 'Dispatched' | 'In Transit' | 'Out for Delivery' | 'Delivered' | 'Cancelled';
  courierName: 'BlueDart Express Air' | 'Delhivery Express' | 'DTDC Premium';
  trackingNumber: string; // e.g. "BD8923149IN"
  estimatedDelivery: string;
  trackingTimeline: TrackingEvent[];
  giftWrap: boolean;
  giftMessage?: string;
}

export interface WishlistItem {
  productId: string;
  addedAt: string;
}

export interface ProductFilter {
  searchQuery: string;
  category: string;
  brand: string[];
  fabric: string[];
  suitType: string[];
  minPrice: number;
  maxPrice: number;
  size: string[];
  fastDispatchOnly: boolean;
  inStockOnly: boolean;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating-desc' | 'newest' | 'discount-desc';
}
