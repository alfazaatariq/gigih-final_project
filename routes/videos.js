import { Router } from 'express';
import { getAllVideos } from '../controllers/controllers.js';

const router = Router();

router.get('/', getAllVideos);

export default router;
