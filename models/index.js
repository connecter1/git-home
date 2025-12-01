import { initializeDataFile as usersInit } from './users.js';
import { initializeDataFile as postsInit } from './posts.js';

(async () => {
  await usersInit();
  await postsInit();
})();
