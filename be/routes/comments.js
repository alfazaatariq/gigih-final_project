import { Router } from 'express';
import { getCommentsById, submitComment } from '../controllers/controllers.js';

const router = Router();

router.get('/:_videoId', getCommentsById);
router.post('/:_videoId', submitComment);

export default router;
