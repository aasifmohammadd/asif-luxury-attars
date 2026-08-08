'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingBag, Eye, Star } from 'lucide-react';
import { IProduct } from '@/types';
import { useCartStore } from '@/store/useCartStore';

interface ProductCardProps {
  product: IProduct;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const { addItem } = useCartStore();

  const currentOption = product.sizes[selectedSizeIndex] || product.sizes[0];

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      productId: product._id,
      name: product.name,
      slug: product.slug,
      image: product.featuredImage,
      size: currentOption.size,
      price: currentOption.offerPrice || currentOption.price,
      quantity: 1,
      sku: currentOption.sku,
    });
  };

  return (
    <div
      className="group relative glass-card rounded-lg overflow-hidden flex flex-col justify-between"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 z-20 flex flex-col gap-1.5">
        {product.isBestSeller && (
          <span className="bg-[#D4AF37] text-[#0B0B0B] text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-sm">
            Best Seller
          </span>
        )}
        {product.isLimitedEdition && (
          <span className="bg-[#0B6E4F] text-white text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-sm">
            Limited
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button
        className="absolute top-3 right-3 z-20 p-2 rounded-full bg-[#0B0B0B]/60 text-gray-300 hover:text-[#D4AF37] hover:bg-[#0B0B0B] backdrop-blur-md transition-colors"
        aria-label="Add to Wishlist"
      >
        <Heart className="w-4 h-4" />
      </button>

      {/* Product Image Container */}
      <Link href={`/products/${product.slug}`} className="relative aspect-square w-full overflow-hidden bg-obsidian-light block">
        <Image
          src={isHovered && product.images[1] ? product.images[1] : product.featuredImage}
          alt={product.name}
          fill
          className="object-cover object-center transform group-hover:scale-108 transition-transform duration-700 ease-out"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Quick View Hover Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <button
            className="p-3 bg-[#0B0B0B]/90 rounded-full text-white hover:text-[#D4AF37] transition-colors border border-[#D4AF37]/30"
            aria-label="Quick View"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </Link>

      {/* Product Details */}
      <div className="p-5 flex flex-col flex-grow justify-between">
        <div>
          <div className="flex items-center justify-between text-[11px] text-[#D4AF37] uppercase tracking-widest mb-1.5 font-medium">
            <span>{product.category}</span>
            <div className="flex items-center gap-1 text-amber-400">
              <Star className="w-3 h-3 fill-amber-400" />
              <span className="text-gray-300">{product.rating.toFixed(1)}</span>
            </div>
          </div>

          <Link href={`/products/${product.slug}`}>
            <h3 className="font-serif text-lg text-white font-semibold group-hover:text-[#D4AF37] transition-colors line-clamp-1 mb-2">
              {product.name}
            </h3>
          </Link>

          {/* Fragrance Top Notes Pills */}
          <div className="flex flex-wrap gap-1 mb-4">
            {product.fragrancePyramid.topNotes.slice(0, 3).map((note, idx) => (
              <span key={idx} className="text-[10px] bg-white/5 border border-white/10 text-gray-400 px-2 py-0.5 rounded-full">
                {note}
              </span>
            ))}
          </div>
        </div>

        <div>
          {/* Size Selector */}
          <div className="flex items-center justify-between gap-1 mb-4 border-t border-b border-white/5 py-2">
            <span className="text-[10px] uppercase text-gray-400 tracking-wider">Size:</span>
            <div className="flex gap-1.5">
              {product.sizes.map((opt, idx) => (
                <button
                  key={opt.size}
                  onClick={() => setSelectedSizeIndex(idx)}
                  className={`text-[10px] px-2 py-0.5 rounded border transition-all ${
                    selectedSizeIndex === idx
                      ? 'border-[#D4AF37] text-[#D4AF37] bg-[#D4AF37]/10 font-bold'
                      : 'border-white/10 text-gray-400 hover:border-white/30'
                  }`}
                >
                  {opt.size}
                </button>
              ))}
            </div>
          </div>

          {/* Pricing & Add to Cart */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              {currentOption.offerPrice ? (
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-white">₹{currentOption.offerPrice}</span>
                  <span className="text-xs text-gray-500 line-through">₹{currentOption.price}</span>
                </div>
              ) : (
                <span className="text-lg font-bold text-white">₹{currentOption.price}</span>
              )}
            </div>

            <button
              onClick={handleAddToCart}
              className="p-2.5 bg-[#D4AF37]/10 border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0B0B0B] rounded transition-all duration-300 flex items-center justify-center"
              aria-label="Add to Cart"
            >
              <ShoppingBag className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};