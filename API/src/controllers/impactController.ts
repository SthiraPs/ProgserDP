import { Request, Response } from 'express';
import Impact from '../models/impact'; 

// Example: Get all users 
const getImpacts = async (req: Request, res: Response) => {
    try {
        const impacts = await Impact.find();
        res.json(impacts);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

export default { getImpacts }; // Add more controller functions  
