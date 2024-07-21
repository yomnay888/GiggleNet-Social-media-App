import express from 'express';
import commentController from '../controllers/commentController.js';
import { verifyUser } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.post('/createComment', verifyUser,commentController.createComment);

router.patch('/updateComment',verifyUser, commentController.updateComment);

router.delete('/deleteComment', verifyUser,commentController.deleteComment);

router.get('/getAllPostComments',verifyUser, commentController.getAllPostComments);

export default router;