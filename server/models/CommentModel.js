import Comment from './definitions/Comment.js';
import CommentLike from './definitions/CommentLike.js';
import Post from './definitions/Post.js';
import User from './definitions/User.js';
class CommentModel {
    static async createComment(postId, userId, commentContent) {
        console.log('userId in create comment:', userId);
        const comment = await Comment.create({
            userId: userId,
            postId: postId,
            content: commentContent
        })        

        if (!comment)
            throw new Error('Comment not created');

        await Post.increment('commentsCount', {
            by: 1,
            where: { postId },
        });

        await comment.reload({
            include: [
                {
                    model: User,
                    as: 'Author',
                    attributes: ['userId', 'name', 'profilePicture']
                }
            ]
        });


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

        static async getCommentsByPagination(limit, skip, postId, userId) {
            const comments = await Comment.findAll({
                where: {
                    postId: postId
                },
                include:[
                    {
                        model: User,
                        as: 'Author',
                        attributes: ['userId', 'name', 'profilePicture']
                    }
                ],
                
                limit: limit,
                offset: skip,
                order: [['createdAt', 'DESC']]
            });
            console.log('comments:', comments);
            const likedCommentsIds = await CommentLike.findAll({
                where: {
                    commentId: comments.map(comment => comment.commentId),
                    userId: userId
                },
                attributes: ['commentId']
            });
    
            comments.forEach(comment => {
                comment.dataValues.isLiked = likedCommentsIds.some(likedComment => likedComment.commentId === comment.commentId);
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