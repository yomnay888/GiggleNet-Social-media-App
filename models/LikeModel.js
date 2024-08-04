import pool from '../config/database.js';
class LikeModel{
    static async likePost(postId,userId){
        const [rows] = await pool.query('INSERT INTO likes (post_id, user_id) VALUES (?, ?)',[postId, userId]);
        return rows;
    }
    static async unlikePost(postId,userId){
        const [rows] = await pool.query('DELETE FROM likes WHERE post_id = ? AND user_id = ?',[postId, userId]);
        return rows;
    }
    static async getPostLikes(postId){
        const [rows] = await pool.query('SELECT * FROM likes WHERE post_id = ?',[postId]);
        return rows;
    }
    static async checkIfPostLikeExists(postId,userId){
        const [rows] = await pool.query('SELECT * FROM likes WHERE post_id = ? AND user_id = ?',[postId, userId]);
        return rows;
    }
    static async likeComment(commentId,userId){
        const [rows] = await pool.query('INSERT INTO likes (comment_id, user_id) VALUES (?, ?)',[commentId, userId]);
        return rows;
    }
    static async unlikeComment(commentId,userId){
        const [rows] = await pool.query('DELETE FROM likes WHERE comment_id = ? AND user_id = ?',[commentId, userId]);
        return rows;
    }
    static async getCommentLikes(commentId){
        const [rows] = await pool.query('SELECT * FROM likes WHERE comment_id = ?',[commentId]);
        return rows;
    }
    static async checkIfCommentLikeExists(commentId,userId){
        const [rows] = await pool.query('SELECT * FROM likes WHERE comment_id = ? AND user_id = ?',[commentId, userId]);
        return rows;
    }
}
export default LikeModel;