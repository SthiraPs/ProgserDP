import mongoose, { Schema, Document } from 'mongoose';

export interface IUserActivity extends Document {
  userId: number;
  status: string;
  time: string;
}

const userActivitySchema: Schema = new mongoose.Schema({
  userId: {
    type: Number,
    required: true,
    unique: false,
  },
  status: {
    type: String,
    required: true,
    unique: false,
  },
  time: {
    type: String,
    required: true,
    unique: false,
  }
});

const UserActivity = mongoose.model<IUserActivity>('UserActivity', userActivitySchema);
export default UserActivity;
