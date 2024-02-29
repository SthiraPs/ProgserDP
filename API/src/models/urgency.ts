import mongoose, { Schema, Document } from 'mongoose';

const urgencySchema = new mongoose.Schema({
  urgencyId: {
    type: Number,
    required: true,
    unique: true,
  },
  urgency: {
    type: String,
    required: true,
    unique: true,
  },
});

const Urgency = mongoose.model('Urgency', urgencySchema);
export default Urgency;
