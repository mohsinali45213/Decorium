import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { connectDB } from '@/lib/db';
import User, { UserRole } from '@/lib/models/User';

export const ADMIN_COOKIE_NAME = 'decorium_admin_session';
const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET ?? 'decorium-admin-dev-secret-change-me';

export type AdminSessionPayload = {
  userId: string;
  role: UserRole;
  exp: number;
};

async function signMessage(value: string): Promise<string> {
  if (typeof crypto !== 'undefined' && 'subtle' in crypto && crypto.subtle) {
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(SESSION_SECRET),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );
    const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(value));
    return Array.from(new Uint8Array(signature))
      .map((byte) => byte.toString(16).padStart(2, '0'))
      .join('');
  }

  const { createHmac } = await import('node:crypto');
  return createHmac('sha256', SESSION_SECRET).update(value).digest('hex');
}

export async function createSessionCookie(userId: string, role: UserRole): Promise<string> {
  const payload: AdminSessionPayload = {
    userId,
    role,
    exp: Date.now() + 1000 * 60 * 60 * 8,
  };

  const encoded = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = await signMessage(encoded);

  return `${encoded}.${signature}`;
}

export async function verifySessionCookie(value: string): Promise<AdminSessionPayload | null> {
  const [encoded, signature] = value.split('.');
  if (!encoded || !signature) return null;

  const expected = await signMessage(encoded);
  if (expected !== signature) return null;

  try {
    const payload = JSON.parse(Buffer.from(encoded, 'base64url').toString('utf8')) as AdminSessionPayload;

    if (!payload.userId || !payload.role || !payload.exp) return null;
    if (payload.exp < Date.now()) return null;
    if (payload.role !== 'admin') return null;

    return payload;
  } catch {
    return null;
  }
}

export async function getCurrentAdminUser() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(ADMIN_COOKIE_NAME)?.value;

  if (!sessionToken) return null;

  const payload = await verifySessionCookie(sessionToken);
  if (!payload) return null;

  await connectDB();
  const user = await User.findById(payload.userId).lean();
  if (!user || !user.isActive || user.role !== 'admin') return null;

  return {
    _id: String(user._id),
    name: user.name,
    email: user.email,
    role: user.role,
  };
}

export async function requireAdmin() {
  const user = await getCurrentAdminUser();
  if (!user) redirect('/admin/login');
  return user;
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}
