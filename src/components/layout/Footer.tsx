'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, ShieldCheck, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#070707] border-t border-[#D4AF37]/20 text-white pt-16 pb-12 selection:bg-[#D4AF37] selection:text-[#0B0B0B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <Link href="/" className="inline-block flex-col">
              <span className="font-serif text-2xl font-bold tracking-[0.3em] gold-text-gradient block">
                ASIF
              </span>
              <span className="text-[9px] uppercase tracking-[0.4em] text-gray-400 font-sans block mt-0.5">
                PARFUMS DE LUXE
              </span>
            </Link>
            <p className="text-gray-400 text-xs leading-relaxed">
              Crafting 100% alcohol-free, concentrated perfume oils from the finest raw botanical and resinous extracts.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#D4AF37]">
              <ShieldCheck className="w-4 h-4 text-[#0B6E4F]" />
              <span>100% Alcohol-Free Pure Attars</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold tracking-widest text-[#D4AF37] uppercase">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li>
                <Link href="/" className="hover:text-[#D4AF37] transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-[#D4AF37] transition-colors">Shop All Perfumes</Link>
              </li>
              <li>
                <Link href="/collections/all" className="hover:text-[#D4AF37] transition-colors">Master Collections</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#D4AF37] transition-colors">About ASIF</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#D4AF37] transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Fragrance Families */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold tracking-widest text-[#D4AF37] uppercase">
              Fragrance Families
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li>
                <Link href="/collections/all" className="hover:text-[#D4AF37] transition-colors">Royal Oud & Agarwood</Link>
              </li>
              <li>
                <Link href="/collections/all" className="hover:text-[#D4AF37] transition-colors">Fresh & Aqua Oils</Link>
              </li>
              <li>
                <Link href="/collections/all" className="hover:text-[#D4AF37] transition-colors">Traditional Florals</Link>
              </li>
              <li>
                <Link href="/collections/all" className="hover:text-[#D4AF37] transition-colors">Arabic & Spicy Attars</Link>
              </li>
            </ul>
          </div>

          {/* Concierge & Contact Info */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold tracking-widest text-[#D4AF37] uppercase">
              Concierge
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-300">
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>Hyderabad, Telangana, India</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>+91 9515761980</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>aasifmohammadd@gmail.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-gray-500 text-center sm:text-left">
          <p>© {new Date().getFullYear()} ASIF Parfums De Luxe. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-[#D4AF37] transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-[#D4AF37] transition-colors">Terms of Service</Link>
            <Link href="/shipping" className="hover:text-[#D4AF37] transition-colors">Shipping & Returns</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;