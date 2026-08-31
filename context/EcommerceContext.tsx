'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  Product,
  CartItem,
  Order,
  Review,
  CustomMeasurements,
  ProductFilter,
  CustomerDetails,
} from '@/types/ecommerce';
import { INITIAL_PRODUCTS, INITIAL_ORDERS, INITIAL_COUPONS } from '@/data/mockProducts';

interface Toast {
  id: string;
  type: 'success' | 'info' | 'error';
  title: string;
  message: string;
}

export interface PincodeInfo {
  pincode: string;
  city: string;
  state: string;
  isDeliverable: boolean;
  isCodAvailable: boolean;
  estimatedDays: string;
  courierPartner: string;
}

interface EcommerceContextType {
  products: Product[];
  cart: CartItem[];
  wishlist: string[];
  orders: Order[];
  appliedCoupon: {
    code: string;
    discountAmount: number;
    description: string;
  } | null;
  currency: 'INR' | 'USD' | 'AED';
  setCurrency: (currency: 'INR' | 'USD' | 'AED') => void;
  formatPrice: (priceInInr: number) => string;
  filters: ProductFilter;
  setFilters: React.Dispatch<React.SetStateAction<ProductFilter>>;
  resetFilters: () => void;
  activeModal: 'cart' | 'checkout' | 'product_detail' | 'order_tracking' | 'wishlist' | 'admin' | 'size_guide' | null;
  selectedProductId: string | null;
  trackingOrderId: string | null;
  toast: Toast | null;
  
