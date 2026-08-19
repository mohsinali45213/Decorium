import bcrypt from 'bcryptjs';
import { type NextRequest } from 'next/server';

import { ADMIN_COOKIE_NAME, createSessionCookie, hashPassword, verifyPassword } from '@/lib/auth';
import { connectDB } from '@/lib/db';
import User from '@/lib/models/User';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : '';
    const password = typeof body?.password === 'string' ? body.password : '';

    if (!email || !password) {
      return Response.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const totalUsers = await User.countDocuments();

    if (totalUsers === 0) {
      const user = await User.create({
        name: 'Admin',
        email,
        passwordHash: await hashPassword(password),
        role: 'admin',
      });

      const sessionToken = await createSessionCookie(String(user._id), user.role);
      const response = Response.json(
        {
          message: 'First admin user created successfully.',
          user: {
            _id: String(user._id),
            name: user.name,
            email: user.email,
            role: user.role,
          },
        },
        { status: 201 }
      );

      response.headers.set(
        'Set-Cookie',
        `${ADMIN_COOKIE_NAME}=${sessionToken}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${60 * 60 * 8}`
      );

      return response;
    }

    const user = await User.findOne({ email, isActive: true }).lean();
    if (!user) {
      return Response.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const validPassword = await verifyPassword(password, user.passwordHash);
    if (!validPassword) {
      return Response.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    if (user.role !== 'admin') {
      return Response.json({ error: 'Only admin users can sign in to the admin panel' }, { status: 403 });
    }

    const sessionToken = await createSessionCookie(String(user._id), user.role);
    const response = Response.json({
      message: 'Login successful.',
      user: {
        _id: String(user._id),
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

    response.headers.set(
      'Set-Cookie',
      `${ADMIN_COOKIE_NAME}=${sessionToken}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${60 * 60 * 8}`
    );

    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unexpected error';
    return Response.json({ error: message }, { status: 500 });
  }
}
