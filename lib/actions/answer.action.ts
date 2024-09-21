"use server";
import { CreateAnswerParams, GetAnswersParams } from "./shared.props.d";
import { connectToDB } from "./../database";
import { Answers } from "@/models/answerModel";
import { revalidatePath } from "next/cache";
import { Questions } from "@/models/questionModel";
import { Users } from "@/models/userModel";

export const createAnswer = async (params: CreateAnswerParams) => {
  try {
    await connectToDB();
    const { author, question, content, path } = params;
    const answer = await Answers.create({
      content,
      questionRef: question,
      answerAuthor: author,
    });
    await Questions.findByIdAndUpdate(question, {
      $push: { answers: answer._id },
    });
    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getAllAnswers = async (params: GetAnswersParams) => {
  try {
    await connectToDB();
    const { questionId } = params;
    const answers = await Answers.find({ questionRef: questionId })
      .populate("answerAuthor", "_id clerkId name userPic")
      .sort({ createdAt: -1 });
    return { answers };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
