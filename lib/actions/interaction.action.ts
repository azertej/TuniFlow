"use server";
import { Interactions } from "@/models/interactionModel";
import { Questions } from "@/models/questionModel";
import { connectToDB } from "../database";
import { ViewQuestionParams } from "./shared.props";

export const viewQuestionAction = async (params: ViewQuestionParams) => {
  try {
    await connectToDB();
    const { questionId, userId } = params;
    await Questions.findByIdAndUpdate(questionId, { $inc: { views: 1 } });
    if (userId) {
      const alreadyViewQuestion = await Interactions.findOne({
        action: "view",
        user: userId,
        question: questionId,
      });
      if (alreadyViewQuestion) return console.log("user already viewed");
      await Interactions.create({
        action: "view",
        user: userId,
        question: questionId,
      });
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};
