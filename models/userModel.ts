import { Schema, models, model, Document } from "mongoose";

export interface IUser extends Document {
  clerkId: string;
  name: string;
  userName: string;
  email: string;
  password?: string;
  bio?: string;
  userPic: string;
  savedPosts: Schema.Types.ObjectId[];
  portfolioWebsite?: string;
  reputation?: number;
  location?: string;
  createdAt: Date;
}

const userSchema = new Schema({
  clerkId: {
    type: String,
    required: true, 
  },
  name: {
    type: String,
    required: true,
    trim: true, 
  },
  userName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  userPic: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
  },
  bio: {
    type: String,
    trim: true,
  },
  portfolioWebsite: {
    type: String,
    trim: true,
  },
  location: {
    type: String,
    trim: true,
  },
  reputation: {
    type: Number,
    default: 0,
  },
  savedPosts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Questions",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Users = models.Users || model("Users", userSchema);