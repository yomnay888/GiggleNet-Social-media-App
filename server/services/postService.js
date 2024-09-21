import Post from '../models/PostModel.js';
class postService{
    static async createPost(content,userId){
            const rows = await Post.createPost(content,userId);
            if(rows.affectedRows === 0){
                throw new Error('Post not created');
            }
            console.log(rows.postId);
            const newPost = await Post.getPostById(rows.postId);
            return newPost;
    }
    static async updatePost(content,postId,userId){
            const rows = await Post.updatePost(content,postId,userId);
            if(rows.affectedRows === 0){
                throw new Error('Post not updated');
            }
            const updatedPost = await Post.getPostById(postId);
            return updatedPost;
    }
    static async deletePost(postId, userId){
           const rows = await Post.deletePost(postId, userId);
           if(rows.affectedRows === 0){
                throw new Error('Post not deleted or not found');
            }
    }
    static async getUserPostsByPagination(page,limit,userId){
        const skip = (page - 1) * limit; 
        const posts = await Post.getUserPostsByPagination(limit, skip, userId);
        const totalPostsCount = await Post.getTotalPostsCount();
        const paginationResults = {
            posts: posts,
            totalPostsCount: totalPostsCount,
        };
        
        if(skip > 0) {
            paginationResults.previousPage = page - 1
        }
        
        const endIndex = page * limit;
        if (endIndex < totalPostsCount) {
            paginationResults.nextPage = page + 1
        }
            
        return paginationResults;
    }
  static async getPostsByPagination (page, limit) {
        const skip = (page - 1) * limit; // startIndex
        
        const posts = await Post.getPostsByPagination(limit, skip);
        const totalPostsCount = await Post.getTotalPostsCount();
        
        const paginationResults = {
            posts: posts,
            totalPostsCount: totalPostsCount,
        };
        
        if(skip > 0) {
            paginationResults.previousPage = page - 1
        }
        
        const endIndex = page * limit;
        if (endIndex < totalPostsCount) {
            paginationResults.nextPage = page + 1
        }
            
        return paginationResults;
    }
    static async countPosts(){
        const totalPosts = await Post.countPosts();
        return totalPosts;
    }
    static async likePost (postId, userId) {
        const post = await Post.getPostById(postId);

        await Post.likePost(postId, userId);
        console.log(post);
        return await Post.getPostLikes(post);
    }
    static async unlikePost (postId, userId) {
        const post = await Post.getPostById(postId);

        await Post.unlikePost(postId, userId);

        return await Post.getPostLikes(post);
    }
}
export default postService;