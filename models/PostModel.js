import PostLike from "./definitions/PostLike.js";
import Post from "./definitions/Post.js";
class PostModel {
        static async createPost(content, userId) {
        const post = await Post.create({
                content,
                userId,
        });
        if (!post) {
                throw new Error('Post not created');
            }
        return post;
        }

        static async updatePost(content, postId, userId) {
                const updatedPost = await Post.update({      
                        content
                 }, {where : {
                        postId:postId, 
                        userId:userId
                }
        });
        if (!updatedPost) {
                throw new Error('Post not updated, invalid credentials');
            }
        return updatedPost;
                }

        static async deletePost(postId, userId) {
                const deletedPost = await Post.destroy({ where: { 
                        postId, userId 
                } 
        });
        if (!deletedPost) {
                throw new Error('Post not deleted or not found');
            }
            return deletedPost;
        }
        static async getAllUserPosts(userId) {
                const posts = await Post.findAll({
                        where: {
                                userId
                        }
                });
                return posts;
        }
        static async getPostById(postId) {
                console.log(postId);
                const post = await Post.findOne({where: {postId: postId}});
                return post;
        }

        static async getPostsByPagination(limit, skip) {
                const posts = await Post.findAll({
                    limit: limit,
                    offset: skip,
                    // order: [['createdAt', 'DESC']],
                    raw: true
                });
        
                return posts;
            }
            static async getTotalPostsCount() {
                const totalPostsCount = await Post.count();
                return totalPostsCount;
            }
        static async likePost(postId, userId) {
                const [like, created] = await PostLike.findOrCreate({
                    where: {
                        postId: postId,
                        userId: userId
                    }
                })
        
                if (!created) 
                    throw new Error('Post Already Liked');
        
                if (!like) 
                    throw new Error('Post Not Liked');
            }
        
            static async unlikePost(postId, userId) {
                const result = await PostLike.destroy({
                    where: {
                        postId: postId,
                        userId: userId
                    }
                });
                
                if (!result) 
                    throw new Error('Post Not Unliked');
            }
            
            static async getPostLikes(post) {
                const likes = await post.countLikers();
                return likes;
            }
        
}
export default PostModel;
