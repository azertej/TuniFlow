import { Schema, model, models, Document } from "mongoose";

export interface IInteraction extends Document {
  action: string;
  user: Schema.Types.ObjectId;
  question: Schema.Types.ObjectId;
  tags: Schema.Types.ObjectId[];
  createdAt: Date;
}

const interactionSchema = new Schema({
  action: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref:'Users',
    required: true,
  },
  question: {
    type: Schema.Types.ObjectId,
    ref:'Questions',
    required: true,
  },
  answer:{
    type:Schema.Types.ObjectId,
    ref:'Answers'
  },
  tags: [
    {
      type: Schema.Types.ObjectId,
      ref:'Tags',
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Interactions =
  models.Interactions || model("Interactions", interactionSchema);
