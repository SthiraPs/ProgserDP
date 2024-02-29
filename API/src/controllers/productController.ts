import { Request, Response } from 'express';
import Product from '../models/product'; 

// Example: Get all users 
const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

export default { getProducts }; // Add more controller functions  
