import { type NextRequest } from 'next/server';
import { connectDB } from '@/lib/db';
import Product from '@/lib/models/Product';
import { generateUniqueSlug, generateUniqueSku } from '@/lib/utils';

// GET /api/products/[id]
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;

    const product = await Product.findById(id)
      .populate('category',    'name slug')
      .populate('subCategory', 'name slug')
      .populate('brand',       'name logo');

    if (!product) return Response.json({ error: 'Product not found' }, { status: 404 });

    return Response.json({ data: product });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unexpected error';
    return Response.json({ error: message }, { status: 500 });
  }
}

// PUT /api/products/[id]
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();
    const update = { ...body };
    delete update.slug;

    if (typeof update.name === 'string') {
      const name = update.name.trim();
      if (!name) {
        return Response.json({ error: 'Product name is required' }, { status: 400 });
      }
      update.name = name;
      update.slug = await generateUniqueSlug(Product, name, id);
    }

    if (typeof update.category === 'string' && !update.category.trim()) {
      return Response.json({ error: 'Product category is required' }, { status: 400 });
    }

    if (Array.isArray(update.variants) && update.variants.length) {
      const generatedSku = await generateUniqueSku(Product, update.name || (await Product.findById(id).select('name').lean())?.name || 'Product', id);
      update.variants = update.variants.map((variant: Record<string, unknown>, index: number) => ({
        ...variant,
        sku: typeof variant?.sku === 'string' && variant.sku.trim() ? variant.sku.trim().toUpperCase() : `${generatedSku}${index === 0 ? '' : `-${index + 1}`}`,
      }));
    }

    const product = await Product.findByIdAndUpdate(id, update, { new: true, runValidators: true });
    if (!product) return Response.json({ error: 'Product not found' }, { status: 404 });

    return Response.json({ data: product });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unexpected error';
    return Response.json({ error: message }, { status: 500 });
  }
}

// DELETE /api/products/[id]
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;

    const product = await Product.findByIdAndDelete(id);
    if (!product) return Response.json({ error: 'Product not found' }, { status: 404 });

    return new Response(null, { status: 204 });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unexpected error';
    return Response.json({ error: message }, { status: 500 });
  }
}
