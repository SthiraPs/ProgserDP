import mongoose, { Schema, Document } from "mongoose";

export interface IRequest extends Document {
  title: string;
  description: string;
  priority: string;
}

const requestsSchema: Schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    unique: true,
  },
  priority: {
    type: String,
    required: true,
    unique: true,
  },
});

const Requests = mongoose.model<IRequest>("Requests", requestsSchema);
export default Requests;
