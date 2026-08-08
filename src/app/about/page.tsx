'use client';

import React from 'react';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { LuxuryNavbar } from '@/components/layout/LuxuryNavbar';
import { 
  Sparkles, 
  Droplet, 
  ShieldCheck, 
  Clock, 
  Award, 
  Globe, 
  Heart, 
  Leaf, 
  Package, 
  Crown, 
  Feather, 
  Recycle, 
  ArrowRight,
  CheckCircle2,
  Lock,
  Truck,
  Headphones
} from 'lucide-react';

// --- ANIMATION VARIANTS WITH EXPLICIT TYPESCRIPT TUPLE CASTING ---
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.8, 
      ease: [0.16, 1, 0.3, 1] as const 
    } 
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

export default function AboutUsPage() {
  return (
    <main className="bg-[#0B0B0B] min-h-screen text-white pt-24 pb-20 selection:bg-[#D4AF37] selection:text-[#0B0B0B] overflow-x-hidden">
      <LuxuryNavbar />

      {/* =========================================================================
          1. HERO SECTION
          ========================================================================= */}
      <section className="relative h-[80vh] min-h-[600px] w-full flex items-center justify-center overflow-hidden border-b border-[#D4AF37]/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#0B6E4F]/20 via-[#0B0B0B]/80 to-[#0B0B0B] z-0" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <Crown className="w-5 h-5 text-[#D4AF37]" />
            <span className="text-xs uppercase tracking-[0.4em] text-[#D4AF37] font-semibold">
              The House of ASIF
            </span>
            <Crown className="w-5 h-5 text-[#D4AF37]" />
          </motion.div>

          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-tight"
          >
            Where Heritage Meets <br />
            <span className="gold-text-gradient italic font-normal">Haute Parfumerie</span>
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-gray-300 text-sm sm:text-lg max-w-3xl mx-auto font-sans leading-relaxed mb-10 text-balance"
          >
            "Experience the Essence of Pure Luxury." ASIF is born from a relentless pursuit to preserve the sacred art of traditional attars while reimagining pure, alcohol-free perfume oils for the modern connoisseur.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-5"
          >
            <Link
              href="/shop"
              className="px-8 py-4 bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#AA7C11] text-[#0B0B0B] font-bold text-xs uppercase tracking-[0.25em] rounded hover:shadow-gold-glow transition-all duration-300 flex items-center gap-3 group"
            >
              <span>Explore Our Collection</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* =========================================================================
          2. OUR STORY
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-b border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full text-[11px] uppercase tracking-widest text-[#D4AF37]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Our Genesis</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight">
              A Passion Born from the <br />
              <span className="text-[#D4AF37]">Golden Sands of Heritage</span>
            </h2>

            <p className="text-gray-300 text-sm leading-relaxed">
              The story of <strong>ASIF</strong> began with a simple observation: in a world saturated with mass-produced, alcohol-diluted sprays, the true soul of fragrance was fading. The ancient art of the <strong>premium attar</strong>—pure, concentrated oil that evolves uniquely on warm skin—was often confined to private royal collections or lost in back-alley bazaars.
            </p>

            <p className="text-gray-300 text-sm leading-relaxed">
              Inspired by the majestic olfactory culture of classical Arabic perfumery and the timeless refinement of royal Indian hydro-distillation, our founder embarked on a journey across the ancient spice routes. From the wild Agarwood forests of Assam to the rose valleys of Taif, ASIF was established to bridge two worlds: honoring traditional craftsmanship while defining modern luxury fragrances.
            </p>

            <p className="text-gray-300 text-sm leading-relaxed">
              We believed luxury should not be an elusive privilege, but an intimate daily ritual. Every bottle of ASIF represents a promise—a bridge between ancient majesty and contemporary elegance, offering uncompromising quality at an accessible price point.
            </p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="relative"
          >
            <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden glass-card border border-[#D4AF37]/30 p-2">
              <div className="relative w-full h-full rounded-xl overflow-hidden bg-gradient-to-br from-[#141414] to-[#0B0B0B] flex flex-col items-center justify-center p-8 text-center">
                <Crown className="w-16 h-16 text-[#D4AF37] mb-6 animate-pulse" />
                <blockquote className="font-serif text-xl text-white italic mb-4">
                  "Fragrance is the most intense form of memory. An attar should not merely be worn—it should be felt as a second skin of pure gold."
                </blockquote>
                <cite className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold not-italic">
                  — Founder, ASIF Parfums
                </cite>
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 glass-panel p-6 rounded-xl border border-[#D4AF37]/40 hidden sm:block">
              <p className="text-2xl font-serif font-bold text-[#D4AF37]">100%</p>
              <p className="text-[11px] uppercase tracking-wider text-gray-300">Pure & Alcohol-Free Oils</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =========================================================================
          3. OUR PHILOSOPHY
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-b border-white/5">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-4">
            Our Guiding Philosophy
          </h2>
          <p className="text-gray-400 text-sm">
            Rooted in purity, restraint, and absolute sensory perfection.
          </p>
          <div className="w-16 h-[2px] bg-[#D4AF37] mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-card p-8 rounded-xl border border-white/10 hover:border-[#D4AF37]/50 transition-all">
            <Droplet className="w-8 h-8 text-[#D4AF37] mb-6" />
            <h3 className="font-serif text-xl font-bold text-white mb-3">Uncompromising Purity</h3>
            <p className="text-gray-400 text-xs leading-relaxed">
              We reject synthetic alcohol carriers and harsh chemical diluents. Every drop is a concentrated <strong>alcohol-free perfume oil</strong> that nourishes the skin while radiating a personal, majestic aura.
            </p>
          </div>

          <div className="glass-card p-8 rounded-xl border border-white/10 hover:border-[#0B6E4F] transition-all">
            <Crown className="w-8 h-8 text-[#0B6E4F] mb-6" />
            <h3 className="font-serif text-xl font-bold text-white mb-3">Affordable Royal Luxury</h3>
            <p className="text-gray-400 text-xs leading-relaxed">
              True luxury lies in the raw ingredients, not inflated markup logos. By working directly with artisanal distilleries, we deliver world-class <strong>Oud attars</strong> and floral essences at honest prices.
            </p>
          </div>

          <div className="glass-card p-8 rounded-xl border border-white/10 hover:border-[#D4AF37]/50 transition-all">
            <Clock className="w-8 h-8 text-[#D4AF37] mb-6" />
            <h3 className="font-serif text-xl font-bold text-white mb-3">Timeless Longevity</h3>
            <p className="text-gray-400 text-xs leading-relaxed">
              Because our oils interact directly with your natural body heat, ASIF attars offer unmatched <strong>long-lasting performance</strong>, lingering gracefully for 24+ hours on skin and fabrics.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. WHY CHOOSE ASIF
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-b border-white/5">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold block mb-2">
            Distinctive Excellence
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
            Why Discerning Connoisseurs Choose ASIF
          </h2>
        </div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {[
            { icon: Droplet, title: "100% Alcohol Free", desc: "Gentle on sensitive skin, non-drying, and pure." },
            { icon: Clock, title: "Long-Lasting Attar", desc: "High concentration guarantees day-to-night sillage." },
            { icon: Leaf, title: "Botanical Sourcing", desc: "Grade-A roses, wild agarwood, and pure sandalwood." },
            { icon: Package, title: "Royal Packaging", desc: "Handcrafted glass tola bottles with gold detailing." },
            { icon: ShieldCheck, title: "Skin Safe & Pure", desc: "Strict quality tests; zero harmful parabens." },
            { icon: Globe, title: "Worldwide Express", desc: "Securely packed and delivered anywhere on earth." },
            { icon: Award, title: "Artisanal Blends", desc: "Curated by master perfumers with decades of heritage." },
            { icon: Headphones, title: "White-Glove Support", desc: "Dedicated fragrance consultants ready to assist." }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div key={idx} variants={fadeInUp} className="glass-panel p-6 rounded-xl flex flex-col justify-between">
                <div>
                  <div className="p-3 bg-[#D4AF37]/10 text-[#D4AF37] w-fit rounded-lg mb-4 border border-[#D4AF37]/30">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-base font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* =========================================================================
          5. CRAFTSMANSHIP & PROCESS
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-b border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-[#0B6E4F] font-semibold block mb-2">
              Sacred Alchemy
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-6">
              The Alchemy of Traditional Attar Craftsmanship
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed mb-8">
              At ASIF, we honor the ancient copper-still hydro-distillation method (Deg-Bhapka). From selecting blooming flowers at dawn to aging precious oils in wooden barrels, every step is a labor of devotion.
            </p>

            <div className="space-y-6">
              <div className="flex gap-4">
                <span className="w-8 h-8 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] text-[#D4AF37] flex items-center justify-center font-bold text-xs shrink-0">1</span>
                <div>
                  <h4 className="font-serif text-base font-bold text-white">Ethical Botanical Harvest</h4>
                  <p className="text-xs text-gray-400 mt-1">First-pick blossoms and sustainably harvested resinous woods sourced from native ecosystems.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="w-8 h-8 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] text-[#D4AF37] flex items-center justify-center font-bold text-xs shrink-0">2</span>
                <div>
                  <h4 className="font-serif text-base font-bold text-white">Hydro-Distillation in Copper Stills</h4>
                  <p className="text-xs text-gray-400 mt-1">A slow, low-pressure vapor condensation process captures the fragile botanical heart notes without scorching.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="w-8 h-8 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] text-[#D4AF37] flex items-center justify-center font-bold text-xs shrink-0">3</span>
                <div>
                  <h4 className="font-serif text-base font-bold text-white">Maturation & Curing</h4>
                  <p className="text-xs text-gray-400 mt-1">Oils are rested in leather or glass vessels to age gracefully, allowing complex top, heart, and base notes to harmonize.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-panel p-8 rounded-2xl border border-[#D4AF37]/30">
            <h3 className="font-serif text-2xl font-bold text-[#D4AF37] mb-6 text-center">
              Standards of Excellence
            </h3>
            <ul className="space-y-4">
              {[
                "100% Concentrated Pure Perfume Oil",
                "Strict Zero-Alcohol Certification",
                "Dermatologically Tested Skin Compatibility",
                "Artisanal Micro-Batch Blending",
                "Purity Verified via Gas Chromatography",
                "Ethical Fair-Trade Botanical Sourcing"
              ].map((point, i) => (
                <li key={i} className="flex items-center gap-3 text-xs text-gray-200">
                  <CheckCircle2 className="w-4 h-4 text-[#0B6E4F] shrink-0" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. LIVE METRICS & IMPACT
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-white/5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="p-6 glass-card rounded-xl">
            <p className="font-serif text-3xl sm:text-4xl font-bold text-[#D4AF37]">350+</p>
            <p className="text-[11px] uppercase tracking-widest text-gray-400 mt-2">Artisanal Oils</p>
          </div>
          <div className="p-6 glass-card rounded-xl">
            <p className="font-serif text-3xl sm:text-4xl font-bold text-[#D4AF37]">50,000+</p>
            <p className="text-[11px] uppercase tracking-widest text-gray-400 mt-2">Global Patrons</p>
          </div>
          <div className="p-6 glass-card rounded-xl">
            <p className="font-serif text-3xl sm:text-4xl font-bold text-[#D4AF37]">100%</p>
            <p className="text-[11px] uppercase tracking-widest text-gray-400 mt-2">Alcohol-Free</p>
          </div>
          <div className="p-6 glass-card rounded-xl">
            <p className="font-serif text-3xl sm:text-4xl font-bold text-[#D4AF37]">24+ Hrs</p>
            <p className="text-[11px] uppercase tracking-widest text-gray-400 mt-2">Fragrance Longevity</p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          7. OUR COLLECTIONS OVERVIEW
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-b border-white/5">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold block mb-2">
            The ASIF Anthology
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
            Explore Our World of Fragrances
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Royal Oud Collection", desc: "Rare wild Cambodian and Assam Agarwood extractions.", link: "/collections/oud" },
            { title: "Arabic Attars", desc: "Rich amber, spicy saffron, and regal mukhallats.", link: "/collections/all" },
            { title: "Floral & Rose Oils", desc: "Grade-A Taif Rose, Jasmine Mogra, and Raat Rani.", link: "/collections/all" },
            { title: "Musk & Sandalwood", desc: "Pure Mysore Sandalwood and velvet Musk Al Thara.", link: "/collections/all" },
          ].map((col, idx) => (
            <Link key={idx} href={col.link} className="group glass-card p-6 rounded-xl border border-white/10 hover:border-[#D4AF37] transition-all">
              <h3 className="font-serif text-lg font-bold text-white group-hover:text-[#D4AF37] transition-colors mb-2">{col.title}</h3>
              <p className="text-xs text-gray-400 mb-4">{col.desc}</p>
              <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Discover <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* =========================================================================
          8. VISION & MISSION
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-b border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="glass-panel p-10 rounded-2xl border border-[#D4AF37]/30 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#D4AF37]/10 rounded-full blur-2xl pointer-events-none" />
            <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold block mb-3">Our Vision</span>
            <h3 className="font-serif text-2xl font-bold text-white mb-4">Preserving Tradition, Inspiring Tomorrow</h3>
            <p className="text-gray-300 text-xs leading-relaxed">
              To become the world's most trusted luxury attar house—championing pure, sustainable, alcohol-free perfumery while keeping the regal heritage of Eastern fragrance traditions alive for future generations.
            </p>
          </div>

          <div className="glass-panel p-10 rounded-2xl border border-[#0B6E4F]/40 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#0B6E4F]/20 rounded-full blur-2xl pointer-events-none" />
            <span className="text-xs uppercase tracking-[0.3em] text-[#0B6E4F] font-semibold block mb-3">Our Mission</span>
            <h3 className="font-serif text-2xl font-bold text-white mb-4">Accessible Royal Elegance</h3>
            <p className="text-gray-300 text-xs leading-relaxed">
              To deliver uncompromised, long-lasting luxury perfume oils crafted with authentic botanical ingredients—offering an exceptional sensory journey and white-glove customer care to every fragrance lover.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          9. CORE VALUES
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-b border-white/5">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-4">
            Our Core Values
          </h2>
          <p className="text-gray-400 text-sm">The principles that guide every batch we distill.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {[
            { title: "Authenticity", icon: ShieldCheck },
            { title: "Craftsmanship", icon: Crown },
            { title: "Customer First", icon: Heart },
            { title: "Sustainability", icon: Recycle },
            { title: "Trust & Safety", icon: Lock },
            { title: "Excellence", icon: Award },
            { title: "Innovation", icon: Feather },
            { title: "Purity Guarantee", icon: Droplet },
          ].map((val, idx) => {
            const Icon = val.icon;
            return (
              <div key={idx} className="glass-card p-6 rounded-xl text-center flex flex-col items-center">
                <Icon className="w-6 h-6 text-[#D4AF37] mb-3" />
                <h4 className="font-serif text-sm font-bold text-white">{val.title}</h4>
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          10. CUSTOMER EXPERIENCE & ASSURANCE
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-b border-white/5">
        <div className="glass-panel p-10 rounded-2xl border border-white/10 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center">
            <Truck className="w-8 h-8 text-[#D4AF37] mb-4" />
            <h4 className="font-serif text-base font-bold text-white mb-2">Global Express Shipping</h4>
            <p className="text-xs text-gray-400">Safely sealed luxury packaging delivered directly to your doorstep.</p>
          </div>
          <div className="flex flex-col items-center">
            <Lock className="w-8 h-8 text-[#D4AF37] mb-4" />
            <h4 className="font-serif text-base font-bold text-white mb-2">Encrypted Checkout</h4>
            <p className="text-xs text-gray-400">Seamless payments via Razorpay, Stripe, Cards, and Cash on Delivery.</p>
          </div>
          <div className="flex flex-col items-center">
            <Headphones className="w-8 h-8 text-[#D4AF37] mb-4" />
            <h4 className="font-serif text-base font-bold text-white mb-2">Dedicated Scent Advice</h4>
            <p className="text-xs text-gray-400">Our fragrance concierge is available on WhatsApp and email to guide your selection.</p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          11. CALL TO ACTION (CTA)
          ========================================================================= */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="glass-card p-12 rounded-3xl border border-[#D4AF37]/40 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/10 via-transparent to-[#0B6E4F]/10 pointer-events-none" />
          <Crown className="w-12 h-12 text-[#D4AF37] mx-auto mb-6" />
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white mb-4">
            Begin Your Signature Scent Journey
          </h2>
          <p className="text-gray-300 text-sm max-w-xl mx-auto mb-8">
            Discover the transformative warmth of pure, alcohol-free luxury attars. Find your personal olfactory masterpiece today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/shop"
              className="px-8 py-4 bg-[#D4AF37] text-[#0B0B0B] font-bold text-xs uppercase tracking-[0.2em] rounded hover:bg-[#F3E5AB] transition-all shadow-gold-glow w-full sm:w-auto"
            >
              Shop The Master Collection
            </Link>
            <Link
              href="/collections/oud"
              className="px-8 py-4 bg-transparent border border-[#D4AF37] text-white font-bold text-xs uppercase tracking-[0.2em] rounded hover:bg-[#D4AF37]/10 transition-all w-full sm:w-auto"
            >
              Explore Royal Oud
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}