import Friendship from "../models/FriendshipModel.js";
import {FRIENDSHIP_STATUS} from "../constants/friendshipStatus.js";
class friendshipService {
  static async sendFriendRequest(userId, friendId) {
    if(userId === friendId) 
      throw new Error('Cannot send friend request to yourself');
  // initiatorId is the one who sent the friend request (current userId)        
  const initiatorId = userId;
  // always store the smaller id first as userId1
  const smallerId = Math.min(userId, friendId);
  const largerId = Math.max(userId, friendId);

  const friendship=await Friendship.sendFriendRequest(smallerId, largerId, initiatorId);
  const friendshipInfo = {
    status: friendship.status,
    initiatorId: friendship.initiatorId
  }
return friendshipInfo;
  }

    static async acceptFriendRequest(userId, friendId) {
      const smallerId = Math.min(userId, friendId);
        const largerId = Math.max(userId, friendId);
        const friendship = await Friendship.getFriendship(smallerId, largerId);
        if(!friendship || friendship.status !== FRIENDSHIP_STATUS.PENDING) 
            throw new Error('No friend request to accept');
        if(userId === friendship.initiatorId) {
            throw new Error('Invalid Action. Cannot accept your own friend request');
        }
       await Friendship.acceptFriendRequest(friendship);
       const friendshipInfo = {
        status: FRIENDSHIP_STATUS.ACCEPTED,
        initiatorId: friendship.initiatorId
       };
    return friendshipInfo;
    }

  static async cancelFriendRequest(userId, friendId) {
    const smallerId = Math.min(userId, friendId);
    const largerId = Math.max(userId, friendId);

    const friendship = await Friendship.getFriendship(smallerId, largerId);
    if(!friendship || friendship.status !== FRIENDSHIP_STATUS.PENDING) 
        throw new Error('No friend request to cancel');

    await Friendship.cancelFriendRequest(friendship);
    return {};
  }

    static async unfriend(userId, friendId) {
        const smallerId = Math.min(userId, friendId);
        const largerId = Math.max(userId, friendId);
        const friendship = await Friendship.getFriendship(smallerId, largerId);
        if(!friendship || friendship.status !== FRIENDSHIP_STATUS.ACCEPTED) 
            throw new Error('Invalid unfriend operation');

        await Friendship.unfriend(friendship);
        return {};
    }
    static async getFriendsByPagination(page,limit,userId){
      const skip = (page - 1) * limit;
      const paginationResults = await Friendship.getFriendsByPagination(limit,skip,userId);
    return paginationResults;  
    }

    static async getFriendshipInfo(userId, friendId) {
      const smallerId = Math.min(userId, friendId);
      const largerId = Math.max(userId, friendId);
      const friendship =  await Friendship.getFriendship(smallerId, largerId);
      if (!friendship) {
          return {};
      }
      const friendshipInfo = {
          status: friendship.status,
          initiatorId: friendship.initiatorId,
      };
      if (!friendship) {
          throw new Error('No friendship found');
      }
      return friendshipInfo;
 
    }
}
export default friendshipService;
