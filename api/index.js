import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';

dotenv.config();

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Mongo DB is connected!");
}).catch((err) => {
    console.log(err);
})

const app = express();
app.use(express.json());

app.listen(3005, () => {
    console.log('Server is running on port 3005!!');
})

app.use('/api/user',userRouter);
app.use('/api/auth', authRouter);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})