'use client';

import React from 'react';
import { LuxuryNavbar } from '@/components/layout/LuxuryNavbar';
import { HeroSection } from '@/components/sections/HeroSection';
import { ProductCard } from '@/components/products/ProductCard';
import { Footer } from '@/components/layout/Footer';
import { IProduct } from '@/types';
import { Sparkles } from 'lucide-react';

// Full collection of 10 ASIF Signature Perfume Oils with local image paths
const SAMPLE_PRODUCTS: IProduct[] = [
  {
    _id: '1',
    name: 'AMBER OUD ',
    slug: 'amber-oud-harmain',
    sku: 'ASIF-OUD-01',
    category: 'Oud Collection',
    fragranceFamily: 'Woody Oriental',
    description: 'A rich combination of aged Cambodian Oud infused with warm amber resin.',
    shortDescription: 'Warm amber resin with deep woody Oud notes.',
    fragrancePyramid: {
      topNotes: ['Amber', 'Bergamot'],
      middleNotes: ['Spicy Notes', 'Cedarwood'],
      baseNotes: ['Pure Oud', 'Warm Musk']
    },
    longevity: 5,
    sillage: 'Enormous',
    projection: 'Strong',
    gender: 'Unisex',
    occasion: ['Evening', 'Special Gatherings'],
    season: ['Winter', 'Autumn'],
    sizes: [{ size: '12 ML', price: 390, sku: 'AOH-12ML', stock: 25 }],
    images: ['/images/products/amber-oud.png'],
    featuredImage: '/images/products/amber-oud.png',
    isBestSeller: true,
    isNewArrival: false,
    isLimitedEdition: false,
    isFeatured: true,
    rating: 4.9,
    numReviews: 42,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '2',
    name: 'C R 7',
    slug: 'c-r-7',
    sku: 'ASIF-SPORT-02',
    category: 'Fresh & Sport',
    fragranceFamily: 'Aromatic Woody',
    description: 'An energetic blend of fresh bergamot, cedarwood, and magnetic musk.',
    shortDescription: 'Vibrant, athletic aroma with a fresh woody trail.',
    fragrancePyramid: {
      topNotes: ['Bergamot', 'Cardamom'],
      middleNotes: ['Cedarwood', 'Tobacco'],
      baseNotes: ['Sandalwood', 'Vanilla']
    },
    longevity: 4,
    sillage: 'Strong',
    projection: 'Moderate',
    gender: 'Unisex',
    occasion: ['Daily Luxury', 'Active Wear'],
    season: ['Spring', 'Summer'],
    sizes: [{ size: '12 ML', price: 390, sku: 'CR7-12ML', stock: 30 }],
    images: ['/images/products/cr7.png'],
    featuredImage: '/images/products/cr7.png',
    isBestSeller: true,
    isNewArrival: true,
    isLimitedEdition: false,
    isFeatured: true,
    rating: 5.0,
    numReviews: 31,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '3',
    name: 'Cool Water',
    slug: 'cool-water',
    sku: 'ASIF-AQUA-03',
    category: 'Fresh & Aqua',
    fragranceFamily: 'Oceanic Freshness',
    description: 'Crisp aquatic notes blended with peppermint and green nuances for ultimate freshness.',
    shortDescription: 'Refreshing ocean breeze with subtle herbal notes.',
    fragrancePyramid: {
      topNotes: ['Seawater', 'Mint', 'Green Notes'],
      middleNotes: ['Lavender', 'Jasmine', 'Neroli'],
      baseNotes: ['Musk', 'Oakmoss', 'Cedar']
    },
    longevity: 4,
    sillage: 'Moderate',
    projection: 'Moderate',
    gender: 'Unisex',
    occasion: ['Daily Wear', 'Workplace'],
    season: ['Summer', 'Spring'],
    sizes: [{ size: '12 ML', price: 390, sku: 'CW-12ML', stock: 20 }],
    images: ['/images/products/coolwater2.png'],
    featuredImage: '/images/products/coolwater2.png',
    isBestSeller: true,
    isNewArrival: false,
    isLimitedEdition: false,
    isFeatured: true,
    rating: 4.8,
    numReviews: 19,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '4',
    name: 'Ice Berg',
    slug: 'ice-berg',
    sku: 'ASIF-ICE-04',
    category: 'Fresh & Aqua',
    fragranceFamily: 'Citrus Aquatic',
    description: 'Cooling menthol breezes laced with lemon peel and frosted white woods.',
    shortDescription: 'Chilled citrus and icy woods for hot climates.',
    fragrancePyramid: {
      topNotes: ['Frosted Lemon', 'Eucalyptus'],
      middleNotes: ['White Musk', 'Icy Floral'],
      baseNotes: ['Amberwood', 'Driftwood']
    },
    longevity: 4,
    sillage: 'Strong',
    projection: 'Strong',
    gender: 'Unisex',
    occasion: ['Daytime Outings', 'Casual'],
    season: ['Summer'],
    sizes: [{ size: '12 ML', price: 390, sku: 'IB-12ML', stock: 18 }],
    images: ['/images/products/iceberg1.png'],
    featuredImage: '/images/products/iceberg1.png',
    isBestSeller: false,
    isNewArrival: true,
    isLimitedEdition: false,
    isFeatured: true,
    rating: 4.7,
    numReviews: 15,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '5',
    name: 'Amir Al Oud',
    slug: 'amir-al-oud',
    sku: 'ASIF-OUD-05',
    category: 'Arabic & Oud',
    fragranceFamily: 'Oriental Woody',
    description: 'Regal combination of smoky agarwood, caramel sweetness, and warm spices.',
    shortDescription: 'Smoky Oud paired with rich sweet caramel.',
    fragrancePyramid: {
      topNotes: ['Oud Wood', 'Cinnamon'],
      middleNotes: ['Caramel', 'Rose'],
      baseNotes: ['Vanilla', 'Amber', 'Sandalwood']
    },
    longevity: 5,
    sillage: 'Enormous',
    projection: 'Strong',
    gender: 'Unisex',
    occasion: ['Royal Events', 'Night Out'],
    season: ['Winter', 'Autumn'],
    sizes: [{ size: '12 ML', price: 390, sku: 'AAO-12ML', stock: 15 }],
    images: ['/images/products/amir-al-oud1.png'],
    featuredImage: '/images/products/amir-al-oud1.png',
    isBestSeller: true,
    isNewArrival: false,
    isLimitedEdition: true,
    isFeatured: true,
    rating: 4.9,
    numReviews: 50,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '6',
    name: 'Hawas Ice',
    slug: 'hawas-ice',
    sku: 'ASIF-SPICE-06',
    category: 'Fresh & Spicy',
    fragranceFamily: 'Aromatic Aquatic',
    description: 'An exhilarating blend of icy apple, bergamot, cinnamon, and watery driftwood.',
    shortDescription: 'Crisp green apple meets icy spicy warmth.',
    fragrancePyramid: {
      topNotes: ['Frozen Apple', 'Italian Lemon'],
      middleNotes: ['Plum', 'Orange Blossom', 'Cardamom'],
      baseNotes: ['Driftwood', 'Ambergris', 'Musk']
    },
    longevity: 5,
    sillage: 'Enormous',
    projection: 'Strong',
    gender: 'Unisex',
    occasion: ['Parties', 'Special Events'],
    season: ['All Seasons'],
    sizes: [{ size: '12 ML', price: 390, sku: 'HI-12ML', stock: 22 }],
    images: ['/images/products/hawas-ice6.png'],
    featuredImage: '/images/products/hawas-ice6.png',
    isBestSeller: true,
    isNewArrival: true,
    isLimitedEdition: false,
    isFeatured: true,
    rating: 5.0,
    numReviews: 44,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '7',
    name: 'Gucci Flora',
    slug: 'gucci-flora',
    sku: 'ASIF-FLORA-07',
    category: 'Floral Luxury',
    fragranceFamily: 'Bouquet Floral',
    description: 'A velvet garden of blooming peony, white gardenia, and sweet pear blossom.',
    shortDescription: 'Sophisticated blooming florals with sweet accents.',
    fragrancePyramid: {
      topNotes: ['Pear Blossom', 'Red Berries'],
      middleNotes: ['White Gardenia', 'Frangipani'],
      baseNotes: ['Brown Sugar', 'Patchouli']
    },
    longevity: 4,
    sillage: 'Moderate',
    projection: 'Moderate',
    gender: 'Unisex',
    occasion: ['Weddings', 'Elegant Dinners'],
    season: ['Spring', 'Summer'],
    sizes: [{ size: '12 ML', price: 390, sku: 'GF-12ML', stock: 14 }],
    images: ['/images/products/gucci-flora7.png'],
    featuredImage: '/images/products/gucci-flora7.png',
    isBestSeller: false,
    isNewArrival: false,
    isLimitedEdition: false,
    isFeatured: true,
    rating: 4.8,
    numReviews: 27,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '8',
    name: 'Motiya Bahar',
    slug: 'motiya-bahar',
    sku: 'ASIF-FLORAL-08',
    category: 'Traditional Floral',
    fragranceFamily: 'Pure Jasmine Attar',
    description: 'First-cut Sambac Jasmine attar capturing the delicate essence of fresh night blossoms.',
    shortDescription: 'Pure traditional Indian jasmine oil.',
    fragrancePyramid: {
      topNotes: ['Dewy Jasmine Petals'],
      middleNotes: ['Mogra Blossom', 'White Rose'],
      baseNotes: ['Sandalwood Base']
    },
    longevity: 4,
    sillage: 'Strong',
    projection: 'Moderate',
    gender: 'Unisex',
    occasion: ['Traditional Gatherings', 'Prayer & Devotion'],
    season: ['Spring', 'Summer'],
    sizes: [{ size: '12 ML', price: 390, sku: 'MB-12ML', stock: 35 }],
    images: ['/images/products/motiya-bahar8.png'],
    featuredImage: '/images/products/motiya-bahar8.png',
    isBestSeller: true,
    isNewArrival: false,
    isLimitedEdition: false,
    isFeatured: true,
    rating: 4.9,
    numReviews: 36,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '9',
    name: 'CLASSIC OUDH',
    slug: 'classic-oudh',
    sku: 'ASIF-OUD-09',
    category: 'Oud Collection',
    fragranceFamily: 'Timeless Woody',
    description: 'An authentic vintage formulation of rich agarwood heartwood with leathery nuances.',
    shortDescription: 'Authentic vintage agarwood with leathery warmth.',
    fragrancePyramid: {
      topNotes: ['Smoky Woods'],
      middleNotes: ['Dark Leather', 'Saffron'],
      baseNotes: ['Heartwood Agarwood', 'Vetiver']
    },
    longevity: 5,
    sillage: 'Enormous',
    projection: 'Strong',
    gender: 'Unisex',
    occasion: ['Formal Nights', 'Royal Reception'],
    season: ['Winter'],
    sizes: [{ size: '12 ML', price: 390, sku: 'CO-12ML', stock: 12 }],
    images: ['/images/products/classic-oudh9.png'],
    featuredImage: '/images/products/classic-oudh9.png',
    isBestSeller: true,
    isNewArrival: false,
    isLimitedEdition: true,
    isFeatured: true,
    rating: 5.0,
    numReviews: 58,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '10',
    name: 'TURKISH OUDH',
    slug: 'turkish-oudh',
    sku: 'ASIF-OUD-10',
    category: 'Royal Oud',
    fragranceFamily: 'Spicy Oriental Oud',
    description: 'Exotic blend of Anatolian Turkish rose, clove, cardamom, and dark resinous Oud.',
    shortDescription: 'Turkish rose meets spicy Anatolian dark Oud.',
    fragrancePyramid: {
      topNotes: ['Turkish Rose', 'Cardamom'],
      middleNotes: ['Clove', 'Patchouli'],
      baseNotes: ['Resinous Oud', 'Labdanum']
    },
    longevity: 5,
    sillage: 'Enormous',
    projection: 'Strong',
    gender: 'Unisex',
    occasion: ['Evening Wear', 'Grand Occasions'],
    season: ['Autumn', 'Winter'],
    sizes: [{ size: '12 ML', price: 390, sku: 'TO-12ML', stock: 10 }],
    images: ['/images/products/turkish-oudh10.png'],
    featuredImage: '/images/products/turkish-oudh10.png',
    isBestSeller: true,
    isNewArrival: true,
    isLimitedEdition: true,
    isFeatured: true,
    rating: 5.0,
    numReviews: 29,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export default function Home() {
  return (
    <main className="bg-[#0B0B0B] min-h-screen text-white selection:bg-[#D4AF37] selection:text-[#0B0B0B]">
      {/* Navigation Bar */}
      <LuxuryNavbar />

      {/* Hero Video & CTA Section */}
      <HeroSection />

      {/* Complete 10 Perfumes Masterpiece Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24" id="collection">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">
              Curated Artisanal Oils
            </span>
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white">
            The Masterpiece Collection
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 mt-2 max-w-lg">
            100% alcohol-free concentrated perfume oils packaged in 10 MLluxury bottles.
          </p>
          <div className="w-16 h-[2px] bg-[#D4AF37] mt-4" />
        </div>

        {/* 10 Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {SAMPLE_PRODUCTS.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}