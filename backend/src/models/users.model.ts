import * as mongoose from 'mongoose';

export const UsersSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  tokens: { refresh_token: { type: String, default: '' } },
  orders: [{ type: mongoose.Schema.Types.Mixed }],
  likes: [{ type: String }],
});

export interface Users extends mongoose.Document {
  email: string;
  password: string;
  tokens: { refresh_token: string };
  orders: object[];
  likes: string[];
}
