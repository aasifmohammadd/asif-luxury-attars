'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LuxuryNavbar } from '@/components/layout/LuxuryNavbar';
import { Footer } from '@/components/layout/Footer';
import { Mail, Lock, Eye, EyeOff, Sparkles, ArrowRight, ShieldCheck, UserCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    // Simulate authentication delay (Replace with your actual Auth / NextAuth call)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));

      // Demo validation check
      if (email && password) {
        // Redirect to homepage or user profile after successful login
        router.push('/');
      } else {
        setErrorMessage('Please enter valid email and password credentials.');
      }
    } catch (err) {
      setErrorMessage('Failed to sign in. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="bg-[#0B0B0B] min-h-screen text-white flex flex-col justify-between selection:bg-[#D4AF37] selection:text-[#0B0B0B]">
      <LuxuryNavbar />

      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center flex-1">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Card Container */}
          <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-[#D4AF37]/30 shadow-2xl relative overflow-hidden bg-[#141414]/90 backdrop-blur-md">
            
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">
                  Client Concierge
                </span>
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              </div>
              <h1 className="font-serif text-3xl font-bold text-white mb-2">
                Welcome Back
              </h1>
              <p className="text-xs text-gray-400">
                Sign in to manage your orders & exclusive member privileges
              </p>
              <div className="w-12 h-[2px] bg-[#D4AF37] mx-auto mt-4" />
            </div>

            {/* Error Message Alert */}
            {errorMessage && (
              <div className="mb-6 p-3 bg-red-500/10 border border-red-500/50 rounded-xl text-red-300 text-xs text-center">
                {errorMessage}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-5">
              
              {/* Email Input */}
              <div>
                <label className="text-[11px] uppercase tracking-wider text-gray-300 block mb-1.5 font-medium">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="concierge@asifperfumes.com"
                    className="w-full pl-10 pr-4 py-3 bg-[#0B0B0B] border border-white/15 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] transition-colors"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-[11px] uppercase tracking-wider text-gray-300 font-medium">
                    Password
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-[11px] text-[#D4AF37] hover:underline transition-all"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-10 py-3 bg-[#0B0B0B] border border-white/15 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me Checkbox */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-white/20 bg-[#0B0B0B] accent-[#D4AF37] cursor-pointer"
                  />
                  <span className="text-xs text-gray-400">Remember my session</span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 mt-2 bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#AA7C11] text-[#0B0B0B] font-bold text-xs uppercase tracking-[0.2em] rounded-xl hover:shadow-gold-glow transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    <span>Authenticating...</span>
                  </div>
                ) : (
                  <>
                    <span>Sign In To ASIF</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Footer Options */}
            <div className="mt-8 pt-6 border-t border-white/10 text-center space-y-3 text-xs">
              <p className="text-gray-400">
                New to ASIF Parfums?{' '}
                <Link href="/register" className="text-[#D4AF37] font-bold hover:underline ml-1">
                  Create an Account
                </Link>
              </p>
              <div>
                <Link
                  href="/checkout"
                  className="text-gray-400 hover:text-white text-[11px] underline transition-colors"
                >
                  Or continue to Checkout as Guest
                </Link>
              </div>
            </div>

            {/* Security Badge */}
            <div className="mt-6 flex items-center justify-center gap-2 text-[10px] text-gray-400 uppercase tracking-widest">
              <ShieldCheck className="w-3.5 h-3.5 text-[#0B6E4F]" />
              <span>256-Bit SSL Encrypted Connection</span>
            </div>

          </div>
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}