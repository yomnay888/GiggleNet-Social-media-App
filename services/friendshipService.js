import Friendship from "../models/friendshipModel";
import friendshipStatus from "../constants/friendshipStatus";
class friendshipService {
  static async sendFriendRequest(userId, friendId) {
    const friendshipInfo = await Friendship.getFriendshipInfo(userId, friendId);
    if (friendshipInfo) {
        if(friendshipInfo.status === friendshipStatus.ACCEPTED)
            throw new Error("Friendship already exists");
        else if(friendshipInfo.status === friendshipStatus.PENDING)
            throw new Error("Friend request already sent");
    }
    const rows = await Friendship.sendFriendRequest(userId, friendId);
    if (rows.affectedRows === 0) {
      throw new Error("Friend request not sent");
    }
    return rows;
  }

    static async acceptFriendRequest(userId, friendId) {
        const friendshipInfo = await Friendship.getFriendshipInfo(userId, friendId);
        if (!friendshipInfo || friendshipInfo.status !== friendshipStatus.PENDING) {
            throw new Error("No friend request to accept");
        }
        const [rows] = await Friendship.acceptFriendRequest(userId, friendId);
        if (rows.affectedRows === 0) {
            throw new Error("Friend request not accepted");
        }
        return rows;
    }

  static async cancelFriendRequest(userId, friendId) {
    const friendshipInfo = await Friendship.getFriendshipInfo(userId, friendId);
    if (!friendshipInfo || friendshipInfo.status !== friendshipStatus.PENDING) {
      throw new Error("No friend request to cancel");
    }
    const [rows] = await Friendship.cancelFriendRequest(userId, friendId);
    if (rows.affectedRows === 0) {
      throw new Error("Friend request not cancelled");
    }
    return rows;
  }
  //here userid is the user who received the friend request
  static async declineFriendRequest(userId, friendId) {
    const friendshipInfo = await Friendship.getFriendshipInfo(userId, friendId);
    if (!friendshipInfo || friendshipInfo.status !== friendshipStatus.PENDING) {
      throw new Error("No friend request to decline");
    }
    const [rows] = await Friendship.declineFriendRequest(userId, friendId);
    if (rows.affectedRows === 0) {
      throw new Error("Friend request not declined");
    }
    return rows;
  }
    static async unfriend(userId, friendId) {
        const friendshipInfo = await Friendship.getFriendshipInfo(userId, friendId);
        if (!friendshipInfo || friendshipInfo.status !== friendshipStatus.ACCEPTED) {
        throw new Error("No friendship to unfriend");
        }
        const [rows] = await Friendship.unfriend(userId, friendId);
        if (rows.affectedRows === 0) {
        throw new Error("Friendship not removed");
        }
        return rows;
    }
    static async getFriends(userId){
        const friends = await Friendship.getFriends(userId);
        return friends;
    }
    static async getFriendshipInfo(userId, friendId) {
        const friendshipInfo = await Friendship.getFriendshipInfo(userId, friendId);
        if (!friendshipInfo) {
            throw new Error("Friendship does not exist");
        }
        return friendshipInfo;
    }
}
export default friendshipService;
