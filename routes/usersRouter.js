import { Router } from "express";
import userController from '../controllers/userController.js';
import { uploadProfilePicture } from '../middlewares/mediaUpload.js';

const router = Router();

// Route to handle profile picture upload
router.post('/upload-profile-picture', uploadProfilePicture.single('profilePicture'), userController.uploadProfilePicture);
router.post('/search', userController.search);

export default router;