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
  },
  name: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  userPic: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  bio: {
    type: String,
  },
  portfolioWebsite: {
    type: String,
  },
  location: {
    type: String,
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
