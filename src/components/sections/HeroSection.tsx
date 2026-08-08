'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#0B0B0B]">
      {/* Background Video Overlay */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-35 scale-105"
        >
          <source src="/assets/videos/hero-bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-[#0B0B0B]/40 to-[#0B0B0B]/80" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex items-center justify-center gap-2 mb-6"
        >
          <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          <span className="text-xs uppercase tracking-[0.4em] text-[#D4AF37] font-semibold">
            Pure Concentrated Perfume Oils
          </span>
          <Sparkles className="w-4 h-4 text-[#D4AF37]" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-serif text-4xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-6 leading-tight"
        >
          Experience the Essence of <br />
          <span className="gold-text-gradient italic font-normal">Pure Luxury</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-gray-300 text-sm md:text-base max-w-2xl mx-auto font-sans tracking-wide mb-10 text-balance"
        >
          Handcrafted in royal tradition. Alcohol-free artisanal attars distilled from the rarest wild Oud, Grade-A Taif Rose, and pure Mysore Sandalwood.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5"
        >
          <Link
            href="/shop"
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#AA7C11] text-[#0B0B0B] font-semibold text-xs uppercase tracking-[0.25em] rounded hover:shadow-gold-glow transition-all duration-300 flex items-center justify-center gap-3 group"
          >
            <span>Shop The Collection</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/collections/oud"
            className="w-full sm:w-auto px-8 py-4 bg-transparent border border-[#D4AF37]/50 text-white font-semibold text-xs uppercase tracking-[0.25em] rounded hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all duration-300"
          >
            Explore Royal Oud
          </Link>
        </motion.div>
      </div>

      {/* Subtle Scroll Down Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="text-[10px] uppercase tracking-[0.3em] text-gray-400">Scroll</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-[#D4AF37] to-transparent animate-pulse" />
      </div>
    </section>
  );
};