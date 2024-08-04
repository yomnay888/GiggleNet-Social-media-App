import User from '../models/UserModel.js';
import SessionModel from '../models/sessionModel.js';
import { hashPassword, comparePassword,generateToken } from '../middlewares/authMiddleware.js';
class AuthService {
    
  static async signUp(username, email, password) {
    try {
      const hashedPassword = await hashPassword(password);
           if( await User.getUserByEmail(email)){
            throw new Error('User with this Email already exists');
           }
           if(await User.getUserByUsername(username)) {
            throw new Error('User with this username already exists');
            }
      const newUser = await User.addUser(username, email, hashedPassword);
         return newUser;
    } catch (error){
      throw new Error(`${error.message}`);
    }
  }

  static async logIn(email, password) {
    try {
      const user = await User.getUserByEmail(email);
      if (!user) {
        throw new Error('User with this Email is not found');
      }
      const isMatch = await comparePassword(password, user.password);
      if (!isMatch) {
        throw new Error('Incorrect password');
      }
      const token = generateToken({ userId: user.id, username: user.username });

      const session = await SessionModel.createSession(token, user.id , new Date( Date.now() + 1000*60*60));

      if (session.affectedRows === 0) {
        throw new Error('Error adding session to database');
      }

      return token;

    } catch (error) {
      throw new Error(`Error logging in: ${error.message}`);
    }
  }

  static async logOut(userId, token) {
    try {
      const session = await SessionModel.deleteSession(userId,token);
      if (session.affectedRows === 0) {
        throw new Error('Error logging out');
      }
    } catch (error) {
      throw new Error(`Error logging out: ${error.message}`);
    }

  }

}

export default AuthService;
