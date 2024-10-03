"use client";
import { deleteAnswer } from "@/lib/actions/answer.action";
import { deleteQuestion } from "@/lib/actions/question.action";
import Image from "next/image";
import { usePathname,useRouter } from "next/navigation";
import React from "react";

interface editAndDeleteProps {
  type: string;
  itemId: string;
}
const EditAndDeleteComponent = ({ type, itemId }: editAndDeleteProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const editQuestion = () => {
    router.push(`/question/edit/${itemId}`)
  };

  const deleteQuestions = async () => {
    if (type === "question") {
      await deleteQuestion({
        questionId: itemId,
        path: pathname,
      });
    } else if (type === "answer") {
      await deleteAnswer({
        answerId: itemId,
        path: pathname,
      });
    }
  };
  return (
    <div className="flex items-center justify-end gap-3 sm:w-full">
      {type === "question" && (
        <Image
          src="/assets/icons/edit.svg"
          width={16}
          height={16}
          alt="edit"
          className="cursor-pointer"
          onClick={() => editQuestion()}
        />
      )}
      <Image
        src="/assets/icons/trash.svg"
        width={16}
        height={16}
        alt="trash"
        className="cursor-pointer"
        onClick={() => deleteQuestions()}
      />
    </div>
  );
};

export default EditAndDeleteComponent;
