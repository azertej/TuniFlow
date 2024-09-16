import { IUser } from "@/models/userModel"
import { Schema } from "mongoose"

export interface getQuestionsProps {
    page?:number,
    pageSize?:number,
    serachQuesry?:string,
    filter?:string
}
export interface createQuestionProps {
    title:string,
    explanation:string,
    tags:string[],
    author: Schema.Types.ObjectId | IUser,
    path:string
}