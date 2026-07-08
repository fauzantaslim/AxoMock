/**
 * Delay simulation middleware.
 * Adds configurable latency via ?delay=N query parameter (milliseconds).
 * Maximum delay: 5000ms.
 */

function delayMiddleware(req, res, next) {
  const delayParam = req.query.delay;

  if (!delayParam) return next();

  let delay = parseInt(delayParam);

  if (isNaN(delay) || delay <= 0) return next();

  // Cap at 5000ms
  delay = Math.min(delay, 5000);

  res.set('X-Response-Delay', `${delay}ms`);

  setTimeout(next, delay);
}

export { delayMiddleware };
