import { Request, Response } from 'express';
import SubProduct from '../models/subProduct'; 

// Example: Get all users 
const getSubProducts = async (req: Request, res: Response) => {
    try {
        const subProducts = await SubProduct.find();
        res.json(subProducts);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

export default { getSubProducts }; // Add more controller functions  
