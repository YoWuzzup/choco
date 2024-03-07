import mongoose from 'mongoose';

export const ProductsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number },
  description: { type: String },
  reviews: [{}],
  categories: [''],
});

export interface Products extends mongoose.Document {
  name: string;
  price: number;
  description: string;
  reviews: object[];
  categories: string[];
}
