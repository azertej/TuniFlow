import { Tags } from "@/models/tagsModel";
import { Users } from "@/models/userModel";
import { connectToDB } from "../database";
import { GetAllTagsParams, GetTopInteractedTagsParams } from "./shared.props";

export const popularUserTags = async (params: GetTopInteractedTagsParams) => {
  try {
    await connectToDB();
    const { userId } = params;
    const user = await Users.findById(userId);
    if (!user) {
      console.log("Can't find user");
      return [];
    }

    return [
      { _id: "1", name: "tag1" },
      { _id: "2", name: "tag2" },
      { _id: "3", name: "tag3" },
    ];
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const allTags = async (params: GetAllTagsParams) => {
  try {
    await connectToDB();
    const tags = await Tags.find({}).sort({ createdAt: -1 });
    return { tags };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
