import pool from '../config/database.js';
class Post{
    static async createPost(title, content,userId){
        try{
            const [rows] = await pool.query('INSERT INTO posts (title, content, user_id) VALUES (?, ?, ?)',[title, content, userId]);
            return rows;
        }catch(error){
            throw new Error(`${error.message}`);
        }
    }
}
export default Post;