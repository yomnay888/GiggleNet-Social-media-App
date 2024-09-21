import PostLike from "./definitions/PostLike.js";
import Post from "./definitions/Post.js";
import User from "./definitions/User.js";
import sequelize from 'sequelize';
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
        static async getUserPostsByPagination(limit, skip, userId) {
            console.log('inside model ',userId);
            try {
                const posts = await Post.findAll({
                    include: [
                        {
                            model: User, 
                            attributes: ['name', 'profilePicture'], 
                            where: {
                                userId: userId 
                            }
                        }
                    ],
                    limit: limit, 
                    offset: skip,  // Apply offset for pagination
                    order: [['createdAt', 'DESC']] // Order by creation date, descending
                });
        
                return posts; // Return the fetched posts
            } catch (error) {
                console.error('Error fetching user posts:', error);
                throw error; // Handle or re-throw the error
            }
        }
        
        
        static async getPostById(postId) {
                console.log(postId);
                const post = await Post.findOne({where: {postId: postId}});
                return post;
        }

       // Get paginated posts, no need to count likers dynamically anymore
       static async getPostsByPagination(limit, skip) {
        const posts = await Post.findAll({
            include: [
                // Include the user who created the post
                {
                    model: User,
                    attributes: ['name','profilePicture'] // Fetch all attributes from the User model
                }
            ],
            limit,
            offset: skip,
            order: [['createdAt', 'DESC']] // Sort by most recent posts
        });
        return posts;
    }
                        // Count the likers
            static async getTotalPostsCount() {
                const totalPostsCount = await Post.count();
                return totalPostsCount;
            }
            static async likePost(postId, userId) {
                // Use findOrCreate to like the post
                const [like, created] = await PostLike.findOrCreate({
                    where: { postId, userId }
                });
            
                // If the like already exists, throw an error
                if (!created) {
                    throw new Error('Post Already Liked');
                }
            
                // Increment the likersCount in the Post table
                await Post.increment('likersCount', { by: 1, where: { postId } });
            }
            
            static async unlikePost(postId, userId) {
                // Find and destroy the like
                const result = await PostLike.destroy({
                    where: { postId, userId }
                });
            
                if (!result) {
                    throw new Error('Post Not Unliked');
                }
            
                // Decrement the likersCount in the Post table
                await Post.decrement('likersCount', { by: 1, where: { postId } });
            }
            
            static async getPostLikes(post) {
                // Return the likersCount directly from the post instance
                return post.likersCount;
            }
}
export default PostModel;
