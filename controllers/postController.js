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
        static async updatePost(){
            const { title, content} = req.body;
            try {
                const updatedPost = await postService.updatePost(title, content);
                res.status(201).json({ message: 'Post updated successfully', post: updatedPost });
            } catch (error) {
                res.status(400).json({ error: error.message });    
        }
        }
        static async deletePost(){
            
        }
        static async getAllPosts(){
            
        }
}
export default postController;