import mongoose, { Schema, Document } from 'mongoose';

export interface IRole extends Document {
  role: string;
  roleId: number;
}

const roleSchema: Schema = new mongoose.Schema({
  role: {
    type: String,
    required: true,
    unique: true,
  },
  roleId: {
    type: Number,
    required: true,
    unique: true,
  },
});

const Role = mongoose.model<IRole>('Role', roleSchema);
export default Role;
