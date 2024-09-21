import User from "../models/UserModel.js";
class userService{
    static async search(query){
        const results = await User.search(query);
        return results;
    } 
  static async updateProfilePicture(userId, filePath){
       await User.updateProfilePicture(userId, filePath);
  }
  static async updateBio(userId, bio){
       await User.updateBio(userId, bio);
  }
  static async getUserById(userId){
       const user = await User.getUserById(userId);
       return user;
  }
 
}
export default userService;