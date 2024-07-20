import Post from '../models/post.js';
class postService{
    static async createPost(title, content,userId){
        try{
            const newPost = Post.createPost(title, content,userId);
            return newPost;
        }catch(error){
            throw new Error(`${error.message}`);
        }
    }
    static async updatePost(){
        
    }
    static async deletePost(){
        
    }
    static async getAllPosts(){
        
    }
}
export default postService;