import Post from '../models/PostModel.js';
class postService{
    static async createPost(postContent,mediaFiles,userId){
            return await Post.createPost(postContent,mediaFiles,userId);
    }
    static async updatePost(postContent,postId,mediaFiles,userId){
            await Post.updatePost(postContent,postId,mediaFiles,userId);
            return await Post.getPostById(postId);
    }
    static async deletePost(postId, userId){
          return await Post.deletePost(postId, userId);
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
  static async getPostsByPagination (userId,page, limit) {
        const skip = (page - 1) * limit; // startIndex
        
        const posts = await Post.getPostsByPagination(userId,limit, skip);
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
        await post.reload();
        return await Post.getPostLikes(post);
    }
    static async unlikePost (postId, userId) {
        const post = await Post.getPostById(postId);
        await Post.unlikePost(postId, userId);
        await post.reload();
        return await Post.getPostLikes(post);
    }
}
export default postService;