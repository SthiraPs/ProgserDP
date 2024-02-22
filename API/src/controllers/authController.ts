import User from '../models/user';
import { Request, Response, NextFunction } from 'express';
import { generateJWTToken, verifyJWTToken } from '../utils/generatToken';
import * as dotenv from 'dotenv';

dotenv.config();

const express = require('express');
const cloneDeep = require('lodash/cloneDeep');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); // For password hashing
const JWT_SECRET = process.env.JWT_SECRET || '';

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

    const accessToken = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

    res.json({
      user: user,
      accessToken: accessToken,
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const signInWithToken = async (req: Request, res: Response) => {
  try {
    const accessToken = req.body.accessToken;
    const email = req.body.email;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    res.json({
      user: cloneDeep(user),
      accessToken: accessToken,
    });

  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export default { signIn, signInWithToken }; // Add more controller functions
