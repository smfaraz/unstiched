'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useEcommerce } from '@/context/EcommerceContext';
import { Product, Order } from '@/types/ecommerce';
import {
  X,
  Plus,
  Edit2,
  Trash2,
  Package,
  Boxes,
  Truck,
  CheckCircle,
  Save,
  Search,
  RefreshCw,
  Sparkles,
  Download,
} from 'lucide-react';

export default function AdminProductManagerModal() {
  const {
    products,
    orders,
    activeModal,
    closeModals,
    addProduct,
    updateProduct,
    deleteProduct,
    updateOrderStatus,
    formatPrice,
  } = useEcommerce();

  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'add_product'>('products');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  // New Product Form State
  const [newProduct, setNewProduct] = useState<Omit<Product, 'id' | 'reviews' | 'rating' | 'reviewCount'>>({
    title: '',
    slug: 'maria-b-luxury-lawn',
    brand: 'Maria B.',
    sku: 'PEH-LNW-8921',
    price: 3999,
    originalPrice: 4999,
    discountPercent: 20,
    category: 'Luxury Lawn',
    fabric: 'Pure Lawn',
    suitType: '3-Piece Unstitched',
    description: 'Authentic Pakistani luxury lawn suit with delicate thread embroidery, digital organza dupatta, and dyed cotton trouser.',
    images: [
      '/images/products/pink_lawn_suit.jpg',
      '/images/products/mint_chikankari_suit.jpg',
    ],
    colors: [{ name: 'Emerald Crimson', hex: '#6B1428' }],
    availableSizes: ['Unstitched', 'XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', 'Custom Stitching'],
    origin: '100% Authentic Pakistani Designer Original - Direct Import',
    careInstructions: ['Dry Clean Recommended for Embroidered Works', 'Gentle Cold Water Hand Wash for Pure Lawn Fabric'],
    inStock: true,
    stockCount: 15,
    isNewArrival: true,
    isBestseller: false,
    isFastDispatch24h: true,
    readyToShipDays: 1,
    pieceDetails: {
      shirt: '3.0m Embroidered Pure Lawn',
      dupatta: '2.5m Printed Organza Border',
      trouser: '2.5m Solid Dyed Cotton Cambric',
    },
    tags: ['Lawn 2026', 'Eid Drop', 'Embroidered'],
  });

  if (activeModal !== 'admin') return null;

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.title || !newProduct.brand) return;

    addProduct({
      ...newProduct,
      id: `prod-${Date.now()}`,
      rating: 5.0,
      reviewCount: 1,
      reviews: [
        {
          id: `rev-${Date.now()}`,
          author: 'Admin Preview User',
          location: 'Delhi',
          rating: 5,
          title: 'Direct Import Quality',
          comment: 'New suit added to inventory.',
          date: 'Just now',
          verifiedPurchase: true,
          helpfulCount: 0,
          selectedOption: '3-Piece Unstitched',
        },
      ],
    });

    setActiveTab('products');
  };

  const handleExportData = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify({ products, orders }, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `pehnava_store_export_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-[#FAF9F6] rounded-xs shadow-2xl overflow-hidden border border-[#E5E2D9] my-8 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-[#E5E2D9] shrink-0">
          <div className="flex items-center gap-2.5">
            <Boxes className="w-5 h-5 text-[#8B4513]" />
            <span className="font-serif text-lg font-bold text-[#1A1A1A] tracking-tight">
              Pehnava Lawns • Store Manager & Inventory
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportData}
              className="hidden sm:flex items-center gap-1.5 bg-[#FAF5EE] hover:bg-[#EBE7DF] text-[#1A1A1A] text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-xs border border-[#E5E2D9] transition"
              title="Export complete catalog and orders to JSON"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Data</span>
            </button>
            <button
              onClick={closeModals}
              className="p-1.5 text-[#1A1A1A] hover:bg-[#F2F0E9] rounded-xs transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-[#F2F0E9] px-6 py-2 border-b border-[#E5E2D9] flex items-center gap-4 text-xs font-bold text-[#1A1A1A]">
          <button
            onClick={() => setActiveTab('products')}
            className={`py-1.5 px-3 rounded-xs uppercase tracking-wider transition ${
              activeTab === 'products' ? 'bg-black text-white shadow-xs' : 'hover:bg-[#E5E2D9] text-[#555]'
            }`}
          >
            Inventory ({products.length})
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`py-1.5 px-3 rounded-xs uppercase tracking-wider transition ${
              activeTab === 'orders' ? 'bg-black text-white shadow-xs' : 'hover:bg-[#E5E2D9] text-[#555]'
            }`}
          >
            Orders & Shipments ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('add_product')}
            className={`py-1.5 px-3 rounded-xs uppercase tracking-wider transition flex items-center gap-1 ${
              activeTab === 'add_product' ? 'bg-black text-white shadow-xs' : 'hover:bg-[#E5E2D9] text-[#555]'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add New Suit</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="overflow-y-auto p-4 sm:p-6 flex-1 text-xs">
          {/* TAB 1: PRODUCT LIST */}
          {activeTab === 'products' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div className="relative flex-1 max-w-sm">
                  <input
                    type="text"
                    placeholder="Search by title, brand, or SKU..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-white border border-[#E5E2D9] rounded-xs pl-8 pr-3 py-2 text-xs focus:outline-none focus:border-black"
                  />
                  <Search className="w-3.5 h-3.5 text-[#777] absolute left-2.5 top-2.5" />
                </div>
                <button
                  onClick={() => setActiveTab('add_product')}
                  className="bg-black hover:bg-[#222] text-white px-4 py-2 rounded-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-xs transition"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Product</span>
                </button>
              </div>

              <div className="bg-white rounded-xs border border-[#E5E2D9] shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-[#FAF5EE] border-b border-[#E5E2D9] text-[#1A1A1A] font-serif font-bold text-[11px]">
                        <th className="p-3">Product</th>
                        <th className="p-3">Brand</th>
                        <th className="p-3">Category</th>
                        <th className="p-3">Price (INR)</th>
                        <th className="p-3">Stock</th>
                        <th className="p-3">24h Dispatch</th>
                        <th className="p-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E5E2D9] text-[#1A1A1A]">
                      {products
                        .filter(
                          (p) =>
                            p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            p.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            p.sku.toLowerCase().includes(searchTerm.toLowerCase())
                        )
                        .map((p) => (
                          <tr key={p.id} className="hover:bg-[#FAF9F6] transition">
                            <td className="p-3 flex items-center gap-2.5">
                              <div className="relative w-10 h-12 bg-[#EBE9E1] rounded-xs overflow-hidden shrink-0 border border-[#E5E2D9]">
                                <Image
                                  src={p.images[0]}
                                  alt={p.title}
                                  fill
                                  className="object-cover"
                                  sizes="40px"
                                />
                              </div>
                              <div>
                                <div className="font-serif font-bold text-[#1A1A1A] max-w-xs truncate">
                                  {p.title}
                                </div>
                                <div className="text-[10px] text-[#777]">SKU: {p.sku}</div>
                              </div>
                            </td>
                            <td className="p-3 font-semibold text-[#8B4513]">{p.brand}</td>
                            <td className="p-3 text-[#555]">{p.category}</td>
                            <td className="p-3 font-bold text-[#1A1A1A]">
                              {formatPrice(p.price)}
                            </td>
                            <td className="p-3">
                              <span
                                className={`px-2 py-0.5 rounded-xs text-[9px] font-bold uppercase tracking-wider border ${
                                  p.stockCount > 5
                                    ? 'bg-[#FAF5EE] text-[#8B4513] border-[#E5E2D9]'
                                    : 'bg-[#FAF5EE] text-black border-[#E5E2D9]'
                                }`}
                              >
                                {p.stockCount} in stock
                              </span>
                            </td>
                            <td className="p-3">
                              {p.isFastDispatch24h ? (
                                <span className="text-[#8B4513] font-bold uppercase text-[10px] tracking-wider">Yes (24h)</span>
                              ) : (
                                <span className="text-[#777]">Standard</span>
                              )}
                            </td>
                            <td className="p-3 text-right">
                              <button
                                onClick={() => deleteProduct(p.id)}
                                className="p-1.5 text-[#8B4513] hover:bg-[#FAF5EE] rounded-xs transition"
                                title="Delete product"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ORDERS FULFILLMENT */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <div className="bg-white rounded-xs border border-[#E5E2D9] shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-[#FAF5EE] border-b border-[#E5E2D9] text-[#1A1A1A] font-serif font-bold text-[11px]">
                        <th className="p-3">Order ID</th>
                        <th className="p-3">Customer</th>
                        <th className="p-3">City / State</th>
                        <th className="p-3">Items</th>
                        <th className="p-3">Total Amount</th>
                        <th className="p-3">Payment</th>
                        <th className="p-3">Fulfillment Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E5E2D9] text-[#1A1A1A]">
                      {orders.map((o) => (
                        <tr key={o.id} className="hover:bg-[#FAF9F6] transition">
                          <td className="p-3 font-mono font-bold text-[#8B4513]">
                            #{o.id}
                            <div className="text-[10px] text-[#777] font-sans">{o.createdAt}</div>
                          </td>
                          <td className="p-3">
                            <div className="font-bold">{o.customer.fullName}</div>
                            <div className="text-[10px] text-[#777]">+91 {o.customer.phone}</div>
                          </td>
                          <td className="p-3 text-[#555]">
                            {o.customer.city}, {o.customer.state} ({o.customer.pincode})
                          </td>
                          <td className="p-3">
                            {o.items.length} suit(s)
                            <div className="text-[10px] text-[#777]">
                              {o.items.some((i) => i.stitchingOption !== 'unstitched')
                                ? 'Custom Tailored'
                                : 'Unstitched'}
                            </div>
                          </td>
                          <td className="p-3 font-bold text-[#1A1A1A]">
                            {formatPrice(o.grandTotal)}
                          </td>
                          <td className="p-3">
                            <span className="uppercase text-[9px] font-bold bg-[#FAF5EE] px-2 py-0.5 rounded-xs border border-[#E5E2D9] text-[#8B4513]">
                              {o.paymentMethod}
                            </span>
                          </td>
                          <td className="p-3">
                            <select
                              value={o.orderStatus}
                              onChange={(e) =>
                                updateOrderStatus(
                                  o.id,
                                  e.target.value as Order['orderStatus'],
                                  `Status changed to ${e.target.value} in backend`,
                                  'Delhi Central Fulfillment Hub'
                                )
                              }
                              className="bg-[#FAF5EE] border border-[#E5E2D9] rounded-xs p-1.5 text-xs font-bold text-[#1A1A1A]"
                            >
                              <option value="Confirmed">Confirmed</option>
                              <option value="Tailoring & QC">Tailoring & QC</option>
                              <option value="Dispatched">Dispatched</option>
                              <option value="In Transit">In Transit</option>
                              <option value="Out for Delivery">Out for Delivery</option>
                              <option value="Delivered">Delivered</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: ADD NEW SUIT */}
          {activeTab === 'add_product' && (
            <form onSubmit={handleCreateProduct} className="bg-white p-5 rounded-xs border border-[#E5E2D9] space-y-4">
              <div className="font-serif font-bold text-sm text-[#1A1A1A] border-b border-[#E5E2D9] pb-2">
                Add New Pakistani Lawn Suit to Catalog
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="new-suit-title-input" className="block text-[10px] font-bold uppercase tracking-wider text-[#555] mb-1">
                    Suit Title *
                  </label>
                  <input
                    id="new-suit-title-input"
                    type="text"
                    required
                    value={newProduct.title}
                    onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
                    placeholder="e.g. Maria B. Mbroidered Velvet & Lawn Festive Edition"
                    className="w-full bg-[#FAF9F6] border border-[#E5E2D9] rounded-xs p-2 text-xs focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label htmlFor="new-suit-brand-select" className="block text-[10px] font-bold uppercase tracking-wider text-[#555] mb-1">
                    Designer Brand *
                  </label>
                  <select
                    id="new-suit-brand-select"
                    value={newProduct.brand}
                    onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })}
                    className="w-full bg-[#FAF9F6] border border-[#E5E2D9] rounded-xs p-2 text-xs focus:outline-none focus:border-black"
                  >
                    <option value="Maria B.">Maria B.</option>
                    <option value="Sana Safinaz">Sana Safinaz</option>
                    <option value="Asim Jofa">Asim Jofa</option>
                    <option value="Baroque">Baroque</option>
                    <option value="Crimson">Crimson</option>
                    <option value="Zara Shahjahan">Zara Shahjahan</option>
                    <option value="Charizma">Charizma</option>
                    <option value="Mushq">Mushq</option>
                    <option value="Sobia Nazir">Sobia Nazir</option>
                    <option value="Gul Ahmed">Gul Ahmed</option>
                    <option value="Pehnava Originals">Pehnava Originals</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div>
                  <label htmlFor="new-suit-price-input" className="block text-[10px] font-bold uppercase tracking-wider text-[#555] mb-1">
                    Sale Price (₹ INR) *
                  </label>
                  <input
                    id="new-suit-price-input"
                    type="number"
                    required
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                    className="w-full bg-[#FAF9F6] border border-[#E5E2D9] rounded-xs p-2 text-xs font-bold focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label htmlFor="new-suit-original-price-input" className="block text-[10px] font-bold uppercase tracking-wider text-[#555] mb-1">
                    MRP / Original (₹ INR) *
                  </label>
                  <input
                    id="new-suit-original-price-input"
                    type="number"
                    required
                    value={newProduct.originalPrice}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, originalPrice: Number(e.target.value) })
                    }
                    className="w-full bg-[#FAF9F6] border border-[#E5E2D9] rounded-xs p-2 text-xs focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label htmlFor="new-suit-category-select" className="block text-[10px] font-bold uppercase tracking-wider text-[#555] mb-1">
                    Category *
                  </label>
                  <select
                    id="new-suit-category-select"
                    value={newProduct.category}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        category: e.target.value as Product['category'],
                      })
                    }
                    className="w-full bg-[#FAF9F6] border border-[#E5E2D9] rounded-xs p-2 text-xs focus:outline-none focus:border-black"
                  >
                    <option value="Luxury Lawn">Luxury Lawn</option>
                    <option value="Curves (XL-6XL)">Curves (XL-6XL)</option>
                    <option value="Festive Formals">Festive Formals</option>
                    <option value="Daily Cotton Lawn">Daily Cotton Lawn</option>
                    <option value="Under ₹1999">Under ₹1999</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="new-suit-stock-input" className="block text-[10px] font-bold uppercase tracking-wider text-[#555] mb-1">
                    Stock Quantity *
                  </label>
                  <input
                    id="new-suit-stock-input"
                    type="number"
                    value={newProduct.stockCount}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, stockCount: Number(e.target.value) })
                    }
                    className="w-full bg-[#FAF9F6] border border-[#E5E2D9] rounded-xs p-2 text-xs font-bold focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="new-suit-description-input" className="block text-[10px] font-bold uppercase tracking-wider text-[#555] mb-1">
                  Product Description & Fabric Highlights
                </label>
                <textarea
                  id="new-suit-description-input"
                  rows={2}
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  className="w-full bg-[#FAF9F6] border border-[#E5E2D9] rounded-xs p-2 text-xs focus:outline-none focus:border-black"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('products')}
                  className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#777] hover:text-black"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-black hover:bg-[#222] text-white px-6 py-2.5 rounded-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-xs transition"
                >
                  <Save className="w-4 h-4" />
                  <span>Publish Suit</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
