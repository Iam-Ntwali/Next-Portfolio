import mongoose, { Document, Model, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import { Interface } from "readline";

const emailRegexPattern: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface IUser extends Document {
  name: string;
  email: string;
  comparePassword(password: string): Promise<boolean>;
}
