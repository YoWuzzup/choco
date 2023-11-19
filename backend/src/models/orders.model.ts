import mongoose, { ObjectId } from 'mongoose';

export const OrdersSchema = new mongoose.Schema({
  buyer: { type: mongoose.Types.ObjectId || String },
  products: [
    {
      type: { name: String, price: Number, quantity: Number },
    },
  ],
  date: { type: Date, default: Date.now },
});

export interface Orders extends mongoose.Document {
  buyer: ObjectId | string;
  products: { name: string; price: number; quantity: number }[];
  date: Date;
}
