import mongoose, { ObjectId } from 'mongoose';

export const SubscriptionsSchema = new mongoose.Schema({
  email: { type: String },
  userId: { type: mongoose.Types.ObjectId || String },
  news: Boolean,
  date: { type: Date, default: Date.now },
});

export interface Subscriptions extends mongoose.Document {
  email: string;
  userId: ObjectId | string;
  news: boolean;
  date: Date;
}
