import Post from '../models/PostModel.js';
class postService{
    static async createPost(title, content,userId){
            const rows = await Post.createPost(title, content,userId);
            if(rows.affectedRows === 0){
                throw new Error('Post not created');
            }
            const newPost = await Post.getPostById(rows.insertId);
            return newPost;
    }
    static async updatePost(title, content,post_id,userId){
            const rows = await Post.updatePost(title, content,post_id,userId);
            if(rows.affectedRows === 0){
                throw new Error('Post not updated');
            }
            const updatedPost = await Post.getPostById(post_id);
            return updatedPost;
    }
    static async deletePost(post_id, userId){
           const rows = await Post.deletePost(post_id, userId);
           if(rows.affectedRows === 0){
                throw new Error('Post not deleted or not found');
            }
    }
    static async getAllUserPosts(userId){
        const posts = await Post.getAllUserPosts(userId);
        return posts;
    }
}
export default postService;