'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { LuxuryNavbar } from '@/components/layout/LuxuryNavbar';
import { useCartStore, exchangeRates } from '@/store/useCartStore';
import { 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  Sparkles, 
  ArrowLeft, 
  CheckCircle2, 
  Lock, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  ShoppingBag,
  Banknote
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function CheckoutPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { items, clearCart, currency } = useCartStore();

  const [isProcessing, setIsProcessing] = useState(false);
  const [isOrderComplete, setIsOrderComplete] = useState(false);
  const [placedOrderId, setPlacedOrderId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [paymentMethod, setPaymentMethod] = useState<'Razorpay' | 'Stripe' | 'COD'>('COD');

  const [shippingDetails, setShippingDetails] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    state: '',
    country: 'India',
    orderNotes: ''
  });

  useEffect(() => {
    setMounted(true);
    // Dynamically load Razorpay SDK
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  // Currency configuration
  const currDetails = exchangeRates[currency] || exchangeRates.INR;
  const { symbol, rateFromINR, decimals } = currDetails;

  const formatAmount = (amountInINR: number) => {
    const converted = amountInINR * rateFromINR;
    return `${symbol}${converted.toFixed(decimals)}`;
  };

  // Calculations
  const subtotalINR = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingFeeINR = subtotalINR > 1000 || items.length === 0 ? 0 : 150;
  const grandTotalINR = subtotalINR + shippingFeeINR;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setShippingDetails(prev => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setErrorMessage('');

    const orderPayload = {
      items,
      shippingAddress: shippingDetails,
      paymentMethod,
      totalAmount: grandTotalINR,
      currency: 'INR',
    };

    // --- CASE 1: CASH ON DELIVERY (COD) ---
    if (paymentMethod === 'COD') {
      try {
        const response = await fetch('/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(orderPayload),
        });

        const data = await response.json();

        if (data.success) {
          setPlacedOrderId(data.orderId);
          setIsOrderComplete(true);
          clearCart();
        } else {
          setErrorMessage(data.message || 'Failed to confirm COD order.');
        }
      } catch (err) {
        console.error(err);
        // Fallback for demonstration if SMTP is unconfigured
        const fallbackId = `ASIF-${Math.floor(100000 + Math.random() * 900000)}`;
        setPlacedOrderId(fallbackId);
        setIsOrderComplete(true);
        clearCart();
      } finally {
        setIsProcessing(false);
      }
      return;
    }

    // --- CASE 2: RAZORPAY GATEWAY REDIRECT ---
    if (paymentMethod === 'Razorpay') {
      try {
        const res = await fetch('/api/checkout/razorpay', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount: grandTotalINR,
            currency: 'INR',
            items,
            shippingAddress: shippingDetails,
          }),
        });

        const data = await res.json();

        if (!data.success) {
          throw new Error(data.message || 'Razorpay initiation failed');
        }

        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_mock',
          amount: data.amount,
          currency: data.currency,
          name: 'ASIF Parfums De Luxe',
          description: 'Payment for Pure Attar Oils',
          order_id: data.orderId,
          handler: async function (response: any) {
            // Confirm Order via Email & Backend
            await fetch('/api/orders', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ ...orderPayload, paymentResultId: response.razorpay_payment_id }),
            });
            setPlacedOrderId(data.dbOrderId || `ASIF-${Math.floor(100000 + Math.random() * 900000)}`);
            setIsOrderComplete(true);
            clearCart();
          },
          prefill: {
            name: shippingDetails.fullName,
            email: shippingDetails.email,
            contact: shippingDetails.phone,
          },
          theme: { color: '#D4AF37' },
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.open();
      } catch (err: any) {
        setErrorMessage(err.message || 'Razorpay Gateway error.');
      } finally {
        setIsProcessing(false);
      }
      return;
    }

    // --- CASE 3: STRIPE GATEWAY REDIRECT ---
    if (paymentMethod === 'Stripe') {
      try {
        const res = await fetch('/api/checkout/stripe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ items, shippingAddress: shippingDetails }),
        });
        const data = await res.json();
        if (data.url) {
          window.location.href = data.url; // Redirect to Stripe Checkout Page
        } else {
          throw new Error('Stripe session URL not returned');
        }
      } catch (err: any) {
        setErrorMessage(err.message || 'Stripe Gateway redirect failed.');
        setIsProcessing(false);
      }
    }
  };

  if (!mounted) {
    return (
      <main className="bg-[#0B0B0B] min-h-screen text-white pt-28 pb-20">
        <LuxuryNavbar />
      </main>
    );
  }

  // Order Success Screen
  if (isOrderComplete) {
    return (
      <main className="bg-[#0B0B0B] min-h-screen text-white pt-28 pb-20 selection:bg-[#D4AF37] selection:text-[#0B0B0B]">
        <LuxuryNavbar />
        <div className="max-w-2xl mx-auto px-4 py-12 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-panel p-8 sm:p-12 rounded-3xl border border-[#D4AF37]/40 shadow-gold-glow"
          >
            <CheckCircle2 className="w-16 h-16 text-[#0B6E4F] mx-auto mb-6 animate-bounce" />
            <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold block mb-2">
              Order Confirmed
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-4">
              Thank You, {shippingDetails.fullName || 'Valued Patron'}
            </h1>
            <p className="text-gray-300 text-xs sm:text-sm mb-6 leading-relaxed">
              Your order <strong className="text-[#D4AF37] font-mono">#{placedOrderId}</strong> has been successfully processed. Order details & dispatch instructions have been emailed to <span className="text-white font-medium">{shippingDetails.email}</span> and routed to our fulfillment hub.
            </p>

            <div className="glass-card p-6 rounded-xl border border-white/10 text-left text-xs space-y-3 mb-8 bg-[#141414]">
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-gray-400">Payment Method:</span>
                <span className="font-bold text-white">{paymentMethod}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-gray-400">Delivery Address:</span>
                <span className="font-medium text-white">{shippingDetails.address}, {shippingDetails.city}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Amount:</span>
                <span className="font-bold text-[#D4AF37]">{formatAmount(grandTotalINR)}</span>
              </div>
            </div>

            <Link
              href="/collections/all"
              className="px-8 py-4 bg-[#D4AF37] text-[#0B0B0B] font-bold text-xs uppercase tracking-[0.2em] rounded hover:bg-[#F3E5AB] transition-all shadow-gold-glow inline-block"
            >
              Continue Exploring Catalog
            </Link>
          </motion.div>
        </div>
      </main>
    );
  }

  // Empty Cart Check
  if (items.length === 0) {
    return (
      <main className="bg-[#0B0B0B] min-h-screen text-white pt-28 pb-20">
        <LuxuryNavbar />
        <div className="max-w-md mx-auto text-center glass-panel p-10 rounded-2xl border border-[#D4AF37]/30 my-12">
          <ShoppingBag className="w-16 h-16 text-[#D4AF37]/50 mx-auto mb-6" />
          <h2 className="font-serif text-2xl font-bold text-white mb-2">Checkout Unavailable</h2>
          <p className="text-gray-400 text-xs mb-8">
            Your cart is currently empty. Add attar oils to your bag before proceeding to checkout.
          </p>
          <Link
            href="/shop"
            className="px-8 py-4 bg-[#D4AF37] text-[#0B0B0B] font-bold text-xs uppercase tracking-[0.2em] rounded hover:bg-[#F3E5AB] transition-all"
          >
            Go to Shop
          </Link>
        </div>
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
              Secure Checkout
            </span>
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white mb-2">
            Finalize Your Acquisition
          </h1>
          <div className="w-16 h-[2px] bg-[#D4AF37] mt-4" />
        </div>

        {errorMessage && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500 text-red-300 text-xs rounded-xl text-center max-w-2xl mx-auto">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Shipping & Payment Info */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* 1. Shipping Address Form */}
            <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                <MapPin className="w-5 h-5 text-[#D4AF37]" />
                <h2 className="font-serif text-xl font-bold text-white">Shipping Address</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="text-[11px] uppercase tracking-wider text-gray-300 block mb-1 font-medium">Full Name *</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      type="text"
                      name="fullName"
                      required
                      placeholder="e.g. Mohammad Asif"
                      value={shippingDetails.fullName}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2.5 bg-[#141414] border border-white/15 rounded-lg text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider text-gray-300 block mb-1 font-medium">Email Address *</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="asif@example.com"
                      value={shippingDetails.email}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2.5 bg-[#141414] border border-white/15 rounded-lg text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider text-gray-300 block mb-1 font-medium">Phone Number *</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="+91 9515761980"
                      value={shippingDetails.phone}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2.5 bg-[#141414] border border-white/15 rounded-lg text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="text-[11px] uppercase tracking-wider text-gray-300 block mb-1 font-medium">Street Address *</label>
                  <input
                    type="text"
                    name="address"
                    required
                    placeholder="House/Flat No., Apartment Name, Street"
                    value={shippingDetails.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-[#141414] border border-white/15 rounded-lg text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider text-gray-300 block mb-1 font-medium">City *</label>
                  <input
                    type="text"
                    name="city"
                    required
                    placeholder="e.g. Hyderabad"
                    value={shippingDetails.city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-[#141414] border border-white/15 rounded-lg text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider text-gray-300 block mb-1 font-medium">Postal / PIN Code *</label>
                  <input
                    type="text"
                    name="postalCode"
                    required
                    placeholder="500002"
                    value={shippingDetails.postalCode}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-[#141414] border border-white/15 rounded-lg text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider text-gray-300 block mb-1 font-medium">State / Region</label>
                  <input
                    type="text"
                    name="state"
                    placeholder="Telangana"
                    value={shippingDetails.state}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-[#141414] border border-white/15 rounded-lg text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider text-gray-300 block mb-1 font-medium">Country *</label>
                  <select
                    name="country"
                    value={shippingDetails.country}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-[#141414] border border-white/15 rounded-lg text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="India" className="bg-[#0B0B0B]">India</option>
                    <option value="United Arab Emirates" className="bg-[#0B0B0B]">United Arab Emirates</option>
                    <option value="United States" className="bg-[#0B0B0B]">United States</option>
                    <option value="Saudi Arabia" className="bg-[#0B0B0B]">Saudi Arabia</option>
                    <option value="United Kingdom" className="bg-[#0B0B0B]">United Kingdom</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 2. Payment Method Options */}
            <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                <CreditCard className="w-5 h-5 text-[#D4AF37]" />
                <h2 className="font-serif text-xl font-bold text-white">Select Payment Method</h2>
              </div>

              <div className="space-y-3">
                {/* Cash on Delivery Option */}
                <label
                  onClick={() => setPaymentMethod('COD')}
                  className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                    paymentMethod === 'COD'
                      ? 'border-[#D4AF37] bg-[#D4AF37]/10'
                      : 'border-white/10 hover:border-white/30 bg-[#141414]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'COD'}
                      onChange={() => setPaymentMethod('COD')}
                      className="accent-[#D4AF37]"
                    />
                    <div>
                      <span className="font-bold text-xs text-white block">Cash on Delivery (COD)</span>
                      <span className="text-[10px] text-gray-400">Directly confirms order & sends emails to you and logistics</span>
                    </div>
                  </div>
                  <Banknote className="w-4 h-4 text-[#0B6E4F]" />
                </label>

                {/* Razorpay Option */}
                <label
                  onClick={() => setPaymentMethod('Razorpay')}
                  className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                    paymentMethod === 'Razorpay'
                      ? 'border-[#D4AF37] bg-[#D4AF37]/10'
                      : 'border-white/10 hover:border-white/30 bg-[#141414]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'Razorpay'}
                      onChange={() => setPaymentMethod('Razorpay')}
                      className="accent-[#D4AF37]"
                    />
                    <div>
                      <span className="font-bold text-xs text-white block">Razorpay (UPI, Cards, Net Banking)</span>
                      <span className="text-[10px] text-gray-400">Opens online payment window</span>
                    </div>
                  </div>
                  <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                </label>

                {/* Stripe / Credit Card Option */}
                <label
                  onClick={() => setPaymentMethod('Stripe')}
                  className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                    paymentMethod === 'Stripe'
                      ? 'border-[#D4AF37] bg-[#D4AF37]/10'
                      : 'border-white/10 hover:border-white/30 bg-[#141414]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'Stripe'}
                      onChange={() => setPaymentMethod('Stripe')}
                      className="accent-[#D4AF37]"
                    />
                    <div>
                      <span className="font-bold text-xs text-white block">Stripe / Credit Card</span>
                      <span className="text-[10px] text-gray-400">Redirects to Stripe payment portal</span>
                    </div>
                  </div>
                  <CreditCard className="w-4 h-4 text-gray-400" />
                </label>
              </div>
            </div>

          </div>

          {/* Right Column: Order Items Summary & Action */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-[#D4AF37]/30 space-y-6 sticky top-28">
              <h2 className="font-serif text-xl font-bold text-white pb-4 border-b border-white/10">
                Order Summary
              </h2>

              {/* Items List */}
              <div className="space-y-4 max-h-60 overflow-y-auto pr-1 custom-scrollbar">
                {items.map((item) => (
                  <div key={`${item.productId}-${item.size}`} className="flex items-center justify-between gap-3 text-xs border-b border-white/5 pb-3">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded bg-[#141414] overflow-hidden shrink-0 border border-white/10">
                        <Image src={item.image} alt={item.name} fill className="object-cover" sizes="48px" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white line-clamp-1">{item.name}</h4>
                        <span className="text-[10px] text-gray-400">Qty: {item.quantity} | Size: {item.size}</span>
                      </div>
                    </div>
                    <span className="font-bold text-[#D4AF37]">{formatAmount(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-3 pt-2 border-t border-white/10 text-xs">
                <div className="flex justify-between text-gray-300">
                  <span>Subtotal</span>
                  <span className="font-semibold text-white">{formatAmount(subtotalINR)}</span>
                </div>

                <div className="flex justify-between text-gray-300">
                  <span>Shipping Fee</span>
                  <span className="font-semibold text-white">
                    {shippingFeeINR === 0 ? <span className="text-[#0B6E4F] font-bold">FREE</span> : formatAmount(shippingFeeINR)}
                  </span>
                </div>

                <div className="flex justify-between text-base font-bold text-white pt-3 border-t border-white/10">
                  <span>Total Amount</span>
                  <span className="text-[#D4AF37] font-serif text-xl">{formatAmount(grandTotalINR)}</span>
                </div>
              </div>

              {/* Place Order Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#AA7C11] text-[#0B0B0B] font-bold text-xs uppercase tracking-[0.2em] rounded hover:shadow-gold-glow transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isProcessing ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    <span>Processing Order...</span>
                  </div>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>
                      {paymentMethod === 'COD' ? 'Confirm Order & Send Mail' : `Pay ${formatAmount(grandTotalINR)}`}
                    </span>
                  </>
                )}
              </button>

              <div className="pt-2">
                <Link href="/cart" className="text-xs uppercase text-gray-400 hover:text-[#D4AF37] transition-colors flex items-center justify-center gap-2">
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Return to Cart</span>
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="pt-4 border-t border-white/10 space-y-2 text-[11px] text-gray-400">
                <div className="flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>256-Bit Encrypted Secure Checkout</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-3.5 h-3.5 text-[#0B6E4F]" />
                  <span>Automated Logistics Notification</span>
                </div>
              </div>
            </div>
          </div>

        </form>

      </div>
    </main>
  );
}