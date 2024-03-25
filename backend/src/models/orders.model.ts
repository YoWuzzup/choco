import mongoose, { ObjectId } from 'mongoose';

export const OrdersSchema = new mongoose.Schema({
  items: [{ type: mongoose.Schema.Types.ObjectId || String, ref: 'products' }],
  additionalInfo: { type: mongoose.Schema.Types.Mixed },
  contacts: {
    city: String,
    lineOne: String,
    phoneNumber: String,
    zip: String,
    email: String,
    userId: mongoose.Types.ObjectId || String,
  },
  date: { type: Date, default: Date.now },
});

export interface Orders extends mongoose.Document {
  items: ObjectId | string;
  additionalInfo: Record<string, any>;
  contacts: {
    city: string;
    lineOne: string;
    phoneNumber: string;
    zip: string;
    email: string;
    userId: ObjectId | string;
  };
  date: Date;
}
