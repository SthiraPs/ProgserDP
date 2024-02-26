import User, { IUser } from '../models/user';
import { Request, Response, NextFunction } from 'express';
import { generateJWTToken, verifyJWTToken } from '../utils/generatToken';
import * as dotenv from 'dotenv';
import UserActivity from '../models/user_activity';

dotenv.config();

const express = require('express');
const cloneDeep = require('lodash/cloneDeep');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); // For password hashing
const JWT_SECRET = process.env.JWT_SECRET || '';
const EXP_TIME = process.env.EXP_TIME || '15m';

const signIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const accessToken = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: EXP_TIME });

    if (user.status !== 'Invisible') {
      user.status = 'Online';
      user.lastSeen = new Date().toString();
      await user.save();
    }

    emitSocket(req);
    updateUserActivity(user);

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
    const email = req.body.email;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const newToken = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: EXP_TIME });

    if (user.status !== 'Invisible') {
      user.status = 'Online';
      user.lastSeen = new Date().toString();
      await user.save();
    }

    emitSocket(req);

    res.json({
      user: cloneDeep(user),
      accessToken: newToken,
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const changeUserStatus = async (req: Request, res: Response) => {
  try {
    const email = req.body.email;
    const status = req.body.status;
    
    const user = await User.findOne({ email: email });

    if (user) {
      if (user.status !== 'Invisible') {
        user.status = status;
        user.lastSeen = new Date().toString();
        await user.save();
      }

      emitSocket(req);
      updateUserActivity(user);

      res.json({
        status: 'Success',
        message: 'You are now marked as offline!',
      });
    } else {
      res.status(404).json({
        status: 'Fail',
        message: 'User not found!',
      });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const emitSocket = async (req: Request) => {
  const io = req.app.get('io');
  const onlineUsers = await getOnlineUsers();
  io.emit('online-users', onlineUsers);
};

const getOnlineUsers = async () => {
  return await User.find().sort({ lastSeen: -1 });
};

const updateUserActivity = async (user: IUser) => {
  const newActivity = new UserActivity({
    userId: user.userId,
    status: user.status,
    time: new Date().toString(),
  });

  await newActivity.save();
};

export default { signIn, signInWithToken, changeUserStatus };
