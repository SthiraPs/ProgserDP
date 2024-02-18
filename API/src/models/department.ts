import mongoose, { Schema, Document } from "mongoose";

export interface IDepartment extends Document {
  department: string;
  description: string;
}

const departmentSchema: Schema = new mongoose.Schema({
    department: {
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

const Department = mongoose.model<IDepartment>("User", departmentSchema);
export default Department;
