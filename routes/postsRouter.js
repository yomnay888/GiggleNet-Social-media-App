import express from 'express';
import postController from '../controllers/postController.js';
const router = express.Router();
import { pagination } from '../middlewares/pagination.js';
import PostModel from '../models/PostModel.js';
//creation of a post

router.post('/posts',postController.createPost);

//updating a post

router.patch('/posts/:id',postController.updatePost);

//deleting a post

router.delete('/posts/:id',postController.deletePost);

//getting all posts of a user

router.get('/user-Posts',postController.getAllUserPosts);

//getting all posts

router.get('/posts',pagination(PostModel),postController.getAllPosts);

export default router;