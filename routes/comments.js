import { Router } from 'express';
import { getCommentsById, submitComment } from '../controllers/controllers.js';

const router = Router();

router.get('/', getCommentsById);
router.post('/', submitComment);

export default router;
