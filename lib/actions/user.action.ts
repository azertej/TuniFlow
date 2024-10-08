"use server";

import { Answers } from "@/models/answerModel";
import { Questions } from "@/models/questionModel";
import { Tags } from "@/models/tagsModel";
import { Users } from "@/models/userModel";
import { FilterQuery } from "mongoose";
import { revalidatePath } from "next/cache";
import { connectToDB } from "./../database";
import {
  GetUserStatsParams,
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
    await connectToDB();
    const { searchQuery, filter, page = 1, pageSize = 2 } = params;
    const query: FilterQuery<typeof Users> = {};
    if (searchQuery) {
      query.$or = [
        { name: { $regex: new RegExp(searchQuery, "i") } },
        { userName: { $regex: new RegExp(searchQuery, "i") } },
      ];
    }

    let sortFilter = {};
    switch (filter) {
      case "new_users":
        sortFilter = { createdAt: -1 };
        break;
      case "old_users":
        sortFilter = { createdAt: 1 };
        break;
      case "top_contributors":
        sortFilter = { reputation: -1 };
        break;
      default:
        break;
    }
    const skipAmount = (page - 1) * pageSize;

    const users = await Users.find(query)
      .sort(sortFilter)
      .skip(skipAmount)
      .limit(pageSize);

    const totalUsers = await Users.countDocuments(query);
    const isNext = totalUsers > users.length + skipAmount;

    return { users, isNext };
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
    const { clerkId, searchQuery, filter, page = 1, pageSize = 2 } = params;

    const query: FilterQuery<typeof Questions> = searchQuery
      ? { title: { $regex: new RegExp(searchQuery, "i") } }
      : {};

    let sortFilter = {};
    switch (filter) {
      case "most_recent":
        sortFilter = { createdAt: 1 };
        break;
      case "oldest":
        sortFilter = { createdAt: -1 };
        break;
      case "most_voted":
        sortFilter = { upVotes: -1 };
        break;
      case "most_viewed":
        sortFilter = { views: -1 };
        break;
      case "most_answered":
        sortFilter = { answers: -1 };
        break;
      default:
        break;
    }
    const skipAmount = (page - 1) * pageSize;

    const user = await Users.findOne({ clerkId }).populate({
      path: "savedPosts",
      match: query,
      options: {
        sort: sortFilter,
        skip: skipAmount,
        limit: pageSize + 1,
      },
      populate: [
        { path: "tags", model: Tags, select: "_id name" },
        { path: "author", model: Users, select: "_id clerkId name userPic" },
      ],
    });

    if (!user) {
      throw new Error("user not found");
    }
    const isNext = user.savedPosts.length > pageSize;
    const savedPosts = user.savedPosts;

    return { questions: savedPosts, isNext };
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

    const { userId, page = 1, pageSize = 4 } = params;

    const skipAmount = (page - 1) * pageSize;
    const totalQuestions = await Questions.countDocuments({ author: userId });
    const userQuestion = await Questions.find({ author: userId })
      .sort({
        views: -1,
        upVotes: -1,
      })
      .skip(skipAmount)
      .limit(pageSize)
      .populate({ path: "tags", model: Tags })
      .populate({ path: "author", model: Users });
    const isNext = totalQuestions > userQuestion.length + skipAmount;

    return {
      totalQuestions,
      questions: userQuestion,
      isNext,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const userAnswers = async (params: GetUserStatsParams) => {
  try {
    await connectToDB();
    const { userId, page = 1, pageSize = 2 } = params;
    const skipAmount = (page - 1) * pageSize;
    const totalAnswers = await Answers.countDocuments({ answerAuthor: userId });
    const userAnswers = await Answers.find({ answerAuthor: userId })
      .sort({ upVotes: -1 })
      .skip(skipAmount)
      .limit(pageSize)
      .populate({ path: "questionRef", model: Questions })
      .populate({ path: "answerAuthor", model: Users });
    const isNext = totalAnswers > userAnswers.length + skipAmount
    return {
      totalAnswers,
      answers: userAnswers,
      isNext
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
