import User from "../models/UserModel.js";
class userService{
    static async search(query){
        const results = await User.search(query);
        return results;
    }
}
export default userService;