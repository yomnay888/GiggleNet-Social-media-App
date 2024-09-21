import { Router } from "express";
import userController from '../controllers/userController.js';
import { uploadProfilePicture } from '../middlewares/mediaUpload.js';

const router = Router();
router.post('/upload-profile-picture', uploadProfilePicture.single('profilePicture'), userController.uploadProfilePicture);
router.post('/search', userController.search);
router.post('/update-bio', userController.updateBio);
router.get('/users/:userId', userController.getUserById);
export default router;