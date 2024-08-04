import express from 'express';
import commentController from '../controllers/commentController.js';
import { pagination } from '../middlewares/pagination.js';
import CommentModel from '../models/CommentModel.js';
const router = express.Router();
// Creation of a comment
router.post('/posts/:postId/comments', commentController.createComment);

// Updating a comment
router.patch('/posts/:postId/comments/:commentId', commentController.updateComment);

// Deleting a comment
router.delete('/posts/:postId/comments/:commentId', commentController.deleteComment);

// Getting all comments of a post
router.get('/posts/:postId/comments', pagination(CommentModel),commentController.getAllPostComments);

export default router;
