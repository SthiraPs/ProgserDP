import express, { Request, Response, NextFunction, Application } from 'express';
import connectDB from './config/db';
import * as dotenv from 'dotenv';
import cors from 'cors';
import corsMiddleware from './middleware/cors.middleware';
import catchAllMiddleware from './middleware/catchAll.middleware';

import authRoutes from './routes/auth';
import userRoutes from './routes/users';
import requestsRoutes from './routes/requests';
import rolesRoutes from './routes/roles';
import departmentsRoutes from './routes/departments';
import http from 'http';
import { Server } from 'socket.io';

dotenv.config();

const port = process.env.PORT || 3600;
const origin = process.env.ORIGIN || 'https://progser-dp.vercel.app';

// Your existing app setup...
const app: Application = express();
const server = http.createServer(app);

// Setup Socket.IO to allow CORS
const io = new Server(server, {
  cors: {
    origin: origin, // Allow your Angular application domain
    methods: ['GET', 'POST'],
    allowedHeaders: ['my-custom-header'],
    credentials: true,
  },
});



// Apply CORS middleware for express
app.use(
  cors({
    origin: origin, // Allow your Angular application domain
    credentials: true, // Allowing credentials is important for sessions to work
  })
);

// Connect to DB
connectDB();

// Middleware
app.use(corsMiddleware);
app.use(express.json());

// Socket.IO connection
io.on('connection', (socket) => {});
app.set('io', io);

// Routes
app.use('/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/requests', requestsRoutes);
app.use('/api/roles', rolesRoutes);
app.use('/api/departments', departmentsRoutes);

app.all('*', catchAllMiddleware);

server.listen(port, () => {
  console.log(`Server running on port : ${port}`);
});

