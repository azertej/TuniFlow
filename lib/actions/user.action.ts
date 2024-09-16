"use server";

import { Users } from "@/models/userModel";
import { connectToDB } from "./../database";

export const findUserById = async (params: any) => {
  try {
    connectToDB();
    const { userId } = params;
    if (!userId) {
      throw new Error("Invalid userId");
    }
    const user = await Users.findOne({ clerkId: userId });

    if (!user) {
      console.log(`User with ID ${userId} not found`);
      return null;
    }
    return user;
  } catch (error) {
    console.log(error);
  }
};
