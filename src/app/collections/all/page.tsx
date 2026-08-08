'use client';

import React, { useState, useMemo } from 'react';
import { LuxuryNavbar } from '@/components/layout/LuxuryNavbar';
import { ALL_PERFUME_OILS, PerfumeOil } from '@/data/perfumes';
import { useCartStore } from '@/store/useCartStore';
import { Search, ShoppingBag, Sparkles, SlidersHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CATEGORIES = [
  "All",
  "Oud Collection",
  "Arabic & Oriental",
  "Floral",
  "Musk Collection",
  "Fresh & Aqua",
  "Gourmand & Fruity",
  "Designer Fragrance Oils"
];

const ITEMS_PER_PAGE = 24;

export default function CollectionsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const { addItem } = useCartStore();

  // Filtered perfumes based on search and category
  const filteredPerfumes = useMemo(() => {
    return ALL_PERFUME_OILS.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  // Reset pagination when search or category changes
  const totalPages = Math.ceil(filteredPerfumes.length / ITEMS_PER_PAGE);
  const paginatedPerfumes = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredPerfumes.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredPerfumes, currentPage]);

  const handleCategorySelect = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleAddToCart = (item: PerfumeOil) => {
    addItem({
      productId: `oil-${item.id}`,
      name: item.name,
      slug: item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      image: item.image,
      size: '12ml', // standard attar size mapping or 100gm
      price: item.price,
      quantity: 1,
      sku: `ASIF-OIL-${item.id}`,
    });
  };

  return (
    <main className="bg-[#0B0B0B] min-h-screen text-white pt-28 pb-20 selection:bg-[#D4AF37] selection:text-[#0B0B0B]">
      <LuxuryNavbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">
              Artisanal Perfume Oils ({ALL_PERFUME_OILS.length} Varieties)
            </span>
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white mb-4">
            The Master Catalog
          </h1>
          <p className="text-gray-400 text-sm max-w-xl">
            Pure concentrated fragrance oils distilled to perfection. Available in standard 100 GM wholesale & retail packs.
          </p>
          <div className="w-20 h-[2px] bg-[#D4AF37] mt-6" />
        </div>

        {/* Search Bar & Stats */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search 353 oils (e.g., Oud, Chanel, Rose)..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full pl-11 pr-4 py-3 bg-[#141414] border border-[#D4AF37]/30 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] transition-colors"
            />
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-400">
            <SlidersHorizontal className="w-4 h-4 text-[#D4AF37]" />
            <span>Showing <strong>{filteredPerfumes.length}</strong> of {ALL_PERFUME_OILS.length} fragrances</span>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategorySelect(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-300 ${
                selectedCategory === cat
                  ? 'bg-[#D4AF37] text-[#0B0B0B] shadow-gold-glow'
                  : 'bg-[#141414] text-gray-300 border border-white/10 hover:border-[#D4AF37]/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        {paginatedPerfumes.length === 0 ? (
          <div className="text-center py-20 glass-panel rounded-xl">
            <p className="text-gray-400 text-base mb-2">No perfume oils found matching your search.</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
              className="text-xs uppercase text-[#D4AF37] font-semibold tracking-wider hover:underline"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence mode="wait">
              {paginatedPerfumes.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  transition={{ duration: 0.3 }}
                  className="glass-card rounded-lg p-5 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between text-[10px] text-[#D4AF37] uppercase tracking-wider mb-2 font-medium">
                      <span>#{item.id}</span>
                      <span className="bg-[#D4AF37]/10 px-2 py-0.5 rounded border border-[#D4AF37]/20">
                        {item.category}
                      </span>
                    </div>

                    <h3 className="font-serif text-lg font-bold text-white group-hover:text-[#D4AF37] transition-colors line-clamp-1 mb-1">
                      {item.name}
                    </h3>

                    <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
                      <span>Quantity: <strong className="text-gray-200">{item.size}</strong></span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-white/10">
                    <div>
                      <span className="text-xs text-gray-400 block leading-none">Price</span>
                      <span className="text-lg font-bold text-[#D4AF37]">₹{item.price}</span>
                    </div>

                    <button
                      onClick={() => handleAddToCart(item)}
                      className="px-4 py-2 bg-[#D4AF37]/10 border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0B0B0B] rounded font-semibold text-xs transition-all flex items-center gap-1.5"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Pagination Navigation */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-12">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-[#141414] border border-white/10 text-xs rounded text-gray-300 disabled:opacity-40 hover:border-[#D4AF37]"
            >
              Previous
            </button>
            <span className="text-xs text-gray-400 px-3">
              Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-[#141414] border border-white/10 text-xs rounded text-gray-300 disabled:opacity-40 hover:border-[#D4AF37]"
            >
              Next
            </button>
          </div>
        )}

      </div>
    </main>
  );
}