import express from 'express';
import postController from '../controllers/postController.js';
import { verifyUser } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.post('/createPost', verifyUser,postController.createPost);

router.post('/updatePost',verifyUser, postController.updatePost);

router.post('/deletePost', verifyUser,postController.deletePost);

router.post('/getAllPosts',verifyUser, postController.getAllPosts);

export default router;