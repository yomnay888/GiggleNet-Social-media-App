import postService from '../services/postService.js';
class postController{
        static async createPost(req, res) {
            const { content} = req.body;
            const userId = req.userId;
            try {
                const newPost = await postService.createPost(content,userId);
                res.status(201).json({ message: 'Post created successfully', post: newPost });
            } catch (error) {
                res.status(400).json({ error: error.message });    
        }
    }
        static async updatePost(req,res){
            const postId= +req.params.postId;
            const { content} = req.body;
            const userId = req.userId;
            try {
                const updatedPost = await postService.updatePost(content,postId,userId);
                res.status(201).json({ message: 'Post updated successfully', post: updatedPost });
            } catch (error) {
                res.status(400).json({ error: error.message });    
        }
        }
        static async deletePost(req,res){
            const postId = +req.params.postId;
            const userId = req.userId;
            try{
                await postService.deletePost(postId,userId);
                res.status(201).json({ message: 'Post deleted successfully'});
            }
            catch(error){
                res.status(400).json({ error: error.message });    
            }
        }
        static async getAllUserPosts(req,res){
            const userId = req.userId;
            try{
                const posts = await postService.getAllUserPosts(userId);
                res.status(200).json({ posts });
            }
            catch(error){
                res.status(400).json({ error: error.message });
            }
        }
        static async getAllPosts(req,res){
            return res.status(200).json(req.paginatedResult);
        }
       static async getPostsByPagination (request, response){
            const page = +request.query.page  ||1;
            const limit = +request.query.limit  ||10;
            console.log(page,limit);
            try{
                const paginationResults = await postService.getPostsByPagination(page, limit);
                return response.status(200).json(paginationResults);
            }catch(error){
                console.error('Error getting posts:', error);
                return response.status(422).json({ message: error.message });
            }
        }
        static async likePost(req,res){
            const postId= +req.params.postId;
            const userId = req.userId;
            try{
                await postService.likePost(postId,userId);
                res.status(200).json({ message: 'Post liked successfully'});
            }catch(error){
                res.status(400).json({error:error.message});
            }
        }
        static async unlikePost(req,res){
            const postId = +req.params.postId;
            const userId = req.userId;
            try{
                await postService.unlikePost(postId,userId);
                res.status(200).json({ message: 'Post unliked successfully'});
            }catch(error){
                res.status(400).json({error:error.message});
            }
        }
        static async getPostLikes(req,res){
            const postId = +req.params.postId;
            try{
                const likes = await postService.getPostLikes(postId);
                res.status(200).json({ likes });
            }catch(error){
                res.status(400).json({error:error.message});
            }
        }
}
export default postController;