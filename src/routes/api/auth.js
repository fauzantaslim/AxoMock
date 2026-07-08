import express from 'express';
import * as authController from '../../controllers/authController.js';
import { verifyToken } from '../../middleware/auth.js';

const router = express.Router();

router.post('/login', authController.login);
router.get('/me', verifyToken, authController.getMe);
router.post('/refresh', authController.refresh);

export default router;
