import friendshipService from '../services/friendshipService.js';
class friendShipController {
   
    static async sendFriendRequest(req, res) {
        try{
            const userId = req.userId; 
            const friendId = +req.params.friendId;
            const newFriendshipRequest = await friendshipService.sendFriendRequest(userId, friendId);
            res.status(201).json({ message: 'Friend request sent successfully', friendship: newFriendshipRequest });
        }catch(error){
            res.status(400).json({ error: error.message });
        }
    }
    static async acceptFriendRequest(req, res) {
        try{
            const userId = req.userId; 
            const friendId =+ req.params.friendId;
            const acceptedFriendshipRequest = await friendshipService.acceptFriendRequest(userId, friendId);
            res.status(201).json({ message: 'Friend request accepted successfully', friendship: acceptedFriendshipRequest });
        }catch(error){
            res.status(400).json({ error: error.message });
        }
    }
    static async cancelFriendRequest(req, res) {
        try{
            const userId = req.userId; 
            const friendId = +req.params.friendId;
            const cancelledFriendshipRequest = await friendshipService.cancelFriendRequest(userId, friendId);
            res.status(201).json({ message: 'Friend request cancelled successfully', friendship: cancelledFriendshipRequest });
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
            const unfriended = await friendshipService.unfriend(userId, friendId);
            res.status(201).json({ message: 'Friend removed successfully', friendship: unfriended });
        }catch(error){
            res.status(400).json({ error: error.message });
        }
    }
    static async getFriends(req, res) {
        //get friends
    }
    static async getFriendshipInfo(req, res) {
        try{
            const userId = req.userId;
            const friendId = +req.params.friendId;
            const friendshipInfo = await friendshipService.getFriendshipInfo(userId, friendId);
            res.status(200).json({ friendship: friendshipInfo });
        }catch(error){
            res.status(400).json({ error: error.message });
        }
    }
}
export default friendShipController;