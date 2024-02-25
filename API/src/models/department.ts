import mongoose, { Schema, Document } from "mongoose";

export interface IDepartment extends Document {
  department: string;
  departmentId: number;
  description: string;
}

const departmentSchema: Schema = new mongoose.Schema({
    department: {
    type: String,
    required: true,
    unique: true,

  },
  departmentId: {
    type: Number,
    required: true,
    unique: true,

  },
  description: {
    type: String,
    required: false,
    unique: false,
  }
});

const Department = mongoose.model<IDepartment>("Department", departmentSchema);
export default Department;
