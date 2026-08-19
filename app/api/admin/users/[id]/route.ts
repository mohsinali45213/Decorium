import { type NextRequest } from 'next/server';

import { getCurrentAdminUser } from '@/lib/auth';
import { connectDB } from '@/lib/db';
import User from '@/lib/models/User';

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getCurrentAdminUser();
  if (!session) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectDB();
    const { id } = await params;

    const targetUser = await User.findById(id);
    if (!targetUser) {
      return Response.json({ error: 'User not found' }, { status: 404 });
    }

    const adminCount = await User.countDocuments({ role: 'admin', isActive: true });
    if (targetUser.role === 'admin' && adminCount <= 1) {
      return Response.json(
        { error: 'You cannot delete the last remaining admin user.' },
        { status: 400 }
      );
    }

    if (String(targetUser._id) === session._id && adminCount <= 1) {
      return Response.json(
        { error: 'You cannot delete yourself when you are the only admin left.' },
        { status: 400 }
      );
    }

    if (String(targetUser._id) === session._id && adminCount > 1) {
      return Response.json(
        { error: 'Admin cannot delete their own account while other admins remain.' },
        { status: 400 }
      );
    }

    await User.findByIdAndDelete(id);
    return new Response(null, { status: 204 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unexpected error';
    return Response.json({ error: message }, { status: 500 });
  }
}
