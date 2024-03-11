import mongoose from 'mongoose';

export const ProductsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number },
  description: {
    type: { en: { type: String }, ru: { type: String }, pl: { type: String } },
  },
  reviews: [''],
  categories: [''],
});

export interface Products extends mongoose.Document {
  name: string;
  price: number;
  description: { en: string; ru: string; pl: string };
  reviews: string[];
  categories: string[];
}
