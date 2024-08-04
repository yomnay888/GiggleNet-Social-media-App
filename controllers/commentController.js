import commentService from '../services/commentService.js';
class commentController{

    static async createComment(req,res){
        const post_id = req.params.postId;
       const  content = req.body;
       const userId = req.userData.userId;
        try{
            const newComment = await commentService.createComment(post_id,userId ,content);
            res.status(201).json({ message: 'comment created successfully', comment: newComment });
        }catch(error){
            res.status(400).json({error:error.message});
        }
    }

    static async updateComment(req,res){
        const post_id = req.params.postId;
        const comment_id = req.params.commentId;
        const content = req.body;
        const userId = req.userData.userId;
        try{
            const updatedComment = await commentService.updateComment(comment_id,post_id,userId ,content);
            res.status(200).json({ message: 'comment updated successfully', comment: updatedComment });
        }catch(error){
            res.status(400).json({error:error.message});
        }
    }

    static async deleteComment(req,res){
        const post_id = req.params.postId;
        const comment_id = req.params.commentId;
        const userId = req.userData.userId;
        try{
            await commentService.deleteComment(comment_id,post_id,userId);
            res.status(200).json({ message: 'comment deleted successfully'});
        }catch(error){
            res.status(400).json({error:error.message});
        }
    }

    static async getAllPostComments(req,res){
        return res.status(200).json(req.paginatedResult);
    }
}
export default commentController;