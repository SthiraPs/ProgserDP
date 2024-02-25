import { Request, Response } from 'express';
import Department from '../models/department'; 

// Example: Get all users 
const getDepartments = async (req: Request, res: Response) => {
    try {
        const departments = await Department.find();
        res.json(departments);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

export default { getDepartments }; // Add more controller functions  
