import express from 'express';
import { serveMock } from '../../controllers/mockController.js';

const router = express.Router();

// ALL /mock/:sessionId/* — Serve any configured mock response
// The wildcard captures nested paths like "users/1/posts"
router.all('/:sessionId/*', serveMock);

export default router;
