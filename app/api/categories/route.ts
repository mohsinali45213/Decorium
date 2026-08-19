import { type NextRequest } from 'next/server';
import { connectDB } from '@/lib/db';
import Category from '@/lib/models/Category';
import { generateUniqueSlug } from '@/lib/utils';

// GET /api/categories?page=1&limit=10&search=tiles&parentCategory=<id>
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = request.nextUrl;
    const page           = Math.max(1, Number(searchParams.get('page')  ?? 1));
    const limit          = Math.min(100, Math.max(1, Number(searchParams.get('limit') ?? 10)));
    const search         = searchParams.get('search')?.trim() ?? '';
    const parentCategory = searchParams.get('parentCategory');

    const filter: Record<string, unknown> = { isActive: true };
    if (search) {
      filter.name = { $regex: search, $options: 'i' };
    }
    // Pass "null" (string) to fetch only root categories
    if (parentCategory === 'null') {
      filter.parentCategory = null;
    } else if (parentCategory) {
      filter.parentCategory = parentCategory;
    }

    const [categories, total] = await Promise.all([
      Category.find(filter)
        .populate('parentCategory', 'name slug')
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ name: 1 }),
      Category.countDocuments(filter),
    ]);

    return Response.json({
      data: categories,
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

// POST /api/categories
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const name = typeof body?.name === 'string' ? body.name.trim() : '';

    if (!name) {
      return Response.json({ error: 'Category name is required' }, { status: 400 });
    }

    const payload = { ...body };
    delete payload.slug;
    payload.name = name;
    payload.slug = await generateUniqueSlug(Category, name);

    const category = await Category.create(payload);

    return Response.json({ data: category }, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unexpected error';
    return Response.json({ error: message }, { status: 500 });
  }
}
