import express from 'express';
import * as commentController from '../../controllers/commentController.js';

const router = express.Router();

// Search
router.get('/search', commentController.searchComments);

// CRUD
router.get('/', commentController.getAll);
router.get('/:id', commentController.getById);
router.post('/', commentController.create);
router.put('/:id', commentController.update);
router.patch('/:id', commentController.patch);
router.delete('/:id', commentController.remove);

export default router;
