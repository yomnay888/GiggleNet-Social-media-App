import pool from '../config/database.js';
class SessionModel{
    static async getSessionByTokenAndUserId(token, userId) {
        const [rows] = await pool.query('SELECT * FROM sessions WHERE token = ? AND user_id = ?', [token, userId]);
        return rows[0];
    }
    static async createSession(token, userId , expiredAt) {
       const [rows] = await pool.query('INSERT INTO sessions (token, user_id, expired_at) VALUES (?, ?, ?)', [token, userId, expiredAt]);
         return rows;
    }
    static async deleteSession(userId,token){
        const [rows] = await pool.query(`DELETE FROM sessions WHERE user_id = ? AND token = ?`, [userId, token]);
        return rows;
    }
    
}
export default SessionModel;