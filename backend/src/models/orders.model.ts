import mongoose from 'mongoose';
import { UsersSchema } from './users.model';
import { ProductsSchema } from './products.model';

export const OrdersSchema = new mongoose.Schema({
  buyer: { type: String, rel: UsersSchema },
  product: { type: String, rel: ProductsSchema },
  date: { type: Date },
});

export interface Orders extends mongoose.Document {
  buyer: string;
  product: string;
  date: Date;
}
