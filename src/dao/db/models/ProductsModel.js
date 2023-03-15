import { Schema, model } from 'mongoose';

const productSchema = new Schema({
  title: String,
  description: String,
  code: String,
  price: Number,
  status: Boolean,
  stock: Number,
  category: String,
  thumbnails: Array,
});

export const ProductModel = model('Product', productSchema);
