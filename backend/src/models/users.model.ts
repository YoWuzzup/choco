import * as mongoose from 'mongoose';

export const UsersSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, unique: true, required: true },
});

export interface Users extends mongoose.Document {
  email: string;
  password: string;
}
