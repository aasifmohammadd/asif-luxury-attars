'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FragrancePyramid as PyramidType } from '@/types';

interface FragrancePyramidProps {
  pyramid: PyramidType;
}

export const FragrancePyramid: React.FC<FragrancePyramidProps> = ({ pyramid }) => {
  return (
    <div className="glass-panel p-6 rounded-xl border border-[#D4AF37]/20 relative overflow-hidden">
      <h3 className="font-serif text-xl text-[#D4AF37] font-semibold mb-6 text-center tracking-wide">
        Olfactory Pyramid
      </h3>

      <div className="flex flex-col items-center gap-6 max-w-md mx-auto">
        {/* Top Notes */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full bg-gradient-to-r from-transparent via-[#D4AF37]/10 to-transparent p-4 rounded-lg text-center border-t border-b border-[#D4AF37]/30"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-semibold block mb-1">
            Top Notes (First Impression)
          </span>
          <p className="text-sm text-gray-200 font-medium">
            {pyramid.topNotes.join(' • ')}
          </p>
        </motion.div>

        {/* Heart / Middle Notes */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          viewport={{ once: true }}
          className="w-[90%] bg-gradient-to-r from-transparent via-[#0B6E4F]/20 to-transparent p-4 rounded-lg text-center border-t border-b border-[#0B6E4F]/40"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-emerald-light font-semibold block mb-1">
            Heart Notes (The Character)
          </span>
          <p className="text-sm text-gray-200 font-medium">
            {pyramid.middleNotes.join(' • ')}
          </p>
        </motion.div>

        {/* Base Notes */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="w-[80%] bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent p-4 rounded-lg text-center border-t border-b border-[#D4AF37]/40"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-semibold block mb-1">
            Base Notes (The Memory & Sillage)
          </span>
          <p className="text-sm text-gray-200 font-medium">
            {pyramid.baseNotes.join(' • ')}
          </p>
        </motion.div>
      </div>
    </div>
  );
};