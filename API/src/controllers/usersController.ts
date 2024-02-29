import { Request, Response } from 'express';
import User, { IUser } from '../models/user';
import { generateGravatarUrl } from '../utils/generateGravatar';
import UserActivity from '../models/user_activity';
const bcrypt = require('bcryptjs');

// Get all users
const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().sort({ lastSeen: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Find a user by ID
const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new user
const createUser = async (req: Request, res: Response) => {
  try {
    const newUser = new User(req.body);
    const hashedPassword = await bcrypt.hash(newUser.password, 10); // 10 is the salt rounds
    const lastUser = await User.findOne().sort({ userId: -1 }).limit(1);

    newUser.userId = lastUser ? lastUser.userId + 1 : 1;
    newUser.password = hashedPassword;
    newUser.status = 'Offline';
    newUser.lastSeen = new Date().toString();
    newUser.avatar = (await generateGravatarUrl(newUser.email)).toString();

    const savedUser = await newUser.save();
    res.status(201).json({
      success: true,
      message: 'User created successfully!',
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating user',
      error: error,
    }); // Or a more specific error based on validation
  }
};

// Update a user by ID
const updateUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    emitSocket(req);
    if (user !== null) {
      updateUserActivity(user);
    }
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a user by ID
const deleteUser = async (req: Request, res: Response) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getOnlineUsers = async () => {
  return await User.find().sort({ lastSeen: -1 });
};

export default {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
};

const emitSocket = async (req: Request) => {
  const io = req.app.get('io');
  const onlineUsers = await getOnlineUsers();
  io.emit('online-users', onlineUsers);
};

const updateUserActivity = async (user: IUser) => {
  const newActivity = new UserActivity({
    userId: user.userId,
    status: user.status,
    time: new Date().toString(),
  });

  await newActivity.save();
};
