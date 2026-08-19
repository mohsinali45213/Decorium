import { type NextRequest } from 'next/server';
import cloudinary from '@/lib/cloudinary';

// POST /api/upload
// Body: multipart/form-data with one or more files under "files"
// Optional field "folder" to organise uploads (e.g. "products", "brands", "categories")
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('files').filter((item): item is File => item instanceof File && item.type.startsWith('image/'));
    const folder = (formData.get('folder') as string | null) ?? 'decorium';

    if (!files.length) {
      return Response.json({ error: 'No image files provided' }, { status: 400 });
    }

    const uploaded = await Promise.all(
      files.map(async (file) => {
        const arrayBuffer = await file.arrayBuffer();
        const base64 = Buffer.from(arrayBuffer).toString('base64');
        const dataUri = `data:${file.type};base64,${base64}`;

        const result = await cloudinary.uploader.upload(dataUri, {
          folder,
          resource_type: 'image',
          transformation: [
            { quality: 'auto' },
            { fetch_format: 'auto' },
          ],
        });

        return {
          url: result.secure_url,
          publicId: result.public_id,
          width: result.width,
          height: result.height,
        };
      })
    );

    return Response.json({ data: uploaded }, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unexpected error';
    return Response.json({ error: message }, { status: 500 });
  }
}

// DELETE /api/upload?publicId=decorium/abc123
// Deletes an image from Cloudinary by its public ID
export async function DELETE(request: NextRequest) {
  try {
    const publicId = request.nextUrl.searchParams.get('publicId');

    if (!publicId) {
      return Response.json({ error: 'publicId is required' }, { status: 400 });
    }

    await cloudinary.uploader.destroy(publicId);

    return new Response(null, { status: 204 });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unexpected error';
    return Response.json({ error: message }, { status: 500 });
  }
}
