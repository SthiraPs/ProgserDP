import mongoose, { Schema, Document } from 'mongoose';

const impactSchema = new mongoose.Schema({
  impactId: {
    type: Number,
    required: true,
    unique: true,
  },
  impact: {
    type: String,
    required: true,
    unique: true,
  },
});

const Impact = mongoose.model('Impact', impactSchema);
export default Impact;
