import { Router } from "express";
import postController from '../controllers/postController.js';
import { validatePostCreation, validatePostUpdate, validatePostDeletion } from '../middlewares/postValidation.js';
import { paginationValidation } from '../middlewares/paginationValidation.js';  
import { uploadPostMedia } from '../middlewares/mediaUpload.js';
const router = Router();


// get posts with pagination
router.get('/posts', paginationValidation, postController.getPostsByPagination);

// may need to use pagination for user-profile posts in the future
// get posts for current user 
router.get('/user-posts/:userId',postController.getUserPostsByPagination);


// create a new post
router.post('/posts', uploadPostMedia.array('mediaFiles') ,postController.createPost);

// update a post with post id
router.put('/posts/:postId', uploadPostMedia.array('newMediaFiles'), postController.updatePost);

// delete a post with post id
router.delete('/posts/:postId', validatePostDeletion, postController.deletePost);


//////////////////////////////////////////// Likes section


// like a post with post id
router.post('/posts/:postId/like', postController.likePost);

// unlike a post with post id
router.delete('/posts/:postId/like', postController.unlikePost);

// get likes for a post with post id (as count) may need the users when work at the front end
router.get('/posts/:postId/likes', postController.getPostLikes);


export default router;