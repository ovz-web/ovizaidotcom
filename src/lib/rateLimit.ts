import { NextRequest } from 'next/server';
import { Redis } from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';
import { supabaseAdmin } from '@/lib/supabaseServer';

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

interface RateLimitOptions {
  limit?: number; // max requests per window (default: 5)
  windowMs?: number; // window size in ms (default: 60,000 = 1 minute)
}

// In-memory fallback cache
const stores = new Map<string, Map<string, RateLimitEntry>>();

// Upstash Redis limiter cache
const upstashRatelimitMap = new Map<string, Ratelimit>();

function getUpstashLimiter(prefix: string, limit: number, windowMs: number): Ratelimit | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;

  const key = `${prefix}-${limit}-${windowMs}`;
  if (!upstashRatelimitMap.has(key)) {
    try {
      const redis = new Redis({ url, token });
      const limiter = new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(limit, `${Math.ceil(windowMs / 1000)} s`),
        prefix: `ovizai:${prefix}`,
      });
      upstashRatelimitMap.set(key, limiter);
    } catch {
      return null;
    }
  }
  return upstashRatelimitMap.get(key) || null;
}

/**
 * Robust, serverless-compatible rate limiter.
 * 1. Checks Upstash Redis if configured in environment variables.
 * 2. Checks Supabase atomic window if api_rate_limits table is present.
 * 3. Falls back gracefully to in-memory sliding window to guarantee 100% uptime.
 */
export async function checkRateLimit(
  req: NextRequest,
  prefix: string = 'global',
  options: RateLimitOptions = {}
): Promise<{ success: boolean; remaining: number; resetInSeconds: number }> {
  const limit = options.limit ?? 5;
  const windowMs = options.windowMs ?? 60_000;

  // Extract client IP address
  const forwardedFor = req.headers.get('x-forwarded-for');
  const realIp = req.headers.get('x-real-ip');
  const ip = (forwardedFor ? forwardedFor.split(',')[0].trim() : realIp) || '127.0.0.1';

  // 1. Try Upstash Redis if configured
  const upstashLimiter = getUpstashLimiter(prefix, limit, windowMs);
  if (upstashLimiter) {
    try {
      const { success, remaining, reset } = await upstashLimiter.limit(ip);
      return {
        success,
        remaining,
        resetInSeconds: Math.max(1, Math.ceil((reset - Date.now()) / 1000)),
      };
    } catch (err) {
      console.warn('[RATELIMIT] Upstash error, falling back to local/DB:', err);
    }
  }

  // 2. Try Supabase rate limit tracking if configured
  if (process.env.SUPABASE_SERVICE_ROLE_KEY && process.env.NEXT_PUBLIC_SUPABASE_URL) {
    try {
      const now = new Date();
      const windowStart = new Date(now.getTime() - windowMs).toISOString();
      const rateLimitKey = `${prefix}:${ip}`;

      const { error: insertError } = await supabaseAdmin.from('api_rate_limits').insert([
        {
          key: rateLimitKey,
          timestamp: now.toISOString(),
        },
      ]);

      if (!insertError) {
        const { count, error: countError } = await supabaseAdmin
          .from('api_rate_limits')
          .select('*', { count: 'exact', head: true })
          .eq('key', rateLimitKey)
          .gte('timestamp', windowStart);

        if (!countError && count !== null) {
          const success = count <= limit;
          return {
            success,
            remaining: Math.max(0, limit - count),
            resetInSeconds: Math.ceil(windowMs / 1000),
          };
        }
      }
    } catch {
      // Table doesn't exist or DB unavailable, proceed to local memory cache
    }
  }

  // 3. Resilient In-Memory Fallback
  let store = stores.get(prefix);
  if (!store) {
    store = new Map<string, RateLimitEntry>();
    stores.set(prefix, store);
  }

  const now = Date.now();
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
