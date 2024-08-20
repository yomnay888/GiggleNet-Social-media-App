import Comment from '../models/CommentModel.js';
class commentService{
    static async createComment(postId,userId,content) {
        const comment = await Comment.createComment(postId,userId,content);
        if (comment === null) {
            throw new Error('comment not created');
        }
        return comment.toJSON();
    }
    static async updateComment(commentId,postId,userId ,content){
        const comment = await Comment.updateComment(commentId,postId,userId ,content);
        if (comment === null) {
            throw new Error('comment not updated, either comment id is invalid or you are not the owner of the comment');
        }
        return comment;
    }
    static async deleteComment(commentId,postId, userId){
        const result = await Comment.deleteComment(commentId,postId, userId);
        console.log('result:', result);
        if (result === 0) {
            throw new Error('comment not deleted, either comment id is invalid or you are not the owner');
    }
}
static async getCommentsByPagination(page, limit, postId) {
    const skip = (page - 1) * limit; // startIndex
    
    const comments = await Comment.getCommentsByPagination(limit, skip, postId);
    const totalCommentsCount = await Comment.getTotalCommentsCount(postId);
    
    const paginationResults = {
        comments: comments,
        totalCommentsCount: totalCommentsCount,
    };
    
    if(skip > 0) {
        paginationResults.previousPage = page - 1
    }
    
    const endIndex = page * limit;
    if (endIndex < totalCommentsCount) {
        paginationResults.nextPage = page + 1
    }
        
    return paginationResults;
}

static async likeComment (commentId, userId) {
    const comment = await Comment.getCommentById(commentId);

    await Comment.likeComment(commentId, userId);

    return await Comment.getCommentLikes(comment);
}

static async unlikeComment (commentId, userId) {
    const comment = await Comment.getCommentById(commentId);

    await Comment.unlikeComment(commentId, userId);

    return await Comment.getCommentLikes(comment);
}

static async getCommentLikes (commentId) {
    const comment = await Comment.getCommentById(commentId);

    return await Comment.getCommentLikes(comment);
}


    // static async getAllPostComments(postId){
    //     const comments = await Comment.getAllPostComments(postId);
    //     return comments;
    // }
    static async getCommentById(commentId){
        const comment = await Comment.getCommentById(commentId);
        return comment;
    }
}
export default commentService;