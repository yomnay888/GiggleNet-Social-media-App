import express from 'express';
import postController from '../controllers/postController.js';
const router = express.Router();
import { paginationValidation } from '../middlewares/paginationValidation.js';
import PostModel from '../models/PostModel.js';
//creation of a post

router.post('/posts',postController.createPost);

//updating a post

router.patch('/posts/:postId',postController.updatePost);

//deleting a post

router.delete('/posts/:postId',postController.deletePost);

//getting all posts of a user
//may need to use pagination
router.get('/user-Posts',postController.getlUserPostsByPagination);

//getting posts by pagination
router.get('/posts', paginationValidation, postController.getPostsByPagination);

// like a post with post id
router.post('/posts/:postId/like', postController.likePost);

// unlike a post with post id
router.delete('/posts/:postId/like', postController.unlikePost);

export default router;