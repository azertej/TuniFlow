"use server";
import { Questions } from "@/models/questionModel";
import { Tags } from "@/models/tagsModel";
import { Users } from "@/models/userModel";
import { revalidatePath } from "next/cache";
import { connectToDB } from "./../database";
import {
  CreateQuestionParams,
  GetQuestionsParams,
  GetQuestionByIdParams,
  QuestionVoteParams
} from "./shared.props.d";

export const getQuestions = async (params: GetQuestionsParams) => {
  try {
    connectToDB();
    const questions = await Questions.find({})
      .populate({ path: "tags", model: Tags })
      .populate({ path: "author", model: Users })
      .sort({ createdAt: -1 });

    return { questions };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createQuestion = async (params: CreateQuestionParams) => {
  try {
    connectToDB();

    const { title, explanation, tags, author, path } = params;
    const newQuestion = await Questions.create({
      title,
      explanation,
      author,
    });

    const tagsDocuments = [];
    for (const tag of tags) {
      const exisTingtag = await Tags.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, "i") } },
        {
          $setOnInsert: { name: tag },
          $push: { questionRef: newQuestion._id },
        },
        { upsert: true, new: true }
      );
      tagsDocuments.push(exisTingtag);
    }

    await Questions.findByIdAndUpdate(newQuestion._id, {
      $push: { tags: { $each: tagsDocuments } },
    });
    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
};

export const getQuestionById = async (params: GetQuestionByIdParams) => {
  try {
    await connectToDB();
    const { questionId } = params;
    const question = await Questions.findById(questionId)
      .populate({ path: "author", model: Users })
      .populate({ path: "tags", model: Tags });
    return question;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const upvoteQuestion = async (params: QuestionVoteParams) => {
  try {
    await connectToDB();
    const { questionId, userId, hasupVoted, hasdownVoted, path } = params;
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
    const question = await Questions.findByIdAndUpdate(
      questionId,
      updateQuery,
      { new: true }
    );
    if (!question) {
      throw new Error("question not found");
    }
    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const downvoteQuestion = async (params: QuestionVoteParams) => {
  try {
    await connectToDB();
    const { questionId, userId, hasupVoted, hasdownVoted, path } = params;
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
    const question = await Questions.findByIdAndUpdate(
      questionId,
      updateQuery,
      { new: true }
    );
    if (!question) {
      throw new Error("question not found");
    }
    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

