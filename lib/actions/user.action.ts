"use server";
import { GetUserStatsParams } from "./shared.props.d";
import { Answers } from "@/models/answerModel";
import { Questions } from "@/models/questionModel";
import { Tags } from "@/models/tagsModel";
import { Users } from "@/models/userModel";
import { FilterQuery } from "mongoose";
import { revalidatePath } from "next/cache";
import { connectToDB } from "./../database";
import {
  CreateUserParams,
  DeleteUserParams,
  GetAllUsersParams,
  GetUserByIdParams,
  ToggleSaveQuestionParams,
  UpdateUserParams,
  GetSavedQuestionsParams,
} from "./shared.props";

export const createUser = async (params: CreateUserParams) => {
  try {
    await connectToDB();
    const newUser = await Users.create(params);
    return newUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateUser = async (params: UpdateUserParams) => {
  try {
    await connectToDB();
    const { clerkId, updatedData, path } = params;
    await Users.findOneAndUpdate({ clerkId }, updatedData, { new: true });
    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteUser = async (params: DeleteUserParams) => {
  try {
    await connectToDB();
    const { clerkId } = params;
    const user = await Users.findOneAndDelete({ clerkId });
    await Questions.deleteMany({ author: user._id });
    const deletedUser = await Users.findByIdAndDelete(user._id);
    return deletedUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const findUserById = async (params: GetUserByIdParams) => {
  try {
    connectToDB();
    const { userId } = params;
    if (!userId) {
      throw new Error("Invalid userId");
    }
    const user = await Users.findOne({ clerkId: userId });
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getUsers = async (params: GetAllUsersParams) => {
  try {
    connectToDB();
    const users = await Users.find({}).sort({ createdAt: -1 });
    return { users };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const savedPost = async (params: ToggleSaveQuestionParams) => {
  try {
    await connectToDB();
    const { userId, questionId, path } = params;
    const user = await Users.findById(userId);
    if (!user) {
      throw new Error("user not found");
    }
    const isSavedPost = user.savedPosts.includes(questionId);
    if (isSavedPost) {
      await Users.findByIdAndUpdate(
        userId,
        {
          $pull: { savedPosts: questionId },
        },
        { new: true }
      );
    } else {
      await Users.findByIdAndUpdate(
        userId,
        { $addToSet: { savedPosts: questionId } },
        { new: true }
      );
    }
    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getAllSavedQuestions = async (params: GetSavedQuestionsParams) => {
  try {
    await connectToDB();
    const { clerkId, page, pageSize, filter, searchQuery } = params;
    const query: FilterQuery<typeof Questions> = searchQuery
      ? { title: { $regex: new RegExp(searchQuery, "i") } }
      : {};
    const user = await Users.findOne({ clerkId }).populate({
      path: "savedPosts",
      match: query,
      options: {
        sort: { createdAt: -1 },
      },
      populate: [
        { path: "tags", model: Tags, select: "_id name" },
        { path: "author", model: Users, select: "_id clerkId name userPic" },
      ],
    });
    if (!user) {
      throw new Error("user not found");
    }
    const savedPosts = user.savedPosts;
    return { questions: savedPosts };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getUserInfo = async (params: GetUserByIdParams) => {
  try {
    await connectToDB();
    const { userId } = params;
    const user = await Users.findOne({ clerkId: userId });
    if (!user) {
      throw new Error("User not found");
    }
    const userQuestions = await Questions.countDocuments({ author: user._id });
    const userAnswers = await Answers.countDocuments({
      answerAuthor: user._id,
    });
    return {
      user,
      userQuestions,
      userAnswers,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const userQuestions = async (params: GetUserStatsParams) => {
  try {
    await connectToDB();
    const { userId } = params;
    const totalQuestions = await Questions.countDocuments({ author: userId });
    const userQuestion = await Questions.find({ author: userId })
      .sort({
        views: -1,
        upVotes: -1,
      })
      .populate({ path: "tags", model: Tags })
      .populate({ path: "author", model: Users });
    return {
      totalQuestions,
      questions: userQuestion,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const userAnswers = async (params: GetUserStatsParams) => {
  try {
    await connectToDB();
    const { userId } = params;
    const totalAnswers = await Answers.countDocuments({ answerAuthor: userId });
    const userAnswers = await Answers.find({ answerAuthor: userId })
      .sort({ upVotes: -1 })
      .populate({ path: "questionRef", model: Questions })
      .populate({ path: "answerAuthor", model: Users });
    return {
      totalAnswers,
      answers:userAnswers
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};
