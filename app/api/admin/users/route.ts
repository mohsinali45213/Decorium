import { type NextRequest } from 'next/server';

import { getCurrentAdminUser, hashPassword } from '@/lib/auth';
import { connectDB } from '@/lib/db';
import User, { UserRole } from '@/lib/models/User';

export async function GET() {
  const session = await getCurrentAdminUser();
  if (!session) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectDB();
    const users = await User.find({ isActive: true })
      .select('name email role createdAt')
      .sort({ createdAt: -1 })
      .lean();

    return Response.json({
      data: users.map((user) => ({
        _id: String(user._id),
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      })),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unexpected error';
    return Response.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const session = await getCurrentAdminUser();
  if (!session) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectDB();

    const body = await request.json();
    const name = typeof body?.name === 'string' ? body.name.trim() : '';
    const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : '';
    const password = typeof body?.password === 'string' ? body.password : '';
    const role = typeof body?.role === 'string' ? body.role : 'staff';

    if (!name || !email || !password) {
      return Response.json({ error: 'Name, email, and password are required' }, { status: 400 });
    }

    if (!['admin', 'staff'].includes(role)) {
      return Response.json({ error: 'Role must be admin or staff' }, { status: 400 });
    }

    if (password.length < 6) {
      return Response.json({ error: 'Password must contain at least 6 characters' }, { status: 400 });
    }

    const existingUser = await User.findOne({ email, isActive: true });
    if (existingUser) {
      return Response.json({ error: 'A user with this email already exists' }, { status: 409 });
    }

    const createdUser = await User.create({
      name,
      email,
      passwordHash: await hashPassword(password),
      role: role as UserRole,
      isActive: true,
    });

    return Response.json(
      {
        data: {
          _id: String(createdUser._id),
          name: createdUser.name,
          email: createdUser.email,
          role: createdUser.role,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unexpected error';
    return Response.json({ error: message }, { status: 500 });
  }
}
