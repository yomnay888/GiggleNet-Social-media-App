import { Router } from "express";
import commentController from '../controllers/commentController.js';
import { paginationValidation } from '../middlewares/paginationValidation.js';  

const router = Router();

// get comments by pagination
router.get('/posts/:postId/comments', paginationValidation, commentController.getCommentsByPagination);


// get all comments for a post (Change Or it)
// router.get('/posts/:postId/comments', commentController.getAllPostComments);


// create a new comment
router.post('/posts/:postId/comments', commentController.createComment);

// update a comment with comment id
router.patch('/posts/:postId/comments/:commentId', commentController.updateComment);

// delete a comment with comment id
router.delete('/posts/:postId/comments/:commentId', commentController.deleteComment);



// like a comment with comment id
router.post('/comments/:commentId/like', commentController.likeComment);

// unlike a comment with comment id
router.delete('/comments/:commentId/like', commentController.unlikeComment);

// get likes for a comment with comment id (as count) may need the users when work at the front end
router.get('/comments/:commentId/likes', commentController.getCommentLikes);

export default router;