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
        // approach 1 then access again the user table to get the friends
        // await Friendship.findAll({
        //     where: {
        //         [Op.or]: [
        //             { userId1: userId },
        //             { userId2: userId }
        //         ],
        //         status: FRIENDSHIP_STATUS.ACCEPTED
        //     }
        // })

        // friendIds = {
        //     alternate between userId1 and userId2
        // }





        // approach 2
        const user = await User.findByPk(userId, {
            include: [
                {
                    model: User,
                    as: 'Friends',
                    attributes: ['userId', 'username', 'email'],
                    through: {
                        attributes: [],
                        where: {
                            status: FRIENDSHIP_STATUS.ACCEPTED,
                            
                            [Op.or]: [
                                { userId1: userId },
                                { userId2: userId }
                            ]
                        }
                    }
                },
                {
                    model: User,
                    as: 'FriendsOf',
                    attributes: ['userId', 'username', 'email'],
                    through: {
                        attributes: [],
                        where: {
                            status: FRIENDSHIP_STATUS.ACCEPTED,
                            userId2: userId 
                        }
                    },
                },
            ]
        });  

        // approach 3
        // const friends = await sequelize.query(
        //     `SELECT u.userId, u.username
        //      FROM Users u
        //      JOIN Friendships f ON (u.userId = f.userId1 OR u.userId = f.userId2)
        //      WHERE (f.userId1 = :userId OR f.userId2 = :userId)
        //        AND f.status = :status`,
        //     {
        //         replacements: { userId, status: FRIENDSHIP_STATUS.ACCEPTED },
        //         // type: QueryTypes.SELECT
        //     }
        // );


        // console.log(user);

        // returned as a sequelize object to be able to change more in the future
        const friends = user.Friends;
        friends.push(...user.FriendsOf);

        // console.log(friends);
        return friends;
    }
}



// user 1   ---> 
// user 2    OK

export default FriendshipModel;