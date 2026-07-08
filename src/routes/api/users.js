import express from 'express';
import * as userController from '../../controllers/userController.js';

const router = express.Router();

// Search (must come before /:id to avoid matching 'search' as an id)
router.get('/search', userController.searchUsers);

// CRUD
router.get('/', userController.getAll);
router.get('/:id', userController.getById);
router.post('/', userController.create);
router.put('/:id', userController.update);
router.patch('/:id', userController.patch);
router.delete('/:id', userController.remove);

// Nested resources
router.get('/:id/posts', userController.getUserPosts);
router.get('/:id/todos', userController.getUserTodos);

export default router;
