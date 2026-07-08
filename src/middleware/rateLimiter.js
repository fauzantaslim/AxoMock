/**
 * In-memory rate limiter middleware.
 * 100 requests per minute per IP address.
 * No external dependencies (no Redis).
 */

const WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS = 100;

// Map of IP → { count, resetTime }
const store = new Map();

// Clean up expired entries every 5 minutes
setInterval(
  () => {
    const now = Date.now();
    for (const [ip, data] of store.entries()) {
      if (now > data.resetTime) {
        store.delete(ip);
      }
    }
  },
  5 * 60 * 1000
);

function rateLimiter(req, res, next) {
  const ip = req.ip || req.connection.remoteAddress;
  const now = Date.now();

  let record = store.get(ip);

  // If no record or window expired, create new record
  if (!record || now > record.resetTime) {
    record = {
      count: 0,
      resetTime: now + WINDOW_MS,
    };
    store.set(ip, record);
  }

  record.count++;

  const remaining = Math.max(0, MAX_REQUESTS - record.count);
  const resetSeconds = Math.ceil((record.resetTime - now) / 1000);

  // Set rate limit headers on every response
  res.set('X-RateLimit-Limit', String(MAX_REQUESTS));
  res.set('X-RateLimit-Remaining', String(remaining));
  res.set('X-RateLimit-Reset', String(resetSeconds));

  if (record.count > MAX_REQUESTS) {
    return res.status(429).json({
      message: `Rate limit exceeded. Try again in ${resetSeconds} seconds.`,
    });
  }

  next();
}

export { rateLimiter };
