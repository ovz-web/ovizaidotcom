import { NextRequest } from 'next/server';

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

interface RateLimitOptions {
  limit?: number; // max requests per window (default: 5)
  windowMs?: number; // window size in ms (default: 60,000 = 1 minute)
}

const stores = new Map<string, Map<string, RateLimitEntry>>();

export function checkRateLimit(
  req: NextRequest,
  prefix: string = 'global',
  options: RateLimitOptions = {}
): { success: boolean; remaining: number; resetInSeconds: number } {
  const limit = options.limit ?? 5;
  const windowMs = options.windowMs ?? 60_000;

  // Extract client IP address
  const forwardedFor = req.headers.get('x-forwarded-for');
  const realIp = req.headers.get('x-real-ip');
  const ip = (forwardedFor ? forwardedFor.split(',')[0].trim() : realIp) || '127.0.0.1';

  let store = stores.get(prefix);
  if (!store) {
    store = new Map<string, RateLimitEntry>();
    stores.set(prefix, store);
  }

  const now = Date.now();

  // Garbage collect expired entries occasionally
  if (store.size > 500) {
    store.forEach((val, key) => {
      if (val.resetAt < now) {
        store.delete(key);
      }
    });
  }

  const current = store.get(ip);

  if (!current || current.resetAt < now) {
    store.set(ip, {
      count: 1,
      resetAt: now + windowMs,
    });
    return {
      success: true,
      remaining: limit - 1,
      resetInSeconds: Math.ceil(windowMs / 1000),
    };
  }

  if (current.count >= limit) {
    return {
      success: false,
      remaining: 0,
      resetInSeconds: Math.ceil((current.resetAt - now) / 1000),
    };
  }

  current.count += 1;
  return {
    success: true,
    remaining: limit - current.count,
    resetInSeconds: Math.ceil((current.resetAt - now) / 1000),
  };
}
