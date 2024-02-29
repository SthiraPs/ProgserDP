import mongoose, { Schema, Document } from 'mongoose';

export interface IRequest extends Document {
  requestId: number;
  subject: string;
  description: string;
  requesterId: number;
  assignedTo: number;
  createdDate: Date;
  dueDate: Date;
  resolvedDate: Date;
  statusId: number;
  impactId: number;
  urgencyId: number;
  priorityId: number;
  productId: number;
  subProductId: number;
  requestTypeId: number;
  isVip: number;
}

const requestsSchema: Schema = new mongoose.Schema({
  requestId: {
    type: Number,
    required: true,
    unique: true,
  },
  subject: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  requesterId: {
    type: Number,
    required: true,
  },
  assignedTo: {
    type: Number,
  },
  createdDate: {
    type: Date,
    required: true,
  },
  dueDate: {
    type: Date,
  },
  resolvedDate: {
    type: Date,
  },
  statusId: {
    type: Number,
    ref: 'Status',
    required: true,
  },
  impactId: {
    type: Number,
    ref: 'Impact',
    required: true,
  },
  urgencyId: {
    type: Number,
    ref: 'Urgency',
    required: true,
  },
  priorityId: {
    type: Number,
    ref: 'Priority',
    required: true,
  },
  productId: {
    type: Number,
    ref: 'Product',
    required: true,
  },
  subProductId: {
    type: Number,
    ref: 'SubProduct',
  },
  requestTypeId: {
    type: Number,
    required: true,
  },
  isVip: {
    type: Number,
    required: true,
  },
});

const Requests = mongoose.model<IRequest>('Requests', requestsSchema);
export default Requests;
