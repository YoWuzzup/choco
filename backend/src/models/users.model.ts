import * as mongoose from 'mongoose';

export const UsersSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  tokens: { refresh_token: { type: String, default: '' } },
  emailVerified: { type: Boolean, default: false },
  orders: [{ type: mongoose.Schema.Types.Mixed }],
  likes: { type: [String], default: [] },
  reviews: { type: [String], default: [] },
  cart: { type: [{}], default: [] },
  name: { type: String },
  avatar: {
    fieldname: String,
    originalname: String,
    encoding: String,
    mimetype: String,
    buffer: Buffer,
    size: Number,
  },
});

export interface Users extends mongoose.Document {
  email: string;
  password: string;
  emailVerified: boolean;
  tokens: { refresh_token: string };
  orders: object[];
  likes: string[];
  reviews: string[];
  cart: object[];
  name: string;
  avatar: {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    buffer: Buffer;
    size: number;
  };
}
