import mongoose, { Schema, Document } from 'mongoose';

const subProductSchema = new mongoose.Schema({
  subProductId: {
    type: Number,
    required: true,
    unique: true,
  },
  subProduct: {
    type: String,
    required: true,
    unique: true,
  },
});

const SubProduct = mongoose.model('SubProduct', subProductSchema);
export default SubProduct;
