import mongoose, { Schema, Document } from 'mongoose';

const statusSchema = new mongoose.Schema({
  statusId: {
    type: Number,
    required: true,
    unique: true,
  },
  status: {
    type: String,
    required: true,
    unique: true,
  },
});

const Status = mongoose.model('Status', statusSchema);
export default Status;
