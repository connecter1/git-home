import { Router } from 'express';
import * as postsModel from '../../models/posts.js';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const posts = await postsModel.getAllPosts({});
    res.render('posts', { posts });
  } catch (err) {
    next(err);
  }
});

export default router;