'use client';

import React from 'react';
import { useEcommerce } from '@/context/EcommerceContext';
import { Sparkles, Tag, Flame, Shield, Layers, Gem } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

export default function CategoryPills() {
  const { filters, setFilters } = useEcommerce();
  const pathname = usePathname();
  const router = useRouter();

  const pills = [
    { label: 'All Suits', category: 'All', icon: Layers },
    { label: 'New Arrivals', category: 'New Arrivals', icon: Sparkles, isHot: true },
    { label: 'Unstitched Elegance', category: 'Unstitched Elegance', icon: Flame },
    { label: 'Ready to Wear / Style Now', category: 'Ready to Wear', icon: Layers },
    { label: 'Festive Glam / Celebration Edit', category: 'Festive Glam', icon: Gem },
    { label: 'Formal Wear / Executive Style', category: 'Formal Wear', icon: Shield },
    { label: 'The Modern Edit / Contemporary', category: 'The Modern Edit', icon: Sparkles },
    { label: 'Ethnic Daily Wear', category: 'Ethnic Daily Wear', icon: Tag },
    { label: 'Curves (S to 4XL / 48)', category: 'Curves (XL-6XL)', icon: Sparkles, isSpecial: true },
  ];

  const handleSelect = (category: string) => {
    setFilters((prev) => ({
      ...prev,
      category,
      brand: [],
      searchQuery: '',
    }));

    if (pathname !== '/products') {
      router.push(`/products?category=${encodeURIComponent(category)}`);
    } else {
      const el = document.getElementById('products-collection');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="py-4 border-b border-[#E5E2D9] bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {pills.map((pill) => {
            const Icon = pill.icon;
            const isActive = filters.category === pill.category;

            return (
              <button
                key={pill.category}
                onClick={() => handleSelect(pill.category)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xs text-[11px] uppercase tracking-wider font-semibold whitespace-nowrap transition-all duration-200 shrink-0 border ${
                  isActive
                    ? 'bg-black text-white border-black shadow-xs'
                    : pill.isSpecial
                    ? 'bg-[#F2F0E9] text-[#8B4513] border-[#E5E2D9] hover:border-[#8B4513]'
                    : pill.isDiscount
                    ? 'bg-[#FAF5EE] text-[#8B4513] border-[#E5E2D9] hover:border-[#8B4513]'
                    : 'bg-white text-[#555] hover:text-black border-[#E5E2D9] hover:border-black'
                }`}
                id={`pill-cat-${pill.category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-[#8B4513]'}`} />
                <span>{pill.label}</span>
                {pill.isHot && !isActive && (
                  <span className="bg-[#8B4513] text-white text-[8px] px-1.5 py-0.5 rounded-xs font-bold uppercase tracking-widest">
                    Hot
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
