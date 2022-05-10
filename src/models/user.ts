/* eslint-disable no-unused-vars */
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser {
  username: string;
  password: string;
  nama: string;
  alamat: string;
  validatePassword(password: string): boolean;
}

interface UserDoc extends IUser, mongoose.Document {}

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: { type: String, required: true },
  nama: {
    type: String,
    required: true,
  },
  alamat: {
    type: String,
    required: true,
  },
});

userSchema.pre('save', async function (next) {
  const thisObj = this as IUser;

  if (!this.isModified('password')) {
    return next();
  }

  try {
    thisObj.password = await bcrypt.hash(thisObj.password, 10);
  } catch (e) {
    return next(e as mongoose.CallbackError);
  }
});

userSchema.methods.validatePassword = async function (pass: string) {
  return bcrypt.compare(pass, this.password);
};

export const User = mongoose.model<UserDoc>('User', userSchema);
