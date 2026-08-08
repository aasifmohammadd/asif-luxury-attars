'use client';

import React, { useState, useMemo } from 'react';
import { LuxuryNavbar } from '@/components/layout/LuxuryNavbar';
import { ALL_PERFUME_OILS, PerfumeOil } from '@/data/perfumes';
import { useCartStore } from '@/store/useCartStore';
import { Sparkles, ShoppingBag, Crown, Flame, ShieldCheck, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function RoyalOudPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const { addItem } = useCartStore();

  // Filter specifically for Oud & Agarwood formulations from the 353 master list
  const oudPerfumes = useMemo(() => {
    return ALL_PERFUME_OILS.filter((item) => {
      const nameUpper = item.name.toUpperCase();
      const isOud = nameUpper.includes('OUD') || 
                    nameUpper.includes('OUDH') || 
                    nameUpper.includes('AGARWOOD') ||
                    item.category === 'Oud Collection';
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      return isOud && matchesSearch;
    });
  }, [searchQuery]);

  const handleAddToCart = (item: PerfumeOil) => {
    addItem({
      productId: `oud-${item.id}`,
      name: item.name,
      slug: item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      image: item.image,
      size: '100 GM',
      price: item.price,
      quantity: 1,
      sku: `ASIF-OUD-${item.id}`,
    });
  };

  return (
    <main className="bg-[#0B0B0B] min-h-screen text-white pt-24 pb-20 selection:bg-[#D4AF37] selection:text-[#0B0B0B]">
      <LuxuryNavbar />

      {/* Hero Banner with Emerald & Gold Accent */}
      <section className="relative h-[65vh] w-full flex items-center justify-center overflow-hidden border-b border-[#D4AF37]/20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#0B6E4F]/25 via-[#0B0B0B]/80 to-[#0B0B0B] z-0" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <Crown className="w-5 h-5 text-[#D4AF37]" />
            <span className="text-xs uppercase tracking-[0.4em] text-[#D4AF37] font-semibold">
              The Liquid Gold of Kings
            </span>
            <Crown className="w-5 h-5 text-[#D4AF37]" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6"
          >
            Royal <span className="gold-text-gradient italic font-normal">Oud</span> Reserve
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto font-sans leading-relaxed mb-8"
          >
            Pure, resinous Agarwood oils hand-extracted from aged trees across Assam, Cambodia, and Vietnam. Alcohol-free, deep, and deeply captivating.
          </motion.p>
        </div>
      </section>

      {/* Craftsmanship Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-b border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-panel p-6 rounded-xl flex items-center gap-4">
            <div className="p-3 bg-[#0B6E4F]/20 text-[#129A70] rounded-lg border border-[#0B6E4F]/40">
              <Flame className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-base font-bold text-white">Traditional Distillation</h4>
              <p className="text-xs text-gray-400 mt-1">Hydro-distilled in copper stills for weeks.</p>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-xl flex items-center gap-4">
            <div className="p-3 bg-[#D4AF37]/10 text-[#D4AF37] rounded-lg border border-[#D4AF37]/30">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-base font-bold text-white">100% Pure & Undiluted</h4>
              <p className="text-xs text-gray-400 mt-1">Zero alcohol, synthetic fixatives, or filler oils.</p>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-xl flex items-center gap-4">
            <div className="p-3 bg-[#0B6E4F]/20 text-[#129A70] rounded-lg border border-[#0B6E4F]/40">
              <Crown className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-base font-bold text-white">Monarch Sillage</h4>
              <p className="text-xs text-gray-400 mt-1">Projection that lasts 24+ hours on skin and fabrics.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Oud Catalog Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Curated Oud Formulations
            </h2>
            <p className="text-xs text-gray-400 mt-1">
              Found <strong>{oudPerfumes.length}</strong> rare Agarwood & Oud variants in your inventory.
            </p>
          </div>

          {/* Quick Search */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search Oud collection..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-[#141414] border border-[#D4AF37]/30 rounded-lg text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]"
            />
          </div>
        </div>

        {/* Oud Products Grid */}
        {oudPerfumes.length === 0 ? (
          <div className="text-center py-20 glass-panel rounded-xl">
            <p className="text-gray-400 text-sm">No Oud oils matching "{searchQuery}".</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence>
              {oudPerfumes.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="glass-card rounded-lg p-5 flex flex-col justify-between group border border-[#D4AF37]/20 hover:border-[#D4AF37]/60"
                >
                  <div>
                    <div className="flex items-center justify-between text-[10px] text-[#D4AF37] uppercase tracking-widest mb-2 font-medium">
                      <span>Ref #{item.id}</span>
                      <span className="bg-[#0B6E4F]/30 text-[#129A70] px-2 py-0.5 rounded border border-[#0B6E4F]">
                        Royal Oud
                      </span>
                    </div>

                    <h3 className="font-serif text-lg font-bold text-white group-hover:text-[#D4AF37] transition-colors line-clamp-1 mb-2">
                      {item.name}
                    </h3>

                    <p className="text-xs text-gray-400 mb-4 line-clamp-2">
                      Complex woody profile enriched with resinous top notes and a deep smoky finish.
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div>
                      <span className="text-[10px] text-gray-400 uppercase tracking-wider block">12 ML Pack</span>
                      <span className="text-lg font-bold text-[#D4AF37]">₹{item.price}</span>
                    </div>

                    <button
                      onClick={() => handleAddToCart(item)}
                      className="px-4 py-2 bg-gradient-to-r from-[#BF953F] to-[#AA7C11] text-[#0B0B0B] font-bold rounded text-xs hover:shadow-gold-glow transition-all flex items-center gap-1.5"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Order</span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </section>
    </main>
  );
}