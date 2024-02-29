import { Request, Response } from 'express';
import Priority from '../models/priority'; 

// Example: Get all users 
const getPriorities = async (req: Request, res: Response) => {
    try {
        const priorities = await Priority.find();
        res.json(priorities);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

export default { getPriorities }; // Add more controller functions  
