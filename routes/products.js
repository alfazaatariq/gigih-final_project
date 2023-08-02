import { Router } from 'express';
import { getProductsById } from '../controllers/controllers.js';

const router = Router();

router.get('/:_videoId', getProductsById);

export default router;
