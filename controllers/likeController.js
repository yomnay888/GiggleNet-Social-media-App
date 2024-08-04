import likeService from '../services/likeService.js';
class likeController{

    static async likePost(req,res){
        const {postId} = req.params;
        const userId = req.userData.userId;
        try{
            await likeService.likePost(postId,userId);
            res.status(201).json({ message: 'Post liked successfully'});
        }catch(error){
            res.status(400).json({error:error.message});
        }
    }

    static async unlikePost(req,res){
        const {postId} = req.params;
        const userId = req.userData.userId;
        try{
            await likeService.unlikePost(postId,userId);
            res.status(200).json({ message: 'Post unliked successfully'});
        }catch(error){
            res.status(400).json({error:error.message});
        }
    }
    static async getPostLikes(req,res){
        const {postId} = req.params;
        try{
            const likes = await likeService.getPostLikes(postId);
            res.status(200).json({ likes: likes });
        }catch(error){
            res.status(400).json({error:error.message});
        }
    }
    static async likeComment(req,res){
        const {commentId} = req.params;
        const userId = req.userData.userId;
        try{
            await likeService.likeComment(commentId,userId);
            res.status(201).json({ message: 'Comment liked successfully'});
        }catch(error){
            res.status(400).json({error:error.message});
        }
    }
    static async unlikeComment(req,res){
        const {commentId} = req.params;
        const userId = req.userData.userId;
        try{
            await likeService.unlikeComment(commentId,userId);
            res.status(200).json({ message: 'Comment unliked successfully'});
        }catch(error){
            res.status(400).json({error:error.message});
        }
    }
    static async getCommentLikes(req,res){
        const {commentId} = req.params;
        try{
            const likes = await likeService.getCommentLikes(commentId);
            res.status(200).json({ likes: likes });
        }catch(error){
            res.status(400).json({error:error.message});
        }
    }
}
export default likeController;