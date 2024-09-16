import Comment from './definitions/Comment.js';
import CommentLike from './definitions/CommentLike.js';
import Post from './definitions/Post.js';
class CommentModel {
        static async createComment(postId, userId, content) {
                const comment = await Comment.create({
                        userId: userId,
                        content: content,
                        postId: postId
                    })      
                    if (!comment) {
                        throw new Error('Comment not created');
                    }
                    await Post.increment('commentsCount', {
                        by: 1,
                        where: { postId },
                  } );
                    return comment;
        }
        static async updateComment(commentId, postId, userId, content) {
                const comment = await Comment.update(
                        {
                        content: content
                        },
                        {
                            where: {
                                commentId: commentId,
                                userId: userId,
                                postId: postId
                            }
                    })
                    return comment;
        }

        static async deleteComment(commentId, postId, userId) {
                const result = await Comment.destroy({
                        where: {
                            commentId: commentId,
                            userId: userId,
                            postId: postId
                        }
                    })
                    if (!result) {
                        throw new Error('Comment not deleted or not found');
                    }
                    await Post.decrement('commentsCount', {
                        by: 1,
                        where: { postId },
                  } );
                    return result;
        }

        // static async getAllPostComments(postId){
        //         const [rows] = await pool.query('SELECT * FROM comments WHERE postId = ?',[postId]);
        //         return rows;
        // }
        static async getCommentById(commentId) {
                const comment = await Comment.findByPk(commentId);
                if(!comment){
                    throw new Error('Comment Not Found');
                }
        
                return comment;
        }

        static async getCommentsByPagination(limit, skip, postId) {
            const comments = await Comment.findAll({
                where: {
                    postId: postId
                },
                limit: limit,
                offset: skip,
                raw: true
            });
            return comments;
        }
    
        static async getTotalCommentsCount(postId) {
            const totalCommentsCount = await Comment.count({
                where: {
                    postId: postId
                }
            });
            return totalCommentsCount;
        }

        static async likeComment(commentId, userId) {
                const [like, created] = await CommentLike.findOrCreate({
                    where: {
                        commentId: commentId,
                        userId: userId
                    }
                })
        
                if (!created) 
                    throw new Error('Comment Already Liked');
        
                if (!like) 
                    throw new Error('Comment Not Liked');
                
            }

        static async unlikeComment(commentId, userId) {
                const result = await CommentLike.destroy({
                    where: {
                        commentId: commentId,
                        userId: userId
                    }
                })
                return result;
            }
            static async getCommentLikes(comment) {
                const likes = await comment.countLikers();
                return likes;
            }

        static async findAllPaginated(startIndex, limit, postId) {
                const [rows] = await pool.query('SELECT * FROM comments WHERE postId = ? LIMIT ? OFFSET ?', [postId, limit, startIndex]);
                return rows;
        }
        static async countTotal(postId) {
                const [rows] = await pool.query('SELECT COUNT(*) AS totalComments FROM comments WHERE postId = ?', [postId]);
                return rows[0].totalComments;
        }
}

export default CommentModel;