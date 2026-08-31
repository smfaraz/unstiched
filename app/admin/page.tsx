'use client';

import React, { useState } from 'react';
import { useEcommerce } from '@/context/EcommerceContext';
import Link from 'next/link';
import Image from 'next/image';
import {
  Package,
  Truck,
  Scissors,
  CheckCircle2,
  AlertCircle,
  Clock,
  Plus,
  Trash2,
  Edit,
  ArrowRight,
  ChevronRight,
  DollarSign,
  TrendingUp,
  Users,
  Search,
  ShieldCheck,
} from 'lucide-react';
import { Order } from '@/types/ecommerce';

export default function AdminPage() {
  const { orders, products, updateOrderStatus, formatPrice, addProduct, deleteProduct } = useEcommerce();

  const [activeTab, setActiveTab] = useState<'orders' | 'inventory' | 'analytics'>('orders');
  const [orderFilter, setOrderFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusUpdateToast, setStatusUpdateToast] = useState('');

  const filteredOrders = orders.filter((o) => {
    if (orderFilter !== 'all' && o.orderStatus !== orderFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        o.id.toLowerCase().includes(q) ||
        o.customer.fullName.toLowerCase().includes(q) ||
        o.customer.phone.includes(q) ||
        o.customer.city.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const totalRevenue = orders.reduce((sum, o) => sum + o.grandTotal, 0);
  const totalItemsSold = orders.reduce((sum, o) => sum + o.items.reduce((iSum, i) => iSum + i.quantity, 0), 0);

  const handleAdvanceStatus = (orderId: string, currentStatus: Order['orderStatus']) => {
    const sequence: Order['orderStatus'][] = [
      'Confirmed',
      'Tailoring & QC',
      'Dispatched',
      'In Transit',
      'Out for Delivery',
      'Delivered',
    ];
    const currentIndex = sequence.indexOf(currentStatus);
    if (currentIndex >= 0 && currentIndex < sequence.length - 1) {
      const nextStatus = sequence[currentIndex + 1];
      const descMap: Record<Order['orderStatus'], { desc: string; loc: string }> = {
        'Confirmed': { desc: 'Payment verified and inventory allocated.', loc: 'Central Fulfillment, New Delhi' },
        'Tailoring & QC': { desc: 'Master artisans verified 100s yarn quality & schiffli borders.', loc: 'Quality Atelier, Okhla Phase III' },
        'Dispatched': { desc: 'Handed over to BlueDart Air Express. Tracking AWB live.', loc: 'IGI Airport Hub, New Delhi' },
        'In Transit': { desc: 'Consignment in transit between express airport hubs.', loc: 'Regional Transit Hub' },
        'Out for Delivery': { desc: 'Delivery executive assigned with doorstep OTP verification.', loc: 'Local City BlueDart Delivery Hub' },
        'Delivered': { desc: 'Package delivered safely to customer with verified OTP.', loc: 'Customer Doorstep' },
        'Cancelled': { desc: 'Order cancelled.', loc: 'Support Desk' },
      };

      updateOrderStatus(orderId, nextStatus, undefined, descMap[nextStatus].loc, descMap[nextStatus].desc);
      setStatusUpdateToast(`Order #${orderId} status advanced to ${nextStatus}!`);
      setTimeout(() => setStatusUpdateToast(''), 3000);
    }
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
          <span className="text-black font-semibold">Store Operations & Admin Dashboard</span>
        </nav>

        {/* Header & Metrics */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E5E2D9] pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-[#8B4513] text-white text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-xs">
                Admin Control Room
              </span>
              <span className="text-xs text-[#777]">Live Operations</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-black mt-1">
              Unstitched Operations & Orders Studio
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/products"
              className="bg-black text-white px-4 py-2 rounded-xs text-xs font-bold uppercase tracking-wider hover:bg-[#8B4513] transition shadow-xs"
            >
              View Live Storefront
            </Link>
          </div>
        </div>

        {/* Toast Alert */}
        {statusUpdateToast && (
          <div className="p-4 bg-[#E8F5E9] border border-[#C8E6C9] text-[#2E7D32] rounded-xs text-xs font-bold flex items-center gap-2 animate-bounce">
            <CheckCircle2 className="w-4 h-4" />
            <span>{statusUpdateToast}</span>
          </div>
        )}

        {/* Top Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-xs border border-[#E5E2D9] shadow-xs space-y-2">
            <div className="flex items-center justify-between text-[#888]">
              <span className="text-[10px] font-bold uppercase tracking-wider">Total Sales Volume</span>
              <DollarSign className="w-4 h-4 text-[#8B4513]" />
            </div>
            <div className="text-2xl font-serif font-bold text-black">{formatPrice(totalRevenue)}</div>
            <p className="text-[10px] text-[#2E7D32] font-semibold flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              <span>+18.4% this week (Festive Season)</span>
            </p>
          </div>

          <div className="bg-white p-5 rounded-xs border border-[#E5E2D9] shadow-xs space-y-2">
            <div className="flex items-center justify-between text-[#888]">
              <span className="text-[10px] font-bold uppercase tracking-wider">Total Orders</span>
              <Package className="w-4 h-4 text-[#8B4513]" />
            </div>
            <div className="text-2xl font-serif font-bold text-black">{orders.length}</div>
            <p className="text-[10px] text-[#666]">
              {orders.filter((o) => o.orderStatus === 'Confirmed' || o.orderStatus === 'Tailoring & QC').length} pending dispatch
            </p>
          </div>

          <div className="bg-white p-5 rounded-xs border border-[#E5E2D9] shadow-xs space-y-2">
            <div className="flex items-center justify-between text-[#888]">
              <span className="text-[10px] font-bold uppercase tracking-wider">Suits Dispatched</span>
              <Users className="w-4 h-4 text-[#8B4513]" />
            </div>
            <div className="text-2xl font-serif font-bold text-black">{totalItemsSold}</div>
            <p className="text-[10px] text-[#2E7D32] font-semibold">100% On-Time BlueDart Fulfillment</p>
          </div>

          <div className="bg-white p-5 rounded-xs border border-[#E5E2D9] shadow-xs space-y-2">
            <div className="flex items-center justify-between text-[#888]">
              <span className="text-[10px] font-bold uppercase tracking-wider">Active Catalog Designs</span>
              <ShieldCheck className="w-4 h-4 text-[#8B4513]" />
            </div>
            <div className="text-2xl font-serif font-bold text-black">{products.length}</div>
            <p className="text-[10px] text-[#666]">100% Original Pakistani Stock</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-[#E5E2D9] gap-4 text-xs font-bold uppercase tracking-wider">
          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-3 border-b-2 transition ${
              activeTab === 'orders'
                ? 'border-[#8B4513] text-[#8B4513]'
                : 'border-transparent text-[#777] hover:text-black'
            }`}
          >
            Live Customer Orders ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('inventory')}
            className={`pb-3 border-b-2 transition ${
              activeTab === 'inventory'
                ? 'border-[#8B4513] text-[#8B4513]'
                : 'border-transparent text-[#777] hover:text-black'
            }`}
          >
            Catalog Inventory ({products.length})
          </button>
        </div>

        {/* Tab 1: Orders Management */}
        {activeTab === 'orders' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Filter and Search Bar */}
            <div className="bg-white p-4 border border-[#E5E2D9] rounded-xs shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-[#888] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by Order ID, Name, Phone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-[#FAF9F6] border border-[#E5E2D9] rounded-xs text-xs focus:outline-none focus:border-black"
                />
              </div>

              <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                {['all', 'Confirmed', 'Tailoring & QC', 'Dispatched', 'Delivered'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setOrderFilter(status)}
                    className={`px-3 py-1.5 rounded-xs text-[11px] font-bold uppercase tracking-wider transition ${
                      orderFilter === status
                        ? 'bg-[#8B4513] text-white'
                        : 'bg-[#FAF9F6] border border-[#E5E2D9] text-[#666]'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white border border-[#E5E2D9] rounded-xs overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#FAF5EE] border-b border-[#E5E2D9] text-[10px] font-bold uppercase tracking-wider text-[#8B4513]">
                      <th className="p-4">Order ID & Date</th>
                      <th className="p-4">Customer & City</th>
                      <th className="p-4">Items & Tailoring</th>
                      <th className="p-4">Total Amount</th>
                      <th className="p-4">Live Status</th>
                      <th className="p-4 text-right">Quick Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F2F0E9]">
                    {filteredOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-[#FAF9F6] transition">
                        <td className="p-4">
                          <div className="font-mono font-bold text-black">#{order.id}</div>
                          <div className="text-[10px] text-[#888]">{order.createdAt}</div>
                          <div className="text-[10px] text-[#8B4513] font-semibold mt-0.5">
                            AWB: {order.trackingNumber}
                          </div>
                        </td>

                        <td className="p-4">
                          <div className="font-bold text-black">{order.customer.fullName}</div>
                          <div className="text-[11px] text-[#666]">{order.customer.phone}</div>
                          <div className="text-[10px] text-[#888]">
                            {order.customer.city}, {order.customer.state} ({order.customer.pincode})
                          </div>
                        </td>

                        <td className="p-4">
                          <div className="space-y-1">
                            {order.items.map((item) => (
                              <div key={item.id} className="text-[11px] text-[#444]">
                                <span className="font-semibold">{item.quantity}x</span> {item.product.title.slice(0, 30)}...
                                <span className="text-[#8B4513] ml-1">
                                  ({item.stitchingOption === 'unstitched' ? 'Unstitched' : `Stitched: ${item.selectedSize || 'Custom'}`})
                                </span>
                              </div>
                            ))}
                          </div>
                        </td>

                        <td className="p-4">
                          <div className="font-bold text-black">{formatPrice(order.grandTotal)}</div>
                          <div className="text-[10px] uppercase font-semibold text-[#2E7D32]">
                            {order.paymentMethod} • {order.paymentStatus}
                          </div>
                        </td>

                        <td className="p-4">
                          <span className="inline-block bg-[#E8F5E9] border border-[#C8E6C9] text-[#2E7D32] px-2.5 py-1 rounded-xs font-bold text-[10px] uppercase">
                            {order.orderStatus}
                          </span>
                        </td>

                        <td className="p-4 text-right">
                          <div className="flex flex-col items-end gap-1.5">
                            {order.orderStatus !== 'Delivered' && (
                              <button
                                onClick={() => handleAdvanceStatus(order.id, order.orderStatus)}
                                className="bg-[#8B4513] hover:bg-[#72380F] text-white px-3 py-1.5 rounded-xs text-[10px] font-bold uppercase tracking-wider transition"
                              >
                                Advance Stage →
                              </button>
                            )}
                            <Link
                              href={`/track-order?id=${order.id}`}
                              className="text-[11px] font-bold text-[#666] hover:text-black underline"
                            >
                              View Customer Tracking
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Inventory Catalog */}
        {activeTab === 'inventory' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-white border border-[#E5E2D9] rounded-xs overflow-hidden shadow-xs">
              <div className="p-4 bg-[#FAF9F6] border-b border-[#E5E2D9] flex justify-between items-center">
                <h3 className="font-serif font-bold text-base text-black">
                  Catalog Inventory ({products.length} Designs)
                </h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#FAF5EE] border-b border-[#E5E2D9] text-[10px] font-bold uppercase tracking-wider text-[#8B4513]">
                      <th className="p-4">Product</th>
                      <th className="p-4">Designer & Category</th>
                      <th className="p-4">Price</th>
                      <th className="p-4">Stock</th>
                      <th className="p-4">Ratings</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F2F0E9]">
                    {products.map((product) => (
                      <tr key={product.id} className="hover:bg-[#FAF9F6] transition">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="relative w-12 aspect-3/4 bg-[#EBE9E1] rounded-xs overflow-hidden shrink-0 border border-[#E5E2D9]">
                              <Image
                                src={product.images[0]}
                                alt={product.title}
                                fill
                                className="object-cover"
                                sizes="50px"
                              />
                            </div>
                            <div>
                              <Link
                                href={`/products/${product.id}`}
                                className="font-serif font-bold text-black hover:text-[#8B4513] transition"
                              >
                                {product.title}
                              </Link>
                              <div className="text-[10px] text-[#888]">SKU: {product.sku}</div>
                            </div>
                          </div>
                        </td>

                        <td className="p-4">
                          <div className="font-bold text-[#8B4513]">{product.brand}</div>
                          <div className="text-[#666]">{product.category}</div>
                          <div className="text-[10px] text-[#888]">{product.fabric}</div>
                        </td>

                        <td className="p-4">
                          <div className="font-bold text-black">{formatPrice(product.price)}</div>
                          <div className="text-[10px] text-[#888] line-through">
                            {formatPrice(product.originalPrice)}
                          </div>
                        </td>

                        <td className="p-4">
                          <span
                            className={`inline-block px-2 py-0.5 rounded-xs text-[10px] font-bold uppercase ${
                              product.inStock
                                ? 'bg-[#E8F5E9] text-[#2E7D32]'
                                : 'bg-[#FFEBEE] text-[#D32F2F]'
                            }`}
                          >
                            {product.inStock ? `${product.stockCount} in stock` : 'Sold Out'}
                          </span>
                        </td>

                        <td className="p-4">
                          <div className="font-semibold text-black">★ {product.rating.toFixed(1)}</div>
                          <div className="text-[10px] text-[#888]">{product.reviewCount} reviews</div>
                        </td>

                        <td className="p-4 text-right">
                          <Link
                            href={`/products/${product.id}`}
                            className="bg-black hover:bg-[#2A2A2A] text-white px-3 py-1.5 rounded-xs text-[10px] font-bold uppercase tracking-wider inline-block"
                          >
                            View Page
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
