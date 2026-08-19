import { ADMIN_COOKIE_NAME } from '@/lib/auth';

export async function POST() {
  const response = Response.json({ ok: true });
  response.headers.set(
    'Set-Cookie',
    `${ADMIN_COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT`
  );

  return response;
}
