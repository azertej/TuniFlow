import { Schema, model, models, Document } from "mongoose";

export interface IAnswer extends Document {
  content: string;
  answerAuthor: Schema.Types.ObjectId;
  questionRef: Schema.Types.ObjectId;
  upVotes: Schema.Types.ObjectId[];
  downVotes: Schema.Types.ObjectId[];
  createdAt: Date;
}

const answerSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  questionRef: {
    type: Schema.Types.ObjectId,
    ref: "Questions",
    required: true,
  },
  answerAuthor: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  upVotes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
  ],
  downVotes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
export const Answers = models.Answers || model("Answers", answerSchema);
