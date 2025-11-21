import { Router } from 'express';

import users from "./users.js";
import posts from "./posts.js";

const router = Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  // if(true){
  //   next(new Error('Not Found uuuuuuuuu'));
  //   return;
  // }

  res.render('index', {
    title: 'Express NODE 2',
    userName: 'Valod',
  });
});

router.use('/users', users);
router.use('/posts', posts);

export default router;
