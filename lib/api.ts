// Shared axios instance used by both server and client components.
// Base URL automatically resolves:
//   - Server-side (SSR): uses NEXT_PUBLIC_BASE_URL or falls back to localhost:3000
//   - Client-side:       uses a relative base so the browser hits its own origin

import axios from 'axios';

const api = axios.create({
  baseURL:
    typeof window === 'undefined'
      ? (process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000') + '/api'
      : '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
