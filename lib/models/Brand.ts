import { Schema, model, models, Document } from 'mongoose';

export interface IBrand extends Document {
  name: string;
  logo?: string;
  gallery?: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const brandSchema = new Schema<IBrand>(
  {
    name: { type: String, required: true, trim: true },
    logo: { type: String },
    gallery: [{ type: String }],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Prevent model re-compilation on Next.js hot reloads
export default models.Brand || model<IBrand>('Brand', brandSchema);
