import { Schema, model, models, Document, Types } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  slug: string;
  parentCategory: Types.ObjectId | null; // null = top-level category
  description?: string;
  image?: string;
  gallery?: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const categorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true },
    parentCategory: {
      type: Schema.Types.ObjectId,
      ref: 'Category', // self-reference for sub-categories
      default: null,
    },
    description: { type: String },
    image: { type: String },
    gallery: [{ type: String }],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

categorySchema.index({ slug: 1 });
categorySchema.index({ parentCategory: 1 });

// Prevent model re-compilation on Next.js hot reloads
export default models.Category || model<ICategory>('Category', categorySchema);
