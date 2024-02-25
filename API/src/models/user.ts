import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  userId: number;
  fullName: string;
  email: string;
  password: string;
  department: string;
  role: string;
  status: string;
  lastSeen: string;
  avatar: string;
}

const userSchema: Schema = new mongoose.Schema({
  userId: {
    type: Number,
    required: true,
    unique: true,
  },
  fullName: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: false,
  },
  department: {
    type: String,
    required: true,
    unique: false,
  },
  role: {
    type: String,
    required: true,
    unique: false,
  },
  status: {
    type: String,
    required: true,
    unique: false,
  },
  lastSeen: {
    type: String,
    required: true,
    unique: false,
  },
  avatar: {
    type: String,
    required: false,
    unique: false,
  },
});

const User = mongoose.model<IUser>("User", userSchema);
export default User;
