import Comment from '../models/CommentModel.js';
class commentService{
    static async createComment(post_id,userId ,content){
        const rows = await Comment.createComment(post_id,userId ,content);
        if(rows.affectedRows === 0){
            throw new Error('Comment not created');
        }
        const newComment = await Comment.getCommentById(rows.insertId);
        return newComment;
    }
    static async updateComment(comment_id,post_id,userId ,content){
        const rows = await Comment.updateComment(comment_id,post_id,userId ,content);
        if(rows.affectedRows === 0){
            throw new Error('Comment not updated');
        }
        const updatedComment = await Comment.getCommentById(comment_id);
        return updatedComment;
    }
    static async deleteComment(comment_id,post_id, userId){
        const rows = await Comment.deleteComment(comment_id,post_id, userId);
        if(rows.affectedRows === 0){
            throw new Error('Comment not deleted or not found');
        }
    }
    // static async getAllPostComments(post_id){
    //     const comments = await Comment.getAllPostComments(post_id);
    //     return comments;
    // }
    static async getCommentById(comment_id){
        const comment = await Comment.getCommentById(comment_id);
        return comment;
    }
}
export default commentService;