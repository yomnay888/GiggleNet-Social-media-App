import PostLike from "./definitions/PostLike.js";
import Post from "./definitions/Post.js";
import User from "./definitions/User.js";
import sequelize from 'sequelize';
class PostModel {
    static async createPost(postContent, mediaFiles, userId) {
        const post = await Post.create({
            content: postContent,
            userId: userId,
            mediaFiles: mediaFiles.length === 0 ? null : mediaFiles
        });

        if (!post) {
            throw new Error('Post not created');
        }

        const user = await post.getUser({
            attributes: ['name', 'userId', 'profilePicture']
        });

        post.dataValues.user = user;


        return post;
    }
    static async updatePost(postContent, postId, mediaFiles, userId) {
        const result = await Post.update({
            content: postContent,
            mediaFiles: mediaFiles.length === 0 ? null : mediaFiles
        }, {
            where: {
                postId: postId,
                userId: userId
            },
        });

        if (!result) {
            throw new Error('Post not updated, invalid credentials');
        }
        
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
            const post = await Post.findByPk(postId,{
                include: [
                    {
                        model: User,
                        attributes: ['name', 'userId', 'profilePicture']
                    }
                ]
            });
            if (!post) {
                throw new Error('Post Not Found');
            }
    
    
            return post;
        }
        static async getPostsByPagination(userId, limit, skip) {

            const posts = await Post.findAll({
                include: [  
                    {
                        model: User,
                        attributes: ['name', 'userId']
                    },
                ],
                limit,
                offset: skip,
                order: [['createdAt', 'DESC']],
            });
    
            // get the Ids of the liked posts by the user from this small set of posts
            const likedPostsIds = await PostLike.findAll({
                where: {
                    postId: posts.map(post => post.postId),
                    userId: userId
                },
                attributes: ['postId']
            }); 
    
            // Add the isLiked field to each post
            posts.forEach(post => {
                post.dataValues.isLiked = likedPostsIds.some(likedPost => likedPost.postId === post.postId);
            });        
    
            return posts;
        }
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
