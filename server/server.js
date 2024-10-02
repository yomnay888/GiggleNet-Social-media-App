import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import {sequelize} from './config/sequelize.js';
import { verifyUser } from './middlewares/authMiddleware.js';
import userRoutes from './routes/usersRouter.js'; 
import postRoutes from './routes/postsRouter.js'; 
import authRoutes from './routes/authRouter.js'; 
import commentsRoutes from './routes/commentsRouter.js';
import friendshipRouter from './routes/friendshipRouter.js';
import cookieParser from 'cookie-parser';
import User  from './models/definitions/User.js';
import  Post  from './models/definitions/Post.js';
import  Comment  from './models/definitions/Comment.js';
import  Friendship  from './models/definitions/Friendship.js';
import  CommentLike  from './models/definitions/CommentLike.js';
import  PostLike  from './models/definitions/PostLike.js';
import Session from './models/definitions/Session.js';
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static('uploads')); // serve the uploads folder
app.use(authRoutes);
app.use(verifyUser);
app.use(userRoutes);
app.use(postRoutes);
app.use(commentsRoutes);
app.use(friendshipRouter);


Object.values(sequelize.models).forEach((model) => {
    if (model.associate) {
      model.associate(sequelize.models); // Pass the models object to each associate method
    }
});
const PORT = process.env.PORT || 3000;
sequelize.sync({alter:true}).then(() => {
    console.log('Database synced');    
    app.listen(PORT, () => { console.log(`app running on port ${PORT}`) });
    
}).catch((err) => {
    console.log('Error syncing database', err);
});