  // Cart Actions
  addToCart: (
    product: Product,
    quantity?: number,
    stitchingOption?: 'unstitched' | 'stitched_standard' | 'stitched_custom',
    selectedSize?: string,
    customMeasurements?: CustomMeasurements
  ) => void;
  updateCartQuantity: (cartItemId: string, quantity: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  cartStitchingTotal: number;
  cartGrandTotal: number;
  freeShippingRemaining: number;
  bundleDiscountPercent: number;
  bundleDiscountAmount: number;
  discountAmount: number;
  nextTierInfo: { needed: number; nextPercent: number } | null;

  // Wishlist Actions
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Coupon Actions
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;

  // Order Actions
  createOrder: (orderPayload: {
    customer: CustomerDetails;
    paymentMethod: 'upi' | 'cod' | 'card' | 'netbanking';
    shippingMethod: 'Express Pan-India (2-4 Days)' | 'Priority Superfast Air (24-48 Hours)' | 'Custom Tailoring Dispatch';
    upiDetails?: { app?: string; transactionRef?: string };
    giftWrap?: boolean;
    giftMessage?: string;
  }) => Order;
  getOrderById: (orderId: string) => Order | undefined;
  getOrdersByPhone: (phone: string) => Order[];

  // Product Management (Admin Capabilities)
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  updateOrderStatus: (
    orderId: string,
    status: Order['orderStatus'],
    trackingNumber?: string,
    location?: string,
    description?: string
  ) => void;
  addReview: (productId: string, review: Omit<Review, 'id' | 'date' | 'helpfulCount'>) => void;

  // UI Modal Triggers
  openProductDetail: (productId: string) => void;
  openOrderTracking: (orderId?: string) => void;
  openCart: () => void;
  openCheckout: () => void;
  openWishlist: () => void;
  openAdmin: () => void;
  openSizeGuide: () => void;
  closeModals: () => void;
  showToast: (title: string, message: string, type?: 'success' | 'info' | 'error') => void;

  // Indian Utilities
  checkPincodeDelivery: (pincode: string) => PincodeInfo;
}

const defaultFilters: ProductFilter = {
  searchQuery: '',
  category: 'All',
  brand: [],
  fabric: [],
  suitType: [],
  minPrice: 0,
  maxPrice: 15000,
  size: [],
  fastDispatchOnly: false,
  inStockOnly: false,
  sortBy: 'featured',
};

const DEFAULT_SUIT_IMAGES = [
  '/images/products/pink_lawn_suit.jpg',
  '/images/products/mint_chikankari_suit.jpg',
  '/images/products/emerald_festive_suit.jpg',
  '/images/products/lavender_chiffon_suit.jpg',
  '/images/products/blue_cutwork_suit.jpg',
  '/images/products/mustard_daily_suit.jpg',
  '/images/products/maroon_velvet_suit.jpg',
  '/images/products/peach_curves_suit.jpg',
];

export function sanitizeProductImage(imgUrl?: string, index: number = 0): string {
  if (!imgUrl || typeof imgUrl !== 'string' || imgUrl.includes('unsplash.com') || imgUrl.includes('picsum.photos')) {
    return DEFAULT_SUIT_IMAGES[index % DEFAULT_SUIT_IMAGES.length];
  }
  return imgUrl;
}

const EcommerceContext = createContext<EcommerceContextType | undefined>(undefined);

export function EcommerceProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('pehnava_products_v3');
      if (saved) {
        try {
          const parsed: Product[] = JSON.parse(saved);
          return parsed.map((p, pIdx) => ({
            ...p,
            images: p.images && p.images.length > 0 
              ? p.images.map((img, i) => sanitizeProductImage(img, pIdx + i))
              : [sanitizeProductImage(undefined, pIdx)],
          }));
        } catch {
          return INITIAL_PRODUCTS;
        }
      }
      // Migrate legacy cache
      localStorage.removeItem('pehnava_products');
      localStorage.setItem('pehnava_products_v3', JSON.stringify(INITIAL_PRODUCTS));
    }
    return INITIAL_PRODUCTS;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('pehnava_cart');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return [];
        }
      }
    }
    return [];
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('pehnava_wishlist');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return [];
        }
      }
    }
    return [];
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('pehnava_orders');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return INITIAL_ORDERS;
        }
      }
    }
    return INITIAL_ORDERS;
  });

  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string;
    discountAmount: number;
    description: string;
  } | null>(null);

  const [currency, setCurrency] = useState<'INR' | 'USD' | 'AED'>('INR');
  const [filters, setFilters] = useState<ProductFilter>(defaultFilters);
  const [activeModal, setActiveModal] = useState<EcommerceContextType['activeModal']>(null);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [trackingOrderId, setTrackingOrderId] = useState<string | null>(null);
  const [toast, setToast] = useState<Toast | null>(null);

  // Sync state to local storage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('pehnava_products_v3', JSON.stringify(products));
    }
  }, [products]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('pehnava_cart', JSON.stringify(cart));
    }
  }, [cart]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('pehnava_wishlist', JSON.stringify(wishlist));
    }
  }, [wishlist]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('pehnava_orders', JSON.stringify(orders));
    }
  }, [orders]);

  const showToast = useCallback((title: string, message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToast({ id, title, message, type });
    setTimeout(() => {
      setToast((current) => (current?.id === id ? null : current));
    }, 4000);
  }, []);

  const formatPrice = useCallback((priceInInr: number) => {
    if (currency === 'USD') {
      const usd = priceInInr * 0.012;
      return `$${usd.toFixed(2)}`;
    }
    if (currency === 'AED') {
      const aed = priceInInr * 0.044;
      return `AED ${aed.toFixed(0)}`;
    }
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(priceInInr);
  }, [currency]);

  // Cart Computations
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce((total, item) => total + item.unitPrice * item.quantity, 0);
  const cartStitchingTotal = cart.reduce((total, item) => total + item.stitchingPrice * item.quantity, 0);

  // Tiered Volume Discount (Buy 1 get 10%, Add 2nd get 15%, Add 3rd get 20%)
  const bundleDiscountPercent = cartCount >= 3 ? 20 : cartCount === 2 ? 15 : cartCount === 1 ? 10 : 0;
  const bundleDiscountAmount = Math.round((cartSubtotal * bundleDiscountPercent) / 100);
  const couponDiscountAmount = appliedCoupon ? appliedCoupon.discountAmount : 0;
  const discountAmount = bundleDiscountAmount + couponDiscountAmount;
  const cartGrandTotal = Math.max(0, cartSubtotal + cartStitchingTotal - discountAmount);
  const freeShippingThreshold = 1999;
  const freeShippingRemaining = Math.max(0, freeShippingThreshold - cartSubtotal);

  const nextTierInfo = cartCount === 0
    ? { needed: 1, nextPercent: 10 }
    : cartCount === 1
    ? { needed: 1, nextPercent: 15 }
    : cartCount === 2
    ? { needed: 1, nextPercent: 20 }
    : null;

  // Cart operations
  const addToCart = useCallback((
    product: Product,
    quantity = 1,
    stitchingOption: 'unstitched' | 'stitched_standard' | 'stitched_custom' = 'unstitched',
    selectedSize?: string,
    customMeasurements?: CustomMeasurements
  ) => {
    let stitchingPrice = 0;
    if (stitchingOption === 'stitched_standard') stitchingPrice = 1199;
    if (stitchingOption === 'stitched_custom') stitchingPrice = 1499;

    const cartItemId = `${product.id}-${stitchingOption}-${selectedSize || 'none'}-${customMeasurements ? 'custom' : 'std'}`;

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.id === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        const newQty = updated[existingIndex].quantity + quantity;
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty,
          totalPrice: (updated[existingIndex].unitPrice + updated[existingIndex].stitchingPrice) * newQty,
        };
        return updated;
      } else {
        const newItem: CartItem = {
          id: cartItemId,
          productId: product.id,
          product,
          quantity,
          stitchingOption,
          selectedSize,
          customMeasurements,
          stitchingPrice,
          unitPrice: product.price,
          totalPrice: (product.price + stitchingPrice) * quantity,
        };
        return [...prevCart, newItem];
      }
    });

    showToast(
      'Added to Bag',
      `${product.title.substring(0, 30)}... (${stitchingOption === 'unstitched' ? 'Unstitched' : 'Stitched'}) added.`,
      'success'
    );
  }, [showToast]);

  const removeFromCart = useCallback((cartItemId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== cartItemId));
    showToast('Removed from Bag', 'Item removed from your cart.', 'info');
  }, [showToast]);

  const updateCartQuantity = useCallback((cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === cartItemId
          ? {
              ...item,
              quantity,
              totalPrice: (item.unitPrice + item.stitchingPrice) * quantity,
            }
          : item
      )
    );
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setCart([]);
    setAppliedCoupon(null);
  }, []);

  // Wishlist
  const toggleWishlist = useCallback((productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from Wishlist', 'Item removed from your saved list.', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved to Wishlist', 'Suit added to your wishlist.', 'success');
        return [...prev, productId];
      }
    });
  }, [showToast]);

  const isInWishlist = useCallback((productId: string) => {
    return wishlist.includes(productId);
  }, [wishlist]);

  // Coupon Logic
  const applyCoupon = useCallback((code: string) => {
    const cleanCode = code.trim().toUpperCase();
    const coupon = INITIAL_COUPONS.find((c) => c.code === cleanCode);

    if (!coupon) {
      return { success: false, message: 'Invalid coupon code. Try PEHNAVA10 or FIRSTBUY' };
    }

    if (cartSubtotal < coupon.minOrderValue) {
      return {
        success: false,
        message: `Minimum order value for this coupon is ₹${coupon.minOrderValue.toLocaleString('en-IN')}`,
      };
    }

    let discount = 0;
    if (coupon.discountPercent) {
      discount = Math.round((cartSubtotal * coupon.discountPercent) / 100);
      if (coupon.maxDiscount) {
        discount = Math.min(discount, coupon.maxDiscount);
      }
    } else if (coupon.discountFixed) {
      discount = coupon.discountFixed;
    }

    setAppliedCoupon({
      code: cleanCode,
      discountAmount: discount,
      description: coupon.description,
    });

    showToast('Coupon Applied!', `You saved ₹${discount.toLocaleString('en-IN')} with ${cleanCode}`, 'success');
    return { success: true, message: `Coupon applied! Saved ₹${discount.toLocaleString('en-IN')}` };
  }, [cartSubtotal, showToast]);

  const removeCoupon = useCallback(() => {
    setAppliedCoupon(null);
    showToast('Coupon Removed', 'Coupon code removed.', 'info');
  }, [showToast]);

  // Create Order
  const createOrder = useCallback((payload: {
    customer: CustomerDetails;
    paymentMethod: 'upi' | 'cod' | 'card' | 'netbanking';
    shippingMethod: 'Express Pan-India (2-4 Days)' | 'Priority Superfast Air (24-48 Hours)' | 'Custom Tailoring Dispatch';
    upiDetails?: { app?: string; transactionRef?: string };
    giftWrap?: boolean;
    giftMessage?: string;
  }) => {
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const orderId = `PEH-IND-2026-${randomSuffix}`;
    const awbNumber = `BD${Math.floor(10000000 + Math.random() * 90000000)}IN`;

    const isStitchedOrder = cart.some((i) => i.stitchingOption !== 'unstitched');
    const estimatedDays = isStitchedOrder ? '5-7 Days (Bespoke Tailoring & Dispatch)' : '2-4 Days (BlueDart Express Air)';

    const now = new Date();
    const dateFormatted = now.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    const newOrder: Order = {
      id: orderId,
      createdAt: dateFormatted,
      customer: payload.customer,
      items: [...cart],
      subtotal: cartSubtotal,
      stitchingTotal: cartStitchingTotal,
      discount: appliedCoupon ? appliedCoupon.discountAmount : 0,
      couponCode: appliedCoupon?.code,
      shippingFee: payload.shippingMethod === 'Priority Superfast Air (24-48 Hours)' ? 150 : 0,
      shippingMethod: payload.shippingMethod,
      grandTotal:
        cartGrandTotal + (payload.shippingMethod === 'Priority Superfast Air (24-48 Hours)' ? 150 : 0),
      paymentMethod: payload.paymentMethod,
      paymentStatus: payload.paymentMethod === 'cod' ? 'Pending COD' : 'Paid',
      upiDetails: payload.upiDetails,
      orderStatus: 'Confirmed',
      courierName: 'BlueDart Express Air',
      trackingNumber: awbNumber,
      estimatedDelivery: estimatedDays,
      giftWrap: !!payload.giftWrap,
      giftMessage: payload.giftMessage,
      trackingTimeline: [
        {
          status: 'Order Placed & Confirmed',
          description: `Order received with ${payload.paymentMethod.toUpperCase()} payment verification. Invoice generated.`,
          location: 'Pehnava Operations Hub, New Delhi',
          timestamp: dateFormatted,
          isCompleted: true,
          isCurrent: true,
        },
        {
          status: isStitchedOrder ? 'Master Tailoring & Custom Stitching' : 'Warehouse Pick & Authenticity Seal Check',
          description: isStitchedOrder
            ? 'Bespoke tailoring in progress with interlock, pure lining, and laser cutwork attachment.'
            : 'Authentic Pakistani Designer original box sealed with hologram tag.',
          location: 'Pehnava Studio, New Delhi',
          timestamp: 'Upcoming (within 24-48 hrs)',
          isCompleted: false,
        },
        {
          status: 'Dispatched via BlueDart Express Air',
          description: `AWB ${awbNumber} assigned. Dispatched to destination airport hub.`,
          location: 'IGI Airport Air Cargo Terminal, Delhi',
          timestamp: 'Pending Dispatch',
          isCompleted: false,
        },
        {
          status: 'Out for Delivery',
          description: `Delivery courier assigned for ${payload.customer.pincode}, ${payload.customer.city}.`,
          location: `${payload.customer.city} Local Courier Hub`,
          timestamp: 'Pending Arrival',
          isCompleted: false,
        },
        {
          status: 'Delivered',
          description: 'Package delivered with OTP confirmation to recipient.',
          location: `${payload.customer.addressLine1}, ${payload.customer.city}`,
          timestamp: 'Pending Delivery',
          isCompleted: false,
        },
      ],
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    setTrackingOrderId(orderId);
    showToast(
      'Order Placed Successfully!',
      `Order #${orderId} confirmed. We sent confirmation to ${payload.customer.phone}`,
      'success'
    );
    return newOrder;
  }, [cart, cartSubtotal, cartStitchingTotal, appliedCoupon, cartGrandTotal, clearCart, showToast]);

  const getOrderById = useCallback((orderId: string) => {
    const clean = orderId.trim().toUpperCase();
    return orders.find((o) => o.id.toUpperCase() === clean || o.trackingNumber.toUpperCase() === clean);
  }, [orders]);

  const getOrdersByPhone = useCallback((phone: string) => {
    const clean = phone.replace(/\D/g, '');
    return orders.filter((o) => o.customer.phone.replace(/\D/g, '').includes(clean));
  }, [orders]);

  // Product Management (Admin)
  const addProduct = useCallback((newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]);
    showToast('Product Added', `${newProduct.title} has been added to the store.`, 'success');
  }, [showToast]);

  const updateProduct = useCallback((updatedProduct: Product) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
    showToast('Product Updated', `${updatedProduct.title} details updated.`, 'success');
  }, [showToast]);

  const deleteProduct = useCallback((productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    showToast('Product Deleted', 'Product was removed from catalog.', 'info');
  }, [showToast]);

  const updateOrderStatus = useCallback((
    orderId: string,
    status: Order['orderStatus'],
    trackingNumber?: string,
    location?: string,
    description?: string
  ) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          const nowStr = new Date().toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit',
          });
          const newTimeline = [...ord.trackingTimeline];
          newTimeline.push({
            status: `Status changed to ${status}`,
            description: description || `Order milestone updated to ${status}`,
            location: location || 'Central Logistics Hub',
            timestamp: nowStr,
            isCompleted: true,
            isCurrent: true,
          });
          return {
            ...ord,
            orderStatus: status,
            trackingNumber: trackingNumber || ord.trackingNumber,
            trackingTimeline: newTimeline,
          };
        }
        return ord;
      })
    );
    showToast('Order Status Updated', `Order ${orderId} updated to ${status}`, 'success');
  }, [showToast]);

  const addReview = useCallback((productId: string, reviewData: Omit<Review, 'id' | 'date' | 'helpfulCount'>) => {
    const newRev: Review = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      date: 'Just now',
      helpfulCount: 0,
    };
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const updatedReviews = [newRev, ...p.reviews];
          const newAvgRating = Number(
            (
              updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length
            ).toFixed(1)
          );
          return {
            ...p,
            reviews: updatedReviews,
            rating: newAvgRating,
            reviewCount: updatedReviews.length,
          };
        }
        return p;
      })
    );
    showToast('Review Submitted', 'Thank you for reviewing! Your feedback helps other Indian buyers.', 'success');
  }, [showToast]);

  // Modal triggers
  const openProductDetail = useCallback((productId: string) => {
    setSelectedProductId(productId);
    setActiveModal('product_detail');
  }, []);

  const openOrderTracking = useCallback((orderId?: string) => {
    if (orderId) setTrackingOrderId(orderId);
    setActiveModal('order_tracking');
  }, []);

  const openCart = useCallback(() => setActiveModal('cart'), []);
  const openCheckout = useCallback(() => setActiveModal('checkout'), []);
  const openWishlist = useCallback(() => setActiveModal('wishlist'), []);
  const openAdmin = useCallback(() => setActiveModal('admin'), []);
  const openSizeGuide = useCallback(() => setActiveModal('size_guide'), []);
  const closeModals = useCallback(() => {
    setActiveModal(null);
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  // Indian Pincode Delivery Estimator
  const checkPincodeDelivery = useCallback((pincode: string): PincodeInfo => {
    const cleanPin = pincode.trim().replace(/\D/g, '');
    const prefix = cleanPin.substring(0, 2);

    let city = 'Metro City';
    let state = 'India';
    let days = '2-4 Business Days';

    if (prefix === '11') {
      city = 'New Delhi';
      state = 'Delhi NCR';
      days = '24-48 Hours (Express)';
    } else if (prefix === '40') {
      city = 'Mumbai';
      state = 'Maharashtra';
      days = '24-48 Hours (Express)';
    } else if (prefix === '56') {
      city = 'Bengaluru';
      state = 'Karnataka';
      days = '2-3 Business Days';
    } else if (prefix === '50') {
      city = 'Hyderabad';
      state = 'Telangana';
      days = '2-3 Business Days';
    } else if (prefix === '70') {
      city = 'Kolkata';
      state = 'West Bengal';
      days = '2-4 Business Days';
    } else if (prefix === '60') {
      city = 'Chennai';
      state = 'Tamil Nadu';
      days = '3 Business Days';
    } else if (prefix === '30') {
      city = 'Jaipur';
      state = 'Rajasthan';
      days = '2 Business Days';
    } else if (prefix === '22') {
      city = 'Lucknow';
      state = 'Uttar Pradesh';
      days = '2 Business Days';
    } else if (prefix === '38') {
      city = 'Ahmedabad';
      state = 'Gujarat';
      days = '2-3 Business Days';
    } else if (prefix === '16' || prefix === '14') {
      city = 'Chandigarh / Punjab';
      state = 'Punjab & Haryana';
      days = '2 Business Days';
    }

    const isValidPin = cleanPin.length === 6;

    return {
      pincode: cleanPin,
      city: isValidPin ? city : 'India',
      state: isValidPin ? state : '',
      isDeliverable: isValidPin,
      isCodAvailable: isValidPin,
      estimatedDays: isValidPin ? days : '2-5 Business Days',
      courierPartner: 'BlueDart Express Air & Delhivery Priority',
    };
  }, []);

  return (
    <EcommerceContext.Provider
      value={{
        products,
        cart,
        wishlist,
        orders,
        appliedCoupon,
        currency,
        setCurrency,
        formatPrice,
        filters,
        setFilters,
        resetFilters,
        activeModal,
        selectedProductId,
        trackingOrderId,
        toast,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        cartSubtotal,
        cartStitchingTotal,
        cartGrandTotal,
        freeShippingRemaining,
        bundleDiscountPercent,
        bundleDiscountAmount,
        discountAmount,
        nextTierInfo,
        toggleWishlist,
        isInWishlist,
        applyCoupon,
        removeCoupon,
        createOrder,
        getOrderById,
        getOrdersByPhone,
        addProduct,
        updateProduct,
        deleteProduct,
        updateOrderStatus,
        addReview,
        openProductDetail,
        openOrderTracking,
        openCart,
        openCheckout,
        openWishlist,
        openAdmin,
        openSizeGuide,
        closeModals,
        showToast,
        checkPincodeDelivery,
      }}
    >
      {children}
    </EcommerceContext.Provider>
  );
}

export function useEcommerce() {
  const context = useContext(EcommerceContext);
  if (!context) {
    throw new Error('useEcommerce must be used within an EcommerceProvider');
  }
  return context;
}
