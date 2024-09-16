import User from './definitions/User.js';
import {Op} from '../config/sequelize.js';
class UserModel {
  static async addUser(username,name, email, hashedPassword) {
      const user = await User.create({
       name,
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
  static async search (query) {
    try {
        const results = await User.findAll({
            where: {
                name: {
                    [Op.startsWith]:`${query}` 
                }
            },
            limit: 8
        });
        return results;
    } catch (error) {
        console.error('Error during search:', error);
        throw new Error('Error during search operation');
    }
};

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
