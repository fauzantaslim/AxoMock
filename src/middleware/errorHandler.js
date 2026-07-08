/**
 * Error handling middleware.
 * Provides consistent JSON error responses across the API.
 */

import logger from '../utils/logger.js';

// 404 handler — catches unmatched routes
function notFoundHandler(req, res, _next) {
  // Only return JSON 404 for API routes
  if (req.path.startsWith('/api')) {
    return res.status(404).json({
      message: `Route ${req.method} ${req.path} not found.`,
    });
  }

  // For page routes, render a simple 404
  res.status(404).render('layouts/main', {
    title: '404 — Not Found',
    page: 'home',
    contentHtml:
      '<div style="text-align:center;padding:4rem 2rem;"><h1>404</h1><p>The axolotl couldn\'t find that page. 🦎</p><a href="/" style="color:#0F766E;">Go home</a></div>',
  });
}

// Global error handler — must have 4 arguments
function errorHandler(err, req, res, _next) {
  logger.error(err, `[Error] ${err.message}`);

  const statusCode = err.status || err.statusCode || 500;
  const message = err.message || 'Internal server error';

  // Always respond with JSON for API routes
  if (req.path.startsWith('/api')) {
    return res.status(statusCode).json({ message });
  }

  // For page routes, render error page
  res.status(statusCode).render('layouts/main', {
    title: `${statusCode} — Error`,
    page: 'home',
    contentHtml: `<div style="text-align:center;padding:4rem 2rem;"><h1>${statusCode}</h1><p>${message}</p><a href="/" style="color:#0F766E;">Go home</a></div>`,
  });
}

export { notFoundHandler, errorHandler };
