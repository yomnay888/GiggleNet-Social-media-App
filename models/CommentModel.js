import pool from '../config/database.js';
class Comment{
        static async createComment(post_id,userId ,content){
                const [rows] = await pool.query('INSERT INTO comments (post_id,user_id ,content) VALUES (?, ?, ?)',[post_id,userId ,content]);
                return rows;
        }
        static async updateComment(comment_id,post_id,userId ,content){
                const [rows] = await pool.query('UPDATE comments SET content = ? WHERE comment_id = ? AND post_id = ? AND user_id = ?',[content, comment_id, post_id,userId]);
                return rows;
        }

        static async deleteComment(comment_id,post_id, userId){
                const [rows] = await pool.query('DELETE FROM comments WHERE comment_id = ? AND post_id = ? AND user_id = ?',[comment_id,  post_id , userId]);
                return rows;
        }

        static async getAllPostComments(post_id){
                const [rows] = await pool.query('SELECT * FROM comments WHERE post_id = ?',[post_id]);
                return rows;
        }
        static async getCommentById(comment_id){
                const [rows] = await pool.query('SELECT * FROM comments WHERE comment_id = ?',[comment_id]);
                return rows[0];
        }

}

export default Comment;