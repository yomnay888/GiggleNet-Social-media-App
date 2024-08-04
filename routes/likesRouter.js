import { Router } from 'express';
import likeController from '../controllers/likeController.js';
const router = Router();


router.post('/posts/:postId/like', likeController.likePost);
router.delete('/posts/:postId/like', likeController.unlikePost);
router.get('/posts/:postId/likes', likeController.getPostLikes);


router.post('/comments/:commentId/like', likeController.likeComment);
router.delete('/comments/:commentId/like', likeController.unlikeComment);
router.get('/comments/:commentId/likes', likeController.getCommentLikes);


export default router;