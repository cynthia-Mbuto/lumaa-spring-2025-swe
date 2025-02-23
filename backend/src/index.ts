import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectToDB } from './config/db';
import authRoutes from './routes/authRoutes';
import taskRoutes from './routes/taskRoutes';

dotenv.config();  

const app = express();
app.use(express.json());
app.use(cors());

connectToDB();

app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

const port = process.env.PORT || 5002;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
