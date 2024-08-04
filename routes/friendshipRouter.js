import { Router } from "express";
import friendShipController from "../controllers/friendShipController.js";
const router = Router();

//send friend request
router.post('/friendship/:friendId/request', friendShipController.sendFriendRequest);
//accept friend request
router.patch('/friendship/:friendId/accept', friendShipController.acceptFriendRequest);
//reject friend request
router.delete('/friendship/:friendId/cancel', friendShipController.cancelFriendRequest);
//decline friend request
router.delete('/friendship/:friendId/decline', friendShipController.declineFriendRequest);
//unfriend
router.delete('/friendship/:friendId', friendShipController.unfriend);
//get friends
router.get('/friendship', friendShipController.getFriends);
//get friend request Info
router.get('/friendship/:friendId/Info', friendShipController.getFriendshipInfo);
export default router;