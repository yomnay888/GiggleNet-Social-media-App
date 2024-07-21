import commentService from '../services/commentService.js';
class commentController{

    static async createComment(req,res){
       const {post_id , content} = req.body;
       const userId = req.userData.userId;
        try{
            const newComment = await commentService.createComment(post_id,userId ,content);
            res.status(201).json({ message: 'comment created successfully', comment: newComment });
        }catch(error){
            res.status(400).json({error:error.message});
        }
    }

    static async updateComment(req,res){
        const {comment_id ,post_id,content} = req.body;
        const userId = req.userData.userId;
        try{
            const updatedComment = await commentService.updateComment(comment_id,post_id,userId ,content);
            res.status(200).json({ message: 'comment updated successfully', comment: updatedComment });
        }catch(error){
            res.status(400).json({error:error.message});
        }
    }

    static async deleteComment(req,res){
        const {comment_id , post_id} = req.body;
        const userId = req.userData.userId;
        try{
            await commentService.deleteComment(comment_id,post_id,userId);
            res.status(200).json({ message: 'comment deleted successfully'});
        }catch(error){
            res.status(400).json({error:error.message});
        }
    }
    static async getAllPostComments(req,res){
        const {post_id} = req.body;
        try{
            const comments = await commentService.getAllPostComments(post_id);
            res.status(200).json({ comments: comments });
        }catch(error){
            res.status(400).json({error:error.message});
        }
    }
}
export default commentController;