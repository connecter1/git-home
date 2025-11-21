import { Router } from 'express';

import controller from '../controllers/posts.js'

const router = Router();

router.get('/', controller.postList)

export default router;
