'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { LuxuryNavbar } from '@/components/layout/LuxuryNavbar';
import { useCartStore, exchangeRates } from '@/store/useCartStore';
import { 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  ArrowLeft,
  Tag,
  Truck
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function CartPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { 
    items, 
    updateQuantity, 
    removeItem, 
    clearCart, 
    currency 
  } = useCartStore();

  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  // Currency configuration
  const currDetails = exchangeRates[currency] || exchangeRates.INR;
  const { symbol, rateFromINR, decimals } = currDetails;

  // Helper to format prices according to selected currency
  const formatAmount = (amountInINR: number) => {
    const converted = amountInINR * rateFromINR;
    return `${symbol}${converted.toFixed(decimals)}`;
  };

  // Subtotal in INR
  const subtotalINR = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmountINR = (subtotalINR * discountPercent) / 100;
  
  // Free shipping threshold = ₹1000 INR
  const shippingFeeINR = subtotalINR > 1000 || items.length === 0 ? 0 : 150;
  const grandTotalINR = Math.max(0, subtotalINR - discountAmountINR + shippingFeeINR);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    setCouponSuccess('');

    if (couponCode.toUpperCase() === 'ASIF10') {
      setDiscountPercent(10);
      setCouponSuccess('VIP 10% Discount Applied!');
    } else if (couponCode.toUpperCase() === 'ROYAL20') {
      setDiscountPercent(20);
      setCouponSuccess('Royal 20% Discount Applied!');
    } else {
      setCouponError('Invalid coupon code. Try ASIF10 or ROYAL20');
    }
  };

  if (!mounted) {
    return (
      <main className="bg-[#0B0B0B] min-h-screen text-white pt-28 pb-20">
        <LuxuryNavbar />
      </main>
    );
  }

  return (
    <main className="bg-[#0B0B0B] min-h-screen text-white pt-28 pb-20 selection:bg-[#D4AF37] selection:text-[#0B0B0B]">
      <LuxuryNavbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">
              Your Selection
            </span>
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white mb-2">
            Shopping Cart
          </h1>
          <div className="w-16 h-[2px] bg-[#D4AF37] mt-4" />
        </div>

        {items.length === 0 ? (
          /* Empty Cart State */
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto text-center glass-panel p-10 rounded-2xl border border-[#D4AF37]/30 my-12"
          >
            <ShoppingBag className="w-16 h-16 text-[#D4AF37]/50 mx-auto mb-6" />
            <h2 className="font-serif text-2xl font-bold text-white mb-2">Your Cart is Empty</h2>
            <p className="text-gray-400 text-xs mb-8 leading-relaxed">
              Experience the warmth of pure, alcohol-free luxury attars. Explore our master collection and find your signature scent.
            </p>
            <Link
              href="/collections/all"
              className="px-8 py-4 bg-[#D4AF37] text-[#0B0B0B] font-bold text-xs uppercase tracking-[0.2em] rounded hover:bg-[#F3E5AB] transition-all shadow-gold-glow inline-flex items-center gap-2"
            >
              <span>Explore Master Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        ) : (
          /* Cart Items & Order Summary Layout */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Cart Items List */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-white/10 text-xs text-gray-400 uppercase tracking-wider">
                <span>Product ({items.length} Items)</span>
                <button
                  onClick={clearCart}
                  className="text-red-400 hover:text-red-300 transition-colors flex items-center gap-1 lowercase"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>clear cart</span>
                </button>
              </div>

              {items.map((item) => (
                <motion.div
                  key={`${item.productId}-${item.size}`}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="glass-card rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 border border-white/10"
                >
                  {/* Product Info */}
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-obsidian-light shrink-0 border border-[#D4AF37]/20">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>

                    <div>
                      <h3 className="font-serif text-base font-bold text-white line-clamp-1">
                        {item.name}
                      </h3>
                      <span className="text-[11px] text-[#D4AF37] bg-[#D4AF37]/10 px-2 py-0.5 rounded border border-[#D4AF37]/20 font-medium inline-block mt-1">
                        Size: {item.size}
                      </span>
                      <p className="text-xs text-gray-400 mt-1">
                        Unit Price: {formatAmount(item.price)}
                      </p>
                    </div>
                  </div>

                  {/* Quantity Controls & Converted Subtotal */}
                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-0 border-white/10">
                    <div className="flex items-center border border-white/20 rounded-lg overflow-hidden bg-[#141414]">
                      <button
                        onClick={() => updateQuantity(item.productId, item.size, item.quantity - 1)}
                        className="p-2 hover:bg-white/10 text-gray-300 hover:text-[#D4AF37] transition-colors"
                        aria-label="Decrease Quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>

                      <span className="px-3 text-xs font-bold text-white">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => updateQuantity(item.productId, item.size, item.quantity + 1)}
                        className="p-2 hover:bg-white/10 text-gray-300 hover:text-[#D4AF37] transition-colors"
                        aria-label="Increase Quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-right min-w-[90px]">
                      <span className="text-base font-bold text-[#D4AF37] block">
                        {formatAmount(item.price * item.quantity)}
                      </span>
                    </div>

                    <button
                      onClick={() => removeItem(item.productId, item.size)}
                      className="p-2 text-gray-500 hover:text-red-400 transition-colors"
                      aria-label="Remove Item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}

              <div className="pt-4">
                <Link
                  href="/collections/all"
                  className="text-xs uppercase tracking-wider text-gray-400 hover:text-[#D4AF37] transition-colors inline-flex items-center gap-2"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Continue Shopping</span>
                </Link>
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-[#D4AF37]/30 space-y-6">
                <h2 className="font-serif text-xl font-bold text-white pb-4 border-b border-white/10">
                  Order Summary
                </h2>

                {/* Coupon Code Input */}
                <form onSubmit={handleApplyCoupon} className="space-y-2">
                  <label className="text-[11px] uppercase tracking-wider text-gray-300 block">
                    Promo / Coupon Code
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-grow">
                      <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="ASIF10 or ROYAL20"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 bg-[#141414] border border-white/15 rounded-lg text-xs text-white uppercase placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#D4AF37]/20 border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0B0B0B] font-bold text-xs rounded transition-all"
                    >
                      Apply
                    </button>
                  </div>
                  {couponError && <p className="text-[10px] text-red-400 mt-1">{couponError}</p>}
                  {couponSuccess && <p className="text-[10px] text-emerald-light mt-1">{couponSuccess}</p>}
                </form>

                {/* Summary Lines */}
                <div className="space-y-3 pt-4 border-t border-white/10 text-xs">
                  <div className="flex justify-between text-gray-300">
                    <span>Subtotal</span>
                    <span className="font-semibold text-white">{formatAmount(subtotalINR)}</span>
                  </div>

                  {discountAmountINR > 0 && (
                    <div className="flex justify-between text-emerald-light">
                      <span>Discount ({discountPercent}%)</span>
                      <span className="font-semibold">-{formatAmount(discountAmountINR)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-gray-300">
                    <span>Estimated Shipping</span>
                    <span className="font-semibold text-white">
                      {shippingFeeINR === 0 ? (
                        <span className="text-[#0B6E4F] font-bold">FREE</span>
                      ) : (
                        formatAmount(shippingFeeINR)
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between text-base font-bold text-white pt-3 border-t border-white/10">
                    <span>Grand Total</span>
                    <span className="text-[#D4AF37] font-serif text-xl">{formatAmount(grandTotalINR)}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <Link
                  href="/checkout"
                  className="w-full py-4 bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#AA7C11] text-[#0B0B0B] font-bold text-xs uppercase tracking-[0.2em] rounded hover:shadow-gold-glow transition-all flex items-center justify-center gap-2"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                {/* Guarantees */}
                <div className="pt-4 border-t border-white/10 space-y-2 text-[11px] text-gray-400">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0" />
                    <span>100% Authentic & Alcohol-Free Oils</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-[#0B6E4F] shrink-0" />
                    <span>Free Shipping on Orders Above {formatAmount(1000)}</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </main>
  );
}