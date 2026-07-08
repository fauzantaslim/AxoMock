import express from 'express';
import path from 'path';
import compression from 'compression';
import pinoHttp from 'pino-http';
import logger from './utils/logger.js';
import corsMiddleware from './middleware/cors.js';
import { rateLimiter } from './middleware/rateLimiter.js';
import { delayMiddleware } from './middleware/delay.js';
import cacheMiddleware from './middleware/cache.js';
import { notFoundHandler, errorHandler } from './middleware/errorHandler.js';
import { fileURLToPath } from 'url';
import { twMerge } from 'tailwind-merge';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// ---------------------
// App settings
// ---------------------
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views'));
app.locals.twMerge = twMerge;

// ---------------------
// Global middleware
// ---------------------
app.use(compression());
// Request logging
app.use(pinoHttp({ logger }));
app.use(corsMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', 'public')));

// Custom powered-by header
app.use((req, res, next) => {
  res.set('X-Powered-By', 'Axomock');
  next();
});

// Rate limiting (API routes only)
app.use('/api', rateLimiter);

// Delay simulation (API routes only)
app.use('/api', delayMiddleware);

// ---------------------
// Page routes
// ---------------------
import homePageRouter from './routes/pages/home.js';
import docsPageRouter from './routes/pages/docs.js';
import mockPageRouter from './routes/pages/mock.js';

app.use('/', homePageRouter);
app.use('/docs', docsPageRouter);
app.use('/mock', mockPageRouter);

// ---------------------
// API routes
// ---------------------
import usersApiRoutes from './routes/api/users.js';
import postsApiRoutes from './routes/api/posts.js';
import commentsApiRoutes from './routes/api/comments.js';
import todosApiRoutes from './routes/api/todos.js';
import authApiRoutes from './routes/api/auth.js';
import httpApiRoutes from './routes/api/http.js';
import mockApiRoutes from './routes/api/mock.js';
import mockProxyRouter from './routes/api/mockProxy.js';

app.use('/api/users', cacheMiddleware, usersApiRoutes);
app.use('/api/posts', cacheMiddleware, postsApiRoutes);
app.use('/api/comments', cacheMiddleware, commentsApiRoutes);
app.use('/api/todos', cacheMiddleware, todosApiRoutes);
app.use('/api/auth', authApiRoutes); // Do NOT cache auth routes
app.use('/api/http', cacheMiddleware, httpApiRoutes);
app.use('/api/mock', mockApiRoutes);
// Mock proxy — must be mounted BEFORE notFoundHandler
app.use('/mock', mockProxyRouter);

// ---------------------
// Error handling
// ---------------------
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
