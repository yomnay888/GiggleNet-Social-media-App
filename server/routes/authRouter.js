import express from 'express';
import authController from '../controllers/authController.js';
import { verifyUser } from '../middlewares/authMiddleware.js';
import { validateSignup , validateLogin } from '../middlewares/authValidation.js';
const router = express.Router();

router.post('/auth/signUp', validateSignup,authController.signUp);

router.post('/auth/logIn', validateLogin,authController.logIn);

router.post('/auth/logOut',verifyUser, authController.logOut);

export default router;