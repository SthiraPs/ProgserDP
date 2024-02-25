import { Request, Response } from 'express';
import Requests from '../models/request'; 

// Example: Get all users 
const getRequests = async (req: Request, res: Response) => {
    try {
        const requests = await Requests.find();
        res.json(requests);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

export default { getRequests }; // Add more controller functions  
