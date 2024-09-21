import { Schema, model, models, Document } from "mongoose";

export interface IQuestion extends Document {
  title: string;
  explanation: string;
  tags: Schema.Types.ObjectId[];
  views: number;
  upVotes: Schema.Types.ObjectId[];
  downVotes: Schema.Types.ObjectId[];
  answers: Schema.Types.ObjectId[];
  auther: Schema.Types.ObjectId;
  createdAt: Date;
}
const questionSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  explanation: {
    type: String,
    required: true,
  },
  tags: [{
    type: Schema.Types.ObjectId,
    ref: "Tags",
  }],
  author: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
  upVotes: [{
    type: Schema.Types.ObjectId,
    ref: "Users",
  }],
  downVotes: [{
    type: Schema.Types.ObjectId,
    ref: "Users",
  }],
  answers: [{
    type: Schema.Types.ObjectId,
    ref: "Answers",
  }],
  views: {
    type: Number,
    default:0
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
export const Questions = models.Questions || model("Questions", questionSchema);
