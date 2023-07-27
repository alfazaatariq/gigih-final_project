import { Router } from 'express';
import { getProductsById } from '../controllers/controllers.js';

const router = Router();

router.get('/', getProductsById);

export default router;
