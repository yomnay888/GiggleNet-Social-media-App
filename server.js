import express from 'express';
import dotenv from 'dotenv';
import { verifyUser } from './middlewares/authMiddleware.js';
import userRoutes from './routes/usersRouter.js'; 
import postRoutes from './routes/postsRouter.js'; 
import authRoutes from './routes/authRouter.js'; 
import commentsRoutes from './routes/commentsRouter.js';
import likesRouter from './routes/likesRouter.js';
import friendshipRouter from './routes/friendShipRouter.js';
import cookieParser from 'cookie-parser';
dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(authRoutes);

app.use(verifyUser);

app.use(userRoutes);
app.use(postRoutes);
app.use(commentsRoutes);
app.use(likesRouter);
app.use(friendshipRouter);
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
