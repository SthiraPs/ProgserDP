import { Request, Response } from 'express';
import Status from '../models/status'; 

// Example: Get all users 
const getStatus = async (req: Request, res: Response) => {
    try {
        const status = await Status.find();
        res.json(status);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

export default { getStatus }; // Add more controller functions  
