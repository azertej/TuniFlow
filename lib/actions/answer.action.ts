"use server";
import {
  CreateAnswerParams,
  GetAnswersParams,
  AnswerVoteParams,
  DeleteAnswerParams,
} from "./shared.props.d";
import { connectToDB } from "./../database";
import { Answers } from "@/models/answerModel";
import { revalidatePath } from "next/cache";
import { Questions } from "@/models/questionModel";
import { Interactions } from "@/models/interactionModel";

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
    const { questionId, sortBy } = params;
    let sortOption = {};
    switch (sortBy) {
      case "highestUpvotes":
        sortOption = { upVotes: -1 };
        break;
      case "lowestUpvotes":
        sortOption = { upVotes: 1 };
        break;
      case "recent":
        sortOption = { createdAt: -1 };
        break;
      case "old":
        sortOption = { createdAt: 1 };
        break;

      default:
        break;
    }
    const answers = await Answers.find({ questionRef: questionId })
      .populate("answerAuthor", "_id clerkId name userPic")
      .sort(sortOption);
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
    if (!answer) {
      throw new Error("answer not found");
    }
    revalidatePath(path);
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
    if (!answer) {
      throw new Error("answer not found");
    }
    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteAnswer = async (params: DeleteAnswerParams) => {
  try {
    await connectToDB();
    const { answerId, path } = params;
    const answer = await Answers.findById(answerId);
    if (!answer) {
      throw new Error("answer not found");
    }
    await Answers.deleteOne({ _id: answerId });
    await Questions.updateMany(
      { _id: answer.questionRef },
      { $pull: { answers: answerId } }
    );
    await Interactions.deleteMany({ answer: answerId });
    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
