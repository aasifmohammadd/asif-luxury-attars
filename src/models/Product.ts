import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProductDocument extends Omit<import('../types').IProduct, '_id'>, Document {}

const SizeOptionSchema = new Schema({
  size: { type: String, required: true, enum: ['3ml', '6ml', '12ml', '24ml'] },
  price: { type: Number, required: true, min: 0 },
  offerPrice: { type: Number, default: null },
  stock: { type: Number, required: true, default: 0 },
  sku: { type: String, required: true, unique: true }
});

const ProductSchema = new Schema<IProductDocument>({
  name: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, index: true },
  sku: { type: String, required: true, unique: true },
  category: { 
    type: String, 
    required: true, 
    enum: ['Floral', 'Oud', 'Musk', 'Rose', 'Sandalwood', 'Arabic', 'Premium', 'Limited Edition', 'Signature Collection'],
    index: true 
  },
  fragranceFamily: { type: String, required: true },
  description: { type: String, required: true },
  shortDescription: { type: String, required: true },
  fragrancePyramid: {
    topNotes: [{ type: String, required: true }],
    middleNotes: [{ type: String, required: true }],
    baseNotes: [{ type: String, required: true }]
  },
  longevity: { type: Number, required: true, min: 1, max: 5 },
  sillage: { type: String, required: true, enum: ['Intimate', 'Moderate', 'Strong', 'Enormous'] },
  projection: { type: String, required: true },
  gender: { type: String, required: true, enum: ['Unisex', 'Masculine', 'Feminine'] },
  occasion: [{ type: String }],
  season: [{ type: String }],
  sizes: [SizeOptionSchema],
  images: [{ type: String, required: true }],
  featuredImage: { type: String, required: true },
  isBestSeller: { type: Boolean, default: false },
  isNewArrival: { type: Boolean, default: false },
  isLimitedEdition: { type: Boolean, default: false },
  isFeatured: { type: Boolean, default: false },
  rating: { type: Number, default: 5.0 },
  numReviews: { type: Number, default: 0 }
}, {
  timestamps: true
});

const Product: Model<IProductDocument> = mongoose.models.Product || mongoose.model<IProductDocument>('Product', ProductSchema);
export default Product;