import { Router } from 'express';
import { getAllVideos, getVideoById } from '../controllers/controllers.js';

const router = Router();

router.get('/', getAllVideos);
router.get('/:_videoId', getVideoById);

export default router;
