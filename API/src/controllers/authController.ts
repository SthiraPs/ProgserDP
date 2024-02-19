import User from '../models/user'; 
import { Request, Response, NextFunction } from "express";

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); // For password hashing
const JWT_SECRET = 'your_strong_secret_key';

const signIn = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // Compare password with hash
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // Generate JWT
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

        res.json({ 
            user : user, 
            authToken: token
        });

    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

export default { signIn }; // Add more controller functions  
