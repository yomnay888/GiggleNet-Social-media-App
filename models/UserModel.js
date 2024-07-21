import pool from '../config/database.js'; // Adjust the import path as necessary

class User {
  static async addUser(username, email, hashedPassword) {
    try {
      const [rows] = await pool.query(
        'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
        [username, email, hashedPassword]
      );
         return rows;
    } catch (error) {
      throw new Error(`Error adding user: ${error.message}`);
    }
  }
  
  static async getUserByEmail(email){
    const [users] = await pool.query('select * from users where email = ?',[email]);
    return users[0];
  }
  
  static async getUserByUsername(username){
    const [users] = await pool.query('select * from users where username = ?',[username]);
    return users[0];
  }  

}

export default User;
