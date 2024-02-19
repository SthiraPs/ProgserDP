import { Request, Response, NextFunction } from "express";

const jwt = require("jsonwebtoken");

module.exports = (req:Request, res:Response, next:NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, 'JWT_SECRET');
    req.user = decoded; // Attach user data to the request object
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};
