import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { hashPassword, comparePassword } from '../middlewares/authMiddleware.js';

class AuthService {
    
  static async signUp(username, email, password) {
    try {
      const hashedPassword = await hashPassword(password);
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
      return {user};
    } catch (error) {
      throw new Error(`Error signing in: ${error.message}`);
    }
  }

}

export default AuthService;
