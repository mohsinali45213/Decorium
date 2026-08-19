/**
 * Server-only data fetchers — query MongoDB directly.
 *
 * IMPORTANT: Import these ONLY in server components / route handlers.
 * They bypass the HTTP round-trip that `lib/api.ts` (axios) would cause
 * when called from a server component hitting its own /api endpoints.
 */

import { connectDB } from '@/lib/db';
import ProductModel from '@/lib/models/Product';
import CategoryModel from '@/lib/models/Category';
import BrandModel from '@/lib/models/Brand';


/* ── Types ──────────────────────────────────────────────────── */

export interface ProductSummary {
  _id: string;
  name: string;
  slug: string;
  shortDescription?: string;
  coverImage?: string;
  isFeatured: boolean;
  categorySlug?: string; // populated when category is joined
}

export interface CategorySummary {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  productCount?: number;
  subCategories?: Array<{
    _id: string;
    name: string;
    slug: string;
  }>;
}

/* ── Categories ─────────────────────────────────────────────── */

/** Fetch all root-level (top-level) active categories, sorted by name. */
export async function getRootCategories(): Promise<CategorySummary[]> {
  await connectDB();
  const docs = await CategoryModel.find({ isActive: true, parentCategory: null })
    .select('name slug description image')
    .sort({ name: 1 })
    .lean();
  return docs as unknown as CategorySummary[];
}

/** Fetch root categories with live product counts and child-category previews. */
export async function getCategoryIndexData(): Promise<CategorySummary[]> {
  await connectDB();

  const rootCategories = await CategoryModel.find({ isActive: true, parentCategory: null })
    .select('name slug description image')
    .sort({ name: 1 })
    .lean();

  const categories = await Promise.all(
    rootCategories.map(async (category) => {
      const [productCount, subCategories] = await Promise.all([
        ProductModel.countDocuments({ isActive: true, category: category._id }),
        CategoryModel.find({ isActive: true, parentCategory: category._id })
          .select('name slug')
          .sort({ name: 1 })
          .limit(4)
          .lean(),
      ]);

      return {
        ...(category as Record<string, unknown>),
        productCount,
        subCategories: (subCategories as Array<{ _id: string; name: string; slug: string }>).map((sub) => ({
          _id: String(sub._id),
          name: sub.name,
          slug: sub.slug,
        })),
      } as CategorySummary;
    })
  );

  return categories;
}

/** Fetch a single category by its slug. */
export async function getCategoryBySlug(slug: string): Promise<CategorySummary | null> {
  await connectDB();
  const doc = await CategoryModel.findOne({ slug, isActive: true })
    .select('name slug description image')
    .lean();
  return (doc as unknown as CategorySummary) ?? null;
}

/** Fetch all active categories (optionally filtered by parent ID). */
export async function getCategories(parentId?: string): Promise<CategorySummary[]> {
  await connectDB();
  const filter: Record<string, unknown> = { isActive: true };
  if (parentId === 'null' || parentId === undefined) {
    filter.parentCategory = null;
  } else {
    filter.parentCategory = parentId;
  }
  const docs = await CategoryModel.find(filter)
    .select('name slug description image')
    .sort({ name: 1 })
    .lean();
  return docs as unknown as CategorySummary[];
}

/* ── Products ───────────────────────────────────────────────── */

/** Fetch featured products (used on home page). */
export async function getFeaturedProducts(limit = 6): Promise<ProductSummary[]> {
  await connectDB();

  // Step 1: fetch products with the raw category ObjectId
  const docs = await ProductModel.find({ isActive: true, isFeatured: true })
    .select('name slug shortDescription coverImage isFeatured category')
    .limit(limit)
    .sort({ createdAt: -1 })
    .lean();

  // Step 2: collect unique category IDs and batch-fetch their slugs
  const categoryIds = [
    ...new Set(
      docs
        .map((d) => (d as { category?: unknown }).category)
        .filter(Boolean)
        .map((id) => String(id))
    ),
  ];

  const categoryDocs = categoryIds.length
    ? await CategoryModel.find({ _id: { $in: categoryIds } })
        .select('_id slug')
        .lean()
    : [];

  const categorySlugMap = new Map<string, string>(
    categoryDocs.map((c) => [String(c._id), (c as { slug: string }).slug])
  );

  return docs.map((d) => {
    const catId = String((d as { category?: unknown }).category ?? '');
    return {
      _id: String(d._id),
      name: (d as { name: string }).name,
      slug: (d as { slug: string }).slug,
      shortDescription: (d as { shortDescription?: string }).shortDescription,
      coverImage: (d as { coverImage?: string }).coverImage,
      isFeatured: (d as { isFeatured: boolean }).isFeatured,
      categorySlug: categorySlugMap.get(catId),
    };
  });
}

