import './config/instrument.js';
// import './config/instrument.js'
import cors from 'cors'
import 'dotenv/config'
import express from "express";
import connectDB from './config/db.js';
// import * as Sentry from '@sentry/node'
import { clerkWebhooks } from './controllers/webhooks.js';
import companyRoutes from './routes/company_routes.js';
import JobRoutes from './routes/jobRoutes.js';
import userRoutes from './routes/userRoutes.js'
import connectCloudinary from './config/cloudinary.js'
const app = express()
import {clerkMiddleware} from '@clerk/express';
import morgan from 'morgan';


await connectDB();
await connectCloudinary();

app.use(morgan('dev'));
app.use(cors())
app.use(express.json())
app.use(clerkMiddleware());


app.get('/', (req,res) => res.send("API Working"));
// app.get("/debug-sentry", function mainHandler(req, res) {
//   throw new Error("My first Sentry error!");
// });
app.post('/webhooks', clerkWebhooks);

app.use('/api/company', companyRoutes);
app.use('/api/jobs', JobRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000
// Sentry.setupExpressErrorHandler(app);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})