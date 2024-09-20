import Friendship from './definitions/Friendship.js';
import User from './definitions/User.js';
import { FRIENDSHIP_STATUS } from '../constants/friendshipStatus.js';
import { Op} from '../config/sequelize.js';

class FriendshipModel {

    static async sendFriendRequest(smallerId, largerId, initiatorId) {
        const [friendship, created] = await Friendship.findOrCreate({
            where: {
                userId1: smallerId,
                userId2: largerId
            },
            defaults: {
                status: FRIENDSHIP_STATUS.PENDING,
                initiatorId: initiatorId
            }
        });
        
        if (!created) {
            if(friendship.status === FRIENDSHIP_STATUS.PENDING) {
                throw new Error('Friend request already sent');
            }

            if(friendship.status === FRIENDSHIP_STATUS.ACCEPTED) {
                throw new Error('You are already friends');
            }
        }

    }

    static async getFriendship(smallerId, largerId) {

        const friendship = await Friendship.findOne({
            where: {
                userId1: smallerId,
                userId2: largerId
            }
        });

        return friendship;
    }

    static async acceptFriendRequest(friendship) {
        await friendship.update({ status: FRIENDSHIP_STATUS.ACCEPTED });
    }

    static async unfriend(friendship) {
        const affectedRows = await friendship.destroy();
        if(!affectedRows) {
            throw new Error('Unfriend operation failed');
        }
    }

    static async cancelFriendRequest(friendship) {
        const affectedRows = await friendship.destroy();
        
        if(!affectedRows) {
            throw new Error('Unfriend operation failed');
        }
    }

    // static async declineFriendRequest(userId, friendId) {
    //     const [result] = db.execute(
    //         `DELETE FROM friendships WHERE userId = ? AND friendId = ?`,
    //         [friendId, userId]
    //     );
    //     return result;
    // }
    static async getFriends(userId) {
        const friendships = await Friendship.findAll({
            where: {
                status: FRIENDSHIP_STATUS.ACCEPTED,
                [Op.or]: [
                    { userId1: userId },
                    { userId2: userId }
                ]
            }
        });
     const friendIds = friendships.map(friendship => {
            return friendship.userId1 === userId ? friendship.userId2 : friendship.userId1;
        });
    
        const friends = await User.findAll({
            where: {
                userId: {
                    [Op.in]: friendIds
                }
            },
            attributes: ['userId', 'name', 'profilePicture']
        });
        return friends;
    }
    
     

}


// user 1   ---> 
// user 2    OK

export default FriendshipModel;