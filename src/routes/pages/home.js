import express from 'express';
import ejs from 'ejs';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.get('/', (req, res) => {
  // Render the home partial first
  const viewsDir = path.join(__dirname, '..', '..', '..', 'views');

  ejs.renderFile(path.join(viewsDir, 'home.ejs'), {}, (err, contentHtml) => {
    if (err) return res.status(500).send(err.message);

    res.render('layouts/main', {
      title: 'Mock your API in seconds',
      description:
        'Free fake REST API for testing and prototyping. Get realistic mock data for users, posts, comments, and todos instantly.',
      page: 'home',
      contentHtml,
      scripts: [],
    });
  });
});

export default router;
