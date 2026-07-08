import express from 'express';
import * as httpController from '../../controllers/httpController.js';

const router = express.Router();

router.get('/:statusCode', httpController.getStatus);

export default router;
