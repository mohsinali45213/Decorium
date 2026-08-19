import { type NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import Brand from "@/lib/models/Brand";

// GET /api/brands?page=1&limit=10&search=kajaria
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = request.nextUrl;
    const page = Math.max(1, Number(searchParams.get("page") ?? 1));
    const limit = Math.min(
      100,
      Math.max(1, Number(searchParams.get("limit") ?? 10)),
    );
    const search = searchParams.get("search")?.trim() ?? "";

    const filter: Record<string, unknown> = { isActive: true };
    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }

    const [brands, total] = await Promise.all([
      Brand.find(filter)
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ name: 1 }),
      Brand.countDocuments(filter),
    ]);

    return Response.json({
      data: brands,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unexpected error";
    return Response.json({ error: message }, { status: 500 });
  }
}

// POST /api/brands
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const brand = await Brand.create(body);

    return Response.json({ data: brand }, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unexpected error";
    return Response.json({ error: message }, { status: 500 });
  }
}
