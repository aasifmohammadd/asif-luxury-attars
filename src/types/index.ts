export type BottleSize = 
  | '3ml' 
  | '6ml' 
  | '12ml' 
  | '30ml' 
  | '50ml' 
  | '100ml' 
  | '10 ML' 
  | (string & {});

export type FragranceCategory = 
  | 'Oud' 
  | 'Rose' 
  | 'Floral' 
  | 'Fresh' 
  | 'Oud Collection' 
  | 'Fresh & Sport' 
  | 'Fresh & Aqua' 
  | 'Arabic & Oud' 
  | 'Fresh & Spicy' 
  | 'Floral Luxury' 
  | 'Traditional Floral' 
  | 'Royal Oud' 
  | (string & {});

export interface IProductSize {
  size: BottleSize;
  price: number;
  offerPrice?: number;
  sku: string;
  stock: number;
}

export interface IFragrancePyramid {
  topNotes: string[];
  middleNotes: string[];
  baseNotes: string[];
}

export type FragrancePyramid = IFragrancePyramid;

export interface IProduct {
  _id: string;
  name: string;
  slug: string;
  sku: string;
  category: FragranceCategory;
  fragranceFamily: string;
  description: string;
  shortDescription: string;
  fragrancePyramid: IFragrancePyramid;
  longevity: number;
  sillage: string;
  projection: string;
  gender: string;
  occasion: string[];
  season: string[];
  sizes: IProductSize[];
  images: string[];
  featuredImage: string;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  isLimitedEdition?: boolean;
  isFeatured?: boolean;
  rating: number;
  numReviews: number;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface ICartItem {
  _id?: string;
  productId: string;
  product?: IProduct;
  name: string;
  slug: string;
  price: number;
  size: BottleSize | string;
  selectedSize?: IProductSize;
  image: string;
  sku: string;
  quantity: number;
}