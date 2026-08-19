import { type NextRequest } from 'next/server';
import { connectDB } from '@/lib/db';
import Product from '@/lib/models/Product';
import { generateUniqueSlug, generateUniqueSku } from '@/lib/utils';

// GET /api/products?page=1&limit=10&search=kajaria&category=<id>&brand=<id>&isFeatured=true
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = request.nextUrl;
    const page       = Math.max(1, Number(searchParams.get('page')  ?? 1));
    const limit      = Math.min(100, Math.max(1, Number(searchParams.get('limit') ?? 10)));
    const search     = searchParams.get('search')?.trim() ?? '';
    const category   = searchParams.get('category');
    const brand      = searchParams.get('brand');
    const isFeatured = searchParams.get('isFeatured');

    const filter: Record<string, unknown> = { isActive: true };

    // Full-text search across name, description, and tags (uses the text index)
    if (search) {
      filter.$text = { $search: search };
    }
    if (category)   filter.category   = category;
    if (brand)      filter.brand       = brand;
    if (isFeatured) filter.isFeatured  = isFeatured === 'true';

    const [products, total] = await Promise.all([
      Product.find(filter)
        .populate('category',    'name slug')
        .populate('subCategory', 'name slug')
        .populate('brand',       'name logo')
        .select('-variants.images -gallery') // lighten list response
        .skip((page - 1) * limit)
        .limit(limit)
        .sort(search ? { score: { $meta: 'textScore' } } : { createdAt: -1 }),
      Product.countDocuments(filter),
    ]);

    return Response.json({
      data: products,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unexpected error';
    return Response.json({ error: message }, { status: 500 });
  }
}

// POST /api/products
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const name = typeof body?.name === 'string' ? body.name.trim() : '';
    const category = typeof body?.category === 'string' ? body.category.trim() : '';

    if (!name) {
      return Response.json({ error: 'Product name is required' }, { status: 400 });
    }

    if (!category) {
      return Response.json({ error: 'Product category is required' }, { status: 400 });
    }

    const payload = { ...body };
    delete payload.slug;
    payload.name = name;
    payload.category = category;
    payload.slug = await generateUniqueSlug(Product, name);

    const generatedSku = await generateUniqueSku(Product, name);
    payload.variants = Array.isArray(payload.variants) && payload.variants.length
      ? payload.variants.map((variant: Record<string, unknown>, index: number) => ({
          ...variant,
          sku: typeof variant?.sku === 'string' && variant.sku.trim() ? variant.sku.trim().toUpperCase() : `${generatedSku}${index === 0 ? '' : `-${index + 1}`}`,
        }))
      : [{
          sku: generatedSku,
          unit: 'piece',
          showPriceOnWebsite: true,
          images: [],
        }];

    const product = await Product.create(payload);

    return Response.json({ data: product }, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unexpected error';
    return Response.json({ error: message }, { status: 500 });
  }
}
