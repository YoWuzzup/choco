import * as mongoose from 'mongoose';

export const ReviewsSchema = new mongoose.Schema({
  userId: { type: String },
  author: { type: String },
  rating: { type: Number, default: 5 },
  comment: { type: String },
  title: { type: String },
  date: { type: Date, default: Date.now() },
});

export interface Reviews extends mongoose.Document {
  userId: string;
  author: string;
  rating: number;
  comment: string;
  title: string;
  date: Date;
}
