import express from 'express';
import ejs from 'ejs';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const viewsDir = path.join(__dirname, '..', '..', '..', 'views');

const renderDocPage = (res, viewName, title, description) => {
  ejs.renderFile(path.join(viewsDir, 'docs', `${viewName}.ejs`), {}, (err, contentHtml) => {
    if (err) return res.status(500).send(err.message);

    res.render('layouts/main', {
      title: `${title} — Axomock`,
      description,
      page: 'docs',
      contentHtml,
      scripts: [], // Removed docs.js
    });
  });
};

router.get('/', (req, res) => {
  renderDocPage(
    res,
    'index',
    'API Documentation',
    'Complete API reference for Axomock. Learn about endpoints, parameters, authentication, and response formats.'
  );
});

router.get('/users', (req, res) => {
  renderDocPage(
    res,
    'users',
    'Users API',
    'Explore the Users API endpoints. Fetch, search, create, and manage mock user data.'
  );
});

router.get('/posts', (req, res) => {
  renderDocPage(
    res,
    'posts',
    'Posts API',
    'Explore the Posts API endpoints. Fetch, search, and manage mock blog posts and tags.'
  );
});

router.get('/comments', (req, res) => {
  renderDocPage(
    res,
    'comments',
    'Comments API',
    'Explore the Comments API endpoints. Fetch and manage mock comments on posts.'
  );
});

router.get('/todos', (req, res) => {
  renderDocPage(
    res,
    'todos',
    'Todos API',
    'Explore the Todos API endpoints. Fetch, filter, and manage mock todo items.'
  );
});

router.get('/auth', (req, res) => {
  renderDocPage(res, 'auth', 'Authentication API', 'Simulate login flows with JWT tokens using the Axomock Auth API.');
});

router.get('/http-status', (req, res) => {
  renderDocPage(
    res,
    'http-status',
    'HTTP Status API',
    'Trigger specific HTTP status codes for testing error handling.'
  );
});

export default router;
