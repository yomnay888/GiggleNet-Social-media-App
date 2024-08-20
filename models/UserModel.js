import User from './definitions/User.js';
class UserModel {
  static async addUser(username, email, hashedPassword) {
      const user = await User.create({
        username,
        email,
        password: hashedPassword,
      });
      return user;
  }
  
  static async getUserByEmail(email){
     const user = await User.findOne({
       where: {
         email: email
       },
     });  
     return user;
  }
  
  static async getUserByUsername(username){
    const user = await User.findOne({
      where: {
        username: username
      },
    });
    return user;
  }  

}

export default UserModel;
