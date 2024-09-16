import { Schema, models, model, Document } from "mongoose";

export interface ITags extends Document {
  name: string,
  description: string,
  questionRef: Schema.Types.ObjectId[],
  followers: Schema.Types.ObjectId[],
  createdAt: Date,
}

const tagSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  questionRef: [{
    type: Schema.Types.ObjectId,
    ref: "Questions",
  }],
  followers: [{
    type: Schema.Types.ObjectId,
    ref: "Users",
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Tags = models.Tags || model("Tags", tagSchema);
