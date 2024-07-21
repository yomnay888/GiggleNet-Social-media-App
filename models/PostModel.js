import pool from '../config/database.js';
class Post{
    static async createPost(title, content,userId){
            const [rows] = await pool.query('INSERT INTO posts (title, content, user_id) VALUES (?, ?, ?)',[title, content, userId]);
            return rows;
    }

    static async updatePost(title, content,post_id, userId){
            const [rows] = await pool.query('UPDATE posts SET title =  ?, content = ?  WHERE post_id = ? AND user_id = ?',[title, content, post_id, userId]);
            return rows;
    }

    static async deletePost(post_id, userId){
            const [rows] = await pool.query('DELETE FROM posts WHERE post_id = ? AND user_id = ?',[post_id, userId]);
          return rows;
    }
    static async getAllUserPosts(userId) {
            const [rows] = await pool.query('SELECT * FROM posts WHERE user_id = ? ORDER BY created_at DESC', [userId]);
            return rows;
    }
    static async getPostById(post_id){
            const [rows] = await pool.query('SELECT * FROM posts WHERE post_id = ?',[post_id]);
            return rows[0];
    }
}
export default Post;