import express from 'express';
import * as postController from '../../controllers/postController.js';

const router = express.Router();

// Search and tag filter (must come before /:id)
router.get('/search', postController.searchPosts);
router.get('/tag/:tag', postController.getByTag);

// CRUD
router.get('/', postController.getAll);
router.get('/:id', postController.getById);
router.post('/', postController.create);
router.put('/:id', postController.update);
router.patch('/:id', postController.patch);
router.delete('/:id', postController.remove);

// Nested resources
router.get('/:id/comments', postController.getPostComments);

export default router;
