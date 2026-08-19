import { type NextRequest } from 'next/server';
import { connectDB } from '@/lib/db';
import Category from '@/lib/models/Category';
import { generateUniqueSlug } from '@/lib/utils';

// GET /api/categories/[id]
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;

    const category = await Category.findById(id).populate('parentCategory', 'name slug');
    if (!category) return Response.json({ error: 'Category not found' }, { status: 404 });

    return Response.json({ data: category });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unexpected error';
    return Response.json({ error: message }, { status: 500 });
  }
}

// PUT /api/categories/[id]
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
        return Response.json({ error: 'Category name is required' }, { status: 400 });
      }
      update.name = name;
      update.slug = await generateUniqueSlug(Category, name, id);
    }

    const category = await Category.findByIdAndUpdate(id, update, { new: true, runValidators: true });
    if (!category) return Response.json({ error: 'Category not found' }, { status: 404 });

    return Response.json({ data: category });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unexpected error';
    return Response.json({ error: message }, { status: 500 });
  }
}

// DELETE /api/categories/[id]
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;

    const category = await Category.findByIdAndDelete(id);
    if (!category) return Response.json({ error: 'Category not found' }, { status: 404 });

    return new Response(null, { status: 204 });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unexpected error';
    return Response.json({ error: message }, { status: 500 });
  }
}
