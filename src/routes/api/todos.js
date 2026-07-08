import express from 'express';
import * as todoController from '../../controllers/todoController.js';

const router = express.Router();

// Search and random (must come before /:id)
router.get('/search', todoController.searchTodos);
router.get('/random', todoController.getRandom);

// CRUD
router.get('/', todoController.getAll);
router.get('/:id', todoController.getById);
router.post('/', todoController.create);
router.put('/:id', todoController.update);
router.patch('/:id', todoController.patch);
router.delete('/:id', todoController.remove);

export default router;
