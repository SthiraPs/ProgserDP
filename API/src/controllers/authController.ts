import User from "../models/user";
import { Request, Response, NextFunction } from "express";
import { generateJWTToken, verifyJWTToken } from "../utils/generatToken";

const express = require("express");
const cloneDeep = require("lodash/cloneDeep");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs"); // For password hashing
const JWT_SECRET = "your_strong_secret_key";

const signIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invapi/common/naviid credentials" });
    }

    // Compare password with hash
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Generate JWT
    const token = generateJWTToken(user.email, user.role);

    res.json({
      user: user,
      accessToken: token,
      tokenType: "bearer",
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const signInWithToken = async (req: Request, res: Response) => {
  try {
    const accessToken = req.body.accessToken;
    const email = req.body.email;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    console.log(user);
    console.log(verifyJWTToken(accessToken));

    // Verify the token
    if (verifyJWTToken(accessToken)) {
      res.json({
        user: cloneDeep(user),
        accessToken: generateJWTToken(user.email, user.role),
        tokenType: "bearer",
      });
    }

    // Invalid token
    return [
      401,
      {
        error: "Invalid token",
      },
    ];
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export default { signIn, signInWithToken }; // Add more controller functions