/** Fetch products belonging to a category (by category ObjectId), optionally filtered by sub-category slug. */
export async function getProductsByCategory(
  categoryId: string,
  limit = 50,
  subCategorySlug?: string
): Promise<ProductSummary[]> {
  await connectDB();

  const filter: Record<string, unknown> = { isActive: true, category: categoryId };

  if (subCategorySlug) {
    const subCategory = await CategoryModel.findOne({ slug: subCategorySlug, isActive: true }).select('_id').lean();
    if (subCategory) {
      filter.subCategory = subCategory._id;
    }
  }

  const docs = await ProductModel.find(filter)
    .select('name slug shortDescription coverImage isFeatured')
    .limit(limit)
    .sort({ createdAt: -1 })
    .lean();
  return docs as unknown as ProductSummary[];
}

/** Fetch products that have a coverImage (gallery page). */
export async function getProductsWithImages(limit = 50): Promise<ProductSummary[]> {
  await connectDB();
  const docs = await ProductModel.find({
    isActive: true,
    coverImage: { $exists: true, $ne: '' },
  })
    .select('name slug coverImage')
    .limit(limit)
    .sort({ createdAt: -1 })
    .lean();
  return docs as unknown as ProductSummary[];
}

/* ── Brands ─────────────────────────────────────────────────── */

export interface BrandSummary {
  _id: string;
  name: string;
  logo?: string;
}

/** Fetch all active brands for the brand strip. */
export async function getBrands(): Promise<BrandSummary[]> {
  await connectDB();
  const docs = await BrandModel.find({ isActive: true })
    .select('name logo')
    .sort({ name: 1 })
    .lean();
  return docs.map((d) => ({ ...d, _id: String(d._id) })) as BrandSummary[];
}

/* ── Category Detail Page ───────────────────────────────────── */

export interface CategoryDetail extends CategorySummary {
  subCategories: Array<{ _id: string; name: string; slug: string }>;
}

export interface ProductCard {
  _id: string;
  name: string;
  slug: string;
  shortDescription?: string;
  coverImage?: string;
  isFeatured: boolean;
  brandName?: string;
  brandId?: string;
  attributes: Record<string, unknown>;
  variantCount: number;
}

/** Fetch a single category with its sub-categories. */
export async function getCategoryDetail(slug: string): Promise<CategoryDetail | null> {
  await connectDB();
  const doc = await CategoryModel.findOne({ slug, isActive: true })
    .select('name slug description image')
    .lean();
  if (!doc) return null;

  const subs = await CategoryModel.find({ isActive: true, parentCategory: doc._id })
    .select('name slug')
    .sort({ name: 1 })
    .lean();

  return {
    _id: String(doc._id),
    name: (doc as { name: string }).name,
    slug: (doc as { slug: string }).slug,
    description: (doc as { description?: string }).description,
    image: (doc as { image?: string }).image,
    subCategories: subs.map((s) => ({
      _id: String(s._id),
      name: (s as { name: string }).name,
      slug: (s as { slug: string }).slug,
    })),
  };
}

/** Fetch products for a category, optionally filtered by sub-category slug. */
export async function getCategoryProducts(
  categoryId: string,
  subCategorySlug?: string
): Promise<ProductCard[]> {
  await connectDB();

  const filter: Record<string, unknown> = { isActive: true, category: categoryId };

  if (subCategorySlug) {
    const sub = await CategoryModel.findOne({ slug: subCategorySlug, isActive: true })
      .select('_id')
      .lean();
    if (sub) filter.subCategory = sub._id;
  }

  const docs = await ProductModel.find(filter)
    .select('name slug shortDescription coverImage isFeatured brand attributes variants')
    .populate('brand', 'name')
    .sort({ createdAt: -1 })
    .lean();

  return (docs as any[]).map((d) => {
    const brand = d.brand as { _id?: unknown; name?: string } | undefined;
    return {
      _id: String(d._id),
      name: d.name,
      slug: d.slug,
      shortDescription: d.shortDescription,
      coverImage: d.coverImage,
      isFeatured: Boolean(d.isFeatured),
      brandName: brand?.name,
      brandId: brand?._id ? String(brand._id) : undefined,
      attributes: (d.attributes ?? {}) as Record<string, unknown>,
      variantCount: Array.isArray(d.variants) ? d.variants.length : 0,
    };
  });
}

/** Fetch brands that have at least one product in a given category. */
export async function getBrandsInCategory(categoryId: string): Promise<BrandSummary[]> {
  await connectDB();
  const brandIds = await ProductModel.distinct('brand', { isActive: true, category: categoryId });
  const docs = await BrandModel.find({ _id: { $in: brandIds }, isActive: true })
    .select('name logo')
    .sort({ name: 1 })
    .lean();
  return docs.map((d) => ({ ...d, _id: String(d._id) })) as BrandSummary[];
}

