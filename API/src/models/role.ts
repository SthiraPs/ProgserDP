import mongoose, { Schema, Document } from "mongoose";

export interface IRole extends Document {
  role: string;
  description: string;
}

const roleSchema: Schema = new mongoose.Schema({
  role: {
    type: String,
    required: true,
    unique: true,

  },
  description: {
    type: String,
    required: false,
    unique: false,
  }
});

const Role = mongoose.model<IRole>("Role", roleSchema);
export default Role;
