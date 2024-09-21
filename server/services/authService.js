import User from '../models/UserModel.js';
import SessionModel from '../models/SessionModel.js';
import { hashPassword, comparePassword,generateToken } from '../middlewares/authMiddleware.js';
import Session  from '../models/definitions/Session.js';
class AuthService {
    
  static async signUp(username,name, email, password) {
    try {
      const hashedPassword = await hashPassword(password);
           if( await User.getUserByEmail(email)){
            throw new Error('User with this Email already exists');
           }
           if(await User.getUserByUsername(username)) {
            throw new Error('User with this username already exists');
            }
      const newUser = await User.addUser(username,name, email, hashedPassword);
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
        console.log('Incorrect password');
        throw new Error('Incorrect password');
      }
      const session = await Session.create({
        userId: user.userId,
        expired_at: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7 )
    });
    
    const token = generateToken( {userId:user.userId, sessionId: session.sessionId} );
    
    session.token = token;
    await session.save();

    // end of the part to edit

    // const result = await SessionModel.createSession(user.userId, token);
    if(session === null){
        throw new Error('Failed to create session');
    }
    
    const loginData = {
        token: token,
        user: {
            name: user.name,
            username: user.username,
            email: user.email,
            bio: user.bio,
            profilePicture: user.profilePicture,
            userId: user.userId
        }
    }
    return loginData; 
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
