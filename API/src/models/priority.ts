import mongoose, { Schema, Document } from 'mongoose';

const prioritySchema = new mongoose.Schema({
  priorityId: {
    type: Number,
    required: true,
    unique: true,
  },
  priority: {
    type: String,
    required: true,
    unique: true,
  },
});

const Priority = mongoose.model('Priority', prioritySchema);
export default Priority;
