import { Router } from 'express';
import users from './users.js';
import postsApi from './posts.js';
import postsView from '../public/javascripts/posts.js';  // 👈 новый файл

const router = Router();

router.get('/', (req, res) => {
  res.render('index', {
    title: 'Express NODE 2',
    userName: 'Valod',
  });
});

// Страница
router.use('/posts', postsView);

// API (чтобы по /api/posts оставался JSON)
router.use('/posts', postsApi);

router.use('/users', users);

export default router;