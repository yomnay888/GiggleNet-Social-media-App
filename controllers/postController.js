import postService from '../services/postService.js';
class postController{
        static async createPost(req, res) {
            const { title, content} = req.body;
            const userId = req.userData.userId;
            try {
                const newPost = await postService.createPost(title, content,userId);
                res.status(201).json({ message: 'Post created successfully', post: newPost });
            } catch (error) {
                res.status(400).json({ error: error.message });    
        }
    }
        static async updatePost(req,res){
            const {post_id} = req.params;
            const { title, content} = req.body;
            const userId = req.userData.userId;
            try {
                const updatedPost = await postService.updatePost(title, content,post_id,userId);
                res.status(201).json({ message: 'Post updated successfully', post: updatedPost });
            } catch (error) {
                res.status(400).json({ error: error.message });    
        }
        }
        static async deletePost(req,res){
            const {post_id} = req.params;
            const userId = req.userData.userId;
            try{
                await postService.deletePost(post_id,userId);
                res.status(201).json({ message: 'Post deleted successfully'});
            }
            catch(error){
                res.status(400).json({ error: error.message });    
            }
        }
        static async getAllUserPosts(req,res){
            const userId = req.userData.userId;
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
}
export default postController;