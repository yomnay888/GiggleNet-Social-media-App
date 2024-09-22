import friendshipService from '../services/friendshipService.js';
class friendShipController {
   
    static async sendFriendRequest(req, res) {
        try{
            const userId = req.userId; 
            const friendId = +req.params.friendId;
            const friendshipInfo = await friendshipService.sendFriendRequest(userId, friendId);
            res.status(201).json({friendshipInfo});
        }catch(error){
            res.status(400).json({ error: error.message });
        }
    }
    static async acceptFriendRequest(req, res) {
        try{
            const userId = req.userId; 
            const friendId =+ req.params.friendId;
            const friendshipInfo = await friendshipService.acceptFriendRequest(userId, friendId);
            res.status(201).json({ friendshipInfo });
        }catch(error){
            res.status(400).json({ error: error.message });
        }
    }
    static async cancelFriendRequest(req, res) {
        try{
            const userId = req.userId; 
            const friendId = +req.params.friendId;
            const friendshipInfo = await friendshipService.cancelFriendRequest(userId, friendId);
            res.status(201).json({friendshipInfo });
        }catch(error){
            res.status(400).json({ error: error.message });
        }
    }
    static async declineFriendRequest(req, res) {
        try{
            const userId = req.userId; 
            const friendId = +req.params.friendId;
            const declinedFriendshipRequest = await friendshipService.declineFriendRequest(userId, friendId);
            res.status(201).json({ message: 'Friend request declined successfully', friendship: declinedFriendshipRequest });
        }catch(error){
            res.status(400).json({ error: error.message });
        }
    }
    static async unfriend(req, res) {
        try{
            const userId = req.userId; 
            const friendId = +req.params.friendId;
            const friendshipInfo = await friendshipService.unfriend(userId, friendId);
            res.status(201).json({friendshipInfo });
        }catch(error){
            res.status(400).json({ error: error.message });
        }
    }
    static async getUserFriendsByPagination(req,res){
        const userId = +req.params.userId;
        const page = +req.query.page ||1;
        const limit = +req.query.limit||9;
        try{
            const paginationResults = await friendshipService.getFriendsByPagination(page,limit,userId);
            res.status(200).json({ paginationResults });
        }   catch(error){
            res.status(400).json({ error: error.message });
        }
    }
    static async getFriendsByPagination(req, res) {
        const userId = req.userId;
        const page = +req.query.page;
        const limit = +req.query.limit;
        try{
            const paginationResults = await friendshipService.getFriendsByPagination(page,limit,userId);
            res.status(200).json({ paginationResults });
        }   catch(error){
            res.status(400).json({ error: error.message });
        }
    }
    static async getFriendshipInfo(req, res) {
        try{
            const userId = req.userId;
            const friendId = +req.params.friendId;
            const friendshipInfo = await friendshipService.getFriendshipInfo(userId, friendId);
            res.status(200).json(friendshipInfo );
        }catch(error){
            res.status(400).json({ error: error.message });
        }
    }
}
export default friendShipController;