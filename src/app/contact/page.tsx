'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LuxuryNavbar } from '@/components/layout/LuxuryNavbar';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageSquare,
  Send,
  CheckCircle2,
  Sparkles,
  ChevronDown,
  Globe,
  Crown,
  ShieldCheck,
  Loader2
} from 'lucide-react';

const fadeInUp = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: 'General Inquiry',
    message: ''
  });
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to transmit message');
      }

      setFormSubmitted(true);
      setTimeout(() => {
        setFormSubmitted(false);
        setFormData({ name: '', email: '', phone: '', inquiryType: 'General Inquiry', message: '' });
      }, 5000);
    } catch (err: any) {
      setErrorMessage(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const faqs = [
    {
      q: "How can I consult with an ASIF Fragrance Specialist?",
      a: "Our fragrance concierge is available via WhatsApp and email to provide personalized scent profiling based on your preferred notes, occasions, and longevity requirements."
    },
    {
      q: "Do you supply bulk and wholesale attar orders?",
      a: "Yes. ASIF supplies 100 GM standard aluminum/glass bottles for wholesale partners, corporate gifting, and bespoke wedding favors worldwide. Select 'Wholesale & Bulk' in the contact form."
    },
    {
      q: "Are ASIF perfume oils 100% alcohol-free?",
      a: "Every attar crafted by ASIF is completely alcohol-free, skin-safe, concentrated, and distilled according to traditional hydro-distillation methods."
    },
    {
      q: "What is your typical domestic and international shipping timeframe?",
      a: "Domestic orders within India/UAE are delivered in 2–4 business days. International express shipments typically arrive within 5–8 business days via courier."
    }
  ];

  return (
    <main className="bg-[#0B0B0B] min-h-screen text-white pt-24 pb-20 selection:bg-[#D4AF37] selection:text-[#0B0B0B]">
      <LuxuryNavbar />

      {/* Hero Banner */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-[#D4AF37]/20 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#0B6E4F]/20 via-[#0B0B0B]/90 to-[#0B0B0B] z-0" />
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="flex items-center justify-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">
              White-Glove Service
            </span>
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          </motion.div>

          <motion.h1 initial="hidden" animate="visible" variants={fadeInUp} className="font-serif text-4xl sm:text-6xl font-bold text-white mb-4">
            Connect with the <span className="gold-text-gradient italic font-normal">House of ASIF</span>
          </motion.h1>

          <motion.p initial="hidden" animate="visible" variants={fadeInUp} className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto font-sans leading-relaxed">
            Whether you require assistance with an existing order, bespoke formulation advice, or wholesale inquiries, our fragrance advisors are at your service.
          </motion.p>
        </div>
      </section>

      {/* Quick Contact Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass-card p-6 rounded-xl flex flex-col justify-between">
            <div className="p-3 bg-[#D4AF37]/10 text-[#D4AF37] w-fit rounded-lg border border-[#D4AF37]/30 mb-4">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-gray-400 block">Direct Concierge</span>
              <a href="tel:+919182713878" className="font-serif text-lg font-bold text-white hover:text-[#D4AF37] transition-colors">
                +91 9182713878
              </a>
              <p className="text-xs text-gray-400 mt-1">Mon - Sat: 10:00 AM - 8:00 PM</p>
            </div>
          </div>

          <div className="glass-card p-6 rounded-xl flex flex-col justify-between">
            <div className="p-3 bg-[#0B6E4F]/20 text-[#129A70] w-fit rounded-lg border border-[#0B6E4F] mb-4">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-gray-400 block">WhatsApp Advisor</span>
              <a href="https://wa.me/9182713878" target="_blank" rel="noopener noreferrer" className="font-serif text-lg font-bold text-white hover:text-[#129A70] transition-colors">
                Instant Chat
              </a>
              <p className="text-xs text-gray-400 mt-1">Real-time scent recommendations</p>
            </div>
          </div>

          <div className="glass-card p-6 rounded-xl flex flex-col justify-between">
            <div className="p-3 bg-[#D4AF37]/10 text-[#D4AF37] w-fit rounded-lg border border-[#D4AF37]/30 mb-4">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-gray-400 block">Email Inquiries</span>
              <a href="mailto:aasifmohammadd@gmail.com" className="font-serif text-base font-bold text-white hover:text-[#D4AF37] transition-colors break-all">
                aasifmohammadd@gmail.com
              </a>
              <p className="text-xs text-gray-400 mt-1">Response within 24 hours</p>
            </div>
          </div>

          <div className="glass-card p-6 rounded-xl flex flex-col justify-between">
            <div className="p-3 bg-[#0B6E4F]/20 text-[#129A70] w-fit rounded-lg border border-[#0B6E4F] mb-4">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-gray-400 block">Working Hours</span>
              <h4 className="font-serif text-base font-bold text-white">10:00 AM - 8:00 PM IST</h4>
              <p className="text-xs text-gray-400 mt-1">Sunday: Closed for Aging & Blending</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & Location */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 glass-panel p-8 sm:p-10 rounded-2xl border border-[#D4AF37]/30 relative">
            <div className="mb-8">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">Send Us a Message</h2>
              <p className="text-xs text-gray-400 mt-1">Fill out the form below and our fragrance concierge will contact you shortly.</p>
            </div>

            {formSubmitted ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="p-8 text-center glass-card rounded-xl border border-[#0B6E4F]">
                <CheckCircle2 className="w-12 h-12 text-[#129A70] mx-auto mb-4" />
                <h3 className="font-serif text-xl font-bold text-white mb-2">Message Transmitted</h3>
                <p className="text-xs text-gray-300">Thank you for contacting ASIF. Your request has been emailed to our concierge and our team will respond within 24 hours.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {errorMessage && (
                  <p className="text-xs text-red-400 bg-red-950/50 p-3 rounded border border-red-800">{errorMessage}</p>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-gray-300 block mb-2 font-medium">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Lord / Lady / Mr. / Ms."
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-[#141414] border border-white/10 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-gray-300 block mb-2 font-medium">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="yourname@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-[#141414] border border-white/10 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-gray-300 block mb-2 font-medium">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="+91 00000 00000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-[#141414] border border-white/10 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-gray-300 block mb-2 font-medium">Inquiry Type</label>
                    <select
                      value={formData.inquiryType}
                      onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                      className="w-full px-4 py-3 bg-[#141414] border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                    >
                      <option value="General Inquiry" className="bg-[#0B0B0B] text-white">General Inquiry</option>
                      <option value="Personal Scent Advice" className="bg-[#0B0B0B] text-white">Personal Scent Advice</option>
                      <option value="Wholesale & Bulk Orders" className="bg-[#0B0B0B] text-white">Wholesale & Bulk Orders</option>
                      <option value="Order Support" className="bg-[#0B0B0B] text-white">Order Support</option>
                      <option value="Press & Corporate" className="bg-[#0B0B0B] text-white">Press & Corporate</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider text-gray-300 block mb-2 font-medium">Your Message *</label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Describe your inquiry, custom scent requirement, or order reference..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-[#141414] border border-white/10 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#AA7C11] text-[#0B0B0B] font-bold text-xs uppercase tracking-[0.25em] rounded hover:shadow-gold-glow transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-4 h-4 animate-spin text-[#0B0B0B]" />
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Transmit Inquiry</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel p-8 rounded-2xl border border-white/10">
              <div className="flex items-center gap-2 mb-4 text-[#D4AF37]">
                <Crown className="w-5 h-5" />
                <h3 className="font-serif text-xl font-bold text-white">ASIF Flagship Atelier</h3>
              </div>

              <div className="space-y-4 text-xs text-gray-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-1" />
                  <div>
                    <strong className="text-white block">Main Office & Perfumery:</strong>
                    ASIF Luxury Attars House, Suite 402, Perfumers Boulevard, Old City Heritage District, Hyderabad, TG - 500002, India.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Globe className="w-4 h-4 text-[#129A70] shrink-0 mt-1" />
                  <div>
                    <strong className="text-white block">Global Distribution:</strong>
                    Express shipping available across GCC (Dubai, Riyadh, Doha), North America, Europe, and Asia-Pacific.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0 mt-1" />
                  <div>
                    <strong className="text-white block">Purity & Assurance:</strong>
                    All physical visits and consultations include private scent testing of our 353 pure oil catalog.
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-panel rounded-2xl border border-[#D4AF37]/30 overflow-hidden h-64 relative flex items-center justify-center bg-[#141414]">
              <iframe
                title="ASIF Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.514782352882!2d78.4744!3d17.3616!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDIxJzQxLjgiTiA3OMKwMjgnMjcuOCJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
                className="w-full h-full border-0 opacity-70 hover:opacity-100 transition-opacity"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Accordion FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-white/5">
        <div className="text-center mb-10">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-2">Frequently Asked Questions</h2>
          <p className="text-xs text-gray-400">Quick answers to common questions regarding orders, oils, and shipping.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="glass-card rounded-xl border border-white/10 overflow-hidden">
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full p-5 text-left font-serif text-sm font-semibold text-white flex items-center justify-between hover:text-[#D4AF37] transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-[#D4AF37] transition-transform duration-300 ${activeFaq === idx ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {activeFaq === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-5 pb-5 text-xs text-gray-400 border-t border-white/5 pt-3 leading-relaxed"
                  >
                    {faq.a}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}