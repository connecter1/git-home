import { Router } from 'express';
import users from './users.js';
import postsApi from './posts.js';
import postsView from '../public/javascripts/posts.js'; 
const router = Router();

router.get('/', (req, res) => {
  res.render('index', {
    title: 'Express NODE 2',
    userName: 'Valod',
  });
});

router.use('/posts', postsView);

router.use('/posts', postsApi);

router.use('/users', users);

export default router;