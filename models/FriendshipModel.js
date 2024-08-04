import pool from '../config/database.js';
import friendshipStatus from '../constants/friendshipStatus.js';
class Friendship {
    static async sendFriendRequest(userId, friendId) {
        const [rows] = await pool.query('INSERT INTO friendships (user_id, friend_id) VALUES (?, ?)', [userId, friendId]);
        return rows;
    }
    static async acceptFriendRequest(userId, friendId) {
        const [rows] = await pool.query('UPDATE friendships SET status = ? WHERE user_id = ? AND friend_id = ?', [friendshipStatus.ACCEPTED, friendId,userId]); //reversed as the user who sent the request is the friend now
        return rows;
    } 
    static async cancelFriendRequest(userId, friendId) {
        const [rows] = await pool.query('DELETE FROM friendships WHERE user_id = ? AND friend_id = ?', [userId, friendId]);
        return rows;
    }
    static async declineFriendRequest(userId, friendId) {
        const [rows] = await pool.query('DELETE FROM friendships WHERE user_id = ? AND friend_id = ?', [friendId, userId]);
        return rows;
    }
    static async unfriend(userId, friendId) {
        const [rows] = await pool.query('DELETE FROM friendships WHERE (user_id = ? AND friend_id = ?) OR (user_id = ? AND friend_id = ?)', [userId, friendId, friendId, userId]);
        return rows;
    }
    static async getFriends(userId) {
        const [rows] = await pool.query('SELECT * FROM friendships WHERE (user_id = ? OR friend_id = ?) AND status = ?', [userId, userId, friendshipStatus.ACCEPTED]);
        return rows;
    }
    static async getFriendshipInfo(userId, friendId) {
        const [rows] = await pool.query('SELECT * FROM friendships WHERE (user_id = ? AND friend_id = ?) OR (user_id = ? AND friend_id = ?)', [userId, friendId, friendId, userId]);
        return rows[0];
    }
}
export default Friendship;