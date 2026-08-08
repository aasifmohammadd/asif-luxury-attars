import { IProduct } from '@/types';

export function generateProductJsonLd(product: IProduct, baseUrl: string) {
  const minPrice = Math.min(...product.sizes.map((s) => s.offerPrice || s.price));
  const maxPrice = Math.max(...product.sizes.map((s) => s.price));

  return {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: product.name,
    image: product.images,
    description: product.description,
    sku: product.sku,
    brand: {
      '@type': 'Brand',
      name: 'ASIF',
    },
    offers: {
      '@type': 'AggregateOffer',
      url: `${baseUrl}/products/${product.slug}`,
      priceCurrency: 'USD',
      lowPrice: minPrice,
      highPrice: maxPrice,
      offerCount: product.sizes.length,
      availability: 'https://schema.org/InStock',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.numReviews,
    },
  };
}

export function generateOrganizationJsonLd(baseUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'ASIF Parfums De Luxe',
    url: baseUrl,
    logo: `${baseUrl}/assets/images/logo.png`,
    sameAs: [
      'https://instagram.com/asifparfums',
      'https://facebook.com/asifparfums',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-800-555-ASIF',
      contactType: 'customer service',
      areaServed: 'Worldwide',
      availableLanguage: ['English', 'Arabic'],
    },
  };
}