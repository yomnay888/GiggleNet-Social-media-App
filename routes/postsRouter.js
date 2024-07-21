import express from 'express';
import postController from '../controllers/postController.js';
import { verifyUser } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.post('/createPost', verifyUser,postController.createPost);

router.patch('/updatePost',verifyUser, postController.updatePost);

router.delete('/deletePost', verifyUser,postController.deletePost);

router.get('/getAllUserPosts',verifyUser, postController.getAllUserPosts);

export default router;