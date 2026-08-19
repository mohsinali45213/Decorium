import mongoose from 'mongoose';
import { connectDB } from '@/lib/db';

// GET /api/health
// Basic health check with DB connectivity status.
export async function GET() {
  const now = new Date().toISOString();

  try {
    await connectDB();

    // 1 means connected in Mongoose connection states.
    const dbConnected = mongoose.connection.readyState === 1;

    if (!dbConnected) {
      return Response.json(
        {
          status: 'degraded',
          service: 'decorium-api',
          database: 'disconnected',
          timestamp: now,
        },
        { status: 503 }
      );
    }

    return Response.json(
      {
        status: 'ok',
        service: 'decorium-api',
        database: 'connected',
        timestamp: now,
      },
      { status: 200 }
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unexpected error';

    return Response.json(
      {
        status: 'error',
        service: 'decorium-api',
        database: 'disconnected',
        error: message,
        timestamp: now,
      },
      { status: 503 }
    );
  }
}
