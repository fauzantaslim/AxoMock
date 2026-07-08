import express from 'express';
import ejs from 'ejs';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const viewsDir = path.join(__dirname, '..', '..', '..', 'views');

router.get('/', (req, res) => {
  ejs.renderFile(path.join(viewsDir, 'mock.ejs'), {}, (err, contentHtml) => {
    if (err) return res.status(500).send(err.message);

    res.render('layouts/main', {
      title: 'Mock Builder — Axomock',
      description:
        'Create custom mock API endpoints instantly. Set your own URL path, HTTP method, and JSON response body — no account required.',
      page: 'mock',
      contentHtml,
      scripts: [],
    });
  });
});

export default router;
