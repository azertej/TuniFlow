"use server";
import { Questions } from "@/models/questionModel";
import { Tags } from "@/models/tagsModel";
import { Users } from "@/models/userModel";
import { revalidatePath } from "next/cache";
import { connectToDB } from "./../database";
import { createQuestionProps, getQuestionsProps } from "./shared.props.d";

export const getQuestions = async (params: getQuestionsProps) => {
  try {
    connectToDB();
    const questions = await Questions.find({})
      .populate({ path: "tags", model: Tags })
      .populate({ path: "author", model: Users })
      .sort({ createdAt: -1 });

    return { questions };
  } catch (error) {}
};

export const createQuestion = async (params: createQuestionProps) => {
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
  } catch (error) {}
};
