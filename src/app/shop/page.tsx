'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LuxuryNavbar } from '@/components/layout/LuxuryNavbar';
import { useCartStore } from '@/store/useCartStore';
import { ShoppingBag, Sparkles, Search } from 'lucide-react';
import { motion } from 'framer-motion';

interface ShopItem {
  id: number;
  name: string;
  category: string;
  size: string;
  price: number;
  image: string;
}

const FEATURED_SHOP_PRODUCTS: ShopItem[] = [
  {
    id: 1,
    name: "AMBER OUD (HARMAIN)",
    category: "Oud Collection",
    size: "12 ML",
    price: 390,
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "C R 7",
    category: "Fresh & Sport",
    size: "12 ML",
    price: 390,
    image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Cool Water",
    category: "Fresh & Aqua",
    size: "12 ML",
    price: 390,
    image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 4,
    name: "Ice Berg",
    category: "Fresh & Aqua",
    size: "12 ML",
    price: 390,
    image: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 5,
    name: "Amir Al Oud",
    category: "Arabic & Oud",
    size: "12 ML",
    price: 390,
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 6,
    name: "Hawas Ice",
    category: "Fresh & Spicy",
    size: "12 ML",
    price: 390,
    image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 7,
    name: "Gucci Flora",
    category: "Floral Luxury",
    size: "12 ML",
    price: 390,
    image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 8,
    name: "Motiya Bahar",
    category: "Traditional Floral",
    size: "12 ML",
    price: 390,
    image: "https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 9,
    name: "CLASSIC OUDH",
    category: "Oud Collection",
    size: "12 ML",
    price: 390,
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 10,
    name: "TURKISH OUDH",
    category: "Royal Oud",
    size: "12 ML",
    price: 390,
    image: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=800&auto=format&fit=crop"
  }
];

export default function ShopPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const { addItem } = useCartStore();

  const filteredProducts = FEATURED_SHOP_PRODUCTS.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddToCart = (item: ShopItem) => {
    addItem({
      productId: `shop-${item.id}`,
      name: item.name,
      slug: item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      image: item.image,
      size: item.size as any,
      price: item.price,
      quantity: 1,
      sku: `ASIF-SHOP-${item.id}`,
    });
    router.push('/cart');
  };

  return (
    <main className="bg-[#0B0B0B] min-h-screen text-white pt-28 pb-20 selection:bg-[#D4AF37] selection:text-[#0B0B0B]">
      <LuxuryNavbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Heading */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">
              Curated Fragrance Oils
            </span>
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white mb-4">
            ASIF Signature Shop
          </h1>
          <p className="text-gray-400 text-sm max-w-xl">
            Pure alcohol-free concentrated perfume oils packed in standard 100 GM bottles.
          </p>
          <div className="w-20 h-[2px] bg-[#D4AF37] mt-6" />
        </div>

        {/* Filter / Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search featured shop items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-[#141414] border border-[#D4AF37]/30 rounded-lg text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <span className="text-xs text-gray-400">
            Showing <strong>{filteredProducts.length}</strong> Products
          </span>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="glass-card rounded-lg p-5 flex flex-col justify-between group border border-[#D4AF37]/20 hover:border-[#D4AF37]/60"
            >
              <div>
                <div className="flex items-center justify-between text-[10px] text-[#D4AF37] uppercase tracking-wider mb-2 font-medium">
                  <span>Item #{item.id}</span>
                  <span className="bg-[#D4AF37]/10 px-2 py-0.5 rounded border border-[#D4AF37]/20">
                    {item.category}
                  </span>
                </div>

                <h3 className="font-serif text-lg font-bold text-white group-hover:text-[#D4AF37] transition-colors line-clamp-1 mb-1">
                  {item.name}
                </h3>

                <div className="text-xs text-gray-400 mb-4">
                  Standard Packaging: <strong className="text-gray-200">{item.size}</strong>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div>
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Price</span>
                  <span className="text-lg font-bold text-[#D4AF37]">₹{item.price}</span>
                </div>

                <button
                  onClick={() => handleAddToCart(item)}
                  className="px-4 py-2 bg-[#D4AF37] text-[#0B0B0B] hover:bg-[#F3E5AB] font-bold rounded text-xs transition-all flex items-center gap-1.5 shadow-gold-glow"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add to Cart</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </main>
  );
}