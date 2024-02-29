import { Request, Response } from 'express';
import Urgency from '../models/urgency'; 

// Example: Get all users 
const getUrgencies = async (req: Request, res: Response) => {
    try {
        const urgencies = await Urgency.find();
        res.json(urgencies);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

export default { getUrgencies }; // Add more controller functions  
