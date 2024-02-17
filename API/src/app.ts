import express, { Application } from 'express';
import connectDB from './config/db';
import * as dotenv from 'dotenv';
import userRoutes from './routes/users';

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3600; 

// Connect to DB
connectDB();

// Middleware 
app.use(express.json()); // Parse JSON request bodies

// Routes
app.use('/api/users', userRoutes); 

app.listen(port, () => { 
    console.log(`Server running on http://localhost:${port}`);
});
