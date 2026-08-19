import { Schema, model, models, Document, Types } from 'mongoose';

export interface IVariant {
  sku?: string;
  size?: string;
  color?: string;
  finish?: string;
  unit?: 'box' | 'piece' | 'sqft' | 'slab' | 'meter' | 'set';
  price?: number; // omit or set null to show "Contact for price"
  showPriceOnWebsite: boolean;
  images: string[];
}

const variantSchema = new Schema<IVariant>(
  {
    sku: { type: String },
    size: { type: String },
    color: { type: String },
    finish: { type: String },
    unit: {
      type: String,
      enum: ['box', 'piece', 'sqft', 'slab', 'meter', 'set'],
    },
    price: { type: Number },
    showPriceOnWebsite: { type: Boolean, default: true },
    images: [{ type: String }],
  },
  { _id: true }
);

export interface IProduct extends Document {
  name: string;
  slug: string;
  category: Types.ObjectId;
  subCategory?: Types.ObjectId;
  brand?: Types.ObjectId;
  shortDescription?: string;
  description?: string;
  attributes: Record<string, unknown>; // flexible per-category specs (e.g. material, thickness)
  variants: IVariant[];
  coverImage?: string;
  gallery: string[];
  isFeatured: boolean;
  isActive: boolean;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    subCategory: { type: Schema.Types.ObjectId, ref: 'Category' },
    brand: { type: Schema.Types.ObjectId, ref: 'Brand' },
    shortDescription: { type: String },
    description: { type: String },
    attributes: { type: Schema.Types.Mixed, default: {} },
    variants: [variantSchema],
    coverImage: { type: String },
    gallery: [{ type: String }],
    isFeatured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    tags: [{ type: String }],
  },
  { timestamps: true }
);

// Full-text search across name, tags, and description
productSchema.index({ name: 'text', tags: 'text', description: 'text' });
productSchema.index({ category: 1, isActive: 1 });
productSchema.index({ isFeatured: 1 });

// Prevent model re-compilation on Next.js hot reloads
export default models.Product || model<IProduct>('Product', productSchema);
