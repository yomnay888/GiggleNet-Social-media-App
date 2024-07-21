import express from 'express';
import authController from '../controllers/authController.js';
const router = express.Router();

router.post('/signUp', authController.signUp);

router.post('/logIn', authController.logIn);


export default router;