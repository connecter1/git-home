import { mkdir, access, writeFile, readFile } from 'fs/promises';
import path from 'path';
import { v7 as uuidv7 } from 'uuid';

const dataDir = path.resolve('./data');
const dataFile = path.join(dataDir, 'posts.json');

export async function initializeDataFile() {
  try {
    await mkdir(dataDir, { recursive: true });
    await access(dataFile);
  } catch {
    await writeFile(dataFile, `[
  {
    "id": "019afcea-c9c7-71f9-912f-b792e3124cad",
    "title": "Title",
    "content": "Body post",
    "userId": "019afcb4-4f5b-74eb-b596-0491e4449ca3",
    "createdAt": "2025-12-08T07:43:56.871Z",
    "updatedAt": "2025-12-08T07:43:56.871Z"
  },
  {
    "id": "019afcf2-6eb4-736f-b891-b97e2eda1f7f",
    "title": "Title 2",
    "content": "Body post script",
    "userId": "019afcb4-4f5b-74eb-b596-0491e4449ca3",
    "createdAt": "2025-12-08T07:52:17.844Z",
    "updatedAt": "2025-12-08T07:52:17.844Z"
  }
]`);
  }
}

async function readPosts() {
  await initializeDataFile();
  const data = await readFile(dataFile, 'utf-8');
  return JSON.parse(data);
}

async function writePosts(posts) {
  await writeFile(dataFile, JSON.stringify(posts, null, 2));
}

export async function getAllPosts() {
  const posts = await readPosts();
  return posts;
}

export async function getPostById(postId) {
  const posts = await readPosts();
  return posts.find((p) => p.id === postId);
}

export async function getPostsByUserId(userId) {
  const posts = await readPosts();

  return posts.filter((p) => p.userId === userId);
}

export async function createPost({ title, content, userId }) {
  const posts = await readPosts();
  const newPost = {
    id: uuidv7(),
    title,
    content,
    userId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  posts.push(newPost);
  await writePosts(posts);
  return newPost;
}

export async function updatePost(postId, updates) {
  const posts = await readPosts();
  const index = posts.findIndex((p) => p.id === postId);
  if(index === -1) return null;

  const allowedFields = ['title', 'content'];
  const post = { ...posts[index] };

  for (const field of allowedFields) {
    if (updates[field]  !== undefined) {
      post[field] = updates[field];
    }
  }

  post.updatedAt = new Date().toISOString();
  posts[index] = post;
  await writePosts(posts);
  return post;
}

export async function deletePost(postId) {
  const posts = await readPosts();
  const index = posts.findIndex((p) => p.id === postId);
  if (index === -1) return false;
   posts.splice(index, 1);
  await writePosts(posts);
  return true;

}