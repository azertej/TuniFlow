"use server";
import {
  CreateAnswerParams,
  GetAnswersParams,
  AnswerVoteParams,
} from "./shared.props.d";
import { connectToDB } from "./../database";
import { Answers } from "@/models/answerModel";
import { revalidatePath } from "next/cache";
import { Questions } from "@/models/questionModel";

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
export const answerUpVote = async (params: AnswerVoteParams) => {
  try {
    await connectToDB();
    const { answerId, userId, hasupVoted, hasdownVoted, path } = params;
    let updateQuery = {};
    if (hasupVoted) {
      updateQuery = { $pull: { upVotes: userId } };
    } else if (hasdownVoted) {
      updateQuery = {
        $pull: { downVotes: userId },
        $push: { upVotes: userId },
      };
    } else {
      updateQuery = { $addToSet: { upVotes: userId } };
    }
    const answer = await Answers.findByIdAndUpdate(answerId, updateQuery, {
      new: true,
    });
    if(!answer) {
      throw new Error ('answer not found')
    }
    revalidatePath(path)
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const answerDownVote = async (params: AnswerVoteParams) => {
  try {
    await connectToDB();
    const { answerId, userId, hasupVoted, hasdownVoted, path } = params;
    let updateQuery = {};
    if (hasdownVoted) {
      updateQuery = { $pull: { downVotes: userId } };
    } else if (hasupVoted) {
      updateQuery = {
        $pull: { upVotes: userId },
        $push: { downVotes: userId },
      };
    } else {
      updateQuery = { $addToSet: { downVotes: userId } };
    }
    const answer = await Answers.findByIdAndUpdate(answerId, updateQuery, {
      new: true,
    });
    if(!answer) {
      throw new Error ('answer not found')
    }
    revalidatePath(path)
  } catch (error) {
    console.log(error);
    throw error;
  }
};
