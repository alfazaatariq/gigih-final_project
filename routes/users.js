import { Router } from 'express';
import { getUserById } from '../controllers/controllers.js';

const router = Router();

router.post('/:_id', getUserById);

export default router;
