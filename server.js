import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/users.js'; 
import postRoutes from './routes/posts.js'; 
import authRoutes from './routes/auth.js'; 
import cookieParser from 'cookie-parser';
dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(userRoutes);
app.use(postRoutes);
app.use(authRoutes);
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
