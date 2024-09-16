import commentService from '../services/commentService.js';
class commentController{

    static async createComment(req,res){
        const postId = +req.params.postId;
       const  {content} = req.body;
       const userId = req.userId;
        try{
            const newComment = await commentService.createComment(postId,userId ,content);
            res.status(201).json({ message: 'comment created successfully', comment: newComment });
        }catch(error){
            res.status(400).json({error:error.message});
        }
    }

    static async updateComment(req,res){
        const postId = +req.params.postId;
        const commentId = +req.params.commentId;
        const {content} = req.body;
        const userId = req.userId;
        try{
            const updatedComment = await commentService.updateComment(commentId,postId,userId ,content);
            res.status(200).json({ message: 'comment updated successfully', comment: updatedComment });
        }catch(error){
            res.status(400).json({error:error.message});
        }
    }

    static async deleteComment(req,res){
        const postId = +req.params.postId;
        const commentId = +req.params.commentId;
        const userId = req.userId;
        try{
            await commentService.deleteComment(commentId,postId,userId);
            res.status(200).json({ message: 'comment deleted successfully'});
        }catch(error){
            res.status(400).json({error:error.message});
        }
    }
    static async getCommentsByPagination (request, response) {
        const page = +request.query.page || 1;
        const limit = +request.query.limit || 10;
        const postId = +request.params.postId;
        try{
            const paginationResults = await commentService.getCommentsByPagination(page, limit, postId);
            return response.status(200).json(paginationResults);
        }catch(error){
            console.error('Error getting posts:', error);
            return response.status(422).json({ message: error.message });
        }    
    }

    static async getAllPostComments(req,res){
        return res.status(200).json(req.paginatedResult);
    }
    static async likeComment(req,res){
        const commentId = +req.params.commentId;
        const userId = req.userId;
        try{
            await commentService.likeComment(commentId,userId);
            res.status(200).json({ message: 'comment liked successfully'});
        }catch(error){
            res.status(400).json({error:error.message});
        }
    }
    static async unlikeComment(req,res){
        const commentId = +req.params.commentId;
        const userId = req.userId;
        try{
            await commentService.unlikeComment(commentId,userId);
            res.status(200).json({ message: 'comment unliked successfully'});
        }catch(error){
            res.status(400).json({error:error.message});
        }
    }
    static async getCommentLikes(req,res){
        const commentId = +req.params.commentId;
        try{
            const likes = await commentService.getCommentLikes(commentId);
            res.status(200).json({ likes });
        }catch(error){
            res.status(400).json({error:error.message});
        }
    }
}
export default commentController;