import { Request, Response } from 'express';
import User from '../models/user'; 

// Example: Get all users 
const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

export default { getUsers }; // Add more controller functions  
