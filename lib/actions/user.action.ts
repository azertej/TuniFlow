"use server";

import { Questions } from "@/models/questionModel";
import { Users } from "@/models/userModel";
import { revalidatePath } from "next/cache";
import { connectToDB } from "./../database";
import {
  CreateUserParams,
  DeleteUserParams,
  GetUserByIdParams,
  UpdateUserParams,
} from "./shared.props";

export const createUser = async (params: CreateUserParams) => {
  try {
    connectToDB();
    const newUser = await Users.create({ params });
    return newUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateUser = async (params: UpdateUserParams) => {
  try {
    connectToDB();
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
    connectToDB();
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
