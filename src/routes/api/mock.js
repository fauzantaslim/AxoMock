import express from 'express';
import { createMock, listMocks, removeMock } from '../../controllers/mockController.js';

const router = express.Router();

// POST /api/mock — Create a new mock
router.post('/', createMock);

// GET /api/mock/:sessionId — List all mocks for a session
router.get('/:sessionId', listMocks);

// DELETE /api/mock/:sessionId/:mockId — Delete a specific mock
router.delete('/:sessionId/:mockId', removeMock);

export default router;
