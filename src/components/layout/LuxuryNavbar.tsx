'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Search, Heart, Menu, X, User } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';

export const LuxuryNavbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { getItemCount, currency, setCurrency } = useCartStore();
  const itemCount = getItemCount();

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'Collections', href: '/collections/all' },
    { name: 'Oud Collection', href: '/collections/oud' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#0B0B0B]/85 backdrop-blur-md border-b border-[#D4AF37]/20 py-4 shadow-glass'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-white hover:text-[#D4AF37] transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Left Navigation (Desktop) */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.slice(0, 3).map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-xs uppercase tracking-[0.25em] text-gray-300 hover:text-[#D4AF37] transition-colors duration-300"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Brand Logo */}
          <Link href="/" className="flex flex-col items-center group">
            <span className="font-serif text-3xl font-bold tracking-[0.3em] gold-text-gradient group-hover:scale-105 transition-transform duration-300">
              ASIF
            </span>
            <span className="text-[8px] uppercase tracking-[0.4em] text-gray-400 font-sans mt-0.5">
              PARFUMS DE LUXE
            </span>
          </Link>

          {/* Right Navigation & Actions */}
          <div className="flex items-center gap-6">
            <nav className="hidden lg:flex items-center gap-8 mr-4">
              {navLinks.slice(3).map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-xs uppercase tracking-[0.25em] text-gray-300 hover:text-[#D4AF37] transition-colors duration-300"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Currency Selector */}
            {mounted && (
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as any)}
                className="hidden sm:block bg-transparent text-xs text-[#D4AF37] border border-[#D4AF37]/30 rounded px-2 py-1 focus:outline-none focus:border-[#D4AF37]"
              >
                {/* <option value="USD" className="bg-[#0B0B0B] text-white">USD ($)</option> */}
                <option value="INR" className="bg-[#0B0B0B] text-white">INR (₹)</option>
               {/* <option value="AED" className="bg-[#0B0B0B] text-white">AED (AED)</option> */}
               {/* <option value="EUR" className="bg-[#0B0B0B] text-white">EUR (€)</option> */}
              </select>
            )}

            <button className="text-gray-300 hover:text-[#D4AF37] transition-colors" aria-label="Search">
              <Search className="w-5 h-5" />
            </button>

            <Link href="/wishlist" className="hidden sm:block text-gray-300 hover:text-[#D4AF37] transition-colors" aria-label="Wishlist">
              <Heart className="w-5 h-5" />
            </Link>

            <Link href="/login" className="text-gray-300 hover:text-[#D4AF37] transition-colors" aria-label="Account">
              <User className="w-5 h-5" />
            </Link>

            {/* Shopping Bag Icon linked directly to /cart */}
            <Link
              href="/cart"
              className="relative p-2 text-gray-300 hover:text-[#D4AF37] transition-colors"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {mounted && itemCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-[#D4AF37] text-[#0B0B0B] text-[10px] font-bold flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden bg-[#0B0B0B] border-b border-[#D4AF37]/20 px-6 py-8"
          >
            <div className="flex flex-col gap-6 text-center">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm uppercase tracking-[0.2em] text-gray-200 hover:text-[#D4AF37]"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};