"use server";

import { Tags } from "@/models/tagsModel";
import { Users } from "@/models/userModel";
import { connectToDB } from "../database";
import {
  GetAllTagsParams,
  GetQuestionsByTagIdParams,
  GetTopInteractedTagsParams,
} from "./shared.props";

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

export const getTagByID = async (params: GetQuestionsByTagIdParams) => {
  try {
    await connectToDB();
    const { tagId } = params;
    const tag = await Tags.findById(tagId).populate({
      path: "questionRef",
      populate: [
        { path: "tags", model: Tags },
        { path: "author", model: Users },
      ],
      options: {
        sort: { createdAt: -1 },
      },
    });
    const Relatedquestions = tag.questionRef;
    return { questions: Relatedquestions, tagName: tag.name };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const topTags = async () => {
  try {
    await connectToDB()
    const tags = await Tags.aggregate([
      {$project:{name:1,numberOfQuestions:{$size:"$questionRef"}}},
      {$sort:{numberOfQuestions:-1}},
      {$limit:5}
    ])
    return tags
  } catch (error) {
    console.log(error)
    throw(error)
  }
};
