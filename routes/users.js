import { Router } from 'express';

import controller from '../controllers/users.js'

const router = Router();

router.get('/', controller.profile)
router.post('/login', controller.login)

export default router;
