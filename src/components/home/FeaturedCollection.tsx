'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/useCartStore';
import { ShoppingBag, Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProductItem {
  id: number;
  name: string;
  category: string;
  size: string;
  price: number; // Internal price for cart calculation only (not displayed on UI)
  image: string;
}

const FEATURED_PRODUCTS: ProductItem[] = [
  {
    id: 1,
    name: "AMBER OUD (HARMAIN)",
    category: "Oud Collection",
    size: "100 GM",
    price: 390,
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "C R 7",
    category: "Fresh & Sport",
    size: "100 GM",
    price: 390,
    image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Cool Water",
    category: "Fresh & Aqua",
    size: "100 GM",
    price: 390,
    image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 4,
    name: "Ice Berg",
    category: "Fresh & Aqua",
    size: "100 GM",
    price: 390,
    image: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 5,
    name: "Amir Al Oud",
    category: "Arabic & Oud",
    size: "100 GM",
    price: 390,
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 6,
    name: "Hawas Ice",
    category: "Fresh & Spicy",
    size: "100 GM",
    price: 390,
    image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 7,
    name: "Gucci Flora",
    category: "Floral Luxury",
    size: "100 GM",
    price: 390,
    image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 8,
    name: "Motiya Bahar",
    category: "Traditional Floral",
    size: "100 GM",
    price: 390,
    image: "https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 9,
    name: "CLASSIC OUDH",
    category: "Oud Collection",
    size: "100 GM",
    price: 390,
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 10,
    name: "TURKISH OUDH",
    category: "Royal Oud",
    size: "100 GM",
    price: 390,
    image: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=800&auto=format&fit=crop"
  }
];

export function FeaturedCollection() {
  const router = useRouter();
  const { addItem } = useCartStore();

  const handleAddToCart = (item: ProductItem) => {
    addItem({
      productId: `home-${item.id}`,
      name: item.name,
      slug: item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      image: item.image,
      size: item.size as any,
      price: item.price,
      quantity: 1,
      sku: `ASIF-₹{item.id}`,
    });
    router.push('/cart');
  };

  return (
    <section className="py-20 bg-[#0B0B0B] text-white selection:bg-[#D4AF37] selection:text-[#0B0B0B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">
              Signature Collection
            </span>
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white mb-4">
            ASIF Parfums De Luxe
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm max-w-xl">
            Concentrated, pure alcohol-free fragrance oils packaged in 100 GM bottles.
          </p>
          <div className="w-20 h-[2px] bg-[#D4AF37] mt-6" />
        </div>

        {/* 10 Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {FEATURED_PRODUCTS.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="glass-card rounded-2xl p-5 flex flex-col justify-between group border border-[#D4AF37]/20 hover:border-[#D4AF37]/70 transition-all duration-300 relative overflow-hidden"
            >
              <div>
                {/* Image Container with ASIF Gold Branding Overlay */}
                <div className="relative w-full h-64 rounded-xl overflow-hidden mb-5 bg-[#141414]">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  
                  {/* ASIF Gold Watermark Badge Overlay */}
                  <div className="absolute top-3 left-3 bg-[#0B0B0B]/85 backdrop-blur-md border border-[#D4AF37]/40 px-2.5 py-1 rounded-md shadow-lg">
                    <span className="font-serif text-[10px] font-bold tracking-[0.2em] text-[#D4AF37]">
                      ASIF LUXURY
                    </span>
                  </div>

                  {/* Category Pill */}
                  <div className="absolute bottom-3 right-3 bg-[#0B0B0B]/80 backdrop-blur-md px-2.5 py-0.5 rounded border border-white/10">
                    <span className="text-[10px] text-gray-300 font-medium">
                      {item.category}
                    </span>
                  </div>
                </div>

                {/* Perfume Name */}
                <h3 className="font-serif text-lg font-bold text-white group-hover:text-[#D4AF37] transition-colors line-clamp-1 mb-1 text-center">
                  {item.name}
                </h3>

                {/* Packaging Info (NO PRICING DISPLAYED) */}
                <div className="text-[11px] text-gray-400 text-center mb-6">
                  Standard Size: <strong className="text-gray-200">{item.size}</strong>
                </div>
              </div>

              {/* Action Button (No Price Displayed) */}
              <div className="pt-4 border-t border-white/10">
                <button
                  onClick={() => handleAddToCart(item)}
                  className="w-full py-3 bg-[#D4AF37] hover:bg-[#F3E5AB] text-[#0B0B0B] font-bold rounded-lg text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2 shadow-gold-glow"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}