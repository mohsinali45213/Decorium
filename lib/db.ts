import mongoose from 'mongoose';

/**
 * In Next.js dev mode the module is re-evaluated on every hot reload.
 * We cache the connection promise on the global object so we reuse
 * an existing connection instead of opening a new one each time.
 */
declare global {
  // eslint-disable-next-line no-var
  var _mongooseCache: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null };
}

const cache = global._mongooseCache ?? { conn: null, promise: null };
global._mongooseCache = cache;

export async function connectDB(): Promise<typeof mongoose> {
  // Read at request time — env vars are guaranteed to be loaded by then
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI is not defined in environment variables');
  }

  // Already connected — return immediately
  if (cache.conn) return cache.conn;

  // Connection attempt already in-flight — wait for it
  if (!cache.promise) {
    cache.promise = mongoose.connect(uri, {
      bufferCommands: false,
    });
  }

  cache.conn = await cache.promise;
  return cache.conn;
}
