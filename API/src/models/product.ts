import mongoose, { Schema, Document } from 'mongoose';

const productSchema = new mongoose.Schema({
  productId: {
    type: Number,
    required: true,
    unique: true,
  },
  product: {
    type: String,
    required: true,
    unique: true,
  },
});

const Product = mongoose.model('Product', productSchema);
export default Product;
