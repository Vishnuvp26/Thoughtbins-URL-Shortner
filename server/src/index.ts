import express from 'express';
import connectDB from './config/db.config';
import validateEnv from './utils/env';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import corsOption from './config/cors.config';
import { env } from './config/env.config';
import { errorHandler } from './middleware/error.handler';
import userRoute from './routes/user.router';

connectDB();
validateEnv();

const app = express();

app.use(cookieParser());
app.use(cors(corsOption));
app.use(express.json());

app.use('/api', userRoute);
// app.use('/api', blogRoutes)

app.use(errorHandler);

const PORT = env.PORT;

app.listen(PORT, () => {
    console.log(`Server running in port ${PORT}`);
});