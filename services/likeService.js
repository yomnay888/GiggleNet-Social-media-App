import Like from '../models/LikeModel.js';
import Post from '../models/PostModel.js';
import Comment from '../models/CommentModel.js';
class likeService{
    static async likePost(postId,userId){
        const postExist = await Post.getPostById(postId);
        if(!postExist){
            throw new Error('Post not found');
        }
        const ifLikedRows= await Like.checkIfPostLikeExists(postId,userId);
        if(ifLikedRows.length > 0){
            throw new Error('Post already liked');
        }
        const rows = await Like.likePost(postId,userId);
        if(rows.affectedRows === 0){
            throw new Error('Post not liked');
        }
    }
    static async unlikePost(postId,userId){
        const postExist = await Post.getPostById(postId);
        if(!postExist){
            throw new Error('Post not found');
        }
        const ifLikedRows= await Like.checkIfPostLikeExists(postId,userId);
        if(ifLikedRows.length === 0){
            throw new Error('Post already not liked');
        }
        const rows = await Like.unlikePost(postId,userId);
        if(rows.affectedRows === 0){
            throw new Error('Post not unliked');
        }
    }
    static async getPostLikes(postId){
        const likes = await Like.getPostLikes(postId);
        return likes;
    }
    static async likeComment(commentId,userId){
        const commentExist = await Comment.getCommentById(commentId);
        if(!commentExist){
            throw new Error('Comment not found');
        }
        const ifLikedRows= await Like.checkIfCommentLikeExists(commentId,userId);
        if(ifLikedRows.length > 0){
            throw new Error('Comment already liked');
        }
        const rows = await Like.likeComment(commentId,userId);
        if(rows.affectedRows === 0){
            throw new Error('Comment liked');
        }
    }
    static async unlikeComment(commentId,userId){
        const commentExist = await Comment.getCommentById(commentId);
        if(!commentExist){
            throw new Error('Comment not found');
        }
        const ifLikedRows= await Like.checkIfCommentLikeExists(commentId,userId);
        if(ifLikedRows.length === 0){
            throw new Error('Comment already not liked');
        }
        const rows = await Like.unlikeComment(commentId,userId);
        if(rows.affectedRows === 0){
            throw new Error('Comment not unliked');
        }
    }
    static async getCommentLikes(commentId){
        const likes = await Like.getCommentLikes(commentId);
        return likes;
    }
}
export default likeService;