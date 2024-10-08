"use server";
import { FilterQuery } from "mongoose";
import { Tags } from "@/models/tagsModel";
import { Users } from "@/models/userModel";
import { Questions } from "@/models/questionModel";
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
    const { searchQuery, filter, page = 1, pageSize = 3 } = params;

    const query: FilterQuery<typeof Tags> = {};
    if (searchQuery) {
      query.$or = [{ name: { $regex: new RegExp(searchQuery, "i") } }];
    }

    let sortFilter = {};
    switch (filter) {
      case "popular":
        sortFilter = { questionRef: -1 };
        break;
      case "recent":
        sortFilter = { createdAt: -1 };
        break;
      case "name":
        sortFilter = { name: 1 };
        break;
      case "old":
        sortFilter = { createdAt: 1 };
        break;
      default:
        break;
    }

    const skipAmount = (page - 1) * pageSize;

    const tags = await Tags.find(query)
      .sort(sortFilter)
      .skip(skipAmount)
      .limit(pageSize);

    const totlalTags = await Tags.countDocuments(query);
    const isNext = totlalTags > tags.length + skipAmount;
    return { tags, isNext };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getTagByID = async (params: GetQuestionsByTagIdParams) => {
  try {
    await connectToDB();
    const { tagId, searchQuery, page = 1, pageSize = 4 } = params;

    const query: FilterQuery<typeof Questions> = searchQuery
      ? { title: { $regex: new RegExp(searchQuery, "i") } }
      : {};

    const skipAmount = (page - 1) * pageSize;

    const tag = await Tags.findById(tagId).populate({
      match: query,
      path: "questionRef",
      populate: [
        { path: "tags", model: Tags },
        { path: "author", model: Users },
      ],
      options: {
        sort: { createdAt: -1 },
        skip: skipAmount,
        limit: pageSize,
      },
    });
    
    const isNext = tag.questionRef > pageSize;
    const Relatedquestions = tag.questionRef;

    return { questions: Relatedquestions, tagName: tag.name, isNext };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const topTags = async () => {
  try {
    await connectToDB();
    const tags = await Tags.aggregate([
      { $project: { name: 1, numberOfQuestions: { $size: "$questionRef" } } },
      { $sort: { numberOfQuestions: -1 } },
      { $limit: 5 },
    ]);
    return tags;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
