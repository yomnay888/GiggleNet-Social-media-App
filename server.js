import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/users.js'; 
import authRoutes from './routes/auth.js'; 
dotenv.config();
const app = express();
app.use(express.json());
app.use(userRoutes);
app.use(authRoutes);
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
