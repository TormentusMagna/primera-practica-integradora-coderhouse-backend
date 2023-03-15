import { Schema, model } from 'mongoose';

const cartSchema = new Schema({
  products: Array,
});

export const CartModel = model('Cart', cartSchema);
