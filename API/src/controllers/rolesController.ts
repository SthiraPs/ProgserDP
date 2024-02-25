import { Request, Response } from 'express';
import Role from '../models/role'; 

// Example: Get all users 
const getRoles = async (req: Request, res: Response) => {
    try {
        const roles = await Role.find();
        res.json(roles);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

export default { getRoles }; // Add more controller functions  