/** Fetch other root categories excluding the current one (for the "related" strip). */
export async function getRelatedCategories(excludeId: string, limit = 4): Promise<CategorySummary[]> {
  await connectDB();
  const docs = await CategoryModel.find({
    isActive: true,
    parentCategory: null,
    _id: { $ne: excludeId },
  })
    .select('name slug image description')
    .limit(limit)
    .lean();
  return docs.map((d) => ({ ...d, _id: String(d._id) })) as unknown as CategorySummary[];
}

/* -- Product Detail Page ------------------------------------ */

export interface VariantDetail {
  _id: string;
  size?: string;
  color?: string;
  finish?: string;
  sku?: string;
  unit?: string;
  price?: number;
  showPriceOnWebsite: boolean;
  images: string[];
}

export interface ProductDetail {
  _id: string;
  name: string;
  slug: string;
  shortDescription?: string;
  description?: string;
  coverImage?: string;
  gallery: string[];
  isFeatured: boolean;
  attributes: Record<string, unknown>;
  variants: VariantDetail[];
  brandName?: string;
  brandLogo?: string;
  categoryName?: string;
  categorySlug?: string;
  subCategoryName?: string;
  tags: string[];
}

export async function getProductDetail(productParam: string): Promise<ProductDetail | null> {
  await connectDB();

  // Require a Mongo ObjectId prefix (24 hex chars). No ID = no match = 404.
  const hexIdMatch = productParam.match(/^([a-f\d]{24})(?:-|$)/i);
  if (!hexIdMatch) return null;

  const rawDoc = await ProductModel.findOne({ _id: hexIdMatch[1], isActive: true })
    .select('name slug shortDescription description coverImage gallery isFeatured attributes variants brand category subCategory tags')
    .populate('brand', 'name logo')
    .populate('category', 'name slug')
    .populate('subCategory', 'name')
    .lean();
  if (!rawDoc) return null;
  const doc = rawDoc as any;

  const brand = doc.brand as { _id?: unknown; name?: string; logo?: string } | undefined;
  const category = doc.category as { _id?: unknown; name?: string; slug?: string } | undefined;
  const subCat = doc.subCategory as { _id?: unknown; name?: string } | undefined;

  const rawVariants = Array.isArray(doc.variants)
    ? (doc.variants as Record<string, unknown>[])
    : [];

  return {
    _id: String(doc._id),
    name: doc.name,
    slug: doc.slug,
    shortDescription: doc.shortDescription,
    description: doc.description,
    coverImage: doc.coverImage,
    gallery: (doc.gallery ?? []),
    isFeatured: Boolean(doc.isFeatured),
    attributes: (doc.attributes ?? {}) as Record<string, unknown>,
    variants: rawVariants.map((v: any) => ({
      _id: String(v._id ?? ''),
      size: v.size as string | undefined,
      color: v.color as string | undefined,
      finish: v.finish as string | undefined,
      sku: v.sku as string | undefined,
      unit: v.unit as string | undefined,
      price: v.price as number | undefined,
      showPriceOnWebsite: Boolean(v.showPriceOnWebsite),
      images: Array.isArray(v.images) ? (v.images as string[]) : [],
    })),
    brandName: brand?.name,
    brandLogo: brand?.logo,
    categoryName: category?.name,
    categorySlug: category?.slug,
    subCategoryName: subCat?.name,
    tags: (doc.tags ?? []),
  };
}

/** Fetch related products from the same category, excluding this product. */
export async function getRelatedProducts(categorySlug: string, excludeProductId: string, limit = 4): Promise<ProductCard[]> {
  await connectDB();
  const cat = await CategoryModel.findOne({ slug: categorySlug, isActive: true }).select('_id').lean();
  if (!cat) return [];
  const docs = await ProductModel.find({
    isActive: true,
    category: (cat as any)._id,
    _id: { $ne: excludeProductId },
  })
    .select('name slug shortDescription coverImage isFeatured brand attributes variants')
    .populate('brand', 'name')
    .limit(limit)
    .lean();
  return (docs as any[]).map((d) => {
    const brand = d.brand as { _id?: unknown; name?: string } | undefined;
    return {
      _id: String(d._id),
      name: d.name,
      slug: d.slug,
      shortDescription: d.shortDescription,
      coverImage: d.coverImage,
      isFeatured: Boolean(d.isFeatured),
      brandName: brand?.name,
      brandId: brand?._id ? String(brand._id) : undefined,
      attributes: (d.attributes ?? {}) as Record<string, unknown>,
      variantCount: Array.isArray(d.variants) ? d.variants.length : 0,
    };
  });
}

