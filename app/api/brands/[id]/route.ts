import { type NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import Brand from "@/lib/models/Brand";
import Product from "@/lib/models/Product";

// GET /api/brands/[id]
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();
    const { id } = await params;

    const brand = await Brand.findById(id);
    if (!brand)
      return Response.json({ error: "Brand not found" }, { status: 404 });

    return Response.json({ data: brand });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unexpected error";
    return Response.json({ error: message }, { status: 500 });
  }
}

// PUT /api/brands/[id]
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();

    const brand = await Brand.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    if (!brand)
      return Response.json({ error: "Brand not found" }, { status: 404 });

    return Response.json({ data: brand });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unexpected error";
    return Response.json({ error: message }, { status: 500 });
  }
}

// DELETE /api/brands/[id]
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();
    const { id } = await params;

    // Block deletion if any products still reference this brand
    const productCount = await Product.countDocuments({ brand: id });
    if (productCount > 0) {
      return Response.json(
        {
          error: `Cannot delete: ${productCount} product${productCount > 1 ? 's are' : ' is'} still using this brand. Reassign or remove them first.`,
        },
        { status: 409 }
      );
    }

    const brand = await Brand.findByIdAndDelete(id);
    if (!brand)
      return Response.json({ error: "Brand not found" }, { status: 404 });

    return new Response(null, { status: 204 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unexpected error";
    return Response.json({ error: message }, { status: 500 });
  }
}
